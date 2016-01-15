# Strategy

## Problème

On souhaite pouvoir faire varier dynamiquement le comportement d'une partie
d'un traitement.

## Exemple

### Cas d'école sur un traitement simple

Prenons le cas d'une classe de traitement qui applique les trois étapes suivantes :

* Charger une image PNG
* Passer l'image en niveau de gris
* Stocker l'image résultante

```
class Traitement {

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

```
traitement-image input.png output.png
```

```
class TraitementCLI {

    public static void main(String args[]){
        File input  = new File(args[0]);
        File output = new File(args[1]);
        Traitement traitement = new Traitement();
        traitement.run(input,output);
    }

}
```

On souhaite maintenant permettre le choix sur le traitement appliqué :

```
traitement-image <input> <output> [method]
method := grayScale|blur
```

### Première tentative sans strategy (switch)

```
class Traitement {

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

* Ajouter un algorithme implique la mise à jour de run
* La classe traitement aura tendance à devenir un objet divin
* A terme, si les algorithmes ont des paramètres spécifiques, il faudra ajouter des attributs sur la classe Traitement


### Deuxième tentative sans strategy (abstract)

Exploitons donc le polymorphisme!

* Classe abstraite Traitement

```
abstract class Traitement {

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

```
class TraitementGrayScale extends Traitement {

    private final static String NAME = "grayScale" ;

    public void process(Image image){
        // applique traitement grayScale...
    }
}
```

* Implémentation Blur

```
class TraitementBlur extends Traitement {

    private final static String NAME = "blur" ;

    public void process(Image image){
        // applique traitement blur...
    }
}
```

* TraitementCLI

```
class TraitementCLI {

    public static void main(String args[]){
        File input    = new File(args[0]);
        File output   = new File(args[1]);    
        String method = args[2] ;

        Map<String, Traitement> traitements = new HashMap<String, Traitement>();
        traitements.put(TraitementGrayScale.NAME, new TraitementGrayScale());
        traitements.put(TraitementBlur.NAME, new TraitementBlur());

        Traitement traitement = traitements.get(method);
        traitement.run(input,output);
    }

}
```

A première vue, on pourrait être satisfait d'une telle conception. Dommage :
On souhaite maintenant pouvoir appliquer deux traitements successifs !

Avec l'héritage, on obtient soit :
* Une explosion combinatoire (TraitementBlur, TraitementGrayScale, TraitementGrayScaleBlur, TraitementBlurGrayScale)
* Des écritures/relectures de fichiers

Qu'est-ce qu'on a raté :

* Privilégier la composition à l'héritage s'applique aussi pour l'ensulation des traitements
* Principe de responsabilité unique (Traitement effectue le calcul tout en orchestrant la lecture et les écritures)


### Solution avec une stratégie

Au lieu d'hériter, on va encapsuler un objet dont le seul rôle se limitera à appliquer la méthode


```
class Traitement {

    private ImageProcessorStrategy processor ;

    public Traitement(ImageProcessorStrategy processor){
        this.method = method ;
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

* ImageProcessorStrategy : Interface pour la stratégie de traitement

```
interface ImageProcessorStrategy {
    public void process(Image image) ;
}
```

* Implémentation de la stratégie GrayScale

```
class ImageProcessorGrayScale implements ImageProcessorStrategy {

    private final static String NAME = "grayScale" ;

    public void process(Image image){
        // applique traitement grayScale...
    }

}
```

* Implémentation Blur

```
class ImageProcessorBlur implements ImageProcessorStrategy {

    private final static String NAME = "blur" ;

    public void process(Image image){
        // applique traitement blur...
    }
}
```

* Composition de stratégies

```
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

```
File input    = new File(args[0]);
File output   = new File(args[1]);    

ImageProcessorComposite compositeStrategy = new ImageProcessorComposite();
compositeStrategy.add(new TraitementGrayScale());
compositeStrategy.add(new TraitementBlur());

Traitement traitement = new Traitement(compositeStrategy);
traitement.run(input,output);
```

Où est le changement? On peut appliquer le même principe sur la lecture ou l'écriture des fichiers!
