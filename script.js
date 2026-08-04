// Passo 2: Selecionar os elementos do DOM
const inputCep = document.querySelector('#cep');
const btnBuscar = document.querySelector('#buscar');
const divResultado = document.querySelector('#resultado');

// Passo 2: Escutar o clique no botão para iniciar a busca
btnBuscar.addEventListener('click', buscarCEP);

// Passo 3: Criar a função assíncrona usando o padrão moderno (async)
async function buscarCEP() {
    // Captura o valor digitado pelo usuário
    const cepDigitado = inputCep.value.trim();

    // Validação básica local para evitar requisições vazias
    if (!cepDigitado) {
        divResultado.innerHTML = "<p class='erro'>Por favor, digite um CEP.</p>";
        return;
    }

    // Passo 4: O Feedback de Carregamento (UX)
    divResultado.innerHTML = "<p class='loading'>Carregando...</p>";

    // Passo 5 e 7: Envolver o código no bloco try/catch para gerenciar erros
    try {
        // Montar a URL dinâmica usando Template Literals
        const url = `https://viacep.com.br/ws/${cepDigitado}/json/`;

        // Faz a requisição HTTP com fetch() e espera pela resposta (await)
        const resposta = await fetch(url);
       
        // Converte a resposta em formato de texto para um objeto JavaScript (JSON)
        const dados = await resposta.json();

        // Passo 6: Atualizando a Interface e tratando CEPs válidos mas inexistentes
        if (dados.erro) {
            divResultado.innerHTML = "<p class='erro'>CEP não encontrado.</p>";
        } else {
            // Se tudo estiver certo, renderiza as informações tratadas do endereço no DOM
            divResultado.innerHTML = `
                <div class="endereco-card">
                    <p><strong>Logradouro:</strong> ${dados.logradouro || 'Não informado'}</p>
                    <p><strong>Bairro:</strong> ${dados.bairro || 'Não informado'}</p>
                    <p><strong>Cidade:</strong> ${dados.localidade}</p>
                    <p><strong>Estado:</strong> ${dados.uf}</p>
                </div>
            `;
        }

    } catch (error) {
        // Passo 7: Trata falhas de rede de forma graciosa (ex: internet caiu ou API fora do ar)
        divResultado.innerHTML = "<p class='erro'>Erro ao buscar o CEP. Tente novamente mais tarde.</p>";
        console.error("Detalhes do erro:", error);
    }
}