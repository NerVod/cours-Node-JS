
const http = require('http');
const { MongoClient } = require('mongodb');
const pug = require('pug');

const server = http.createServer();
const mongoUrl = 'mongodb://localhost:27017/';
const dbName = 'mon-site';
const colName = 'users';

server.on('request', (req, res) => {

  let fileToSend = '';
  let pathToFile = './public/template.pug';
  let statusCode;

  MongoClient.connect(mongoUrl, (error, client) => {
    if (error) {
      // Ajouter gestion intelligente de l'erreur en question
      console.log(error);
    } else {
      const collection = client.db(dbName).collection(colName);

      collection.findOne({}, (error, document) => {
        if (error) {
          statusCode = 500
          // Ajouter gestion intelligente de l'erreur en question;
          console.log(error);
        } else {
          console.log('document trouvé dans la db mon-site: ', document);

          statusCode = 200;

          const { name, age, address } = document;

          fileToSend = Buffer.from(pug.renderFile(pathToFile, {
            name,
            age,
            city: address.city,
            zipCode: address.zipCode
          }));

          res.writeHead(
            statusCode,
            {
              'Content-Type': 'text/html; charset=UTF-8',
              'Content-Length': Buffer.byteLength(fileToSend)
            }
          )
          res.write(fileToSend, () => {
            res.end();
          })
        }
      })
    }
  });
});

server.listen(8040, () => {
  console.log('Serveur a été démarré sur le port 8040.');
});
