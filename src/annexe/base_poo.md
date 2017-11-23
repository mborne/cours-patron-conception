# Méditation

Quelques exemples de codes à méditer pour bien comprendre l'intérêt
des différents concepts de la P.O.O. : 

* [Intérêt des aggrégats de variables](#intérêt-des-aggrégats-de-variables)
* [Intérêt des constructeurs](#intérêt-des-constructeurs)
* [Intérêt de l'encapsulation](#intérêt-de-l'encapsulation)
* [Intérêt du polymorphisme](#intérêt-du-polymorphisme)
* [Intérêt de abstract](#intérêt-de-abstract)
* [Intérêt des interfaces](#intérêt-des-interfaces)
* [Mise en garde sur les interfaces](#mise-en-garde-sur-les-interface)
* [Couplage interface et abstract](#couplage-interface-et-abstract)

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

## Intérêt de l'encapsulation

Est-il utile de mettre les attributs private?

```
class User {
    public String username ;
    public int age ;
}
```

Stocker dans un fichier et revenir dans un an! On aura alors envie
de remplacer "age" par "birthDate" (un invariant temporel).

Avec les getters/setters, on peut modifier la structure interne
sans 

```
class User {
    public String username ;
    public Date birthDate ;

    public int getAge(){
        // calcul à partir de birthDate
    }

    @deprecated
    public void setAge(int age){
        // calcul de birthDate à partir de l'age
    }
}
```

Attention : 

* Il ne suffit pas de mettre des accesseurs pour résoudre tous les problèmes!
* Certains accesseurs exposent trop d'information sur la structure interne (des collections par exemple)


---

## Intérêt du polymorphisme

Comparer l'approche suivante à un "switch" pour effectuer le rendu d'un 
composant d'interface graphique :

* Un élément graphique dans une interface

```
class Widget {

    private Dimension dimension ;

    public void paint(Painter painter){
        System.out.println("Rendu du widget");
    }

}
```

* Un élément graphique spécial : Button

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
class AbstractLogger {

    // comportement commun aux classes mères

    public void debug(String message){
        log(LogLevel.DEBUG,message);
    }

    public void warn(String message){
        log(LogLevel.WARN,message);
    }

    public void error(String message){
        log(LogLevel.WARN,message);
    }

    //Seul comportement a implémenter sur les classes dérivées
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

---

## Intérêt des interfaces

Les interfaces fournissent la seule définition du contrat qui sera respecté par
les classes dérivées : La liste des méthodes supportées.

```
interface LocationProvider {

    public Coordinate getLocation() ;

}
```

Les classes ont une grande liberté sur la méthode
d'implémentation des contrats définit à travers les interfaces.

## Mise en garde sur les interface

Il ne suffit pas de mettre en place une interface pour avoir
de la souplesse sur les implémentations possibles :

* L'implémentation de certains contrats est plus complexes que d'autres.
* L'implémentation d'un contrat peut s'avérer sous-performante en fonction des
classes concrètes (exemple : Accès par clée sur un tableau, accès ligne par ligne via SQL, etc.)

=> Il faut bien réflechir aux implications des choix effectués dans la conception de l'interface.

# Couplage interface et abstract

Il est souvent intéresssant de procéder sur trois niveaux d'héritage en présence d'interface

* Une interface

```
interface LoggerInterface {

    public void debug(String message) ;

    public void warn(String message) ;

    public void error(String message) ;

    public void log(LogLevel level, String message ) ;

}
```

* Une classe abstraite qui implémente les parties communes

```
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
    public void log(LogLevel level, String message ) {
        // écriture du message dans une table
    }
}
```

etc.
