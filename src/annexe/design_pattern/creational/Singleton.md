# Singleton

## Problème

Nous avons une classe qui doit être instanciée qu'une seule fois.

## Solution

![UML Singleton](uml/UML_DP_Singleton.png)

Source : https://fr.wikibooks.org/wiki/Patrons_de_conception/Singleton

## Exemple d'implémentation

```java
class MonSingleton {

    private static MonSingleton instance = new MonSingleton() ;

    private MonSingleton(){

    }

    public static MonSingleton getInstance(){
        return instance ;
    }

}
```

## Exemple dans l'API JAVA

* `Runtime` accessible via `System.getRuntime()`

## Mise en garde

* Il existe plusieurs variantes d'implémentation (*thread safe*, *lazy loading*,...)
* **La singletonite est un anti-pattern** (ne pas utiliser un singleton pour le seul motif qu'il est pratique d'avoir accès statiquement à l'instance)
* L'utilisation d'un singleton rend le code difficilement testable

## Liens utiles

* [fr.wikibooks.org - Singleton](https://fr.wikibooks.org/wiki/Patrons_de_conception/Singleton)
* [thecodersbreakfast.net - De la bonne implémentation du Singleton en Java](https://thecodersbreakfast.net/index.php?post/2008/02/25/26-de-la-bonne-implementation-du-singleton-en-java)

