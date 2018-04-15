# Scope et Contexte

## Scope

En JavaScript, on appelle **scope** la zone où une variable / fonction est restreinte, et donc, où elle existe.

Chaque scope est déterminé par la fonction parent la plus proche.

```javascript
grandPa();
console.log(a); 
// ceci donnera une erreur car "a" n'existe pas dans le scope global

function grandPa() {
    var a = '1';
    father();
    console.log(a);
    // ici "a" vaut "1"


    function father() {
        var a = '2';
        son();
        console.log(a);
        // ici "a" vaut "2"

        function son() {
            var a = '3';
            // ici "a" vaudra toujours "3"
        }
    }
}
```

- Une fonction enfant a accès aux variables de toute son ascendance
- Une fonction parent n'a pas accès aux variables de sa descendance

---

## Contexte

On parle de **contexte** quand une fonction est  exécutée. Chaque fonction a accès au mot-clé **this**. Ce mot peut représenter plusieurs choses en fonction de son contexte d'éxecution.

Dans chaque fonction qui n'appartiens pas à un objet (donc "method" exclus), **this** représente l'objet **window**, sauf que le contexte de la fonction est changé volontairement.

```javascript
var woman = {
    firstname: 'Hinata',
    child: {
        firstname: 'Boruto',
        hello: function() {
            alert(this.firstname)
        }
    }
};

woman.child.hello();
// ceci affichera "Boruto" car la "method" "hello()", est 
// exécutée sur le contexte de l'objet woman.child, donc son "this" vaut "woman.child"

var singleHello = woman.child.hello;
// maintenant "singleHello" contient la valeur de "woman.child.hello", donc, une fonction

singleHello();
// ceci affichera "undefined" car "singleHello()" est exécutée sans contexte,
// donc son "this" c'est l'objet window. Sur l'objet window on n'a pas de propriété "firstname"
```

À noter : même quand vous êtes dans une fonction enfant / sous fonction, si une fonction est  exécutée sans contexte, son "this" c'est l'objet window

### Changer de contexte

En JS, même les fonctions sont des objets, donc les fonctions ont aussi leurs "methods".
Pour changer le contexte, il existe deux "methods" : "call()" et "apply()" à executer en passant le bon contexte.

```javascript
var woman = {
    firstname: 'Hinata',
    child: {
        firstname: 'Boruto',
        hello: function() {
            alert(this.firstname)
        }
    }
};

var singleHello = woman.child.hello;
singleHello.call(woman.child);
// ou
singleHello.apply(woman.child);

// si on a besoin de passer des paramètres à notre fonction "singleHello" :

// call : paramètres illimitées
singleHello.call(woman.child, param1, param2, ...);

// apply : un tableau de paramètres
singleHello.apply(woman.child, [param1, param2, ...]);

// Il existe une methode qui consiste à changer le contexte pour toujours
singleHello = singleHello.bind(woman.child);
// "bind()" permet de générer une nouvelle fonction avec un contexte fixé à la main
```
