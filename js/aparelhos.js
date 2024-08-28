document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const comodo = params.get('comodo');
    
    if (comodo) {
        const table = document.getElementById('aparelhoTable').getElementsByTagName('tbody')[0];
        const appliances = appliancesByRoom[comodo] || [];

        appliances.forEach(appliance => {
            const newRow = table.insertRow();
            newRow.insertCell(0).textContent = appliance;
        });
    }
});
