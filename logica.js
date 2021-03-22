function compare(a, b) {
  /* usado para ordenação dos valores*/
  const bandA = a.semelhanca;
  const bandB = b.semelhanca;

  let comparison = 0;

  if (bandA > bandB) { comparison = 1;}
  else if (bandA < bandB) { comparison = -1; }

  return comparison * -1;
}


async function linhaClicada(numLinha) {
  /* Selecionando a tabela */
  let itens = document.getElementById('table').getElementsByTagName('tr');

  /*FILME ESCOLHIDO*/
  let filmeEscolhido = itens[numLinha].getElementsByTagName('td');

  /* Coleta de dados */
  let filmeFilmeEscolhido = filmeEscolhido[0].innerText;
  let violenciaFilmeEscolhido = parseFloat(filmeEscolhido[1].innerText);
  let acaoFilmeEscolhido = parseFloat(filmeEscolhido[2].innerText);
  let romanceFilmeEscolhido = parseFloat(filmeEscolhido[3].innerText);
  let comediaFilmeEscolhido = parseFloat(filmeEscolhido[4].innerText);

  /* Lista com os filmes para ordenar */
  const listaFilmes = [];

  /* Outros filmes */
  let i = 1;

  for (i = 1; i < itens.length; i++) {
    let itensLinha = itens[i].getElementsByTagName('td');

    let filme = itensLinha[0].innerText;
    let violencia = parseFloat(itensLinha[1].innerText);
    let acao = parseFloat(itensLinha[2].innerText);
    let romance = parseFloat(itensLinha[3].innerText);
    let comedia = parseFloat(itensLinha[4].innerText);

    if (numLinha != i) {
      let semelhanca = ((violencia - violenciaFilmeEscolhido) ** 2) +
                       ((acao - acaoFilmeEscolhido) ** 2) +
                       ((romance - romanceFilmeEscolhido) ** 2) +
                       ((comedia - comediaFilmeEscolhido) ** 2)

      // 4 Critérios, se atingir todos é 100%
      listaFilmes.push({
        filme: filme.toString(),
        semelhanca: (100 - (100 * semelhanca) / 4).toFixed(1), // 4 colunas
        violencia: violencia,
        acao: acao,
        romance: romance,
        comedia: comedia
      });
    }
  }

  // Deletar a tabela
  var pai = document.getElementById('table');
  pai.remove();

  
  // Inserir o cabeçalho
  document.getElementById('body').innerHTML =  document.getElementById('body').innerHTML + '<table id="table" style="width:100%"></table>';

  // String para montar a tabela
  var montarTabela = '<tr><th>Filme</th><th>Violência</th><th>Ação</th><th>Romance</th><th>Comédia</th><th>Recomendações</th><th></th></tr>';

  // Primeiro filme
  montarTabela = montarTabela +
    '<tr id="filme_selecionado" ><td>' + filmeFilmeEscolhido +
    '</td><td>' + violenciaFilmeEscolhido +
    '</td><td>' + acaoFilmeEscolhido +
    '</td><td>' + romanceFilmeEscolhido +
    '</td><td>' + comediaFilmeEscolhido +
    '</td><td>' + 100 +
    '</td><td><button onclick="linhaClicada(' + 1 + ')">Escolher</button></td></tr>';


  // Reordenação dos filmes por ordem de recomendação
  var num = 2;
  listaFilmes.sort(compare); // função de ordenação

  // Loop pelos valores ordenados
  for (i = 0; i < listaFilmes.length; i++) {

    montarTabela = montarTabela +
      '<tr><td>' + listaFilmes[i]['filme'] +
      '</td><td>' + listaFilmes[i]['violencia'] +
      '</td><td>' + listaFilmes[i]['acao'] +
      '</td><td>' + listaFilmes[i]['romance'] +
      '</td><td>' + listaFilmes[i]['comedia'] +
      '</td><td>' + listaFilmes[i]['semelhanca'] +
      '</td><td><button onclick="linhaClicada(' + num + ')">Escolher</button></td></tr>';

    num += 1;
  }

  // Injetar a tabela
  document.getElementById('table').innerHTML = montarTabela;
}