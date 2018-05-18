"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
const chalk_1 = __importDefault(require("chalk"));
exports.networkPlugin = {
    description: 'Displays network information',
    commands: {
        long: '--network',
        short: '-n',
    },
    resolver: () => __awaiter(this, void 0, void 0, function* () {
        const response = yield isomorphic_fetch_1.default('https://ipapi.co/json/');
        if (!response.ok)
            return console.log(chalk_1.default.redBright('Failed to fetch network information. Please try again.'));
        const { ip } = yield response.json();
        console.log(chalk_1.default.cyanBright(`Local IP-address: ${ip}`));
    }),
};
