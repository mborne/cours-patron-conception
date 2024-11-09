# Iterator

## Problème

Nous voulons des traitements capables de fonctionner sur tous les types de collections (`List`, `Map`, `Set`...).

## Solution

Le patron de conception itérateur propose de définir une abstraction sur le parcours d'une collection :

![UML_DP_Iterator](uml/UML_DP_Iterator.png)

```java
interface Iterator {
    public boolean hasNext() ;
    public Object next() ;
}
```

En procédant ainsi, nous aurons des traitements **moins consommateur de mémoire** et **plus réutilisables** que ceux dépendant d'interface précises (`List`, `Map`, `Set`...).

## Variantes

Nous soulignerons qu'il existe plusieurs variantes :

* `Iterator.reset()` permettant de reprendre la lecture au début au début.
* `ReverseIterator` permettant un parcours en sens inverse.
* `CircularIterator` (CGAL) permettant un parcours sans début et sans fin (parcours des sommets d'un polygone)
* ...


En noterons aussi qu'il existe **plusieurs styles d'interfaces permettant d'itérer sur des collections** (stream, iterator, generator,...) et qu'il sera possible de réaliser des conversions en s'appuyant sur le patron de conception Adaptateur :

```ts
const myReadableStream = ReadableStream.from(iteratorOrAsyncIterator);
```

Enfin, nous remarquerons que certains langages tels JavaScript et PHP **de nombreux langages généralisent la notion de collection itérable** afin d'unifier le parcours des collections, des résultats des générateurs,... :

```ts
for ( const item of anyIterableType ){
    console.log(item);
}
```

## Liens utiles

* [Iterator](https://docs.oracle.com/javase/8/docs/api/java/util/Iterator.html) dans la bibliothèque standard Java.
* [www.w3schools.com - JavaScript Iterables](https://www.w3schools.com/Js/js_iterables.asp), [developer.mozilla.org - Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)
* [PHP Traversable](https://www.php.net/manual/fr/class.traversable.php), [PHP Itérables](https://www.php.net/manual/fr/language.types.iterable.php)
[developer.mozilla.org - Convert an iterator or async iterator to a stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream#convert_an_iterator_or_async_iterator_to_a_stream)
