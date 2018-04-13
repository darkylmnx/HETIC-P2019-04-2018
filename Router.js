// on fait notre IIFE en passant la window en paramètre
(function (w) {

    // on définit nos routes vides
    var routes = [];

    // on définit une route 404
    var route404;

    // on définit les links
    var $links;

    w.Router = {
        on: addRoute,
        start: start,
        refreshLinks: refreshLinks
    }

    function start() {
        // on écoute si l'historique change et on gère
        w.addEventListener('popstate', matchAndHandleRoutes);
        // on établit les liens
        setLinks();
        // on essaye de matcher l'URL en cours
        matchAndHandleRoutes();

        // je return "this" pour pouvoir chainer sur le router
        // genre : Router.on(...).on(...).start()
        return this;
    }

    function setLinks() {
        // on récupère les liens
        $links = document.querySelectorAll('.router-link');

        // on converti on Array
        $links = Array.prototype.slice.call($links);
        // ou $links = Array.prototype.slice.apply($links);
        // ou $links = [].slice.apply($links);
        // ou $links = Array.apply(null, $links);
        
        $links.forEach(function($link) {
            $link.addEventListener('click', handleLinkClick);
        });
    }

    function refreshLinks() {
        // si on n'a pas ecore de lien, on ne fait rien
        if (!$links) {
            return;
        }

        // on arrête d'écouter les clicks sur les anciens liens
        $links.forEach(function($link) {
            $link.removeEventListener('click', handleLinkClick);
        });

        setLinks();
    }

    function handleLinkClick(event) {
        event.preventDefault();

        // on récupère l'URL actuel
        var currentPath = w.location.pathname;

        // ici, "this" représente l'élément en cours
        var href = this.getAttribute('href');

        // on navigue vers le href
        w.history.pushState(null, null, href);

        if (currentPath !== w.location.pathname) {
            // on essaye de matche la nouvelle URL
            // si l'URL a changé
            matchAndHandleRoutes();
        }
    }

    function matchAndHandleRoutes() {
        var hasMatched = false;
        var path = w.location.pathname;

        routes.forEach(function(route) {
            if (route.path === path) {
                hasMatched = true;
                route.handler();
            }
        });

        if (!hasMatched && typeof route404 === 'function') {
            route404();
        }
    }

    function addRoute(path, handler) {
        // on vérifie que :
        // - path est une string et qu'elle n'est pas vide
        // - handler est une fonction
        if (typeof path !== 'string') {
            throw 'PATH_NOT_STRING';
        } else if (path.length < 1) {
            throw 'PATH_EMPTY';
        } else if (typeof handler !== 'function') {
            throw 'HANLER_NOT_FUNC';
        }

        // si notre route est une "catch all"
        // on enregistre juste la fonction en 404
        if (path === '*') {
            route404 = handler;
        } else {
            // si on n'a pas de slash, on ajoute
            if (path[0] !== '/') {
                path = '/' + path;
            }

            // tout est bon on peut push
            routes.push({
                path: path,
                handler: handler
            });
        }

        // je return "this" pour pouvoir chainer sur le router
        // genre : Router.on(...).on(...).start()
        return this;
    }

    
})(window);
