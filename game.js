// ARIF RAHMAN - Portfolio Game v2
const TILE = 48, COLS = 24, ROWS = 18;
const T = { FLOOR:0, WALL:1, FRONT:2, RUG:3 };

const MAP = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const OBJECTS = [
  { col:1,  row:1,  w:3, h:5, id:'bookshelf', label:'Rak Buku',    icon:'📚', color:'#7c3aed', interact:true  },
  { col:19, row:1,  w:3, h:3, id:'computer',  label:'Komputer',    icon:'💻', color:'#0891b2', interact:true  },
  { col:1,  row:10, w:3, h:5, id:'trophy',    label:'Piala',       icon:'🏆', color:'#d97706', interact:true  },
  { col:19, row:11, w:3, h:4, id:'arcade',    label:'Mesin Arcade',icon:'🕹️', color:'#dc2626', interact:true  },
  { col:10, row:16, w:4, h:1, id:'door',      label:'Kontak',      icon:'🚪', color:'#059669', interact:true  },
  { col:7,  row:1,  w:1, h:2, id:'plant1',    label:'',            icon:'🌿', color:'#166534', interact:false },
  { col:16, row:1,  w:1, h:2, id:'plant2',    label:'',            icon:'🌿', color:'#166534', interact:false },
  { col:8,  row:4,  w:7, h:4, id:'sofa',      label:'',            icon:'🛋️', color:'#4b3f72', interact:false },
  { col:6,  row:10, w:1, h:2, id:'lamp',      label:'',            icon:'💡', color:'#92400e', interact:false },
];

// ── Collision ──────────────────────────────────────────
let solidMap = [];
function buildCollision() {
  solidMap = MAP.map(row => row.map(t => t === T.WALL || t === T.FRONT));
  for (let c = 0; c < COLS; c++) { solidMap[0][c] = true; solidMap[ROWS-1][c] = true; }
  for (let r = 0; r < ROWS; r++) { solidMap[r][0] = true; solidMap[r][COLS-1] = true; }
  OBJECTS.forEach(o => {
    for (let r = o.row; r < o.row+o.h && r < ROWS; r++)
      for (let c = o.col; c < o.col+o.w && c < COLS; c++)
        solidMap[r][c] = true;
  });
}
function canMove(nx, ny) {
  const m = 8;
  return [[nx+m, ny+TILE*0.6],[nx+TILE-m, ny+TILE*0.6],[nx+m, ny+TILE-4],[nx+TILE-m, ny+TILE-4]]
    .every(([px,py]) => { const c=Math.floor(px/TILE),r=Math.floor(py/TILE); return c>=0&&c<COLS&&r>=0&&r<ROWS&&!solidMap[r][c]; });
}

// ── Canvas ─────────────────────────────────────────────
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = COLS * TILE;
canvas.height = ROWS * TILE;
function resizeCanvas() {
  const w = document.getElementById('canvas-container');
  if (!w) return;
  const s = Math.min(w.clientWidth/canvas.width, w.clientHeight/canvas.height, 1.6);
  canvas.style.width = canvas.width*s+'px';
  canvas.style.height = canvas.height*s+'px';
}
window.addEventListener('resize', resizeCanvas);

// ── Sound (Web Audio) ──────────────────────────────────
let audioCtx = null;
function getAC() { if (!audioCtx) audioCtx = new (window.AudioContext||window.webkitAudioContext)(); return audioCtx; }
function beep(freq, dur, vol=0.06, type='square') {
  try {
    const ac=getAC(), o=ac.createOscillator(), g=ac.createGain();
    o.connect(g); g.connect(ac.destination);
    o.type=type; o.frequency.value=freq;
    g.gain.setValueAtTime(vol,ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+dur);
    o.start(); o.stop(ac.currentTime+dur);
  } catch(e){}
}
function sfxOpen()  { beep(523,0.08); setTimeout(()=>beep(659,0.1),80); setTimeout(()=>beep(784,0.15),160); }
function sfxClose() { beep(330,0.1); }
function sfxStep()  { beep(80,0.04,0.02,'sine'); }

// ── Particles ──────────────────────────────────────────
const particles = [];
function spawnParticles(x, y, color) {
  for (let i=0; i<14; i++) {
    const a=Math.random()*Math.PI*2, spd=Math.random()*3+1;
    particles.push({ x, y, vx:Math.cos(a)*spd, vy:Math.sin(a)*spd, life:1, decay:0.025+Math.random()*0.02, size:Math.random()*5+2, color });
  }
}
function updateParticles() {
  for (let i=particles.length-1; i>=0; i--) {
    const p=particles[i]; p.x+=p.vx; p.y+=p.vy; p.vy+=0.08; p.life-=p.decay;
    if (p.life<=0) particles.splice(i,1);
  }
}
function drawParticles() {
  particles.forEach(p => {
    ctx.globalAlpha=p.life; ctx.fillStyle=p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
  });
  ctx.globalAlpha=1;
}

// ── Cat NPC ────────────────────────────────────────────
const cat = { x:12*TILE, y:9*TILE, vx:0, vy:0, dir:'down', frame:0, ft:0, state:'idle', timer:2000 };
function updateCat(dt) {
  cat.timer -= dt;
  if (cat.timer <= 0) {
    if (cat.state==='idle') {
      cat.state='walk';
      const a=Math.random()*Math.PI*2;
      cat.vx=Math.cos(a)*1.2; cat.vy=Math.sin(a)*1.2;
      cat.timer=800+Math.random()*1500;
    } else { cat.state='idle'; cat.vx=0; cat.vy=0; cat.timer=600+Math.random()*1200; }
  }
  if (cat.state==='walk') {
    const nx=cat.x+cat.vx, ny=cat.y+cat.vy;
    if (canMove(nx,cat.y)) cat.x=nx; else cat.vx*=-1;
    if (canMove(cat.x,ny)) cat.y=ny; else cat.vy*=-1;
    if (Math.abs(cat.vx)>Math.abs(cat.vy)) cat.dir=cat.vx<0?'left':'right';
    else cat.dir=cat.vy<0?'up':'down';
    cat.ft+=dt; if(cat.ft>180){cat.frame=(cat.frame+1)%4;cat.ft=0;}
  }
}
function drawCat(x, y) {
  const s=2;
  const P=(px,py,pw,ph,c)=>{ctx.fillStyle=c;ctx.fillRect(x+px*s,y+py*s,pw*s,ph*s);};
  P(2,3,6,5,'#aaa'); P(2,1,3,3,'#aaa'); P(6,1,3,3,'#aaa');
  P(3,2,1,1,'#555'); P(6,2,1,1,'#555');
  P(3,5,4,1,'#f9a'); P(5,4,1,1,'#f00');
  if (cat.state==='walk'&&cat.frame%2===0) { P(1,7,2,3,'#aaa'); P(6,7,2,3,'#aaa'); }
  else { P(2,7,2,3,'#aaa'); P(5,7,2,3,'#aaa'); }
  P(8,5,1,4,'#aaa');
}

// ── Player ─────────────────────────────────────────────
const player = { x:12*TILE, y:9*TILE, speed:3, dir:'down', frame:0, ft:0, moving:false, stepTimer:0 };
const PALETTE = { skin:'#f4a261', hair:'#1e1b2e', body:'#00c2e0', pants:'#1a1a3e', shoe:'#2d2d2d' };

function drawPlayer(px, py) {
  const s=3, f=player.frame, d=player.dir, bob=(f%2===0&&player.moving)?-1:0, leg=(f%4<2)?2:0;
  const P=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(px+x*s,py+y*s+bob,w*s,h*s);};
  if (d==='down'||d==='up') {
    P(3,1,8,2,PALETTE.hair); P(3,2,8,6,PALETTE.skin);
    if(d==='down'){P(5,5,1,1,PALETTE.hair);P(8,5,1,1,PALETTE.hair);}
    P(4,8,6,6,PALETTE.body);
    P(4,14+leg,2,3,PALETTE.pants); P(8,14-leg,2,3,PALETTE.pants);
    P(3,17,3,2,PALETTE.shoe); P(8,17,3,2,PALETTE.shoe);
  } else {
    const bx=3;
    P(bx,1,6,2,PALETTE.hair); P(bx,2,6,6,PALETTE.skin);
    if(d==='right')P(bx+4,4,1,1,PALETTE.hair); else P(bx+1,4,1,1,PALETTE.hair);
    P(bx,8,6,6,PALETTE.body);
    P(bx,14+leg,2,3,PALETTE.pants); P(bx+3,14-leg,2,3,PALETTE.pants);
    P(bx-1,17,3,2,PALETTE.shoe); P(bx+3,17,3,2,PALETTE.shoe);
  }
}

// ── Drawing Room ───────────────────────────────────────
function drawTile(c, r) {
  const x=c*TILE, y=r*TILE, t=MAP[r][c];
  if (t===T.WALL) {
    ctx.fillStyle='#0f0e1f'; ctx.fillRect(x,y,TILE,TILE);
    ctx.fillStyle='rgba(0,245,255,0.05)';
    for(let i=0;i<TILE;i+=16) ctx.fillRect(x,y+i,TILE,1);
  } else if (t===T.FRONT) {
    ctx.fillStyle='#161428'; ctx.fillRect(x,y,TILE,TILE);
    ctx.fillStyle='rgba(0,245,255,0.07)'; ctx.fillRect(x,y+TILE-4,TILE,4);
  } else {
    ctx.fillStyle=t===T.RUG?'#2a1f4a':'#1e1b2e'; ctx.fillRect(x,y,TILE,TILE);
    ctx.strokeStyle=t===T.RUG?'rgba(124,58,237,0.2)':'rgba(255,255,255,0.035)';
    ctx.lineWidth=1; ctx.strokeRect(x+.5,y+.5,TILE-1,TILE-1);
  }
}

function rrect(x,y,w,h,r){
  ctx.beginPath(); ctx.moveTo(x+r,y);
  ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r);
  ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
  ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r);
  ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r); ctx.closePath();
}

function drawObject(o, pulse) {
  const x=o.col*TILE, y=o.row*TILE, w=o.w*TILE, h=o.h*TILE;
  ctx.fillStyle='rgba(0,0,0,0.35)'; ctx.fillRect(x+5,y+6,w,h);
  ctx.fillStyle=o.color+'33'; ctx.strokeStyle=o.color;
  ctx.lineWidth=pulse?3:2;
  if (pulse) { ctx.shadowColor=o.color; ctx.shadowBlur=12; }
  rrect(x+2,y+2,w-4,h-4,8); ctx.fill(); ctx.stroke();
  ctx.shadowBlur=0;
  ctx.font=`${Math.min(w,h)*0.42}px serif`;
  ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillStyle='#fff';
  ctx.fillText(o.icon, x+w/2, y+h/2-6);
  if (o.interact) {
    ctx.font='bold 8px Inter,sans-serif'; ctx.fillStyle=o.color;
    ctx.fillText(o.label, x+w/2, y+h-10);
  }
}

// ── Interaction Detection ──────────────────────────────
const INTERACT_R = TILE * 1.8;
let nearObject = null;
function checkNearby() {
  const cx=player.x+TILE/2, cy=player.y+TILE/2;
  nearObject=null;
  for (const o of OBJECTS) {
    if (!o.interact) continue;
    const ox=o.col*TILE+o.w*TILE/2, oy=o.row*TILE+o.h*TILE/2;
    if (Math.hypot(cx-ox,cy-oy) < INTERACT_R+o.w*TILE*0.25) { nearObject=o; break; }
  }
  const p=document.getElementById('interact-prompt'), l=document.getElementById('interact-label');
  if (nearObject) { p.classList.remove('hidden'); l.textContent=nearObject.label; }
  else p.classList.add('hidden');
}

// ── Input ──────────────────────────────────────────────
let keys = {};
const mkeys = {};
document.addEventListener('keydown', e => {
  keys[e.key]=true;
  if ((e.key===' '||e.key==='e'||e.key==='E')&&nearObject) { e.preventDefault(); openModal(nearObject.id); }
  if (e.key==='Escape') closeModal();
});
document.addEventListener('keyup', e => { keys[e.key]=false; });
window.dpadStart = d => mkeys[d]=true;
window.dpadEnd   = d => mkeys[d]=false;
window.dpadAction = () => { if (nearObject) openModal(nearObject.id); };

// ── Game Loop ──────────────────────────────────────────
let lastTime=0, stepTimer=0;
function loop(ts) {
  const dt=Math.min(ts-lastTime,32); lastTime=ts;
  update(dt); render();
  requestAnimationFrame(loop);
}

function update(dt) {
  let dx=0, dy=0;
  if (keys['ArrowUp']   ||keys['w']||keys['W']||mkeys['up'])    dy=-1;
  if (keys['ArrowDown'] ||keys['s']||keys['S']||mkeys['down'])   dy= 1;
  if (keys['ArrowLeft'] ||keys['a']||keys['A']||mkeys['left'])   dx=-1;
  if (keys['ArrowRight']||keys['d']||keys['D']||mkeys['right'])  dx= 1;
  if (dx&&dy){dx*=.707;dy*=.707;}
  player.moving=dx!==0||dy!==0;
  if (dx<0)player.dir='left'; else if(dx>0)player.dir='right';
  else if(dy<0)player.dir='up'; else if(dy>0)player.dir='down';
  const nx=player.x+dx*player.speed, ny=player.y+dy*player.speed;
  if (canMove(nx,player.y)) player.x=nx;
  if (canMove(player.x,ny)) player.y=ny;
  if (player.moving) {
    player.ft+=dt; if(player.ft>150){player.frame++;player.ft=0;}
    stepTimer+=dt; if(stepTimer>300){sfxStep();stepTimer=0;}
  } else { player.frame=0; stepTimer=0; }
  updateCat(dt);
  updateParticles();
  checkNearby();
}

function render() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let r=0;r<ROWS;r++) for(let c=0;c<COLS;c++) drawTile(c,r);

  // Lamp glow
  const lamp=OBJECTS.find(o=>o.id==='lamp');
  const lg=ctx.createRadialGradient(lamp.col*TILE+TILE/2,lamp.row*TILE+TILE,0,lamp.col*TILE+TILE/2,lamp.row*TILE+TILE,TILE*3);
  lg.addColorStop(0,'rgba(255,220,100,0.12)'); lg.addColorStop(1,'rgba(255,220,100,0)');
  ctx.fillStyle=lg; ctx.fillRect(0,0,canvas.width,canvas.height);

  OBJECTS.forEach(o => drawObject(o, nearObject&&nearObject.id===o.id));

  // Cat shadow & body
  ctx.fillStyle='rgba(0,0,0,0.2)';
  ctx.beginPath(); ctx.ellipse(cat.x+TILE/2,cat.y+TILE-4,TILE*0.25,5,0,0,Math.PI*2); ctx.fill();
  drawCat(cat.x+8, cat.y+4);

  // Player shadow
  ctx.fillStyle='rgba(0,0,0,0.25)';
  ctx.beginPath(); ctx.ellipse(player.x+TILE/2,player.y+TILE-4,TILE*0.3,6,0,0,Math.PI*2); ctx.fill();
  drawPlayer(player.x, player.y);

  drawParticles();
}

// ── Modals ─────────────────────────────────────────────
function openModal(id) {
  document.getElementById('overlay').classList.remove('hidden');
  document.getElementById('modal-'+id).classList.remove('hidden');
  Object.keys(keys).forEach(k=>delete keys[k]);
  Object.keys(mkeys).forEach(k=>delete mkeys[k]);
  spawnParticles(player.x+TILE/2, player.y+TILE/2, OBJECTS.find(o=>o.id===id)?.color||'#00f5ff');
  sfxOpen();
}
function closeModal() {
  document.getElementById('overlay').classList.add('hidden');
  document.querySelectorAll('.modal').forEach(m=>m.classList.add('hidden'));
  sfxClose();
}
document.getElementById('overlay').addEventListener('click', closeModal);
window.openModal=openModal; window.closeModal=closeModal;

function switchTab(tab) {
  ['about','skills'].forEach(t=>document.getElementById('tab-'+t).classList.add('hidden'));
  document.querySelectorAll('#modal-computer .tab-btn').forEach((b,i)=>b.classList.toggle('active',['about','skills'][i]===tab));
  document.getElementById('tab-'+tab).classList.remove('hidden');
}
function switchTabBook(tab) {
  ['education','certs'].forEach(t=>document.getElementById('tab-'+t).classList.add('hidden'));
  document.querySelectorAll('#modal-bookshelf .tab-btn').forEach((b,i)=>b.classList.toggle('active',['education','certs'][i]===tab));
  document.getElementById('tab-'+tab).classList.remove('hidden');
}
window.switchTab=switchTab; window.switchTabBook=switchTabBook;

// ── Clock ──────────────────────────────────────────────
function updateClock() {
  const n=new Date(), h=String(n.getHours()).padStart(2,'0'), m=String(n.getMinutes()).padStart(2,'0'), s=String(n.getSeconds()).padStart(2,'0');
  const el=document.getElementById('hud-clock');
  if(el) el.textContent=`${h}:${m}:${s}`;
}
setInterval(updateClock,1000); updateClock();

// ── Load Data ──────────────────────────────────────────
function populateDOM() {
  if (typeof PORTFOLIO_DATA === 'undefined') return;
  const pd = PORTFOLIO_DATA;

  // HUD & General
  document.querySelector('.loading-title').textContent = pd.personal.name;
  document.querySelector('.hud-title').textContent = pd.personal.name;
  document.querySelector('.hud-sub').textContent = pd.personal.shortTitle;

  // About Tab
  const nameEl = document.querySelector('.modal-name');
  if (nameEl) nameEl.textContent = pd.personal.name;
  
  const titleEl = document.querySelector('.modal-title-text');
  if (titleEl) titleEl.textContent = pd.personal.title;
  
  const locEl = document.querySelector('.modal-location');
  if (locEl) locEl.textContent = `📍 ${pd.personal.location}`;
  
  const bioEl = document.querySelector('.modal-bio');
  if (bioEl) bioEl.innerHTML = pd.personal.summary;
  
  const contactLinks = document.querySelector('.contact-links');
  if (contactLinks) {
    contactLinks.innerHTML = `
      <a href="mailto:${pd.personal.email}" class="contact-chip">✉️ ${pd.personal.email}</a>
      <a href="${pd.personal.linkedinUrl}" target="_blank" class="contact-chip">💼 LinkedIn</a>
    `;
  }
  
  const downloadBtn = document.querySelector('.btn-download');
  if (downloadBtn) downloadBtn.href = pd.personal.cvUrl;

  const profileAvatar = document.querySelector('.profile-avatar-big');
  if (profileAvatar) profileAvatar.textContent = pd.personal.avatarInitials;

  // Skills
  const skillsGrid = document.querySelector('.skills-grid');
  if (skillsGrid) {
    skillsGrid.innerHTML = pd.skills.map(s => `
      <div class="skill-card ${s.top ? 'top-skill' : ''}">
        <div class="skill-icon">${s.icon}</div>
        <div class="skill-name">${s.name}</div>
        <div class="skill-bar"><div class="skill-fill" style="width:${s.level}%"></div></div>
      </div>
    `).join('');
  }

  // Education
  const eduCard = document.querySelector('.edu-card');
  if (eduCard) {
    eduCard.innerHTML = `
      <div class="edu-logo">🏛️</div>
      <div class="edu-info">
        <h3>${pd.education.university}</h3>
        <p class="edu-degree">${pd.education.degree}</p>
        <p class="edu-year">${pd.education.year}</p>
        <p class="edu-loc">📍 ${pd.education.location}</p>
      </div>
    `;
  }

  // Certifications
  const certList = document.querySelector('.cert-list');
  if (certList) {
    certList.innerHTML = pd.certifications.map(c => `
      <div class="cert-item">
        <div class="cert-icon">${c.icon}</div>
        <div>
          <div class="cert-name">${c.name}</div>
          <div class="cert-issuer">${c.issuer}</div>
        </div>
      </div>
    `).join('');
  }

  // Experience Timeline
  const timeline = document.querySelector('.timeline');
  if (timeline) {
    timeline.innerHTML = pd.experiences.map(e => `
      <div class="timeline-item ${e.current ? 'current' : ''}">
        <div class="tl-dot"></div>
        <div class="tl-content">
          <div class="tl-header">
            <h3>${e.company}</h3>
            ${e.current ? '<span class="tl-badge current-badge">Saat Ini</span>' : ''}
          </div>
          <p class="tl-role">${e.role}</p>
          <p class="tl-period">📅 ${e.period}</p>
          <p class="tl-loc">📍 ${e.location}</p>
          ${e.description ? `<p class="tl-desc">${e.description}</p>` : ''}
        </div>
      </div>
    `).join('');
  }

  // Projects / Arcade
  const projectsGrid = document.querySelector('.projects-grid');
  if (projectsGrid) {
    projectsGrid.innerHTML = pd.projects.map(p => `
      <div class="project-card">
        <div class="project-thumb" style="background: ${p.bgGradient}">
          <span class="project-thumb-icon">${p.icon}</span>
        </div>
        <div class="project-info">
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <div class="project-tags">
            ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  // Contact / Door
  const contactCards = document.querySelector('.contact-cards');
  if (contactCards) {
    const waMessage = encodeURIComponent("Halo Arif! Saya melihat portofolio interaktif Anda dan tertarik untuk berdiskusi lebih lanjut.");
    contactCards.innerHTML = `
      <a href="https://wa.me/${pd.personal.whatsapp}?text=${waMessage}" target="_blank" class="contact-card-big wa-btn" style="grid-column: 1 / -1; background: linear-gradient(135deg, #166534, #22c55e); color: white; border-color: #22c55e;">
        <div class="cc-icon">💬</div>
        <div class="cc-label" style="color: #dcfce7;">Chat via WhatsApp</div>
        <div class="cc-value" style="color: white; font-weight: bold;">Mulai Diskusi / Hire Me</div>
      </a>
      <a href="mailto:${pd.personal.email}" class="contact-card-big">
        <div class="cc-icon">✉️</div>
        <div class="cc-label">Email</div>
        <div class="cc-value">${pd.personal.email}</div>
      </a>
      <a href="${pd.personal.linkedinUrl}" target="_blank" class="contact-card-big">
        <div class="cc-icon">💼</div>
        <div class="cc-label">LinkedIn</div>
        <div class="cc-value">${pd.personal.linkedinLabel}</div>
      </a>
      <div class="contact-card-big">
        <div class="cc-icon">📍</div>
        <div class="cc-label">Lokasi</div>
        <div class="cc-value">${pd.personal.shortLocation}</div>
      </div>
      <div class="contact-card-big">
        <div class="cc-icon">⏰</div>
        <div class="cc-label">Pengalaman</div>
        <div class="cc-value">${pd.personal.experienceYears}</div>
      </div>
    `;
  }
}

// ── Loading ────────────────────────────────────────────
function drawLoadingChar() {
  const c=document.createElement('canvas'); c.width=48;c.height=72;
  const ct=c.getContext('2d'); ct.imageSmoothingEnabled=false;
  const s=3, F=(x,y,w,h,col)=>{ct.fillStyle=col;ct.fillRect(x*s,y*s,w*s,h*s);};
  F(3,1,8,2,'#1e1b2e'); F(3,2,8,6,'#f4a261');
  F(5,5,1,1,'#1e1b2e'); F(8,5,1,1,'#1e1b2e');
  F(4,8,6,6,'#00c2e0'); F(4,14,2,3,'#1a1a3e'); F(8,14,2,3,'#1a1a3e');
  F(3,17,3,2,'#2d2d2d'); F(8,17,3,2,'#2d2d2d');
  const el=document.querySelector('.pixel-char-preview');
  if(el){el.style.backgroundImage=`url(${c.toDataURL()})`;el.style.backgroundSize='contain';el.style.backgroundRepeat='no-repeat';el.style.backgroundPosition='center';}
}
function startLoading() {
  const bar=document.getElementById('loading-bar'), txt=document.getElementById('loading-text');
  const msgs=['Memuat aset...','Menggambar peta...','Menghidupkan karakter...','Melatih kucing NPC...','Siap!'];
  let pct=0;
  const iv=setInterval(()=>{
    pct+=Math.random()*15+6; if(pct>=100){pct=100;clearInterval(iv);}
    bar.style.width=pct+'%';
    txt.textContent=msgs[Math.min(Math.floor(pct/25),msgs.length-1)];
    if(pct>=100) setTimeout(()=>{document.getElementById('press-start').style.display='block';},400);
  },200);
}
function startGame() {
  document.getElementById('loading-screen').style.display='none';
  document.getElementById('game-wrapper').style.display='flex';
  buildCollision(); resizeCanvas();
  requestAnimationFrame(ts=>{lastTime=ts;loop(ts);});
}
document.getElementById('loading-screen').addEventListener('click',()=>{
  if(document.getElementById('press-start').style.display!=='none') startGame();
});
document.addEventListener('keydown',e=>{
  if(e.key==='Enter'&&document.getElementById('loading-screen').style.display!=='none')
    if(document.getElementById('press-start').style.display!=='none') startGame();
});

drawLoadingChar(); populateDOM(); startLoading();
