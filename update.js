var fs = require('fs-extra')
const { info } = require('sass')

var f1 = './members'
var f2 = fs.readdirSync(f1)

f2.forEach(f3 => {
    if (!fs.lstatSync(`${f1}/${f3}`).isDirectory()) return
    var f4 = fs.readdirSync(`${f1}/${f3}`)

    f4.forEach(f5 => {
        if (!fs.lstatSync(`${f1}/${f3}/${f5}`).isDirectory()) return

        
        var f6 = fs.readdirSync(`${f1}/${f3}/${f5}`)
        
        f6.forEach(f7 => {
            if (f5 === 'renamedPortfolio') {
                fs.unlinkSync(`${f1}/${f3}/${f5}/${f7}`)
            }
            function one() {
                if (!fs.lstatSync(`${f1}/${f3}/${f5}/${f7}`).isDirectory()) return
                var f8 = fs.readdirSync(`${f1}/${f3}/${f5}/${f7}`)
                f8.forEach(f9 => {
                    if (f9 === 'info.js') {
                        var content = fs.readFileSync(`${f1}/${f3}/${f5}/${f7}/${f9}`, 'utf8')
                        content = content.slice(11, -21)
                        fs.writeFileSync(`${f1}/${f3}/${f5}/${f7}/info.json`, content)
                        fs.unlinkSync(`${f1}/${f3}/${f5}/${f7}/${f9}`)
                    }
                })
            }
        })

        if (f5 === 'renamedPortfolio') {
            fs.rmdirSync(`${f1}/${f3}/${f5}`)
        }
    })
})