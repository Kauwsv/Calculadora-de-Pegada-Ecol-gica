const conteudoPrincipal = document.querySelector('.conteudo-principal');
const enunciadoPrincipal = document.querySelector('.enunciado-principal');
const botaoPrincipal = document.querySelector('.botao-principal');
const inputNome = document.createElement('input');
inputNome.type = "text";
const inputRange = document.querySelector('#input-range');
inputRange.classList.add('input-range');
const labelRange = document.querySelector("#lenRange");
const inputNumber = document.createElement('input');
inputNumber.type = "number";
inputNumber.min = 1;
inputNumber.value = "1";
const inputRadioSim = document.querySelector('#radio-sim');
const inputRadioNao = document.querySelector('#radio-nao');
const labelRadioSim = document.querySelector("#label-radio-sim");
const labelRadioNao = document.querySelector("#label-radio-nao");
const divRadio1 = document.createElement('div');
const divRadio2 = document.createElement('div');
const inputBox = document.createElement('div');
inputBox.classList.add('input-box');
const divResultado = document.createElement('div');
divResultado.classList.add('resultado-div');
const imgResultado = document.querySelector('.img-planeta');
const textoResultado = document.querySelector('.qtd-planetas');

let nome;
const respostas = [5];
let resultadoFinal;
let qtdPlanetas;

let paginaAtual = 0;

seletorPagina();

botaoPrincipal.addEventListener('click', function (evento) {
    evento.preventDefault();
    paginaAtual++;

    if(paginaAtual === 8) {
        paginaAtual = 0;
    }

    if(!inputNome.value && paginaAtual === 2){
        paginaAtual = 1;

        alert('Ops, informe o seu nome antes de continuar!');
    }

    if(paginaAtual === 3){
        respostas[0] = Number(inputRange.value);
        // 20% equivale a 5 pontos
    }else if(paginaAtual === 4){
        respostas[1] = Number(inputRange.value);
        // 20% equivale a 5 pontos
    }else if(paginaAtual === 5){
        respostas[2] = Number(inputNumber.value);
        //menos de -5 pessoas equivale 10p, +5 pessoas 20p.
    }else if(paginaAtual === 6){
        if(inputRadioSim.checked){
            respostas[3] = 1;
        }else{
            respostas[3] = 0;
        }
    }else if(paginaAtual === 7){
        respostas[4] = Number(inputRange.value);
    }

    seletorPagina();

});

inputNome.addEventListener('change', function () {
    nome = inputNome.value;
});

labelRange.innerHTML = inputRange.value + "%";

inputRange.addEventListener('input', function (){
    labelRange.innerHTML = `${inputRange.value}%`;
});

function seletorPagina (){
    if(paginaAtual === 0){
        resultadoFinal = 0;
        enunciadoPrincipal.innerHTML = `Olá! Vamos calcular sua pegada ecológica? `;
        botaoPrincipal.innerHTML = 'Iniciar';
        enunciadoPrincipal.style.width = "60%";
    }else if(paginaAtual === 1){
        enunciadoPrincipal.innerHTML = '';
        enunciadoPrincipal.appendChild(inputNome);
        inputNome.value = '';
        inputNome.classList.add('input-text');
        inputNome.setAttribute('placeholder', 'Digite o seu nome:');
        botaoPrincipal.innerHTML = 'Continuar';
    }else if(paginaAtual === 2){
        enunciadoPrincipal.innerHTML = `${nome}, com que frequência consomes produtos de origem animal?`
        inputRange.value = '50';
        labelRange.innerHTML = "50%";
        enunciadoPrincipal.appendChild(inputRange);
        enunciadoPrincipal.appendChild(labelRange); 
    }else if(paginaAtual === 3){
        inputRange.value = '50';
        labelRange.innerHTML = "50%";
        enunciadoPrincipal.innerHTML = `${nome}, dos alimentos que consome, qual a percentagem de comida não processada, não embalada ou cultivada localmente?`
        enunciadoPrincipal.appendChild(inputRange);
        enunciadoPrincipal.appendChild(labelRange); 
    }else if(paginaAtual === 4){
        enunciadoPrincipal.innerHTML = `${nome}, quantas pessoas residem no teu agregado familiar?`;
        enunciadoPrincipal.appendChild(inputNumber);
        inputNumber.value = 1;
        inputNumber.classList.add('input-number');
    }else if(paginaAtual === 5){
        enunciadoPrincipal.innerHTML = `${nome}, tens energia elétrica em casa?`;
        enunciadoPrincipal.appendChild(inputBox);
        inputBox.appendChild(divRadio1);
        inputBox.appendChild(divRadio2);
        divRadio1.appendChild(inputRadioNao);
        divRadio2.appendChild(inputRadioSim);
        divRadio1.appendChild(labelRadioNao);
        divRadio2.appendChild(labelRadioSim);
        divRadio1.classList.add('radio');
        divRadio2.classList.add('radio');
    }else if(paginaAtual === 6){
        enunciadoPrincipal.innerHTML = `${nome}, com que frequência viaja de avião anualmente?`;
        inputRange.value = '50';
        labelRange.innerHTML = "50%";
        enunciadoPrincipal.appendChild(inputRange);
        enunciadoPrincipal.appendChild(labelRange); 
    }else if(paginaAtual === 7){
        calculaResultado();
        enunciadoPrincipal.innerHTML = `<p class="descricao-resultado">Aqui está sua pegada ecológica, ${nome}!</p>`;
        enunciadoPrincipal.appendChild(divResultado);
        divResultado.appendChild(imgResultado);
        divResultado.appendChild(textoResultado);
        textoResultado.innerHTML = `${qtdPlanetas} planetas.`;
        enunciadoPrincipal.innerHTML += `<p class="descricao-resultado">Como seria se todos no mundo vivessem como você?</p>`;
        botaoPrincipal.innerHTML = "Refazer";
        enunciadoPrincipal.style.width = "100%";
        botaoPrincipal.style.marginBottom = "20px";
    }
}

function calculaResultado () {
    resultadoFinal += (Math.floor(respostas[0]/20)) * 5;//consumo de carne animal
    let i = (Math.floor(respostas[1]/20));
    resultadoFinal += (5 - i) * 5;//consumo de alimentos vegetal
    if(respostas[2] <= 2){//agregado familiar
        resultadoFinal += 5;
    }else if(respostas[2] <= 5){
        resultadoFinal += 10;
    }else{
        resultadoFinal += 20;
    }
    resultadoFinal += respostas[3] * 20; //energia eletrica
    resultadoFinal += (Math.floor(respostas[4]/20)) * 5;//avião

    qtdPlanetas = (resultadoFinal/20).toFixed(2);
}