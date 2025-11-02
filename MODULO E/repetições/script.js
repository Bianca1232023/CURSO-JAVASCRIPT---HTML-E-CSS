function contar(){
    const PrimeiroNumero = document.querySelector('#Inicio');
    const SegundoNumero = document.querySelector('#Fim');
    const Passo = document.querySelector('#Passo');
    const resultado = document.querySelector('#resultado');

    let inicio = Number(PrimeiroNumero.value);
    let fim = Number(SegundoNumero.value);
    let passo = Number(Passo.value);

    let valor = inicio;
    let cont = "";

    do{
        valor += passo;
        cont += valor + " 👉🏻 ";
    }while(valor <= fim)
        cont += " 🏁";
        resultado.innerHTML = `Contando: ${cont}`;        
}
