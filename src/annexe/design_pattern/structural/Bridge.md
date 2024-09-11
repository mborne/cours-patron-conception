# Bridge

## Problème

Nous souhaitons découpler une abstraction de son implémentation afin que les deux puissent
varier indépendamment l'une de l'autre.

## Cas d'école

Nous développons des algorithmes réalisant des parcours de graphes. Pour être en mesure d'analyser les problèmes et de visualiser le comportement de l'algorithme, **nous souhaitons soit** :

* **Écrire classiquement des journaux applicatifs** dans la console
* **Écrire ces journaux applicatifs dans une table géométrique** (`timestamp;message;geometry`) qui nous permettra par exemple de visualiser le déroulé du traitement à l'aide d'une animation temporelle dans QGIS (voir [www.birdseyeviewgis.com - Creating a COVID-19 Temporal Animation with QGIS](https://www.birdseyeviewgis.com/blog/2020/8/14/creating-a-covid-19-temporal-animation-with-qgis))

## Solution

Nous pouvons nous inspirer du patron bridge :

![UML Bridge](uml/UML_Bridge.png)

Source [<https://en.wikipedia.org/wiki/Bridge_pattern>](https://en.wikipedia.org/wiki/Bridge_pattern)

Nous aurons par exemple :

* Une interface `GeoLogger`

```java
interface GeoLogger {
    void log(LogLevel level, String message, Geometry g);
}
```

* Une implémentation pour l'écriture classique :

```java
class ConsoleGeoLogger implements GeoLogger {
    void log(LogLevel level, String message, Geometry g){
        // écriture d'un message dans la console
    }
}
```

* Une implémentation pour l'écriture dans une table :

```java
class DatabaseGeoLogger implements GeoLogger {
    void log(LogLevel level, String message, Geometry g){
        // écriture d'une ligne dans une table
    }
}
```

A l'utilisation, nous dépendrons uniquement de `GeoLogger` qui pourra être initialisée en fonction de variables fournies à l'exécution :

```java
class MonTraitement {
    private GeoLogger logger;

    public MonTraitement(GeoLogger logger){
        this.logger = logger;
    }

    public void traitement(Geometry geometry){
        this.logger.log(LogLevel.INFO, "calcul d'un buffer...", geometry);
        Geometry buffer = geometry.buffer();
        this.logger.log(LogLevel.INFO, "buffer résultant...", buffer);
        //...
    }
}
```

## Remarques

En pratique, le patron bridge sera souvent utilisé pour :

* **Localiser la dépendance à une bibliothèque** (i.e. ne pas en dépendre partout dans son code).
* **Permettre le choix entre plusieurs bibliothèques**

Nous trouverons souvent des bridges dans les Framework :

* En Java, avec [docs.spring.io - Logging](https://docs.spring.io/spring-framework/reference/core/spring-jcl.html) illustrant la possibilité d'utiliser au choix log4j2, SLF4J,...
* En PHP, où [Symfony utilise des bridges pour l'ORM (Doctrine), l'écriture des logs (Monolog), le templating (Twig),...](https://github.com/symfony/symfony/tree/7.2/src/Symfony/Bridge)

En TypeScript, vous pourriez par exemple être amené à faire un bridge sur [Turf.js](https://turfjs.org/) ou [JSTS](https://github.com/bjornharrtell/jsts?tab=readme-ov-file#jsts) pour localiser la dépendance aux bibliothèques de calcul géométrique.


## Liens utiles

* [sourcemaking.com - Bridge Design Pattern](https://sourcemaking.com/design_patterns/bridge)
* [springframework.guru - Bridge Pattern](https://springframework.guru/gang-of-four-design-patterns/bridge-pattern/) qui prend l'exemple de l'envoi de messages de types différents (TextMessage, EmailMessage,...) avec des systèmes différents.

