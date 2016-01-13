# Builder

## Problème

L'instanciation de certaines classes est complexe non pas en raison de
la présence d'une hiérarchie, mais en raison du nombre de relation entre
les différents objets.

TODO : cas des constructeurs en pagaille
TODO : cas des nombreux appels successifs


## Variantes

La terminologie builder est généralisée à toute création par partie d'objet via la séquence suivante :

* Récupération d'un builder
* Définition de la cible par appel successif au builder (add, set, etc...)
* Récupération de l'instance produite (getProduct)

## Exemple en Java

* StringBuilder

* ProcessBuilder

```
// Création du builder (argument obligatoire du processus)
ProcessBuilder pb = new ProcessBuilder("myCommand", "myArg1", "myArg2");

// Manipulation du builder (argument optionnels du processus)
Map env = pb.environment();
env.put("VAR1", "myValue");
env.remove("OTHERVAR");
env.put("VAR2", env.get("VAR1") + "suffix");
pb.directory(new File("myDir"));

// Récupération du processus
Process p = pb.start();
```

## Lien utile

* [Exemple d'utilisation dans la création de formulaire dans Symfony2 (PHP)](http://symfony.com/doc/current/book/forms.html#building-the-form)
