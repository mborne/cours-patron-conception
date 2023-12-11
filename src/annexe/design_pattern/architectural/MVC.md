# MVC

## Problème

En l'absence d'un cadre, une application qui se complexifie à tendance à se transformer en un plat de spaghetti avec des composants qui font du rendu et des calculs.

## Principe

Pour plus de modularité et de clarté, il convient de poser une séparation claire entre :

* Des **vues** qui gèrent l'affichage
* Des **modèles** représentant les données
* Des **contrôleurs** qui gèrent l'appel aux traitements

## Cas des applications WEB

Les **applications web** ont des **besoins spécifiques au traitement des requêtes HTTP**. Généralement, le fonctionnement d'un framework MVC côté serveur sera le suivant :

* Les **contrôleurs** sont porteurs d'**actions** correspondant chacune à **une route**
* Un composant (`Router`) dirige chaque requête vers une action particulière :
    * `/books` : Action afficher la liste des livres (`BookController.listAction`)
    * `/books/{id}` : Action afficher le livre d'identifiant "id" (`BookController.showBook`)
* L'**action** récupère et **contrôle les paramètres de la requête**. A l'aide des paramètres, elle effectue un **traitement et renvoie un résultat**.
* Le résultat est renvoyé sous forme d'une **réponse** au client avec plusieurs cas de figures :
    * Le résultat est renvoyé directement au client (réponse texte, contenu d'un fichier,...)
    * Le résultat est renvoyé au client sous une forme sérialisée (JSON, XML,...)
    * Le résultat est mis en forme au format HTML à l'aide d'une **vue** s'appuyant généralement sur un **moteur de template**.

## Variantes côté serveur

Il existe de nombreux frameworks implémentant des variantes de ce concept dans différents langages :

* [Spring (JAVA)](https://spring.io/guides/gs/serving-web-content/#initial)
* [Express (NodeJS)](http://expressjs.com/en/starter/hello-world.html), [Fastify (NodeJS)](https://fastify.dev/),...
* [Symfony (PHP)](http://symfony.com/doc/current/index.html), [CodeIgniter (PHP)](https://codeigniter.com/userguide3/tutorial/index.html), [Laravel (PHP)](https://laravel.com/)

## Variantes côté navigateur

Une des tendance actuelle consiste à mettre en place des API REST renvoyant des données en JSON avec une génération du code HTML effectuée dans le navigateur en JavaScript.

Côté client, nous retrouverons des variantes du concept de MVC où l'idée est toujours de **séparer le rendu de la manipulation des données** :

* [React](https://reactjs.org/tutorial/tutorial.html#what-is-react)
* [Vue.js](https://vuejs.org/guide/introduction.html#Declarative-Rendering)
* [Angular](https://angular.io/tutorial)


## Avantages de l'utilisation du MVC

* Plus simple à **maintenir** (on retrouve facilement les actions et vues correspondant aux pages)
* Plus simple à **sécuriser** (cadre pour le contrôle des paramètres, l'échappement des rendus HTML,...)
* Capacité à enrichir l'application
* Travail en équipe facilité (travail en parallèle sur plusieurs contrôleurs)
* Meilleure séparation des rôles (développeurs backend/frontend)

## Ressources

* [java-design-patterns.com - Model-View-Controller](https://java-design-patterns.com/patterns/model-view-controller/)
* [spring.io - Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/)
* [Symfony versus Flat PHP](http://symfony.com/doc/current/book/from_flat_php_to_symfony2.html)

