// ── FIREBASE CONFIG — replace with your real values ──────────────────
const FB={apiKey:'REPLACE_WITH_YOUR_API_KEY',authDomain:'REPLACE',databaseURL:'REPLACE',projectId:'REPLACE',storageBucket:'REPLACE',messagingSenderId:'REPLACE',appId:'REPLACE'};
const DEMO_MODE=FB.apiKey.startsWith('REPLACE');
const DEMO_DOCTORS=[
  {id:'d1',name:'Dr. R. Sharma',qualification:'MBBS, MD',department:'General OPD',pin:'1234',isActive:true,currentToken:18,totalTokens:34,avgMin:8},
  {id:'d2',name:'Dr. P. Mehta',qualification:'DM',department:'Cardiology',pin:'2345',isActive:true,currentToken:6,totalTokens:14,avgMin:12},
  {id:'d3',name:'Dr. S. Verma',qualification:'MS Ortho',department:'Orthopaedics',pin:'3456',isActive:true,currentToken:9,totalTokens:18,avgMin:10},
  {id:'d4',name:'Dr. A. Gupta',qualification:'MD Paeds',department:'Paediatrics',pin:'4567',isActive:true,currentToken:4,totalTokens:9,avgMin:7},
  {id:'d5',name:'Dr. N. Singh',qualification:'MS Gynae',department:'Gynaecology',pin:'5678',isActive:true,currentToken:7,totalTokens:12,avgMin:10},
  {id:'d6',name:'Dr. K. Rao',qualification:'MS ENT',department:'ENT',pin:'6789',isActive:true,currentToken:5,totalTokens:11,avgMin:8},
];
const DEMO_APPOINTMENTS=[
  {id:'a1',token:1,name:'Suresh Kumar',phone:'9800111111',dept:'General OPD',doctorId:'d1',time:'08:00',status:'done',reminderSent:true,isReturning:false},
  {id:'a2',token:2,name:'Priya Singh',phone:'9800222222',dept:'General OPD',doctorId:'d1',time:'08:20',status:'done',reminderSent:true,isReturning:true},
  {id:'a3',token:3,name:'Mohan Das',phone:'9800333333',dept:'General OPD',doctorId:'d1',time:'08:40',status:'done',reminderSent:true,isReturning:false},
  {id:'a4',token:4,name:'Anita Devi',phone:'9800444444',dept:'General OPD',doctorId:'d1',time:'09:00',status:'done',reminderSent:true,isReturning:true},
  {id:'a5',token:5,name:'Rajesh Gupta',phone:'9800555555',dept:'General OPD',doctorId:'d1',time:'09:20',status:'done',reminderSent:true,isReturning:false},
  {id:'a6',token:6,name:'Sunita Verma',phone:'9800666666',dept:'General OPD',doctorId:'d1',time:'09:40',status:'done',reminderSent:true,isReturning:true},
  {id:'a7',token:7,name:'Kavita Sharma',phone:'9800777777',dept:'General OPD',doctorId:'d1',time:'10:00',status:'done',reminderSent:true,isReturning:false},
  {id:'a8',token:8,name:'Amit Jain',phone:'9800888888',dept:'General OPD',doctorId:'d1',time:'10:20',status:'done',reminderSent:true,isReturning:false},
  {id:'a9',token:9,name:'Rekha Patel',phone:'9800999999',dept:'General OPD',doctorId:'d1',time:'10:40',status:'done',reminderSent:true,isReturning:true},
  {id:'a10',token:10,name:'Vijay Tiwari',phone:'9801010101',dept:'General OPD',doctorId:'d1',time:'11:00',status:'done',reminderSent:true,isReturning:false},
  {id:'a11',token:11,name:'Meena Agarwal',phone:'9801111111',dept:'General OPD',doctorId:'d1',time:'11:20',status:'done',reminderSent:true,isReturning:true},
  {id:'a12',token:12,name:'Deepak Mishra',phone:'9801212121',dept:'General OPD',doctorId:'d1',time:'11:40',status:'done',reminderSent:true,isReturning:false},
  {id:'a13',token:13,name:'Pooja Yadav',phone:'9801313131',dept:'General OPD',doctorId:'d1',time:'12:00',status:'done',reminderSent:true,isReturning:false},
  {id:'a14',token:14,name:'Ravi Shankar',phone:'9801414141',dept:'General OPD',doctorId:'d1',time:'12:20',status:'done',reminderSent:true,isReturning:true},
  {id:'a15',token:15,name:'Geeta Kumari',phone:'9801515151',dept:'General OPD',doctorId:'d1',time:'12:40',status:'done',reminderSent:true,isReturning:false},
  {id:'a16',token:16,name:'Arvind Kumar',phone:'9801616161',dept:'General OPD',doctorId:'d1',time:'13:00',status:'done',reminderSent:true,isReturning:true},
  {id:'a17',token:17,name:'Lalita Devi',phone:'9801717171',dept:'General OPD',doctorId:'d1',time:'13:20',status:'done',reminderSent:true,isReturning:false},
  {id:'a18',token:18,name:'Santosh Singh',phone:'9801818181',dept:'General OPD',doctorId:'d1',time:'13:40',status:'current',reminderSent:true,isReturning:true},
  {id:'a19',token:19,name:'Uma Sharma',phone:'9801919191',dept:'General OPD',doctorId:'d1',time:'14:00',status:'waiting',reminderSent:true,isReturning:false},
  {id:'a20',token:20,name:'Harish Pandey',phone:'9802020202',dept:'General OPD',doctorId:'d1',time:'14:20',status:'waiting',reminderSent:false,isReturning:false},
  {id:'a21',token:21,name:'Sita Rani',phone:'9802121212',dept:'General OPD',doctorId:'d1',time:'14:40',status:'waiting',reminderSent:false,isReturning:true},
  {id:'a22',token:22,name:'Bharat Lal',phone:'9802222222',dept:'General OPD',doctorId:'d1',time:'15:00',status:'waiting',reminderSent:false,isReturning:false},
  {id:'a23',token:23,name:'Kamla Devi',phone:'9802323232',dept:'General OPD',doctorId:'d1',time:'15:20',status:'waiting',reminderSent:false,isReturning:false},
  {id:'a24',token:24,name:'Ramesh Tiwari',phone:'9802424242',dept:'General OPD',doctorId:'d1',time:'15:40',status:'waiting',reminderSent:false,isReturning:true},
  {id:'a25',token:25,name:'Pushpa Devi',phone:'9802525252',dept:'General OPD',doctorId:'d1',time:'16:00',status:'waiting',reminderSent:false,isReturning:false},
  {id:'a26',token:26,name:'Naresh Kumar',phone:'9802626262',dept:'General OPD',doctorId:'d1',time:'16:20',status:'waiting',reminderSent:false,isReturning:false},
  {id:'a27',token:27,name:'Shakuntala',phone:'9802727272',dept:'General OPD',doctorId:'d1',time:'16:40',status:'waiting',reminderSent:false,isReturning:true},
  {id:'a28',token:28,name:'Dinesh Gupta',phone:'9802828282',dept:'General OPD',doctorId:'d1',time:'17:00',status:'waiting',reminderSent:false,isReturning:false},
  {id:'a29',token:29,name:'Leela Bai',phone:'9802929292',dept:'General OPD',doctorId:'d1',time:'17:20',status:'waiting',reminderSent:false,isReturning:false},
  {id:'a30',token:30,name:'Yogesh Singh',phone:'9803030303',dept:'General OPD',doctorId:'d1',time:'17:40',status:'waiting',reminderSent:false,isReturning:true},
  {id:'a31',token:31,name:'Madhuri Devi',phone:'9803131313',dept:'General OPD',doctorId:'d1',time:'18:00',status:'waiting',reminderSent:false,isReturning:false},
  {id:'a32',token:32,name:'Prakash Rao',phone:'9803232323',dept:'General OPD',doctorId:'d1',time:'18:20',status:'waiting',reminderSent:false,isReturning:false},
  {id:'a33',token:33,name:'Sarla Kumari',phone:'9803333333',dept:'General OPD',doctorId:'d1',time:'18:40',status:'waiting',reminderSent:false,isReturning:true},
  {id:'a34',token:34,name:'Mukesh Lal',phone:'9803434343',dept:'General OPD',doctorId:'d1',time:'19:00',status:'waiting',reminderSent:false,isReturning:false},
];
const DEMO_ANALYTICS={
  '2026-03-18':{total:34,seen:17,walkouts:3,peakHour:'10:00',avgWait:48,byHour:{8:4,9:5,10:7,11:6,12:5,13:4,14:3}},
  '2026-03-17':{total:41,seen:41,walkouts:4,peakHour:'11:00',avgWait:52,byHour:{8:5,9:6,10:8,11:9,12:7,13:4,14:3}},
  '2026-03-16':{total:38,seen:38,walkouts:2,peakHour:'10:00',avgWait:45,byHour:{8:4,9:6,10:8,11:7,12:6,13:5,14:2}},
  '2026-03-15':{total:29,seen:29,walkouts:5,peakHour:'09:00',avgWait:38,byHour:{8:6,9:8,10:6,11:5,12:3,13:1,14:0}},
  '2026-03-14':{total:44,seen:44,walkouts:2,peakHour:'11:00',avgWait:55,byHour:{8:5,9:7,10:8,11:10,12:7,13:5,14:2}},
  '2026-03-13':{total:36,seen:36,walkouts:3,peakHour:'10:00',avgWait:44,byHour:{8:4,9:6,10:9,11:7,12:5,13:4,14:1}},
  '2026-03-12':{total:22,seen:22,walkouts:1,peakHour:'09:00',avgWait:32,byHour:{8:5,9:7,10:5,11:3,12:2,13:0,14:0}},
};
const DEMO_PATIENTS={
  '9800222222':{name:'Priya Singh',totalVisits:5,firstVisit:'2025-10-12',lastVisit:'2026-03-16'},
  '9800444444':{name:'Anita Devi',totalVisits:3,firstVisit:'2025-12-01',lastVisit:'2026-03-10'},
  '9800666666':{name:'Sunita Verma',totalVisits:7,firstVisit:'2025-08-20',lastVisit:'2026-03-15'},
  '9801010101':{name:'Vijay Tiwari',totalVisits:2,firstVisit:'2026-01-05',lastVisit:'2026-03-14'},
};

// ── STATE ────────────────────────────────────────────────────────────
let unlocked    = false;
let activeDoc   = null;
let appointments = [];
let analytic7   = DEMO_ANALYTICS;

// ── PIN HINTS (demo only) ─────────────────────────────────────────────
const hintsEl = document.getElementById('pin-hints');
DEMO_DOCTORS.filter(d => d.isActive).forEach(d => {
  hintsEl.innerHTML += `<div style="font-size:12px;color:var(--muted);">${d.department}: PIN <strong>${d.pin}</strong></div>`;
});

// ── PIN CHECK ─────────────────────────────────────────────────────────
window.onPinInput = function(val) {
  if (val.length < 4) return;
  const doc = DEMO_DOCTORS.find(d => d.pin === val);
  if (doc) {
    unlocked  = true;
    activeDoc = doc;
    showDashboard();
  } else {
    const inp = document.getElementById('pin-input');
    inp.classList.add('shake');
    document.getElementById('pin-error').textContent = 'Incorrect PIN — try again';
    setTimeout(() => { inp.classList.remove('shake'); inp.value = ''; document.getElementById('pin-error').textContent = ''; }, 800);
  }
};

function showDashboard() {
  document.getElementById('pin-screen').style.display  = 'none';
  document.getElementById('doc-bar').style.display     = 'block';
  document.getElementById('dashboard').style.display   = 'block';
  renderDocBar();
  loadDoctorData(activeDoc);
}

window.lockPanel = function() {
  unlocked = false; activeDoc = null;
  document.getElementById('pin-screen').style.display  = 'block';
  document.getElementById('doc-bar').style.display     = 'none';
  document.getElementById('dashboard').style.display   = 'none';
  document.getElementById('pin-input').value = '';
};

// ── DOC BAR ────────────────────────────────────────────────────────────
function renderDocBar() {
  const inner = document.getElementById('doc-sel-inner');
  inner.innerHTML = '';
  DEMO_DOCTORS.filter(d => d.isActive).forEach(d => {
    const btn = document.createElement('button');
    btn.className = 'doc-sel-btn' + (d.id === activeDoc.id ? ' active' : '');
    btn.textContent = `${d.name} — ${d.department}`;
    btn.onclick = () => {
      if (d.id === activeDoc.id) return;
      // require PIN for other doctors
      const pin = prompt(`Enter PIN for ${d.name}:`);
      if (pin !== d.pin) { showToast('❌ Wrong PIN'); return; }
      activeDoc = d;
      document.querySelectorAll('.doc-sel-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadDoctorData(d);
    };
    inner.appendChild(btn);
  });
}

// ── LOAD DOCTOR DATA ───────────────────────────────────────────────────
function loadDoctorData(doc) {
  document.getElementById('dash-title').textContent = `${doc.name} — ${doc.department}`;
  document.getElementById('dash-date').textContent  =
    new Date().toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' });

  appointments = DEMO_APPOINTMENTS.filter(a => a.doctorId === doc.id);
  renderStats();
  renderApts();
  renderAnalytics();
}

// ── STATS ─────────────────────────────────────────────────────────────
function renderStats() {
  const done    = appointments.filter(a => a.status === 'done').length;
  const waiting = appointments.filter(a => a.status === 'waiting').length;
  const total   = appointments.length;
  document.getElementById('s-current').textContent = activeDoc.currentToken;
  document.getElementById('s-waiting').textContent = waiting;
  document.getElementById('s-done').textContent    = done;
  document.getElementById('s-total').textContent   = total;
  const next = activeDoc.currentToken + 1;
  document.getElementById('next-num').textContent  = next <= activeDoc.totalTokens ? next : '✓';
}

// ── NEXT PATIENT ───────────────────────────────────────────────────────
window.nextPatient = async function() {
  if (activeDoc.currentToken >= activeDoc.totalTokens) {
    showToast('✅ All patients seen!'); return;
  }
  const prev = appointments.find(a => a.token === activeDoc.currentToken);
  if (prev) prev.status = 'done';
  activeDoc.currentToken++;
  const curr = appointments.find(a => a.token === activeDoc.currentToken);
  if (curr) curr.status = 'current';

  if (!DEMO_MODE) {
    try {
      const { getDatabase, ref, set } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js');
      await set(ref(window.__rtdb, `hospitals/demo_hospital/doctors/${activeDoc.id}/currentToken`), activeDoc.currentToken);
      const { getFirestore, doc, updateDoc } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js');
      if (prev) await updateDoc(doc(window.__db, `hospitals/demo_hospital/appointments/${prev.id}`), { status:'done' });
      if (curr) await updateDoc(doc(window.__db, `hospitals/demo_hospital/appointments/${curr.id}`), { status:'current' });
    } catch(e) { console.error(e); }
  }

  const btn = document.getElementById('next-btn');
  btn.classList.add('fired');
  setTimeout(() => btn.classList.remove('fired'), 400);
  renderStats(); renderApts();
  showToast(`✅ Now serving Token ${activeDoc.currentToken}${curr ? ' — ' + curr.name : ''}`);
};

// ── APPOINTMENTS TABLE ────────────────────────────────────────────────
function renderApts() {
  const list = document.getElementById('apts-list');
  if (!appointments.length) {
    list.innerHTML = '<div class="empty-state"><div class="empty-icon">📋</div><div class="empty-text">No appointments today</div></div>';
    return;
  }
  list.innerHTML = '';
  [...appointments].sort((a,b) => a.token - b.token).forEach(a => {
    const isCurrent = a.status === 'current';
    const isDone    = a.status === 'done';
    const tokenColor = isCurrent ? 'var(--accent-d)' : isDone ? 'var(--muted)' : 'var(--ink)';
    const row = document.createElement('div');
    row.className = 'apt-row' + (isCurrent ? ' is-current' : '') + (isDone ? ' is-done' : '');
    row.innerHTML = `
      <span class="apt-token" style="color:${tokenColor}">${a.token}</span>
      <span>
        <div class="apt-name">${a.name} ${a.isReturning ? '<span class="badge badge-blue" style="font-size:11px;padding:2px 7px;">🔄 Returning</span>' : ''}</div>
        <div class="apt-phone">${a.phone}</div>
      </span>
      <span class="apt-dept">${a.dept}</span>
      <span class="apt-time">${a.time}</span>
      <span>${statusBadge(a.status)}</span>
      <span class="apt-actions">
        ${!isDone ? `<button class="btn btn-sm btn-accent" onclick="markDone('${a.id}')">Done</button>` : ''}
        ${a.status === 'waiting' ? `<button class="btn btn-sm btn-red" onclick="markWalkout('${a.id}')">Out</button>` : ''}
      </span>`;
    list.appendChild(row);
  });
}

function statusBadge(s) {
  if (s==='done')    return '<span class="badge badge-gray">Seen</span>';
  if (s==='current') return '<span class="badge badge-green"><span class="badge-dot pulse"></span>In Cabin</span>';
  if (s==='walkout') return '<span class="badge badge-red">Walkout</span>';
  return '<span class="badge badge-amber">Waiting</span>';
}

window.markDone = function(id) {
  const a = appointments.find(x => x.id === id);
  if (a) { a.status = 'done'; renderApts(); renderStats(); showToast('Marked as done'); }
};
window.markWalkout = function(id) {
  const a = appointments.find(x => x.id === id);
  if (a) { a.status = 'walkout'; renderApts(); renderStats(); showToast('Marked as walkout'); }
};

window.resetDay = function() {
  if (!confirm('Reset queue to Token 1? This will re-mark all patients as waiting.')) return;
  activeDoc.currentToken = 1;
  appointments.forEach(a => { a.status = a.token === 1 ? 'current' : 'waiting'; });
  renderStats(); renderApts(); showToast('🔄 Queue reset to Token 1');
};

// ── ANALYTICS ─────────────────────────────────────────────────────────
function renderAnalytics() {
  const cont = document.getElementById('analytics-content');
  const dates = Object.keys(analytic7).sort().reverse();
  const d = analytic7[dates[0]]; // today's data

  cont.innerHTML = `
    <div class="day-pills" id="day-pills">
      ${dates.map((date, i) => `<button class="day-pill${i===0?' active':''}" onclick="selectDay('${date}', this)">${formatDate(date)}</button>`).join('')}
    </div>
    <div class="analytics-grid">
      <div class="analytics-card">
        <div class="anl-val">${d.total}</div>
        <div class="anl-label">Total Patients Booked</div>
        <div class="anl-trend up">↑ vs yesterday</div>
      </div>
      <div class="analytics-card">
        <div class="anl-val">${d.seen}</div>
        <div class="anl-label">Patients Seen</div>
        <div class="anl-trend up">↑ completion rate: ${Math.round(d.seen/d.total*100)}%</div>
      </div>
      <div class="analytics-card">
        <div class="anl-val" style="color:var(--red)">${d.walkouts}</div>
        <div class="anl-label">Walkouts</div>
        <div class="anl-trend down">↓ ${Math.round(d.walkouts/d.total*100)}% walkout rate</div>
      </div>
      <div class="analytics-card">
        <div class="anl-val">${d.avgWait}</div>
        <div class="anl-label">Avg Wait (minutes)</div>
        <div class="anl-trend" style="color:var(--muted);">Peak hour: ${d.peakHour}</div>
      </div>
    </div>
    <div class="bar-chart-wrap" id="bar-chart-wrap"></div>
  `;
  renderBarChart(d.byHour);
}

window.selectDay = function(date, btn) {
  document.querySelectorAll('.day-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const d = analytic7[date];
  if (!d) return;
  const anl = document.querySelector('.analytics-grid');
  if (anl) {
    const cards = anl.querySelectorAll('.analytics-card');
    const vals  = [d.total, d.seen, d.walkouts, d.avgWait];
    cards.forEach((c, i) => { c.querySelector('.anl-val').textContent = vals[i]; });
  }
  renderBarChart(d.byHour);
};

function renderBarChart(byHour) {
  const wrap = document.getElementById('bar-chart-wrap');
  if (!wrap) return;
  const max = Math.max(...Object.values(byHour), 1);
  let bars = '';
  Object.entries(byHour).forEach(([h, count]) => {
    const pct = Math.round((count / max) * 100);
    bars += `
      <div class="bar-col">
        <div class="bar" style="height:${pct}%;">
          <div class="bar-tooltip">${count} patients</div>
        </div>
        <div class="bar-label">${h}</div>
      </div>`;
  });
  wrap.innerHTML = `<div class="chart-title">Patients per hour</div><div class="bar-chart">${bars}</div>`;
}

function formatDate(d) {
  const dt = new Date(d);
  return dt.toLocaleDateString('en-IN', { weekday:'short', day:'numeric', month:'short' });
}

// ── PATIENT HISTORY ────────────────────────────────────────────────────
window.searchHistory = function() {
  const phone = document.getElementById('hist-phone').value.trim();
  const res   = document.getElementById('hist-result');
  if (!/^[6-9]\d{9}$/.test(phone)) {
    res.innerHTML = '<div class="body-sm" style="color:var(--red)">Enter a valid 10-digit number</div>';
    return;
  }
  const p = DEMO_PATIENTS[phone];
  if (!p) {
    res.innerHTML = `<div class="card-sm"><div class="body-sm">No records found for this number.</div></div>`;
    return;
  }
  res.innerHTML = `
    <div class="card-sm">
      <div style="font-size:16px;font-weight:600;margin-bottom:12px;">${p.name}</div>
      <div class="info-row" style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:13.5px;">
        <span style="color:var(--muted);">Total Visits</span><span style="font-weight:600;">${p.totalVisits}</span>
      </div>
      <div class="info-row" style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:13.5px;">
        <span style="color:var(--muted);">First Visit</span><span>${p.firstVisit}</span>
      </div>
      <div class="info-row" style="display:flex;justify-content:space-between;padding:8px 0;font-size:13.5px;">
        <span style="color:var(--muted);">Last Visit</span><span>${p.lastVisit}</span>
      </div>
    </div>`;
};

// ── TAB SWITCHER ───────────────────────────────────────────────────────
window.switchTab = function(tab, btn) {
  ['appointments','analytics','patients'].forEach(t => {
    document.getElementById(`tab-${t}`).style.display = t === tab ? 'block' : 'none';
  });
  document.querySelectorAll('.panel-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
};

// ── HELPERS ────────────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}