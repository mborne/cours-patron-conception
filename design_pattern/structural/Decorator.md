# Decorator

## Problème

On souhaite pouvoir ajouter dynamiquement de nouvelles responsabilités à une classe existante.

## Solution

On hérite de la classe existante et on compose.

## Exemple

On représente des personnages dans un jeu. Ces personnages ont un poids
qui est utilisé par le moteur physique.


* Une interface Personnage

```
interface Personnage {
    public double getWeight() ;

    public void render() ;
}
```

* Une classe concrète Humain

```
class Humain implements Personnage {
    public double getWeight(){
        return 80.0 ;
    }
}

```



```
class PersonnageAvecHache implements Personnage {

    private Personnage original ;

    public PersonnageAvecHache(Personnage original){
        this.original = original ;
    }

    public double getWeight(){
        return original.getWeight() + 15.0 ;
    }
}
```


```
class PersonnageAvecChapeau implements Personnage {

    private Personnage original ;

    public PersonnageAvecChapeau(Personnage original){
        this.original = original ;
    }

    public double getWeight(){
        return original.getWeight() + 2.0 ;
    }
}
```

A l'usage :

```
Personnage personnage = new Humain();
personnage = new PersonnageAvecHache(personnage);
personnage = new PersonnageAvecChapeau(personnage);
System.out.println(personnage.getWeight()); // 80 + 15 + 2
```


## Autres exemples en Java

* [BufferedReader/Reader](https://docs.oracle.com/javase/7/docs/api/java/io/BufferedReader.html)


## Liens utiles

[Exemple avec des composants d'IHM](https://fr.wikibooks.org/wiki/Patrons_de_conception/D%C3%A9corateur#Java)
