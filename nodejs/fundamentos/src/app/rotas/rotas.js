const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = (app) => {
    app.get('/', function(req, resp) {
        resp.send(
            `
                <html>
                    <head>
                        <meta charset="utf-8" />
                    </head>
                    <body>
                        <h1>Casa do Código</h1>
                    </body>
                </html>
            `
        );
    });
    
    app.get('/livros', function(req, resp) {

        const livroDao = new LivroDao(db);

        livroDao.lista()
                .then(livros => resp.marko(
                    require('../views/livros/lista.marko'),
                    {
                        livros: livros
                    }
                ))
                .catch(erro => console.log(erro));
    });
    
    app.get('/livros/novo', function(req, resp) {

        resp.marko(require('../views/livros/cadastro'))

    });

    app.post('/livros', function(req, resp) {
        console.log(req.body);

        const livroDao = new LivroDao(db);

        livroDao.adiciona(req.body)
                .then(resp.redirect('/livros'))
                .catch(erro => console.log(erro));
    });
};
