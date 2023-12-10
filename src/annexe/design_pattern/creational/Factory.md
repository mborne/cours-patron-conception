
# Factory

## Problème

La fabrique s'adresse à la problématique de la création d'instances dérivées d'une classe.

## Cas d'école

Nous avons par exemple la hiérarchie suivante :

* Animal
* Chat hérite de Animal
* Chien hérite de Animal

Supposons que nous devons charger un fichier contenant des animaux et créer des animaux via une API WEB.

A chaque fois, nous devrons faire appel à "new" en fonction du type de l'animal :

```java
Animal animal = null ;
if ( typeAnimal.equals("chat") ){
    animal = new Chat() ;
}else if (typeAnimal.equals("chien")){
    animal = new Chien() ;
}else{
    throw new AnimalTypeNotFound(typeAnimal);
}
animal.setNom(nomAnimal);
```

**En cas d'ajout d'un type d'animal, nous deverons modifier tous les codes créant des animaux.**


## Solution

Nous pouvons définir une classe avec une méthode dédiée à la création des animaux :

![UML Prototype](uml/UML_DP_Fabrique.png)

Appliqué à notre exemple, une AnimalFactory devient l'entité responsable de
la création d'un animal en fonction de son type.


```java
class AnimalFactory {
    public Animal createAnimal(String typeAnimal) throws AnimalTypeNotFound {
        if ( typeAnimal.equals("chat") ){
            return new Chat() ;
        }else if (typeAnimal.equals("chien")){
            return new Chien() ;
        }else{
            throw new AnimalTypeNotFound(typeAnimal);
        }
    }
}
```

Les autres codes sont insensibles à l'ajout d'un nouveau type.

```java
Animal animal = animalFactory.createAnimal(typeAnimal) ;
animal.setNom(nomAnimal);
```

## Variantes

Nous trouverons de nombreuses variantes du concept de fabrique :

* La fabrique statique

```java
AnimalFactory.createByType("chien")
```

* Les fabriques basées sur des prototypes (composition de pattern)

```java
class AnimalFactory throws AnimalTypeNotFound {
    private Map<String, Animal> prototypes = new HashMap<>();

    public Animal createAnimal(String typeAnimal){
        Animal prototype = prototypes.get(typeName);
        if ( prototype == null ){
            throw new AnimalTypeNotFound(typeAnimal);
        }
        return prototype.clone();
    }
}
```


* Les fabriques utilitaires qui ne créent pas des instances de types différents, mais avec des états initiaux différents


## Exemple en Java

Les fabriques sont nombreuses dans l'API java et dans les bibliothèques.

* [GeometryFactory de JTS](https://locationtech.github.io/jts/javadoc/org/locationtech/jts/geom/GeometryFactory.html)

Création de géométrie de différents types (Point, LineString, Polygon, etc.)

* [java.sql.DriverManager](https://docs.oracle.com/javase/8/docs/api/java/sql/DriverManager.html)

C'est une variante sous forme d'une fabrique statique

```java
Connection connection = DriverManager.getConnection("jdbc:postgresql:mabase")
```

## Lien(s) utile(s)

https://fr.wikibooks.org/wiki/Patrons_de_conception/Fabrique
