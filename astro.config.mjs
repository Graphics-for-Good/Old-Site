import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import path from 'path';
import fs from 'fs-extra';
import { info } from 'console';

const siteUrl = 'https://graphics-for-good.com';

const mPath = path.join('./', 'members');
const pMPath = path.join('./', 'public', '/', 'assets', '/', 'members');
const members = fs.readdirSync(mPath);
const pMembers = fs.readdirSync(pMPath);

pMembers.forEach((username, i) => {
    var isDir = fs.lstatSync(`${pMPath}/${username}`).isDirectory()
    if (isDir) {
        if (fs.existsSync(`${pMPath}/${username}/portfolio/`)) {
            if (fs.lstatSync(`${pMPath}/${username}/portfolio/`).isDirectory()) {
                var items = fs.readdirSync(`${pMPath}/${username}/portfolio/`)
                items.forEach(item => {
                    if (!fs.existsSync(`${mPath}/${username}/portfolio/${getFNameNoExt(item)}/info.json`)) {
                        var obj = {
                            username: username, 
                            file: item, 
                            src: 'info.js'
                        }
                        if (!fs.existsSync(`${mPath}/${username}/portfolio`)) fs.mkdirSync(`${mPath}/${username}/portfolio`)
                        if (!fs.existsSync(`${mPath}/${username}/portfolio/${getFNameNoExt(item)}`)) fs.mkdirSync(`${mPath}/${username}/portfolio/${getFNameNoExt(item)}`)
                        fs.writeFileSync(`${mPath}/${username}/portfolio/${getFNameNoExt(item)}/info.json`, JSON.stringify(obj, null, 4))
                    }
                    var obj = fs.readFileSync(`${mPath}/${username}/portfolio/${getFNameNoExt(item)}/info.json`, 'utf8')
                    obj = `var data = ${obj}\n\nexport default data`
                    fs.writeFileSync(`${mPath}/${username}/portfolio/${getFNameNoExt(item)}/info.js`, obj)
                })
            }
        }
    }
});

members.forEach((username, i) => {
    var isDir = fs.lstatSync(`${mPath}/${username}`).isDirectory()
    if (isDir) {
        var info = `${mPath}/${username}/info.json`
        if (fs.existsSync(info)) {
            info = fs.readFileSync(info, 'utf-8')
            if (info) {
                if (info.startsWith('{') && info.endsWith('}')) {
                    info = JSON.parse(info)
                    info.username = username
                    
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