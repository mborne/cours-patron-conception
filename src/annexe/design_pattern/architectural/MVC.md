# MVC

## Problème

En l'absence d'un cadre, une application qui se complexifie à tendance à se transformer en un plat de spaghetti. On se retrouve avec des composants qui font du rendu et des calculs.

## Principe

Pour plus de modularité et de clarté, on effectue une séparation claire entre :

* Des **vues** qui gèrent l'affichage
* Des **modèles** représentant les données
* Des **contrôleurs** qui gèrent l'appel aux traitements


## Variante de MVC dédié au WEB 

Les applications web ont des besoins spécifiques à l'utilisation du protocole HTTP. Généralement, le fonctionnement est le suivant :

* Les **contrôleurs** sont porteurs d'**actions** correspondant chacune à une page/fonctionnalité
* Un composant (`Router`) dirige chaque requête vers une action particulière :
    * `/books` : Action afficher la liste des livres (`BookController.listAction`)
    * `/books/{id}` : Action afficher le livre d'identifiant "id" (`BookController.showBook`)
* L'**action** récupère et **contrôle les paramètres de la requête**. A l'aide des paramètres, elle effectue un **traitement et renvoie un résultat**.
* Le résultat est renvoyé sous forme d'une **réponse** au client avec plusieurs cas de figures :
    * Le résultat est renvoyé directement au client (réponse texte, contenu d'un fichier,...)
    * Le résultat est renvoyé au client sous une forme sérialisée (JSON, XML,...)
    * Le résultat est mis en forme au format HTML à l'aide d'une **vue** s'appuyant sur un moteur de template.

### Exemple de code

* `BookController.php` : Exemple de controller

```php
class BookController extends Controller {
    
    /*
     * @Route("/books",name="book_index")
     */
    public function listAction(Request $request){
        $books = $this->getRepository("Books")->findAll();
        return $this->render(
            'Books:list.html.twig',
            [
                "books" => $books
            ]
        );
    }
    
    /*
     * @Route("/books/{id}",name="book_view")
     */
    public function viewAction(Request $request){
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

* `views/Books/list.html.twig` : Exemple de vue

```twig
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

Remarques :

* On soulignera l'utilisation du mécanisme de routage pour générer des URL
* On utilise ici un moteur de template ([TWIG](http://twig.sensiolabs.org/doc/tags/for.html)). Java dispose d'outils analogues (JSP)
* On soulignera l'utilisation d'un ORM (Doctrine) pour accéder aux données `$this->getRepository("Books")->findAll()`.


### Variantes côté serveur

Il existe de nombreux frameworks implémentant des variantes de ce concept :

* [Spring (JAVA)](https://spring.io/guides/gs/serving-web-content/#initial)
* [Express (NodeJS)](http://expressjs.com/en/starter/hello-world.html)
* [Symfony (PHP)](http://symfony.com/doc/current/index.html), [CodeIgniter](https://codeigniter.com/userguide3/tutorial/index.html)


### Variantes côté navigateur

Une des tendance actuelle consiste à mettre en place des API REST renvoyant des
données en JSON. La génération du code HTML est effectuée dans le navigateur
en JavaScript.

Côté client, on retrouvera des variantes du concept avec toujours l'idée de séparer le rendu de la manipulation des données :

* [React](https://reactjs.org/tutorial/tutorial.html#what-is-react)
* [Angular](https://angular.io/tutorial)
* [Vue.js](https://vuejs.org/v2/guide/#Declarative-Rendering)


### Avantages de l'utilisation du MVC

* Plus simple à maintenir (on retrouve facilement les actions et vues correspondant aux pages)
* Plus simple à sécuriser (cadre pour le contrôle des paramètres)
* Débride la croissance de l'application
* Travail en équipe facilité (travaille en parallèle sur plusieurs contrôleurs)
* Meilleure séparation des rôles (développeurs backend/frontend)

## Ressources

* [spring.io - Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/)
* [Symfony versus Flat PHP](http://symfony.com/doc/current/book/from_flat_php_to_symfony2.html)

