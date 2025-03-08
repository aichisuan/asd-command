"use strict";
// 代码参考来自 https://github.com/kenshinji/yddict
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio = __importStar(require("cheerio"));
// conosle.log('cheerio', cheerio);
exports.default = (function (isChinese, body) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    var $ = cheerio.load(body);
    var result = '';
    var sentenceSample = '';
    if (isChinese) {
        $('div.trans-container > ul')
            .find('p.wordGroup')
            .each(function (i, elm) {
            result += $(this).text().replace(/\s+/g, ' ');
        });
    }
    else {
        $('div#phrsListTab > div.trans-container > ul')
            .find('li')
            .each(function (i, elm) {
            result += $(this).text().replace(/\s+/g, ' ') + '\n';
        });
        $('#bilingual ul li')
            .find('p')
            .each(function (i, elm) {
            if ($(this).attr('class') !== 'example-via') {
                sentenceSample += $(this).text().trim() + '\n';
            }
        });
    }
    // phrase or sentence
    if (result === '') {
        result =
            $('div#webPhrase > p.wordGroup').text() !== ''
                ? $('div#webPhrase > p.wordGroup').text()
                : $('div#fanyiToggle > div.trans-container > p:nth-child(2)').text();
    }
    // phonetic
    result =
        $('div#phrsListTab > h2.wordbook-js > div.baav > span').text().replace(/\s+/g, ' ') +
            '\n\n' +
            result +
            '\n' +
            sentenceSample;
    return result;
});
//# sourceMappingURL=parser.js.map