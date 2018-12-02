# Bridge

## Problème

On souhaite découpler une abstraction de son implémentation afin que les deux puissent
varier indépendemment l'une de l'autre.

TODO affiner avec exemple concret.

## Solution

![UML Bridge](uml/UML_Bridge.png)

Source [<https://en.wikipedia.org/wiki/Bridge_pattern>](https://en.wikipedia.org/wiki/Bridge_pattern)

## Exemple

TODO

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

Bibliothèque de gestion de log (Monolog), bibliothèque de
