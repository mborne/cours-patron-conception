# Les outils de gestion des dépendances

## Principe

Un outil de gestion de dépendances s'appuie généralement sur :

* Un **descripteur de projet** qui **liste les dépendances et leurs versions**
* Un **utilitaire en ligne de commande pour télécharger les dépendances** et **construire le projet**
* Au moins un **dépôt public** permettant le téléchargement des dépendances (tout en ayant la **possibilité d'avoir dépôts privés**)

## Quelques exemples

### Apache Maven (Java) 

[Maven](https://maven.apache.org/) est couramment utilisé pour gérer les dépendances d'un projet JAVA.

* Descripteur du projet : `pom.xml`
* Dépôt central : [mvnrepository](http://mvnrepository.com/)
* Démarrage rapide : [Maven in five minutes](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)
* Alternative : [Gradle](https://gradle.org/)

### NPM (NodeJS, JavaScript) 

[npm](https://www.npmjs.com/) est principalement utilisé pour gérer les dépendances NodeJS (express par exemple) et les dépendances du front (jquery, bootstrap, OpenLayers, etc.) :

* Descripteur du projet : `package.json`
* Dépôt central : [npmjs.com](https://www.npmjs.com/)
* Démarrage rapide : [Testez express](https://www.npmjs.com/package/express)!
* Alternative : [yarn](https://yarnpkg.com/)
