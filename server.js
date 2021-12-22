// import { createServer } from 'http';

// const server = createServer();
// const port =8080;

// server.on("request", (requete, reponse) => {
//     const reqUrl = requete.url;
//     console.log("requete:", requete);

//     const reponseDuServeur = "Vive la promo 17 des DIWJS !";

//     reponse.writeHead(200,"ToutVaBien", {
//             "Content-Type" : "text/plain",
//             "Content-Length": "Buffer.byteLength",
//         }
//     )
//     reponse.write(reponseDuServeur, () => {
//             reponse.end();
//         });
// });

// server.listen(port, () => {
//     console.log(`Le serveur écoute sur le port ${port}.`)
// })

//////////////////////////////////////////////////////////////////////////////////////
//////////////////   réponse serveur factorisé avec des arguments //////////////////////
/////// permet de modifier les réponses du serveur ///////////////////////////////////

// import { createServer } from 'http';

// const server = createServer();
// const port =8080;

// server.on("request", (requete, reponse) => {
//     const reqUrl = requete.url;
//     console.log("requete:", requete);

//     let reponseDuServeur = "Vive la promo 17 des DIWJS !";
//     let statusCode = 200;
//     let statusMessage = "ToutVaBien";
//     let contentType = "text/plain";
//     let contentLength = "Buffer.byteLength"

// // code de réponse factorisé
//     reponse.writeHead(statusCode,statusMessage, {
//             "Content-Type" : contentType,
//             "Content-Length": contentLength,
//     }
//     )
//     reponse.write(reponseDuServeur, () => {
//             reponse.end();
//         });
// });

// server.listen(port, () => {
//     console.log(`Le serveur écoute sur le port ${port}.`)
// })

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import { createServer } from 'http';

const server = createServer();
const port =8080;

server.on("request", (requete, reponse) => {
    const reqUrl = requete.url;
    const enteteRequete = requete.headers;
    const userAgent = entetesRequete["user-agent"]
    let reponseDuServeur = "<p>Vive la promo 17 des DIWJS !</p>";

    // if(userAgent.indexOf('Chrome') > -1 ){
    //     reponseDuServeur = "Vous utilisez le navigateur Chrome !"
    // } else if (userAgent.indexOf('MSIE') > -1) {
    //     reponseDuServeur = "Vous utilisez le navigateur Firefox, Êtes-vous développeur ?"
    // } else {
    //     reponseDuServeur = "Changez de navigateur !"
    // };


    
    
    console.log("headers de requête:", entetesRequete);
    let reponseBuffer = Buffer.from(reponseDuServeur, 'utf-8');
    let statusCode = 200;
    let statusMessage = "ToutVaBien";
    let contentType = "text/html";
    let contentLength = reponseBuffer.length;

// code de réponse factorisé
    reponse.writeHead(statusCode,statusMessage, {
            "Content-Type" : contentType,
            "Content-Length": contentLength,
    }
    )
    reponse.write(reponseDuServeur, () => {
            reponse.end();
        });
});

server.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}.`)
})