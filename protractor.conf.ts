/// <reference path="typings/tsd.d.ts" />

import mock = require('protractor-http-mock');

export var config = {
    // path to the selenium server jar. Update version number accordingly!
    seleniumServerJar: 'node_modules/protractor/selenium/selenium-server-standalone-2.48.2.jar',

    // select all end to end tests
    specs: ['*e2e.spec.js'],

    baseUrl: 'http://localhost:9000',
    
    onPrepare: () => {
        mock.config = {
            rootDirectory: __dirname
        }
    }
};
