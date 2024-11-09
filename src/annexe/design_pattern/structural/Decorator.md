# Decorator

## Problème

Nous souhaitons pouvoir modifier dynamiquement le comportement d'une classe existante.

## Cas d'école

Nous avons des personnages dans un jeu modélisé comme suit avec un poids utilisé par le moteur physique :

* Une interface Personnage :

```ts
interface Personnage {
    getWeight(): number;
}
```

* Une classe concrète Humain :

```ts
class Humain implements Personnage {

    getWeight(): number {
        return 80.0;
    }

}
```

Nous souhaitons pouvoir modifier les caractéristiques de ces personnages avec l'ajout d'une hache, d'un chapeau,...

## Solution

Nous pouvons implémenter **hériter de l'interface et nous appuyer sur l'instance originale pour l'implémentation** :

```ts
class PersonnageAvecHache implements Personnage {

    private original: Personnage;

    constructor(original: Personnage) {
        this.original = original;
    }

    getWeight(): number {
        return this.original.getWeight() + 15.0;
    }
}
```


```ts
class PersonnageAvecChapeau implements Personnage {

    private original: Personnage;

    constructor(original: Personnage) {
        this.original = original;
    }

    public getWeight(): number {
        return this.original.getWeight() + 2.0;
    }
}
```

A l'usage :

```ts
let personnage = new Humain();
personnage = new PersonnageAvecHache(personnage);
personnage = new PersonnageAvecChapeau(personnage);
console.log(personnage.getWeight()) // 80 + 15 + 2
```

## Autres cas d'école

* `RetryingHttpClient` décorant `HttpClient` avec plusieurs tentatives sur les requêtes GET .
* `HideSecretLogger` décorant `Logger` pour masquer des secrets dans les messages des journaux applicatifs.
* [FilteredReportBuilder](https://github.com/IGNF/validator/blob/v4.4.5/validator-core/src/main/java/fr/ign/validator/report/FilteredReportBuilder.java) décorant [ReportBuilder](https://github.com/IGNF/validator/blob/v4.4.5/validator-core/src/main/java/fr/ign/validator/report/ReportBuilder.java) pour limiter le nombre d'erreur d'un même type dans un rapport de validation de données 
* ...

## Liens utiles

* [fr.wikibooks.org - Décorateur avec exemple en Java avec des composants d'IHM](https://fr.wikibooks.org/wiki/Patrons_de_conception/D%C3%A9corateur#Java)
* [refactoring.guru - Decorator](https://refactoring.guru/fr/design-patterns/decorator)
