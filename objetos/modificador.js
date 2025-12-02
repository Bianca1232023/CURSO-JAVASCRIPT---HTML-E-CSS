function novo_capitalizar(coleção, atributo){
    if (typeof coleção[0] !== 'object'){
        const resultado= coleção.map(function(obj){
            console.log(obj[atributo]);
            let letrainicial = obj[atributo].charAt(0).toUpperCase();
            let resto_texto = obj[atributo].slice(1);
            let resultado = letrainicial + resto_texto;

            obj[atributo] = resultado;
            return obj;
        });
        console.log(resultado);
    }
}


function capitalizar(ingredientes){
    let modificar = [];

    for (let i=0; i < ingredientes.length; i++){
        console.log(ingredientes[i]);
        let letrainicial = ingredientes[i].charAt(0).toUpperCase();
        let restante = ingredientes[i].slice(1);
        let ingredientesModificados = letrainicial + restante;
        modificar.push(ingredientesModificados);
    }
    return modificar;
}

const ordenar = (ingredientes) => ingredientes.sort((a,b)=>a.localeCompare(b));

export default{
    capitalizar: capitalizar,
    ordenar: ordenar,
    novo_capitalizar: novo_capitalizar
}

