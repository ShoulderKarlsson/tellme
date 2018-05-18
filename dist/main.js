"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const plugins_1 = require("./lib/plugins");
const main = () => {
    // Attaching all plugins
    plugins_1.plugins.forEach(({ description, resolver, commands }) => commander_1.default.option(`${commands.short}, ${commands.long}`, description, resolver));
    // If there are no arguments passed, present help
    // TODO: Check if there is "native" support for this from commander
    if (process.argv.length === 2)
        commander_1.default.outputHelp();
    commander_1.default.version('1.0').parse(process.argv);
};
main();
