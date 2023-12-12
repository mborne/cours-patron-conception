# Strategy

[[toc]]

## Problème

Nous souhaitons pouvoir **faire varier dynamiquement le comportement d'une partie d'un traitement**.

## Cas d'école

Prenons le cas d'une application qui applique les trois étapes suivantes :

* Charger une image PNG
* Passer l'image en niveau de gris
* Stocker l'image résultante

```java
class Application {

    public void run(File input, File output){
        Image image = readImagePNG(input);
        grayScale(image) ;
        writeImagePNG(image,output)
    }

    protected void grayScale(Image image){
        // Transforme en niveau de gris
    }

    protected Image readImagePNG(File input){
        // Chargement de l'image PNG
    }

    protected Image writeImagePNG(File output, Image image){
        // Sauvegarde de l'image PNG
    }
}
```

Nous exposons cette classe sous forme d'un exécutable appelé ainsi :

```bash
traitement-image input.png output.png
```

```java
class ApplicationCLI {

    public static void main(String args[]){
        File input  = new File(args[0]);
        File output = new File(args[1]);
        Application application = new Application();
        application.run(input,output);
    }

}
```

Nous souhaitons maintenant permettre le choix sur le traitement appliqué :

```bash
traitement-image <input> <output> [method]
method := grayScale|blur
```

## Tentons différentes approches...

### Pouvons nous nous appuyer sur un switch?

```java
class Application {

    public void run(File input, File output, String method){
        Image image = readImagePNG(input);
        if ( method.equals("grayScale") ){
            grayScale(image) ;
        }else if ( method.equals("blur") ){
            blur(image) ;
        }
        writeImagePNG(image,output);
    }

    protected void grayScale(Image image){
        // Applique un grayScale sur l'image
    }

    protected void blur(Image image){
        // Applique un blur sur l'image
    }

    protected Image readImagePNG(File input){
        // Chargement de l'image PNG
    }

    protected Image writeImagePNG(File output, Image image){
        // Sauvegarde de l'image PNG
    }
}
```

**Problèmes :**

* Ajouter un algorithme implique la mise à jour de run (Violation du principe ouvert/fermé)
* La classe `Application` aura tendance à devenir un **objet divin**
* A terme, si les algorithmes ont des paramètres spécifiques, il faudra ajouter des attributs sur la classe `Application`


### Pouvons nous exploiter le polymorphisme?

Nous pourrions nous inspirer du patron **template methode** en procédant comme suit avec :

* Une classe abstraite `Application`

```java
abstract class Application {

    public void run(File input, File output){
        Image image = readImagePNG(input);
        process(image);
        writeImagePNG(image,output);
    }

    public abstract void process(Image image) ;

    public Image readImagePNG(File input){
        // Chargement de l'image PNG
    }

    public Image writeImagePNG(File output, Image image){
        // Sauvegarde de l'image PNG
    }
}
```

* Un implémentation de `Application` pour le niveau de gris :

```java
class ApplicationGrayScale extends Application {

    private final static String NAME = "grayScale" ;

    public void process(Image image){
        // applique traitement grayScale...
    }
}
```

* Une implémentation de `Application` pour le niveau de gris :

```java
class ApplicationBlur extends Application {

    private final static String NAME = "blur" ;

    public void process(Image image){
        // applique traitement blur...
    }
}
```

* Une classe `ApplicationCLI` pour sélectionner la méthode :

```java
class ApplicationCLI {

    public static void main(String args[]){
        File input    = new File(args[0]);
        File output   = new File(args[1]);
        String method = args[2] ;

        Map<String, Application> applications = new HashMap<String, Application>();
        applications.put(ApplicationGrayScale.NAME, new ApplicationGrayScale());
        applications.put(ApplicationBlur.NAME, new ApplicationBlur());

        Application application = applications.get(method);
        application.run(input,output);
    }

}
```

A première vue, nous pourrions être satisfait d'une telle conception...

**Problème : Que se passe-t'il si nous souhaitons maintenant pouvoir appliquer deux traitements successifs?**

Nous avons soit :

* Une **explosion combinatoire** (`ApplicationBlur`, `ApplicationGrayScale`, `ApplicationGrayScaleBlur`, `ApplicationBlurGrayScale`)
* Des écritures/relectures multiples de fichiers

Le problème de fond réside dans le fait que **nous ne respectons pas plusieurs principes de conception** :

* Le **principe de responsabilité unique** (Application assure le calcul ainsi que l'orchestration de la lecture et les écritures des fichiers).
* **Privilégier la composition à l'héritage s'applique aussi pour l'encapsulation des traitements**.

## Solution

Avec Strategy, au lieu d'hériter pour faire varier le comportement, nous allons **encapsuler le traitement dans un objet dont le seul rôle se limitera à appliquer le traitement**.

Nous aurons par exemple :

* Une interface `ImageProcessorStrategy` correspondant à la stratégie :

```java
interface ImageProcessorStrategy {
    public void process(Image image) ;
}
```

* Une `Application` appelant ce traitement :

```java
class Application {

    private ImageProcessorStrategy processor ;

    public Application(ImageProcessorStrategy processor){
        this.processor = processor ;
    }

    public void run(File input, File output){
        Image image = readImagePNG(input);
        processor.process(image);
        writeImagePNG(image,output);
    }

    public Image readImagePNG(File input){
        // Chargement de l'image PNG
    }

    public Image writeImagePNG(File output, Image image){
        // Sauvegarde de l'image PNG
    }
}
```

Pour l'implémentation des traitements, nous aurons :

* Une implémentation pour le passage en niveau de gris :

```java
class ImageProcessorGrayScale implements ImageProcessorStrategy {

    private final static String NAME = "grayScale" ;

    public void process(Image image){
        // applique traitement grayScale...
    }

}
```

* Une implémentation pour le flou :

```java
class ImageProcessorBlur implements ImageProcessorStrategy {

    private final static String NAME = "blur" ;

    public void process(Image image){
        // applique traitement blur...
    }
}
```

Pour enchaîner les traitements, nous utiliserons conjointement les patrons **Strategy** et [Composite](../structural/Composite.md) :

```java
class ImageProcessorComposite implements ImageProcessorStrategy {

    private List<ImageProcessorStrategy> strategies ;

    public ImageProcessorComposite(){
        this.strategies = new ArrayList<ImageProcessorStrategy>();
    }

    public void add(ImageProcessorStrategy strategy){
        this.strategies.add(strategy) ;
    }

    public void process(Image image){
        // applique les sous-stratégies
        for ( ImageProcessorStrategy strategy : strategies ){
            strategy.process(image);
        }
    }

}
```

A l'utilisation, nous aurons la possibilité de procéder comme suit :

```java
File input    = new File(args[0]);
File output   = new File(args[1]);

// TODO : remplacer les lignes suivantes par un parser d'expression
ImageProcessorComposite compositeStrategy = new ImageProcessorComposite();
compositeStrategy.add(new ApplicationGrayScale());
compositeStrategy.add(new ApplicationBlur());

Application application = new Application(compositeStrategy);
application.run(input,output);
```

Il nous restera simplement à 

* Écrire le parseur d'expression correspondant au TODO
* Appliquer le même principe sur la lecture ou l'écriture des fichiers (`ImageReader`, `ImageWriter`) si nous voulons supporter plusieurs formats
