# Observer

## Problème

On souhaite réagir lorsqu'un objet effectue des opérations (changement 
d'état par exemple).

## Solution

L'observable porte des observateurs. Il envoie un signal aux observables
en appelant une méthode "notify".

![UML Observer](uml/UML_Observer.png)

Source [<https://fr.wikipedia.org/wiki/Observateur_(patron_de_conception)>](https://fr.wikipedia.org/wiki/Observateur_(patron_de_conception))

## Exemple

On modélise un interrupteur (Switch) qui va signaler ses changements d'état.

En rendant ce switch Observable, on peut créer un observer qui allume/éteind une lampe,
un autre qui joue un son, etc.

## Variante

On retrouve plusieurs variantes dans les systèmes. Il est souvent question 
d'événements (EventListener, EventSubscriber, EventDispatcher dans Symfony2, trigger/on avec JQuery, 
signal/slot dans C++/Qt, etc.)

## Resource 

* [Observer](https://docs.oracle.com/javase/7/docs/api/java/util/Observer.html) 
et [Observable](https://docs.oracle.com/javase/7/docs/api/java/util/Observable.html) dans l'API Java

* [Design pattern Observateur en Java : positionnement via un GPS (design-patterns.fr)](http://design-patterns.fr/observateur-en-java)

