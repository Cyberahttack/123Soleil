let tokens = require("../conf.json").token;
let log = require("./log").log
const { Octokit } = require("@octokit/core");
let octokit;


exports.data = {
    auth : async function(token) {
        octokit = new Octokit({auth: `${token}`})
        try {
            let response = await octokit.request("GET /user")
            //let parsed = JSON.parse(response.data)
            return response.data.login
        } catch {
            return null
        }

    }


}



/*
log("Accessed auth function")
        const response = await octokit.request("GET /repos/{owner}/{repo}/projects", {
            owner: "cyberahttack",
            repo: "123Soleil"
        })
        log((JSON.stringify(response)));
 */