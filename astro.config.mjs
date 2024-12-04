import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import path from 'path';
import fs from 'fs-extra';

const siteUrl = 'https://graphics-for-good.com';

const mPath = path.join('./', 'members');
const cPath = path.join('./', 'content');
const members = fs.readdirSync(mPath);

members.forEach((username, i) => {
    var isDir = fs.lstatSync(`${mPath}/${username}`).isDirectory()
    if (isDir) {
        var portfolio = []
        if (fs.existsSync(`${mPath}/${username}/portfolio/`)) {
            if (fs.lstatSync(`${mPath}/${username}/portfolio/`).isDirectory()) {
                var items = fs.readdirSync(`${mPath}/${username}/portfolio/`)
                items.forEach(item => {
                    if (fs.lstatSync(`${mPath}/${username}/portfolio/${item}`).isDirectory()) return
                    var obj = {
                        username: username,
                        file: item
                    }
                    portfolio.push(obj)
                    if (!fs.existsSync(`${mPath}/${username}/portfolio/${getFNameNoExt(item)}/`)) {
                        fs.mkdirSync(`${mPath}/${username}/portfolio/${getFNameNoExt(item)}/`)
                    }
                    fs.moveSync(`${mPath}/${username}/portfolio/${item}`, `${mPath}/${username}/portfolio/${getFNameNoExt(item)}/${item}`)

                    obj.src = 'info.js'
                    obj = `var data = ${JSON.stringify(obj, null, 4)}\n\nexport default data`
                    fs.writeFileSync(`${mPath}/${username}/portfolio/${getFNameNoExt(item)}/info.js`, obj)
                })
            }
        }


        var info = `${mPath}/${username}/info.json`
        if (fs.existsSync(info)) {
            info = fs.readFileSync(info, 'utf-8')
            if (info) {
                if (info.startsWith('{') && info.endsWith('}')) {
                    info = JSON.parse(info)
                    info.username = username
                    info.portfolio = portfolio
                    
                    info = JSON.stringify(info, null, 2)
                    info = `var data = ${info}\n\nexport default data`
                    fs.writeFileSync( `${mPath}/${username}/info.js`, info)
                }
            }
        }
    }
});

function getFName(str) {
    if (str.includes('/')) str = str.split('/').slice(-1)[0]
    return str
}

function getFNameNoExt(str) {
    if (str.includes('/')) str = str.split('/').slice(-1)[0]
    str = str.slice(0, -1*getFExt(str).length)
    return str
}

function getFExt(str) {
    str = getFName(str)
    if (str.includes('.')) {
        str = str.split('.')
        str = str.slice(-1)
        str = str.join('.')
        str = `.${str}`
    }
    return str
}

export default defineConfig({
    site: siteUrl,
    base: '/',
    trailingSlash: "ignore",
    integrations: [sitemap()],
});