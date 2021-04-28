window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {
}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.post['Content-Type'] ='application/json';
window.axios.defaults.headers.common['Access-Control-Allow-Origin'] ='*';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'
////////////////////////////////////////////
// Pusher = require('pusher-js');
//
// Pusher.logToConsole = true;
//
// var pusher = new Pusher('2a2e1819ad82168173d0', {
//     cluster: 'us2'
// });
//
// var channel = pusher.subscribe('my-channel');
// channel.bind('my-event', function(data) {
//     if(data == 'enviar'){
//         notify()
//     }
// });
//
//
// function notify(){
//     console.log('empezando a notificar');
//     axios.get('http://localhost:8000/api/v1/app/online-doctors').then((data) =>{
//         console.log(data);
//     })
//     console.log('terminando a notificar');
// }
/////////////////////////////////////////

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });

// try {
//     window.Toast = require('toastr/toastr.js').default;
//     window.Toast.options = {
//         "closeButton": true,
//         "debug": false,
//         "newestOnTop": true,
//         "progressBar": false,
//         "positionClass": "toast-bottom-right",
//         "preventDuplicates": false,
//         "onclick": null,
//         "showDuration": "300",
//         "hideDuration": "1000",
//         "timeOut": "5000",
//         "extendedTimeOut": "1000",
//         "showEasing": "swing",
//         "hideEasing": "linear",
//         "showMethod": "fadeIn",
//         "hideMethod": "fadeOut"
//     }
//     require('bootstrap');
// } catch (e) {}


//PUSHER
// import Echo from "laravel-echo"
//
// window.Pusher = require('pusher-js');
//
// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: '2a2e1819ad82168173d0',
//     cluster: 'us2',
//     forceTLS: true,
//     auth: {
//         headers: {
//             Authorization: 'Bearer ' + 'api_token'
//         },
//     },
// });

//
// Pusher.logToConsole = true;
//
// window.Echo.join('online-doctors')
//     .here((users) => {
//         console.log('here', users);
//     })
//     .joining((user) => {
//         console.log('joining', user);
//     })
//     .leaving((user) => {
//         console.log('leaving', user);
//     })
//     .listen('App\\Events\\DoctorOnline', (e) => {
//         console.log(e);
//     });

// window.Echo.join('online-doctors')
//     .listen('DoctorOnline', (e) => {
//         console.log(e);
//     });

