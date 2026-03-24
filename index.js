// ── FIREBASE CONFIG — replace these with your real values ──────────────
const FB = {
  apiKey:"REPLACE_WITH_YOUR_API_KEY",
  authDomain:"REPLACE_WITH_YOUR_AUTH_DOMAIN",
  databaseURL:"REPLACE_WITH_YOUR_DATABASE_URL",
  projectId:"REPLACE_WITH_YOUR_PROJECT_ID",
  storageBucket:"REPLACE_WITH_YOUR_STORAGE_BUCKET",
  messagingSenderId:"REPLACE_WITH_YOUR_SENDER_ID",
  appId:"REPLACE_WITH_YOUR_APP_ID"
};
const DEMO = FB.apiKey.startsWith("REPLACE");

// ── DEMO DATA ──────────────────────────────────────────────────────────
const DOCTORS=[
  {id:"d1",name:"Dr. R. Sharma",dept:"General OPD",qual:"MBBS, MD",current:18,total:34,avg:8},
  {id:"d2",name:"Dr. P. Mehta",dept:"Cardiology",qual:"DM",current:6,total:14,avg:12},
  {id:"d3",name:"Dr. S. Verma",dept:"Orthopaedics",qual:"MS Ortho",current:9,total:18,avg:10},
  {id:"d4",name:"Dr. A. Gupta",dept:"Paediatrics",qual:"MD Paeds",current:4,total:9,avg:7},
  {id:"d5",name:"Dr. N. Singh",dept:"Gynaecology",qual:"MS Gynae",current:7,total:12,avg:10},
  {id:"d6",name:"Dr. K. Rao",dept:"ENT",qual:"MS ENT",current:5,total:11,avg:8},
];
const ICONS={"General OPD":"🩺","Cardiology":"❤️","Orthopaedics":"🦴","Paediatrics":"👶","Gynaecology":"🌸","ENT":"👂"};

let activeDoc=DOCTORS[0];
let myToken=parseInt(localStorage.getItem("cf_token")||"0");
let lastUp=new Date();
let rtUnsubscribe=null;

// ── FIREBASE INIT ──────────────────────────────────────────────────────
async function initFirebase(){
  if(DEMO)return;
  try{
    const {initializeApp}=await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
    const {getDatabase,ref,onValue}=await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js");
    const app=initializeApp(FB);
    window._rtdb=getDatabase(app);
    window._rtRef=ref;
    window._rtOn=onValue;
    subscribeToDoctor(activeDoc);
  }catch(e){console.error("Firebase error:",e);}
}

function subscribeToDoctor(doc){
  if(rtUnsubscribe){rtUnsubscribe();rtUnsubscribe=null;}
  if(DEMO||!window._rtdb)return;
  const r=window._rtRef(window._rtdb,`hospitals/hospital_001/doctors/${doc.id}`);
  rtUnsubscribe=window._rtOn(r,snap=>{
    const d=snap.val()||{};
    doc.current=d.currentToken||doc.current;
    doc.total=d.totalTokens||doc.total;
    doc.avg=d.avgMinutesPerToken||doc.avg;
    lastUp=new Date();
    renderTokens();
  });
}

// ── RENDER ─────────────────────────────────────────────────────────────
function renderTabs(){
  const tabs=document.getElementById("doc-tabs");
  tabs.innerHTML="";
  DOCTORS.forEach((d,i)=>{
    const btn=document.createElement("button");
    btn.className="doc-tab"+(i===0?" active":"");
    btn.textContent=d.dept;
    btn.onclick=()=>{
      document.querySelectorAll(".doc-tab").forEach(t=>t.classList.remove("active"));
      btn.classList.add("active");
      activeDoc=d;
      subscribeToDoctor(d);
      renderTokens();
    };
    tabs.appendChild(btn);
  });
}

function renderTokens(){
  const el=document.getElementById("current-token");
  el.textContent=activeDoc.current;
  el.classList.add("flip");setTimeout(()=>el.classList.remove("flip"),400);
  document.getElementById("current-dept").textContent=activeDoc.dept+" · "+activeDoc.name;
  const ahead=Math.max(0,activeDoc.total-activeDoc.current);
  document.getElementById("wait-val").textContent=ahead*activeDoc.avg||"< 5";
  document.getElementById("ahead-val").textContent=ahead;
  document.getElementById("total-val").textContent=activeDoc.total;
  renderQueueBar();
  renderMyBanner(ahead);
  renderUpdatedText();
}

function renderQueueBar(){
  const bar=document.getElementById("queue-bar");
  bar.innerHTML="";
  const start=Math.max(1,activeDoc.current-8);
  const end=Math.min(activeDoc.total,start+24);
  for(let i=start;i<=end;i++){
    const t=document.createElement("div");
    t.className="qt "+(i<activeDoc.current?"done":i===activeDoc.current?"current":i===myToken?"mine":"waiting");
    t.textContent=i;bar.appendChild(t);
  }
}

function renderMyBanner(ahead){
  const wrap=document.getElementById("my-banner-wrap");
  if(!myToken||myToken<activeDoc.current){wrap.innerHTML="";return;}
  const wait=(myToken-activeDoc.current)*activeDoc.avg;
  wrap.innerHTML=`<div style="background:linear-gradient(135deg,var(--blue),#0040b8);border-radius:var(--radius-sm);padding:14px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px;">
    <div><div style="font-size:11px;color:rgba(255,255,255,0.55);letter-spacing:1px;text-transform:uppercase;font-weight:600;margin-bottom:4px;">Your Token</div>
    <div style="font-family:var(--font-h);font-size:32px;font-weight:700;color:#fff;line-height:1;">${myToken}</div>
    <div style="font-size:12px;color:rgba(255,255,255,0.6);margin-top:3px;">${myToken-activeDoc.current} ahead of you</div></div>
    <div style="text-align:right;color:rgba(255,255,255,0.8);font-size:13px;">~${wait} min wait<br><span style="color:rgba(255,255,255,0.5);font-size:12px;">Reminder 15 min before slot</span></div>
  </div>`;
}

function renderDeptGrid(){
  const g=document.getElementById("dept-grid");
  g.innerHTML="";
  DOCTORS.forEach(d=>{
    const waiting=d.total-d.current;
    const a=document.createElement("a");
    a.href="book.html";a.className="dept-card";
    a.innerHTML=`<span class="dept-icon">${ICONS[d.dept]||"🏥"}</span><div><div class="dept-name">${d.dept}</div><div class="dept-info">${d.name} · ${waiting>0?waiting+" waiting":"No wait"}</div></div>`;
    g.appendChild(a);
  });
}

function renderUpdatedText(){
  const diff=Math.floor((new Date()-lastUp)/1000);
  document.getElementById("updated-text").textContent=diff<5?"Just updated":`Updated ${diff}s ago`;
}

function showToast(m){
  const t=document.getElementById("toast");
  t.textContent=m;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),3000);
}

// ── INIT ───────────────────────────────────────────────────────────────
renderTabs();renderTokens();renderDeptGrid();
setInterval(renderUpdatedText,5000);
initFirebase();