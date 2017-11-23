# Builder

## Problème

Les fabriques traitent principalement de l'instanciation de classes en présence d'une hiérarchie.

Le patron de conception "Builder" s'attaque à l'instanciation de classes où
la complexité est liée à la complexité des objets et relations entre ces objets.

En outre, ce patron de conception est utile quand :

* On est tenté par la multiplication des constructeurs
* On doit appeler de nombreux accesseurs (set, add, etc.)


## Solution

* On met en place un nombre minimum de constructeurs
* On délégue la complexité de création des instances à des objets dédiés : Director et Builder


![UML Builder](uml/UML_DP_Builder.png)

Source [https://en.wikibooks.org/wiki/Computer_Science_Design_Patterns/Builder](https://en.wikibooks.org/wiki/Computer_Science_Design_Patterns/Builder)



## Exemple

Source : [https://fr.wikipedia.org/wiki/Monteur_%28patron_de_conception%29#Java](https://fr.wikipedia.org/wiki/Monteur_%28patron_de_conception%29#Java)


### Un produit Pizza

```
/* Produit */
class Pizza {
    private String pate = "";
    private String sauce = "";
    private String garniture = "";

    public void setPate(String pate){
        this.pate = pate;
    }

    public void setSauce(String sauce){
        this.sauce = sauce;
    }
    public void setGarniture(String garniture) {
        this.garniture = garniture;
    }
}
```

### Un monteur abstrait de pizza

```
/* Monteur */
abstract class MonteurPizza {
  protected Pizza pizza;

  public Pizza getPizza() { return pizza; }
  public void creerNouvellePizza() { pizza = new Pizza(); }

  public abstract void monterPate();
  public abstract void monterSauce();
  public abstract void monterGarniture();
}
```

### Des monteurs concrets

* Monteur pizza hawaii

```
class MonteurPizzaHawaii extends MonteurPizza {
  public void monterPate()      { pizza.setPate("croisée"); }
  public void monterSauce()     { pizza.setSauce("douce"); }
  public void monterGarniture() { pizza.setGarniture("jambon+ananas"); }
}
```

* Monteur pizza piquante

```
class MonteurPizzaPiquante extends MonteurPizza {
  public void monterPate()      { pizza.setPate("feuilletée"); }
  public void monterSauce()     { pizza.setSauce("piquante"); }
  public void monterGarniture() { pizza.setGarniture("pepperoni+salami"); }
}
```

### Un serveur dans le rôle du Directeur

```
class Serveur {
    private MonteurPizza monteurPizza;

    public void setMonteurPizza(MonteurPizza mp) {
        monteurPizza = mp;
    }

    public Pizza getPizza() {
        return monteurPizza.getPizza();
    }

    public void construirePizza() {
        monteurPizza.creerNouvellePizza();
        monteurPizza.monterPate();
        monteurPizza.monterSauce();
        monteurPizza.monterGarniture();
    }
}
```

### Exemple d'utilisation

```
Serveur serveur = new Serveur();
MonteurPizza monteurPizzaHawaii  = new MonteurPizzaHawaii();
MonteurPizza monteurPizzaPiquante = new MonteurPizzaPiquante();

serveur.setMonteurPizza(monteurPizzaHawaii);
serveur.construirePizza();

Pizza pizza = serveur.getPizza();
```

## Variantes

La terminologie builder est généralisée à toute création par partie d'objet via la séquence suivante :

* Récupération d'un builder
* Définition de la cible par appels successifs au builder (add, set, etc...)
* Récupération de l'instance produite (getProduct)

En outre, la distinction n'est pas toujours faite entre "Director" et "Builder".


## Exemple en Java

* StringBuilder

* [CalendarBuilder](https://docs.oracle.com/javase/8/docs/api/java/util/Calendar.Builder.html)

```
Calendar cal = new Calendar.Builder()
    .setCalendarType("iso8601")
    .setWeekDate(2013, 1, MONDAY)
    .build()
;
```

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

## Liens utiles

* [Discussion sur l'intérêt des beans couplés au design pattern Builder](https://kodelog.wordpress.com/tag/telescopic-constructor-pattern/)

* [Exemple d'utilisation dans la création de formulaire dans Symfony2 (PHP)](http://symfony.com/doc/current/book/forms.html#building-the-form)

* [Exemple d'utilisation dans la création de requête SQL (PHP)](http://doctrine-orm.readthedocs.org/projects/doctrine-orm/en/latest/reference/query-builder.html#high-level-api-methods)
