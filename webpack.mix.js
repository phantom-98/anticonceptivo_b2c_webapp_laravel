const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix.js('resources/js/app.js', 'public/js')
//     .postCss('resources/css/app.css', 'public/css', [
//         //
//     ]);

mix.webpackConfig({
    output:{
        chunkFilename:'js/reactjs_code_split/[name].js',
    }
});

mix.js('resources/react/webapp/app.js', 'public/themes/web/app/js').react().sass('resources/react/webapp/app.scss', 'public/themes/web/app/css');
