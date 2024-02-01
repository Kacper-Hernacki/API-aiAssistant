import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, SystemMessage } from "langchain/schema";
import { currentDate, parseFunctionCall, rephrase } from "../../utils/tasks/todoist/helper";
import { addTasks, closeTasks, listUncompleted, updateTasks } from "../../utils/tasks/todoist/todoist";
import { addTasksSchema, finishTasksSchema, getTasksSchema, updateTasksSchema } from "../../utils/tasks/todoist/schema";

const model = new ChatOpenAI({ modelName: "gpt-4-0613" }).bind({ functions: [getTasksSchema, addTasksSchema, finishTasksSchema, updateTasksSchema] });
const tools: any = { getTasks: listUncompleted, addTasks, closeTasks, updateTasks };
export const createTask = async (query: string) => {
  console.log("User: ", query);
  const tasks = await listUncompleted();
  const conversation = await model.invoke([
    new SystemMessage(`
            Fact: Today is ${currentDate()}
            Current tasks: ###${tasks.map((task: any) => task.content + " (ID: " + task.id + ")").join(", ")}###`),
    new HumanMessage(query),
  ]);
  const action = parseFunctionCall(conversation);
  let response: string | any = "";
  if (action) {
    console.log(`action: ${action.name}`);
    response = await tools[action.name](action.args.tasks);
    response = await rephrase(response, query);
  } else {
    response = conversation.content;
  }
  console.log(`AI: ${response}\n`);
  return response;
};
