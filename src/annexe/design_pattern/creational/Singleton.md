# Singleton

## Problème

Nous avons une classe qui ne doit être instanciée qu'une seule fois.

## Solution

![UML Singleton](uml/UML_DP_Singleton.png)

Source : https://fr.wikibooks.org/wiki/Patrons_de_conception/Singleton

## Exemple d'implémentation

Nous pouvons par exemple définir une classe pour disposer d'un compteur global à l'application comme suit :

```ts
class Sequence {

    private static _instance: Sequence = new Sequence();

    private _current = 0;

    private constructor(){
    }

    static getInstance(): Sequence {
        return Sequence._instance ;
    }

    current(): number {
        return this._current;
    }

    next(){
        return this._current++;
    }
}
```

A l'utilisation, nous aurons :

```ts
const sequence = Sequence.getInstance();
console.log(sequence.next()); // 0
console.log(sequence.next()); // 1
```


## Mise en garde

* Il existe plusieurs variantes d'implémentation (*thread safe*, *lazy loading*,...) fonction du langage
* L'utilisation d'un singleton rend le **code difficilement testable**
* L'utilisation d'un singleton rend le **code moins flexible** (ex : `Camera.getInstance()` dans un jeu 3D imposerait la présence d'une seule caméra)
* **La singletonite est un anti-pattern** :
  * La tentation est grande de l'utiliser pour disposer d'un accès statique à une instance
  * Le problème est le même qu'en cas d'utilisation d'une variable globale
* Il convient de **réserver l'utilisation du singleton dans le cas où l'instance <u>doit être</u> unique**.

## Variantes

En JavaScript et TypeScript, nous remarquerons que les concepteurs utilisent plutôt des **variables globales** (ex : [navigator.geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation) pour l'[API de géolocalisation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation)). Il sera aussi plus naturel d'**assurer l'unicité de la construction au niveau d'un module** plutôt que de recourir à un constructeur privé :

```ts
// helpers/globalSequence.ts - instance globale unique de Sequence
const globalSequence : Sequence = new Sequence();
export default globalSequence ;
```

## Liens utiles

* [fr.wikibooks.org - Singleton](https://fr.wikibooks.org/wiki/Patrons_de_conception/Singleton)
* [refactoring.guru - Singleton](https://refactoring.guru/fr/design-patterns/singleton)
* [refactoring.guru - Singleton in TypeScript](https://refactoring.guru/design-patterns/singleton/typescript/example)
* [thecodersbreakfast.net - De la bonne implémentation du Singleton en Java](https://thecodersbreakfast.net/index.php?post/2008/02/25/26-de-la-bonne-implementation-du-singleton-en-java)
