const btnAddTarefa = document.querySelector("#add_tarefa")
const lstAFazer = document.querySelector("#a_fazer")
const lstFeito = document.querySelector("#feito")
let listaAFazerEstaVazia = true
let listaFeitoEstaVazia = true

const adicionarTarefa = function(event) {
    event.preventDefault()

    const textoTarefa = document.querySelector("#tarefa").value

    if (textoTarefa.length < 1) {
        return;
    }

    const novaTarefa = document.createElement("li")
    const iconeNovaTarefa = document.createElement("i")
    const textoNovaTarefa = document.createElement("span")
    
    iconeNovaTarefa.className = "fa fa-square-o"
    textoNovaTarefa.innerText = textoTarefa

    novaTarefa.appendChild(iconeNovaTarefa)
    novaTarefa.appendChild(textoNovaTarefa)
    lstAFazer.appendChild(novaTarefa)

    if(listaAFazerEstaVazia) {
        const itemVazio = lstAFazer.firstElementChild
        lstAFazer.removeChild(itemVazio)
    }

    listaAFazerEstaVazia = false
}

const moverParaFeito = function(ev) {
    let tarefa = {}
    let textoTarefa = "inválido"

    if(ev.target.nodeName.toLowerCase() === "i") {
        tarefa = ev.target.parentElement
        textoTarefa = ev.target.nextElementSibling.innerText
    } else if (ev.target.nodeName.toLowerCase() === "li") {
        tarefa = ev.target
        textoTarefa = ev.target.lastChild.innerText
    } else if (ev.target.nodeName.toLowerCase() === "span") {
        tarefa = ev.target.parentElement
        textoTarefa = ev.target.innerText
    } else {
        return;
    }

    if( tarefa.classList.contains("lista-vazia"))
        return;

    const novaTarefa = document.createElement("li")
    const iconeNovaTarefa = document.createElement("i")
    const textoNovaTarefa = document.createElement("span")
    
    iconeNovaTarefa.className = "fa fa-check-square-o"
    textoNovaTarefa.innerText = textoTarefa

    novaTarefa.appendChild(iconeNovaTarefa)
    novaTarefa.appendChild(textoNovaTarefa)
    lstFeito.appendChild(novaTarefa)

    lstAFazer.removeChild(tarefa)
    listaVazia("Adicione tarefas à lista")
    limparListaFeito()
}

const listaVazia = function(texto) {

    if(lstAFazer.childElementCount === 0) {
        const textoTarefa = texto || "Adicione tarefas à lista"

        const novaTarefa = document.createElement("li")
        
        novaTarefa.innerText = textoTarefa

        novaTarefa.classList.add("lista-vazia")
        novaTarefa.onclick = function(e) {
            e.stopPropagation()
            return false
        }

        lstAFazer.appendChild(novaTarefa)
        listaAFazerEstaVazia = true
    }
}

const limparListaFeito = function() {
    if(listaFeitoEstaVazia) {
        const itemVazio = lstFeito.querySelector(".lista-vazia")

        lstFeito.removeChild(itemVazio)
        listaFeitoEstaVazia = false
    }
}

btnAddTarefa.addEventListener("click", adicionarTarefa)

lstAFazer.addEventListener("click", moverParaFeito)