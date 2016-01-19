# Refactoring de code

Nous allons rapidement balayer quelques points théoriques essentiels 
avant de retourner à la pratique.

Remarque : Nous traiterons principalement le refactoring "local" de code, pas la refonte 
complète d'applications ou de systèmes.

---

# Plan

* Principe
* Notion de changement cassant
* Notion de changements de comportement
* Importance des tests
* Numérotation des versions
* Gestion de l'historique
* Code public et privé (notion d'API)
* Importance des tests
* Techniques de refactoring
* Quand refactorer?

---

# Principe

Améliorer la conception d'un code existant pour :

* Le rendre plus robuste (correction de bug)
* Le rendre plus générique (réponse à de nouvelles fonctionnalités)

---

# Notion de changement cassant

Un changement cassant est une modification du code qui implique une mise à jour
du code client.

Exemple : Modification d'un prototype de fonction

On portera une attention aux changements cassants que l'on évitera 
dans la mesure du possible.

---

# Notion changements de comportement

On s'interdira tout changement de comportement en l'absence d'un changement
cassant.

Le but : Forcer la prise en compte des modifications dans les codes clients.

Remarque : On pourra procéder par extension du comportement en jouant sur des
valeurs par défaut.

---

# Numérotation des versions

Il est important de :

* Tagger/Releaser des versions stables des codes
* D'adopter une convension de nommage pour les versions

La convension généralement utilisée est <major>.<minor>.<patch> (1.2.5) où :

* <major> traduit une version majeure porteuse de changement cassant
* <minor> traduit des ajouts de fonctionnalité sans changement cassant
* <patch> traduit une correction de bug sans ajout de fonctionnalité

Les clients peuvent ainsi maîtriser les montées en version tout en récupérant
automatiquement les correctifs.

Remarque : Les bibliothèques fournissent des CHANGELOG pour accompagner le changement.

---

# Gestion de l'historique

La gestion des versions est intimement liée à la gestion de l'historique.

Il est fortement conseillé d'adopter un workflow clair dans la gestion
des branches et des tags.

(Voir [git-flow](http://jeffkreeftmeijer.com/2010/why-arent-you-using-git-flow/))


---

# Code public et privé (notion d'API)

Au sein d'une même bibliothèque, on trouvera parfois la notion de code privé et de code public (Impl, namespace detail, etc.)

Il ne faut jamais dépendre d'un tel code dans une bibliothèque tierces où on peut s'y autoriser des changements cassants non documenté.

---

# Importance des tests

Les tests unitaires et fonctionnels vont permettre de se protéger contre les
régressions.

Quand on refactor du code, le comportement des clients de ce code ne doit pas changer.

---

# Techniques de refactoring

Outre l'introduction de pattern, il existe une multitude de modification classique qui tendent à améliorer la qualité d'un code :

* Renommage de variable
* Extraction de méthode
* Extraction d'une interface
* Introduction d'un patron de conception

A l'instar des patrons de conception, ces techniques peuvent être catoguées :

[Catalogue sur refactoring.com](http://www.refactoring.com/catalog/)

Ce catalogue permet une meilleure organisation des connaissances.

---

# Quand refactorer?

Un code est rarement totalement satisfaisant, mais le luxe de pouvoir réfactorer 
un code sans but est rarement offert aux développeurs. 

Généralement, on refactorera un code à l'occasion d'actions concrètes :

* Industrialisation de prototype (travaux de recherche par ex.)
* Ajout de fonctionnalités
* Correction de bug
* Optimisation
* Portage de l'application (android, win->linux, etc.)
* ...









