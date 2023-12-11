# Decorator

## Problème

Nous souhaitons pouvoir modifier dynamiquement le comportement d'une classe existante.

## Cas d'école

Nous avons des personnages dans un jeu modélisé comme suit avec un poids utilisé par le moteur physique :

* Une interface Personnage :

```java
interface Personnage {
    public double getWeight() ;
}
```

* Une classe concrète Humain :

```java
class Humain implements Personnage {
    public double getWeight(){
        return 80.0 ;
    }
}
```

Nous souhaitons pouvoir modifier les caractéristiques de ces personnages avec l'ajout d'une hache, d'un chapeau,...

## Solution

Nous pouvons implémenter **hériter de l'interface et nous appuyer sur l'instance originale pour l'implémentation** :

```java
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


```java
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

```java
Personnage personnage = new Humain();
personnage = new PersonnageAvecHache(personnage);
personnage = new PersonnageAvecChapeau(personnage);
System.out.println(personnage.getWeight()); // 80 + 15 + 2
```

## Autres cas d'école

* `RetryingHttpRequest` décorant `HttpRequest` avec plusieurs tentatives sur GET 
* `HideSecretLogger` décorant `Logger` pour masquer des secrets dans les messages des journaux applicatifs
* [FilteredReportBuilder](https://github.com/IGNF/validator/blob/v4.4.5/validator-core/src/main/java/fr/ign/validator/report/FilteredReportBuilder.java) décorant [ReportBuilder](https://github.com/IGNF/validator/blob/v4.4.5/validator-core/src/main/java/fr/ign/validator/report/ReportBuilder.java) pour limiter le nombre d'erreur d'un même type dans un rapport de validation de données 
* ...

## Autres exemples en Java

* [BufferedReader/Reader](https://docs.oracle.com/javase/7/docs/api/java/io/BufferedReader.html)
* [LineNumberReader/BufferedReader](https://docs.oracle.com/javase/7/docs/api/java/io/LineNumberReader.html)

## Liens utiles

* [fr.wikibooks.org - Décorateur avec exemple en Java avec des composants d'IHM](https://fr.wikibooks.org/wiki/Patrons_de_conception/D%C3%A9corateur#Java)

