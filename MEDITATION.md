# Méditation

Quelques exemples de codes à méditer pour bien comprendre l'intérêt 
des différents concepts de la P.O.O.

---

## Intérêt des aggrégats de variables

Avant :

```
function centroid( double[] tabX, double[] tabY ){
    //... 
}
```

Après :

```

struct Coordinate {
    double x ;
    double y ;
}

function centroid( Coordinate[] coordinate ){
    //... 
}
```

---

## Intérêt des Constructeurs

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

Stocker dans un fichier et revenir dans un an : Vous aurez envie 
de remplacer "age" par "birthDate"

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




