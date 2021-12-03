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

    },

    getProjects: async function() {
        let response = await octokit.request("GET /user/orgs")


        let orgs_data = response.data
        let orgs = []
        for (let i = 0; i < response.data.length; i++) {
            let rep_response = await octokit.request("GET /orgs/{org}/repos", {
                org: orgs_data[i].login
            })

            let repos_data = rep_response.data
            let repos = []

            for (let j = 0; j < rep_response.data.length; j++) {
                repos[j] = {repName: repos_data[j].name, repID: repos_data[j].id}
            }

            orgs[i] = {orgName: orgs_data[i].login, orgID: orgs_data[i].id, repos}

        }

        return orgs

    },

    getIssues : async function(org, repo) {
        const response = await octokit.request("GET /repos/{owner}/{repo}/issues", {
            owner: org,
            repo: repo
        })

        let score = new Map()
        let issues = []
        let issues_data = response.data
        for (let i = 0; i < issues_data.length; i++) {
            let issue = {labels: issues_data[i].labels == null ? 0 : issues_data[i].labels.length, assignees: issues_data[i].assignee == null ? 0 : issues_data[i].assignees.length, milestone: issues_data[i].milestone == null ? false : true}
            if (issues_data.assignees != null && issues_data.assignees.length > 0) {
                issues_data.assignees.forEach((ppl) => {
                    if (score.has(ppl.login))
                        score.set(ppl.login, score.get(ppl.login)+1)
                    else
                        score.set(ppl.login, 1)

                })

            }
            issues.push(issue)

        }

        return [issues, score]
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