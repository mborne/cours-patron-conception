# Iterator

## Problème

On veut des algorithmes capables de fonctionner sur des collections (tableaux, listes, sets, etc.)

## Solution

On fait abstraction sur le parcours d'une collection :

```
interface Iterator {
    public boolean hasNext() ;
    public Object next() ;
}
```

En procédant ainsi, on obtient quelques avantages par rapport aux interfaces des collections :

* Moins consommateur de mémoire qu'une approche où on renvoie des collections concrètes
* Plus simple à adapter (au sens du patron de conception adapter) qu'une interface offrant plus riche du type "Array", "List".

De plus, quand les itérateurs font partie intégrante des bibliothèques standards, s'appuyer sur les itérateurs
permet généralement de supporter la plupart des collections. On évite ainsi d'être amené à faire des copies
pour exploiter les algorithmes.


## Variantes

Il existe de nombreuses variantes de ce patron de conception :

* Iterator.reset : Permet de recommancer la lecture au début

* ReverseIterator : Permet de représenter un itérateur effectuant un parcours en sens inverse

* CircularIterator (CGAL) : Itérateur sans début et sans fin revenant en position initiale (parcours des sommets d'un polygone)


## Resources

* [Itérateur de la bibliothèque standard C++ (STL)](http://www.cplusplus.com/reference/iterator/)

On remarquera l'utilisation de l'opérateur "++" et différente catégorie d'itérateur (RandomAccess, Bidirectional, Forward, Input, Output).

* [Itérateurs de la bibliothèque standard PHP (SPL)](http://php.net/manual/fr/spl.iterators.php)
