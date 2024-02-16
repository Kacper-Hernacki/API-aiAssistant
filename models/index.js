"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notes = exports.skills = exports.resources = exports.message_history = exports.prisma = void 0;
const client_1 = require("@prisma/client");
let prisma;
if (process.env.NODE_ENV === "production") {
    exports.prisma = prisma = new client_1.PrismaClient();
}
else {
    if (!global.prisma) {
        global.prisma = new client_1.PrismaClient();
    }
    exports.prisma = prisma = global.prisma;
}
const { message_history, resources, skills, notes } = prisma;
exports.message_history = message_history;
exports.resources = resources;
exports.skills = skills;
exports.notes = notes;
//# sourceMappingURL=index.js.map