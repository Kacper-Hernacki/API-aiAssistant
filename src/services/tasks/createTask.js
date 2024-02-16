"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = void 0;
const openai_1 = require("langchain/chat_models/openai");
const schema_1 = require("langchain/schema");
const helper_1 = require("../../utils/tasks/todoist/helper");
const todoist_1 = require("../../utils/tasks/todoist/todoist");
const schema_2 = require("../../utils/tasks/todoist/schema");
const model = new openai_1.ChatOpenAI({ modelName: "gpt-4-0613" }).bind({ functions: [schema_2.getTasksSchema, schema_2.addTasksSchema, schema_2.finishTasksSchema, schema_2.updateTasksSchema] });
const tools = { getTasks: todoist_1.listUncompleted, addTasks: todoist_1.addTasks, closeTasks: todoist_1.closeTasks, updateTasks: todoist_1.updateTasks };
const createTask = async (query) => {
    console.log("User: ", query);
    const tasks = await (0, todoist_1.listUncompleted)();
    const conversation = await model.invoke([
        new schema_1.SystemMessage(`
            Fact: Today is ${(0, helper_1.currentDate)()}
            Current tasks: ###${tasks.map((task) => task.content + " (ID: " + task.id + ")").join(", ")}###`),
        new schema_1.HumanMessage(query),
    ]);
    const action = (0, helper_1.parseFunctionCall)(conversation);
    let response = "";
    if (action) {
        console.log(`action: ${action.name}`);
        response = await tools[action.name](action.args.tasks);
        response = await (0, helper_1.rephrase)(response, query);
    }
    else {
        response = conversation.content;
    }
    console.log(`AI: ${response}\n`);
    return response;
};
exports.createTask = createTask;
//# sourceMappingURL=createTask.js.map