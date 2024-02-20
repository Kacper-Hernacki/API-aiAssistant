"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAndSummarizeYoutubeVideo = void 0;
const youtube_1 = require("langchain/document_loaders/web/youtube");
const prompts_1 = require("langchain/prompts");
const openai_1 = require("langchain/chat_models/openai");
const notionBlocks_1 = require("./notionBlocks");
async function loadAndSummarizeYoutubeVideo(systemTemplate, humanTemplate, url) {
    try {
        const chat = new openai_1.ChatOpenAI();
        const loader = youtube_1.YoutubeLoader.createFromUrl(url, {
            language: "en",
            addVideoInfo: true,
        });
        const docs = await loader.load();
        const context = "Text extracted from youtube video as transcription.";
        const chatPrompt = prompts_1.ChatPromptTemplate.fromMessages([
            context,
            ["system", systemTemplate],
            ["human", humanTemplate],
        ]);
        const formattedChatPrompt = await chatPrompt.formatMessages({
            role: "WorldClassSummarizer",
            text: docs[0].pageContent,
        });
        const { content: summarizedText } = await chat.call(formattedChatPrompt);
        const notionBlocks = (0, notionBlocks_1.createNotionBlocksFromTranscript)(docs[0].pageContent);
        return {
            name: docs[0].metadata.title,
            summarizedContent: summarizedText,
            contentOfNote: notionBlocks,
        };
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
exports.loadAndSummarizeYoutubeVideo = loadAndSummarizeYoutubeVideo;
//# sourceMappingURL=youtube.js.map