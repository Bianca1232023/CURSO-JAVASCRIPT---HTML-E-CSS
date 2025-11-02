let resultado = document.querySelector('#resultado');
let lista_numeros = document.querySelector('#lista_numeros');
let valores = [];

function clicar(action){
    if (action === 'add') return Adicionar();
    if (action === 'check') return Verificar();
}

function Adicionar(){
    const input = document.querySelector('#numero');
    const num = Number(input.value); 

    if (input.value.trim() === '' || isNaN(num) || !Number.isInteger(num) || num < 0 || num > 100){
        alert('Valor invalido Digite um numero entre 0 e 100');
        return;
    }
    if (valores.includes(num)){
        alert('Valor já adicionado');
        return;
    }

    valores.push(num);
    const option = document.createElement('option');
    option.value = num;
    option.text = `Valor ${num} adicionado.`;
    lista_numeros.appendChild(option);
}

function Verificar(){
    if (valores.length === 0){
        resultado.innerHTML = 'Adicione valores antes de verificar.';
        return;
    }

function MaiorMenor(){
    let maior, menor;
    for (let i = 0 ; i < valores.length; i++){
        if (i === 0){
            maior = menor = valores[i];
        } else {
            if (valores[i] > maior) maior = valores[i];
            if (valores[i] < menor) menor = valores[i];
        }
    }
    return {maior,menor}
}

function CalcularSoma(){
    let soma_tudo = 0;
    for (let i = 0 ; i < valores.length; i++){
        soma_tudo += valores[i];
    }
    return soma_tudo;
}

function Media(soma, total){
    return soma / total
}

    const {maior, menor} = MaiorMenor();
    const total = valores.length;
    const soma = CalcularSoma();
    const media = Media(soma, total);

    resultado.innerHTML = `
        <p>Ao todo, temos ${total} números cadastrados.</p>
        <p>O maior valor informado foi ${maior}.</p>
        <p>O menor valor informado foi ${menor}.</p>
        <p>A soma dos valores é ${soma}.</p>
        <p>A média dos valores é ${media.toFixed(2)}.</p>
    `;
}
// /**/
