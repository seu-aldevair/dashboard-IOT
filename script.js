document.getElementById('homeBtn').onclick = function() {
    document.getElementById('homeBtn').classList.add('active');
    document.getElementById('dashBtn').classList.remove('active');
    document.getElementById('dashboardContent').style.display = 'none';
    document.getElementById('emptyContent').style.display = 'block';
    document.getElementById('breadcrumbs').style.visibility = 'hidden';
    document.getElementById('mainTitle').style.display = 'none';
    document.getElementById('headerBar').textContent = 'INÍCIO';
    if (document.getElementById('sidebarPage')) {
        document.getElementById('sidebarPage').textContent = '| INÍCIO';
    }
};

document.getElementById('dashBtn').onclick = function() {
    document.getElementById('dashBtn').classList.add('active');
    document.getElementById('homeBtn').classList.remove('active');
    document.getElementById('dashboardContent').style.display = 'flex';
    document.getElementById('emptyContent').style.display = 'none';
    document.getElementById('breadcrumbs').style.visibility = 'visible';
    document.getElementById('mainTitle').style.display = 'none';
    document.getElementById('headerBar').textContent = 'PAINEL';
    if (document.getElementById('sidebarPage')) {
        document.getElementById('sidebarPage').textContent = '| PAINEL';
    }
};

// Estado inicial: INÍCIO ativo
window.onload = function() {
    document.getElementById('homeBtn').classList.add('active');
    document.getElementById('dashBtn').classList.remove('active');
    document.getElementById('dashboardContent').style.display = 'none';
    document.getElementById('emptyContent').style.display = 'block';
    document.getElementById('breadcrumbs').style.visibility = 'hidden';
    document.getElementById('mainTitle').style.display = 'none';
    document.getElementById('headerBar').textContent = 'INÍCIO';
    if (document.getElementById('sidebarPage')) {
        document.getElementById('sidebarPage').textContent = '| INÍCIO';
    }
    atualizarUmidade();
};

// Função para atualizar estado da bomba em tempo real
function atualizarUmidade() {
    fetch('/api/umidade')
        .then(response => response.json())
        .then(data => {
            const estadoBomba = data.bomba;
            const estadoSensor = data.sensor;
            
            // Atualiza o valor exibido
            const valorElement = document.getElementById('umidadeValor');
            if (valorElement) {
                valorElement.textContent = estadoBomba;
            }
            
            // Atualiza a cor da barra conforme o estado
            const barraElement = document.getElementById('umidadeBar');
            if (barraElement) {
                if (estadoBomba === 'LIGADA') {
                    barraElement.style.height = '100%';
                    barraElement.style.background = 'linear-gradient(180deg, #ff6b6b 0%, #d63031 100%)';
                } else if (estadoBomba === 'DESLIGADA') {
                    barraElement.style.height = '20%';
                    barraElement.style.background = 'linear-gradient(180deg, #00eaff 0%, #1976d2 100%)';
                } else {
                    barraElement.style.height = '0%';
                }
            }
            
            // Atualiza timestamp
            const timestampElement = document.getElementById('ultimaAtualizacao');
            if (timestampElement) {
                timestampElement.textContent = new Date().toLocaleTimeString('pt-BR');
            }
        })
        .catch(error => console.log('Erro ao atualizar:', error));
}

// Atualiza a cada 2 segundos quando estiver na página de PAINEL
setInterval(() => {
    if (document.getElementById('dashboardContent').style.display === 'flex') {
        atualizarUmidade();
    }
}, 2000);
