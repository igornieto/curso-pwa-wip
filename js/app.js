// Registro del SW
var url = window.location.href;
var swLocation = '/curso-pwa-wip/sw.js';


if ( navigator.serviceWorker ) {


    if ( url.includes('localhost') ) {
        swLocation = '/sw.js';
    }


    navigator.serviceWorker.register( swLocation );
}