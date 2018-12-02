# Null Object

## Problème

On souhaite simplifier la gestion des références nulles et ainsi éviter le risque de `NullPointerException`.

## Cas d'école

On s'appuie sur une interface `MailerInterface` pour l'envoi de mail :

```java
interface MailerInterface {

    public void sendMail(
        String to,
        String title,
        String body
    );

}
```

Dans une classe `Client`, on décide d'envoyer ou non un mail en fin de traitement à un administrateur :

```java
class Client {

    private MailerInterface mailer ;

    public Client(){
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

Problème : On multiplie les contrôles `null != this.mailer`

# Solution

* Créer un `NullMailer`

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

## Remarques

* Une collection vide peut jouer le même rôle qu'un objet null. Il est d'ailleurs conseillé
de renvoyer des listes vides plutôt que des listes nulles.

* Penser à composer NullObject et Singleton dans le cas où l'initialisation de NullObject est fréquente.
