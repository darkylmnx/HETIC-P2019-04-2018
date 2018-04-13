# Closure et IIFE

## Closure

Une closure est une fonction enfant ayant accès à au moins une variable de sa fonction parente quand celle-ci est exécutée.

Les closures sont en général créées, pour régler les problèmes liés aux scopes globaux.

```javascript
$btns = docment.querySelectorAll('button');

for (var i = 0; i < $btns.length; i++) {
    $btns[i].addEventListener('click', function() {
        alert(i);
    });
}

// ici, nous allons avoir un souci, comme la boucle se termine assez vite
// au moment où l'utilisateur cliquera sur n'importe quel bouton
// "i" vaudra déjà la dernière itération de la boucle, donc chaque bouton
// a un "i" faussé, une closure peut règler ça

function makeClik(index) {
    
    return function() {
        alert(index);
    }
}
// ceci est une closure car le parent "makeClick" permet l'accès
// de son paramètre "index" à son enfant, qui lui est renvoyé comme valeur

for (var i = 0; i < $btns.length; i++) {
    $btns[i].addEventListener('click', makeClik(i));
    // imaginez que cette ligne se transform en :
    /*
        $btns[i].addEventListener('click', function() {
            alert(index);
        });

        où "index" fait référence au "i" passé pendant l'exécution de la fonction parent
    */
}

```

---

## IIFE

Une IIFE (immidiately invoked function expression), est juste une fonction (anunyme souvent) qui s'auto-exécute.

```javascript
// au lieu de définir et exécuter soi-même la fonctio

function init() {}
init();

(function(w) {

    // on crée une fonction expression qui peut s'exécuter toute seule
    // (grâce aux parenthèses)
    // on peut aussi passer des variables du coup

})(window);

```

### À quoi ça sert ?

Cela sert à isoler des variables en local pour qu'elles ne soient pas en conflit avec des variables globales.

C'est typiquement parfait pour créer sa propre libairie, fw ou tout autre code partageable avec d'autres.