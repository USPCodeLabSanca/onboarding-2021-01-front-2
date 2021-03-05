let materias = [
    {
    codigo: 'SCC0221',
    nome_pt_br: 'Introdução à Ciência de Computação I',
    nome_en_us: 'Introduction to Computer Science I',
    creditos_aula: 4,
    creditos_trabalho: 1,
    carga_horaria_total: 90,
    tipo: 'semestral',
    objetivos: `
      Apresentar os conceitos básicos para o desenvolvimento de programas, utilizando uma linguagem de programação como apoio.
      Present the basic concepts of computational thinking applied to problem solving. Develop skills to write small programs using a programming language. Basic concepts about computers and computing. Problem solving and algorithm design. Programming structures. Simple data types. Modularization. Composite data types. Files. Debugging. Structured programming language.
    `,
    },
    {
      codigo: 'SMA0353',
      nome_pt_br: 'Cálculo 1',
      nome_en_us: 'Calculus 1',
      creditos_aula: 4,
      creditos_trabalho: 1,
      carga_horaria_total: 90,
      tipo: 'semestral',
      objetivos: 'Introduzir os conceitos basicos de calculo',
    },
    {
        codigo: 'SMA0354',
        nome_pt_br: 'Álgebra Linear',
        nome_en_us: 'Linear Algebra',
        creditos_aula: 2,
        creditos_trabalho: 1,
        carga_horaria_total: 80,
        tipo: 'semestral',
        objetivos: 'Aprofundar conceitos de geometria analítica',
    }
];

//Variável que seleciona a div que irá mostrar as matérias
let mainContainer = document.getElementById('container-materias');

//Variável que seleciona o select do filtro e ordenação
let selectFiltro = document.getElementById('select-filtro');
let selectOrdenacao = document.getElementById('select-ordenacao');
let barraPesquisa = document.getElementById('barra-pesquisa');

//Variáveis auxiliares
let filtroSelecionado;
let ordenacaoSelecionada;
let stringPesquisaAtual = '';

//Adicionando event listener na barra de pesquisa
barraPesquisa.addEventListener('input', (event) => {
    stringPesquisaAtual = event.target.value;
    updateRenderizacao();
});

//Adicionando o event listener no select de fitro
selectFiltro.addEventListener('change', (event) => {
    let filtro = event.target.value;
    if(filtro == "Selecione") {
        filtroSelecionado = undefined;
    }
    if(filtro == "Carga horária 90h"){
        filtroSelecionado = filtraMateriaCargaHoraria90;
    }
    if(filtro == "Creditos aula 4"){
        filtroSelecionado = filtraMateriaCreditos4;
    }
    if(filtro == "Creditos aula 2"){
        filtroSelecionado = filtraMateriaCreditos2;
    }
    updateRenderizacao();
});

//Adicionando o event listener no select de ordenação
selectOrdenacao.addEventListener('change', (event) => {
    let ordenacao = event.target.value;
    if(ordenacao == "Selecione"){
        ordenacaoSelecionada = undefined;
    }
    if(ordenacao == "Alfabética Crescente"){
        ordenacaoSelecionada = bubbleSort;
    }
    if(ordenacao =="Alfabética Decrescente"){
        ordenacaoSelecionada = bubbleSortInvertido;
    }
    updateRenderizacao();
});

//Função que vai gerenciar os filtros, ordenações e pesquisa aplicando-os independentemente
function updateRenderizacao () {
    limparMaterias();
    let materiasFiltradas;

    // Filtro
    if (filtroSelecionado !== undefined) {
        materiasFiltradas = filtroSelecionado();
    } else {
        materiasFiltradas = materias;
    }

    //Pesquisa
    let materiasPesquisadas;
    if (stringPesquisaAtual === '') {
        materiasPesquisadas = materiasFiltradas;
    } else {
        materiasPesquisadas = materiasFiltradas.filter(
            function (materia) {
                // Se for pra manter a matéria na array, returna true
                // Se for pra remover a matéria da array, returna false
                return materia.nome_pt_br.toLowerCase().includes(stringPesquisaAtual.toLowerCase().trim());
            }
        );
    }

    let materiasOrdenadas;

    // Ordenacao
    if (ordenacaoSelecionada !== undefined) {
        materiasOrdenadas = ordenacaoSelecionada(materiasPesquisadas);
    } else {
        materiasOrdenadas = materiasPesquisadas;
    }

    renderizarMaterias(materiasOrdenadas);
}

//Bubble sort para ordenação Decrescente das matérias
function bubbleSortInvertido(materias){
    let x, y;
    let buffer = [];
    let materiasOrdenadas = [];
    for(let i = 0; i < materias.length; i++){
        materiasOrdenadas[i] = materias[i];
    }

    for(x=0; x< materias.length; x++){
        for(y=x+1; y < materias.length; y++){
            if(materiasOrdenadas[x].nome_pt_br.localeCompare(materias[y].nome_pt_br) < 0){
                buffer[0] = materiasOrdenadas[x];
                materiasOrdenadas[x]=materiasOrdenadas[y];
                materiasOrdenadas[y]= buffer[0];
            }
        }
    }

    return materiasOrdenadas;
}

// materias.sort(
//     function (a, b) {
//         // return um numero maior que zero se A tiver que aparecer antes de B
//         // return um numero menor que zero se A tiver que aparecer depois de B
//         // return um numero  zero se A for igual a B
//     }
// );

//Bubble sort para ordenação das matérias
function bubbleSort(materias){
    let x, y;
    let buffer = [];
    let materiasOrdenadas = [];
    for(let i = 0; i < materias.length; i++){
        materiasOrdenadas[i] = materias[i];
    }

    for(x=0; x< materias.length; x++){
        for(y=x+1; y < materias.length; y++){
            if(materiasOrdenadas[x].nome_pt_br.localeCompare(materias[y].nome_pt_br) > 0){
                buffer[0] = materiasOrdenadas[x];
                materiasOrdenadas[x]=materiasOrdenadas[y];
                materiasOrdenadas[y]= buffer[0];
            }
        }
    }

    return materiasOrdenadas;
}


//Função que filtra as matérias que tem 90 de carga horária
function filtraMateriaCargaHoraria90 (){
    let materiasFiltered = [];

    for(let i=0; i < materias.length; i++){
        let materia = materias[i];
        if(materia.carga_horaria_total === 90){
            materiasFiltered.push(materia);
        }
    }

    return materiasFiltered
}

//Função que filtra as matérias por creditos 4
function filtraMateriaCreditos4 (){
    let materiasFiltered = [];

    for(let i=0; i < materias.length; i++){
        let materia = materias[i];
        if(materia.creditos_aula === 4){
            materiasFiltered.push(materia);
        }
    }

    return materiasFiltered
}

//Função que filtra as matérias por creditos 2
function filtraMateriaCreditos2 (){
    let materiasFiltered = [];

    for(let i=0; i < materias.length; i++){
        let materia = materias[i];
        if(materia.creditos_aula === 2){
            materiasFiltered.push(materia);
        }
    }

    return materiasFiltered
}

//Função que cria uma div e coloca as informações dentro dessa div de uma determinada matéria
function criarContainerDeUmaMateria(materia){
    let containerMateria = document.createElement('div');
    containerMateria.setAttribute("id", "marcacao-materia");
    containerMateria.innerHTML=`
        <p class="info">${materia.nome_pt_br}</p>
    `;

    return containerMateria;
}

//Função que renderiza matéria na div
function renderizarElementoDeMateria (containerMateria) {
    mainContainer.appendChild(containerMateria);
}

//Função que realiza a renderização de todas as matérias
//Essa função passa em matéria por matéria. Cria um container pra aquela determinada matéria
//Depois de criar um container pra aquela matéria, ele vai adicionar um event listener que 
//vai ficar atendo ao clique. Quando for clicado ele vai limpar toda as matérias, renderizar
//apenas a matéria clicada e renderizar suas informações. Após isso ele vai adicionar mais
//um event listener ao botão para limpar todas as informações e renderizar o menu de matérias.
function renderizarMaterias (materias){
    for(let i = 0; i < materias.length; i++){
        let materia = materias[i];
        let containerMateria = criarContainerDeUmaMateria(materia);
        containerMateria.addEventListener(`click`, function () {
            limparMaterias();
            renderizarElementoDeMateria(containerMateria);
            renderizaInformacoesMateria(materia);
            let materiaMark = document.getElementById('marcacao-materia');
            materiaMark.addEventListener('click', function (){
                limparMaterias();
                renderizarMaterias(materias);
            });
        });
        renderizarElementoDeMateria(containerMateria);
    }
}

//Chamada da função que renderiza as matérias
renderizarMaterias(materias);

//Função que limpa a div das matérias
function limparMaterias(){
    mainContainer.innerHTML="";
}

//Função que cria uma div e coloca as informações dentro dessa div de uma determinada matéria
function informacoesDaMateria(materia){
    let containerMateria = document.createElement('div');
    containerMateria.setAttribute("id", "marcacao-materia");
    containerMateria.innerHTML = `
        <p class="info">Código:</p>
        <p>${materia.codigo}</p>
        <p class="info">Nome:</p>
        <p>${materia.nome_pt_br}</p>
        <p>${materia.nome_en_us}</p>
        <p class="info">Créditos aula:</p>
        <p>${materia.creditos_aula}</p>
        <p class="info">Créditos trabalho:</p>
        <p>${materia.creditos_trabalho}</p>
        <p class="info">Carga horária total:</p>
        <p>${materia.carga_horaria_total}</p>
        <p class="info">Tipo:</p>
        <p>${materia.tipo}</p>
        <p class="info">Descrição</p>
        <p>${materia.objetivos}</p>
    `;

    return containerMateria;
}

//Função que renderiza as informações da matéria clickada
function renderizaInformacoesMateria(materia){
    let containerMateria = informacoesDaMateria(materia);
    renderizarElementoDeMateria(containerMateria);
}
