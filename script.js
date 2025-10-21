document.getElementById('homeBtn').onclick = function() {
    document.getElementById('homeBtn').classList.add('active');
    document.getElementById('dashBtn').classList.remove('active');
    document.getElementById('dashboardContent').style.display = 'none';
    document.getElementById('emptyContent').style.display = 'block';
    document.getElementById('breadcrumbs').style.visibility = 'hidden';
    document.getElementById('mainTitle').style.display = 'none';
    document.getElementById('headerBar').textContent = 'INÍCIO';
};

document.getElementById('dashBtn').onclick = function() {
    document.getElementById('dashBtn').classList.add('active');
    document.getElementById('homeBtn').classList.remove('active');
    document.getElementById('dashboardContent').style.display = 'flex';
    document.getElementById('emptyContent').style.display = 'none';
    document.getElementById('breadcrumbs').style.visibility = 'visible';
    document.getElementById('mainTitle').style.display = 'none';
    document.getElementById('headerBar').textContent = 'PAINEL';
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
};
