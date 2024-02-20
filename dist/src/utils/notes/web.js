"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webpageLoader = void 0;
const node_html_markdown_1 = require("node-html-markdown");
const puppeteer_1 = require("langchain/document_loaders/web/puppeteer");
const openai_1 = require("langchain/chat_models/openai");
const prompts_1 = require("langchain/prompts");
const schema_1 = require("langchain/schema");
async function webpageLoader(url, systemTemplate, humanTemplate) {
    var _a;
    const chat = new openai_1.ChatOpenAI();
    const context = "Text extracted from website, only content from the first div.";
    const chatPrompt = prompts_1.ChatPromptTemplate.fromMessages([
        context,
        ["system", systemTemplate],
        ["human", humanTemplate],
    ]);
    const loader = new puppeteer_1.PuppeteerWebBaseLoader(url, {
        launchOptions: {
            headless: true,
        },
        gotoOptions: {
            waitUntil: "domcontentloaded",
        },
        async evaluate(page) {
            await page.goto(url, { waitUntil: "networkidle0" });
            await page.waitForSelector("div", { timeout: 60000, visible: true });
            const result = await page.evaluate(() => document.querySelector("div").innerHTML);
            return node_html_markdown_1.NodeHtmlMarkdown.translate(result);
        },
    });
    const docs = await loader.load();
    docs.forEach((doc) => {
        let i = 1;
        const urlToPlaceholder = {};
        doc.pageContent = doc.pageContent.replace(/((http|https):\/\/[^\s]+|\.\/[^\s]+)(?=\))/g, (url) => {
            if (!urlToPlaceholder[url]) {
                const placeholder = `$${i++}`;
                urlToPlaceholder[url] = placeholder;
                doc.metadata[placeholder] = url;
            }
            return urlToPlaceholder[url];
        });
    });
    const formattedChatPrompt = await chatPrompt.formatMessages({
        role: "World-Class Summarizer",
        text: docs[0].pageContent,
    });
    const { content: summarizedText } = await chat.call(formattedChatPrompt);
    const { content: nameOfNote } = await chat.call([
        new schema_1.HumanMessage(`return a proper name for a note which summarized content is:
      ${summarizedText}`),
    ]);
    return { metadata: (_a = docs[0]) === null || _a === void 0 ? void 0 : _a.metadata, summarizedText, nameOfNote };
}
exports.webpageLoader = webpageLoader;
//# sourceMappingURL=web.js.map