# Bridge

## Problème

On souhaite découpler une abstraction de son implémentation afin que les deux puissent
varier indépendemment l'une de l'autre.


## Solution

![UML Bridge](uml/UML_Bridge.png)

Source [<https://en.wikipedia.org/wiki/Bridge_pattern>](https://en.wikipedia.org/wiki/Bridge_pattern)

## Exemple

* On pose un interface pour les transformations de coordonnées géographique

```java
interface ProjectionTransform {
    public Geometry transform(String sourceCRS, String targetCRS, Geometry g );
}
```

* On réalise l'implémentation à l'aide de geotools

```java
interface GeotoolProjectionTransform {
    public Geometry transform(String sourceCRS, String targetCRS, Geometry g );
}
```

=> On limite la dépendance à geotools dès lors que l'on dépend de `ProjectionTransform`.

## Mise en garde

A ne pas confondre avec "Bridge" et "Adapter". Les objectifs ne sont
pas les mêmes.

## Liens utiles

* [Description détaillées sur sourcemaking.com](https://sourcemaking.com/design_patterns/bridge)

* [Exemple de l'envoie de message de types différents](https://springframework.guru/gang-of-four-design-patterns/bridge-pattern/)

Remarque : Utilise aussi l'injection de dépendance via spring.

* [Exemple d'API de dessin](http://www.tutorialspoint.com/design_pattern/bridge_pattern.htm)

Attention : En pratique, on aurait tendance à faire en sorte que les shape ignore le concept de dessin.

* [Les ponts entre Symfony2 et bibliothèques tierces](https://github.com/symfony/symfony/tree/master/src/Symfony/Bridge)

Bibliothèques tierces `Monolog` pour la gestion des log, `Doctrine` pour la gestion des données (ORM), etc.

