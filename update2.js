var fs = require('fs-extra')
const { info } = require('sass')

var f1 = './public/assets/members'
var f2 = fs.readdirSync(f1)

f2.forEach(f3 => {
    if (!fs.lstatSync(`${f1}/${f3}`).isDirectory()) return
    var f4 = fs.readdirSync(`${f1}/${f3}`)
    
    f4.forEach(f5 => {
        if (!fs.lstatSync(`${f1}/${f3}/${f5}`).isDirectory()) return
        var f6 = fs.readdirSync(`${f1}/${f3}/${f5}`)
        
        if (f5 === 'portfolio') {
            f6.forEach(f7 => {
                if (!fs.lstatSync(`${f1}/${f3}/${f5}/${f7}`).isDirectory()) return
                var f8 = fs.readdirSync(`${f1}/${f3}/${f5}/${f7}`)
    
                f8.forEach(f9 => {
                    if (f9 === 'info.js' || f9 === 'info.json') {
                        fs.unlinkSync(`${f1}/${f3}/${f5}/${f7}/${f9}`)                    
                    }
                })
            })
        }
    })
})

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

