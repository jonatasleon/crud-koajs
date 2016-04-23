// Geralmente o que temos que fazer?
// 1 — Chamar as dependências (modules dependencies)
var logger = require('koa-logger'),
    route = require('koa-route'),
    views = require('co-views'),
    parse = require('co-body'),
    koa = require('koa'),
    Contato = require('./handleContatos.js').Contato,
    app = koa();

// 3 — Criar os middlewares, o garçom que vai trabalhar entre a mesa e a cozinha
app.use(logger());

// 4 — Criar as rotas, o caminho a ser percorrido separado por portas para cada caso
app.use(route.get('/', list));
app.use(route.get('/contato/new', add));
app.use(route.get('/contato/:id', show));
app.use(route.get('/contato/delete/:id', remove));
app.use(route.get('/contato/edit/:id', edit));
app.use(route.post('/contato/create', create));
app.use(route.post('/contato/update', update));

// 5 — Vamos deixar a tela (VIEW) mais inteligente para conversar como o CONTROLLER e o modules
var render = views(__dirname + '/views', { map: { html: 'swig' }});

// 6 — Vamos criar as funções para cada ação passada pela rota para o CRUD sendo elas
// 6.1 — Listar(list)
function *list() {
    this.body = yield render('index', {
        contatos: Contato.selectAll()
    });
}

// 6.2 — Adicionar(add)
function *add() {
    this.body = yield render('new');
}

// 6.3 — Editar(edit)
function *edit(id) {
    var contato = Contato.select(id);
    console.log("Contato:");
    console.log(contato);
    this.body = yield render('edit', {
        contato: contato
    });
}

// 6.4 — Mostrar(show)
function *show(id) {
    this.body = yield render('show', { contato: Contato.select(id) });
}


// 6.5 — Apagar(remove)
function *remove(id) {
    Contato.remove(id);
    this.redirect('/');
}

// 6.6 — Criar(create)
function *create() {
    var contato = yield parse(this);
    Contato.insert(contato);
    this.redirect('/');
}

// 6.7 — Atualizar(update)
function *update() {
    var contato = yield parse(this);
    Contato.update(contato);
    this.redirect('/');
}

// 7 — Iniciar o servidor http
app.listen(3000);
console.log('Magic happens on http://127.0.0.1:3000');
