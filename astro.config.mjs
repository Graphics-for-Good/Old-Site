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
                    var obj = {
                        username: username,
                        file: item
                    }
                    portfolio.push(obj)
                    if (!fs.existsSync(`${mPath}/${username}/portfolio/${getFNameNoExt(item)}/`)) {
                        fs.mkdirSync(`${mPath}/${username}/portfolio/${getFNameNoExt(item)}/`)
                    }
                    fs.copySync(`${mPath}/${username}/portfolio/${item}`, `${mPath}/${username}/portfolio/${getFNameNoExt(file)}/${item}`)

                    obj.src = 'info.js'
                    obj = `var data = ${JSON.stringify(obj, null, 4)}\n\nexport default data`
                    fs.writeFileSync(`${mPath}/${username}/portfolio/${getFNameNoExt(file)}/info.js`)
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
  str = str.slice(0, -1*getFExt(str, 2).length)
  return str
}

function getFExt(str, level=1) {
  str = getFName(str)
  if (level > 0) level *= -1
  if (str.includes('.')) {
    str = str.split('.')
    switch (level) {
      case 0: 
        break
      default: 
        str = str.slice(level)
        break
    }
    str = str.join('.')
  }
  return str
}

export default defineConfig({
    site: siteUrl,
    base: '/',
    trailingSlash: "ignore",
    integrations: [sitemap()],
});