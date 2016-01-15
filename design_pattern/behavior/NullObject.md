# Null Object

## Problème : NullPointerException

Pour simplifier et sécuriser les codes, on souhaite simplifier la gestion
des références nulles.


## Problème

On s'appuie sur une interface pour l'envoi de mail :

```
interface MailerInterface {

    public void sendMail(
        String to,
        String title,
        String body
    );

}
```

On laisse le choix à l'utilisateur d'une classe "Client" d'envoyer ou non un
mail en fin de traitement à un administrateur :

```
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

Problème : On multiplie les contrôles ```null != this.mailer```

# Solution

* Créer un NullMailer

```
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

* Faire à un NullMailer plutôt que "null"



```
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

        // contrôle innutile
        this.mailer.sendMail(
            "admin@acme.org",
            "Traitement des donnnées",
            "Le traitement a été effectué."
        );
    }

}
```


## Remarque

Penser à composer NullObject et Singleton dans le cas où l'initialisation
de NullObject est fréquente.


## Variante

* Une collection vide peut jouer le même rôle qu'un objet null. Il est d'ailleurs conseillé
de renvoyer des listes vides plutôt que des listes nulles.

* Une valeur par défaut est préférable à un traitement spécifique en son absence.
