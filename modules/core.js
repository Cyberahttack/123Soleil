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
                let proj_response = await octokit.request("GET /repos/{owner}/{repo}/projects", {
                    owner: orgs_data[i].login,
                    repo: repos_data[j].name
                })

                let proj_data = proj_response.data
                let projects = []

                for (let k = 0; k < proj_response.data.length; k++) {
                    projects[k] = {projName: proj_data[k].name, projID: proj_data[k].id}
                }

                repos[j] = {repName: repos_data[j].name, repID: repos_data[j].id, projectsList: projects}
            }

            orgs[i] = {orgName: orgs_data[i].login, orgID: orgs_data[i].id, repos}

        }

        return orgs

    },

    getCollaborators: async function() {
      let response = await octokit.request("GET /user/orgs")


      let orgs_data = response.data
      let orgs = []
      for (let i = 0; i < response.data.length; i++) {
          let rep_response = await octokit.request("GET /orgs/{org}/repos", {
              org: orgs_data[i].login
          })

          for (let j = 0; j < rep_response.data.length; j++) {
              let proj_response = await octokit.request("GET /repos/{owner}/{repo}/projects", {
                  owner: orgs_data[i].login,
                  repo: rep_response.data[j].name
              })

              let proj_data = proj_response.data
              let collaborators = []

              for (let k = 0; k < proj_response.data.length; k++) {
                  let collab_response = await octokit.request("GET /projects/{project_id}/collaborators", {
                    project_id: proj_response.data[k].id
                  })
                  collaborators[k] = {avatarURL: collab_response.data[k].avatar_url, url: collab_response.data[k].url}
              }
          }

      }

      return collaborators
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
