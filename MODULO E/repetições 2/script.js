function calcularTabuada() {
    const numero = Number(document.querySelector('#numero').value);
    const resultado = document.querySelector('#resultado');

    let cont = ""
    let valor = 0;

    for(let x = 1; x <= 10; x++) {
        valor = numero * x;
        cont += `${numero} x ${x} = ${valor} <br/>`
    }
    resultado.innerHTML = cont;
}