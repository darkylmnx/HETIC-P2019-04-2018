# Ajouter des fonctions aux objets natifs

---

Ajouter des "methods" (fonctions) aux objets natifs peut être intéressant pour 2 raisons : 
- Comprendre comment les objets natif fonctionnent
- Créer des polyfills

## Comment fait-on ?

Chaque objet natif a un **prototype**, c'est le prototype qui permet aux objets d'hériter de choses. Il suffit donc de se plugger dessus.

Disons que l'on veut sur l'objet string une fonction qui permet de répéter la chaîne.

```javascript
if (typeof String.prototype.repeat !== 'function') {
    String.prototype.repeat = function(nb) {
        var str = '';

        for (var i = 0; i < nb; i++) {
            // ici, "this" représente toute la chaîne de caractères
            str += this;
        }

        return str;
    }
}

alert( 'Ariel! '.repeat(3) );
// ceci va afficher à l'écran "Ariel! Ariel! Ariel! "
```