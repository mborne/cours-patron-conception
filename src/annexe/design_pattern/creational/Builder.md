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
* Définition de la cible par appels successifs au builder (add, set, etc...)
* Récupération de l'instance produite (getProduct)

## Exemple en Java

* [StringBuilder](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html)

* [CalendarBuilder](https://docs.oracle.com/javase/8/docs/api/java/util/Calendar.Builder.html)

```java
Calendar cal = new Calendar.Builder()
    .setCalendarType("iso8601")
    .setWeekDate(2013, 1, MONDAY)
    .build() // récupération du résultat
;
```

* [ProcessBuilder](https://docs.oracle.com/javase/8/docs/api/java/lang/ProcessBuilder.html)

```java
// Création du builder (argument obligatoire du processus)
ProcessBuilder pb = new ProcessBuilder("myCommand", "myArg1", "myArg2");

// Manipulation du builder (argument optionnels du processus)
Map env = pb.environment();
env.put("VAR1", "myValue");
env.remove("OTHERVAR");
env.put("VAR2", env.get("VAR1") + "suffix");
pb.directory(new File("myDir"));

// Récupération du résultat
Process p = pb.start();
```

* [locationtech.github.io - JTS - DelaunayTriangulationBuilder](https://locationtech.github.io/jts/javadoc/org/locationtech/jts/triangulate/DelaunayTriangulationBuilder.html)


## Liens utiles

* [Discussion sur l'intérêt des beans couplés au design pattern Builder](https://kodelog.wordpress.com/tag/telescopic-constructor-pattern/)
* [Exemple d'utilisation dans la création de formulaire dans Symfony (PHP)](http://symfony.com/doc/current/book/forms.html#building-the-form)
* [Exemple d'utilisation dans la création de requête SQL (PHP)](http://doctrine-orm.readthedocs.org/projects/doctrine-orm/en/latest/reference/query-builder.html#high-level-api-methods)
