"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUrl = void 0;
const client_1 = require("@notionhq/client");
const youtube_1 = require("../../utils/notes/youtube");
const web_1 = require("../../utils/notes/web");
const systemTemplate = "Act as a {role}. You will receive text extracted from URL. In the context, I will provide you from which platform it is." +
    "you have to summarize the content so that you will return in a clean version the essence of text. Text should be shorter than 1000 characters";
const humanTemplate = "{text}";
const addUrl = async (url) => {
    const notion = new client_1.Client({ auth: process.env.NOTION_API_KEY });
    const databaseId = process.env.NOTES_DATABASE_ID;
    const previewUrl = {
        object: "block",
        type: "embed",
        embed: {
            url,
        },
    };
    let contentOfNote = [];
    let summarizedContent = "";
    let name;
    let tag;
    if (url.includes("youtu")) {
        const { name: nameOfYoutubeNote, summarizedContent: summarizedContentOfYoutubeNote, contentOfNote: contentOfYoutubeNote } = await (0, youtube_1.loadAndSummarizeYoutubeVideo)(systemTemplate, humanTemplate, url);
        name = nameOfYoutubeNote;
        summarizedContent = summarizedContentOfYoutubeNote;
        contentOfNote = contentOfYoutubeNote;
        tag = "youtube";
    }
    else if (url.includes("x.com")) {
        tag = "twitter";
        name = "tweet";
    }
    else if (url.includes(".pdf")) {
        tag = "pdf";
        name = "";
    }
    else {
        const { metadata, summarizedText: summarizedWebContent, nameOfNote } = await (0, web_1.webpageLoader)(url, systemTemplate, humanTemplate);
        tag = url.includes("newsletter") ? "newsletter" : "web";
        name = nameOfNote;
        summarizedContent = summarizedWebContent;
    }
    return await notion.pages.create({
        parent: { database_id: databaseId },
        children: [
            previewUrl,
            {
                object: "block",
                type: "heading_2",
                heading_2: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Overview",
                            },
                        },
                    ],
                },
            },
            {
                object: "block",
                paragraph: {
                    rich_text: [
                        {
                            text: {
                                content: summarizedContent,
                            },
                        },
                    ],
                },
            },
            ...contentOfNote,
        ],
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: name || "savedUrl",
                        },
                    },
                ],
            },
            URL: {
                type: "url",
                url,
            },
            notSynchronizable: { checkbox: true },
            notWatched: { checkbox: true },
            Category: {
                type: "multi_select",
                multi_select: [
                    {
                        id: "0a8d95c3-baaa-4c38-8cbc-0616a60fe55b",
                        name: "web browsing",
                        color: "gray",
                    },
                ],
            },
            Tag: {
                type: "select",
                select: {
                    name: tag,
                },
            },
        },
    });
};
exports.addUrl = addUrl;
//# sourceMappingURL=addUrl.js.map