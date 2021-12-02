let log = require("./modules/log").log
let err = require("./modules/log").err

// Cette classe permet de centraliser les méthodes liées aux tâches
class Tache {
    static db = require("./db.js")

    // Méthode créant une tâche
    static create(nbTasks, title) {
        Tache.db.then( pool => {
            try {
                pool.query(`INSERT INTO taches(ordre, libelle, status) VALUES ("${nbTasks}", "${title}", 'A_FAIRE')`)
                log(`INSERT :${title} note`)
            } catch (error) {
                err("Couldn't INSERT : " + error)
            }

        })
    }

    // Méthode modifiant le statut de la tâche
    static update(id, status, cb) {
        Tache.db.then(pool => {
            pool.query(`UPDATE taches SET status = '${status}' WHERE id = ${id};`, (error, results) => {
                if (error) {
                    err("Couldn't update task " + id + " " +error)
                    cb("error")
                } else {
                    cb("ok")
                }
            })
        })
    }

    // Méthode modifiant le titre de la tâche
    static updateLibelle(id, name, cb) {
        Tache.db.then(pool => {
            pool.query(`UPDATE taches SET libelle = '${name}' WHERE id = ${id};`, (error, results) => {
                if (error) {
                    err("Couldn't update task " + id + " " +error)
                    cb("error")
                } else {
                    cb("ok")
                }
            })
        })
    }

    // Méthode modifiant l'ordre de la tâche
    static updateOrder(id, order, cb) {
        Tache.db.then(pool => {
            pool.query(`UPDATE taches SET ordre = ${order} WHERE id = ${id};`, (error, results) => {
                if (error) {
                    err("Couldn't update task " + id + " " +error)
                    cb("error")
                } else {
                    cb("ok")
                }
            })
        })
    }

    // Méthode supprimant la tâche
    static delete(id, cb) {
        Tache.db.then(pool => {
            pool.query(`DELETE FROM taches WHERE id=${id};`), (error, results) => {
                if (error) {
                    err("Couldn't delete task " + id+ " " + error)
                    cb("error")
                } else {
                    cb("ok")
                }
            }
        })
    }

    // Méthode permettant de récupérer toutes les tâches de la base de données
    static getTasks(cb) {
      Tache.db.then( pool => {
        try {
          pool.query(`SELECT * FROM taches`, function (error, results, fields) {
            if (error) {
              err("Couldn't get the tasks : " + error)
            }
            results.sort(function(a,b){return a.ordre - b.ordre})
            cb(results)
          })
        } catch (error) {
          err("Couldn't get the tasks : " + error)
          return undefined
        }
      })
    }
}

module.exports = Tache
