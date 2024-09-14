# Couplage de Fluent Interface et Builder

Il convient de souligner que **Builder** et **Fluent Interface** sont différents mais qu'ils peuvent être utilisés conjointement.

## Cas d'école

Nous avons des personnes modélisées par un nom (`name`) et une adresse (`address`). Nous souhaitons géocoder ces adresses à la construction pour renseigner les coordonnées correspondant à l'adresse (`longitude`, `latitude`).

## Solution

Nous pouvons par exemple procéder comme suit :

* Encapsuler l'appel au [service d'autocomplétion de la GéoPlateforme](https://geoservices.ign.fr/documentation/services/services-geoplateforme/autocompletion) dans une classe Geocoder :

```ts
/**
 * Service de géocodage convertissant une adresse en longitude, latitude
 */
class Geocoder {

    async geocode(address: string): Promise<[number, number]> {
        const url = 'https://data.geopf.fr/geocodage/completion?' + new URLSearchParams({
            text: address,
            maximumResponses: "1"
        }).toString();

        const body = await fetch(url).then(res => res.json());
        if ( body.results.length > 0 ){
            return [
                body.results[0].x,
                body.results[0].y
            ]
        }else{
            return [
                Number.NaN,
                Number.NaN
            ]
        }
    }
}
```

* Définir une **classe Person de modélisant les données** :

```ts
interface Person {
    name: string;
    address: string;
    longitude: number;
    latitude: number;
}
```

* Définir une **classe Builder respectant l'approche Fluent Interface** pour encapsuler l'appel à la fonctionnalité de géocodage :

```ts
/**
 * Construction d'une personne avec géocodage de l'adresse.
 */
class PersonBuilder {
    private name: string;
    private address: string;

    setName(name: string): this {
        this.name = name;
        return this;
    }

    setAddress(address: string): this {
        this.address = address;
        return this;
    }

    async build(): Promise<Person> {
        const geocoder = new Geocoder();
        const coordinates = await geocoder.geocode(this.address);

        const person: Person = {
            name: this.name,
            address: this.address,
            longitude: coordinates[0],
            latitude: coordinates[1]
        };

        return person;
    }

}
```

A l'utilisation, nous constatons que **fluent interface** rend le code plus lisible quand **builder** permet de **découpler la logique de construction et la modélisation des données** :

```ts
async function main(){

    const person = await new PersonBuilder()
        .setName("John Doe")
        .setAddress("73 Av. de Paris, 94160 Saint-Mandé")
        .build()
    ;
    // {"name":"John Doe","address":"73 Av. de Paris, 94160 Saint-Mandé","longitude":2.424573,"latitude":48.845726}
    console.log(JSON.stringify(person));
}

main();
```