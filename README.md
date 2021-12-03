# 123Soleil

## Création d'un token d'accès GitHub

Dans les paramètres de votre compte GitHub, il vous faut générer un token d'accès personnel. Le menu se trouve dans Settings / Developer settings / Personal access tokens. Les scopes à sélectionner pour le bon fonctionnement de l'application sont les suivants :

- repo : Full control of private repositories

- admin:org/read:org : Read org and team membership, read org projects

- user/read:user : Read ALL user profile data

Une fois cela fait, il faut copier le token généré et le sauvegarder quelque part, car il ne pourra pas être affiché par la suite. C'est ce token qui est demandé lors de l'authentification à GitHub.
