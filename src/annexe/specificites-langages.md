# Les spécificités des langages

[[toc]]

## Typage fort ou typage faible

Quelque soit le langage de programmation utilisé, une variable aura toujours un **type**. Ceci permettra par exemple d'avoir comme résultat :

* `5` pour l'addition de deux nombres `2+3`
* `"23"` pour l'addition de deux chaînes de caractères `"2"+"3"`

Nous aurons toutefois deux cas de figure en fonction des langages :

* Le langage sera dit à **typage statique** (ou **typage fort**) si **le type <u>doit être</u> déclaré lors de la définition de la variable** (Java, C++, Rust,...)
* Le langage sera dit à **typage dynamique** (ou **typage faible**) si **le type est connu après affectation d'une valeur à la variable** (il peut changer pendant l'exécution du programme)

Dans la deuxième catégorie à laquelle appartiennent les langages tels JavaScript, TypeScript, PHP, Python,..., nous soulignerons que :

* Les langages à typage dynamique sont de plus nombreux à **permettre la déclaration d'un type** (ex : PHP, [Python >= 3.5](https://docs.python.org/3/library/typing.html)), ce qui permet des **contrôles à l'exécution** et l'**analyse statique de code**.
* Les langages à **typage dynamique** imposent généralement l'**unicité du nom des fonctions et méthodes**.


> Impact : Nous serons à adapter la présentation de certains patrons de conception pour rendre unique les noms des fonctions et méthodes. En outre, **certains patrons de conception seront plus utiles avec des langages fortement typés** qu'avec des langages tels Python, JavaScript, TypeScript,...

## La gestion de la mémoire

Les choix de conception se feront en fonction des mécanismes de **gestion de la mémoire** du langage utilisé :

* Présence d'un **ramasse-miettes** (*garbage collector*) (ex : Java, Python)?
  * Se limitant à faire du **comptage de références** (ex : PHP)?
* Nécessité de traiter la **libération de la mémoire**?
  * Possibilité d'utiliser des pointeurs intelligent (C++)?
  * Notion de propriétaire d'une variable (Rust)?

En fonction des cas, nous serons **plus ou moins contraint sur les relations entre les objets**.

> Impact : Concevoir un moteur de jeu vidéo en UML sans se demander s'il sera implémenté en C++, en Java ou en JavaScript n'a pas de sens. Les contraintes ne sont pas les mêmes.

## La présence de concepts complémentaires

Certains langages offriront des **concepts complémentaires aux concepts de base la P.O.O.** :

* Des **accesseurs "magiques"** (ex : [Property en C#](https://learn.microsoft.com/fr-fr/dotnet/csharp/programming-guide/classes-and-structs/properties#properties-with-backing-fields), [`__getattr___` en Python](https://python-reference.readthedocs.io/en/latest/docs/dunderattr/getattr.html),...)

> Impact : Il n'est pas obligatoire (voire pas dans la culture) de définir des méthodes `get` / `set` dans certains langages.

* Des **Annotations** pouvant être exploitées via mécanismes d'**introspection** et de **réflexion** (PHP, Java,...)

> Impact : En Java, JUnit et Spring s'appuieront sur ces mécanismes quand nous trouverons des mécanismes de génération de code pour avoir les équivalents dans d'autres langages (ex : macro en C++ et Rust, [Qt Meta-Object Compiler](https://doc.qt.io/qt-6/moc.html),...)

## La présence d'autres paradigmes

Dans de nombreux langages, nous noterons que la P.O.O. cohabitera avec d'**autres paradigmes** :

* La **programmation générique** (`template`)
* La **programmation fonctionnelle** (`.map`, `.filter`, `.reduce`,...) avec éventuellement des coroutines et le mot clé `yield`

Nous soulignerons que nous pourrons :

* **Hybrider la P.O.O. avec la programmation générique**
* Établir des **ponts en la P.O.O. et la programmation générique** à l'aide du patron itérateur que nous verrons par la suite.
