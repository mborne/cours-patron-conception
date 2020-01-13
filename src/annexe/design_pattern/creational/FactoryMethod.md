# FactoryMethod

## Problème

On dispose d'une classe abstraite et on souhaite faire abstraction sur la création
des objets concrets.

![UML Prototype](uml/UML_DP_FactoryMethod.png)

## Exemple

* Connexion à une base de données

```java
interface Connection {

}
```

```java
class PostgregsqlConnection implements Connection {

}
```

* Fabrique abstraite pour les connexions

```java
interface ConnectionFactory {
    public Connection createConnection(String dbname) ;
}
```

```java
class PostgregsqlConnectionFactory implements ConnectionFactory {
    public Connection createConnection(String dbname) {
        return new PostgregsqlConnection(dbname);
    }
}
```
