# Observer

## Problème

On souhaite réagir lorsqu'un objet est modifié.

## Solution

L'observable porte des observateurs. Il leur envoie un signal
en appelant une méthode "notify".

![UML Observer](uml/UML_Observer.png)

Source [<https://fr.wikipedia.org/wiki/Observateur_(patron_de_conception)>](https://fr.wikipedia.org/wiki/Observateur_(patron_de_conception))

## Exemple

On modélise un interrupteur (Switch) qui va signaler ses changements d'état.

En rendant ce switch Observable, on peut allumer/éteindre une lampe, jouer un son, etc.

## Variante

On retrouve plusieurs variantes dans les systèmes où il est question d'événements (EventListener, EventSubscriber, EventDispatcher, etc.)

## Resource 

* [Observer](https://docs.oracle.com/javase/7/docs/api/java/util/Observer.html) 
et [Observable](https://docs.oracle.com/javase/7/docs/api/java/util/Observable.html) dans l'API Java

* [Design pattern Observateur en Java : positionnement via un GPS (design-patterns.fr)](http://design-patterns.fr/observateur-en-java)



