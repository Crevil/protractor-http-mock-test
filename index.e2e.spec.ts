﻿/// <reference path="typings/tsd.d.ts" />

import mock = require('protractor-http-mock');

describe('index', function () {

    beforeEach(function () {
        interface g {
            name: string;
        }
        interface h {
            id: number;
        }
        var getMock: GetMock<g> = {
            request: {
                path: function() { return '2';},
                queryString: {
                    'd': 'd',
                    'w': '2'
                }
            },
            response: {
                data: {name: 'd'}
            }
        };
        var postMock: PostMock<h, g> = {
            request: {
                path: function() { return '2';},
                data: {
                    id: 1
                }
            },
            response: {
                data: {name: 'd'}
            }
        };
        mock([postMock]);
        mock(['github']);
    });

    it('should repeat github results with url inline params', function () {
        browser.get('index.html');
        var repos = element.all(by.repeater("d in inlineData"));
        var repoCount;
        repos.count()
            .then(function (c) {
                repoCount = c;
            })
            .then(function() {
                expect(repoCount).toBe(2);
            });

        console.log('\n');
        mock.requestsMade().then(function (d) { return console.log(d); });
    });

    it('should repeat github results with explicit params', function () {
        browser.get('index.html');
        var repos = element.all(by.repeater("d in paramData"));
        var repoCount;
        repos.count()
            .then(function (c) {
                repoCount = c;
            })
            .then(function () {
                expect(repoCount).toBe(2);
            });

        console.log('\n');
        mock.requestsMade().then(function (d) { return console.log(d); });
    });

    afterEach(function () {
        mock.teardown();

        // Ouput console errors from browser log
        browser.manage().logs().get('browser').then(function (browserLogs) {
            if (browserLogs && browserLogs.length > 0) {
                console.log('\n*** Browser console output ***');
                browserLogs.forEach(function (log) {
                    if (log.level.value > 900) {
                        console.log(log.message);
                    }
                });
                console.log('\n');
            }
        });
    });
});
