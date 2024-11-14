# TP - Refactoring de traitement de graphe

## Introduction

Dans ce TP, l'idée est de se mettre en situation où **nous devons industrialiser un prototype**. Nous allons réfactorer une **application qui charge un graphe et calcule le plus court chemin** entre deux sommets.

L'application se présente sous la forme d'une [API NodeJS Express](https://expressjs.com/fr/starter/hello-world.html) écrite en TypeScript. Les objectifs sont les suivants :

* Rendre le code plus robuste
* Optimiser le calcul de plus court chemin
* Rendre le calcul de plus court chemin plus générique
* Améliorer les entrées/sorties du programme

Pour cela, **nous commencerons par une revue de code en séance** et procéderons par étape.

## Démarrage

* Forker le projet https://github.com/mborne/tp-graph-ts
* Cloner le fork
* Lire le fichier [README](https://github.com/mborne/tp-graph-ts#readme) pour :
  * Découvrir l'organisation du code
  * Construire le projet et exécuter les tests
  * Démarrer et tester l'API

## Mise en garde

Vous devrez impérativement :

* **Livrer un code fonctionnel sur la <u>branche par défaut</u> de votre fork**.
* **Avoir au moins un commit (voire une branche) par question avec un commentaire d'identifier la question** (ex `0.1 - blindage de la construction des arcs`)

Pour ce faire, il vous est vivement conseillé de :

* Lancer à chaque étape la construction et les tests automatiques.
* Compléter ces tests automatiques avec un test manuel sur l'API.


## 0.1 - Blindage de la construction des arcs

Nous remarquons que le modèle ne protège pas contre les erreurs la création des sommets et des arcs. Il est possible de créer par erreur un `Edge` avec une `source` ou une `target` nulle.

Nous procèdons comme suit :

* Ajouter un constructeur `Edge(source: Vertex, target: Vertex)`
* Passer `source` et `target` en privées en les renommant en `_source` et `_target`
* Ajouter `Edge.getSource()` et `Edge.getTarget()`
* Adapter le code et les tests.

## 0.2 - Ajout de fabriques pour les sommets et les arcs

En ajoutant un constructeur `Edge(source: Vertex, target: Vertex)`, nous avons simplifié la création des arcs et des sommets.

Toutefois, les opérations de création demeurent complexes et il reste la possibilité d'oublier d'ajouter les éléments aux listes de `vertices` et `edges` du graphe.

Nous allons donc procéder comme suit :

* Ajouter une fabrique `createVertex(coordinate: Coordinate, id: String): Vertex` dans `Graph`
* Ajouter une fabrique `createEdge(source: Vertex, target: Vertex, id: String): Edge` dans `Graph`
* Adapter le code et les tests pour utiliser ces fabriques.

Ainsi, nous passerons de :

```java
const a = new Vertex();
a.setId("a");
a.setCoordinate(new Coordinate(0.0, 0.0));
graph.getVertices().add(a);

const b = new Vertex();
b.setId("b");
b.setCoordinate(new Coordinate(1.0, 0.0));
graph.getVertices().add(b);

const ab = new Edge(a, b);
ab.setId("ab");
graph.getEdges().add(ab);
```

à

```java
const a = graph.createVertex(new Coordinate(0.0, 0.0),"a");
const b = graph.createVertex(new Coordinate(1.0, 0.0),"b");
graph.createEdge(a,b,"ab");
```

## 0.3 - Géométrie réelle des tronçons

Nous remarquons au niveau de `Edge.getGeometry()` que la géométrie des tronçons est un segment entre le sommet source et le sommet cible. La géométrie réelle est lue dans `BdtopoLoader` mais elle n'est pas exploitée lors de la création du graphe.

Nous allons procéder comme suit pour ajouter la géométrie réelle des tronçons de route sur les `Edge` :

* Ajouter un attribut `geometry: LineString` sur la classe `Edge` avec un setter `setGeometry(geometry: LineString)`
* Mettre à jour `getGeometry()` pour renvoyer l'attribut `geometry` s'il est défini
* Mettre à jour `BdtopoLoader` pour stocker la géométrie sur les `Edge` à l'aide de `setGeometry`

## 0.4 - Indexation des arcs entrants et sortants

En lisant attentivement `RoutingService`, nous remarquons que la méthode `graph.getOutEdges(vertex: Vertex)` est appelée très fréquemment dans la méthode `visit(vertex: Vertex)`.

Cette approche étant loin d'être optimale, nous allons indexer les arcs sortants et entrants comme suit :

* Ajouter des attributs `_inEdges: Edge[]` et `_outEdges: Edge[]` sur `Vertex`.
* Remplir automatiquement `_inEdges` et `_outEdges` dans le constructeur `Edge(source,target)`
* Adapter `Graph.getInEdges` et `Graph.getOutEdges` pour exploiter `_inEdges` et `_outEdges`

Remarques :

* Nous n'avons pas besoin pour l'algorithme actuel des `inEdges` mais nous choisissons de conserver une symétrie dans le modèle.
* Dans l'idéal, il faudrait permettre la modification de `_inEdges` et `_outEdges` mais les [TypeScript n'offre pas de mécanisme de visibilité le permettant à ma connaissance (pas de notion de "friend" et pas de visibilité à l'échelle d'un "package")](https://www.typescriptlang.org/docs/handbook/2/classes.html#member-visibility).

## 0.5 - Création d'un modèle dédié aux noeuds de l'arbre du plus court chemin

Nous constatons que `Vertex` est porteur de propriétés qui ne correspondent pas à la modélisation d'un réseau routier mais à l'algorithme de calcul du plus court chemin : `cost`, `reachingEdge` et `visited`.

Ceci a un lourd impact sur l'application : **Il est en l'état impossible de lancer en parallèle deux calculs de plus court chemin** car il y a aurait des conflits en édition sur les propriétés des `Vertex` pendant l'exécution de l'algorithme.

Nous procédons dans un premier temps comme suit pour refondre `RoutingService` en limitant les reprises de code à effectuer :

* Créer une classe `PathNode` dans correspondant à un noeud de l'arbre
* Migrer les attributs `cost`, `reachingEdge` et `visited` de `Vertex` vers `PathNode`
* Ajouter une propriété `nodes: Map<Vertex,PathNode>` dans `RoutingService`
* Mettre à jour `initGraph` dans `RoutingService` pour initialiser `nodes`
* Ajouter une méthode utilitaire `getNode(vertex: Vertex): PathNode` dans `RoutingService`
* Mettre à jour le reste du code de la classe `RoutingService` à l'aide de `getNode`

## 0.8 - Création d'un modèle dédié à l'arbre du plus court chemin

Pour finaliser la mise en oeuvre d'un modèle dédié à l'arbre de plus court chemin, nous encapsulons `nodes: Map<Vertex, PathNode>` de `RoutingService` sous forme d'un arbre de plus court chemin nommé `PathTree` :

* Créer une classe `PathTree`
* Migrer les éléments correspondant de `RoutingService` vers `PathTree`
	* `initGraph(origin)` devient `PathTree(graph: Graph, origin: Vertex)`
	* `buildPath(vertex)` devient `pathTree.getPath(destination: Vertex)`
	* `getNode(vertex)` devient `pathTree.getNode(vertex: Vertex)`

## 0.9 - Stockage des seuls sommets atteints dans PathTree

Nous remarquons qu'il est inutile de stocker des `PathNode` pour tous les sommets du graphe. Il suffit d'initialiser la liste des `nodes` avec l'origine des chemins et de créer les `PathNode` quand de nouveaux sommets sont atteints.

A l'exception du test pour savoir si la destination est atteinte dans `RoutingService`, les appels à `getNode` correspondent à des sommets atteints.

Nous allons donc :

* Adapter `PathTree(graph, origin)` en `PathTree(origin)` pour initialiser `nodes` avec la seule origine.
* Ajouter une méthode `PathTree.isReached(vertex)` pour tester si un sommet est atteint.
* Ajouter une méthode `PathTree.getOrCreateNode(vertex)` pour récupérer ou créer un noeud.
* Ajouter une méthode `pathTree.getReachedVertices(): Vertex[]`
* Adapter `RoutingService` en utilisant ces méthodes et en veillant à parcourir les seuls sommets atteints dans `findNextVertex`

<!--

## 0.10 - Optimisation du chargement du graphe

En chargeant [ROUTE500 complet](https://files.opendatarchives.fr/professionnels.ign.fr/route500/), on observe un temps de chargement excessivement long. A l'aide de VisualVM, on se rend compte que le programme passe le plus clair de son temps dans `GraphReader.getOrCreateVertex` faisant appel à `Graph.findVertex(coordinate: Coordinate)` :

![VisualVM - chargement du graphe](img/visualvm-load-graph.png)

En inspectant `Graph.findVertex(coordinate: Coordinate)`, on note un parcours complet des sommets à la recherche d'une égalité stricte de coordonnée. Cette approche est loin d'être optimale, nous pouvons optimiser en utilisant une `Map<Coordinate, Vertex>`.



## 0.11 - Optimisation du temps de calcul

En lançant des calculs de plus court chemin sur le graphe ROUTE500 complet, on remarque un temps de calcul trop important. A l'aide de VisualVM, on se rend compte que le programme passe le plus clair de son temps dans `findNextVertex` :

![VisualVM - find path](img/visualvm-find-path.png)

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

On s'appuie sur la bibliothèque [CQEngine](https://github.com/npgall/cqengine) (1) pour obtenir une collection de `PathNode` avec plusieurs indexes au niveau du `PathTree` :

* Ajout de `vertex: Vertex` sur `PathNode`
* Remplacement de la `Map<Vertex,PathNode>` par une `IndexedCollection<PathNode> nodes` sur `PathTree`
* Ajout de `markVisited(vertex)` sur `PathTree` (2)
* Ajout de `setReached(vertex,reachingCost,reachingEdge)` sur `PathTree` (2)
* Ajout de `getNearestNonVisitedVertex(): Vertex` sur `PathTree`
* Utilisation de `getNearestNonVisitedVertex()` de `PathTree` dans `findNextVertex()` de `RoutingService`

Remarque : 

* (1) Une démonstration de l'utilisation de CQEngine est présente dans les tests : [CqEngineTest](https://github.com/mborne/tp-refactoring-graph/blob/upgrade_cqengine/src/test/java/org/acme/graph/demo/CqEngineTest.java)
* (2) Pour que les indexes se mettent à jour lors des modifications des `PathNode`, il faut supprimer le `PathNode` de la collection, modifier le `PathNode` et le ré-ajouter à la collection.


## 0.12 - Préparation de la mise en oeuvre de variantes de l'algorithme

Afin de préparer la mise en oeuvre de variante de l'algorithme, on s'efforce de bien identifier les différentes étapes de la construction de l'arbre. Aussi, on veille à séparer la construction de l'arbre de production du résultat en procédant comme suit dans `RoutingService` :

* Extraction d'une méthode `buildTree(destination)` dans `findRoute`


## 0.13 - Extraction d'une classe PathTreeBuilder de RoutingService

* Création d'une classe `PathTreeBuilder` avec un constructeur `PathTreeBuilder(origin: Vertex)`
* Migration de `buildTree`, `visit` et `findNextVertex` de `RoutingService` vers `PathTreeBuilder`
* Utilisation de `PathTreeBuilder` dans `RoutingService`


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
* Renommage de `RoutingService` en `PathFinder`
* Ajout du paramètre `method: String` à `findRoute` de `PathFinder`
* Ajout d'un paramètre `method` à `findRoute` dans `FindPathController`

-->