async function getStockData() {
    const symbol = document.getElementById('symbol').value;
    if (!symbol) {
        alert('Por favor, insira o símbolo da ação.');
        return;
    }

    document.getElementById('loading').style.display = 'block';
    document.getElementById('stock-info').style.display = 'none';

    try {
        const response = await fetch(`http://localhost:3000/api/stock?symbol=${symbol}`);
        const data = await response.json();
        
        if (data.length === 0 || response.status !== 200) {
            alert('Ação não encontrada ou erro na API');
            document.getElementById('loading').style.display = 'none';
            return;
        }

        const stock = data[0];

        document.getElementById('stock-name').innerText = stock.name;
        document.getElementById('stock-price').innerText = stock.price.toFixed(2);
        document.getElementById('stock-change').innerText = stock.changesPercentage.toFixed(2);
        document.getElementById('stock-dayHigh').innerText = stock.dayHigh.toFixed(2);
        document.getElementById('stock-dayLow').innerText = stock.dayLow.toFixed(2);

        document.getElementById('stock-info').style.display = 'block';
    } catch (error) {
        alert('Erro ao buscar dados.');
    }

    document.getElementById('loading').style.display = 'none';
}