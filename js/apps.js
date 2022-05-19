const btnAddTarefa = document.querySelector("#add_tarefa")
const lstAFazer = document.querySelector("#a-fazer")
const lstFeito = document.querySelector("#feito")
let listaAFazerEstaVazia = true
let listaFeitoEstaVazia = true

document.querySelector("#tarefa").focus()

const adicionarTarefa = function(event = null, el = false) {
    if(event) event.preventDefault()

    const textoTarefa = el || document.querySelector("#tarefa").value

    if (textoTarefa.length < 1) {
        return;
    }

    const novaTarefa = document.createElement("li")
    const iconeNovaTarefa = document.createElement("i")
    const textoNovaTarefa = document.createElement("span")
    
    iconeNovaTarefa.className = "fa fa-square-o"
    textoNovaTarefa.innerText = textoTarefa

    const iconeEditarTarefa = document.createElement("i")
    iconeEditarTarefa.className = "fa fa-edit edit-icon" 

    iconeEditarTarefa.onclick = function(e) {
        e.preventDefault()
        e.stopPropagation()
        document.querySelector("#tarefa").value = iconeEditarTarefa.parentElement.innerText
        document.querySelector("#tarefa").focus()
        lstAFazer.removeChild(e.target.parentElement)
        localStorage.setItem('lista-a-fazer', toJSON(lstAFazer))
        listaVazia("Adicione tarefas à lista")
    }

    novaTarefa.appendChild(iconeEditarTarefa)

    novaTarefa.appendChild(iconeNovaTarefa)
    novaTarefa.appendChild(textoNovaTarefa)
    lstAFazer.appendChild(novaTarefa)

    if(listaAFazerEstaVazia) {
        const itemVazio = lstAFazer.firstElementChild
        lstAFazer.removeChild(itemVazio)
    }

    listaAFazerEstaVazia = false
    document.querySelector("#tarefa").value = ""
    document.querySelector("#tarefa").focus()

    localStorage.setItem('lista-a-fazer', toJSON(lstAFazer))
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
    const iconeDeleteTarefa = document.createElement("i")
    
    iconeNovaTarefa.className = "fa fa-check-square-o"
    textoNovaTarefa.innerText = textoTarefa
    iconeDeleteTarefa.className = "fa fa-trash-o delete-icon"

    iconeNovaTarefa.onclick = function() {
        const tarefa = this.parentElement
        adicionarTarefa(null, tarefa.innerText)
        localStorage.setItem('lista-a-fazer', toJSON(lstAFazer))
        tarefa.querySelector(".delete-icon").click()
    }

    novaTarefa.appendChild(iconeNovaTarefa)
    novaTarefa.appendChild(textoNovaTarefa)
    novaTarefa.appendChild(iconeDeleteTarefa)

    limparListaFeito()
    lstFeito.appendChild(novaTarefa)

    // Salvar no LocalStorage
    localStorage.setItem('lista-feito', toJSON(lstFeito))

    /* Anexar avento de remover tarefa feita */
    iconeDeleteTarefa.addEventListener("click", removerFeito)
    lstAFazer.removeChild(tarefa)
        
    // Salvar no LocalStorage
    localStorage.setItem('lista-a-fazer', toJSON(lstAFazer))
    listaVazia("Adicione tarefas à lista")
}

const listaVazia = function(texto) {

    if(lstAFazer.childElementCount === 0) {
        const textoTarefa = texto || "Adicione tarefas à lista"

        const novaTarefa = document.createElement("li")
        const iconeListaVazia = document.createElement("i")

        iconeListaVazia.classList.add("fa")
        iconeListaVazia.classList.add("fa-file-text")

        novaTarefa.innerText = textoTarefa

        novaTarefa.classList.add("lista-vazia")
        novaTarefa.onclick = function(e) {
            e.stopPropagation()
            return false
        }
        
        novaTarefa.appendChild(iconeListaVazia)
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

const removerFeito = function(ev) {
    const item = ev.target.parentElement
    lstFeito.removeChild(item)

    // Salvar no LocalStorage
    localStorage.setItem('lista-feito', toJSON(lstFeito))

    if(lstFeito.childElementCount === 0) {
        const textoTarefa = "As tarefas concluídas foram removidas"

        const novaTarefa = document.createElement("li")
        const iconeListaVazia = document.createElement("i")

        iconeListaVazia.classList.add("fa")
        iconeListaVazia.classList.add("fa-file-text-o")
        
        novaTarefa.innerText = textoTarefa

        novaTarefa.classList.add("lista-vazia")
        novaTarefa.onclick = function(e) {
            e.stopPropagation()
            return false
        }

        novaTarefa.appendChild(iconeListaVazia)
        lstFeito.appendChild(novaTarefa)
        listaFeitoEstaVazia = true
    }
}

// Criar método para converter lista em objeto JSON
const toJSON = function(HTMLObject) {
    array_of_html = []
    for(let x of HTMLObject.children)
        array_of_html.push(x.innerText)

    return JSON.stringify(array_of_html)
}

// LocalStorage Suporte
if (localStorage.getItem('lista-a-fazer')) {
    const HTMLObject = JSON.parse(localStorage.getItem('lista-a-fazer'))
    for(let li of HTMLObject) {
        adicionarTarefa(null, li)
    }
}
if (localStorage.getItem('lista-feito')) {
    const HTMLObject = JSON.parse(localStorage.getItem('lista-feito'))
    for(let li of HTMLObject) {
        const novaTarefa = document.createElement("li")
        const iconeNovaTarefa = document.createElement("i")
        const textoNovaTarefa = document.createElement("span")
        const iconeDeleteTarefa = document.createElement("i")
        
        iconeNovaTarefa.className = "fa fa-check-square-o"
        textoNovaTarefa.innerText = li
        iconeDeleteTarefa.className = "fa fa-trash-o delete-icon"

        iconeNovaTarefa.onclick = function() {
            const tarefa = this.parentElement
            adicionarTarefa(null, tarefa.innerText)
            localStorage.setItem('lista-a-fazer', toJSON(lstAFazer))
            tarefa.querySelector(".delete-icon").click()
        }

        novaTarefa.appendChild(iconeNovaTarefa)
        novaTarefa.appendChild(textoNovaTarefa)
        novaTarefa.appendChild(iconeDeleteTarefa)

        limparListaFeito()
        lstFeito.appendChild(novaTarefa)
        /* Anexar avento de remover tarefa feita */
        iconeDeleteTarefa.addEventListener("click", removerFeito)
    }
}

btnAddTarefa.addEventListener("click", adicionarTarefa)

lstAFazer.addEventListener("click", moverParaFeito)