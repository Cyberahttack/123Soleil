// On récupère tous les modules nécessaires à l'exécution du programme
let express = require("express")
let fs = require("fs")
let log = require("./modules/log").log
let err = require('./modules/log').err
let body_parser = require("body-parser")
let session = require("express-session")
let Tache = require("./Tache")
let core = require("./modules/core")

// On crée le serveur express et on défini le port sur lequel il tournera
let app = express()
const PORT = 3000


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
        response.render("todo")
})

// Cette méthode POST permet de récupérer le titre de la tâche qui va être créée et va l'ajouter à la base de données
app.post('/', (request, response) => {
    core.data.auth()
    response.render("todo")
})


// On lance le serveur
app.listen(PORT)