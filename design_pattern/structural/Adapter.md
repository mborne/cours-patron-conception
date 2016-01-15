# Adapter

## Problème

L'idée est la même que pour les adaptateurs dans la vie courrante :
On fait face à deux interfaces qui ont des fonctionnalités équivalente mais qui
sont incompatible. On va créer un intermédiaire.

## Exemple

On dispose d'un algorithme qui effectue la concaténation de chaîne de caractères
avec un séparateur.

```

class EnumerationUtils {

    public static String concat(Enumeration<String> items, String separator){
        //...
    }

}

```

Pas de chance : Nous devons appliquer cet algorithme sur un Iterator<String>.

On remarque que niveau fonctionnement, les deux interfaces Iterator et Enumeration sont sensiblement
similaires :

* [Enumeration](https://docs.oracle.com/javase/7/docs/api/java/util/Enumeration.html)
* [Iterator](https://docs.oracle.com/javase/7/docs/api/java/util/Iterator.html)

On va donc pouvoir créer un adaptateur :

```
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

Puis, appeler l'algorithme comme suit :


```
Iterator<String> items ;
//...
System.out.println(EnumerationUtils.concat(
    new IteratorToEnumationAdapter(items)
));
```

## Remarque

Le livre "tête la première dans les designs patterns" traite le cas inverse
et l'adaptation partielle (absence de la fonction "remove" sur les Enumeration)
