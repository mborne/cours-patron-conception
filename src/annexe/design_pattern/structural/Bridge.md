# Bridge

## Problème

Nous souhaitons découpler une abstraction de son implémentation afin que les deux puissent
varier indépendamment l'une de l'autre.

## Cas d'école

Nous développement des algorithmes réalisant des traitements géométriques. Pour être en mesure d'analyser les problèmes, nous souhaitons soit :

* Écrire classiquement des journaux applicatifs dans la console
* Écrire ces journaux applicatifs dans une table PostGIS (`timestamp;message;geometry`)

## Solution

Nous pouvons nous inspirer du patron bridge :

![UML Bridge](uml/UML_Bridge.png)

Source [<https://en.wikipedia.org/wiki/Bridge_pattern>](https://en.wikipedia.org/wiki/Bridge_pattern)

Nous pourrons par exemple :

* Définir une interface `GeoLogger`

```java
interface GeoLogger {
    void log(LogLevel level, String message, Geometry g);
}
```

* Implémenter cette interface pour écrire dans la console :

```java
class ConsoleGeoLogger implements GeoLogger {
    void log(LogLevel level, String message, Geometry g){
        // écriture d'un message dans la console
    }
}
```

* Implémenter cette interface pour écrire dans la console :

```java
class DatabaseGeoLogger implements GeoLogger {
    void log(LogLevel level, String message, Geometry g){
        // écriture d'une ligne dans une table
    }
}
```

A l'utilisation, nous dépendrons uniquement de `GeoLogger` qui pourra être initialisé en fonction de variables fournies à l'exécution :

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

## Autres cas d'usage

En pratique, bridge sera souvent utilisé pour :

* S'appuyer sur une bibliothèque sans en dépendre partout dans son code.
* Permettre à l'utilisateur de choisir entre plusieurs bibliothèques (par exemple pour écrire des journaux applicatifs)

## Liens utiles

* [docs.spring.io - Logging](https://docs.spring.io/spring-framework/reference/core/spring-jcl.html)
* [sourcemaking.com - Bridge Design Pattern](https://sourcemaking.com/design_patterns/bridge)
* [springframework.guru - Bridge Pattern](https://springframework.guru/gang-of-four-design-patterns/bridge-pattern/) qui prend l'exemple de l'envoi de messages de types différents (TextMessage, EmailMessage,...) avec des systèmes différents.

