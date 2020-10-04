const ul = document.getElementById('Filmes');
const url = 'http://localhost:5000/api/Filmes';
var corpo_tabela = document.querySelector('tbody');

var filmesTabela = [];

function renderFilmes() {
    var myHeaders = new Headers();

    myHeaders.append('Content-Type', 'text/json', 'Access-Control-Allow-Origin');
    fetch(url, {
        method: 'get', //método  http para tipo de acesso //delete //post // put,
        //mode: 'no-cors', // 'cors' by default
        headers: myHeaders
    })
        .then(function (response) {

            response.text()
                .then(function (result) {
                    console.log(response.status)
                    var jsonResposta = JSON.parse(result);
                    listar(jsonResposta);
                    console.log(jsonResposta);

                })
        })
        .catch(function (err) {
            console.error(err);  
        });
}

function listar(filmes) {
    

    filmes.forEach(filme => {
        var linha = document.createElement('tr');

        var campo_titulo = document.createElement('td');
        var campo_genero = document.createElement('td');

        var texto_titulo = document.createTextNode(filme.titulo);
        var texto_genero = document.createTextNode(filme.genero);

        if (!filmesTabela.some(function (ft) {
            return ft.idFilme == filme.idFilme;
        })) {
            // Vincula textos com elementos
            campo_titulo.appendChild(texto_titulo);
            campo_genero.appendChild(texto_genero);

            // Vincula campos com a linha
            linha.appendChild(campo_titulo);
            linha.appendChild(campo_genero);

            // Vincula elementos ao documento
            corpo_tabela.appendChild(linha);
        }
    });

    filmesTabela = filmes;
}