'use strict';
// JavaScript containing shared constants, for use in all pages.

var backendIp = 'ec2-99-81-194-20.eu-west-1.compute.amazonaws.com';
var token = 'a13d7ce9-a3ae-4aa6-917c-c2bdc035ca2b';

function buildUrl(path) {
    return 'http://' + backendIp + '/images' + path + '?token=' + token;
}
