"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCost = void 0;
const client_1 = require("@notionhq/client");
const prompts_1 = require("langchain/prompts");
const openai_1 = require("langchain/chat_models/openai");
const addCost = async (costData) => {
    const notion = new client_1.Client({ auth: process.env.NOTION_API_KEY });
    const databaseId = process.env.BUDGET_DATABASE_ID;
    const { results: budgetItemDatabase } = await notion.databases.query({
        database_id: process.env.BUDGET_ITEMS_DATABASE_ID,
    });
    const budgetItems = budgetItemDatabase.map((page) => {
        return { id: page.id, name: page.properties.Name.title[0].text.content };
    });
    const categories = budgetItems === null || budgetItems === void 0 ? void 0 : budgetItems.map((item) => item === null || item === void 0 ? void 0 : item.name);
    const systemTemplate = "Act as a {role}. You will receive text extracted from shopping receipts or invoices. Your task is to interpret the text accurately, correct any errors, and then translate the item names into English. Each item should be categorized into one of the following categories, based on its nature and use." +
        "Costs should be returned as an array of objects, each object represents a category. If an item could belong to more than one category, use your best judgment to choose the most appropriate one. The output should only consist of this array, with no additional text." +
        "###example description" +
        "Array should be constructed always as an array of objects, where object has keys category, name and cost. Category and name are strings and cost is a number. Names should be translated into english" +
        "###categories:" +
        `${categories === null || categories === void 0 ? void 0 : categories.map(category => category)}` +
        "context###{context}###" +
        "Remember to assign proper category and to make sure that the sum of costs is equal to the sum from receipt! Add only products, not some additional things in a receipt, like: taxes, sums, etc. Names should be always translated to english.";
    const humanTemplate = "{text}";
    const context = "Text provided in a message is extracted from a photo of receipt and is in Polish. There can be typography errors. Always return only an array, nothing more.";
    const chatPrompt = prompts_1.ChatPromptTemplate.fromMessages([
        context,
        ["system", systemTemplate],
        ["human", humanTemplate],
    ]);
    const formattedChatPrompt = await chatPrompt.formatMessages({
        context,
        role: "Budget Manager",
        text: costData,
    });
    const chat = new openai_1.ChatOpenAI();
    const { content: returnedDataFromAI } = await chat.call(formattedChatPrompt);
    if (typeof returnedDataFromAI === "string") {
        const content = JSON.parse(returnedDataFromAI);
        const mergedArray = content.map(item => {
            const budgetItem = budgetItems.find(budgetItem => budgetItem.name === item.category);
            return budgetItem ? { ...item, id: budgetItem.id } : item;
        });
        for (const item of mergedArray) {
            try {
                const newPage = await notion.pages.create({
                    parent: { database_id: databaseId },
                    properties: {
                        Name: {
                            title: [
                                {
                                    text: {
                                        content: item.name,
                                    },
                                },
                            ],
                        },
                        Amount: {
                            number: item.cost,
                        },
                        Date: {
                            date: {
                                start: new Date().toISOString(),
                            },
                        },
                        "Budget items": {
                            relation: [
                                {
                                    id: item.id,
                                },
                            ],
                        },
                    },
                });
                console.log("Page created with ID:", newPage.id);
            }
            catch (error) {
                console.error("Failed to create page:", error);
            }
        }
        return content;
    }
};
exports.addCost = addCost;
//# sourceMappingURL=addCost.js.map