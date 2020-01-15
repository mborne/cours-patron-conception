# TP - Refactoring de traitement de graphe

## Introduction

Dans ce TP où l'idée est de se mettre en situation où l'on récupère un prototype à industrialiser, nous allons réfactorer une application qui charge un graphe et calcule le plus court chemin entre deux sommets.

L'application se présente sous deux forme :

* Un utilitaire en ligne de commande
* Une API basée sur [spring boot](https://spring.io/guides/gs/spring-boot/)

Les objectifs sont les suivants :

* Rendre le code plus robuste
* Optimiser le calcul de plus court chemin
* Rendre le calcul de plus court chemin plus générique
* Améliorer les entrées/sorties du programme

Pour celà, nous allons faire une revue de code et procéder par étape.

## Démarrage

* Cloner le projet https://github.com/mborne/tp-refactoring-graph

```bash
mkdir ~/workspace_pattern
cd ~/workspace_pattern
git clone https://github.com/mborne/tp-refactoring-graph
cd tp-refactoring-graph
# vérifier que vous êtes bien sur la branche "original"
git branch
```

## Prise de connaissance du code

Vous êtes invité à prendre connaissance des classes :

| Classe                                             | Description                                           |
| -------------------------------------------------- | ----------------------------------------------------- |
| org/acme/graph/model/Graph.java                    | Modélisation d'un graphe                              |
| org/acme/graph/model/Vertex.java                   | Modélisation des sommets                              |
| org/acme/graph/model/Edge.java                     | Modélisation des arcs                                 |
| org/acme/graph/routing/DijkstraPathFinder.java     | Algorithme de calcul du plus court chemin             |
| org/acme/graph/cli/FindPath.java                   | Plus court chemin en ligne de commande (main)         |
| org/acme/graph/io/GraphReader.java                 | Interface de chargement d'un graphe                   |
| org/acme/graph/io/ShpGraphReader.java              | Chargement d'un graphe au format SHP                  |
| org/acme/graph/io/XmlGraphReader.java              | Chargement d'un graphe au format XML                  |
| org/acme/graph/controllers/FindPathController.java | spring - API de calcul du plus court chemin           |
| org/acme/graph/Application.java                    | spring - main de l'application spring (lancement API) |
| org/acme/graph/config/GraphConfig.java             | spring - configuration du chargement du graphe        |

Vous pouvez :

* Exécuter les tests
* Exécuter le calcul d'itinéraire en ligne de commande (voir [img/eclipse-findpath.png](img/eclipse-findpath.png) pour configuration)
* Tester l'API de calcul d'itinéraire (voir [img/eclipse-application.png](img/eclipse-application.png) pour configuration)


## 0.1 - Blindage de la construction des arcs

On remarque que l'on dispose d'un modèle qui ne protège pas contre les erreurs la création des sommets et des arcs. Il est tout à fait possible de créer par erreur un `Edge` avec une `source` ou une `target` nulle.

On procède comme suit :

* Ajout d'un constructeur `Edge(source: Vertex, target: Vertex)`
* Suppression du constructeur par défaut sur `Edge`


## 0.2 - Ajout de fabriques pour les sommets et les arcs

En ajoutant un constructeur `Edge(source: Vertex, target: Vertex)`, on remarque que l'on a simplifié la création des arcs et des sommets.

Toutefois, les opérations de création demeurent complexes et il reste la possibilité d'oublier d'ajouter les éléments aux listes de `vertices` et `edges` du graphe.

On va donc procéder comme suit :

* Ajout d'une fabrique `createVertex(coordinate,id): Vertex` dans `Graph`
* Ajout d'une fabrique `createEdge(source,target,id): Edge` dans `Graph`
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

Edge ab = new Edge(a,b);
ab.setId("ab");
graph.getEdges().add(ab);
```

à


```java
Vertex a = graph.createVertex(new Coordinate(0.0, 0.0),"a");
Vertex b = graph.createVertex(new Coordinate(1.0, 0.0),"b");
Edge ab  = graph.createEdge(a,b,"ab");
```


## 0.3 - Indexation des arcs entrants et sortant

En lisant attentivement `DijsktraPathFinder` (ou un utilisant un outil tel VisualVM), on remarque une méthode `findOutEdges(vertex: Vertex)` appelée très fréquemment dans la méthode `visit(vertex: Vertex)`. Cette approche étant loin d'être optimale, on va indexer les arcs sortants et entrants comme suit :

* Ajout des attributs `inEdges: List<Edge>` et `outEdges: List<Edge>` sur `Vertex`
* Ajout des getters `getInEdges(): Collection<Edge>` et  `getOutEdges(): Collection<Edge>` sur `Vertex`
* Remplissage automatique de `inEdges` et `outEdges` dans le constructeur `Edge(source,target)`
* Suppression de `setSource` et `setTarget` dans `Edge` (pas besoin d'une topologie éditable, innutile de gérer la complexité pour `inEdges` et `outEdges`)
* Suppression de `findOutEdges` dans `DijkstraPathFinder` et utilisation de `getOutEdges`
* Exclusion de `inEdges` et `outEdges` des résultats de l'API (`@JsonIgnore`)
* Ajout de tests

Remarque : Nous n'avons pas besoin pour l'algorithme actuel des `inEdges` mais il semble préférable au moins dans un premier temps de conserver une symétrie dans le modèle.


## 0.4 - Ajout d'un modèle pour les chemins

On remarque deux problèmes avec le résultat de `findPath(Vertex origin, Vertex destination)` de `DijkstraPathFinder` :

* Le type de retour `List<Edge>` est un peu pauvre pour une mise en forme dans l'API
* La liste en question est `null` si le chemin n'est pas trouvé (une liste vide serait préférable)

On améliore ce point en procédant comme suit :

* Ajout d'un modèle `Path` encapsulant une liste de `Edge`
* Renvoi d'un `Path` dans `findPath` de `DijkstraPathFinder`
* Mise à jour des codes pour le changement de comportement `null` vers vide en cas de chemin non trouvé


## 0.5 - Amélioration du rendu des chemins dans l'API

On améliore le résultat de l'API sous la forme suivante :

```json
{
  "edges" : [ {
    "id" : "troncon_route.7080-reverse",
    "source" : "1",
    "target" : "10948",
    "geometry" : {
      "type" : "LineString",
      "coordinates" : [ [ 656039.9000000076, 6834645.000001009 ], [ 656261.3000000076, 6835035.700001009 ] ]
    },
    "cost" : 449.0706514571575
  }, {
    "id" : "troncon_route.20028-reverse",
    "source" : "10948",
    "target" : "9558",
    "geometry" : {
      "type" : "LineString",
      "coordinates" : [ [ 656261.3000000076, 6835035.700001009 ], [ 656399.2000000075, 6835455.000001008 ] ]
    },
    "cost" : 441.39426819912046
  }
]
```

On procède comme suit :

* Exposition des seuls identifiants de `source` et `target` au niveau des `Edge` :

```java
class Edge {

	@JsonIdentityInfo(
		generator=ObjectIdGenerators.PropertyGenerator.class, 
		property="id"
	)
	@JsonIdentityReference(alwaysAsId=true)
	public Vertex getSource() {
		return source;
	}

	//...

}
```

* Ajout d'une méthode `getGeometry(): LineString` sur `Edge` renvoyant une LineString
* Ajout d'une dépendance maven pour le rendu des géométries JTS :

```xml
		<!-- JTS et GeoJSON -->
		<dependency>
			<groupId>com.bedatadriven</groupId>
			<artifactId>jackson-datatype-jts</artifactId>
			<version>2.2</version>
		</dependency>
```

* Ajout d'une annotation `@JsonSerialize(using = GeometrySerializer.class)` sur `getGeometry` pour utiliser `jackson-datatype-jts`

Remarque : Il faudrait un `@JsonDeserialize(contentUsing = GeometryDeserializer.class)` pour la conversion JSON en géométrie.


## 0.6 - Géométrie réelle des tronçons

Dans `ShpGraphReader`, on oublie la géométrie en entrée. On procède comme suit pour avoir une géométrie optionnelle sur les `Edge` :

* Ajout d'un attribut `geometry: Geometry` sur `Edge`
* Calcul de la géométrie des `Edge` dans le constructeur en fonction de `source` et `target`
* Mise à jour de la méthode de calcul de coût pour renvoyer la longueur de la géométrie
* Ajout d'une méthode `setGeometry` sur `Edge` permettant de modifier cette géométrie
* Mise à jour de `ShpGraphReader` pour définir la géométrie de `Edge`



## 0.7 - Création d'un modèle dédié aux noeuds de l'arbre du plus court chemin

On constate que `Vertex` est porteur de propriétés qui ne correspondent pas à un réseau routier mais à l'algorithme de calcul du plus chemin : `cost`, `reachingEdge` et `visited`.

Ceci a un lourd impact sur l'application : **Il est en l'état impossible de lancer en parallèle deux calculs de plus court chemin** car il y a aura des conflits en édition du graphe.

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
	* `buildGraph(origin)` devient `PathTree(graph: Graph, origin: Vertex)`
	* `buildPath(vertex)` devient `pathTree.getPath(destination)`
	* `getNode(vertex)` devient `pathTree.getNode(vertex)`



## 0.9 - Stockage des seuls sommets atteints dans PathTree

On remarque qu'il est innutile de stocker des `PathNode` pour tous les sommets du graphe, qu'il suffit d'initialiser la liste des `nodes` avec l'origine des chemins et de créer les `PathNode` quand on atteint de nouveaux sommets.

A l'exception du test pour savoir si on a atteint la destination dans `DijkstraPathFinder`, les appels à `getNode` correspondent à des sommets atteints.

On procède donc comme suit :

* Ajout d'une méthode `pathTree.isReached(destination)` pour clarifier `pathTree.getNode(destination).getReachingEdge() != null`
* Blindage de `pathTree.buildPath(destination)` dans le cas où le sommet n'est pas atteint
* Ajout d'une méthode `getOrCreateNode(vertex)` dans `PathTree` et utilisation de cette méthode dans `DijkstraPathFinder`
* Reprise du constructeur `PathTree(graph, origin)` en `PathTree(origin)`
* Ajout de `pathTree.getReachedVertices(): Collection<Vertex>`
* Parcourt des seuls sommets atteints dans `findNextVertex`
* Suppression de l'attribut `graph` désormais non utilisé dans `DijkstraPathFinder`


## 0.10 - Préparation de la mise en oeuvre de variantes de l'algorithme

Afin de préparer la mise en oeuvre de variante de l'algorithme, on s'efforce de bien identifier les différentes étapes de la construction de l'arbre. Aussi, on veille à séparer la construction de l'arbre de production du résultat en procédant comme suit dans `DijkstraPathFinder` :

* Extraction d'une méthode `buildTree(destination)` dans `findPath`


## 0.11 - Extraction d'une classe PathTreeBuilder de DijkstraPathFinder

* Création d'une classe `PathTreeBuilder` avec un constructeur `PathTreeBuilder(origin: Vertex)`
* Migration de `buildTree`, `visit` et `findNextVertex` de `DijkstraPathFinder` vers `PathTreeBuilder`
* Utilisation de `PathTreeBuilder` dans `DijkstraPathFinder`


## 0.12 - Préparation de la mise en place d'une stratégie de calcul du plus court chemin

Afin de pouvoir faire varier par la suite la méthode `findNextVertex` entre Dijkstra et A-star, on extrait une stratégie comme suit :

* Création d'une interface `NextVertexFinder` avec une méthode `findNextVertex(pathTree: PathTree): Vertex`
* Implémentation de `DijkstraNextVertexFinder`
* Le constructeur `PathTreeBuilder(pathTree)` devient `PathTreeBuilder(nextVertexFinder, pathTree)`


## 0.13 - Implémentation de A-star

On ajoute l'implémentation de A-star comme suit :

* Modification de `findNextVertex(pathTree)` en `findNextVertex(pathTree,destination)` au niveau de l'interface `NextVertexFinder`
* Ajout de `AStarNextVertexFinder` implémentant `NextVertexFinder`


## 0.14 - Choix de la stratégie de calcul dans l'API

On procède comme suit pour permettre le choix d'une stratégie de calcul dans l'API :

* Création d'une fabrique `NextVertexFinderFactory.createNextVertexFinder(method: String)`
* Renommage de `DijkstraPathFinder` en `PathFinder`
* Ajout du paramètre `method: String` à `findPath` de `PathFinder`
* Ajout d'un paramètre `method` à `findPath` dans `FindPathController`

## 0.15 - Optimisation du temps de chargement du graphe

En chargeant [ROUTE500 complet](https://files.opendatarchives.fr/professionnels.ign.fr/route500/), on observe un temps de chargement excessivement long. A l'aide de VisualVM, on se rend compte que le programme passe le plus clair de son temps dans `getOrCreateVertex`. On procède comme suit pour ajouter l'indexe manquant :

* Création d'une classe `GraphBuilder` avec un attribut `indexVertices: Map<Coordinate, Vertex>`
* Ajout de `getOrCreateVertex(coordinate): Vertex` sur `GraphBuilder`
* Suppression de `findVertex` sur ̀`Graph`
* Utilisation de `GraphBuilder` dans `ShpGraphReader`
* Correction au passage d'utilisation de `geotools` par appel de `dataStore.dispose` :

```java
GraphBuilder graphBuilder = new GraphBuilder();
FeatureIterator<SimpleFeature> features = null;
try {
	features = collection.features();
	while (features.hasNext()) {
		SimpleFeature feature = features.next();
		//...
	}
}finally {
	if ( features != null ){
		features.close();
	}
	dataStore.dispose();
}
return graphBuilder.getGraph();
```


## 0.16 - Optimisation du temps de calcul

En lançant des calculs de plus court chemin sur le graphe ROUTE500 complet, on remarque un temps de calcul trop important. A l'aide de VisualVM, on se rend compte que le programme passe le plus clair de son temps dans `findNextVertex`.

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
* Ajout de `getNotVisited(): Collection<Vertex>` sur `PathTree`
* Ajout de `markVisited(vertex)` sur `PathTree`
* Suppression de `visited` sur `PathNode`
* Mise à jour des codes pour utiliser `markVisited(vertex)` et `getNotVisited()`

