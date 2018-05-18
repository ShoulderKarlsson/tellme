"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_leap_year_1 = __importDefault(require("date-fns/is_leap_year"));
const add_years_1 = __importDefault(require("date-fns/add_years"));
const chalk_1 = __importDefault(require("chalk"));
exports.leapYearPlugin = {
    description: 'Get information about current or coming leap year',
    commands: {
        long: '--leap-year',
        short: '-l',
    },
    resolver: () => {
        const now = new Date();
        const years = [
            add_years_1.default(now, 2),
            add_years_1.default(now, 1),
            now,
            add_years_1.default(now, -1),
            add_years_1.default(now, -2),
        ];
        years.forEach(date => {
            is_leap_year_1.default(date)
                ? console.log(chalk_1.default.cyanBright(` - ${date.getFullYear()}`))
                : console.log(chalk_1.default.magentaBright(` - ${date.getFullYear()}`));
        });
    },
};
