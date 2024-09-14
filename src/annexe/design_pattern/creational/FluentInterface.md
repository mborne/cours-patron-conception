# Fluent Interface

## Problème

Nous souhaitons simplifier la construction d'objets complexes induisant des codes du style suivant :

```ts
const person = new Person();
person.setName("John Doe");
person.setAddress("73 Av. de Paris, 94160 Saint-Mandé");
```

Nous remarquons que nous multiplions les appels à `person.` et que le patron de conception [Builder](Builder.md) ne nous permettrait pas de simplifier le code.


## Solution

Nous pouvons **renvoyer l'objet courant dans les setters pour permettre le chaînage des appels** :

```ts
class Person {
    name: string;
    address: string;

    setName(name: string): this {
        this.name = name;

        return this; // Renvoie l'objet courant
    }

    setAddress(address: string): this {
        this.address = address;

        return this; // Renvoie l'objet courant
    }

}
```

Nous obtenons ainsi un code plus lisible :

```ts
const person = new Person()
    .setName("John Doe")
    .setAddress("73 Av. de Paris, 94160 Saint-Mandé")
;
// {"name":"John Doe","address":"73 Av. de Paris, 94160 Saint-Mandé"}
console.log(JSON.stringify(person));
```
