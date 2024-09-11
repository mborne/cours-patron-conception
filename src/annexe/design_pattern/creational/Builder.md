# Builder (Monteur)

## Problème

Les fabriques traitent principalement l'instanciation de classes en présence d'une hiérarchie.

Le patron de conception **Builder (Monteur)** s'attaque à l'**instanciation de classes avec des états ou relations complexes**. Il sera **utile pour éviter** :

* De **nombreux appels à des accesseurs** (set, add, etc.)
* La **multiplication des constructeurs**

## Solution

Dans sa **forme originale**, le patron de conception monteur préconise de déléguer la complexité de la construction à des instances dédiées (**Builder et Director**) comme suit :

![UML Builder](uml/UML_DP_Builder.png)

Source [https://en.wikibooks.org/wiki/Computer_Science_Design_Patterns/Builder](https://en.wikibooks.org/wiki/Computer_Science_Design_Patterns/Builder) où un [exemple en Java est disponible](https://fr.wikipedia.org/wiki/Monteur_%28patron_de_conception%29#Java) avec :

* Des **Pizza** (*Product*) 
* Une interface **MonteurPizza** (*Builder*) avec deux implémentations (*ConcreteBuilder*)
  * **MonteurPizzaReine**
  * **MonteurPizzaPiquante**
* Un **Serveur** (*Director*)

## Variantes

En pratique, la distinction ne sera pas toujours faite entre "Director" et "Builder". La **terminologie builder est généralisée à la création incrémentale d'objet** :

* Création ou récupération d'un builder
* Appels successifs au builder pour fournir les informations requises pour la construction (add, set, etc...)
* Récupération de l'instance produite (getProduct)

Par exemple, avec un `DelaunayTriangulationBuilder` implémentant une triangulation de Delaunay :

```ts
const builder = new DelaunayTriangulationBuilder();
for ( const point of points ){
  builder.addPoint(point);
}
builder.getTriangles(); // récupération des triangles
```

## Liens utiles

* [fr.wikibooks.org - Monteur](https://fr.wikibooks.org/wiki/Patrons_de_conception/Monteur)
* [Exemple d'utilisation dans la création de formulaire dans Symfony (PHP)](http://symfony.com/doc/current/book/forms.html#building-the-form)
* [Exemple d'utilisation dans la création de requête SQL (PHP)](http://doctrine-orm.readthedocs.org/projects/doctrine-orm/en/latest/reference/query-builder.html#high-level-api-methods)
