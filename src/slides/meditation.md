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

```cxx
Coordinate c ;
c.x = 3.0;
c.y = 3.0;
```

Après :

```java
Coordinate c = new Coordinate(3.0,4.0) ;
```

Quel est l'apport de la deuxième approche :

* Pour éviter éviter les erreurs de codage?
* Quand on ajoute un "z"?

---

## Intérêt de l'encapsulation (1/3)

Sur une classe comme celle-ci, on peut se demander à quoi bon mettre des attributs privés :

```java
class User {
    public String username ;
    public int age ;
}
```

Après tout, il est plus simple d'appeler partout dans le programme un `user.age` plutôt qu'un `user.getAge()`...

Que se passera-t'il un an après avoir stocker ces âges dans des fichiers?

---

## Intérêt de l'encapsulation (2/3)

On aura envie de **changer la conception** pour stocker plutôt des "dates de naissances" (invariant temporel).

En présence de getters et setters, on peut **changer la structure interne sans casser les appels** à `user.getAge()` :

```java
class User {
    private String username ;
    private Date birthDate ;

    public int getAge(){
        // calcul à partir de birthDate
    }

    @deprecated
    public void setAge(int age){
        // calcul de birthDate à partir de l'age
    }
}
```

---

## Intérêt de l'encapsulation (3/3)

Attention toutefois :

* Il ne suffit pas de mettre des accesseurs pour résoudre tous les problèmes!
* Certains accesseurs exposent trop d'information sur la structure interne (des collections par exemple)

---

## Intérêt du polymorphisme (1/2)

Quel est l'intérêt de l'approche suivante par rapport à un `switch` pour effectuer le rendu de composant graphique?

* `Widget`  Un élément graphique dans une interface

```java
class Widget {

    private Dimension dimension ;

    public void paint(Painter painter){
        System.out.println("Rendu du widget");
    }

}
```

---

## Intérêt du polymorphisme (2/2)

* ̀`Button` : Un type de `Widget` particulier

```java
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

## Intérêt de abstract (1/3)

`abstract` sera souvent utile pour éviter des redondances dans l'implémentation des classes réelles. Par exemple :

```java
class AbstractLogger {

    public void debug(String message){
        log(LogLevel.DEBUG,message);
    }

    public void warn(String message){
        log(LogLevel.WARN,message);
    }

    public void error(String message){
        log(LogLevel.WARN,message);
    }

    /* Seul comportement à implémenter sur les classes concrètes */
    public abstract void log(LogLevel level, String message ) ;

}
```

---

## Intérêt de abstract (2/3)

Implémentation concrète pour l'écriture dans la console :

```java
class ConsoleLogger {

    public void log(LogLevel level, String message ) {
        System.out.println("["+level+"] "+message);
    }

}
```

---

## Intérêt de abstract (3/3)

Implémentation concrète pour l'écriture dans une base de données :

```java
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

---

## Intérêt des interfaces

Les interfaces fournissent la seule définition du contrat qui sera respecté par
les classes dérivées : La liste des méthodes supportées.

```java
interface LocationProvider {

    public Coordinate getLocation() ;

}
```

Les classes ont une grande liberté sur la méthode d'implémentation des contrats définis à travers les interfaces.

---

## Mise en garde sur les interface (1/3)

Il ne suffit pas de mettre en place une interface pour avoir
de la souplesse sur les implémentations possibles :

* L'implémentation de certains contrats est plus complexes que d'autres.
* L'implémentation d'un contrat peut s'avérer sous-performante en fonction des
classes concrètes (exemple : Accès par clée sur un tableau, accès ligne par ligne via SQL, etc.)

=> Il faut bien réflechir aux implications des choix effectués dans la conception de l'interface.

---

## Mise en garde sur les interface (2/3)

Ici, on choisit d'appeler `LocationProvider` :

```java
interface LocationProvider {
    public Coordinate getLocation() ;
}
```

Là, on choisit d'être appelé par `LocationProvider` (par exemple en cas de déplacement) :

```java
interface LocationProvider {
    public void addListener(LocationListener event) ;
}
```

---

## Mise en garde sur les interface (3/3)

Ici, en renvoyant une liste, on impose quasiment le chargement en RAM :

```java
interface Database {
    public List<Row> query(String sql, String[] params);
}
```

Là, on prévoit des itérations sur des gros jeux de données :

```java
interface Database {
    public Iterator<Row> query(String sql, String[] params);
}
```

---

## Couplage interface et abstract (1/3)

Il est souvent intéresssant de procéder sur trois niveaux d'héritage en présence d'interface

## Une interface

```java
interface LoggerInterface {

    public void debug(String message) ;

    public void warn(String message) ;

    public void error(String message) ;

    public void log(LogLevel level, String message ) ;

}
```

---

## Couplage interface et abstract (2/3)

## Une classe abstraite qui implémente les parties communes

```java
abstract class AbstractLogger implements LoggerInterface {

    public void debug(String message){
        log(LogLevel.DEBUG,message);
    }

    public void warn(String message){
        log(LogLevel.WARN,message);
    }

    public void error(String message){
        log(LogLevel.ERROR,message);
    }

}
```

---

## Couplage interface et abstract (3/3)

### Des classes héritants de la classe abstraite

```java
class ConsoleLogger extends AbstractLogger {
    public void log(LogLevel level, String message ) {
        // écriture du message dans la console
    }
}
```

```java
class DatabaseLogger extends AbstractLogger {
    public void log(LogLevel level, String message ) {
        // écriture du message dans une table
    }
}
```
