var fs = require('fs-extra')

var f1 = './members'
var f2 = fs.readdirSync(f1)

f2.forEach(f3 => {
    if (!fs.lstatSync(`${f1}/${f3}`).isDirectory()) return
    var f4 = fs.readdirSync(`${f1}/${f3}`)

    f4.forEach(f5 => {
        if (!fs.lstatSync(`${f1}/${f3}/${f5}`).isDirectory()) return

        
        var f6 = fs.readdirSync(`${f1}/${f3}/${f5}`)
        
        f6.forEach(f7 => {
            if (fs.lstatSync(`${f1}/${f3}/${f5}/${f7}`).isDirectory()) return
            console.log(`${f3}/${f7}`)
            if (!fs.existsSync(`${f1}/${f3}/${f5}/${getFNameNoExt(f7)}`)) fs.mkdirSync(`${f1}/${f3}/${f5}/${getFNameNoExt(f7)}`)
            var obj = {
                username: f3, 
                file: f7, 
                src: 'info.js', 
            }
            var content = JSON.stringify(obj, null, 4)

            if (getFExt(f7) !== '.pdf') {
                fs.writeFileSync(`${f1}/${f3}/${f5}/${getFNameNoExt(f7)}/info.json`, content)
            }

            fs.moveSync(`${f1}/${f3}/${f5}/${f7}`, `${f1}/${f3}/${f5}/${getFNameNoExt(f7)}/${f7}`)
        })
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
    console.log(str)
    if (str.includes('.')) {
        str = str.split('.')
        str = str.slice(-1)
        str = str.join('.')
        str = `.${str}`
    }
    return str
}

