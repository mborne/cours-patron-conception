# Outils de gestion des dépendances

La plupart des outils comporte :

* Un descripteur de projet qui liste les dépendances et leurs versions
* Un utilitaire en ligne de commande pour télécharger les dépendances et construire le projet
* Un dépôt central à partir duquel on télécharge les packages (tout en ayant la possibilité de monter des dépôts privés)

L'utilitaire en ligne de commande offre généralement au moins les opérations suivante :

* init : génération d'un descripteur de projet
* install : installer les dépendances
* update : mettre à jour les/des dépendances
* search : rechercher un package

## Java - MAVEN/NEXUS

MAVEN est courament utilisé pour gérer les dépendances d'un projet JAVA.

* Descripteur du projet : Fichier pom.xml
* Dépôt central : [mvnrepository](http://mvnrepository.com/)
* Dépôt privé : sonatype/Nexus
* Démarrage rapide : [Maven in five minutes](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)
* Voir [maven-assembly-plugin](http://maven.apache.org/plugins/maven-assembly-plugin/) pour générer des zip/tar.gz contenant les jar, les .sh/.bat et autres ressources)

## NodeJS - NPM

Principalement utilisé pour :

* Gérer les dépendances NodeJS (express par exemple) et les dépendances du front (jquery, bootstrap, openlayers, etc.)
* Gérer l'installation des outils côté serveur (webpack, gulp, etc.)
* Gérer l'exécution de tâche (`npm start` pour démarrer un serveur)
* Descripteur du projet : package.json
* Dépôt central : [npmjs.com](https://www.npmjs.com/)
* Démarrage rapide : [Testez express](https://www.npmjs.com/package/express)!

Remarque :

* Noter la notion d'installation globale (`npm install -g less`)
* Noter l'évolution rapide des modes au niveau des outils de construction [Grunt](http://gruntjs.com/getting-started), Gulp, webpack, ParcelJS, etc.


## PHP - COMPOSER/SATIS

Composer permet :

* La gestion efficace des dépendances d'un projet
* La génération des autoloaders (pour éviter de faire des include/require_once partout dans le code)
* L'exécution de script post install et post update

Principe :

* composer.json décrit le projet
* L'exécutable composer lit le fichier composer.json et installe les dépendances dans vendor
* L'utlisateur fait un seul include : vendor/autoload.php
* Dépôt central : [Packagist](https://packagist.org/)
* Dépôt privé : [SATIS](https://github.com/composer/satis)
* Démarrage rapide : [Introduction et Basic usage (getcomposer.org)](https://getcomposer.org/doc/00-intro.md) puis tester [Silex](http://silex.sensiolabs.org/)

## CMake - C++

Utilitaire pour la compilation qui permet dans une moindre mesure de gérer les dépendances :

* `find_package` permet de récupérer les chemins vers les bibliothèques installées sur le système.
* la génération de fichier de configuration permet l'utilisation de `find_package` en l'absence de finder.

Par contre, pour installer les bibliothèques tierces, il faut :

* Faire appel à des systèmes de packaging liés aux systèmes (nugget, apt, yum, etc.)
* S'appuyer sur git submodule
* ...

