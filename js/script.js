// Armazena os dados dos aparelhos para cada cômodo
const appliancesByRoom = {
    'Sala': [],
    'Cozinha': [],
    'Quarto': [],
    'Banheiro': [],
    'Lavanderia': [],
    'Garagem': [],
    'Escritório': []
};

// Atualiza as opções de equipamentos com base no cômodo selecionado
document.getElementById('comodo').addEventListener('change', function() {
    const comodo = this.value;
    const descricaoSelect = document.getElementById('descricao');
    descricaoSelect.innerHTML = ''; // Limpa as opções existentes

    // Define os equipamentos para o cômodo selecionado
    const appliances = {
        'Sala': ['Luz', 'TV'],
        'Cozinha': ['Liquidificador', 'Microondas', 'Luz', 'Exaustor', 'Geladeira', 'Fogão', 'Forno'],
        'Quarto': ['Abajur', 'Luz', 'Ventilador', 'TV', 'Ar condicionado'],
        'Banheiro': ['Chuveiro', 'Luz', 'Secador de cabelo'],
        'Lavanderia': ['Máquina de lavar', 'Luz'],
        'Garagem': ['Portão eletrônico'],
        'Escritório': ['Notebook', 'Luz']
    };

    // Adiciona as opções de equipamentos relacionadas ao cômodo selecionado
    (appliances[comodo] || []).forEach(appliance => {
        const option = document.createElement('option');
        option.value = appliance;
        option.textContent = appliance;
        descricaoSelect.appendChild(option);
    });

    // Atualiza a tabela para o cômodo selecionado
    updateTable(comodo);
});

function calculateCost() {
    const comodo = document.getElementById('comodo').value;
    const descricao = document.getElementById('descricao').value;
    const quantidade = document.getElementById('quantidade').value;
    const horas = document.getElementById('horas').value;
    const potencia = document.getElementById('potencia').value;
    const bandeira = document.getElementById('bandeira').value;

    // Tarifa de energia para cada bandeira
    const tarifas = {
        'verde': 0,        // Sem custo extra
        'amarela': 18.85,  // R$ 18,85 por MWh
        'vermelha1': 44.63,// R$ 44,63 por MWh
        'vermelha2': 78.77 // R$ 78,77 por MWh
    };

    // Verifica se a bandeira tarifária é válida
    const tarifa = tarifas[bandeira] || 0;

    if (comodo && descricao && quantidade && horas && potencia) {
        // Cálculo do consumo mensal em kWh
        const dailyConsumption = (potencia * horas) / 1000; // kWh por dia
        const monthlyConsumption = dailyConsumption * 30; // kWh por mês

        // Cálculo do custo mensal em reais
        const monthlyCost = (monthlyConsumption * tarifa / 1000) * quantidade; // Convertendo MWh para kWh

        // Adiciona o novo aparelho à lista do cômodo selecionado
        appliancesByRoom[comodo].push({
            descricao,
            quantidade,
            horas,
            potencia,
            monthlyConsumption: monthlyConsumption.toFixed(2),
            monthlyCost: `R$ ${monthlyCost.toFixed(2)}`
        });

        // Atualiza a tabela para mostrar apenas os aparelhos do cômodo selecionado
        updateTable(comodo);
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function updateTable(comodo) {
    const table = document.getElementById('costTable').getElementsByTagName('tbody')[0];

    // Limpa a tabela antes de adicionar as novas linhas
    table.innerHTML = '';

    // Adiciona as linhas à tabela com base nos aparelhos do cômodo selecionado
    appliancesByRoom[comodo].forEach(appliance => {
        if (appliance.descricao) { // Verifica se a descrição está definida
            const newRow = table.insertRow();
            newRow.insertCell(0).textContent = comodo;
            newRow.insertCell(1).textContent = appliance.descricao;
            newRow.insertCell(2).textContent = appliance.quantidade;
            newRow.insertCell(3).textContent = `${appliance.horas} horas/dia`;
            newRow.insertCell(4).textContent = appliance.monthlyConsumption;
            newRow.insertCell(5).textContent = appliance.monthlyCost;
        }
    });
}
