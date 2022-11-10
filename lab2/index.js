import HTMLParser from 'node-html-parser';
import fetch from 'node-fetch'
import fs from 'fs'
import { url } from 'inspector';

const VISITED_LINKS = new Set()
const URL_TO_CHECK = 'https://statler.ru/'
const VALID_STATUSES = [200, 201, 202, 203, 204, 205, 206, 207, 208, 229]
const POSSIBLE_LINK_TAGS = ['a']
const ANCHOR = ['#']
const POSSIBLE_LINK_ATTRIBUTES = ['href']

const VALID_URLS_FILE_NAME = 'validUrls.txt'
const INVALID_URLS_FILE_NAME = 'invalidUrls.txt'
let validUrlsCount = 0
let invalidUrlsCount = 0
//phone, #, email, внешн€€ ссылка
function writeValidUrl(validUrl, status) {
    fs.appendFileSync(VALID_URLS_FILE_NAME, validUrl + ' - ' + status + '\n')
    validUrlsCount++
}

function writeInvalidUrl(invalidUrl, status) {
    fs.appendFileSync(INVALID_URLS_FILE_NAME, invalidUrl + ' - ' + status + '\n')
    invalidUrlsCount++
}

function isPersonalInfo(urlToCheck) {
    return (urlToCheck.startsWith('mailto') || urlToCheck.startsWith('tel'))
}
function isNestedLink(urlToCheck) {
    return !(urlToCheck.startsWith('http') || urlToCheck.startsWith('https') || urlToCheck.startsWith('ftp'))
}
async function checkLink(urlToCheck, ignoreProtocol) {
    if (isNestedLink(urlToCheck)) {
        urlToCheck = URL_TO_CHECK + urlToCheck
    }
    if (VISITED_LINKS.has(urlToCheck)) {
        return
    }
    VISITED_LINKS.add(urlToCheck)
    const response = await fetch(urlToCheck)

    if (VALID_STATUSES.includes(response.status)) {
        writeValidUrl(urlToCheck, response.status)
        const html = await response.text()
        const document = HTMLParser.parse(html)
        const tags = document.querySelectorAll(POSSIBLE_LINK_TAGS.join(', '))
        for (let i = 0; i < tags.length; i++) {
            const tag = tags[i]
            let urlPath

            POSSIBLE_LINK_ATTRIBUTES.forEach(attr => {
                if (tag.attributes[attr]) {
                    // console.log(tag.attributes[attr])
                    if ((isNestedLink(tag.attributes[attr].trim())) && (tag.attributes[attr].trim() != ANCHOR) && !(isPersonalInfo(tag.attributes[attr].trim()))) {
                        urlPath = tag.attributes[attr]
                   //     console.log(urlPath.trim())
                        urlPath = urlPath.trim()
                    }
                }
            })
            if (urlPath) {
                await checkLink(urlPath, false)
            }
        }
    } else {
        writeInvalidUrl(urlToCheck, response.status)
    }
}

async function startCheckingPage(url) {
    await checkLink(url, true)
    const date = new Date()
    fs.appendFileSync(VALID_URLS_FILE_NAME,
        `Links count: ${validUrlsCount}
Date: ${date}`)
    fs.appendFileSync(INVALID_URLS_FILE_NAME,
        `Links count: ${invalidUrlsCount}
Date: ${date}`)
}

startCheckingPage(URL_TO_CHECK)