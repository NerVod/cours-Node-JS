const http = require('http');
const serveStatic = require('serve-static');
const finalHandler = require('finalhandler');
const finalhandler = require('finalhandler');

const httpServer = http.createServer();

httpServer.on('request', (req, res) => {
    const done = finalhandler(req, res);
    const serve = serveStatic( { 'index': ['index.html']});

    serve(req, res, done);
});

httpServer.listen(8070, () => {
    console.log('Serveur écoute sur le port 8070')
})