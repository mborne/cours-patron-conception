# Null Object

## Problème

Nous souhaitons simplifier la gestion des références nulles pour éviter le risque de `NullPointerException`.

## Cas d'école

Nous avons l'interface `MailerInterface` ci-après permettant d'envoyer des courriels :

```java
interface MailerInterface {

    public void sendMail(
        String to,
        String title,
        String body
    );

}
```

Nous souhaitons **rendre optionnel l'envoi de ces courriels** en fin de traitement. En première approche, nous pourrions procéder comme suit :

```java
class MonTraitement {

    private MailerInterface mailer ;

    public MonTraitement(){
        this.mailer = null ;
    }

    public void setMailer(MailerInterface mailer){
        this.mailer = mailer ;
    }

    public void doSomething(){
        //... traitement ...

        if ( null != this.mailer ){
            this.mailer.sendMail(
                "admin@acme.org",
                "Traitement des donnnées",
                "Le traitement a été effectué."
            );
        }
    }

}
```

**Problème** : Nous allons multiplier les contrôles `null != this.mailer` et finir par oublier un cas.

# Solution

* Créer un `NullMailer` ne faisant rien comme suit :

```java
class NullMailer implements MailerInterface {
    public void sendMail(
        String to,
        String title,
        String body
    ){
        // ne fait rien
    }
}
```

* Initialiser `mailer` avec un `NullMailer` plutôt que `null`


```java
class Client {

    private MailerInterface mailer ;

    public Client(){
        this.mailer = new NullMailer() ;
    }

    public void setMailer(MailerInterface mailer){
        assert( mailer != null );
        this.mailer = mailer ;
    }

    public void doSomething(){
        // traitement...

        // Le contrôle sur this.mailer != null devient innutile
        this.mailer.sendMail(
            "admin@acme.org",
            "Traitement des donnnées",
            "Le traitement a été effectué."
        );
    }

}
```

## Variantes

Nous soulignerons que :

* Une **collection vide** peut jouer le **même rôle qu'un objet null** (`this.points=null` -> `this.points=[]`)
* Des **valeurs particulières** peuvent être utilisées pour modéliser un **objet mathématique vide** jouant le **même rôle qu'un objet null** :
  * `{x: Number.NaN, y: Number.NaN}` pour une coordonnée 2D vide
  * `{lower: Number.POSITIVE_INFINITY, upper: Number.NEGATIVE_INFINITY}` pour un interval vide
  * ...

Penser à **composer NullObject avec Singleton et ses variantes** pour limiter le nombre d'objets créés :

* `NullMailer.getInstance()`
* `Coordinate.EMPTY`

