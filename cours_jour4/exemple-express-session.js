
const Http = require ('http');
const expressSession = require ('express-session');
const sessionFileStore = require ('session-file-store');

const server = Http.createServer();

const ExpressSessionFileStore = sessionFileStore(expressSession);

const fileStore = new ExpressSessionFileStore(
  {
    path: './sessions',
    ttl: 3600,
    retries: 10,
    secret: 'Mon super secret!'
  }
);

const maSession = expressSession(
  {
    store: fileStore,
    resave: true,
    saveUninitialized: true,
    secret: 'Secret de maSession'
  }
);

server.on('request', (req, res) => {
  // console.log('fileStore : ', fileStore);
  maSession(req, res, () => {
    console.log('req.session : ', req.session);
    if (req.session.counter) {
      req.session.counter++;
    } else {
      // console.log('req.session non existante');
      req.session.counter = 1;
    };

    let body = Buffer.from(`<p>Vous avez consulté la page ${req.session.counter} fois !</p>`);

    res.writeHead(
      200,
      {
        'Content-Type': 'text/html; charset=UTF-8',
        'Content-Length': Buffer.byteLength(body)
      }
    )
    res.write(body, () => {
      res.end();
    })
  });
});

server.listen(8090, () => {
  console.log('Serveur écoute sur le port 8090.');
});


