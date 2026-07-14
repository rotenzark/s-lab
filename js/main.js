/* ===== S'LAB · main.js ===== */
(function(){
  'use strict';

  /* ---- INTRO ---- */
  var intro=document.getElementById('intro');
  function closeIntro(){ if(intro){intro.classList.add('done');document.body.style.overflow='';} }
  if(intro){
    document.body.style.overflow='hidden';
    var skip=document.getElementById('intro-skip');
    if(skip) skip.addEventListener('click',closeIntro);
    setTimeout(closeIntro,1900);
  }
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches){ if(intro){intro.classList.add('done');document.body.style.overflow='';} }

  /* ---- HEADER scroll ---- */
  var header=document.getElementById('site-header');
  function onScroll(){ if(header) header.classList.toggle('scrolled',window.scrollY>18); }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  /* ---- BURGER ---- */
  var burger=document.getElementById('burger'), nav=document.querySelector('.nav');
  if(burger&&nav){
    burger.addEventListener('click',function(){
      var open=nav.classList.toggle('open');
      burger.setAttribute('aria-expanded',open?'true':'false');
    });
    nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');burger.setAttribute('aria-expanded','false');});});
  }

  /* ---- REVEAL ---- */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});

  /* ---- LIGHTBOX ---- */
  var lb=document.getElementById('lightbox'),lbImg=document.getElementById('lb-img'),lbClose=document.getElementById('lb-close');
  document.querySelectorAll('.g-item').forEach(function(it){
    it.addEventListener('click',function(){
      var full=it.getAttribute('data-full'); if(!full)return;
      lbImg.src=full; var im=it.querySelector('img'); lbImg.alt=im?im.alt:''; lb.classList.add('open');
    });
  });
  function closeLb(){lb.classList.remove('open');setTimeout(function(){lbImg.src='';},300);}
  if(lbClose) lbClose.addEventListener('click',closeLb);
  if(lb) lb.addEventListener('click',function(e){if(e.target===lb)closeLb();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&lb.classList.contains('open'))closeLb();});

  /* ---- ORARI DINAMICI ---- */
  // getDay: 0=Dom..6=Sab. Aperti tutti i giorni 09–19:30.
  var TABLE={0:[[9,19.5]],1:[[9,19.5]],2:[[9,19.5]],3:[[9,19.5]],4:[[9,19.5]],5:[[9,19.5]],6:[[9,19.5]]};
  function nowRome(){
    try{ var s=new Date().toLocaleString('en-US',{timeZone:'Europe/Rome'}); return new Date(s); }
    catch(e){ return new Date(); }
  }
  function fmt(h){var H=Math.floor(h),M=Math.round((h-H)*60);return H+':'+(M<10?'0'+M:''+M);}
  function updateLive(){
    var dot=document.getElementById('live-dot'), txt=document.getElementById('live-text');
    if(!dot||!txt)return;
    var d=nowRome(), day=d.getDay(), hr=d.getHours()+d.getMinutes()/60;
    var wins=TABLE[day]||[], openNow=false, closeAt=0, nextOpen=null;
    for(var i=0;i<wins.length;i++){ if(hr>=wins[i][0]&&hr<wins[i][1]){openNow=true;closeAt=wins[i][1];} if(hr<wins[i][0]&&nextOpen===null){nextOpen=wins[i][0];} }
    var LANG=document.documentElement.getAttribute('lang')||'it';
    if(openNow){
      dot.className='open';
      txt.textContent=(LANG==='en'?'Open now · until ':'Aperto ora · fino alle ')+fmt(closeAt);
    }else if(nextOpen!==null){
      dot.className='closed';
      txt.textContent=(LANG==='en'?'Closed · opens at ':'Chiuso · apre alle ')+fmt(nextOpen);
    }else{
      dot.className='closed';
      txt.textContent=(LANG==='en'?'Closed now':'Chiuso ora');
    }
  }
  updateLive(); setInterval(updateLive,60000);

  /* ---- I18N ---- */
  var EN={
    'intro.tag':'the sweet laboratory','intro.skip':'Enter →',
    'brand.sub':'Pastry lab · Chinatown',
    'nav.vetrina':'The display','nav.cult':'The cult','nav.gallery':'Gallery','nav.dove':'Find us',
    'cta.ig':'Instagram',
    'hero.eyebrow':'Via Paolo Sarpi · Chinatown, Milan',
    'hero.tag':'the sweet laboratory of Chinatown',
    'hero.sub':'French pâtisserie, Japanese milk bread and flavours of the East in one viral little lab. Melon pan, cotton cheesecake, mochi, matcha and the kawaii cakes — a feast for the eyes before the palate.',
    'hero.cta1':'See the display','hero.cta2':'Come to Sarpi',
    'hero.live':'Checking hours…','hero.f2':'★ 4.4 · 970 reviews','hero.sticker':'the best pastry shop in Chinatown ♡',
    'lab.kicker':'The laboratory',
    'lab.h2':'A sweet experiment,<br>in the heart of Chinatown.',
    'lab.p1':'S’Lab is the «sweet laboratory» born on Via Paolo Sarpi: a counter that blends <b>French pâtisserie</b>, soft <b>Japanese milk bread</b> and the <b>flavours of the East</b> into sweets Milan hadn’t quite seen before.',
    'lab.p2':'You walk in, grab a tray and tongs, and pick straight from the cases. Unusual flavours, meticulous looks and <em>a queue out the door</em>: here the beauty is to be looked at — and eaten.',
    'lab.s1':'970 Google reviews','lab.s2':'open every day','lab.s3':'within everyone’s reach',
    'vetrina.kicker':'The display','vetrina.h2':'The wall of sweets',
    'vetrina.sub':'A curated selection, never excessive: every day the case is a little show. Here’s what to look for.',
    't.cat.cult':'The cult','t.cat.forno':'From the oven','t.cat.torte':'The cakes','t.cat.kawaii':'Kawaii','t.cat.dolci':'Sweets','t.cat.bev':'Drinks',
    't.1t':'Cotton Cheesecake','t.1p':'The Japanese «cotton» cheesecake: soft, wobbly, feather-light. Our signature.',
    't.2t':'Melon Pan','t.2p':'Japanese sweet bread, crisp on top and soft inside.',
    't.3t':'Matcha Mille-Crêpe','t.3p':'Dozens of paper-thin crêpes, cream and green tea.',
    't.4t':'The Pikachu cakes','t.4p':'Pikachu-shaped passion-fruit cakes: too cute to eat. (You eat them.)',
    't.5t':'Mochi & Dorayaki','t.5p':'The Eastern classics: soft mochi and chocolate dorayaki.',
    't.6t':'Bubble Tea & Taro Boba','t.6p':'Boba, passion fruit and taro milk tea to go with the sweet.',
    't.7t':'Matcha Latte','t.7p':'Hot or iced, with proper latte art.',
    't.8t':'Viennoiserie & Pastel de Nata','t.8p':'The French-Portuguese side: cronut, pastel de nata, cakes of the day.',
    'vetrina.note':'The display changes often: what you find depends on the day (and how fast everyone else was).',
    'cult.kicker':'The cult','cult.h2':'The ones people queue for',
    'cult.1t':'The cotton cheesecake','cult.1p':'«Cotton» cheesecake: soft as a cloud, it trembles the moment you touch it. S’Lab’s signature — the one everyone photographs and then finishes in two bites.',
    'cult.2t':'The kawaii cakes','cult.2p':'From the passion-fruit Pikachu cake to the most colourful mousses: pastry that looks like a cartoon, but with real French technique and real ingredients inside.',
    'gallery.kicker':'A feast for the eyes','gallery.h2':'Take a look',
    'rev.kicker':'The word','rev.h2':'4.4 ★ · «a feast for the eyes»',
    'dove.kicker':'Find us','dove.h2':'At the start of<br>Via Paolo Sarpi.',
    'dove.addr':'Address','dove.addr2':'— Chinatown','dove.hours':'Hours','dove.hoursv':'Every day · 9:00–19:30',
    'dove.how':'How it works','dove.howv':'Self-service: tray, tongs and go. Few seats, often a queue.',
    'dove.contact':'Contact','dove.route':'Get directions','dove.ig':'Follow us on Instagram',
    'faq.h2':'Frequently asked questions',
    'faq.q1':'Where is S’Lab?','faq.a1':'At Via Paolo Sarpi 1, in the heart of Milan’s Chinatown, at the start of the pedestrian street.',
    'faq.q2':'What exactly do you make?','faq.a2':'We’re an Asian pastry laboratory: we blend French pâtisserie, Japanese milk bread and Chinese flavours. Melon pan, cotton cheesecake, mochi, dorayaki, matcha mille-crêpe, bubble tea and the kawaii cakes.',
    'faq.q3':'When are you open?','faq.a3':'Every day, from 9:00 to 19:30.',
    'faq.q4':'Is there table service?','faq.a4':'No, it’s self-service: you take a tray and tongs and pick from the cases. There are a few seats, but the place is small and very busy — on nice days there’s often a queue.',
    'foot.sub':'the sweet laboratory of Chinatown · Milan',
    'foot.where':'Where','foot.hours':'Hours','foot.hours2':'Every day','foot.contact':'Contact',
    'foot.disclaimer':'Demo website. Content and photos gathered from public sources (Google Maps); hours, products and prices are indicative, to be confirmed with the shop.',
    'ab.vetrina':'Display','ab.ig':'Instagram','ab.route':'Directions'
  };
  var IT={};
  document.querySelectorAll('[data-i18n]').forEach(function(el){ IT[el.getAttribute('data-i18n')]=el.innerHTML; });
  function setLang(lang){
    var dict=lang==='en'?EN:IT;
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var k=el.getAttribute('data-i18n'); if(dict[k]!=null) el.innerHTML=dict[k]; else if(IT[k]!=null) el.innerHTML=IT[k];
    });
    document.documentElement.setAttribute('lang',lang);
    document.querySelectorAll('.lang button').forEach(function(b){b.classList.toggle('active',b.getAttribute('data-lang')===lang);});
    try{localStorage.setItem('slab_lang',lang);}catch(e){}
    updateLive();
  }
  document.querySelectorAll('.lang button').forEach(function(b){ b.addEventListener('click',function(){setLang(b.getAttribute('data-lang'));}); });
  var saved='it'; try{saved=localStorage.getItem('slab_lang')||'it';}catch(e){}
  if(saved==='en') setLang('en');

})();
