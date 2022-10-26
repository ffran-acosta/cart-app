const {resolve} = require('path')
const fs = require('fs')

const model = {
    all: () => {
        let file = resolve(__dirname,'../data','products.json')
        let data = fs.readFileSync(file)
        return JSON.parse(data)
    },
    one: (id) => {
        let all = model.all();
        return all.find(e => e.id == id)
    }
}

module.exports = model