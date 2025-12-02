const produtos = [
    {id: 1 , nome: 'pão', valor: 1.50 , categoria: 'alimento'},
    {id: 2 , nome: 'suco', valor: 5 , categoria: 'alimento'},
    {id: 3 , nome: 'detergente', valor: 8 , categoria: 'limpeza'},
    {id: 4 , nome: 'pizza', valor: 10 , categoria: 'alimento'},
    {id: 5 , nome: 'sabonete', valor: 7, categoria: 'limpeza'},
];


const alimentos = produtos.filter(p => p.categoria === 'alimento');
console.log(alimentos);//retorna somente os itens que passam em um teste (true).

console.log('===============================================================================');

const ids_produtos =  produtos.map(produto => produto.id); //percorre cada item de um array e cria um 
// novo array com o resultado da função que você aplicar.
let count = 0;
for(i=0 ; i < produtos.length ; i++){
    console.log(`ids:`, ids_produtos[i]);
}

console.log('===============================================================================');

const soma_valores = produtos.reduce((acc, valores) => acc + valores.valor, 0);
console.log(soma_valores);