# Refactoring de code

Nous allons rapidement balayer quelques points théoriques essentiels avant de retourner à la pratique.

Bien que certains concepts soient les mêmes, nous traiterons principalement le refactoring "local" de code, pas la refonte complète d'applications ou de systèmes.

---

## Plan

* Principe
* Notion de changement cassant
* Notion de changement de comportement
* Importance des tests
* Numérotation des versions
* Accompagnement du changement
* Gestion de l'historique
* Code public et privé (notion d'API)
* Importance des tests
* Techniques de refactoring
* Quand refactorer?
* Quels outils?

---

## Principe du refactoring

Améliorer la conception d'un code existant pour :

* Le rendre plus robuste (correction de bug)
* Le rendre plus générique (réponse à de nouvelles fonctionnalités)

---

## Notion de changement cassant

Un **changement cassant** est une modification du code qui **implique une mise à jour du code client**.

Exemple : Modification d'un prototype de fonction

Nous porterons une attention particulière aux changements cassants **à éviter dans la mesure du possible**.

---

## Notion changements de comportement

**Nous nous interdirons tout changement de comportement en l'absence d'un changement cassant.**

Le but : Forcer la prise en compte des modifications dans les codes clients.

---

## Numérotation des versions

Il sera important de :

* Tagger/Releaser des versions stables des codes
* D'adopter une convention de nommage pour les versions

La convention généralement utilisée est `<major>.<minor>.<patch>` (exemple : "1.2.5") où :

* L'incrémentation de `<major>` traduit une version majeure porteuse de changement cassant
* `<minor>` traduit des ajouts de fonctionnalités sans changement cassant
* `<patch>` traduit une correction de bug sans ajout de fonctionnalité

Elle est connue sous le nom de [gestion sémantique de version](https://semver.org/lang/fr/) et permet aux clients de **maîtriser les montées en version tout en récupérant automatiquement les correctifs**.


---

## Accompagnement du changement

Plusieurs dispositifs d'accompagnement sont envisageables et fréquents :

* Les fichiers **CHANGELOG** décrivent les changements et adaptation à réaliser.
* Les **fonctionnalités qui vont être supprimées** peuvent être **marquées comme dépréciées** dans des versions intermédiaires.
* Des **versions dédiées aux changements majeurs** peuvent être développées

> Par exemple, une version 2.8 peut apporter les nouveautés de la version 3.0 et marquer comme dépréciées les fonctionnalités qui seront supprimées dans la version 3.0 (bonne pratique respectée par le framework PHP Symfony)

---

## Gestion de l'historique

La **gestion des versions** est intimement liée à la **gestion de l'historique**. Il est fortement conseillé d'adopter un **workflow clair dans la gestion des branches et des tags**.

Voir :

* [A successful Git branching model, Vincent Driessen](http://nvie.com/posts/a-successful-git-branching-model/)
* [git-flow](http://jeffkreeftmeijer.com/2010/why-arent-you-using-git-flow/)


---

## Code public et privé (notion d'API)

Il est difficile d'éviter les changements cassants sur toutes les classes d'une bibliothèque.

A ce titre, au sein d'une même bibliothèque, nous trouvons parfois la notion de **code public** et de **code privé** (suffixe `Impl`, namespace `detail`, package `internal`, etc.)

Il faudra **éviter de dépendre du code privé d'une bibliothèque tierces** pour ne pas subir des changements non documentés.

---

## Importance des tests

En cas de refactoring de code, le comportement des clients de ce code ne doit pas changer.

**Les tests unitaires et fonctionnels permettront d'éviter des régressions.**

---

## Techniques de refactoring

Outre l'introduction de patron de conception (1), il existe une multitude de modifications classiques qui tendent à améliorer la qualité d'un code.

A l'instar des patrons de conception, **ces techniques peuvent être cataloguées**. Nous verrons quelques exemple sur [refactoring.com - Catalogue](http://www.refactoring.com/catalog/) :

* [Renommage d'une variable](https://www.refactoring.com/catalog/renameVariable.html)
* [Suppression d'un setter](https://www.refactoring.com/catalog/removeSettingMethod.html)
* [Extraction d'une méthode](https://www.refactoring.com/catalog/extractFunction.html)
* ...

> (1) Par exemple, introduire une fabrique pour éviter de répéter du code.

---

## Quand réfactorer?

Un code est rarement totalement satisfaisant, mais le luxe de pouvoir réfactorer un code sans but est rarement offert aux développeurs.

Généralement, nous profiterons d'occasions concrètes pour améliorer le code :

* Industrialisation de prototype (travaux de recherche par ex.)
* Ajout de fonctionnalités à l'occasion d'une nouvelle version
* Correction de bug
* Optimisation
* Portage de l'application (android, win->linux, etc.)
* ...

---

## Quels outils?

Plusieurs familles d'outils peuvent aider à maintenir ou améliorer la qualité d'un code :

* Les outils de **mise en forme automatique du code**
* Les outils d'**analyse statiques de code** (ex : SonarQube)
* Les outils de **génération de couverture par les tests** (ex : [nyc](https://github.com/istanbuljs/nyc#readme))
* Les outils d'**intégration continue** (ex : GitLab-CI, GitHub actions, jenkins, etc.)
* ...


