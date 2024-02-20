import { YoutubeLoader } from "langchain/document_loaders/web/youtube";
import { ChatPromptTemplate } from "langchain/prompts";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { createNotionBlocksFromTranscript } from "./notionBlocks";
interface YoutubeSummary {
  name: string;
  summarizedContent: string;
  contentOfNote: string[];
}

export async function loadAndSummarizeYoutubeVideo(
  systemTemplate: string,
  humanTemplate: string,
  url: string
): Promise<YoutubeSummary> {
  try {
    const chat = new ChatOpenAI();
    const loader = YoutubeLoader.createFromUrl(url, {
      language: "en",
      addVideoInfo: true,
    });

    const docs = await loader.load();
    const context = "Text extracted from youtube video as transcription.";
    const chatPrompt =
      ChatPromptTemplate.fromMessages([
        context,
        ["system", systemTemplate],
        ["human", humanTemplate],
      ]);

    const formattedChatPrompt = await chatPrompt.formatMessages({
      role: "WorldClassSummarizer",
      text: docs[0].pageContent,
    });

    const { content: summarizedText } = await chat.call(formattedChatPrompt);

    const notionBlocks = createNotionBlocksFromTranscript(docs[0].pageContent);

    return {
      name: docs[0].metadata.title,
      //@ts-ignore
      summarizedContent: summarizedText,
      contentOfNote: notionBlocks,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}