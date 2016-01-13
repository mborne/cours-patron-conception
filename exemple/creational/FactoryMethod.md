# FactoryMethod

## Problème

On dispose d'une classe abstraite et on souhaite faire abstraction sur la création
des objets concrets.

<div style="text-align: center">
![UML Prototype](uml/UML_DP_FactoryMethod.png)
</div>


## Exemple

* Connection à une base de données

```
interface Connection {

}
```

```
class PostgregsqlConnection implements Connection {

}
```

* Fabrique abstraite pour les connexions

```
interface ConnectionFactory {
    public Connection createConnection(String dbname) ;
}
```

```
class PostgregsqlConnectionFactory implements ConnectionFactory {
    public Connection createConnection(String dbname) {
        return new PostgregsqlConnection(dbname);
    }
}
```
