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
        assert( this.mailer != null );
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

* Une **collection vide** peut jouer le **même rôle qu'un objet null**.
* Le **vide** peut être modélisé sur des **objets mathématiques** avec des **valeurs particulières** (ex : `Double.NaN`)

## Remarques

Penser à **composer NullObject avec Singleton et ses variantes** pour limiter le nombre d'objets créés :

* `NullMailer.getInstance()`
* `Coordinate.EMPTY`

