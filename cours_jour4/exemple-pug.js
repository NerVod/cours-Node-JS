const http = require('http');
const pug = require('pug');


const httpServer = http.createServer();

httpServer.on('request', (req, res)=> {
const dateDuJour = new Date();
let body = Buffer.from(pug.renderFile('../template.pug',
 { date: dateDuJour.toLocaleDateString('fr-FR'),
    prenom: 'Benjamin',
    nom: 'Jeannerot',
}
));

res.writeHead(
    200,
    {
        'Content-Type': 'text/html; charset=UTF-8',
        'Content-Length': body.length,
    }
)
res.write(body, () => {
  res.end()
    })
})






httpServer.listen(8060, () => {
    console.log('Serveur écoute sur le port 8060')
})