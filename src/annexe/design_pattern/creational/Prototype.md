# Prototype

## Problème

Nous souhaitons créer une instance qui soit une copie conforme d'une autre.

## Cas d'école

Nous devons écrire une méthode qui renvoie une version modifiée d'un objet passé en paramètre, sans modifier l'objet passé en paramètre.

## Solution

Toutes les classes dérivées implémentent une méthode "clone()" renvoyant une copie conforme.

![UML Prototype](uml/UML_DP_Prototype.png)

Source : https://fr.wikibooks.org/wiki/Patrons_de_conception/Prototype

## Exemple dans l'API Java

Les exemples sont légion, l'API dispose d'une interface Cloneable.

## Mise en garde

* L'**implémentation de clone est délicate!** (ex : sans précaution particulière, deux copies pourront pointer sur le même tableau)
* Il convient de **copier les variables** membres pour les objets qui peuvent être modifiés après la construction (notion d'[Immutable Objects](http://docs.oracle.com/javase/tutorial/essential/concurrency/immutable.html))

## Lien(s) utile(s)

* [rules.sonarsource.com - "clone" should not be overridden](https://rules.sonarsource.com/java/tag/suspicious/RSPEC-2975/) qui détaille les risques en Java et propose des alternatives (constructeur de copie et méthode dédiée à la création d'une copie).




