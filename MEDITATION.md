# Méditation

Quelques exemples de codes à méditer pour bien comprendre l'intérêt
des différents concepts de la P.O.O.

---

## Intérêt des aggrégats de variables

Sans :

```
function centroid( double[] tabX, double[] tabY ){
    //...
}
```

Avec :

```

struct Coordinate {
    double x ;
    double y ;
}

function centroid( Coordinate[] coordinate ){
    //...
}
```

=> Que se passe-t'il si on ajoute une dimension "z"?

---

## Intérêt des constructeurs

Avant :

```
Coordinate c ;
c.x = 3.0;
c.y = 3.0;
```

Après :

```
Coordinate c = new Coordinate(3.0,4.0) ;
```

=> Quels sont les différences ? (protection contre erreur de codage? valeur par défaut?)

---

## Intérêt de l'encapsultation (1/2)

Est-il utile de mettre les attributs private?

```
class User {
    public String username ;
    public int age ;
}
```

---

## Intérêt de l'encapsultation (2/2)

Après avoir stocké dans un fichier et revenir dans un an ! On aura alors envie
de remplacer "age" par "birthDate" (un invariant temporel).

Avec les getters/setters :

```
class User {
    public String username ;
    public Date birthDate ;

    public int getAge(){
        // calcul à partir de birthDate
    }

    @deprecated
    public void setAge(int age){
        // calcul à partir de birthDate
    }
}
```

---

## Intérêt du polymorphisme

* Un élément graphique dans une interface

```
class Widget {

    private Dimension dimension ;

    public void paint(Painter painter){
        System.out.println("Rendu du widget");
    }

}
```

* Un élément graphique particulier

```
class Button extends Widget {

    private String text ;

    public Button(String text){
        this.text = text ;
    }

    public void paint(Painter painter){
        super.paint(painter);
        System.out.println("Rendu du texte : "+text);
    }
}
```

---

## Intérêt de abstract

Les classes dérivées ont une partie du fonctionnement en commun.

### Exemple avec des fonctions utilitaires

```
enum LogLevel {
    TRACE,
    DEBUG,
    WARN,
    ERROR
}
```

```
class AbstractLogger {

    // comportement commun aux classes mères

    public void trace(String message){
        log(LogLevel.TRACE,message);
    }

    public void debug(String message){
        log(LogLevel.DEBUG,message);
    }

    public void warn(String message){
        log(LogLevel.WARN,message);
    }

    public void error(String message){
        log(LogLevel.WARN,message);
    }

    /*
     * Seul comportement a implémenter sur les classes dérivées
     */
    public abstract void log(LogLevel level, String message ) ;

}
```

```
class ConsoleLogger {

    public void log(LogLevel level, String message ) {
        System.out.println("["+level+"] "+message);
    }

}
```


```
class DatabaseLogger {

    private Connection connection;

    public DatabaseLogger(Connection connection){
        this.connection = connection ;
    }

    public void log(LogLevel level, String message ) {
        // stockage du message dans une table de log
    }

}
```

Remarque : Noter que ce qui varie avec le polymorphisme, c'est l'initialisation,
la création des objets.


---

## Intérêt des interfaces

Les interfaces fournissent la seule définition du contrat qui sera respecté par
les classes dérivées : la liste des méthodes supportées.

```
interface LocationProvider {

    public Coordinate getLocation() ;

}
```

---

## Couplage interface et abstract

Il est parfois intéresssant de procéder sur trois niveaux

* Une interface

```
interface LoggerInterface {

    public void trace(String message) ;

    public void debug(String message) ;

    public void warn(String message) ;

    public void error(String message) ;

    public void log(LogLevel level, String message ) ;

}
```

* Une classe abstraite qui implémente les parties communes

```
abstract class AbstractLogger implements LoggerInterface {

    public void trace(String message){
        log(LogLevel.TRACE,message);
    }

    public void debug(String message){
        log(LogLevel.DEBUG,message);
    }

    public void warn(String message){
        log(LogLevel.WARN,message);
    }

    public void error(String message){
        log(LogLevel.WARN,message);
    }

}
```

* Des classes concrètes

```
class ConsoleLogger extends AbstractLogger {
    public void log(LogLevel level, String message ) {
        // écriture du message dans la console
    }
}
```

```
class DatabaseLogger extends AbstractLogger {
    // écriture du message dans une table
}
---
