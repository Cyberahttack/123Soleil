const colors = require("colors")
const plus = "+".green
const moins = "-".red

exports.log = function(text) {
    console.log(`[${plus}] ` + new Date().toLocaleTimeString('fr-FR').blue + "\t" + text)
}

exports.err = function(text) {
    console.log(`[${moins}] ` + new Date().toLocaleTimeString('fr-FR').blue + "\t" + text)
}

