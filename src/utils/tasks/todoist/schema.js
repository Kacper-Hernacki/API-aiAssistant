"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTasksSchema = exports.finishTasksSchema = exports.addTasksSchema = exports.getTasksSchema = void 0;
exports.getTasksSchema = {
    "name": "getTasks",
    "description": "Get (unfinished) tasks from Todoist",
    "parameters": {
        "type": "object",
        "properties": {}
    }
};
exports.addTasksSchema = {
    "name": "addTasks",
    "description": "Add multiple tasks to Todoist",
    "parameters": {
        "type": "object",
        "properties": {
            "tasks": {
                "type": "array",
                "description": "List of tasks that needs to be added to the Todoist",
                "items": {
                    "type": "object",
                    "properties": {
                        "content": {
                            "type": "string",
                            "description": "Format: task description"
                        },
                        "due_string": {
                            "type": "string",
                        }
                    }
                }
            }
        }
    }
};
exports.finishTasksSchema = {
    "name": "closeTasks",
    "description": "Finish/Complete tasks in Todoist",
    "parameters": {
        "type": "object",
        "properties": {
            "tasks": {
                "type": "array",
                "description": "List of IDs of tasks that needs to be finished/completed",
                "items": {
                    "type": "number",
                }
            }
        }
    }
};
exports.updateTasksSchema = {
    "name": "updateTasks",
    "description": "Update multiple tasks in Todoist based on the current tasks mentioned in the conversation",
    "parameters": {
        "type": "object",
        "properties": {
            "tasks": {
                "type": "array",
                "description": "List of tasks that needs to be updated in the Todoist",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "number",
                            "description": "ID of the task to update"
                        },
                        "content": {
                            "type": "string",
                            "description": "Format: task description"
                        },
                        "due_string": {
                            "type": "string",
                        }
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=schema.js.map