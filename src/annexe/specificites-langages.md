# Les spécificités des langages

[[toc]]

## La gestion de la mémoire

Les choix de conception se feront en fonction des mécanismes de **gestion de la mémoire** du langage utilisé :

* Présence d'un **ramasse-miettes** (*garbage collector*) (ex : Java)?
  * Se limitant à faire du **comptage de références** (ex : PHP)?
* Nécessité de traiter la **libération de la mémoire**?
  * Possibilité d'utiliser des pointeurs intelligent (C++)?
  * Notion de propriétaire d'une variable (Rust)?

En fonction des cas, nous serons **plus ou moins contraint sur les relations entre les objets**.

> Impact : Concevoir un moteur de jeu vidéo en UML sans se demander s'il sera implémenté en C++ ou en Java n'a pas de sens. Les contraintes ne sont pas les mêmes.

## La présence de concepts complémentaires

Certains langages offriront des **concepts complémentaires aux concepts de base la P.O.O.** :

* Des **accesseurs "magiques"** (ex : [Property en C#](https://learn.microsoft.com/fr-fr/dotnet/csharp/programming-guide/classes-and-structs/properties#properties-with-backing-fields), [`__getattr___` en Python](https://python-reference.readthedocs.io/en/latest/docs/dunderattr/getattr.html),...)

> Impact : Il n'est pas obligatoire (ou pas dans les moeurs) de définir des méthodes `get` / `set` dans certains langages.

* Des **Annotations** pouvant être exploitées via mécanismes d'**introspection** et de **réflexion**

> Impact : JUnit et Spring s'appuieront sur ces mécanismes en Java quand nous trouverons des mécanismes de génération de code pour avoir les équivalents dans d'autres langages (ex : macro en C++ et Rust, [Qt Meta-Object Compiler](https://doc.qt.io/qt-6/moc.html),...)

## La présence d'autres paradigmes

Dans de nombreux langages, nous noterons que la P.O.O. cohabitera avec d'**autres paradigmes** :

* La **programmation générique** (`template`)
* La **programmation fonctionnelle** (`.map`, `.filter`, `.reduce`,...) avec éventuellement des coroutines et le mot clé `yield`

Nous soulignerons que nous pourrons :

* **Hybrider la P.O.O. avec la programmation générique** (*)
* Établir des **ponts en la P.O.O. et la programmation générique** à l'aide de concepts spécifiques ([Stream](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html) en Java) ou du patron itérateur que nous verrons par la suite.

> (*) Spoiler : nous verrons en TP que cette approche permet d'avoir un visiteur renvoyant un résultat.

