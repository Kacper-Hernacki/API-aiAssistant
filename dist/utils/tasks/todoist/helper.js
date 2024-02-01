"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentDate = exports.parseFunctionCall = exports.rephrase = void 0;
const schema_1 = require("langchain/schema");
const openai_1 = require("langchain/chat_models/openai");
const rephrase = async (response, query) => {
    const model = new openai_1.ChatOpenAI({
        modelName: "gpt-3.5-turbo",
        temperature: 1,
    });
    const { content } = await model.call([
        new schema_1.SystemMessage(`
            Answer the question ultra-briefly using casual, human-friendly tone: 
            ###${query}###
            and act as if you just performed this action and confirming this fact to the user, using the following response: 
            ###${JSON.stringify(response)}###
        `),
    ]);
    return content;
};
exports.rephrase = rephrase;
const parseFunctionCall = (result) => {
    var _a;
    if (((_a = result === null || result === void 0 ? void 0 : result.additional_kwargs) === null || _a === void 0 ? void 0 : _a.function_call) === undefined) {
        return null;
    }
    return {
        name: result.additional_kwargs.function_call.name,
        args: JSON.parse(result.additional_kwargs.function_call.arguments),
    };
};
exports.parseFunctionCall = parseFunctionCall;
const currentDate = () => {
    let date = new Date();
    let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let weekday = weekdays[date.getDay()];
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let year = date.getFullYear();
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    return `${weekday}, ${month}/${day}/${year} ${hours}:${minutes}`;
};
exports.currentDate = currentDate;
//# sourceMappingURL=helper.js.map