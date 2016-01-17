# MVC

## Problème

En l'absence de cadre, une application qui se complexifie à tendance à se transformer
en un plat de spaghetti. 

On se retrouve avec des composants qui font du rendu et des calculs. Dans le cas particulier
des applications web, on peine pour réaliser les appels entre les différentes pages, on mélange 
le contrôle des paramètres et la génération des requêtes SQL, etc.

## Principe

Pour plus de modularité et de clarté, on effectue une séparation claire entre :

* Des vues qui gère l'affichage
* Des modèles qui correspondent à la modélisation
* Des controlleurs qui gère l'appel aux traitements


## Variante de MVC dédié au WEB 

Les applications web ont des besoins spécifiques à l'utilisation 
du protocole HTTP. Généralement, le fonctionnement est le suivant.

### Dispatching des requêtes sur des actions

Les controlleurs porteurs d'actions correspondant chacune à 
une fonctionnalité/page.

Un composant (Router) dirige chaque requête vers une action particulière, 
souvent à l'aide d'expression régulière :

- "/books" : Action afficher la liste des livres (BookController.listAction)
- "/books/{id}" : Action afficher le livre d'identifiant "id" (BookController.showBook)

### Action : contrôles des paramètres et récupérations des résultats

L'action récupère et contrôle les paramètres de la requête. A l'aide
des paramètres, elle effectue un traitement et renvoie un résultat.

### Response

Le résultat d'une action peut être une response directement affichable. Une réponse texte, 
une réponse XML, etc. Dans ce cas, la réponse est renvoyées directement au client.

### View

Quand la construction de la réponse demande une mise en forme, l'action définit 
des variables utiles pour le rendu (exemple : une variable "books" 
correspondant à la liste des livres à afficher).

Ces variables sont transmise à la vue qui se charge du rendu se charge de la 
génération du code HTML.

Ci après, un code illustrant ces principes dans le cadre de la gestion
d'une liste de livre.

### Exemple de code

* BookController.php : Exemple de controller

```
class BookController extends Controller {
    
    @Route("/books",name="book_index")
    public void listAction(Request $request){
        $books = $this->getRepository("Books")->findAll();
        return $this->render(
            'Books:list.html.twig',
            [
                "books" => $books
            ]
        );
    }
    
    
    @Route("/books/{id}",name="book_view")
    public void viewAction(Request $request){
        $id = $request->getParam('id') ;
        $book = $this->getRepository("Books")->find($id);
        return $this->render(
            'Books:view.html.twig',
            [
                "book" => $book
            ]
        );
    }
    
}
```

* views/Books/list.html.twig : Exemple de vue

```(twig)
<ul>
{% for book in books %}
    <li>    
        <a href="{{ path('book_view',{id: book.id}) }}">
            {{ book.name }}
        </a>
    </li>
{% endfor %}
</ul>
```

Remarque :

* On soulignera l'utilisation du mécanisme de routage pour générer des URL
* On utilise ici un moteur de template ([TWIG](http://twig.sensiolabs.org/doc/tags/for.html)). Java dispose d'outils analogues (JSP)
* On soulignera l'utilisation d'un ORM (Doctrine) pour accéder aux données ```$this->getRepository("Books")->findAll()```. Ce composant se repose sur le patron DAO qui pose entre autre la notion de Repository pour modéliser les accès aux données.


### Exemple de framework

* PHP : [Symfony2](http://symfony.com/doc/current/index.html), [CodeIgniter](https://codeigniter.com/userguide3/tutorial/index.html)
* Java : Spring


### Variantes côté serveur

Il existe une version simplifiée du mode de fonctionnement illustré précédemment.

Au lieu de créer de classes, on définit des fonctions anonymes pour traiter les 
résultats des requêtes.

Exemple de framework :

* [Express en NodeJS](http://expressjs.com/en/starter/hello-world.html)
* [Silex en PHP](http://silex.sensiolabs.org/)

Dans une moindre mesure, on se rapproche de cette simplicité dans les micro-framework :

* [SpringBoot en Java](http://projects.spring.io/spring-boot/#quick-start)

### Variante côté navigateur

Une des tendance actuelle consiste à mettre en place des API REST renvoyant des
données en JSON. La génération du code HTML est effectuées dans le navigateur
en JavaScript. On trouvera des MVC côté client tel :

* [AngularJS](https://docs.angularjs.org/tutorial/step_07)
* [Backbone.js](http://backbonejs.org/#Getting-started)
* [Ember.js](http://emberjs.com/)

### Avantages

* Plus simple à maintenir (on retrouve facilement les actions et vues
correspondant aux pages)
* Plus simple à sécuriser (on vérifie plus facilement le contrôle des paramètres)
* Débride la croissance de l'application
* Facilite le travail en équipe (à chacun son contrôleur)
* Séparation des rôles : développeurs backend/frontend

## Et pour les applications classiques ou mobile?

Les frameworks dédiés à la création d'application s'appuient généralement
sur ce concept pour la gestion des IHM.

* Qt (C++), utilisé par QuantumGIS

On retrouve le concept de controller dans la gestion des événéments de l'interface.
Les composants de l'interface génèrent des signaux (ex : "clicked" pour un bouton) qui sont connecté
à des slots (ex : "chooseFile" pour l'action à effectuer).

[Exemple d'application QT](http://doc.qt.io/qt-5/qtwidgets-mainwindows-application-example.html)

On retrouve le concept de "View" dans l'utilisation des ".ui" qui servent à 
générer le code de l'interface (ajout des boutons, des menus, etc.)

* DotNet avec XAML pour les vues

## Resources

* [Symfony versus Flat PHP](http://symfony.com/doc/current/book/from_flat_php_to_symfony2.html)

