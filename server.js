const express = require('express');
const app = express();
const routes = express.Router();

// Armazena o último estado da bomba e sensor
let estadoBomba = 'DESLIGADA';
let estadoSensor = 'ÚMIDO';
let historicoEstados = [];


routes.get('/teste/:sensor', (req, res) => {
    const valor = parseInt(req.params.sensor);
    
    // Interpreta o valor: 0 = seco (bomba ligada), 1 = úmido (bomba desligada)
    if (valor === 0) {
        estadoSensor = 'SECO';
        estadoBomba = 'LIGADA';
    } else if (valor === 1) {
        estadoSensor = 'ÚMIDO';
        estadoBomba = 'DESLIGADA';
    } else {
        estadoSensor = 'DESCONHECIDO';
        estadoBomba = 'ERRO';
    }
    
    // Mantém histórico dos últimos 50 valores
    historicoEstados.push({
        sensor: estadoSensor,
        bomba: estadoBomba,
        timestamp: new Date().toLocaleTimeString('pt-BR')
    });
    if (historicoEstados.length > 50) {
        historicoEstados.shift();
    }
    
    console.log('Sensor:', estadoSensor, '| Bomba:', estadoBomba, '| Horário:', new Date().toLocaleTimeString('pt-BR'));
    
    res.send(`
        <html>
        <head><meta charset="UTF-8"></head>
        <body style="font-family: Arial; text-align: center; padding: 40px; background: #f4f7fa;">
        <h1>✓ Dados recebidos</h1>
        <p><strong>Sensor do Solo:</strong> ${estadoSensor}</p>
        <p><strong>Bomba de Irrigação:</strong> ${estadoBomba}</p>
        <p style="color: #888; font-size: 0.9em;">Horário: ${new Date().toLocaleTimeString('pt-BR')}</p>
        <hr>
        <p style="font-size: 0.85em; color: #666;">Painel disponível em: <a href="http://localhost:3000">http://localhost:3000</a></p>
        </body>
        </html>
    `);
});

// Rota para obter o estado atual (para o dashboard)
routes.get('/api/umidade', (req, res) => {
    res.json({ 
        sensor: estadoSensor,
        bomba: estadoBomba,
        historico: historicoEstados 
    });
});

// Rota para obter histórico completo
routes.get('/api/historico', (req, res) => {
    res.json(historicoEstados);
});

// Rota para limpar histórico
routes.get('/api/limpar', (req, res) => {
    historicoEstados = [];
    res.json({ mensagem: 'Histórico limpo com sucesso' });
});

// Servir arquivos estáticos do dashboard
app.use(express.static(__dirname));

app.use('/', routes);

app.listen(3000, () => {
    console.log('\n====================================');
    console.log('🚀 Servidor rodando em http://localhost:3000');
    console.log('⏳ Aguardando dados do ESP8266...');
    console.log('====================================\n');
});
