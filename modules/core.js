let token = require("../conf.json").token;
let log = require("./log").log
const { Octokit } = require("@octokit/core");

let octokit = new Octokit({auth: `${token}`})
log(`Auth : ${token}`)

exports.data = {
    auth : async function() {
        log("Accessed auth function")
        const response = await octokit.request("GET /repos/{owner}/{repo}/projects", {
            owner: "cyberahttack",
            repo: "123Soleil"
        })
        log((JSON.stringify(response)));
    }
}
