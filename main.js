addEventListener('load', () => {
    const form = document.querySelector("#nova-tarefa");
    const input = document.querySelector("#input-nova-tarefa");
    const lista_el = document.querySelector("#tarefas");
    const tarefas = localStorage.getItem('tarefas') !== null ? JSON.parse(localStorage.getItem('tarefas')) : [];

    const CriarTarefa = (tarefa) => {
        const tarefa_el = document.createElement("div");
        tarefa_el.classList.add("tarefa");

        const content = document.createElement("div");
        content.classList.add("content");

        tarefa_el.appendChild(content);

        const tarefa_input = document.createElement("input");
        tarefa_input.classList.add("text");
        tarefa_input.type = "text";
        tarefa_input.value = tarefa;
        tarefa_input.setAttribute("readonly", "readonly");

        content.appendChild(tarefa_input);

        const tarefa_acoes = document.createElement("div");
        tarefa_acoes.classList.add("acoes");

        const editar = document.createElement("button");
        editar.classList.add("editar");
        editar.innerHTML = "Editar";

        const deletar = document.createElement("button");
        deletar.classList.add("deletar");
        deletar.innerHTML = "Deletar";

        tarefa_acoes.appendChild(editar);
        tarefa_acoes.appendChild(deletar);

        tarefa_el.appendChild(tarefa_acoes);

        editar.addEventListener('click', () => {
            if (editar.innerText.toLowerCase() == "editar") {
                tarefa_input.removeAttribute("readonly");
                tarefa_input.focus();
                editar.innerText = "Salvar";
            } else {
                tarefa_input.setAttribute("readonly", "readonly");
                editar.innerText = "Editar";

                const index = Array.from(tarefa_el.parentNode.children).indexOf(tarefa_el);
                tarefas[index] = tarefa_input.value;

                localStorage.setItem('tarefas', JSON.stringify(tarefas));
            }
        });

        deletar.addEventListener('click', () => {
            const index = Array.from(tarefa_el.parentNode.children).indexOf(tarefa_el);

            tarefas.splice(index, 1);
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
            lista_el.removeChild(tarefa_el);
        })

        lista_el.appendChild(tarefa_el);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const tarefa = input.value;

        if (!tarefa) {
            alert("Por favor, preencha com a sua tarefa para continuar.");
            return;
        }

        CriarTarefa(tarefa);
        tarefas.push(tarefa);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        input.value = "";
    })

    if (tarefas.length > 0) {
        tarefas.forEach((value) => {
            CriarTarefa(value);
        });
    }
})