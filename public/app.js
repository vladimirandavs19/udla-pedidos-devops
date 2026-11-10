const serviceStatus = document.querySelector('#service-status');
const serviceText = document.querySelector('#service-text');
const ordersBody = document.querySelector('#orders-body');

fetch('/health')
  .then((response) => {
    if (!response.ok) throw new Error('Servicio no disponible');
    serviceStatus.classList.add('online');
    serviceText.textContent = 'Servicio activo';
  })
  .catch(() => {
    serviceStatus.classList.add('offline');
    serviceText.textContent = 'Servicio no disponible';
  });

fetch('/api/orders')
  .then((response) => {
    if (!response.ok) throw new Error('Pedidos no disponibles');
    return response.json();
  })
  .then((orders) => {
    document.querySelector('#total-count').textContent = orders.length;
    document.querySelector('#confirmed-count').textContent = orders.filter((order) => order.status === 'Confirmado').length;
    document.querySelector('#pending-count').textContent = orders.filter((order) => order.status === 'Pendiente').length;
    document.querySelector('#order-count').textContent = `${orders.length} pedidos`;
    ordersBody.textContent = '';

    orders.forEach((order) => {
      const row = ordersBody.insertRow();
      row.insertCell().textContent = order.id;

      const customer = document.createElement('div');
      customer.className = 'customer';
      const avatar = document.createElement('span');
      avatar.className = 'avatar';
      avatar.setAttribute('aria-hidden', 'true');
      avatar.textContent = order.customer.split(' ').map((name) => name[0]).slice(0, 2).join('');
      const name = document.createElement('span');
      name.textContent = order.customer;
      customer.append(avatar, name);
      row.insertCell().append(customer);

      const badge = document.createElement('span');
      badge.className = `badge ${order.status === 'Confirmado' ? 'confirmed' : 'pending'}`;
      badge.textContent = order.status;
      row.insertCell().append(badge);

      const total = row.insertCell();
      total.className = 'amount';
      total.textContent = new Intl.NumberFormat('es-EC', { style: 'currency', currency: 'USD' }).format(order.total);
    });
  })
  .catch(() => {
    ordersBody.innerHTML = '<tr><td class="table-message" colspan="4">No se pudieron cargar los pedidos.</td></tr>';
  });