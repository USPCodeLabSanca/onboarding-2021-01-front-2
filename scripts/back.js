const url = 'https://codelab-uspmaterias.herokuapp.com/materias/';

fetch(url)
.then((resp) => resp.json())
.then(function(data) {
	var materias = data;
    for (let i = 0; i < materias.length; i++){
        if (!('codigo' in materias[i]))
            materias.splice(i,i);
    }

    //Variável que seleciona a div que irá mostrar as matérias
    let mainContainer = document.getElementById('container-materias');

    //Variável que seleciona o select do filtro e ordenação
    let selectFiltro = document.getElementById('select-filtro');
    let selectOrdenacao = document.getElementById('select-ordenacao');
    let barraPesquisa = document.getElementById('barra-pesquisa');

    //Adicionando event listener na barra de pesquisa
    barraPesquisa.addEventListener('input', (event) => {
        stringPesquisaAtual = event.target.value;
        updateRenderizacao();
    });

    filtros = define_filtros_dinamicos();

    filterSelect = document.getElementById("select-filtro")

    for (let i = 0; i < filtros["creditos-aula"].length; i++){
        let option = document.createElement("option");
        option.text = "Créditos-aula: " + filtros["creditos-aula"][i] + "h";
        filterSelect.appendChild(option);
    }
    for (let i = 0; i < filtros["creditos-trabalho"].length; i++){
        let option = document.createElement("option");
        option.text = "Créditos-trabalho: " + filtros["creditos-trabalho"][i] + "h";
        filterSelect.appendChild(option);
    }
    for (let i = 0; i < filtros["carga-horaria-total"].length; i++){
        let option = document.createElement("option");
        option.text = "Carga horária: " + filtros["carga-horaria-total"][i] + "h";
        filterSelect.appendChild(option);
    }

    //Variáveis auxiliares
    var filtroSelecionado;
    let ordenacaoSelecionada;
    let stringPesquisaAtual = '';

    //Adicionando o event listener no select de fitro
    selectFiltro.addEventListener('change', (event) => {
        let filtro = event.target.value;
        filtros = define_filtros_dinamicos();
        console.log(filtros);
        if(filtro == "Selecione") {
            filtroSelecionado = undefined;
        }
        for (let i = 0; i < filtros["creditos-aula"].length; i++){
            if (filtro == "Créditos-aula: " + filtros["creditos-aula"][i] + "h")
                filtroSelecionado = filtraMateriaCreditosAula(filtros["creditos-aula"][i]);
        }
        for (let i = 0; i < filtros["creditos-trabalho"].length; i++){
            if (filtro == "Créditos-trabalho: " + filtros["creditos-trabalho"][i] + "h")
                filtroSelecionado = filtraMateriaCreditosTrabalho(filtros["creditos-trabalho"][i]);
        }
        for (let i = 0; i < filtros["carga-horaria-total"].length; i++){
            if (filtro == "Carga horária: " + filtros["carga-horaria-total"][i] + "h")
                filtroSelecionado = filtraMateriaCargaHoraria(filtros["carga-horaria-total"][i]);
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
            ordenacaoSelecionada = sort;
        }
        if(ordenacao =="Alfabética Decrescente"){
            ordenacaoSelecionada = sortInvertido;
        }
        updateRenderizacao();
    });

    function define_filtros_dinamicos () {
        
        let filtros = {
            "creditos-trabalho": [],
            "creditos-aula": [],
            "carga-horaria-total": []
        };

        for (let i = 0; i < materias.length; i++) {
            if (!filtros["creditos-trabalho"].includes(materias[i].creditos_trabalho))
                filtros["creditos-trabalho"].push(materias[i].creditos_trabalho);
            if (!filtros["creditos-aula"].includes(materias[i].creditos_aula))
                filtros["creditos-aula"].push(materias[i].creditos_aula);
            if (!filtros["carga-horaria-total"].includes(materias[i].carga_horaria_total))
                filtros["carga-horaria-total"].push(materias[i].carga_horaria_total);
        }

        return filtros;
    }

    //Função que vai gerenciar os filtros, ordenações e pesquisa aplicando-os independentemente
    function updateRenderizacao () {
        limparMaterias();
        let materiasFiltradas;

        // Filtro
        if (filtroSelecionado !== undefined) {
            materiasFiltradas = filtroSelecionado;
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

    // Sort descendente para ordenação Decrescente das matérias
    function sortInvertido(materias){
        let materiasOrdenadas = materias;
        materiasOrdenadas.sort((a, b) => (a.nome_pt_br < b.nome_pt_br) ? 1 : -1);

        return materiasOrdenadas;
    }

    // Sort crescente para ordenação das matérias
    function sort(materias){
        let materiasOrdenadas = materias;
        materiasOrdenadas.sort((a, b) => (a.nome_pt_br > b.nome_pt_br) ? 1 : -1);

        return materiasOrdenadas;
    }

    function filtraMateriaCargaHoraria(x) {
        let materiasFiltered = materias.filter(function(value) {
            if (value.carga_horaria_total === x) 
                return value;  
        });
        return materiasFiltered;
    }

    //Função que filtra as matérias por creditos 4
    function filtraMateriaCreditosAula(x) {
        let materiasFiltered = materias.filter(function(value){
            if (value.creditos_aula === x)
                return value;
        });
        return materiasFiltered;
    }

    //Função que filtra as matérias por creditos 2
    function filtraMateriaCreditosTrabalho(x) {
        let materiasFiltered = materias.filter(function(value){
            if (value.creditos_trabalho === x)
                return value;
        });
        return materiasFiltered;
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
            <p class="info">Créditos-aula:</p>
            <p>${materia.creditos_aula}</p>
            <p class="info">Créditos-trabalho:</p>
            <p>${materia.creditos_trabalho}</p>
            <p class="info">Carga horária total:</p>
            <p>${materia.carga_horaria_total}</p>
            <p class="info">Tipo:</p>
            <p>${materia.tipo}</p>
            <p class="info">Descrição</p>
            <p>${materia.objetivos_pt_br}</p>
            <p>${materia.objetivos_en_us}</p>
        `;

        return containerMateria;
    }

    //Função que renderiza as informações da matéria clickada
    function renderizaInformacoesMateria(materia){
        let containerMateria = informacoesDaMateria(materia);
        renderizarElementoDeMateria(containerMateria);
    }
});