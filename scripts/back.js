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
        carga_horaria_total: 90,
        tipo: 'semestral',
        objetivos: 'Aprofundar conceitos de geometria analítica',
    }
];

//Variável que seleciona a div que irá mostrar as matérias
let mainContainer = document.getElementById('container-materias');

//Função que cria uma div e coloca as informações dentro dessa div de uma determinada matéria
function criarContainerDeUmaMateria(materia){
    let containerMateria = document.createElement('div');
    containerMateria.classList.add("marcacao-materia");
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
             let botaoVoltar = document.getElementById('botao-voltar');
             botaoVoltar.addEventListener('click', function (){
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
    containerMateria.classList.add("marcacao-materia");
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
        <button id="botao-voltar">Voltar</button>
    `;

    return containerMateria;
}

//Função que renderiza as informações da matéria clickada
function renderizaInformacoesMateria(materia){
    let containerMateria = informacoesDaMateria(materia);
    renderizarElementoDeMateria(containerMateria);
}