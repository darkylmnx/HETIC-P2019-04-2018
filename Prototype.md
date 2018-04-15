# Prototype

## Les functions d'instance
Tout d'abord, il faut savoir qu'une fonction en JavaScript, peut servir de fonction classique ou de **constructor** (constructeur) pour créer une instance  (un objet).

```javascript
function Game() { }

Game(); 
// -> fonction normal
// le "this" : représente la window
// le return : renvoie undefined (dans le cas présent)

new Game();
// -> fonction d'instance
// le "this" : représente l'instance, l'objet créé
// le return : renvoie l'instance, l'objet crée
```
Pour comprendre les histoires de "this" (contexte), [lisez-ça](ScopeAndContext.md).

## Qu'est-ce que le prototype alors ? Héritage

Le JavaScript est un langage totalement objet, néanmoins, c'est juste ce que l'on dit pour simplifier.

En fait, le JS est un langage prototypal, c'est à dire : basé sur les prototypes.

Un **prototype** est un **objet parent** sur lequel un **objet enfant** va chercher une proriété ou une method, s'il ne la trouve pas sur **sa propre instance**.

Tous les objets JS ont comme plus vieux ancêtre le prototype "Object" et peuvnet hériter d'autres objets en **prototype**.

Alors dans le détail :

```javascript
function Pere(name, adn) {
    this.name = name;
    this.adn = adn;
}

Pere.prototype.getAdn = function() {
    return this.adn;
};
// OU : vous pouvez assigner un objet directement sur "prototype"


function Fille(name) {
    this.name = name;
}

// on lui file comme prototype un instance de "Pere"
Fille.prototype = new Pere('Zeus', 'Dieu grec');

var athena = new Fille('Déesse Athena');
console.log(athena);
// -> renvoie une instance de Fille
console.log(athena.name);
// -> renvoie 'Athena', car l'instance de Fille a bien un "name"
console.log(athena.getAdn());
// -> renvoie 'Dieu grec', car :
// le JS a cherché sur l'instance de Fille et n'a rien trouvé
// Il a ensuite été regarder dans le prototype de Fille
// Il a trouvé un instance de "Pere"
// L'instance de père à un name, donc il l'a pris
console.log(athena.toto);
// -> renvoie undefined, car ni l'instance, 
// ni aucun de ses prototypes acêtre n'a la propriété "toto"
```

Ce principe s'appelle la chaîne de prototype (le fait que chaque objet remonte l'ascendance pour trouver une info)
![image](https://user-images.githubusercontent.com/1426357/38781730-0f956dec-40ea-11e8-9e17-bafcb6bdcbde.png)

## Pour aller plus loin sur les objets et les fonctions
- https://www.grafikart.fr/formations/debuter-javascript/prototype
- https://www.w3schools.com/js/js_function_definition.asp
- https://developer.mozilla.org/fr/docs/Web/JavaScript/H%C3%A9ritage_et_cha%C3%AEne_de_prototypes
