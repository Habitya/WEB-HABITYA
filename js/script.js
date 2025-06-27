// js/script.js

// Chatbot toggle
function toggleAsistente() {
  document.getElementById('asistente-virtual').classList.toggle('hidden');
}

// Send chat message stub
function enviarMensaje() {
  const cont = document.getElementById('contenedor-chat');
  const input = document.getElementById('input-chat');
  const texto = input.value.trim();
  if (!texto) return;

  // Usuario
  const usr = document.createElement('div');
  usr.textContent = 'Tú: ' + texto;
  usr.style.textAlign = 'right';
  usr.style.marginBottom = '0.5rem';
  cont.appendChild(usr);

  input.value = '';
  cont.scrollTop = cont.scrollHeight;

  // Respuesta del asistente
  setTimeout(() => {
    const resp = document.createElement('div');
    resp.textContent = 'Asistente: Procesando...';
    resp.style.marginBottom = '0.5rem';
    cont.appendChild(resp);
    cont.scrollTop = cont.scrollHeight;
  }, 500);
}

// ---------------------------
// Inquilino: login & chart
// ---------------------------
const tenants = { tenant: 'tenant123' };

function loginInquilino(e) {
  e.preventDefault();
  const u = document.getElementById('tenant-user').value;
  const p = document.getElementById('tenant-pass').value;

  if (tenants[u] === p) {
    document.getElementById('login-box').classList.add('hidden');
    document.getElementById('dashboard-inquilino').classList.remove('hidden');
    initProgressChart();
  } else {
    alert('Credenciales inquilino incorrectas');
  }
}

function initProgressChart() {
  const total = 750 * 12;
  const paid = 750 * 4;
  const rem = total - paid;

  document.getElementById('paidAmount').textContent = '€' + paid;
  document.getElementById('remainingAmount').textContent = '€' + rem;

  new Chart(document.getElementById('progressChart'), {
    type: 'doughnut',
    data: {
      labels: ['Pagado', 'Restante'],
      datasets: [{
        data: [paid, rem],
        backgroundColor: ['var(--brand-secondary)', 'rgba(0,0,0,0.1)'],
      }]
    },
    options: {
      cutout: '70%',
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}

function mostrarFacturas() {
  const invs = JSON.parse(localStorage.getItem('invoices') || '[]');
  const ul = document.getElementById('invoices');
  ul.innerHTML = '';
  if (!invs.length) {
    ul.innerHTML = '<li>No hay facturas.</li>';
  } else {
    invs.forEach(i => {
      const li = document.createElement('li');
      li.textContent = `${i.date} - €${i.amount} (${i.description})`;
      ul.appendChild(li);
    });
  }
  document.getElementById('invoice-list').classList.remove('hidden');
}

function solicitarServicioInquilino() {
  alert('Función de servicio inquilino');
}

// ---------------------------
// Propietario: login & chart
// ---------------------------
const owners = { owner: 'owner123' };

function loginOwner(e) {
  e.preventDefault();
  const u = document.getElementById('owner-user').value;
  const p = document.getElementById('owner-pass').value;

  if (owners[u] === p) {
    document.getElementById('login-owner').classList.add('hidden');
    document.getElementById('dashboard-owner').classList.remove('hidden');
    initIncomeChart();
  } else {
    alert('Credenciales propietario incorrectas');
  }
}

function initIncomeChart() {
  const ti = 750 * 12;
  const pi = 750 * 2;

  document.getElementById('totalIncome').textContent = '€' + ti;
  document.getElementById('pendingIncome').textContent = '€' + pi;

  new Chart(document.getElementById('incomeChart'), {
    type: 'doughnut',
    data: {
      labels: ['Ingresos', 'Pendiente'],
      datasets: [{
        data: [ti, pi],
        backgroundColor: ['var(--brand-secondary)', 'rgba(0,0,0,0.1)'],
      }]
    },
    options: {
      cutout: '70%',
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}

function verContratos() {
  alert('Redirigiendo a contratos...');
}

function manageProperties() {
  alert('Abriendo panel de gestión de propiedades...');
}

function scheduleMaintenance() {
  alert('Abriendo calendario de mantenimiento...');
}

// ---------------------------
// Modal de facturas
// ---------------------------
function openModal() {
  document.getElementById('invoice-modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('invoice-modal').classList.add('hidden');
  document.getElementById('modal-amount').value = '';
  document.getElementById('modal-desc').value = '';
}

function submitInvoice() {
  const amount = document.getElementById('modal-amount').value;
  const desc = document.getElementById('modal-desc').value;
  if (!amount || !desc) {
    alert('Rellena los campos');
    return;
  }
  const invs = JSON.parse(localStorage.getItem('invoices') || '[]');
  invs.push({
    date: new Date().toLocaleDateString(),
    amount,
    description: desc
  });
  localStorage.setItem('invoices', JSON.stringify(invs));
  closeModal();
  alert('Factura subida correctamente');
}
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
// Cambia la clase 'scrolled' según posición de scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 30) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
