const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    mobileNav.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }));
}

document.querySelectorAll('.service-tab').forEach(tab => tab.addEventListener('click', () => {
  document.querySelectorAll('.service-tab').forEach(item => { item.classList.remove('active'); item.setAttribute('aria-selected','false'); });
  tab.classList.add('active'); tab.setAttribute('aria-selected','true');
  const category = tab.dataset.category;
  document.querySelectorAll('.service-card').forEach(card => {
    card.style.display = category === 'all' || card.dataset.category === category ? '' : 'none';
  });
}));

const form = document.querySelector('#order-form');
const result = document.querySelector('.form-result');
if (form) form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const values = Object.fromEntries(data.entries());
  const subject = `Заказ — ${values.kind || 'новый запрос'} — Хамелеон Принт`;
  const body = [
    `Имя: ${values.name || ''} ${values.surname || ''}`,
    `Телефон: ${values.phone || ''}`,
    `E-mail: ${values.email || ''}`,
    `Офис выдачи: ${values.office || ''}`,
    `Желаемая дата: ${values.date || 'не указана'}`,
    `Тип заказа: ${values.kind || ''}`,
    `Описание: ${values.details || ''}`,
    '',
    'Файл добавлю к письму вручную, если он нужен.'
  ].join('\n');
  const mailto = `mailto:gor73@hameleonprint.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  result.textContent = 'Готово: сейчас откроется письмо менеджеру. Если добавляете макет, прикрепите файл в открывшемся письме.';
  result.style.display = 'block';
  window.location.href = mailto;
});
