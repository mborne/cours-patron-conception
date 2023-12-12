# Observer

## Problème

Nous souhaitons pouvoir réaliser des actions en cas d'événement particulier sur un objet (ex : modification de l'état de l'objet).

## Solution

Nous pouvons procéder comme suit en ajoutant des "observateurs" qui seront notifiés en cas d'événement sur un "observable" :

![UML Observer](uml/UML_Observer.png)

Source [<https://fr.wikipedia.org/wiki/Observateur_(patron_de_conception)>](https://fr.wikipedia.org/wiki/Observateur_(patron_de_conception))

## Remarques

Dans l'API Java, nous trouverons des classes [Observer](https://docs.oracle.com/javase/8/docs/api/java/util/Observer.html) et [Observable](https://docs.oracle.com/javase/8/docs/api/java/util/Observable.html). Toutefois, nous trouverons de **nombreuses variantes pour la gestion des événements** dans les bibliothèques Java et autres langages :

* [WindowListener, ActionListener,...](https://docs.oracle.com/javase/tutorial/uiswing/events/actionlistener.html) au niveau de la gestion des composants graphiques avec AWT.
* `addEventListener` en JavaScript
* `trigger/on` avec JQuery
* `EventListener`, `EventSubscriber`, `EventDispatcher` dans Symfony
* `signal/slot` dans C++/Qt
* etc.

## Liens utiles

* [Design pattern Observateur en Java : positionnement via un GPS (design-patterns.fr)](http://design-patterns.fr/observateur-en-java)

