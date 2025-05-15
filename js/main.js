'use strict'

import { getContatos, getContatosPorNome, postContato } from "./contato.js";
import { uploadImageToAzure } from "./uploadImageToAzure.js"; // Corrigido para importar do arquivo correto

async function handleUploadImage() {
    const uploadParams = {
        file: document.getElementById('foto').files[0],
        storageAccount: 'tutorialuploadzumba',
        sasToken: 'sp=racwl&st=2025-05-15T12:21:08Z&se=2025-05-15T20:21:08Z&sv=2024-11-04&sr=c&sig=lHuCrChE1JDhVmqID7gmqPPl1AJR8mlOd8zLpRk5Yqk%3D',
        containerName: 'fotos',
    };

    await uploadImageToAzure(uploadParams);
}

function criarCard (contato) {
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

async function exibirContatos () {
    const container = document.getElementById('container')
    const contatos = await getContatos()
    container.replaceChildren()
    contatos.forEach(criarCard)
}

async function exibirPesquisa (evento) {
    const container = document.getElementById('container')
    if (evento.key == 'Enter') {
        const contatos = await getContatosPorNome(evento.target.value)
        container.replaceChildren()
        contatos.forEach(criarCard)
    }
    
}

function cadastroContato () {
    document.querySelector('main').className = 'form-show'
}

function voltarHome () {
    document.querySelector('main').className = 'card-show'
}
async function salvarContato () {
    const contato = {
            "nome": document.getElementById('nome').value,
            "celular": document.getElementById('celular').value,
            "foto": document.getElementById('foto').value,
            "email": document.getElementById('email').value,
            "endereco": document.getElementById('endereco').value,
            "cidade": document.getElementById('cidade').value
        }

        if (await postContato(contato)){
            await exibirContatos()
            voltarHome()
            alert ('Cadastro realizado com sucesso!!!')
        }
        
}

exibirContatos()

document.getElementById('pesquisar')
        .addEventListener('keydown',exibirPesquisa)

document.getElementById('novo-contato')
        .addEventListener('click', cadastroContato)

document.getElementById('cancelar')
        .addEventListener('click', voltarHome)

document.getElementById('salvar')
        .addEventListener('click', salvarContato)