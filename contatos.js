var contatos = [];

function insert(contato) {
    contato.created_on = new Date();
    contato.updated_on = new Date();
    var id = contatos.push(contato);
    contato.id = id - 1;
}

function update(contato) {
    var index = contato.id.trim();
    contatos[index].nome = contato.nome;
    contatos[index].telefone = contato.telefone;
    contatos[index].operadora = contato.operadora;
    contatos[index].updated_on = new Date();
}

function remove(id) {
    var contato = select(id);
    contatos.splice(id, 1);
    for (var i = 0; i < contatos.length; i++) {
        contatos[i].id = i;
    }
}

function select(id) {
    var contato = contatos[id];
    if (!contato)
        throw(404, 'id de contato inválido');
    return contato;
}

function selectAll() {
    return contatos;
}

module.exports = {
    Contato: {
        insert: insert,
        update: update,
        remove: remove,
        select: select,
        selectAll: selectAll
    }
};
