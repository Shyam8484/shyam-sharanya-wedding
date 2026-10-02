const weddingDate = new Date("2026-12-13T11:15:00+05:30").getTime();

const reveal = new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>reveal.observe(el));

function tick(){
  const diff=Math.max(0,weddingDate-Date.now());
  const d=Math.floor(diff/86400000);
  const h=Math.floor(diff/3600000)%24;
  const m=Math.floor(diff/60000)%60;
  const s=Math.floor(diff/1000)%60;
  document.getElementById("days").textContent=String(d).padStart(2,"0");
  document.getElementById("hours").textContent=String(h).padStart(2,"0");
  document.getElementById("minutes").textContent=String(m).padStart(2,"0");
  document.getElementById("seconds").textContent=String(s).padStart(2,"0");
}
tick(); setInterval(tick,1000);


function openInvitation(){
  document.body.classList.add("invitation-opened");
  document.querySelector("#welcome").scrollIntoView({behavior:"smooth"});
}

const musicToggle = document.getElementById("musicToggle");
if(musicToggle){
  musicToggle.addEventListener("click", ()=>{
    musicToggle.textContent = musicToggle.textContent === "♪" ? "Ⅱ" : "♪";
    // Audio can be added later once you choose a royalty-free track.
  });
}

/* Card-opening interaction */
const cardOpening=document.getElementById("cardOpening"),cardEnvelope=document.querySelector(".card-envelope"),cardOpenButton=document.getElementById("cardOpenButton");if(cardOpenButton)cardOpenButton.addEventListener("click",()=>{cardEnvelope.classList.add("opened");setTimeout(()=>{cardOpening.classList.add("hidden");document.getElementById("welcome").scrollIntoView({behavior:"smooth"})},850)});
/* Scratch reveal */
const sc=document.getElementById("scratchCanvas");if(sc){const c=sc.getContext("2d"),w=sc.width,h=sc.height;const g=c.createLinearGradient(0,0,w,h);g.addColorStop(0,"#b88643");g.addColorStop(.5,"#d6aa61");g.addColorStop(1,"#9b6e32");c.fillStyle=g;c.fillRect(0,0,w,h);c.fillStyle="rgba(255,247,230,.78)";for(let i=0;i<90;i++){c.beginPath();c.arc(Math.random()*w,Math.random()*h,Math.random()*3+1,0,Math.PI*2);c.fill()}c.globalCompositeOperation="destination-out";let down=false,lx=0,ly=0;function pos(e){const r=sc.getBoundingClientRect(),q=e.touches?e.touches[0]:e;return[q.clientX-r.left,q.clientY-r.top]}function draw(e){if(!down)return;const[qx,qy]=pos(e);c.lineWidth=34;c.lineCap="round";c.beginPath();c.moveTo(lx,ly);c.lineTo(qx,qy);c.stroke();lx=qx;ly=qy}sc.addEventListener("pointerdown",e=>{down=true;[lx,ly]=pos(e)});sc.addEventListener("pointermove",draw);["pointerup","pointerleave","pointercancel"].forEach(x=>sc.addEventListener(x,()=>down=false))}

/* ===== ROBUST SCRATCH-TO-REVEAL ===== */
const scratchCanvas=document.getElementById("scratchCanvas");
if(scratchCanvas){
  const ctx=scratchCanvas.getContext("2d",{willReadFrequently:true});
  const W=700,H=260;
  let drawing=false, last=null;

  function cover(){
    const grad=ctx.createLinearGradient(0,0,W,H);
    grad.addColorStop(0,"#9b6e32");
    grad.addColorStop(.45,"#d6aa61");
    grad.addColorStop(1,"#a97835");
    ctx.globalCompositeOperation="source-over";
    ctx.fillStyle=grad;
    ctx.fillRect(0,0,W,H);

    // subtle gold flecks
    ctx.fillStyle="rgba(255,246,218,.5)";
    for(let i=0;i<150;i++){
      ctx.beginPath();
      ctx.arc(Math.random()*W,Math.random()*H,Math.random()*2.2+.5,0,Math.PI*2);
      ctx.fill();
    }
    ctx.fillStyle="rgba(255,248,225,.95)";
    ctx.font="600 22px Georgia";
    ctx.textAlign="center";
    ctx.fillText("SCRATCH TO REVEAL",W/2,H/2);
    ctx.font="14px Georgia";
    ctx.fillText("✦  OUR WEDDING DATE  ✦",W/2,H/2+30);
    ctx.globalCompositeOperation="destination-out";
  }

  function pointerPos(e){
    const r=scratchCanvas.getBoundingClientRect();
    return {
      x:(e.clientX-r.left)*(W/r.width),
      y:(e.clientY-r.top)*(H/r.height)
    };
  }
  function eraseTo(p){
    ctx.save();
    ctx.globalCompositeOperation="destination-out";
    ctx.lineWidth=42;
    ctx.lineCap="round";
    ctx.lineJoin="round";
    if(last){
      ctx.beginPath();
      ctx.moveTo(last.x,last.y);
      ctx.lineTo(p.x,p.y);
      ctx.stroke();
    }else{
      ctx.beginPath();
      ctx.arc(p.x,p.y,21,0,Math.PI*2);
      ctx.fill();
    }
    ctx.restore();
    last=p;
  }
  function percentCleared(){
    const data=ctx.getImageData(0,0,W,H).data;
    let transparent=0,total=0;
    for(let i=3;i<data.length;i+=32){
      total++;
      if(data[i]<50) transparent++;
    }
    return transparent/total;
  }

  cover();

  scratchCanvas.addEventListener("pointerdown",e=>{
    drawing=true;
    scratchCanvas.setPointerCapture?.(e.pointerId);
    last=null;
    eraseTo(pointerPos(e));
  });
  scratchCanvas.addEventListener("pointermove",e=>{
    if(!drawing)return;
    eraseTo(pointerPos(e));
    if(percentCleared()>.55){
      ctx.clearRect(0,0,W,H);
      ctx.globalCompositeOperation="destination-out";
      scratchCanvas.style.pointerEvents="none";
    }
  });
  const stop=()=>{drawing=false;last=null};
  ["pointerup","pointercancel","pointerleave"].forEach(ev=>scratchCanvas.addEventListener(ev,stop));
}

/* =========================================================
   OPENING SEQUENCE
   ========================================================= */
document.body.classList.add("invitation-locked");

const inviteGate = document.getElementById("inviteGate");
const gateButton = document.getElementById("gateButton");
const petalLayer = document.getElementById("petalLayer");

function createPetals(){
  if(!petalLayer) return;
  petalLayer.innerHTML = "";
  const count = window.innerWidth < 600 ? 34 : 52;

  for(let i=0;i<count;i++){
    const p = document.createElement("span");
    p.className = "petal";
    p.style.left = `${Math.random()*100}%`;
    p.style.setProperty("--fall", `${4.8 + Math.random()*3.8}s`);
    p.style.setProperty("--delay", `${Math.random()*1.9}s`);
    p.style.setProperty("--drift", `${-80 + Math.random()*160}px`);
    p.style.transform = `rotate(${Math.random()*360}deg)`;
    petalLayer.appendChild(p);
  }
}

function revealInvitation(){
  createPetals();
  document.body.classList.add("invitation-revealed");

  if(inviteGate){
    inviteGate.classList.add("is-opening");
  }

  // Lock is released after the opening transition starts,
  // so the user can immediately scroll once the hero is revealed.
  window.setTimeout(()=>{
    document.body.classList.remove("invitation-locked");
  }, 900);
}

if(gateButton){
  gateButton.addEventListener("click", revealInvitation);
}

function openInvitation(){
  // Kept for compatibility with any older markup.
  revealInvitation();
}
