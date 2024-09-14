# Iterator

## Problème

Nous voulons des traitements capables de fonctionner sur tous les types de collections (`List`, `Map`, `Set`...).

## Solution

Nous faisons abstraction sur le parcours d'une collection :

```java
interface Iterator {
    public boolean hasNext() ;
    public Object next() ;
}
```

Nous aurons ainsi des traitements **moins consommateur de mémoire** et **plus réutilisables** que ceux dépendant d'interface précises (`List`, `Map`, `Set`...).

## Variantes

Nous trouverons plusieurs variantes pour ce patron de conception :

* `Iterator.reset` permettant de reprendre la lecture au début au début.
* `ReverseIterator` permettant un parcours en sens inverse.
* `CircularIterator` (CGAL) permettant un parcours sans début et sans fin (parcours des sommets d'un polygone)

Nous soulignerons qu'il existe **plusieurs styles d'interfaces permettant d'itérer sur des collections** (stream, iterator, generator,...). Les conversions seront d'ailleurs souvent réalisées à l'aide du patron de conception adaptateur :

```ts
const myReadableStream = ReadableStream.from(iteratorOrAsyncIterator);
```

> Source : [developer.mozilla.org - Convert an iterator or async iterator to a stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream#convert_an_iterator_or_async_iterator_to_a_stream)

Enfin, nous noterons que **de nombreux langages généralisent la notion de collection itérable** afin d'unifier le parcours des collections, générateur,... :

```ts
for ( const item of anyIterableType ){
    console.log(item);
}
```

## Ressources

* [Iterator](https://docs.oracle.com/javase/8/docs/api/java/util/Iterator.html) dans la bibliothèque standard Java.
