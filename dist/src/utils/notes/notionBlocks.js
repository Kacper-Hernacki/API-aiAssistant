"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotionBlocksFromTranscript = void 0;
const MAX_BLOCK_LENGTH = 990;
function createNotionBlocksFromTranscript(transcript) {
    const blocks = [];
    let startIndex = 0;
    const transcriptHeaderBlock = {
        object: "block",
        type: "heading_2",
        heading_2: {
            rich_text: [
                {
                    type: "text",
                    text: {
                        content: "Content/Transcript",
                    },
                },
            ],
        },
    };
    blocks.push(transcriptHeaderBlock);
    while (startIndex < transcript.length) {
        let endIndex = startIndex + MAX_BLOCK_LENGTH;
        if (endIndex < transcript.length && transcript[endIndex] !== " ") {
            endIndex = transcript.lastIndexOf(" ", endIndex) + 1;
        }
        const contentOfNote = transcript.substring(startIndex, endIndex);
        const block = {
            object: "block",
            type: "paragraph",
            paragraph: {
                rich_text: [
                    {
                        type: "text",
                        text: {
                            content: contentOfNote,
                        },
                    },
                ],
            },
        };
        blocks.push(block);
        startIndex = endIndex;
    }
    return blocks;
}
exports.createNotionBlocksFromTranscript = createNotionBlocksFromTranscript;
//# sourceMappingURL=notionBlocks.js.map