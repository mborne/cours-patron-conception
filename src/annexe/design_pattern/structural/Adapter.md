# Adapter (Adaptateur)

## Problème

**Nous avons deux interfaces qui ont des fonctionnalités équivalentes mais qui sont incompatibles**. 

## Cas d'école

Nous disposons d'un algorithme qui effectue la concaténation de chaînes de caractères
avec un séparateur et prenant en entrée un `Enumeration` :

```java
class EnumerationUtils {

    public static String concat(Enumeration<String> items, String separator){
        //...
    }

}
```

Nous devons appliquer cet algorithme sur un `Iterator<String>` présentant un comportement similaire :

* [Enumeration](https://docs.oracle.com/javase/7/docs/api/java/util/Enumeration.html)
* [Iterator](https://docs.oracle.com/javase/7/docs/api/java/util/Iterator.html)

## Solution

L'idée est la même que pour les adaptateurs dans la vie courante. Nous allons **créer un intermédiaire qui se charger d'adapter les appels** :

```java
class IteratorToEnumationAdapter implements Enumeration<String> {

    private Iterator<String> adaptee ;

    public Adapter(Iterator<String> adaptee){
        this.adaptee = adaptee ;
    }

    public boolean hasMoreElements(){
        return adaptee.hasNext() ;
    }

    public String nextElement(){
        return adaptee.next() ;
    }

}
```

Nous pourrons appeler l'algorithme comme suit :

```java
Iterator<String> items ;
//...
System.out.println(EnumerationUtils.concat(
    new IteratorToEnumationAdapter(items)
));
```

> Remarque : Le livre "tête la première dans les designs patterns" traite le cas inverse et l'adaptation partielle (absence de la fonction "remove" sur les Enumeration)

## Liens utiles

* [fr.wikibooks.org - Adaptateur](https://fr.wikibooks.org/wiki/Patrons_de_conception/Adaptateur)

