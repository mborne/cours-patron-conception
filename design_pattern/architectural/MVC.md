# MVC

## Problème

En l'absence de cadre, une application qui se complexifie à tendance à se transformer
en un plat de spaghetti. 

On se retrouve avec des composants qui font du rendu et des calculs. Dans le cas particulier
des applications web, on peine pour réaliser les appels entre les différentes pages.


## Principe

Pour plus de modularité et de clarté, on effectue une séparation claire entre :

* Des vues qui gère l'affichage
* Des modèles qui correspondent à la modélisation
* Des controlleurs qui gère l'appel aux traitements


## Variante de MVC dédié au WEB 

Les applications web ont des besoins spécifiques à l'utilisation 
du protocole HTTP. Généralement, le fonctionnement est le suivant.

Les controlleurs porteurs d'actions correspondant chacune à 
une fonctionnalité/page.

Un composant (Router) dirige chaque requête vers une action particulière, 
souvent à l'aide d'expression régulière :

- "/books" : Action afficher la liste des livres (BookController.listAction)
- "/books/{id}" : Action afficher le livre d'identifiant "id" (BookController.showBook)
x
L'action récupère et contrôle les paramètres de la requête. A l'aide
des paramètres, elle effectue un traitement et renvoie un résultat.

Le résultat d'une action peut être une response directement affichable. Une réponse texte, 
une réponse XML, etc. Dans ce cas, la réponse est renvoyées directement au client.

Sinon, l'action définit des variables qui seront affichée par la vue. Par exemple,
une variables "books" books correspondant à la liste des livres à afficher.

Ces variables sont transmise à la vue qui se charge du rendu.

Ci après, un code illustrant ces principes dans le cadre de la gestion
d'une liste de livre.


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

```


Exemple de framework :

* PHP : [Symfony2](http://symfony.com/doc/current/index.html), [CodeIgniter](https://codeigniter.com/userguide3/tutorial/index.html)
* Java : Spring


## Version simplifiée dédiée au WEB

Il existe une version simplifiée du mode de fonctionnement illustré précédemment.

Au lieu de créer de classes, on définit des fonctions anonymes pour traiter les 
résultats des requêtes.

Exemple de framework :

* [Express en NodeJS](http://expressjs.com/en/starter/hello-world.html)
* [Silex en PHP](http://silex.sensiolabs.org/)

Dans une moindre mesure, on se rapproche de cette simplicité dans les micro-framework :

* [SpringBoot en Java](http://projects.spring.io/spring-boot/#quick-start)


## Resources

* [Symfony versus Flat PHP](http://symfony.com/doc/current/book/from_flat_php_to_symfony2.html)

