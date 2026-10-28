/*
  Busurman Group — демонстрационный интерактивный прототип админ-панели.
  Без сервера, CRM и реального эквайринга. Все изменения хранятся локально в браузере.
  Логин демонстрационный и НЕ является механизмом безопасности.
*/
(() => {
  'use strict';

  const DATA_KEY = 'busurman_admin_wireframe_v1'; // Совместимость с данными предыдущей демо-версии
  const SESSION_KEY = 'busurman_admin_demo_session';
  const PROGRAMS = [
    {id:'batyr-joly',name:'Batyr Joly',audience:'Мужчины',duration:'3 дня',template:'Флагман',paymentModel:'Предоплата / заявка',price:null,deposit:null,status:'Опубликована',nextStep:'Наставничество',description:'Флагманская программа для мужчин.'},
    {id:'pro-life',name:'PRO LIFE',audience:'Мужчины после BJ, женщины, пары',duration:'4 дня',template:'Флагман',paymentModel:'Предоплата / заявка',price:null,deposit:null,status:'Опубликована',nextStep:'Наставничество',description:'Флагманская программа. Вкладки: мужчинам / женщинам / парам.'},
    {id:'mentoring',name:'Наставничество',audience:'Выпускники',duration:'3–4 месяца',template:'Специальный',paymentModel:'Только заявка',price:null,deposit:null,status:'Опубликована',nextStep:'Капитанство',description:'Два направления: Batyr Joly и PRO LIFE.'},
    {id:'proryv',name:'Прорыв',audience:'Мужчины и женщины',duration:'1 день',template:'Компактный',paymentModel:'Предоплата / заявка',price:null,deposit:null,status:'Опубликована',nextStep:'Флагманы',description:'Работа с истинными целями. Без обязательного мастер-класса.'},
    {id:'women',name:'Женский тренинг',audience:'Женщины',duration:'2 дня',template:'Компактный',paymentModel:'Предоплата / заявка',price:null,deposit:null,status:'Опубликована',nextStep:'PRO LIFE',description:'Можно пройти без мастер-класса.'},
    {id:'decision',name:'Точка решения',audience:'Мужчины и женщины',duration:'Интенсив',template:'Компактный',paymentModel:'Полная оплата',price:null,deposit:null,status:'Опубликована',nextStep:'Флагманы',description:'Интенсив, предусмотрены два тарифа (детали согласовать).'},
    {id:'masterclass',name:'Мастер-класс',audience:'Мужчины и женщины',duration:'3 часа',template:'Компактный',paymentModel:'Полная оплата',price:null,deposit:null,status:'Опубликована',nextStep:'Флагманы',description:'Офлайн; онлайн-версия — последующий этап.'},
    {id:'personal',name:'Личный разбор',audience:'Мужчины и женщины',duration:'Один на один',template:'Компактный',paymentModel:'Запись / оплата',price:null,deposit:null,status:'Опубликована',nextStep:'Подходящая программа',description:'Индивидуальная работа с Айдаром.'}
  ];
  const SECTIONS = [
    ['Первый экран','Слайдер, видео, ближайшее событие'],['Цифры','10 лет · 20 000+ участников · 18 городов · 10+ стран'],
    ['Флагманы','Batyr Joly и PRO LIFE'],['С чем ты приходишь?','6 направлений и программы'],
    ['Путь участника','5 ступеней от знакомства до капитана'],['Об Айдаре','Фото, история, регалии, видео'],
    ['С ним работали','Логотипы компаний'],['Видеоотзывы','Карусель видео в формате сторис'],
    ['Ближайшие события','Дата, город, программа, остаток мест'],['Не знаешь, с чего начать?','Консультация или личный разбор'],
    ['Компаниям','Корпоративные тренинги'],['Сообщество Batyr Pro','Проекты и клубы'],
    ['Медиа','YouTube, подкасты, медитации'],['Финал','Фото, форма заявки, WhatsApp']
  ];
  const bootstrap = () => ({
    programs: structuredClone(PROGRAMS),
    events: [
      {id:'evt1',programId:'batyr-joly',date:'2026-11-14',time:'10:00',city:'Астана',country:'Казахстан',venue:'Площадка уточняется',capacity:120,reserved:38,price:null,status:'Черновик'},
      {id:'evt2',programId:'pro-life',date:'2026-11-28',time:'10:00',city:'Астана',country:'Казахстан',venue:'Площадка уточняется',capacity:100,reserved:21,price:null,status:'Черновик'},
      {id:'evt3',programId:'proryv',date:'2026-12-05',time:'10:00',city:'Павлодар',country:'Казахстан',venue:'Площадка уточняется',capacity:70,reserved:12,price:null,status:'Черновик'},
      {id:'evt4',programId:'women',date:'2026-12-12',time:'10:00',city:'Астана',country:'Казахстан',venue:'Площадка уточняется',capacity:80,reserved:15,price:null,status:'Черновик'},
      {id:'evt5',programId:'masterclass',date:'2026-12-18',time:'19:00',city:'Астана',country:'Казахстан',venue:'Площадка уточняется',capacity:150,reserved:40,price:null,status:'Черновик'},
      {id:'evt6',programId:'pro-life',date:'2027-01-20',time:'10:00',city:'Лимасол',country:'Кипр',venue:'Площадка уточняется',capacity:70,reserved:7,price:null,status:'Черновик'}
    ],
    leads: [
      {id:'lead1',name:'Алексей [демо]',phone:'+7 700 000 00 01',programId:'batyr-joly',eventId:'evt1',source:'Сайт / форма',status:'Новая',created:'2026-10-27',comment:'Хочет узнать про предоплату.'},
      {id:'lead2',name:'Мария [демо]',phone:'+7 700 000 00 02',programId:'women',eventId:'evt4',source:'WhatsApp',status:'В работе',created:'2026-10-26',comment:''},
      {id:'lead3',name:'Тимур [демо]',phone:'+7 700 000 00 03',programId:'personal',eventId:'',source:'Meta / реклама',status:'Новая',created:'2026-10-25',comment:''},
      {id:'lead4',name:'Анна [демо]',phone:'+7 700 000 00 04',programId:'pro-life',eventId:'evt2',source:'Сайт / форма',status:'Закрыта',created:'2026-10-24',comment:''}
    ],
    payments: [
      {id:'pay1',name:'Алексей [демо]',programId:'batyr-joly',eventId:'evt1',method:'Freedom Pay',amount:25000,status:'Оплачен',created:'2026-10-27',source:'Сайт'},
      {id:'pay2',name:'Мария [демо]',programId:'women',eventId:'evt4',method:'Kaspi Pay',amount:20000,status:'Ожидает оплаты',created:'2026-10-26',source:'WhatsApp'},
      {id:'pay3',name:'Тимур [демо]',programId:'masterclass',eventId:'evt5',method:'Freedom Pay',amount:3000,status:'Ошибка',created:'2026-10-25',source:'Meta'},
      {id:'pay4',name:'Анна [демо]',programId:'pro-life',eventId:'evt2',method:'Freedom Pay',amount:30000,status:'Оплачен',created:'2026-10-24',source:'Сайт'}
    ],
    reviews: [
      {id:'rev1',author:'Участник 01 [демо]',programId:'batyr-joly',quote:'Текст видеоотзыва будет добавлен.',url:'',status:'На модерации'},
      {id:'rev2',author:'Участник 02 [демо]',programId:'pro-life',quote:'Текст видеоотзыва будет добавлен.',url:'',status:'Опубликован'},
      {id:'rev3',author:'Участник 03 [демо]',programId:'proryv',quote:'Текст видеоотзыва будет добавлен.',url:'',status:'Черновик'}
    ],
    media: [
      {id:'med1',title:'Знакомство с программами [демо]',type:'YouTube',topic:'Первый шаг',url:'',status:'Опубликован'},
      {id:'med2',title:'Разговор о целях [демо]',type:'Подкаст',topic:'Ясность',url:'',status:'Черновик'},
      {id:'med3',title:'Медитация [демо]',type:'Медитация',topic:'Знакомство',url:'',status:'Черновик'}
    ],
    projects: [
      {id:'pj1',name:'Сакральный Казахстан',type:'Проект',description:'Описание проекта и материалы.',status:'Опубликован'},
      {id:'pj2',name:'QAZ WILD',type:'Проект',description:'Описание проекта и материалы.',status:'Опубликован'},
      {id:'pj3',name:'QazMountains',type:'Проект',description:'Описание проекта и материалы.',status:'Опубликован'},
      {id:'pj4',name:'FC Batyr Pro',type:'Клуб',description:'Описание клуба.',status:'Опубликован'},
      {id:'pj5',name:'Клубы и капитаны',type:'Клуб',description:'Описание клубов и капитанов.',status:'Опубликован'}
    ],
    directions: [
      {id:'dir1',name:'Ясность',problem:'Знаю, что делать. Не делаю',programA:'masterclass',programB:'decision'},
      {id:'dir2',name:'Истинные цели',problem:'Работаю много, а цели не мои',programA:'proryv',programB:''},
      {id:'dir3',name:'Мужская сила',problem:'Снаружи всё нормально, внутри нет опоры',programA:'batyr-joly',programB:''},
      {id:'dir4',name:'Отношения и семья',problem:'Конфликты, потеряли близость',programA:'pro-life',programB:''},
      {id:'dir5',name:'Женская сила',problem:'Всё есть. Раскрыться ещё глубже',programA:'women',programB:'pro-life'},
      {id:'dir6',name:'Дело и среда',problem:'Рядом нужен сильный круг',programA:'mentoring',programB:'personal'}
    ],
    banners: [
      {id:'ban1',title:'Айдар на сцене',subtitle:'Основной слайд: масштаб и энергия зала',videoUrl:'',eventId:'',status:'Опубликован'},
      {id:'ban2',title:'Ближайшее событие',subtitle:'Анонс с видео и кнопкой',videoUrl:'',eventId:'evt1',status:'Черновик'},
      {id:'ban3',title:'Видео с тренинга',subtitle:'Дополнительный слайд',videoUrl:'',eventId:'evt2',status:'Черновик'}
    ],
    siteStats:{years:10,participants:'20 000+',cities:18,countries:'10+'},
    tariffs:[
      {id:'tar1',programId:'decision',name:'Тариф 1 [демо]',price:null,deposit:null,visibility:'По заявке',status:'Черновик',description:'Первый тариф интенсива, состав и стоимость не согласованы'},
      {id:'tar2',programId:'decision',name:'Тариф 2 [демо]',price:null,deposit:null,visibility:'По заявке',status:'Черновик',description:'Второй тариф интенсива, состав и стоимость не согласованы'},
      {id:'tar3',programId:'batyr-joly',name:'Участие [демо]',price:null,deposit:null,visibility:'По заявке',status:'Черновик',description:'Размер предоплаты нужно согласовать'},
      {id:'tar4',programId:'pro-life',name:'Участие [демо]',price:null,deposit:null,visibility:'По заявке',status:'Черновик',description:'Размер предоплаты нужно согласовать'}
    ],
    staff:[
      {id:'emp_admin',name:'Администратор [демо]',email:'admin@demo.local',role:'Администратор',status:'Активен'},
      {id:'emp_editor',name:'Контент-редактор [демо]',email:'editor@demo.local',role:'Редактор',status:'Активен'},
      {id:'emp_manager',name:'Менеджер [демо]',email:'manager@demo.local',role:'Менеджер',status:'Активен'}
    ],
    library:[
      {id:'asset1',title:'Обложка Batyr Joly [демо]',type:'Обложка',programId:'batyr-joly',url:'',description:'Файл не загружен',created:'2026-10-28'},
      {id:'asset2',title:'Видео о программах [демо]',type:'Видео',programId:'',url:'',description:'Укажите ссылку или загрузите изображение',created:'2026-10-28'}
    ],
    leadHistory:{lead1:[{date:'2026-10-27',note:'Создана заявка с формы сайта',by:'Система'}],lead2:[{date:'2026-10-26',note:'Обращение через WhatsApp',by:'Система'}]},
    eventHistory:{}

  });

  const esc = (value='') => String(value ?? '').replace(/[&<>"']/g,c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money = n => n === null || n === '' || n === undefined ? 'Не задана' : `${new Intl.NumberFormat('ru-RU').format(Number(n))} ₸`;
  const stamp = d => {if(!d) return '—'; const [y,m,day] = d.split('-'); return (day && m && y) ? `${day}.${m}.${y}` : esc(d);};
  const emptyValue = value => (value === null || value === undefined || value === '') ? '—' : esc(value);
  const searchContains = (obj,query) => JSON.stringify(obj).toLocaleLowerCase('ru').includes(query.toLocaleLowerCase('ru'));
  const uid = prefix => `${prefix}_${Date.now()}_${Math.round(Math.random()*9999)}`;
  const safeUrl = url => /^https?:\/\//i.test(String(url || '')) ? esc(url) : '#';
  const linkFor = url => url ? `<a href="${safeUrl(url)}" target="_blank" rel="noopener noreferrer" class="link-btn">Открыть ↗</a>` : '<span class="muted">Нет ссылки</span>';
  const tag = (v,kind='') => `<span class="tag ${kind}">${esc(v)}</span>`;
  const icon = (name, css='icon') => `<svg class="${css}" aria-hidden="true"><use href="#icon-${name}"></use></svg>`;
  const btn = (text,action,entity='',id='',css='btn-small',extras='',iconName='') => `<button type="button" class="btn ${css}" data-action="${action}" ${entity?`data-entity="${esc(entity)}"`:''} ${id?`data-id="${esc(id)}"`:''} ${extras}>${iconName?icon(iconName):''}<span>${text}</span></button>`;
  const pageHeading = (title,detail,actions='') => `<div class="page-heading"><div><h1>${esc(title)}</h1><p>${esc(detail)}</p></div><div class="page-actions">${actions}</div></div>`;
  const card = (title,body,right='') => `<section class="card"><div class="section-title"><h2>${title}</h2>${right}</div>${body}</section>`;
  const table = (head,body,count) => `<div class="card" style="padding:0"><div class="table-wrap"><table><thead><tr>${head.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${body || `<tr><td colspan="${head.length}"><div class="empty">Записей по выбранным фильтрам нет</div></td></tr>`}</tbody></table></div><div class="table-footer"><span>Показано записей: ${count}</span><span>Данные демонстрационные / локальные</span></div></div>`;
  const noteDemo = 'Все имена, суммы, даты и заявки здесь — примеры для проверки интерфейса, не реальные данные или согласованные тарифы.';
  const note = t => `<div class="note"><strong>Примечание:</strong> ${t}</div>`;

  let data, view = {route:'overview',search:'',filters:{},tab:'blocks',eventMode:'table',leadMode:'table',calendarMonth:'2026-11',previewType:'program',previewId:'batyr-joly',previewDevice:'mobile',analyticsPeriod:'all',libraryFilter:'all'};
  let toastTimer;

  function start() {
    if(document.body.dataset.page === 'login') {initLogin(); return;}
    if(new URLSearchParams(window.location.search).has('demo')) {localStorage.setItem(SESSION_KEY,'active');try{history.replaceState(null,'','index.html#/overview');}catch(e){}}
    if(localStorage.getItem(SESSION_KEY) !== 'active') {window.location.replace('login.html');return;}
    try {data = JSON.parse(localStorage.getItem(DATA_KEY)) || bootstrap();} catch(e) {data=bootstrap();}
    if(!data.programs || !data.events || !data.directions) data=bootstrap();
    migrateDemoData();
    syncRoleSwitcher();
    document.getElementById('menuToggle').addEventListener('click',toggleMenu);
    document.getElementById('mobileBackdrop').addEventListener('click',closeMenu);
    window.addEventListener('hashchange',routeChanged);
    document.addEventListener('click',onClick);
    document.addEventListener('change',onChange);
    document.addEventListener('input',onInput);
    document.addEventListener('keydown',e=>{if(e.key==='Escape') closeModal();});
    if(!location.hash || location.hash==='#')location.replace('#/overview');
    routeChanged();
  }

  function initLogin() {
    if(localStorage.getItem(SESSION_KEY)==='active') {window.location.replace('index.html');return;}
    const form=document.getElementById('loginForm');
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const email=document.getElementById('loginEmail').value.trim();
      const pass=document.getElementById('loginPassword').value;
      const error=document.getElementById('loginError');
      if(email==='admin@demo.local' && pass==='demo123') {
        localStorage.setItem(SESSION_KEY,'active');window.location.assign('index.html?demo=1#/overview');
      }else{error.textContent='Неверный демонстрационный логин или пароль.';}
    });
  }

  function routeChanged() {
    const key=(location.hash.replace(/^#\/?/,'') || 'overview').split('/')[0];
    const known=['overview','programs','tariffs','events','site','community','reviews','media','library','preview','leads','payments','analytics','staff','settings'];
    view.route=known.includes(key)?key:'overview';view.search='';view.filters={};view.tab='blocks';
    document.querySelectorAll('[data-route]').forEach(a=>a.classList.toggle('active',a.dataset.route===view.route));
    closeMenu();render();
    window.scrollTo(0,0);
  }

  function render() {
    const names={overview:'Обзор',programs:'Программы и цены',events:'События и места',site:'Контент сайта',community:'Сообщество',reviews:'Видеоотзывы',media:'Медиа',leads:'Заявки',payments:'Оплаты',tariffs:'Тарифы и предоплаты',library:'Медиабиблиотека',preview:'Предпросмотр',analytics:'Аналитика и отчёты',staff:'Сотрудники и роли',settings:'Настройки'};
    document.getElementById('currentPageName').textContent=names[view.route];
    const views={overview:renderOverview,programs:renderPrograms,events:renderEvents,site:renderSite,community:renderCommunity,reviews:renderReviews,media:renderMedia,leads:renderLeads,payments:renderPayments,tariffs:renderTariffs,library:renderLibrary,preview:renderPreview,analytics:renderAnalytics,staff:renderStaff,settings:renderSettings};
    document.getElementById('mainContent').innerHTML=views[view.route]();
  }
  function save(message='Изменения сохранены локально') {try{localStorage.setItem(DATA_KEY,JSON.stringify(data));}catch(e){toast('Недостаточно места для сохранения.');return;}syncRoleSwitcher();render();toast(message);}
  function toast(message) {const el=document.getElementById('toast');el.textContent=message;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),2800);}
  function toggleMenu() {const side=document.getElementById('sidebar');const isOpen=side.classList.toggle('open');document.getElementById('mobileBackdrop').hidden=!isOpen;document.getElementById('menuToggle').setAttribute('aria-expanded',String(isOpen));}
  function closeMenu() {document.getElementById('sidebar').classList.remove('open');document.getElementById('mobileBackdrop').hidden=true;document.getElementById('menuToggle').setAttribute('aria-expanded','false');}
  const pname=id=>data.programs.find(p=>p.id===id)?.name||'—';
  const ename=id=>{const e=data.events.find(x=>x.id===id);return e?`${stamp(e.date)} · ${e.city}`:'—';};
  const remaining=e=>Math.max(0,Number(e.capacity)-Number(e.reserved));
  const options=(items,current)=>items.map(v=>`<option value="${esc(v)}" ${String(current)===String(v)?'selected':''}>${esc(v)}</option>`).join('');
  const filters=(placeholder,extra='')=>`<div class="toolbar"><input id="searchBox" type="search" aria-label="Поиск" placeholder="${esc(placeholder)}" value="${esc(view.search)}">${extra}</div>`;
  const filterSelect=(name,label,values)=>`<select aria-label="${esc(label)}" data-filter="${name}"><option value="">${esc(label)}: все</option>${values.map(v=>`<option value="${esc(v)}" ${view.filters[name]===v?'selected':''}>${esc(v)}</option>`).join('')}</select>`;
  const filterRows=arr=>arr.filter(x=>!view.search||searchContains(x,view.search));
  const newBtn=(text,entity)=>btn(`Добавить ${text}`,'edit',entity,'','btn-primary','','plus');

  function renderOverview() {
    const totalEvents=data.events.length, upcoming=data.events.filter(e=>e.date>='2026-10-28').sort((a,b)=>a.date.localeCompare(b.date)).slice(0,5);
    const openLeads=data.leads.filter(x=>x.status==='Новая'||x.status==='В работе').length;
    const pendingReviews=data.reviews.filter(x=>x.status==='На модерации').length;
    const stats=[['Программы',data.programs.length,'По карте сайта','book'],['События',totalEvents,'В демо-календаре','calendar'],['Активные заявки',openLeads,'Новые и в работе','inbox'],['Отзывы на проверке',pendingReviews,'Требуют решения','play']];
    return pageHeading('Обзор','Стартовый экран администратора: основные показатели, события и быстрые действия.')+
      note(noteDemo)+
      `<div class="grid stats-grid">${stats.map(s=>`<div class="card stat-card"><div class="stat-top"><div class="stat-label">${s[0]}</div><div class="stat-icon-wrap">${icon(s[3])}</div></div><div class="stat-number">${s[1]}</div><div class="stat-foot">${s[2]}</div></div>`).join('')}</div>`+
      `<div class="grid two-col"><div>${card('Ближайшие события',`<ul class="list-clean">${upcoming.map(e=>`<li><div class="list-row"><div><strong>${esc(pname(e.programId))}</strong><p>${stamp(e.date)} · ${esc(e.city)}, ${esc(e.country)} · ${esc(e.time)}</p></div><div style="text-align:right">${tag(e.status)}<p>${remaining(e)} мест из ${e.capacity}</p></div></div></li>`).join('') || '<li class="muted">Событий нет</li>'}</ul>`,btn('Все события','nav','','events','','','calendar'))}</div><div>${card('Быстрые действия',`<div class="grid quick-grid">${btn('Добавить событие','edit','events','','','','plus')}${btn('Добавить видеоотзыв','edit','reviews','','','','plus')}${btn('Редактировать программы','nav','','programs','','','book')}${btn('Открыть заявки','nav','','leads','','','inbox')}${btn('Контент главной','nav','','site','','','layout')}</div>`)}<div style="height:14px"></div>${card('Путь участника',`<div class="steps"><div class="step"><b>1. Знакомство</b><p>Контент</p></div><div class="step"><b>2. Первый шаг</b><p>Мастер-класс</p></div><div class="step"><b>3. Глубже</b><p>Прорыв</p></div><div class="step"><b>4. Флагманы</b><p>Batyr Joly / PRO LIFE</p></div><div class="step"><b>5. Сообщество</b><p>Наставничество</p></div></div>`)}</div></div>`;
  }
  function renderPrograms() {
    let rows=filterRows(data.programs).filter(p=>!view.filters.template||view.filters.template===p.template);
    const body=rows.map(p=>`<tr><td class="cell-primary">${esc(p.name)}<div class="cell-detail">${esc(p.audience)}</div></td><td>${esc(p.duration)}</td><td>${tag(p.template)}</td><td>${esc(p.paymentModel)}</td><td>${money(p.price)}<div class="cell-detail">Предоплата: ${money(p.deposit)}</div></td><td>${tag(p.status)}</td><td><div class="row-actions">${btn('Редактировать','edit','programs',p.id,'btn-small','','edit')}${btn('Предпросмотр','program-preview','programs',p.id)}</div></td></tr>`).join('');
    return pageHeading('Программы и цены','8 программ по ТЗ. Флагманы имеют собственные шаблоны, остальные — компактные.')+
      note('Цены в исходном ТЗ не утверждены. Незаполненные значения так и отображаются; введённые здесь данные сохраняются в браузере.')+
      filters('Поиск по названию, аудитории, формату',filterSelect('template','Шаблон',['Флагман','Специальный','Компактный']))+
      table(['Программа','Формат','Шаблон','Оплата','Цена / предоплата','Статус',''],body,rows.length);
  }
  function renderEvents() {
    let rows=filterRows(data.events).filter(e=>(!view.filters.status||e.status===view.filters.status)&&(!view.filters.program||e.programId===view.filters.program)&&(!view.filters.city||e.city===view.filters.city)).sort((a,b)=>a.date.localeCompare(b.date));
    const body=rows.map(e=>`<tr><td class="cell-primary">${stamp(e.date)}<div class="cell-detail">${esc(e.time)}</div></td><td>${esc(pname(e.programId))}</td><td>${esc(e.city)}<div class="cell-detail">${esc(e.country)} · ${esc(e.venue)}</div></td><td><strong>${remaining(e)} / ${e.capacity}</strong><div class="metric-bar" aria-label="Занято мест: ${e.reserved} из ${e.capacity}"><span style="width:${e.capacity?Math.min(100,100*e.reserved/e.capacity):0}%"></span></div><div class="cell-detail">Занято: ${e.reserved}</div></td><td>${money(e.price)}</td><td>${tag(e.status)}</td><td><div class="row-actions">${btn('Изменить','edit','events',e.id,'btn-small','','edit')}${btn('Дублировать','duplicate-event','events',e.id)}${btn('Перенести','reschedule-event','events',e.id)}${e.status!=='Отменено'?btn('Отменить','cancel-event','events',e.id):''}${btn('Удалить','delete','events',e.id,'btn-small btn-danger','','trash')}</div></td></tr>`).join('');
    return pageHeading('События и места','Создание, дублирование, перенос и отмена мероприятий.',newBtn('Событие','events'))+
      `<div class="mode-switch">${btn('Таблица','event-mode','','table',view.eventMode==='table'?'btn-primary':'')}${btn('Календарь','event-mode','','calendar',view.eventMode==='calendar'?'btn-primary':'')}</div>`+(view.eventMode==='calendar'?renderEventCalendar():

      note('Даты, остатки мест и названия площадок — тестовые. В реальной системе занятые места должны быть связаны с заявками и подтверждёнными оплатами.')+
      filters('Поиск по городу или мероприятию',filterSelect('program','Программа',data.programs.map(p=>p.id)).replace(/>([^<]+)<\/option>/g,(s,t)=>s).replace(/value="(batyr-joly|pro-life|mentoring|proryv|women|decision|masterclass|personal)"([^>]*)>(.*?)<\/option>/g,(s,id,a)=>`value="${id}"${a}>${esc(pname(id))}</option>`)+filterSelect('city','Город',[...new Set(data.events.map(e=>e.city))])+filterSelect('status','Статус',['Черновик','Опубликовано','Отменено']))+
      table(['Дата','Программа','Локация','Свободно / всего','Цена','Статус',''],body,rows.length));
  }
  function renderReviews() {
    const rows=filterRows(data.reviews).filter(x=>!view.filters.status||x.status===view.filters.status);
    const body=rows.map(r=>`<tr><td class="cell-primary">${esc(r.author)}</td><td>${esc(pname(r.programId))}</td><td class="td-wrap">${esc(r.quote)}</td><td>${linkFor(r.url)}</td><td>${tag(r.status)}</td><td><div class="row-actions">${r.status==='На модерации'?btn('Одобрить','status','reviews',r.id,'btn-small','data-value="Опубликован"','check'):''}${btn('Изменить','edit','reviews',r.id,'btn-small','','edit')}${btn('Удалить','delete','reviews',r.id,'btn-small btn-danger','','trash')}</div></td></tr>`).join('');
    return pageHeading('Видеоотзывы','Отзывы выпускников с привязкой к программе и статусом публикации.',newBtn('Отзыв','reviews'))+
      filters('Поиск по участнику или отзыву',filterSelect('status','Статус',['Черновик','На модерации','Опубликован']))+
      table(['Автор','Программа','Текст / описание','Видео','Статус',''],body,rows.length);
  }
  function renderMedia() {
    const rows=filterRows(data.media).filter(x=>!view.filters.type||x.type===view.filters.type);
    const body=rows.map(m=>`<tr><td class="cell-primary">${esc(m.title)}<div class="cell-detail">${esc(m.topic)}</div></td><td>${tag(m.type)}</td><td>${linkFor(m.url)}</td><td>${tag(m.status)}</td><td><div class="row-actions">${btn('Изменить','edit','media',m.id,'btn-small','','edit')}${btn('Удалить','delete','media',m.id,'btn-small btn-danger','','trash')}</div></td></tr>`).join('');
    return pageHeading('Медиа','YouTube, подкасты и медитации. Команда может обновлять ссылки и публикации без разработчика.',newBtn('Материал','media'))+
      filters('Поиск по названию и теме',filterSelect('type','Тип',['YouTube','Подкаст','Медитация']))+
      table(['Название / тема','Тип','Ссылка','Статус',''],body,rows.length);
  }
  function renderCommunity() {
    const rows=filterRows(data.projects);
    const body=rows.map(p=>`<tr><td class="cell-primary">${esc(p.name)}</td><td>${tag(p.type)}</td><td class="td-wrap">${esc(p.description)}</td><td>${tag(p.status)}</td><td><div class="row-actions">${btn('Изменить','edit','projects',p.id,'btn-small','','edit')}${btn('Удалить','delete','projects',p.id,'btn-small btn-danger','','trash')}</div></td></tr>`).join('');
    return pageHeading('Сообщество Batyr Pro','Управление карточками проектов, клубов и инициатив сообщества.',newBtn('Проект','projects'))+
      note('Редактирование карточек сообщества — дополнение прототипа по структуре раздела. В ТЗ состав полей административной формы не указан.')+
      filters('Поиск по проекту или описанию')+table(['Проект','Категория','Описание','Статус',''],body,rows.length);
  }
  function renderLeads() {
    const rows=filterRows(data.leads).filter(x=>!view.filters.status||x.status===view.filters.status);
    const body=rows.map(l=>`<tr><td class="cell-primary">${esc(l.name)}<div class="cell-detail">${esc(l.phone)}</div></td><td>${stamp(l.created)}</td><td>${esc(pname(l.programId))}<div class="cell-detail">${l.eventId?esc(ename(l.eventId)):'Без даты'}</div></td><td>${esc(l.source)}</td><td>${tag(l.status)}</td><td><div class="row-actions">${btn('Карточка','profile-lead','leads',l.id,'btn-small','','eye')}</div></td></tr>`).join('');
    return pageHeading('Заявки','Клиенты, статусы и история обращений. Режим доски — демонстрационный CRM-интерфейс.',newBtn('Заявку','leads'))+
      `<div class="mode-switch">${btn('Таблица','lead-mode','','table',view.leadMode==='table'?'btn-primary':'')}${btn('Доска','lead-mode','','board',view.leadMode==='board'?'btn-primary':'')}</div>`+(view.leadMode==='board'?renderLeadBoard():

      note('По ТЗ заявки передаются в amoCRM с источником рекламы. В этом прототипе интеграции нет; изменение статуса происходит только локально.')+
      filters('Поиск по имени, телефону, источнику',filterSelect('status','Статус',['Новая','В работе','Закрыта','Отменена']))+
      table(['Клиент','Дата','Интерес','Источник','Статус',''],body,rows.length));
  }
  function renderPayments() {
    const rows=filterRows(data.payments).filter(x=>!view.filters.status||x.status===view.filters.status);
    const body=rows.map(p=>`<tr><td class="cell-primary">${esc(p.id)}</td><td>${stamp(p.created)}</td><td>${esc(p.name)}<div class="cell-detail">${esc(pname(p.programId))}</div></td><td>${tag(p.method)}</td><td><strong>${money(p.amount)}</strong></td><td>${tag(p.status)}</td><td><div class="row-actions">${btn('Подробнее','view-payment','payments',p.id,'btn-small','','eye')}</div></td></tr>`).join('');
    const total=data.payments.filter(p=>p.status==='Оплачен').reduce((s,p)=>s+Number(p.amount||0),0);
    return pageHeading('Оплаты','Отображение платежей по программам и мероприятиям.')+
      note('Это не платёжная система. Все суммы и статусы тестовые. В рабочем продукте статусы должны поступать от Freedom Pay / Kaspi через сервер, а не редактироваться вручную.')+
      `<div class="grid stats-grid"><div class="card"><div class="stat-label">Записей</div><div class="stat-number">${data.payments.length}</div></div><div class="card"><div class="stat-label">Оплачено</div><div class="stat-number">${data.payments.filter(p=>p.status==='Оплачен').length}</div></div><div class="card"><div class="stat-label">Ожидают оплаты</div><div class="stat-number">${data.payments.filter(p=>p.status==='Ожидает оплаты').length}</div></div><div class="card"><div class="stat-label">Сумма в демо</div><div class="stat-number" style="font-size:23px">${money(total)}</div></div></div>`+
      filters('Поиск по клиенту, методу, идентификатору',filterSelect('status','Статус',['Создан','Ожидает оплаты','Оплачен','Ошибка','Возврат']))+
      table(['ID','Дата','Клиент / программа','Способ','Сумма','Статус',''],body,rows.length);
  }
  function renderSite() {
    const tabs=[['blocks','Блоки главной'],['banners','Слайдер'],['directions','6 направлений'],['stats','Цифры и показатели'],['pages','Другие страницы']];
    const nav=`<div class="tabs" role="tablist">${tabs.map(([id,title])=>`<button class="tab" role="tab" aria-selected="${view.tab===id}" data-action="tab" data-id="${id}">${title}</button>`).join('')}</div>`;
    let content='';
    if(view.tab==='blocks')content=`<div class="preview-list">${SECTIONS.map(([name,details],i)=>`<div class="preview-item"><span class="sequence">${String(i+1).padStart(2,'0')}</span><div><strong>${esc(name)}</strong><small>${esc(details)}</small></div>${tag('По ТЗ')}</div>`).join('')}</div><p class="helper" style="margin-top:15px">Порядок 14 блоков взят из ТЗ v2. Изменение порядка не предусмотрено этим прототипом.</p>`;
    if(view.tab==='banners')content=`<div style="margin-bottom:14px">${newBtn('Слайд','banners')}</div>`+data.banners.map((b,i)=>`<div class="preview-item" style="margin-top:8px"><span class="sequence">${i+1}</span><div><strong>${esc(b.title)}</strong><small>${esc(b.subtitle)} · ${esc(b.eventId?ename(b.eventId):'Без события')} · ${esc(b.status)}</small></div>${btn('Править','edit','banners',b.id,'btn-small','','edit')}${btn('Удалить','delete','banners',b.id,'btn-small btn-danger','','trash')}</div>`).join('');
    if(view.tab==='directions')content=`<div class="table-wrap"><table><thead><tr><th>Направление</th><th>Запрос человека</th><th>Рекомендации</th><th></th></tr></thead><tbody>${data.directions.map(d=>`<tr><td class="cell-primary">${esc(d.name)}</td><td class="td-wrap">${esc(d.problem)}</td><td>${esc(pname(d.programA))}${d.programB?`, ${esc(pname(d.programB))}`:''}</td><td>${btn('Править','edit','directions',d.id,'btn-small','','edit')}</td></tr>`).join('')}</tbody></table></div>`;
    if(view.tab==='stats')content=`<dl class="info-grid"><dt>Лет</dt><dd>${esc(data.siteStats.years)}</dd><dt>Участников</dt><dd>${esc(data.siteStats.participants)}</dd><dt>Городов</dt><dd>${esc(data.siteStats.cities)}</dd><dt>Стран</dt><dd>${esc(data.siteStats.countries)}</dd></dl><div class="divider"></div>${btn('Изменить показатели','edit-stats','','','btn-small','','edit')}`;
    if(view.tab==='pages')content=`<div class="preview-list">${[['Об Айдаре','История, регалии, компании, спорт, Астана и Кипр'],['Компаниям','Задачи команд, форматы, клиенты, запрос КП'],['События','Фильтры по городу и программе'],['Медиа','YouTube, подкасты, медитации'],['Сообщество','Проекты, клубы, капитаны, добрые дела'],['Магазин','Мерч (следующий этап)']].map(([title,detail])=>`<div class="preview-item"><div><strong>${esc(title)}</strong><small>${esc(detail)}</small></div>${tag('Страница по ТЗ')}</div>`).join('')}</div><p class="helper" style="margin-top:15px">Это карта разделов, а не полноценный редактор страниц. Точный состав полей CMS должен быть согласован отдельно.</p>`;
    return pageHeading('Контент сайта','Структура главной страницы и редактирование ключевого контента.')+
      note('Контентная панель здесь — рабочее предположение для прототипа. ТЗ прямо требует редактирование событий, цен, мест, отзывов и видео без программиста.')+
      `<section class="card" style="padding:0"><div>${nav}</div><div style="padding:19px">${content}</div></section>`;
  }
  function renderSettings() {
    const integrations=[['amoCRM','Передача заявок и оплат с источником рекламы'],['Freedom Pay','Оплата картой на сайте'],['Kaspi Pay','Платёжная ссылка / счёт'],['Meta Pixel + CAPI','События и рекламная атрибуция'],['Google / Яндекс / TikTok','События аналитики и рекламные пиксели'],['SEO','Разметка событий, sitemap, редиректы']];
    return pageHeading('Настройки','Состав интеграций и состояние демонстрационного прототипа.')+
      `<div class="grid two-col"><div>${card('Интеграции по ТЗ',`<ul class="list-clean">${integrations.map(([title,desc])=>`<li><div class="list-row"><div><strong>${title}</strong><p>${desc}</p></div>${tag('Не подключено','dashed')}</div></li>`).join('')}</ul>`)}</div><div>${card('Демонстрационный режим',`<p>Прототип работает без API и сервера. Изменения сохраняются в <code>localStorage</code> только на этом устройстве и в этом браузере.</p><p class="muted small">Демо-вход не обеспечивает реальной защиты. Публиковать эту сборку в интернет как админку нельзя.</p>${btn('Сбросить демо-данные','reset','','','btn-danger','','trash')}`)}<div style="height:14px"></div>${card('Реализация и ограничения',`<ul class="list-clean"><li>Сайт: Astro, mobile-first</li><li>Админка: отдельный интерфейс</li><li>Backend и БД: не определены ТЗ</li><li>Роли и права: не описаны</li><li>Возвраты и платежные webhooks: требуют отдельной спецификации</li><li>Онлайн-мастер-класс и магазин: последующий этап</li></ul>`)}</div></div>`;
  }

  // Расширения v2. Все сценарии локальные; внешние сервисы намеренно не используются.
  const ROLE_KEY='busurman_admin_demo_active_employee';
  function migrateDemoData(){
    const defaults=bootstrap();
    for(const key of ['tariffs','staff','library','leadHistory','eventHistory']){
      if(data[key]===undefined||data[key]===null) data[key]=structuredClone(defaults[key]);
    }
    data.leads.forEach((lead,i)=>{
      if(lead.assignee===undefined)lead.assignee=i%2?'emp_manager':'emp_admin';
      if(!Array.isArray(data.leadHistory[lead.id]))data.leadHistory[lead.id]=[{date:lead.created||'2026-10-28',note:'Заявка поступила в систему [демо]',by:'Система'}];
    });
  }
  function currentEmployee(){
    const id=localStorage.getItem(ROLE_KEY)||'emp_admin';
    return data.staff.find(x=>x.id===id&&x.status==='Активен')||data.staff.find(x=>x.role==='Администратор'&&x.status==='Активен')||{id:'emp_admin',name:'Администратор',role:'Администратор'};
  }
  function syncRoleSwitcher(){
    const target=document.getElementById('roleSwitcher');if(!target)return;
    const list=data.staff.filter(x=>x.status==='Активен');
    target.innerHTML=list.map(x=>`<option value="${esc(x.id)}">${esc(x.name)} · ${esc(x.role)}</option>`).join('');
    target.value=currentEmployee().id;
  }
  function permitted(entity){
    const role=currentEmployee().role;if(role==='Администратор')return true;
    if(role==='Редактор')return ['programs','events','tariffs','library','media','reviews','projects','banners','directions','siteStats'].includes(entity);
    if(role==='Менеджер')return ['leads'].includes(entity);
    return false;
  }
  const restricted=entity=>{if(permitted(entity))return false;toast('Доступно только для соответствующей роли. Переключите демо-роль в шапке.');return true;};
  function logEvent(eventId,description){
    if(!Array.isArray(data.eventHistory[eventId]))data.eventHistory[eventId]=[];
    data.eventHistory[eventId].unshift({date:new Date().toISOString().slice(0,10),note:description,by:currentEmployee().name});
  }
  function employeeName(id){return data.staff.find(x=>x.id===id)?.name||'Не назначен';}
  function eventLabel(e){return `${pname(e.programId)} · ${e.city} · ${stamp(e.date)}`;}
  function eventActions(e){return `${btn('Изменить','edit','events',e.id,'btn-small','','edit')}${btn('Дублировать','duplicate-event','events',e.id)}${btn('Перенести','reschedule-event','events',e.id)}${e.status!=='Отменено'?btn('Отменить','cancel-event','events',e.id):''}`;}
  function duplicateEvent(id){
    const original=data.events.find(x=>x.id===id);if(!original)return;
    const copy={...structuredClone(original),id:uid('evt'),status:'Черновик',reserved:0};
    data.events.push(copy);logEvent(copy.id,`Создана копия события ${original.id}; дата и время требуют проверки`);
    openEditor('events',copy.id);save('Копия события создана как черновик');
  }
  function rescheduleEvent(id){
    const e=data.events.find(x=>x.id===id);if(!e)return;
    openModal(`Перенос: ${pname(e.programId)}`,[
      {name:'date',label:'Новая дата',type:'date',required:true},
      {name:'time',label:'Новое время',type:'text',required:true},
      {name:'venue',label:'Новая площадка',type:'text'},
      {name:'reason',label:'Причина переноса',type:'textarea',full:true}
    ],{date:e.date,time:e.time,venue:e.venue,reason:''},input=>{
      if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(input.time))return 'Время нужно указать в формате 10:00.';
      const previous=`${stamp(e.date)} ${e.time}`;
      Object.assign(e,{date:input.date,time:input.time,venue:input.venue});
      logEvent(e.id,`Перенос с ${previous} на ${stamp(e.date)} ${e.time}${input.reason?': '+input.reason:''}`);
      closeModal();save('Дата мероприятия изменена');
    },'Все изменения локальные: реальные участники не получат уведомление.');
  }
  function cancelEvent(id){
    const e=data.events.find(x=>x.id===id);if(!e)return;
    if(!confirm(`Отменить мероприятие «${eventLabel(e)}»?`))return;
    e.status='Отменено';logEvent(e.id,'Мероприятие отменено администратором');save('Мероприятие отменено');
  }
  function renderEventCalendar(){
    const [year,month]=view.calendarMonth.split('-').map(Number);
    const first=new Date(Date.UTC(year,month-1,1));
    const count=new Date(Date.UTC(year,month,0)).getUTCDate();
    const leading=(first.getUTCDay()+6)%7;
    const label=first.toLocaleString('ru-RU',{month:'long',year:'numeric',timeZone:'UTC'});
    const days=[];
    for(let i=0;i<Math.ceil((leading+count)/7)*7;i++){
      const day=i-leading+1;
      if(day<1||day>count){days.push('<div class="calendar-cell calendar-empty" aria-hidden="true"></div>');continue;}
      const date=`${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      const events=data.events.filter(e=>e.date===date);
      days.push(`<div class="calendar-cell"><div class="calendar-day">${day}</div>${events.map(e=>`<button type="button" class="calendar-event ${e.status==='Отменено'?'cancelled':''}" data-action="edit" data-entity="events" data-id="${esc(e.id)}" title="${esc(eventLabel(e))}"><b>${esc(e.time)}</b> ${esc(pname(e.programId))}<small>${esc(e.city)} · ${esc(e.status)}</small></button>`).join('')}</div>`);
    }
    return `<section class="card"><div class="section-title"><h2>${esc(label[0].toUpperCase()+label.slice(1))}</h2><div class="inline-actions">${btn('‹','calendar-prev')}${btn('Текущий месяц','calendar-current')}${btn('›','calendar-next')}</div></div><div class="calendar-scroll"><div class="calendar-grid">${['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(d=>`<div class="calendar-head">${d}</div>`).join('')}${days.join('')}</div></div><p class="helper">Нажмите на событие в ячейке, чтобы изменить его. В демо данные сохраняются в браузере.</p></section>`;
  }
  function moveCalendar(offset){
    const [y,m]=view.calendarMonth.split('-').map(Number);
    const d=new Date(Date.UTC(y,m-1+offset,1));
    view.calendarMonth=`${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,'0')}`;
    render();
  }
  function renderTariffs(){
    const items=filterRows(data.tariffs).filter(t=>!view.filters.program||t.programId===view.filters.program);
    const rows=items.map(t=>`<tr><td class="cell-primary">${esc(t.name)}<div class="cell-detail">${esc(t.description||'')}</div></td><td>${esc(pname(t.programId))}</td><td>${money(t.price)}</td><td>${money(t.deposit)}</td><td>${tag(t.visibility)}</td><td>${tag(t.status)}</td><td><div class="row-actions">${btn('Редактировать','edit','tariffs',t.id,'btn-small','','edit')}${btn('Удалить','delete','tariffs',t.id,'btn-small btn-danger','','trash')}</div></td></tr>`).join('');
    return pageHeading('Тарифы и предоплаты','Несколько тарифов внутри программы, суммы и правила отображения цены.',newBtn('Тариф','tariffs'))+
      note('В ТЗ суммы не согласованы. Названия и стоимости здесь демонстрационные, реальная оплата отсутствует.')+
      filters('Название или описание тарифа',filterSelect('program','Программа',data.programs.map(p=>p.id)))+
      table(['Тариф','Программа','Цена','Предоплата','Видимость','Статус',''],rows,items.length);
  }
  function renderLeadBoard(){
    const statuses=['Новая','В работе','Закрыта','Отменена'];
    return `<div class="kanban">${statuses.map(status=>{
      const list=data.leads.filter(l=>l.status===status&&(!view.search||searchContains(l,view.search)));
      return `<section class="kanban-col"><div class="kanban-header"><strong>${status}</strong><span>${list.length}</span></div>${list.map(l=>`<button type="button" class="kanban-card" data-action="profile-lead" data-id="${esc(l.id)}"><b>${esc(l.name)}</b><small>${esc(l.phone||'Нет телефона')}</small><span>${esc(pname(l.programId))}</span><small>${esc(employeeName(l.assignee))}</small></button>`).join('')||'<div class="empty">Нет заявок</div>'}</section>`;}).join('')}</div>`;
  }
  function openLeadProfile(id){
    const l=data.leads.find(x=>x.id===id);if(!l)return;
    const entries=data.leadHistory[l.id]||[];
    const paymentList=data.payments.filter(p=>p.programId===l.programId&&p.name===l.name);
    const root=document.getElementById('modalRoot');
    root.innerHTML=`<div class="modal-backdrop" id="modalBackdrop"><section class="modal modal-wide" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div class="modal-header"><div><h2 id="modalTitle">${esc(l.name)}</h2><p class="muted small" style="margin:5px 0 0">${esc(l.phone||'Нет телефона')} · ${esc(l.source||'Источник не указан')}</p></div><button class="icon-button" type="button" data-action="close-modal">${icon('close')}</button></div>
      <div class="modal-body"><div class="profile-grid"><div><h3>Информация о заявке</h3><dl class="info-grid"><dt>Программа</dt><dd>${esc(pname(l.programId))}</dd><dt>Дата</dt><dd>${stamp(l.created)}</dd><dt>Событие</dt><dd>${esc(ename(l.eventId))}</dd><dt>Статус</dt><dd>${tag(l.status)}</dd><dt>Ответственный</dt><dd>${esc(employeeName(l.assignee))}</dd><dt>Источник</dt><dd>${esc(l.source||'—')}</dd></dl><div class="divider"></div><p>${esc(l.comment||'Нет комментария')}</p><div class="inline-actions">${btn('Редактировать заявку','lead-edit','leads',l.id)}${l.phone?`<a class="btn btn-small" href="https://wa.me/${esc(l.phone.replace(/\D/g,''))}" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>`:''}</div>${paymentList.length?`<p class="helper">Связанные демонстрационные оплаты: ${paymentList.map(x=>`${esc(x.id)} (${money(x.amount)})`).join(', ')}</p>`:''}</div>
      <div><h3>История обращений</h3><div class="timeline">${entries.map(x=>`<div class="timeline-item"><b>${stamp(x.date)} · ${esc(x.by)}</b><p>${esc(x.note)}</p></div>`).join('')||'<p class="muted">История пока пуста</p>'}</div><form id="leadNoteForm" data-lead="${esc(l.id)}" class="note-form"><label class="field"><span>Новая заметка</span><textarea name="note" placeholder="Комментарий после звонка или переписки" required></textarea></label><button class="btn btn-primary" type="submit">Добавить запись</button></form></div></div></div>
      <div class="modal-footer">${btn('Закрыть','close-modal')}</div></section></div>`;
    root.querySelector('#leadNoteForm').addEventListener('submit',evt=>{
      evt.preventDefault();if(restricted('leads'))return;
      const val=evt.target.elements.note.value.trim();if(!val)return;
      data.leadHistory[l.id]??=[];
      data.leadHistory[l.id].unshift({date:new Date().toISOString().slice(0,10),note:val,by:currentEmployee().name});
      closeModal();save('Заметка добавлена в историю');openLeadProfile(l.id);
    });
    root.querySelector('#modalBackdrop').addEventListener('click',e=>{if(e.target.id==='modalBackdrop')closeModal();});
  }
  function assetSrc(a){
    if(/^data:image\/(jpeg|png|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(a.url||''))return a.url;
    return /^https:\/\/[^\s"<>]+$/i.test(a.url||'')?a.url:'';
  }
  function renderLibrary(){
    const list=data.library.filter(x=>(view.libraryFilter==='all'||view.libraryFilter===x.type)&&(!view.search||searchContains(x,view.search)));
    return pageHeading('Медиабиблиотека','Фото, видео и обложки для программ и страниц.',newBtn('Файл / ссылку','library'))+
      note('Изображения размером до 500 КБ можно сохранить в браузере для проверки интерфейса. Видео — ссылкой; серверного хранилища нет.')+
      `<div class="toolbar"><input id="searchBox" type="search" placeholder="Поиск по названию, программе, описанию" value="${esc(view.search)}" aria-label="Поиск"><select id="libraryFilter" aria-label="Тип материалов">${['all','Фото','Видео','Обложка','Документ'].map(k=>`<option value="${k}" ${view.libraryFilter===k?'selected':''}>${k==='all'?'Все материалы':k}</option>`).join('')}</select><label class="btn btn-small upload-control">${icon('plus')} Загрузить изображение <input id="assetFile" type="file" accept="image/png,image/jpeg,image/webp" hidden></label></div>`+
      `<div class="asset-grid">${list.map(a=>`<article class="card asset-card"><div class="asset-thumb">${(a.type==='Фото'||a.type==='Обложка')&&assetSrc(a)?`<img src="${esc(assetSrc(a))}" alt="${esc(a.description||a.title)}" loading="lazy">`:icon(a.type==='Видео'?'play':'images')}</div><div class="asset-body"><strong>${esc(a.title)}</strong><p class="muted small">${esc(a.type)} · ${esc(pname(a.programId)||'Без программы')}</p><p class="helper">${esc(a.description||'')}</p><div class="row-actions">${a.url&&/^https?:\/\//.test(a.url)?`<a href="${esc(a.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-small">Открыть ↗</a>`:''}${btn('Править','edit','library',a.id)}${btn('Удалить','delete','library',a.id,'btn-small btn-danger')}</div></div></article>`).join('')||'<p class="empty">В библиотеке пока нет материалов</p>'}</div>`;
  }
  function handleAssetUpload(input){
    const file=input.files?.[0];if(!file)return;
    if(restricted('library')){input.value='';return;}
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)){toast('Поддерживаются JPG, PNG, WebP');return;}
    if(file.size>500*1024){toast('Файл больше 500 КБ. Для демо выберите изображение меньшего размера.');return;}
    const reader=new FileReader();
    reader.onload=()=>{
      const entry={id:uid('asset'),title:file.name,type:'Фото',programId:'',url:String(reader.result),description:`Загружено локально · ${Math.round(file.size/1024)} КБ`,created:new Date().toISOString().slice(0,10)};
      data.library.push(entry);
      try{localStorage.setItem(DATA_KEY,JSON.stringify(data));render();toast('Изображение добавлено локально');}
      catch(e){data.library.pop();toast('Нет места в localStorage. Удалите лишние файлы.');}
    };
    reader.readAsDataURL(file);
  }
  function previewOptions(){
    if(view.previewType==='event')return data.events.map(x=>[x.id,eventLabel(x)]);
    if(view.previewType==='banner')return data.banners.map(x=>[x.id,x.title]);
    return data.programs.map(x=>[x.id,x.name]);
  }
  function renderPreview(){
    const options=previewOptions();
    const selected=options.some(x=>x[0]===view.previewId)?view.previewId:options[0]?.[0];
    view.previewId=selected;
    let title='',caption='',content='',status='';
    if(view.previewType==='program'){
      const p=data.programs.find(x=>x.id===selected);
      if(p){title=p.name;caption=`${p.audience} · ${p.duration}`;status=p.status;
        const ts=data.tariffs.filter(t=>t.programId===p.id&&t.status!=='Архив'&&t.visibility!=='Скрыть тариф');
        content=`<p>${esc(p.description||'Описание пока не добавлено')}</p><h3>Что дальше?</h3><p>${esc(p.nextStep||'Выберите подходящий формат')}</p><h3>Участие</h3>${ts.map(t=>`<div class="preview-tariff"><b>${esc(t.name)}</b><span>${t.visibility==='По заявке'?'Цена по заявке':money(t.price)}${t.deposit!==null?' · предоплата '+money(t.deposit):''}</span></div>`).join('')||'<p class="muted">Тарифы пока не опубликованы.</p>'}`;}
    }else if(view.previewType==='event'){
      const e=data.events.find(x=>x.id===selected);
      if(e){title=pname(e.programId);caption=`${stamp(e.date)} · ${e.time} · ${e.city}, ${e.country}`;status=e.status;
        content=`<p>Площадка: ${esc(e.venue)}</p><p>Свободно ${remaining(e)} из ${e.capacity} мест</p><p>Стоимость: ${money(e.price)}</p>`;}
    }else{
      const b=data.banners.find(x=>x.id===selected);
      if(b){title=b.title;caption=b.subtitle;status=b.status;content=`<p>${b.eventId?'Связанное событие: '+esc(ename(b.eventId)):'Событие не выбрано'}</p><p>${b.videoUrl?'Видео: '+esc(b.videoUrl):'Видео не добавлено'}</p>`;}
    }
    const opt=(val,title,active)=>`<option value="${esc(val)}" ${active?'selected':''}>${esc(title)}</option>`;
    return pageHeading('Предпросмотр публикаций','Макет предварительного просмотра на основе локального контента, не фактический публичный сайт.')+
      note('Черновики тоже отображаются для внутренней проверки. Кнопка участия ниже не отправляет заявку.')+
      `<div class="preview-tools"><label>Что просмотреть <select id="previewType">${[['program','Программа'],['event','Мероприятие'],['banner','Слайдер']].map(([k,n])=>opt(k,n,k===view.previewType)).join('')}</select></label><label>Материал <select id="previewItem">${options.map(([k,n])=>opt(k,n,k===selected)).join('')}</select></label><div class="inline-actions">${btn('Телефон','preview-device','','mobile',view.previewDevice==='mobile'?'btn-primary':'')}${btn('Компьютер','preview-device','','desktop',view.previewDevice==='desktop'?'btn-primary':'')}</div></div>`+
      `<div class="preview-stage"><div class="site-mock ${view.previewDevice==='mobile'?'mock-phone':'mock-desktop'}"><div class="mock-bar"><strong>BUSURMAN GROUP</strong><span>Меню</span></div><div class="mock-hero"><span class="eyebrow">ПРЕДПРОСМОТР · ${esc(status)}</span><h1>${esc(title)}</h1><p>${esc(caption||'')}</p><button type="button" class="btn btn-primary" disabled>Участвовать</button></div><div class="mock-section"><h2>О программе / событии</h2>${content}</div><div class="mock-bottom">Демонстрационный предпросмотр · без публикации</div></div></div>`;
  }
  function analyticsSubset(){
    const today=new Date('2026-10-28T12:00:00');
    const n=view.analyticsPeriod==='all'?Infinity:Number(view.analyticsPeriod);
    const keep=x=>{const d=new Date((x.created||'2026-10-28')+'T12:00:00');return (today-d)/(24*60*60*1000)<n;};
    return {leads:data.leads.filter(keep),payments:data.payments.filter(keep)};
  }
  function graphBars(items,formatter=(n)=>n){
    const max=Math.max(1,...items.map(x=>x.value));
    return `<div class="bars">${items.map(x=>`<div class="bar-row"><span>${esc(x.label)}</span><div class="bar-track"><div class="bar-fill" style="width:${Math.round(x.value/max*100)}%"></div></div><b>${esc(formatter(x.value))}</b></div>`).join('')}</div>`;
  }
  function renderAnalytics(){
    const {leads,payments}=analyticsSubset();
    const paid=payments.filter(x=>x.status==='Оплачен');const revenue=paid.reduce((s,x)=>s+Number(x.amount||0),0);
    const sources=[...new Set(leads.map(x=>x.source||'Не указан'))].map(x=>({label:x,value:leads.filter(l=>(l.source||'Не указан')===x).length})).sort((a,b)=>b.value-a.value);
    const programs=data.programs.map(p=>({label:p.name,value:leads.filter(x=>x.programId===p.id).length})).filter(x=>x.value>0).sort((a,b)=>b.value-a.value);
    const ratio=leads.length?Math.round(paid.length/leads.length*100):0;
    return pageHeading('Аналитика и отчёты','Показатели на основе сохранённых демо-заявок и демо-оплат.',btn('Выгрузить CSV','export-analytics','','','btn-small','','chart'))+
      note('Это не реальные посещения или выручка. Доля оплат — условное отношение количества оплаченных записей к заявкам, без сквозной атрибуции и дедупликации.')+
      `<div class="toolbar"><label>Период <select id="analyticsPeriod">${[['7','7 дней'],['30','30 дней'],['90','90 дней'],['all','Всё время']].map(([v,t])=>`<option value="${v}" ${view.analyticsPeriod===v?'selected':''}>${t}</option>`).join('')}</select></label></div>`+
      `<div class="grid stats-grid"><div class="card"><div class="stat-label">Заявки</div><div class="stat-number">${leads.length}</div></div><div class="card"><div class="stat-label">Успешные оплаты</div><div class="stat-number">${paid.length}</div></div><div class="card"><div class="stat-label">Отношение оплат к заявкам</div><div class="stat-number">${ratio}%</div></div><div class="card"><div class="stat-label">Оплачено (демо)</div><div class="stat-number" style="font-size:23px">${money(revenue)}</div></div></div>`+
      `<div class="grid two-col"><div>${card('Источники заявок',graphBars(sources))}</div><div>${card('Популярность программ по заявкам',graphBars(programs))}</div></div>`+
      `<div style="height:14px"></div>${card('Оплаты по способу',graphBars(['Freedom Pay','Kaspi Pay','Заявка менеджеру'].map(x=>({label:x,value:paid.filter(p=>p.method===x).reduce((s,p)=>s+Number(p.amount||0),0)})),money))}`;
  }
  function exportAnalytics(){
    const {leads,payments}=analyticsSubset();
    const clean=v=>'"'+String(v??'').replace(/"/g,'""').replace(/^[=+@-]/,"'$&")+'"';
    const lines=[['Тип','Дата','Клиент','Программа','Источник / метод','Статус','Сумма']];
    leads.forEach(l=>lines.push(['Заявка',l.created,l.name,pname(l.programId),l.source,l.status,'']));
    payments.forEach(p=>lines.push(['Оплата',p.created,p.name,pname(p.programId),p.method,p.status,p.amount]));
    const csv='\uFEFF'+lines.map(r=>r.map(clean).join(';')).join('\r\n');
    const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));
    const a=document.createElement('a');a.href=url;a.download='busurman-demo-analytics.csv';document.body.append(a);a.click();a.remove();URL.revokeObjectURL(url);
    toast('Отчёт CSV сформирован из демо-данных');
  }
  function renderStaff(){
    const users=filterRows(data.staff);
    const rows=users.map(e=>`<tr><td class="cell-primary">${esc(e.name)}<div class="cell-detail">${esc(e.email)}</div></td><td>${tag(e.role)}</td><td>${tag(e.status)}</td><td><div class="row-actions">${btn('Изменить','edit','staff',e.id,'btn-small','','edit')}${e.id!==currentEmployee().id?btn('Удалить','delete','staff',e.id,'btn-small btn-danger','','trash'):''}</div></td></tr>`).join('');
    const permissions=[['Программы, тарифы, события','Да','Да','Нет'],['Контент, медиа, предпросмотр','Да','Да','Просмотр'],['Заявки и история клиентов','Да','Просмотр','Да'],['Сотрудники, настройки','Да','Нет','Нет']];
    return pageHeading('Сотрудники и роли','Участники команды и модель демонстрационных прав.',newBtn('Сотрудника','staff'))+
      note('Роль в верхней панели можно менять для тестирования сценариев. Это имитация прав на фронтенде, не реальная авторизация или безопасность.')+
      filters('Найти сотрудника по имени или email')+table(['Сотрудник','Роль','Статус',''],rows,users.length)+
      `<div style="height:16px"></div>${card('Матрица прав (демонстрационная)',`<div class="table-wrap"><table><thead><tr><th>Действие</th><th>Администратор</th><th>Редактор</th><th>Менеджер</th></tr></thead><tbody>${permissions.map(r=>`<tr>${r.map(x=>`<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`)}`;
  }

  function onClick(event) {
    const b=event.target.closest('[data-action]'); if(!b)return;
    event.preventDefault();
    const {action,entity,id,value}=b.dataset;
    if(action==='nav') {location.hash=`#/${id}`;return;}
    if(action==='event-mode'){view.eventMode=id;render();return;}
    if(action==='lead-mode'){view.leadMode=id;render();return;}
    if(action==='calendar-prev'){moveCalendar(-1);return;}
    if(action==='calendar-next'){moveCalendar(1);return;}
    if(action==='calendar-current'){const d=new Date();view.calendarMonth=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;render();return;}
    if(action==='duplicate-event'){if(restricted('events'))return;duplicateEvent(id);return;}
    if(action==='reschedule-event'){if(restricted('events'))return;rescheduleEvent(id);return;}
    if(action==='cancel-event'){if(restricted('events'))return;cancelEvent(id);return;}
    if(action==='profile-lead'){openLeadProfile(id);return;}
    if(action==='lead-edit'){if(restricted('leads'))return;openEditor('leads',id);return;}
    if(action==='preview-device'){view.previewDevice=id;render();return;}
    if(action==='export-analytics'){exportAnalytics();return;}
    if(action==='program-preview'){view.previewType='program';view.previewId=id;location.hash='#/preview';render();return;}

    if(action==='logout'){localStorage.removeItem(SESSION_KEY);location.assign('login.html');return;}
    if(action==='tab'){view.tab=id;render();return;}
    if(action==='edit'){if(restricted(entity))return;openEditor(entity,id);return;}
    if(action==='edit-stats'){if(restricted('siteStats'))return;openStats();return;}
    if(action==='close-modal'){closeModal();return;}
    if(action==='delete'){
      if(restricted(entity))return;
      if(entity==='staff' && (id===currentEmployee().id || (data.staff.find(x=>x.id===id)?.role==='Администратор' && data.staff.filter(x=>x.role==='Администратор'&&x.status==='Активен').length<2))){toast('Нельзя удалить текущего или последнего активного администратора.');return;}
      if(!confirm('Удалить запись? В прототипе действие можно отменить только сбросом демо-данных.'))return;
      data[entity]=data[entity].filter(x=>x.id!==id); save('Запись удалена');return;
    }
    if(action==='status'){
      if(restricted(entity))return;
      const x=data[entity].find(x=>x.id===id);if(!x)return;
      x.status=value;save('Статус изменён');return;
    }
    if(action==='view-payment') {openPayment(id);return;}
    if(action==='reset'){
      if(restricted('staff'))return;
      if(confirm('Вернуть все демонстрационные данные к исходным значениям?')){data=bootstrap();save('Демо-данные сброшены');}
      return;
    }
  }
  function onChange(event) {
    if(event.target.id==='roleSwitcher'){localStorage.setItem(ROLE_KEY,event.target.value);render();toast(`Режим: ${currentEmployee().role}`);return;}
    if(event.target.id==='assetFile'){handleAssetUpload(event.target);return;}
    if(event.target.id==='libraryFilter'){view.libraryFilter=event.target.value;render();return;}
    if(event.target.id==='previewType'){view.previewType=event.target.value;view.previewId='';render();return;}
    if(event.target.id==='previewItem'){view.previewId=event.target.value;render();return;}
    if(event.target.id==='analyticsPeriod'){view.analyticsPeriod=event.target.value;render();return;}
    const select=event.target.closest('[data-filter]');if(!select)return;
    view.filters[select.dataset.filter]=select.value;render();
  }
  function onInput(event) {
    if(event.target.id!=='searchBox')return;
    const cursor=event.target.selectionStart;view.search=event.target.value;render();
    const fresh=document.getElementById('searchBox');if(fresh){fresh.focus();try{fresh.setSelectionRange(cursor,cursor);}catch(e){}}
  }

  const programChoices=()=>data.programs.map(p=>[p.id,p.name]);
  const eventChoices=()=>data.events.map(e=>[e.id,`${stamp(e.date)} · ${pname(e.programId)} · ${e.city}`]);
  const choices=(items)=>items.map(x=>Array.isArray(x)?x:[x,x]);
  function editorFields(entity){
    const choice=(name,label,items,extra={})=>({name,label,type:'select',options:choices(items),...extra});
    const text=(name,label,extra={})=>({name,label,type:'text',...extra});
    const num=(name,label,extra={})=>({name,label,type:'number',...extra});
    const area=(name,label,extra={})=>({name,label,type:'textarea',full:true,...extra});
    switch(entity){
      case 'programs':return [text('name','Название',{required:true}),text('audience','Для кого',{required:true}),text('duration','Длительность'),choice('template','Шаблон',['Флагман','Специальный','Компактный']),choice('paymentModel','Модель оплаты',['Предоплата / заявка','Полная оплата','Только заявка','Запись / оплата']),num('price','Стоимость, ₸',{hint:'Не заполняйте, если решение о цене не принято'}),num('deposit','Предоплата, ₸',{hint:'Для флагманов и части компактных программ'}),choice('status','Публикация',['Опубликована','Черновик']),text('nextStep','Следующий шаг'),area('description','Краткое описание')];
      case 'events':return [choice('programId','Программа',programChoices(),{required:true}),{name:'date',label:'Дата',type:'date',required:true},text('time','Время (чч:мм)',{required:true,placeholder:'10:00'}),text('city','Город',{required:true}),text('country','Страна',{required:true}),text('venue','Площадка'),num('capacity','Всего мест',{required:true}),num('reserved','Занято мест',{required:true}),num('price','Стоимость события, ₸',{hint:'Пустое значение — цена не задана'}),choice('status','Статус',['Черновик','Опубликовано','Отменено'])];
      case 'reviews':return [text('author','Имя / подпись участника',{required:true}),choice('programId','Программа',programChoices()),area('quote','Краткий текст отзыва'),{name:'url',label:'Ссылка на видео (https://...)',type:'url'},choice('status','Статус',['Черновик','На модерации','Опубликован'])];
      case 'media':return [text('title','Название',{required:true}),choice('type','Тип',['YouTube','Подкаст','Медитация']),text('topic','Тема'),{name:'url',label:'Ссылка (https://...)',type:'url'},choice('status','Публикация',['Черновик','Опубликован'])];
      case 'projects':return [text('name','Название',{required:true}),choice('type','Тип',['Проект','Клуб']),area('description','Описание'),choice('status','Публикация',['Черновик','Опубликован'])];
      case 'directions':return [text('name','Направление',{required:true}),area('problem','Как человек узнаёт себя'),choice('programA','Рекомендация №1',programChoices(),{required:true}),choice('programB','Рекомендация №2 (необязательно)',[['','Не выбрано'],...programChoices()])];
      case 'banners':return [text('title','Заголовок',{required:true}),area('subtitle','Подзаголовок / описание'),{name:'videoUrl',label:'Ссылка на видео (https://...)',type:'url'},choice('eventId','Связанное событие',[['','Не выбрано'],...eventChoices()]),choice('status','Публикация',['Черновик','Опубликован'])];
      case 'leads':return [text('name','Имя',{required:true}),text('phone','Телефон'),choice('programId','Программа',programChoices()),choice('eventId','Мероприятие',[['','Не выбрано'],...eventChoices()]),text('source','Источник заявки'),choice('status','Статус',['Новая','В работе','Закрыта','Отменена']),choice('assignee','Ответственный',[['','Не назначен'],...data.staff.filter(x=>x.status==='Активен').map(x=>[x.id,x.name])]),area('comment','Комментарий менеджера')];
      case 'tariffs':return [choice('programId','Программа',programChoices(),{required:true}),text('name','Название тарифа',{required:true}),num('price','Полная цена, ₸'),num('deposit','Предоплата, ₸'),choice('visibility','Показывать цену',['Показывать','По заявке','Скрыть тариф']),choice('status','Статус',['Черновик','Активен','Архив']),area('description','Описание / что входит')];
      case 'staff':return [text('name','Имя сотрудника',{required:true}),{name:'email',label:'Email',type:'email',required:true},choice('role','Роль',['Администратор','Редактор','Менеджер']),choice('status','Статус',['Активен','Отключён'])];
      case 'library':return [text('title','Название файла',{required:true}),choice('type','Тип',['Фото','Видео','Обложка','Документ']),choice('programId','Программа',[['','Без привязки'],...programChoices()]),{name:'url',label:'URL файла / видео (https://...)',type:'url'},area('description','Описание / alt')];
      default:return [];
    }
  }
  const entityNames={programs:'программу',events:'событие',reviews:'видеоотзыв',media:'медиаматериал',projects:'проект',directions:'направление',banners:'слайд',leads:'заявку',tariffs:'тариф',library:'медиаматериал',staff:'сотрудника'};
  function fieldMarkup(f,value) {
    const id=`fld_${f.name}`;
    const val=value??'';
    const req=f.required?'required':'';
    const hint=f.hint?`<small>${esc(f.hint)}</small>`:'';
    if(f.type==='textarea')return `<label class="field ${f.full?'full':''}" for="${id}"><span>${esc(f.label)}</span><textarea id="${id}" name="${esc(f.name)}" ${req}>${esc(val)}</textarea>${hint}</label>`;
    if(f.type==='select')return `<label class="field ${f.full?'full':''}" for="${id}"><span>${esc(f.label)}</span><select id="${id}" name="${esc(f.name)}" ${req}>${f.options.map(([v,label])=>`<option value="${esc(v)}" ${String(v)===String(val)?'selected':''}>${esc(label)}</option>`).join('')}</select>${hint}</label>`;
    return `<label class="field ${f.full?'full':''}" for="${id}"><span>${esc(f.label)}</span><input id="${id}" name="${esc(f.name)}" type="${f.type}" ${f.type==='number'?'min="0" step="1"':''} ${f.placeholder?`placeholder="${esc(f.placeholder)}"`:''} value="${esc(val)}" ${req}>${hint}</label>`;
  }
  function openModal(title,fields,values,saveFn,description='') {
    const root=document.getElementById('modalRoot');
    root.innerHTML=`<div class="modal-backdrop" id="modalBackdrop"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle"><div class="modal-header"><h2 id="modalTitle">${esc(title)}</h2><button class="icon-button" type="button" data-action="close-modal" aria-label="Закрыть окно">${icon('close')}</button></div><form id="entityForm"><div class="modal-body">${description?`<p class="muted small">${esc(description)}</p>`:''}<div class="form-grid">${fields.map(f=>fieldMarkup(f,values?.[f.name])).join('')}</div><div id="modalError" class="form-error" role="alert"></div></div><div class="modal-footer"><button type="button" class="btn" data-action="close-modal">Отмена</button><button type="submit" class="btn btn-primary">Сохранить</button></div></form></section></div>`;
    const form=root.querySelector('form');
    form.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(form);const result={};
      fields.forEach(f=>{const raw=String(fd.get(f.name)??'').trim();result[f.name]=f.type==='number'?(raw===''?null:Number(raw)):raw;});
      const error=saveFn(result); if(error)root.querySelector('#modalError').textContent=error;
    });
    root.querySelector('#modalBackdrop').addEventListener('click',e=>{if(e.target.id==='modalBackdrop')closeModal();});
    const first=root.querySelector('input,select,textarea');if(first)first.focus();
  }
  function closeModal(){document.getElementById('modalRoot')?.replaceChildren();}
  function openEditor(entity,id) {
    if(!Object.hasOwn(data,entity) || !Array.isArray(data[entity]))return;
    const old=id?data[entity].find(x=>x.id===id):null;
    if(id&&!old)return;
    const fields=editorFields(entity);
    openModal(`${old?'Редактировать':'Добавить'} ${entityNames[entity]||'запись'}`,fields,old||{},input=>{
      if(entity==='events'){
        if((input.capacity??0)<(input.reserved??0))return 'Занято мест не может быть больше вместимости.';
        if(input.capacity===null || input.reserved===null)return 'Укажите общее и занятое количество мест.';
        if(input.capacity<1)return 'Вместимость должна быть больше нуля.';
        if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(input.time))return 'Укажите время в формате 10:00.';
      }
      if(entity==='tariffs'&&input.price!==null&&input.deposit!==null&&input.deposit>input.price)return 'Предоплата не может быть выше полной стоимости.';
      if(entity==='programs'&&input.price!==null&&input.deposit!==null&&input.deposit>input.price)return 'Предоплата не может превышать полную стоимость.';
      if(entity==='directions'&&input.programA===input.programB)return 'Рекомендации должны быть разными.';
      if(entity==='staff' && data.staff.some(x=>x.email===input.email && x.id!==old?.id)) return 'Email уже используется другим сотрудником.';
      if(entity==='staff' && old?.role==='Администратор' && (input.role!=='Администратор'||input.status!=='Активен') && data.staff.filter(x=>x.role==='Администратор'&&x.status==='Активен').length<2) return 'Последнего активного администратора нельзя отключить.';
      if(entity==='leads'&&!old)input.created=new Date().toISOString().slice(0,10);
      if(old)Object.assign(old,input);
      else data[entity].push({id:uid(entity),...input});
      if(entity==='leads'){data.leadHistory??={};data.leadHistory[old?.id||data.leads.at(-1)?.id]=[...(data.leadHistory[old?.id||data.leads.at(-1)?.id]||[]),{date:new Date().toISOString().slice(0,10),note:old?'Данные заявки изменены':'Создана заявка вручную',by:currentEmployee().name}];}
      closeModal();save(old?'Запись изменена':'Запись добавлена');return '';
    },entity==='events'?'В демонстрационном режиме места и цены вводятся вручную.':(entity==='programs'?'Изменения стоимости остаются в браузере, не публикуются на реальном сайте.':''));
  }
  function openStats(){
    const f=[{name:'years',label:'Лет опыта',type:'number',required:true},{name:'participants',label:'Участников',type:'text',required:true},{name:'cities',label:'Городов',type:'number',required:true},{name:'countries',label:'Стран',type:'text',required:true}];
    openModal('Цифры на главной',f,data.siteStats,values=>{data.siteStats=values;closeModal();save('Показатели обновлены');});
  }
  function openPayment(id){
    const p=data.payments.find(x=>x.id===id);if(!p)return;
    const rows=[['Идентификатор',p.id],['Клиент',p.name],['Дата',stamp(p.created)],['Программа',pname(p.programId)],['Мероприятие',ename(p.eventId)],['Способ',p.method],['Сумма',money(p.amount)],['Статус',p.status],['Источник',p.source]];
    document.getElementById('modalRoot').innerHTML=`<div class="modal-backdrop" id="modalBackdrop"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle"><div class="modal-header"><h2 id="modalTitle">Детали оплаты</h2><button class="icon-button" type="button" data-action="close-modal" aria-label="Закрыть">${icon('close')}</button></div><div class="modal-body"><div class="note">Просмотр тестовой записи. В рабочей системе статус приходит от платёжного провайдера.</div><dl class="info-grid">${rows.map(([k,v])=>`<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl></div><div class="modal-footer">${btn('Закрыть','close-modal')}</div></section></div>`;
    document.getElementById('modalBackdrop').addEventListener('click',e=>{if(e.target.id==='modalBackdrop')closeModal();});
  }
  document.addEventListener('DOMContentLoaded',start);
})();
