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
const cheerio_1 = __importDefault(require("cheerio"));
exports.redDaysPlugin = {
    description: "Displays information about 'red days'",
    commands: {
        long: '--red-days',
        short: '-r',
    },
    resolver: () => __awaiter(this, void 0, void 0, function* () {
        const html = yield fetchPage('http://www.kalender.se/helgdagar').catch((error) => {
            console.log(error);
        });
        const information = parseHtml(html);
        present(information);
    }),
};
const present = (information) => {
    console.log(information);
};
const fetchPage = (url) => isomorphic_fetch_1.default(url)
    .then((response) => (response.ok ? response : Promise.reject(response)))
    .then((response) => response.text());
const parseHtml = (html) => {
    const data = cheerio_1.default.load(html);
    const info = data('.table-striped')
        .children('tbody')
        .children('tr');
    return info
        .map((i, element) => {
        const result = element.children
            .filter(element => element.name === 'td')
            .map(({ children }) => children)
            .reduce((acc, curr) => [...acc, ...curr], [])
            .reduce((acc, curr) => {
            if (curr.name === 'a') {
                const [aTag] = curr.children;
                return [...acc, aTag.data];
            }
            if ('data' in curr && curr.data.trim() !== '') {
                return [...acc, curr.data];
            }
            return acc;
        }, []);
        // Putting each entry inside array
        // so we can process as a unit
        return [result];
    })
        .toArray();
};
