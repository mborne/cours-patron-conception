# TP - Refactoring de traitement de graphe

## Introduction

Dans ce TP où l'idée est de se mettre en situation où l'on récupère un prototype à industrialiser, nous allons réfactorer une application qui charge un graphe et calcule le plus court chemin entre deux sommets.

L'application se présente sous la forme d'une API basée sur [spring boot](https://spring.io/guides/gs/spring-boot/)

Les objectifs sont les suivants :

* Rendre le code plus robuste
* Optimiser le calcul de plus court chemin
* Rendre le calcul de plus court chemin plus générique
* Améliorer les entrées/sorties du programme

Pour cela, nous allons faire une revue de code et procéder par étape.

## Démarrage

* Forker le projet https://github.com/mborne/tp-refactoring-graph
* Cloner le fork
* Lire le fichier [README](https://github.com/mborne/tp-refactoring-graph#tp-refactoring-graph) pour :
  * Découvrir l'organisation du code
  * Construire le projet et exécuter les tests
  * Démarrer et tester l'API

## Mise en garde

Vous devrez impérativement livrer un code fonctionnel sur la branche par défaut de votre fork.

Pour ce faire, il vous est vivement conseillé de :

* Travailler sur une autre branche (ex : `develop`), en particulier si vous voulez pousser des travaux en cours.
* Lancer à chaque étape la construction et les tests automatiques (`mvn clean package`).
* Compléter ces tests automatique avec un test manuel sur l'API.


## 0.1 - Blindage de la construction des arcs

On remarque que l'on dispose d'un modèle qui ne protège pas contre les erreurs la création des sommets et des arcs. Il est tout à fait possible de créer par erreur un `Edge` avec une `source` ou une `target` nulle.

On procède comme suit :

* Ajout d'un constructeur `Edge(source: Vertex, target: Vertex)`
* Suppression du constructeur par défaut sur `Edge`

## 0.2 - Ajout de fabriques pour les sommets et les arcs

En ajoutant un constructeur `Edge(source: Vertex, target: Vertex)`, on remarque que l'on a simplifié la création des arcs et des sommets.

Toutefois, les opérations de création demeurent complexes et il reste la possibilité d'oublier d'ajouter les éléments aux listes de `vertices` et `edges` du graphe.

On va donc procéder comme suit :

* Ajout d'une fabrique `createVertex(coordinate: Coordinate, id: String): Vertex` dans `Graph`
* Ajout d'une fabrique `createEdge(source: Vertex, target: Vertex, id: String): Edge` dans `Graph`
* Masquage des constructeur `Vertex()` et `Edge(source,target)`
* Suppression de `Graph.setVertices(vertices)` et `Graph.setEdges(edges)`

Ainsi, on passera de :

```java
Vertex a = new Vertex();
a.setId("a");
a.setCoordinate(new Coordinate(0.0, 0.0));
graph.getVertices().add(a);

Vertex b = new Vertex();
b.setId("b");
b.setCoordinate(new Coordinate(1.0, 0.0));
graph.getVertices().add(b);

Edge ab = new Edge(a, b);
ab.setId("ab");
graph.getEdges().add(ab);
```

à

```java
Vertex a = graph.createVertex(new Coordinate(0.0, 0.0),"a");
Vertex b = graph.createVertex(new Coordinate(1.0, 0.0),"b");
graph.createEdge(a,b,"ab");
```

## 0.3 - Géométrie réelle des tronçons

On remarque au niveau de `getCost` et `getGeometry` que la géométrie des tronçons est un segment entre le sommet source et le sommet cible.

On va procéder comme suit pour utiliser la géométrie des tronçons :

* Ajout d'un attribut `geometry: LineString` sur la classe `Edge` avec un setter `setGeometry(geometry: LineString)`
* Mise à jour de `getGeometry()` pour renvoyer l'attribut `geometry` s'il est défini
* Mise à jour de `getCost()` pour renvoyer la longueur de la géométrie à l'aide de [getLength](https://locationtech.github.io/jts/javadoc/org/locationtech/jts/geom/LineString.html#getLength--) de JTS
* Mise à jour de `GraphReader` pour stocker la géométrie sur les `Edge` à l'aide de `setGeometry`

## 0.4 - Indexation des arcs entrants et sortants

En lisant attentivement `DijsktraPathFinder` (ou un utilisant un outil tel VisualVM), on remarque que la méthode `graph.getOutEdges(vertex: Vertex)` est appelée très fréquemment dans la méthode `visit(vertex: Vertex)`.

Cette approche étant loin d'être optimale, nous allons indexer les arcs sortants et entrants comme suit :

* Suppression de `setSource` et `setTarget` dans `Edge` (1)
* Ajout des attributs `inEdges: List<Edge>` et `outEdges: List<Edge>` sur `Vertex` (2).
* Ajout des getters `getInEdges(): List<Edge>` et  `getOutEdges(): List<Edge>` sur `Vertex`
* Remplissage automatique de `inEdges` et `outEdges` dans le constructeur `Edge(source,target)`
* Ré-écrire `Graph.getInEdges` et `Graph.getOutEdges` pour appeler `Vertex.getInEdges` et `Vertex.getOutEdges`
* Exclure `inEdges` et `outEdges` du rendu JSON au niveau de l'API à l'aide de l'annotation `@JsonIgnore` (3).

Remarques :

* (1) Nous n'avons pas besoin d'éditer les graphes après chargement, inutile de gérer la complexité pour `inEdges` et `outEdges`.
* (2) Nous n'avons pas besoin pour l'algorithme actuel des `inEdges` mais nous choisissons de conserver une symétrie dans le modèle.
* (3) ATTENTION : Sans cette étape, l'API plantera avec une récursion infinie.


## 0.5 - Amélioration de la gestion des chemins non trouvés

On remarque que `findPath(Vertex origin, Vertex destination)` de `DijkstraPathFinder` renvoie `null` si le chemin n'est pas trouvé, ce qui induit une réponse vide au niveau de l'API.

On remarque que le cas où le sommet de départ ou d'arrivé est mieux géré grâce :

* Au renvoi d'une `NotFoundException` dans `Graph.findVertex(id: String)` dans le cas où le sommet n'est pas trouvé par son identifiant
* A la personnalisation du rendu des `NotFoundException` via `config.CustomErrorHandler`

Nous procédons de même en renvoyant une `NotFoundException` avec le modèle de message suivant dans `findPath(Vertex origin, Vertex destination)` de `DijkstraPathFinder` : `"Path not found from '%s' to '%s'"`.


## 0.6 - Amélioration du rendu des chemins

Nous remarquons que la mise en forme des chemins est un peu pauvre au niveau de l'API. Nous souhaitons produire un résultat sous forme d'un objet JSON avec deux propriétés :

* `edges`: La liste des arcs formant le chemin
* `length` : La somme des longueurs des `edges`

Pour ce faire, nous procédons ainsi :

* Ajout d'un modèle `Path` encapsulant une liste de `Edge` nommée `edges`.
* Ajout d'une méthode `getLength()` à `Path` renvoyant la somme des longueurs des `edges`.
* Renvoi d'un `Path` dans `findPath` de `DijkstraPathFinder`

## 0.7 - Création d'un modèle dédié aux noeuds de l'arbre du plus court chemin

On constate que `Vertex` est porteur de propriétés qui ne correspondent pas à la modélisation d'un réseau routier mais à l'algorithme de calcul du plus chemin : `cost`, `reachingEdge` et `visited`.

Ceci a un lourd impact sur l'application : **Il est en l'état impossible de lancer en parallèle deux calculs de plus court chemin** car il y a aura des conflits en édition sur les propriétés des `Vertex`.

Nous procédons dans un premier temps comme suit pour refondre `DijkstraPathFinder` en limitant les reprises de code à effectuer :

* Création d'une classe `PathNode` correspondant à un noeud de l'arbre
* Migration des attributs `cost`, `reachingEdge` et `visited` de `Vertex` vers `PathNode`
* Ajout d'une propriété `nodes: Map<Vertex,PathNode>` dans `DijkstraPathFinder`
* Mise à jour de `initGraph` dans `DijkstraPathFinder` pour initialiser `nodes`
* Ajout d'une méthode utilitaire `getNode(vertex: Vertex): PathNode` dans `DijkstraPathFinder`
* Mise à jour du reste du code de la classe `DijkstraPathFinder` à l'aide de `getNode`


## 0.8 - Création d'un modèle dédié à l'arbre du plus court chemin

On encapsule `nodes: Map<Vertex, PathNode>` de `DijkstraPathFinder` sous forme d'un arbre de plus court chemin nommé `PathTree` :

* Création de la classe `PathTree`
* Migration des éléments correspondant de `DisjktraPathFinder` vers `PathTree`
	* `initGraph(origin)` devient `PathTree(graph: Graph, origin: Vertex)`
	* `buildPath(vertex)` devient `pathTree.getPath(destination: Vertex)`
	* `getNode(vertex)` devient `pathTree.getNode(vertex: Vertex)`


## 0.9 - Stockage des seuls sommets atteints dans PathTree

On remarque qu'il est inutile de stocker des `PathNode` pour tous les sommets du graphe, qu'il suffit d'initialiser la liste des `nodes` avec l'origine des chemins et de créer les `PathNode` quand on atteint de nouveaux sommets.

A l'exception du test pour savoir si on a atteint la destination dans `DijkstraPathFinder`, les appels à `getNode` correspondent à des sommets atteints.

On procède donc comme suit :

* Ajout d'une méthode `pathTree.isReached(destination: Vertex): boolean` pour clarifier `pathTree.getNode(destination).getReachingEdge() != null`
* Blindage de `pathTree.getPath(destination)` dans le cas où le sommet n'est pas atteint
* Ajout d'une méthode `getOrCreateNode(vertex)` dans `PathTree` et utilisation de cette méthode dans `DijkstraPathFinder`
* Reprise du constructeur `PathTree(graph, origin)` en `PathTree(origin)`
* Ajout de `pathTree.getReachedVertices(): Collection<Vertex>`
* Parcourt des seuls sommets atteints dans `findNextVertex`


## 0.10 - Optimisation du chargement du graphe

En chargeant [ROUTE500 complet](https://files.opendatarchives.fr/professionnels.ign.fr/route500/), on observe un temps de chargement excessivement long. A l'aide de VisualVM, on se rend compte que le programme passe le plus clair de son temps dans `GraphReader.getOrCreateVertex` faisant appel à `Graph.findVertex(coordinate: Coordinate)` :

![VisualVM - chargement du graphe](img/visualvm-load-graph.png)

En inspectant `Graph.findVertex(coordinate: Coordinate)`, on note un parcours complet des sommets à la recherche d'une égalité stricte de coordonnée. Cette approche est loin d'être optimale, nous pouvons optimiser en utilisant une `Map<Coordinate, Vertex>`.

## 0.11 - Optimisation du temps de calcul

En lançant des calculs de plus court chemin sur le graphe ROUTE500 complet, on remarque un temps de calcul trop important. A l'aide de VisualVM, on se rend compte que le programme passe le plus clair de son temps dans `findNextVertex` :

![VisualVM - find path](img/visualvm-visualvm-find-path.png.png)

En regardant de plus près, on remarque que l'on parcours l'ensemble des sommets atteints pour filtrer ensuite les sommets déjà visités.

```java
for (Vertex vertex : pathTree.getReachedVertices()) {
	PathNode node = pathTree.getNode(vertex);
	// sommet déjà visité?
	if (node.isVisited()) {
		continue;
	}
	//...
```

On procède donc comme suit pour indexer les sommets non visité :

* Ajout de `notVisited: Set<Vertex>` sur `PathTree`
* Gestion de `notVisited` dans `getOrCreateNode` de `PathTree`
* Ajout de `getNotVisitedVertices(): Collection<Vertex>` sur `PathTree`
* Ajout de `markVisited(vertex)` sur `PathTree`
* Suppression de `visited` sur `PathNode`
* Mise à jour des codes pour utiliser `markVisited(vertex)` et `getNotVisitedVertices()`


<!-- TODO : RESTE A REVOIR LES QUESTIONS CI-APRES -->

## 0.12 - Préparation de la mise en oeuvre de variantes de l'algorithme

Afin de préparer la mise en oeuvre de variante de l'algorithme, on s'efforce de bien identifier les différentes étapes de la construction de l'arbre. Aussi, on veille à séparer la construction de l'arbre de production du résultat en procédant comme suit dans `DijkstraPathFinder` :

* Extraction d'une méthode `buildTree(destination)` dans `findPath`


## 0.13 - Extraction d'une classe PathTreeBuilder de DijkstraPathFinder

* Création d'une classe `PathTreeBuilder` avec un constructeur `PathTreeBuilder(origin: Vertex)`
* Migration de `buildTree`, `visit` et `findNextVertex` de `DijkstraPathFinder` vers `PathTreeBuilder`
* Utilisation de `PathTreeBuilder` dans `DijkstraPathFinder`


## 0.14 - Préparation de la mise en place d'une stratégie de calcul du plus court chemin

Afin de pouvoir faire varier par la suite la méthode `findNextVertex` entre Dijkstra et A-star, on extrait une stratégie comme suit :

* Création d'une interface `NextVertexFinder` avec une méthode `findNextVertex(pathTree: PathTree): Vertex`
* Implémentation de `DijkstraNextVertexFinder`
* Le constructeur `PathTreeBuilder(pathTree)` devient `PathTreeBuilder(nextVertexFinder, pathTree)`


## 0.15 - Implémentation de A-star

On ajoute l'implémentation de A-star comme suit :

* Modification de `findNextVertex(pathTree)` en `findNextVertex(pathTree,destination)` au niveau de l'interface `NextVertexFinder`
* Ajout de `AStarNextVertexFinder` implémentant `NextVertexFinder`

Remarque : Dans le cas de A-star, `findNextVertex(pathTree,destination)` renverra le sommet atteint minimisant "distance parcourue depuis l'origine + distance à vol d'oiseau pour atteindre la destination"

## 0.16 - Choix de la stratégie de calcul dans l'API

On procède comme suit pour permettre le choix d'une stratégie de calcul dans l'API :

* Création d'une fabrique `NextVertexFinderFactory.createNextVertexFinder(method: String)`
* Renommage de `DijkstraPathFinder` en `PathFinder`
* Ajout du paramètre `method: String` à `findPath` de `PathFinder`
* Ajout d'un paramètre `method` à `findPath` dans `FindPathController`
