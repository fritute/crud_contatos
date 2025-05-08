'use strict'

import { getContatos, getContatosPorNome } from './contato.js'

function criarCard(contato){
    const container = document.getElementById('container')
    const card = document.createElement('div')
    card.classList.add('card-contato')
    card.innerHTML = `
        <img src="${contato.foto}" alt="">
        <h2>${contato.nome}</h2>
        <p>${contato.celular}</p>
    `
    container.appendChild(card)
}

async function exibirContatos(){
    const contatos = await getContatos()
    contatos.forEach(criarCard)
} 

 async function exibirPesquisa(evento){
    if(evento.key == 'Enter'){
       const contatos = await getContatosPorNome(evento.target.value)
       container.replaceChildren()
       contatos.forEach(criarCard)
    }
}
function cadastroContato(){
    document.querySelector('main').className = 'form-show'
}
function voltarHome(){
    document.querySelector('main').className = 'card-show'
}
exibirContatos()

document.getElementById('pesquisar')
document.addEventListener('keydown', exibirPesquisa);

document.getElementById('novo-contato')
        .addEventListener('click', cadastroContato)

document.getElementById('cancelar')
        .addEventListener('click', voltarHome)

document.getElementById('salvar')
        .addEventListener('click', salvarContato)
