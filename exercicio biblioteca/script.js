class Livro {
    constructor(titulo, autor, ano) {
        this.titulo = titulo;
        this.autor = autor;
        this.ano = ano;
    }

    detalhesDoLivro() {
        const original = getLivroByTitle(this.titulo);
        const status = original ? (original.disponivel ? 'Disponível' : 'Indisponível') : 'Não encontrado';
        return `\n LIVRO: ${this.titulo}, escrito por ${this.autor} em ${this.ano} — ${status}.`;
    }

    emprestar() {
        const original = getLivroByTitle(this.titulo);
        if (!original) 
            return `O livro "${this.titulo}" não pertence à biblioteca.`;
        if (!original.disponivel) 
            return `O livro "${this.titulo}" já está emprestado.`;
        original.disponivel = false;
        return `Livro "${this.titulo}" marcado como emprestado.`;
    }

    devolver() {
        const original = getLivroByTitle(this.titulo);
        if (!original) 
            return `O livro "${this.titulo}" não pertence à biblioteca.`;
        if (original.disponivel) 
            return `O livro "${this.titulo}" já está disponível na biblioteca.`;
        original.disponivel = true;
        return `Livro "${this.titulo}" marcado como disponível.`;
    }
}

function getLivroByTitle(titulo) {
    if (!titulo) 
        return undefined;
    return livros.find(l => l.titulo.toLowerCase() === String(titulo).toLowerCase());
}

function getUsuarioByName(nome) {
    if (!nome)
        return undefined;
    return usuarios.find(u => u.nome.toLowerCase() === String(nome).toLowerCase());
}

const livros = [
    {
        titulo: 'O Senhor dos Anéis',
        autor: 'J.R.R. Tolkien',
        ano: 1954,
        disponivel: true
    },
    {
        titulo: '1984',
        autor: 'George Orwell',
        ano: 1949,
        disponivel: true
    },
    {
        titulo: 'Dom Quixote',
        autor: 'Miguel de Cervantes',
        ano: 1605,
        disponivel: true
    },
    {
        titulo: 'O Pequeno Príncipe',
        autor: 'Antoine de Saint-Exupéry',
        ano: 1943,
        disponivel: true
    },
    {
        titulo: 'Harry Potter e a Pedra Filosofal',
        autor: 'J.K. Rowling',
        ano: 1997,
        disponivel: true
    }
];

const objetos = livros.map(l => new Livro(l.titulo, l.autor, l.ano));

objetos.forEach(l => console.log(l.detalhesDoLivro()));

class Usuario{
    constructor(nome, livros_emprestados = []){
        this.nome = nome;
        this.livros_emprestados = livros_emprestados;
    }
    
    detalhesDoUsario(){
        const entidade = getUsuarioByName(this.nome);
        if (!entidade) return `Usuário "${this.nome}" não encontrado.`;
        const livrosStr = entidade.livros_emprestados.length > 0 
            ? entidade.livros_emprestados.join(', ')
            : 'nenhum livro';
        return `Usuário: ${this.nome}\nLivros emprestados: ${livrosStr}`;
    }

    emprestarLivro(livro) {
        const entidade = getUsuarioByName(this.nome);
        const original = getLivroByTitle(livro.titulo);
        
        if (!entidade) return `Usuário "${this.nome}" não encontrado.`;
        if (!original) return `O livro "${livro.titulo}" não pertence à biblioteca.`;
        if (!original.disponivel) return `O livro "${livro.titulo}" já está emprestado.`;

        livro.emprestar(); 
        entidade.livros_emprestados.push(livro.titulo);
        return `O livro "${livro.titulo}" foi emprestado para ${this.nome}.`;
    }

    devolverLivro(livro) {
        const entidade = getUsuarioByName(this.nome);
        const original = getLivroByTitle(livro.titulo);
        
        if (!entidade) return `Usuário "${this.nome}" não encontrado.`;
        if (!original) return `O livro "${livro.titulo}" não pertence à biblioteca.`;
        if (original.disponivel) return `O livro "${livro.titulo}" já está disponível na biblioteca.`;

        const idx = entidade.livros_emprestados.indexOf(livro.titulo);
        if (idx === -1) return `O livro "${livro.titulo}" não está na lista de emprestados de ${this.nome}.`;

        livro.devolver(); 
        entidade.livros_emprestados.splice(idx, 1);
        return `O livro "${livro.titulo}" foi devolvido por ${this.nome}.`;
    }
}

const usuarios = [
    {
        nome: 'Bianca',
        livros_emprestados: []
    },
    {
        nome: 'Soni',
        livros_emprestados: []
    },
    {
        nome: 'Carlos',
        livros_emprestados: []
    },
    {
        nome: 'Ana',
        livros_emprestados: []
    },
    {
        nome: 'Livia',
        livros_emprestados: []
    }
];

console.log('\n*** EMPRESTANDO LIVRO ***');
const usuario_bianca = new Usuario('Soni');
console.log(usuario_bianca.emprestarLivro(new Livro('1984', 'George Orwell', 1949)));
console.log(usuario_bianca.detalhesDoUsario());

console.log('\n*** DEVOLVENDO LIVRO ***');
console.log(usuario_bianca.devolverLivro(new Livro('1984', 'George Orwell', 1949)));
console.log(usuario_bianca.detalhesDoUsario());

class Biblioteca{
  constructor( livros = [], usuarios = [] ){
    this.livros = livros;
    this.usuarios = usuarios;
  }

    adicionarLivro(livro){
        const original = this.livros.find(l => l.titulo.toLowerCase() === String(livro.titulo).toLowerCase());
        if (!original){
            this.livros.push(livro);
        }
        else{
            return `O livro "${livro.titulo}" já existe na biblioteca.`;
        }
    }

    adicionarUsuario(usuario){
        const entidade = this.usuarios.find(u => u.nome.toLowerCase() === String(usuario.nome).toLowerCase());
        if (!entidade){
            this.usuarios.push(usuario);
        }
        else{
            return `O usuário "${usuario.nome}" já está registrado na biblioteca.`;
        }
    }

    listarLivrosDisponiveis(){
        const livrosDisponiveis = this.livros.filter(l => l.disponivel);
        if (livrosDisponiveis.length === 0){
            return 'Nenhum livro disponível na biblioteca.';
        }
        return livrosDisponiveis
            .map(l => `LIVRO: ${l.titulo}, escrito por ${l.autor} em ${l.ano} — Disponível.`)
            .join('\n');    }

    buscarLivroPorTitulo(titulo){
        const livro = this.livros.find(l => l.titulo.toLowerCase() === String(titulo).toLowerCase());
        if (livro){  
            const status = livro.disponivel ? 'Disponível' : 'Indisponível';
            return `LIVRO: ${livro.titulo}, está ${status}.`;
        } else {
            return `O livro "${titulo}" não foi encontrado na biblioteca.`;
        }
    }


    emprestarLivro(titulo_livro, nome_usuario){
        const original = this.livros.find(l => l.titulo.toLowerCase() === String(titulo_livro).toLowerCase());
        const entidade = this.usuarios.find(u => u.nome.toLowerCase() === String(nome_usuario).toLowerCase());
        
        if (!entidade){
            return `O usuário "${nome_usuario}" não está registrado na biblioteca.`;
        }
        if (!original){
            return `O livro "${titulo_livro}" não pertence à biblioteca.`;
        }
        if (!original.disponivel){
            return `O livro "${titulo_livro}" não está disponível para empréstimo.`;
        }

        original.disponivel = false;
        entidade.livros_emprestados.push(original.titulo);
        return `O livro "${titulo_livro}" foi emprestado para ${nome_usuario}.`;
    }

    devolverLivro(titulo, nomeUsuario){
        const original = this.livros.find(l => l.titulo.toLowerCase() === String(titulo).toLowerCase());
        const entidade = this.usuarios.find(u => u.nome.toLowerCase() === String(nomeUsuario).toLowerCase());
        
        if (!entidade){
            return `O usuário "${nomeUsuario}" não está registrado na biblioteca.`;
        }
        if (!original){
            return `O livro "${titulo}" não pertence à biblioteca.`;
        }
        if (original.disponivel){
            return `O livro "${titulo}" já está disponível na biblioteca.`;
        }

        const idx = entidade.livros_emprestados.indexOf(original.titulo);
        if (idx === -1){
            return `O livro "${titulo}" não está na lista de emprestados de ${nomeUsuario}.`;
        }

    
        original.disponivel = true;
        entidade.livros_emprestados.splice(idx, 1);
        return `O livro "${titulo}" foi devolvido por ${nomeUsuario}.`;
    }

}

const biblioteca = new Biblioteca(livros, usuarios);
const novoLivro = new Livro('A Revolução dos Bichos', 'George Orwell', 1945);
console.log(biblioteca.adicionarLivro(novoLivro));
const novoUsuario = new Usuario('Marcos');
console.log(biblioteca.adicionarUsuario(novoUsuario));
console.log('\n*** LISTA DE LIVROS DISPONÍVEIS ***');
console.log(biblioteca.listarLivrosDisponiveis());
console.log('\n*** BUSCAR LIVRO POR TÍTULO ***');
console.log(biblioteca.buscarLivroPorTitulo('O Pequeno Príncipe'));
console.log('\n*** EMPRESTAR LIVRO ***');
console.log(biblioteca.emprestarLivro('O Pequeno Príncipe', 'Marcos'));
console.log(biblioteca.emprestarLivro('Harry Potter e a Pedra Filosofal', 'Ana'));
console.log(biblioteca.emprestarLivro('O Senhor dos Anéis', 'Livia'));
console.log('\n*** DEVOLVER LIVRO ***');
console.log(biblioteca.devolverLivro('O Pequeno Príncipe', 'Marcos'));

const mapeando_usarios = usuarios.map(u => new Usuario(u.nome, u.livros_emprestados));
console.log('\n*** DETALHES DOS USUÁRIOS ***');
mapeando_usarios.forEach(u => console.log(u.detalhesDoUsario()));

