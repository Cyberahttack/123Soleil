// On récupère tous les modules nécessaires à l'exécution du programme
let express = require("express")
let fs = require("fs")
let log = require("./modules/log").log
let err = require('./modules/log').err
let body_parser = require("body-parser")
let session = require("express-session")
let Tache = require("./Tache")

// On crée le serveur express et on défini le port sur lequel il tournera
let app = express()
const PORT = 443


// Configuration du serveur express
app.set('view engine', 'ejs')
app.use("/assets", express.static("public"))
app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())
app.use(session({
    secret: '5up32c00k13c4ch3ch1ff23',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))


app.use(require("./middlewares/flash"))

// Init
log("Server up and running on port " + PORT)

// Routing

// Dans notre cas nous n'avons qu'une page web, donc nous n'avons que cette méthode GET qui permet de récupérer la racine
app.get('/', (request, response) => {
    log("GET : /todo.ejs")
    // On récupère toutes les tâches actuellement dans la base de données pour les envoyer à la page et qu'il puisse les ajouter dans la vue
    Tache.getTasks(function(tasks) {
        for (let i = 0; i < tasks.length; i++) {
            log("Tasks : " + tasks[i].libelle)
        }
        response.render("todo", {tasks})
    })
})

// Cette méthode POST permet de récupérer le titre de la tâche qui va être créée et va l'ajouter à la base de données
app.post('/', (request, response) => {

    // On vérifie que le titre à bien été défini
    if (request.body.title === undefined || request.body.title === '') {
        request.flash("error", "no title")
        err("POST : Title undefined")

    } else {
        log("POST : Title - " + request.body.title)
        Tache.getTasks(function(tasks) {
            Tache.create(tasks.length+1, request.body.title, () => {
                request.flash('success', 'todo added')
            })
        })
    }
    response.redirect("/")
})

// Cette méthode PUT est celle qui va mettre à jour le statut de la tâche
app.put('/', (request, response) => {
    log("PUT : " + request.body.id + " --> " + request.body.status)
    Tache.update(request.body.id, request.body.status, (res) => {
        if (res !== "ok") {
            request.flash("put_error", "Couldn't update task" + request.body.id + " value")
            err("Error while updating database : " + res)
        }
    })
    response.status(200)
    response.location("/")
    response.send(null)
})

// Cette méthode PUT va mettre à jour l'ordredes tâches après un drag&drop
app.put('/order', (request, response) => {
    log("PUT : " + request.body.id + " --> " + request.body.status)
    Tache.updateOrder(request.body.id, request.body.ordre, (res) => {
        if (res !== "ok") {
            request.flash("put_error", "Couldn't update task" + request.body.id + " value")
            err("Error while updating database : " + res)
        }
    })
    response.status(200)
    response.send(null)
})

// Cette méthode PUT va mettre à jour le titre de la tâche
app.put('/modifTask', (request, response) => {
    log("PUT : " + request.body.id + " --> " + request.body.status)
    if (request.body.libelle != null) {
        Tache.updateLibelle(request.body.id, request.body.libelle, (res) => {
            if (res !== "ok") {
                request.flash("put_error", "Couldn't update task" + request.body.id + " value")
                err("Error while updating database : " + res)
            }
        })
    }
    response.status(200)
    response.location("/")
    response.send(null)
})

// Cette méthode DELETE va supprimer la tâche choisie
app.delete('/', (request, response) => {
    log("DELETE : " + request.body.id)
    Tache.delete(request.body.id, (res) => {
        if (res !== "ok") {
            request.flash("del_error", "Couldn't delete task " + request.body.id)
            err("Error while deleting : " + res)
        }
    })
    response.status(200)
    response.location("/")
    response.send(null)
})

// On lance le serveur
app.listen(PORT)