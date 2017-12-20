"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nightmare = require("nightmare");
// Constants
const BASE_URL = 'https://www.whoscored.com';
const USERAGENTS = [
    `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393`,
    `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36`,
    `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36`,
    `Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36`,
    `Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36`,
    `Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:52.0) Gecko/20100101 Firefox/52.0`,
    `Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:53.0) Gecko/20100101 Firefox/53.0`,
    `Mozilla/5.0 (Windows NT 10.0; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0`,
    `Mozilla/5.0 (Windows NT 6.1; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0`
];
const IPADDRS = [
    `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393`,
    `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36`,
    `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36`,
    `Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36`,
    `Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36`,
    `Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:52.0) Gecko/20100101 Firefox/52.0`,
    `Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:53.0) Gecko/20100101 Firefox/53.0`,
    `Mozilla/5.0 (Windows NT 10.0; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0`,
    `Mozilla/5.0 (Windows NT 6.1; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0`
];
const nightmare = new Nightmare({
    show: true
});
const getLeagues = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const leagues = yield nightmare
            .useragent(`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36`)
            .goto(BASE_URL)
            .wait('#tournament-groups')
            .click('#tournament-groups > li:nth-child(4) > a')
            .click('#domestic-index > dd:nth-child(6) > a')
            .evaluate(() => {
            const links = [...document.querySelectorAll('#domestic-regions > div:nth-child(4) > ul > li > ul > li > a')];
            let leagues = [];
            for (let link of links) {
                leagues.push({
                    name: link.innerHTML,
                    url: link.href
                });
            }
            return leagues;
        });
        console.log(leagues);
        return leagues;
    }
    catch (error) {
        console.log('Could not find the leagues on the page...');
        console.log('error occured: ' + error);
        return undefined;
    }
});
const getSeasons = (url) => __awaiter(this, void 0, void 0, function* () {
    try {
        const seasons = yield nightmare
            .useragent(`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36`)
            .goto(url)
            .wait('#seasons')
            .evaluate(() => {
            const options = [...document.querySelectorAll('#seasons > option')];
            let seasons = [];
            for (let option of options) {
                seasons.push({
                    year: option.innerHTML,
                    url: BASE_URL + option.value
                });
            }
            return seasons;
        });
        console.log(seasons);
        return seasons;
    }
    catch (error) {
        console.log('Could not find the seasons on the page...');
        console.log('error occured: ' + error);
        return undefined;
    }
});
/**
 * Return a random useragent string
 *
 * @returns {string}
 */
function getRandomUserAgent() {
    return USERAGENTS[Math.floor(Math.random() * USERAGENTS.length)];
}
/**
 * Return a random number of ms wihtin the range
 *
 * @param {number} max
 * @returns {number}
 */
function getRandomWait(range) {
    return Math.floor(Math.random() * range);
}
// async function gotoFixtures(): Promise<void> {
//     try {
//         await nightmare
//             .click('#sub-navigation > ul > li:nth-child(2) > a');
//     } catch (error) {
//         console.log('Could not reach the fixture page...');
//         console.log('error occured: ' + error);
//         return undefined;
//     }
// }
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const leagues = yield getLeagues();
        const seasons = yield getSeasons(leagues[0].url);
        // await gotoFixtures();
        // End the nightmare instance
        // await nightmare.end();
    });
}
start();
