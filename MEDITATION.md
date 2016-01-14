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

=> Quels sont les différences (protection contre erreur de codage? valeur par défaut?)

---

## Intérêt de l'encapsultation (1/2)

C'est simple comme classe : Innutile de mettre ça private?

```
class User {
    public String username ;
    public int age ;
}
```

---

## Intérêt de l'encapsultation (2/2)

Stocker dans un fichier et revenir dans un an... Avoir envie
de remplacer "age" par "birthDate"...

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

TODO exemple trivial sans abstract.

---

## Intérêt de abstract

TODO exemple trivial.

---

## Intérêt des interfaces

TODO LoggerInterface / ConsoleLogger / FileLogger

Remarque : Noter que ce qui varie avec le polymorphisme, c'est l'initialisation,
la création des objets.

---

## Couplage interface et abstract

TODO LoggerInterface <= AbstractLogger <- ConsoleLogger







---
