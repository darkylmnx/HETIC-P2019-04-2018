# Emitter Pattern

Voici le pattern **Emitter**, qui est pour faire simple, un système de gestion d'événement personnalisé pour n'importe quelle app.

Ici, on retrouve le Emitter pattern dans une implémentation basique, pour voir dans une implémentation complexe, voir le router.

L'Emitter à 3 principes :

- Une liste (events)
- Un déclencheur (trigger)
- Un écouteur (add)


```javascript
// à la création de l'instance on crée un tableau
function Emitter() {
    this.events = [];
    return this;
}

// on permet l'ajout d'un événement
Emitter.prototype.add = function(name, handler) {
    this.events.push({
        name: name,
        handler: handler
    });

    return this;
};

// on permet la suppression d'un événement
Emitter.prototype.remove = function(name) {
    this.events = this.events.filter(function(obj) {
        return obj.name !== name;
    });

    return this;
};

// on permet de déclencher un événement
Emitter.prototype.trigger = function(name) {
    this.events.forEach(function(obj) {
        obj.name === name && obj.handler();
    });

    return this;
};
```