const { cwd } = require('process') ;
const dns = require('dns')

const options = {
    all : true,
},
const fonctionVerifIpExiste = function (urlAVerifier){
const verifieurUrl = dns.lookup(urlAVerifier, options, (err, addresses) =>
console.log('déporté adresses : %j', addresses));
}

module.exports = {
    fonctionUrlDeportee: function (urlAVerifier) {
        dns.lookup(urlAVerifier, options, (err, addresses) =>
        console.log('déporté adresses : %j', addresses));
    }
 }