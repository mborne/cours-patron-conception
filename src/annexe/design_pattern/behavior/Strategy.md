# Strategy

## Problème

On souhaite pouvoir faire varier dynamiquement le comportement d'une partie
d'un traitement.

## Exemple

### Cas d'école sur un traitement simple

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

On expose cette classe sous forme d'un exécutable appelé ainsi :

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

On souhaite maintenant permettre le choix sur le traitement appliqué :

```bash
traitement-image <input> <output> [method]
method := grayScale|blur
```

### Première tentative sans strategy (switch)

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

Problème :

* Ajouter un algorithme implique la mise à jour de run (Violation du principe ouvert/fermé)
* La classe Application aura tendance à devenir un objet divin
* A terme, si les algorithmes ont des paramètres spécifiques, il faudra ajouter des attributs sur la classe Application


### Deuxième tentative sans strategy (abstract)

Exploitons donc le polymorphisme!

* Classe abstraite Application

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

* Implémentation GrayScale

```java
class ApplicationGrayScale extends Application {

    private final static String NAME = "grayScale" ;

    public void process(Image image){
        // applique traitement grayScale...
    }
}
```

* Implémentation Blur

```java
class ApplicationBlur extends Application {

    private final static String NAME = "blur" ;

    public void process(Image image){
        // applique traitement blur...
    }
}
```

* ApplicationCLI

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

A première vue, on pourrait être satisfait d'une telle conception. Dommage :
On souhaite maintenant pouvoir appliquer deux traitements successifs !

Avec l'héritage, on obtient soit :
* Une explosion combinatoire (ApplicationBlur, ApplicationGrayScale, ApplicationGrayScaleBlur, ApplicationBlurGrayScale)
* Des écritures/relectures de fichiers

Qu'est-ce qu'on a raté :

* Le principe de responsabilité unique (Application effectue le calcul tout en orchestrant la lecture et les écritures).
* Privilégier la composition à l'héritage s'applique aussi pour l'encapsulation des traitements.

### Solution avec une stratégie

Au lieu d'hériter, on va encapsuler un objet dont le seul rôle se limitera à appliquer le traitement.


* ImageProcessorStrategy : Interface pour la stratégie de traitement

```java
interface ImageProcessorStrategy {
    public void process(Image image) ;
}
```

* Application encapsulant un traitement

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


* Implémentation de la stratégie GrayScale

```java
class ImageProcessorGrayScale implements ImageProcessorStrategy {

    private final static String NAME = "grayScale" ;

    public void process(Image image){
        // applique traitement grayScale...
    }

}
```

* Implémentation Blur

```java
class ImageProcessorBlur implements ImageProcessorStrategy {

    private final static String NAME = "blur" ;

    public void process(Image image){
        // applique traitement blur...
    }
}
```

* [Composite](../structural/Composite.html) sur ImageProcessorStrategy

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

* A l'utilisation

```java
File input    = new File(args[0]);
File output   = new File(args[1]);

// On imagera qu'on peut gérer le paramètre méthode sous forme d'une expression.
ImageProcessorComposite compositeStrategy = new ImageProcessorComposite();
compositeStrategy.add(new ApplicationGrayScale());
compositeStrategy.add(new ApplicationBlur());

Application application = new Application(compositeStrategy);
application.run(input,output);
```

Où est le changement? On peut appliquer le même principe sur la lecture ou l'écriture des fichiers!
