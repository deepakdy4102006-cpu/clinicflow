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
const DEMO_PATIENTS={
  '9800222222':{name:'Priya Singh',totalVisits:5,firstVisit:'2025-10-12',lastVisit:'2026-03-16'},
  '9800444444':{name:'Anita Devi',totalVisits:3,firstVisit:'2025-12-01',lastVisit:'2026-03-10'},
  '9800666666':{name:'Sunita Verma',totalVisits:7,firstVisit:'2025-08-20',lastVisit:'2026-03-15'},
  '9801010101':{name:'Vijay Tiwari',totalVisits:2,firstVisit:'2026-01-05',lastVisit:'2026-03-14'},
};

// ── STATE ────────────────────────────────────────────────────────────
let selectedSlot = null;
let isReturning  = false;
let allDoctors   = DEMO_DOCTORS;
const BOOKED = { 'General OPD':['08:00','09:00','10:00'], 'Cardiology':['09:00'], 'ENT':['09:20'] };

// ── QUEUE PEEK ────────────────────────────────────────────────────────
function renderQueuePeek() {
  const list = document.getElementById('qp-list');
  list.innerHTML = '';
  allDoctors.filter(d => d.isActive).forEach(d => {
    const waiting = d.totalTokens - d.currentToken;
    const cls = waiting < 5 ? 'low' : waiting < 12 ? 'mid' : 'high';
    list.innerHTML += `
      <div class="qp-doc">
        <div><div class="qp-dept">${d.department}</div><div class="qp-doc-name">${d.name}</div></div>
        <div style="text-align:right;">
          <div class="qp-token ${cls}">${d.currentToken}</div>
          <div class="qp-wait">~${waiting * d.avgMin} min wait</div>
        </div>
      </div>`;
  });
}
renderQueuePeek();

// ── PHONE CHECK ────────────────────────────────────────────────────────
window.checkPatient = async function() {
  const phone = document.getElementById('inp-phone').value.trim();
  if (!/^[6-9]\d{9}$/.test(phone)) {
    showErr('err-phone', true);
    return;
  }
  showErr('err-phone', false);
  const btn = document.getElementById('btn-check');
  btn.disabled = true; btn.textContent = 'Checking...';

  let patient = null;
  if (DEMO_MODE) {
    patient = DEMO_PATIENTS[phone] || null;
    await sleep(600);
  } else {
    // Firebase lookup
    try {
      const { getFirestore, doc, getDoc } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js');
      const snap = await getDoc(doc(window.__db, `hospitals/demo_hospital/patients/${phone}`));
      if (snap.exists()) patient = snap.data();
    } catch(e) { console.error(e); }
  }

  if (patient) {
    isReturning = true;
    document.getElementById('inp-name').value = patient.name;
    document.getElementById('returning-banner').classList.add('show');
    document.getElementById('ret-name').textContent = `Welcome back, ${patient.name}!`;
    document.getElementById('ret-sub').textContent  = `Visit #${patient.totalVisits + 1} · Name auto-filled for you`;
    showToast('👋 Returning patient recognised!');
  } else {
    isReturning = false;
    document.getElementById('returning-banner').classList.remove('show');
  }

  document.getElementById('form-rest').style.display = 'block';
  btn.disabled = false; btn.textContent = 'Check';
  document.getElementById('inp-name').focus();
};

// ── DEPT CHANGE ────────────────────────────────────────────────────────
window.onDeptChange = function() {
  const dept = document.getElementById('inp-dept').value;
  const docSel = document.getElementById('inp-doctor');
  docSel.disabled = !dept;
  docSel.innerHTML = '';

  const docs = allDoctors.filter(d => d.department === dept && d.isActive);
  if (!docs.length) { docSel.innerHTML = '<option>No doctor available</option>'; return; }
  docs.forEach(d => {
    const o = document.createElement('option');
    o.value = d.id; o.textContent = d.name;
    docSel.appendChild(o);
  });
  renderSlots(dept);
};

function renderSlots(dept) {
  const grid = document.getElementById('slot-grid');
  grid.innerHTML = '';
  selectedSlot = null;
  const times = ['08:00','08:20','08:40','09:00','09:20','09:40','10:00','10:20','10:40','11:00','11:20','11:40'];
  const booked = BOOKED[dept] || [];
  times.forEach(t => {
    const isB = booked.includes(t);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'slot-btn' + (isB ? ' booked' : '');
    btn.innerHTML = `<span class="slot-time">${t}</span><span class="slot-status">${isB ? 'Booked' : 'Available'}</span>`;
    if (!isB) btn.onclick = () => selectSlot(btn, t);
    grid.appendChild(btn);
  });
}

function selectSlot(btn, time) {
  document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedSlot = time;
  showErr('err-slot', false);
}

// ── SUBMIT ────────────────────────────────────────────────────────────
window.submitBooking = async function() {
  const phone  = document.getElementById('inp-phone').value.trim();
  const name   = document.getElementById('inp-name').value.trim();
  const dept   = document.getElementById('inp-dept').value;
  const docId  = document.getElementById('inp-doctor').value;
  const docName= document.getElementById('inp-doctor').selectedOptions[0]?.text || '';
  const date   = document.getElementById('inp-date').value;

  let ok = true;
  if (!name)  { showErr('err-name', true);  ok = false; }
  if (!dept)  { showErr('err-dept', true);  ok = false; }
  if (!selectedSlot) { showErr('err-slot', true); ok = false; }
  if (!ok) return;

  const btn = document.getElementById('btn-submit');
  btn.disabled = true; btn.classList.add('btn-loading'); btn.textContent = 'Booking...';

  await sleep(DEMO_MODE ? 900 : 200);

  // Assign token
  const doc = allDoctors.find(d => d.id === docId) || allDoctors.find(d => d.department === dept);
  doc.totalTokens++;
  const token = doc.totalTokens;

  if (!DEMO_MODE) {
    try {
      const { getFirestore, addDoc, collection, setDoc, doc: fsDoc, getDoc, arrayUnion, increment, serverTimestamp } =
        await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js');
      const { getDatabase, ref, set, get } =
        await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js');
      // Write appointment
      await addDoc(collection(window.__db, 'hospitals/demo_hospital/appointments'), {
        patientPhone:phone, patientName:name, doctorId:docId, doctorName:docName,
        department:dept, date: date==='today' ? today() : tomorrow(),
        timeSlot:selectedSlot, tokenNumber:token,
        status:'waiting', reminderSent:false, isReturning, createdAt:serverTimestamp()
      });
      // Update patient record
      await setDoc(fsDoc(window.__db, `hospitals/demo_hospital/patients/${phone}`), {
        name, phone, lastVisit:today(),
        firstVisit: isReturning ? undefined : today(),
        totalVisits: increment(1),
        visitHistory: arrayUnion({ date:today(), doctorId, department:dept })
      }, { merge:true });
      // Increment token in RTDB
      const tRef = ref(window.__rtdb, `hospitals/demo_hospital/doctors/${docId}/totalTokens`);
      const snap = await get(tRef);
      await set(tRef, (snap.val()||0)+1);
    } catch(e) { console.error(e); }
  }

  // Save to localStorage so patient view shows "your token"
  localStorage.setItem('cf_my_token', token);
  localStorage.setItem('cf_my_docid', docId || '');

  // Show confirmation
  document.getElementById('conf-token').textContent  = token;
  document.getElementById('conf-name').textContent   = name;
  document.getElementById('conf-doctor').textContent = docName;
  document.getElementById('conf-dept').textContent   = dept;
  document.getElementById('conf-time').textContent   = selectedSlot;
  document.getElementById('conf-phone').textContent  = phone;

  document.getElementById('form-wrap').style.display     = 'none';
  document.getElementById('confirm-wrap').classList.add('show');
  showToast(`✅ Booked! Token #${token} confirmed`);
};

window.resetForm = function() {
  document.getElementById('inp-phone').value = '';
  document.getElementById('inp-name').value  = '';
  document.getElementById('inp-dept').value  = '';
  document.getElementById('form-rest').style.display = 'none';
  document.getElementById('returning-banner').classList.remove('show');
  document.getElementById('form-wrap').style.display = 'block';
  document.getElementById('confirm-wrap').classList.remove('show');
  selectedSlot = null; isReturning = false;
};

// ── HELPERS ────────────────────────────────────────────────────────────
function showErr(id, show) {
  const el = document.getElementById(id);
  el.classList.toggle('show', show);
  el.previousElementSibling?.classList?.toggle('error', show);
}
function today()    { return new Date().toISOString().slice(0,10); }
function tomorrow() { const d = new Date(); d.setDate(d.getDate()+1); return d.toISOString().slice(0,10); }
function sleep(ms)  { return new Promise(r => setTimeout(r, ms)); }

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}