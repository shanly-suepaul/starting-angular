/**
 * RequireJS paths and shim configuration.
 * Declarative-only: does not invoke any actual code.
 * @todo rename this to config.js or something
 */
requirejs.config({
    baseUrl: 'src',
    paths: {
        'angular': '../bower_components/angular/angular',
    },
    shim: {
        'angular': {
            exports: 'angular'
        }
    }
});
