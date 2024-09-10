# Prototype

## Problème

Nous souhaitons créer une instance qui soit une copie conforme d'une autre.

## Cas d'école

Nous devons écrire une méthode qui renvoie une version modifiée d'un objet passé en paramètre, sans modifier l'objet passé en paramètre.

## Solution

Toutes les classes dérivées implémentent une méthode "clone()" renvoyant une copie conforme.

![UML Prototype](uml/UML_DP_Prototype.png)

Source : https://fr.wikibooks.org/wiki/Patrons_de_conception/Prototype

## Mises en garde

* L'**implémentation de clone est délicate!** (ex : sans précaution particulière, deux copies pourront pointer sur le même tableau)
* Il convient de **copier les variables** membres pour les objets qui peuvent être modifiés après la construction (notion d'[Immutable Objects](http://docs.oracle.com/javase/tutorial/essential/concurrency/immutable.html))
* La méthode de copie dépendra du langage et le patron prototype ne sera pas toujours le plus adapté.

## Lien(s) utile(s)

Voir aussi :

* [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) pour JavaScript
* [copy](https://docs.python.org/fr/3/library/copy.html) pour Python



