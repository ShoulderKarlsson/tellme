"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const date_fns_1 = require("date-fns");
exports.weekPlugin = {
    description: 'Display week current weeknumber with additional information',
    commands: {
        long: '--week',
        short: '-w'
    },
    resolver: () => {
        const d = new Date();
        const currentWeek = date_fns_1.getISOWeek(d);
        const startDateOfWeek = date_fns_1.startOfWeek(d);
        const endDateOfWeek = date_fns_1.endOfISOWeek(startDateOfWeek);
        const weekDates = date_fns_1.eachDay(startDateOfWeek, endDateOfWeek);
        console.log(' ');
        console.log(chalk_1.default.cyan(`Current Week is ${currentWeek}. (Dates for this week)`));
        weekDates
            .map(date => ` - ${date_fns_1.format(date, 'Do dddd')}`)
            .forEach(date => console.log(chalk_1.default.magentaBright(`${date}`)));
    }
};
