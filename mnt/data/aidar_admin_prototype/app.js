/*
  Busurman Group — демонстрационный интерактивный прототип админ-панели.
  Без сервера, CRM и реального эквайринга. Все изменения хранятся локально в браузере.
  Логин демонстрационный и НЕ является механизмом безопасности.
*/
(() => {
  'use strict';

  const DATA_KEY = 'busurman_admin_wireframe_v1';
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
    siteStats:{years:10,participants:'20 000+',cities:18,countries:'10+'}
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
  const btn = (text,action,entity='',id='',css='btn-small',extras='') => `<button type="button" class="btn ${css}" data-action="${action}" ${entity?`data-entity="${esc(entity)}"`:''} ${id?`data-id="${esc(id)}"`:''} ${extras}>${text}</button>`;
  const pageHeading = (title,detail,actions='') => `<div class="page-heading"><div><h1>${esc(title)}</h1><p>${esc(detail)}</p></div><div class="page-actions">${actions}</div></div>`;
  const card = (title,body,right='') => `<section class="card"><div class="section-title"><h2>${title}</h2>${right}</div>${body}</section>`;
  const table = (head,body,count) => `<div class="card" style="padding:0"><div class="table-wrap"><table><thead><tr>${head.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${body || `<tr><td colspan="${head.length}"><div class="empty">Записей по выбранным фильтрам нет</div></td></tr>`}</tbody></table></div><div class="table-footer"><span>Показано записей: ${count}</span><span>Данные демонстрационные / локальные</span></div></div>`;
  const noteDemo = 'Все имена, суммы, даты и заявки здесь — примеры для проверки интерфейса, не реальные данные или согласованные тарифы.';
  const note = t => `<div class="note"><strong>Примечание:</strong> ${t}</div>`;

  let data, view = {route:'overview',search:'',filters:{},tab:'blocks'};
  let toastTimer;

  function start() {
    if(document.body.dataset.page === 'login') {initLogin(); return;}
    if(new URLSearchParams(window.location.search).has('demo')) {localStorage.setItem(SESSION_KEY,'active');try{history.replaceState(null,'','index.html#/overview');}catch(e){}}
    if(localStorage.getItem(SESSION_KEY) !== 'active') {window.location.replace('login.html');return;}
    try {data = JSON.parse(localStorage.getItem(DATA_KEY)) || bootstrap();} catch(e) {data=bootstrap();}
    if(!data.programs || !data.events || !data.directions) data=bootstrap();
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
    const known=['overview','programs','events','site','community','reviews','media','leads','payments','settings'];
    view.route=known.includes(key)?key:'overview';view.search='';view.filters={};view.tab='blocks';
    document.querySelectorAll('[data-route]').forEach(a=>a.classList.toggle('active',a.dataset.route===view.route));
    closeMenu();render();
    window.scrollTo(0,0);
  }

  function render() {
    const names={overview:'Обзор',programs:'Программы и цены',events:'События и места',site:'Контент сайта',community:'Сообщество',reviews:'Видеоотзывы',media:'Медиа',leads:'Заявки',payments:'Оплаты',settings:'Настройки'};
    document.getElementById('currentPageName').textContent=names[view.route];
    const views={overview:renderOverview,programs:renderPrograms,events:renderEvents,site:renderSite,community:renderCommunity,reviews:renderReviews,media:renderMedia,leads:renderLeads,payments:renderPayments,settings:renderSettings};
    document.getElementById('mainContent').innerHTML=views[view.route]();
  }
  function save(message='Изменения сохранены локально') {localStorage.setItem(DATA_KEY,JSON.stringify(data));render();toast(message);}
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
  const newBtn=(text,entity)=>btn(`+ ${text}`,'edit',entity,'','btn-primary');

  function renderOverview() {
    const totalEvents=data.events.length, upcoming=data.events.filter(e=>e.date>='2026-10-28').sort((a,b)=>a.date.localeCompare(b.date)).slice(0,5);
    const openLeads=data.leads.filter(x=>x.status==='Новая'||x.status==='В работе').length;
    const pendingReviews=data.reviews.filter(x=>x.status==='На модерации').length;
    const stats=[['Программы',data.programs.length,'По карте сайта'],['События',totalEvents,'В демо-календаре'],['Активные заявки',openLeads,'Новые и в работе'],['Отзывы на проверке',pendingReviews,'Требуют решения']];
    return pageHeading('Обзор','Стартовый экран администратора: основные показатели, события и быстрые действия.')+
      note(noteDemo)+
      `<div class="grid stats-grid">${stats.map(s=>`<div class="card"><div class="stat-label">${s[0]}</div><div class="stat-number">${s[1]}</div><div class="stat-foot">${s[2]}</div></div>`).join('')}</div>`+
      `<div class="grid two-col"><div>${card('Ближайшие события',`<ul class="list-clean">${upcoming.map(e=>`<li><div class="list-row"><div><strong>${esc(pname(e.programId))}</strong><p>${stamp(e.date)} · ${esc(e.city)}, ${esc(e.country)} · ${esc(e.time)}</p></div><div style="text-align:right">${tag(e.status)}<p>${remaining(e)} мест из ${e.capacity}</p></div></div></li>`).join('') || '<li class="muted">Событий нет</li>'}</ul>`,btn('Все события','nav','','events'))}</div><div>${card('Быстрые действия',`<div class="grid">${btn('+ Добавить событие','edit','events','','')}${btn('+ Добавить видеоотзыв','edit','reviews','','')}${btn('Редактировать программы','nav','','programs','')}${btn('Открыть заявки','nav','','leads','')}${btn('Контент главной','nav','','site','')}</div>`)}<div style="height:14px"></div>${card('Путь участника',`<div class="steps"><div class="step"><b>1. Знакомство</b><p>Контент</p></div><div class="step"><b>2. Первый шаг</b><p>Мастер-класс</p></div><div class="step"><b>3. Глубже</b><p>Прорыв</p></div><div class="step"><b>4. Флагманы</b><p>Batyr Joly / PRO LIFE</p></div><div class="step"><b>5. Сообщество</b><p>Наставничество</p></div></div>`)}</div></div>`;
  }
  function renderPrograms() {
    let rows=filterRows(data.programs).filter(p=>!view.filters.template||view.filters.template===p.template);
    const body=rows.map(p=>`<tr><td class="cell-primary">${esc(p.name)}<div class="cell-detail">${esc(p.audience)}</div></td><td>${esc(p.duration)}</td><td>${tag(p.template)}</td><td>${esc(p.paymentModel)}</td><td>${money(p.price)}<div class="cell-detail">Предоплата: ${money(p.deposit)}</div></td><td>${tag(p.status)}</td><td><div class="row-actions">${btn('Редактировать','edit','programs',p.id)}</div></td></tr>`).join('');
    return pageHeading('Программы и цены','8 программ по ТЗ. Флагманы имеют собственные шаблоны, остальные — компактные.')+
      note('Цены в исходном ТЗ не утверждены. Незаполненные значения так и отображаются; введённые здесь данные сохраняются в браузере.')+
      filters('Поиск по названию, аудитории, формату',filterSelect('template','Шаблон',['Флагман','Специальный','Компактный']))+
      table(['Программа','Формат','Шаблон','Оплата','Цена / предоплата','Статус',''],body,rows.length);
  }
  function renderEvents() {
    let rows=filterRows(data.events).filter(e=>(!view.filters.status||e.status===view.filters.status)&&(!view.filters.program||e.programId===view.filters.program)&&(!view.filters.city||e.city===view.filters.city)).sort((a,b)=>a.date.localeCompare(b.date));
    const body=rows.map(e=>`<tr><td class="cell-primary">${stamp(e.date)}<div class="cell-detail">${esc(e.time)}</div></td><td>${esc(pname(e.programId))}</td><td>${esc(e.city)}<div class="cell-detail">${esc(e.country)} · ${esc(e.venue)}</div></td><td><strong>${remaining(e)} / ${e.capacity}</strong><div class="metric-bar" aria-label="Занято мест: ${e.reserved} из ${e.capacity}"><span style="width:${e.capacity?Math.min(100,100*e.reserved/e.capacity):0}%"></span></div><div class="cell-detail">Занято: ${e.reserved}</div></td><td>${money(e.price)}</td><td>${tag(e.status)}</td><td><div class="row-actions">${btn('Изменить','edit','events',e.id)}${btn('Удалить','delete','events',e.id,'btn-small btn-danger')}</div></td></tr>`).join('');
    return pageHeading('События и места','Создание мероприятий, настройка даты, города, площадки, цен и количества мест.',newBtn('Событие','events'))+
      note('Даты, остатки мест и названия площадок — тестовые. В реальной системе занятые места должны быть связаны с заявками и подтверждёнными оплатами.')+
      filters('Поиск по городу или мероприятию',filterSelect('program','Программа',data.programs.map(p=>p.id)).replace(/>([^<]+)<\/option>/g,(s,t)=>s).replace(/value="(batyr-joly|pro-life|mentoring|proryv|women|decision|masterclass|personal)"([^>]*)>(.*?)<\/option>/g,(s,id,a)=>`value="${id}"${a}>${esc(pname(id))}</option>`)+filterSelect('city','Город',[...new Set(data.events.map(e=>e.city))])+filterSelect('status','Статус',['Черновик','Опубликовано','Отменено']))+
      table(['Дата','Программа','Локация','Свободно / всего','Цена','Статус',''],body,rows.length);
  }
  function renderReviews() {
    const rows=filterRows(data.reviews).filter(x=>!view.filters.status||x.status===view.filters.status);
    const body=rows.map(r=>`<tr><td class="cell-primary">${esc(r.author)}</td><td>${esc(pname(r.programId))}</td><td class="td-wrap">${esc(r.quote)}</td><td>${linkFor(r.url)}</td><td>${tag(r.status)}</td><td><div class="row-actions">${r.status==='На модерации'?btn('Одобрить','status','reviews',r.id,'btn-small','data-value="Опубликован"'):''}${btn('Изменить','edit','reviews',r.id)}${btn('Удалить','delete','reviews',r.id,'btn-small btn-danger')}</div></td></tr>`).join('');
    return pageHeading('Видеоотзывы','Отзывы выпускников с привязкой к программе и статусом публикации.',newBtn('Отзыв','reviews'))+
      filters('Поиск по участнику или отзыву',filterSelect('status','Статус',['Черновик','На модерации','Опубликован']))+
      table(['Автор','Программа','Текст / описание','Видео','Статус',''],body,rows.length);
  }
  function renderMedia() {
    const rows=filterRows(data.media).filter(x=>!view.filters.type||x.type===view.filters.type);
    const body=rows.map(m=>`<tr><td class="cell-primary">${esc(m.title)}<div class="cell-detail">${esc(m.topic)}</div></td><td>${tag(m.type)}</td><td>${linkFor(m.url)}</td><td>${tag(m.status)}</td><td><div class="row-actions">${btn('Изменить','edit','media',m.id)}${btn('Удалить','delete','media',m.id,'btn-small btn-danger')}</div></td></tr>`).join('');
    return pageHeading('Медиа','YouTube, подкасты и медитации. Команда может обновлять ссылки и публикации без разработчика.',newBtn('Материал','media'))+
      filters('Поиск по названию и теме',filterSelect('type','Тип',['YouTube','Подкаст','Медитация']))+
      table(['Название / тема','Тип','Ссылка','Статус',''],body,rows.length);
  }
  function renderCommunity() {
    const rows=filterRows(data.projects);
    const body=rows.map(p=>`<tr><td class="cell-primary">${esc(p.name)}</td><td>${tag(p.type)}</td><td class="td-wrap">${esc(p.description)}</td><td>${tag(p.status)}</td><td><div class="row-actions">${btn('Изменить','edit','projects',p.id)}${btn('Удалить','delete','projects',p.id,'btn-small btn-danger')}</div></td></tr>`).join('');
    return pageHeading('Сообщество Batyr Pro','Управление карточками проектов, клубов и инициатив сообщества.',newBtn('Проект','projects'))+
      note('Редактирование карточек сообщества — дополнение прототипа по структуре раздела. В ТЗ состав полей административной формы не указан.')+
      filters('Поиск по проекту или описанию')+table(['Проект','Категория','Описание','Статус',''],body,rows.length);
  }
  function renderLeads() {
    const rows=filterRows(data.leads).filter(x=>!view.filters.status||x.status===view.filters.status);
    const body=rows.map(l=>`<tr><td class="cell-primary">${esc(l.name)}<div class="cell-detail">${esc(l.phone)}</div></td><td>${stamp(l.created)}</td><td>${esc(pname(l.programId))}<div class="cell-detail">${l.eventId?esc(ename(l.eventId)):'Без даты'}</div></td><td>${esc(l.source)}</td><td>${tag(l.status)}</td><td><div class="row-actions">${btn('Открыть','edit','leads',l.id)}</div></td></tr>`).join('');
    return pageHeading('Заявки','Демонстрационный реестр обращений с программой, источником и статусом.')+
      note('По ТЗ заявки передаются в amoCRM с источником рекламы. В этом прототипе интеграции нет; изменение статуса происходит только локально.')+
      filters('Поиск по имени, телефону, источнику',filterSelect('status','Статус',['Новая','В работе','Закрыта','Отменена']))+
      table(['Клиент','Дата','Интерес','Источник','Статус',''],body,rows.length);
  }
  function renderPayments() {
    const rows=filterRows(data.payments).filter(x=>!view.filters.status||x.status===view.filters.status);
    const body=rows.map(p=>`<tr><td class="cell-primary">${esc(p.id)}</td><td>${stamp(p.created)}</td><td>${esc(p.name)}<div class="cell-detail">${esc(pname(p.programId))}</div></td><td>${tag(p.method)}</td><td><strong>${money(p.amount)}</strong></td><td>${tag(p.status)}</td><td><div class="row-actions">${btn('Подробнее','view-payment','payments',p.id)}</div></td></tr>`).join('');
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
    if(view.tab==='banners')content=`<div style="margin-bottom:14px">${newBtn('Слайд','banners')}</div>`+data.banners.map((b,i)=>`<div class="preview-item" style="margin-top:8px"><span class="sequence">${i+1}</span><div><strong>${esc(b.title)}</strong><small>${esc(b.subtitle)} · ${esc(b.eventId?ename(b.eventId):'Без события')} · ${esc(b.status)}</small></div>${btn('Править','edit','banners',b.id)}${btn('Удалить','delete','banners',b.id,'btn-small btn-danger')}</div>`).join('');
    if(view.tab==='directions')content=`<div class="table-wrap"><table><thead><tr><th>Направление</th><th>Запрос человека</th><th>Рекомендации</th><th></th></tr></thead><tbody>${data.directions.map(d=>`<tr><td class="cell-primary">${esc(d.name)}</td><td class="td-wrap">${esc(d.problem)}</td><td>${esc(pname(d.programA))}${d.programB?`, ${esc(pname(d.programB))}`:''}</td><td>${btn('Править','edit','directions',d.id)}</td></tr>`).join('')}</tbody></table></div>`;
    if(view.tab==='stats')content=`<dl class="info-grid"><dt>Лет</dt><dd>${esc(data.siteStats.years)}</dd><dt>Участников</dt><dd>${esc(data.siteStats.participants)}</dd><dt>Городов</dt><dd>${esc(data.siteStats.cities)}</dd><dt>Стран</dt><dd>${esc(data.siteStats.countries)}</dd></dl><div class="divider"></div>${btn('Изменить показатели','edit-stats')}`;
    if(view.tab==='pages')content=`<div class="preview-list">${[['Об Айдаре','История, регалии, компании, спорт, Астана и Кипр'],['Компаниям','Задачи команд, форматы, клиенты, запрос КП'],['События','Фильтры по городу и программе'],['Медиа','YouTube, подкасты, медитации'],['Сообщество','Проекты, клубы, капитаны, добрые дела'],['Магазин','Мерч (следующий этап)']].map(([title,detail])=>`<div class="preview-item"><div><strong>${esc(title)}</strong><small>${esc(detail)}</small></div>${tag('Страница по ТЗ')}</div>`).join('')}</div><p class="helper" style="margin-top:15px">Это карта разделов, а не полноценный редактор страниц. Точный состав полей CMS должен быть согласован отдельно.</p>`;
    return pageHeading('Контент сайта','Структура главной страницы и редактирование ключевого контента.')+
      note('Контентная панель здесь — рабочее предположение для прототипа. ТЗ прямо требует редактирование событий, цен, мест, отзывов и видео без программиста.')+
      `<section class="card" style="padding:0"><div>${nav}</div><div style="padding:19px">${content}</div></section>`;
  }
  function renderSettings() {
    const integrations=[['amoCRM','Передача заявок и оплат с источником рекламы'],['Freedom Pay','Оплата картой на сайте'],['Kaspi Pay','Платёжная ссылка / счёт'],['Meta Pixel + CAPI','События и рекламная атрибуция'],['Google / Яндекс / TikTok','События аналитики и рекламные пиксели'],['SEO','Разметка событий, sitemap, редиректы']];
    return pageHeading('Настройки','Состав интеграций и состояние демонстрационного прототипа.')+
      `<div class="grid two-col"><div>${card('Интеграции по ТЗ',`<ul class="list-clean">${integrations.map(([title,desc])=>`<li><div class="list-row"><div><strong>${title}</strong><p>${desc}</p></div>${tag('Не подключено','dashed')}</div></li>`).join('')}</ul>`)}</div><div>${card('Демонстрационный режим',`<p>Прототип работает без API и сервера. Изменения сохраняются в <code>localStorage</code> только на этом устройстве и в этом браузере.</p><p class="muted small">Демо-вход не обеспечивает реальной защиты. Публиковать эту сборку в интернет как админку нельзя.</p>${btn('Сбросить демо-данные','reset','','','btn-danger')}`)}<div style="height:14px"></div>${card('Реализация и ограничения',`<ul class="list-clean"><li>Сайт: Astro, mobile-first</li><li>Админка: отдельный интерфейс</li><li>Backend и БД: не определены ТЗ</li><li>Роли и права: не описаны</li><li>Возвраты и платежные webhooks: требуют отдельной спецификации</li><li>Онлайн-мастер-класс и магазин: последующий этап</li></ul>`)}</div></div>`;
  }

  function onClick(event) {
    const b=event.target.closest('[data-action]'); if(!b)return;
    event.preventDefault();
    const {action,entity,id,value}=b.dataset;
    if(action==='nav') {location.hash=`#/${id}`;return;}
    if(action==='logout'){localStorage.removeItem(SESSION_KEY);location.assign('login.html');return;}
    if(action==='tab'){view.tab=id;render();return;}
    if(action==='edit'){openEditor(entity,id);return;}
    if(action==='edit-stats'){openStats();return;}
    if(action==='close-modal'){closeModal();return;}
    if(action==='delete'){
      if(!confirm('Удалить запись? В прототипе действие можно отменить только сбросом демо-данных.'))return;
      data[entity]=data[entity].filter(x=>x.id!==id); save('Запись удалена');return;
    }
    if(action==='status'){
      const x=data[entity].find(x=>x.id===id);if(!x)return;
      x.status=value;save('Статус изменён');return;
    }
    if(action==='view-payment') {openPayment(id);return;}
    if(action==='reset'){
      if(confirm('Вернуть все демонстрационные данные к исходным значениям?')){data=bootstrap();save('Демо-данные сброшены');}
      return;
    }
  }
  function onChange(event) {
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
      case 'leads':return [text('name','Имя',{required:true}),text('phone','Телефон'),choice('programId','Программа',programChoices()),choice('eventId','Мероприятие',[['','Не выбрано'],...eventChoices()]),text('source','Источник заявки'),choice('status','Статус',['Новая','В работе','Закрыта','Отменена']),area('comment','Комментарий менеджера')];
      default:return [];
    }
  }
  const entityNames={programs:'программу',events:'событие',reviews:'видеоотзыв',media:'медиаматериал',projects:'проект',directions:'направление',banners:'слайд',leads:'заявку'};
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
    root.innerHTML=`<div class="modal-backdrop" id="modalBackdrop"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle"><div class="modal-header"><h2 id="modalTitle">${esc(title)}</h2><button class="icon-button" type="button" data-action="close-modal" aria-label="Закрыть окно">✕</button></div><form id="entityForm"><div class="modal-body">${description?`<p class="muted small">${esc(description)}</p>`:''}<div class="form-grid">${fields.map(f=>fieldMarkup(f,values?.[f.name])).join('')}</div><div id="modalError" class="form-error" role="alert"></div></div><div class="modal-footer"><button type="button" class="btn" data-action="close-modal">Отмена</button><button type="submit" class="btn btn-primary">Сохранить</button></div></form></section></div>`;
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
      if(entity==='programs'&&input.price!==null&&input.deposit!==null&&input.deposit>input.price)return 'Предоплата не может превышать полную стоимость.';
      if(entity==='directions'&&input.programA===input.programB)return 'Рекомендации должны быть разными.';
      if(old)Object.assign(old,input);
      else data[entity].push({id:uid(entity),...input});
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
    document.getElementById('modalRoot').innerHTML=`<div class="modal-backdrop" id="modalBackdrop"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle"><div class="modal-header"><h2 id="modalTitle">Детали оплаты</h2><button class="icon-button" type="button" data-action="close-modal" aria-label="Закрыть">✕</button></div><div class="modal-body"><div class="note">Просмотр тестовой записи. В рабочей системе статус приходит от платёжного провайдера.</div><dl class="info-grid">${rows.map(([k,v])=>`<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl></div><div class="modal-footer">${btn('Закрыть','close-modal')}</div></section></div>`;
    document.getElementById('modalBackdrop').addEventListener('click',e=>{if(e.target.id==='modalBackdrop')closeModal();});
  }
  document.addEventListener('DOMContentLoaded',start);
})();
