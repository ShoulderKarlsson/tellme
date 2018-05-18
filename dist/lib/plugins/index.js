"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const week_1 = require("./week");
const network_1 = require("./network");
const leap_year_1 = require("./leap-year");
const red_days_1 = require("./red-days");
exports.plugins = [week_1.weekPlugin, network_1.networkPlugin, leap_year_1.leapYearPlugin, red_days_1.redDaysPlugin];
