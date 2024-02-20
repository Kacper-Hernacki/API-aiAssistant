import { NodeHtmlMarkdown } from "node-html-markdown";
import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatPromptTemplate } from "langchain/prompts";
import { createNotionBlocksFromTranscript } from "./notionBlocks";
import { HumanMessage } from "langchain/schema";

export async function webpageLoader(
  url: string,
  systemTemplate: string,
  humanTemplate: string,
) {
  const chat = new ChatOpenAI();
  const context = "Text extracted from website, only content from the first div.";
  const chatPrompt =
    ChatPromptTemplate.fromMessages([
      context,
      ["system", systemTemplate],
      ["human", humanTemplate],
    ]);

  const loader = new PuppeteerWebBaseLoader(url, {
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

      return NodeHtmlMarkdown.translate(result);
    },
  });

  const docs = await loader.load();

  docs.forEach((doc) => {
    let i = 1;
    const urlToPlaceholder: { [key: string]: string } = {};

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
    new HumanMessage(
      `return a proper name for a note which summarized content is:
      ${summarizedText}`,
    ),
  ]);

  return { metadata: docs[0]?.metadata, summarizedText, nameOfNote };
}