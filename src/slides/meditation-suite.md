# Méditation - interfaces et classes abstraites

Quelques exemples à méditer pour **comprendre comment utiliser les interfaces et abstracts** dans des langages tels Java et PHP :

* Intérêt de abstract
* Couplage interface et abstract


## Intérêt de abstract (1/3)

`abstract` sera souvent utile pour éviter des redondances dans l'implémentation des classes réelles. Par exemple :

```java
abstract class AbstractLogger {

    public void debug(String message){
        log(LogLevel.DEBUG,message);
    }

    public void warn(String message){
        log(LogLevel.WARN,message);
    }

    public void error(String message){
        log(LogLevel.ERROR,message);
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

## Couplage interface et abstract (1/3)

Il sera assez rare de trouver une classe abstraite au sommet d'une hiérarchie. Il sera plus intéressant de **procéder sur trois niveaux d'héritage** avec :

* Une **interface**
* Une **classe abstraite** qui implémente les parties communes
* Des **classes concrètes** qui héritent de la classe abstraite

### Une interface

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

### Une classe abstraite qui implémente les parties communes

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

### Des classes concrètes qui héritent de la classe abstraite

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
