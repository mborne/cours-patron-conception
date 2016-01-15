# Iterator

## Problème

On veut des algorithmes capables de fonctionner sur des collections (tableaux, des listes, des sets, etc.)

## Solution

On fait abstraction sur le parcours d'une collection :

```
interface Iterator {
    public boolean hasNext() ;
    public Object next() ;
}
```

En procédant ainsi, on obtient quelques avantages par rapport aux interfaces des collections :

* Moins consommateur de mémoire qu'une approche où on renvoie des collections concrète
* Plus simple à adapter (au sens du patron de conception adapter) qu'une interface offrant un random access

De plus, quand les itérateurs sont parties intégrantes des bibliothèques standards, s'appuyer sur les itérateurs
permet généralement de supporter la plus part des collections. On évite ainsi d'être amené à faire des copies
pour exploiter les algorithmes.


## Remarque

Les itérateurs sont souvent intégrés dans les API de base des langages
de programmation.


## Variantes

Il existe de nombreuses variantes de ce patron de conception :

* Iterator.reset : Permet de recommancer la lecture au début

* ReverseIterator : Permet de représenter un itérateur effectuant un parcours en sens inverse

* CircularIterator (CGAL) : Iterateur sans début et sans fin revenant en position initiale (parcours des sommets d'un polygone)


## Resources

* [Itérateur de la bibliothèque standard C++ (STL)](http://www.cplusplus.com/reference/iterator/)

On remarquera l'utilisation de l'opérateur "++" et différente catégorie d'itérateur (RandomAccess, Bidirectional, Forward, Input, Output).

* [Itérateurs de la bibliothèque standard PHP (SPL)](http://php.net/manual/fr/spl.iterators.php)
