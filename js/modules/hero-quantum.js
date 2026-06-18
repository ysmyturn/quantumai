// 히어로 2D 캔버스 풀스택 내러티브 시퀀스 (기술→플랫폼→코어 페이즈 애니메이션)
function initHeroQuantum() {
  // NodeList.forEach 폴리필
  if (window.NodeList && !NodeList.prototype.forEach)
    NodeList.prototype.forEach = Array.prototype.forEach;
  if (window.HTMLCollection && !HTMLCollection.prototype.forEach)
    HTMLCollection.prototype.forEach = Array.prototype.forEach;

  const cv = document.getElementById('heroKvCanvas');
  if(!cv) return;
  const ctx = cv.getContext('2d');
  const labelHost  = document.getElementById('heroNodeLabels');
  const coreTitle  = document.getElementById('heroCoreTitle');
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  let W=0, H=0, DPR=Math.min(window.devicePixelRatio||1, 2);
  // 써클 중심/반경 스케일 — 배너 우측 영역 안에 맞춰 동적으로 계산
  let CX=0, CY=0, RBASE=0;
  function computeScale(){
    const narrow = W <= 900;
    // 배너가 중앙 단독 배치이므로 써클을 가로/세로 정중앙에 둔다.
    CX = W * 0.5;
    CY = H * 0.5;
    // 채워진 원 단계는 외곽 링/글로우가 RBASE의 약 1.1배까지 퍼지므로,
    // 그 최대 반경이 영역을 벗어나지 않도록 역산해서 clamp한다. (잘림 방지)
    const OUTER = 1.15;       // 외곽 링/글로우 여유 배수
    const margin = 24;        // 영역 안쪽 최소 여백
    const sideSpace = (Math.min(CX, W - CX) - margin) / OUTER;
    const vertSpace = (Math.min(CY, H - CY) - margin) / OUTER;
    const rByMin = Math.min(W, H) * 0.42;
    RBASE = Math.max(54, Math.min(rByMin, sideSpace, vertSpace));
  }
  function resize(){
    const rc = cv.parentElement.getBoundingClientRect();
    W = rc.width; H = rc.height;
    cv.width = W*DPR; cv.height = H*DPR;
    cv.style.width = W+'px'; cv.style.height = H+'px';
    ctx.setTransform(1,0,0,1,0,0); ctx.scale(DPR,DPR);
    computeScale();
    positionChips();
  }

  // floating chip을 써클 둘레에 배치 (좁은 화면에서 원 가까이 모이도록)
  const chipEls = {
    c1: document.querySelector('.chip.c1'),
    c2: document.querySelector('.chip.c2'),
    c3: document.querySelector('.chip.c3')
  };
  function clearChipInline(el){
    if(!el) return;
    el.style.top=''; el.style.left=''; el.style.right=''; el.style.bottom=''; el.style.maxWidth='';
  }
  function placeChip(el, cx, cy){
    if(!el) return;
    // CSS의 right/bottom 값을 먼저 무력화해야 칩이 콘텐츠 기준 자연 폭을 가짐
    // (left + right가 동시에 적용되면 칩이 가로로 늘어나 버림)
    el.style.right='auto'; el.style.bottom='auto'; el.style.maxWidth='86vw';
    const cw = el.offsetWidth || 180;
    const ch = el.offsetHeight || 56;
    // 칩 중심이 (cx,cy)에 오도록 → left/top 환산, 배너 안쪽으로 clamp
    let left = cx - cw/2;
    let top  = cy - ch/2;
    left = Math.max(8, Math.min(left, W - cw - 8));
    top  = Math.max(8, Math.min(top,  H - ch - 8));
    el.style.left = left+'px';
    el.style.top  = top+'px';
  }
  function positionChips(){
    const narrow = W <= 900;
    if(!narrow){
      // 넓은 화면: 칩을 화면 우측 끝(CSS 기본)이 아니라 써클 노드 클러스터 가까이에 배치
      const ro = RBASE;
      placeChip(chipEls.c1, CX + ro*0.70, CY - ro*1.42);  // 문서 인식률 (써클 위쪽)
      placeChip(chipEls.c3, CX + ro*1.30, CY - ro*0.85);  // 심사 자동화 (써클 우상, Jeffri 노드 위쪽으로 분리)
      placeChip(chipEls.c2, CX + ro*0.05, CY + ro*1.62);  // 운영비 절감 (써클 아래쪽, Info Entropy 라벨 아래로 분리)
      return;
    }
    // 좁은 화면: 하단 중앙 써클의 둘레에 3개를 바짝 붙여 배치
    const ro = RBASE + 28;
    placeChip(chipEls.c1, CX - ro*0.72, CY - ro*0.62);  // 문서 인식률 (좌상)
    placeChip(chipEls.c3, CX + ro*0.80, CY - ro*0.42);  // 심사 자동화 (우상)
    placeChip(chipEls.c2, CX - ro*0.70, CY + ro*0.70);  // 운영비 절감 (좌하)
  }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('load', positionChips);
  if(document.fonts && document.fonts.ready){ document.fonts.ready.then(positionChips); }
  setTimeout(positionChips, 1000);

  // palette
  const BLUE   = [60,130,255];
  const BLUE_L = [120,175,255];
  const BLUE_D = [30,80,220];
  const CYAN   = [90,200,255];
  function rgba(c,a){ return 'rgba('+c[0]+','+c[1]+','+c[2]+','+a+')'; }

  // 4 proprietary technologies
  const TECHS = [
    {name:'Data2Vec',          sub:'멀티모달 데이터 통합'},
    {name:'QuantumQuant',      sub:'초경량 벡터 압축'},
    {name:'Jeffri (qLLM)',     sub:'초경량 추론 엔진'},
    {name:'Information Entropy',sub:'정보 정밀 복원'}
  ];
  // 4 platform products
  const PLATS = [
    {name:'qeepi',     sub:'비정형 데이터 플랫폼'},
    {name:'sooni',    sub:'지능형 고객소통'},
    {name:'Claim-Q',  sub:'보험 업무 자동화'},
    {name:'AI Agent', sub:'상담 지원 및 자동 요약'}
  ];

  // label DOM (8개: 기술4 + 플랫폼4)
  const labelEls = [];
  function buildLabels(){
    if(!labelHost) return;
    labelHost.innerHTML='';
    const all = TECHS.concat(PLATS);
    for(let i=0;i<all.length;i++){
      const el=document.createElement('div');
      el.className='hero-node';
      el.innerHTML='<span class="hero-node-label">'+all[i].name+'</span><span class="hero-node-sub">'+all[i].sub+'</span>';
      labelHost.appendChild(el);
      labelEls.push(el);
    }
  }
  buildLabels();

  // particles
  let N = 0, P = [];
  let BN = 0, BG = [];
  function setup(){
    N = (W<560)? 520 : 900;
    P = [];
    for(let i=0;i<N;i++){
      P.push({
        x:CX, y:CY, px:CX, py:CY,
        a:Math.random()*Math.PI*2,
        rad:Math.random(),
        spd:0.3+Math.random()*0.9,
        size:0.6+Math.random()*1.8,
        group:i%4,
        seed:Math.random()*1000,
        col: Math.random()<0.3?BLUE_L:BLUE,
        alpha:0
      });
    }
    BN = (W<560)? 140 : 280;
    BG = [];
    for(let i=0;i<BN;i++){
      BG.push({
        bx:Math.random(), by:Math.random(),
        amp:6+Math.random()*22,
        spd:0.15+Math.random()*0.5,
        ph:Math.random()*Math.PI*2,
        size:0.4+Math.random()*1.4,
        col: Math.random()<0.35?BLUE_L:BLUE,
        baseA:0.12+Math.random()*0.4,
        twk:0.6+Math.random()*1.8
      });
    }
  }
  setup();
  window.addEventListener('resize', setup);

  function techPos(g){
    const cx=CX, cy=CY, r=RBASE;
    const ang = [-Math.PI/2, Math.PI, 0, Math.PI/2][g];
    return {x:cx+Math.cos(ang)*r, y:cy+Math.sin(ang)*r};
  }
  function platPos(g, t){
    const cx=CX, cy=CY, r=RBASE*1.06;
    const ang = -Math.PI/2 + g*(Math.PI*2/4) + t*0.12;
    return {x:cx+Math.cos(ang)*r, y:cy+Math.sin(ang)*r};
  }

  function easeInOut(t){ t=Math.min(Math.max(t,0),1); return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2; }
  function easeOut(t){ return 1-Math.pow(1-Math.min(Math.max(t,0),1),2.6); }

  const DUR = [2.6, 2.6, 2.0, 2.2, 3.0, 2.8, 3.0];
  let phase=0, pt=0, globalT=0;
  let raf=null, visible=true, last=0;

  function updateLabels(techVis, platVis, posTech, posPlat){
    for(let i=0;i<labelEls.length;i++){
      const el=labelEls[i];
      let vis, x, y;
      if(i<4){ vis=techVis; const p=posTech[i]; x=p.x; y=p.y; }
      else   { vis=platVis; const p=posPlat[i-4]; x=p.x; y=p.y; }
      if(vis<=0.01){ el.style.opacity='0'; continue; }
      el.style.opacity=vis.toFixed(3);
      const offY = (y < H/2) ? -34 : 30;
      el.style.left=x+'px';
      el.style.top=(y+offY)+'px';
    }
  }

  function drawNodeMarker(x,y,scale,alpha,color){
    const r=7*scale;
    const g=ctx.createRadialGradient(x,y,0,x,y,r*3);
    g.addColorStop(0, rgba(color, 0.5*alpha));
    g.addColorStop(1, rgba(color, 0));
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,r*3,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
    ctx.strokeStyle=rgba(BLUE_L, 0.95*alpha); ctx.lineWidth=2.4*scale; ctx.stroke();
    ctx.beginPath(); ctx.arc(x,y,r*0.42,0,Math.PI*2);
    ctx.fillStyle=rgba([255,255,255],0.9*alpha); ctx.fill();
  }

  function drawBg(){
    ctx.clearRect(0,0,W,H);
    const vis = (phase>=5)? Math.min((pt+(phase-5)*DUR[5])/2,1) : (phase>=3?0.4:0.15);
    const g=ctx.createRadialGradient(CX,CY,0,CX,CY,Math.min(W,H)*0.55);
    g.addColorStop(0, rgba(BLUE, 0.10*vis));
    g.addColorStop(1, 'rgba(7,11,24,0)');
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  }

  function drawAmbient(envAlpha){
    if(envAlpha<=0.01) return;
    for(let i=0;i<BN;i++){
      const b=BG[i];
      const fx=Math.cos(globalT*b.spd+b.ph)*b.amp;
      const fy=Math.sin(globalT*b.spd*0.8+b.ph*1.3)*b.amp;
      const x=b.bx*W+fx, y=b.by*H+fy;
      const tw=0.55+0.45*Math.sin(globalT*b.twk+b.ph);
      const a=b.baseA*tw*envAlpha;
      if(a<=0.01) continue;
      if(b.size>0.9){
        const gr=ctx.createRadialGradient(x,y,0,x,y,b.size*4);
        gr.addColorStop(0, rgba(b.col, a*0.5));
        gr.addColorStop(1, rgba(b.col, 0));
        ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(x,y,b.size*4,0,Math.PI*2); ctx.fill();
      }
      ctx.beginPath(); ctx.arc(x,y,b.size,0,Math.PI*2);
      ctx.fillStyle=rgba(b.col, a); ctx.fill();
    }
  }

  function drawDottedNetwork(posPlat, alpha){
    if(alpha<=0.01) return;
    ctx.save();
    ctx.setLineDash([1.5,5]); ctx.lineWidth=1;
    for(let i=0;i<posPlat.length;i++){
      for(let j=i+1;j<posPlat.length;j++){
        ctx.beginPath();
        ctx.moveTo(posPlat[i].x,posPlat[i].y);
        ctx.lineTo(posPlat[j].x,posPlat[j].y);
        ctx.strokeStyle=rgba(BLUE_L, 0.22*alpha); ctx.stroke();
      }
    }
    ctx.beginPath(); ctx.arc(CX,CY,RBASE*1.06,0,Math.PI*2);
    ctx.strokeStyle=rgba(BLUE_L,0.16*alpha); ctx.stroke();
    ctx.restore(); ctx.setLineDash([]);
  }

  function frame(){
    const now=performance.now();
    const dt=Math.min((now-last)/1000,0.05); last=now;
    globalT+=dt; pt+=dt;
    const dur=DUR[phase], prog=Math.min(pt/dur,1);

    drawBg();

    let ambientEnv;
    if(phase===4) ambientEnv = 0.85+0.15*Math.sin(globalT*0.7);
    else if(phase===3) ambientEnv = 0.4+0.6*Math.min(pt/DUR[3],1);
    else if(phase===5) ambientEnv = 1.0-0.6*Math.min(pt/DUR[5],1);
    else if(phase===1) ambientEnv = 0.5;
    else if(phase===0 || phase===2 || phase===6) ambientEnv = 0.35;
    else ambientEnv = 0.5;
    drawAmbient(ambientEnv);

    const posTech=[0,1,2,3].map(g=>techPos(g));
    const posPlat=[0,1,2,3].map(g=>platPos(g, globalT));
    const cx=CX, cy=CY;
    let techVis=0, platVis=0, netAlpha=0;

    for(let i=0;i<N;i++){
      const p=P[i];
      let tx,ty,ta;

      if(phase===0){
        const tp=posTech[p.group], e=easeOut(prog);
        const scatterX=cx+Math.cos(p.a)*p.rad*RBASE*1.05;
        const scatterY=cy+Math.sin(p.a)*p.rad*RBASE*1.05;
        const clusterR=18+p.rad*30;
        const nx=tp.x+Math.cos(p.a+globalT*p.spd)*clusterR;
        const ny=tp.y+Math.sin(p.a+globalT*p.spd)*clusterR;
        tx=scatterX+(nx-scatterX)*e; ty=scatterY+(ny-scatterY)*e;
        ta=0.5+0.4*e; techVis=easeOut((prog-0.6)/0.4);
      } else if(phase===1){
        const tp=posTech[p.group], clusterR=18+p.rad*30;
        tx=tp.x+Math.cos(p.a+globalT*p.spd)*clusterR;
        ty=tp.y+Math.sin(p.a+globalT*p.spd)*clusterR;
        ta=0.7+0.25*Math.sin(globalT*2+p.seed); techVis=1;
      } else if(phase===2){
        const tp=posTech[p.group], e=easeInOut(prog);
        const clusterR=18+p.rad*30;
        const fx=tp.x+Math.cos(p.a+globalT*p.spd)*clusterR;
        const fy=tp.y+Math.sin(p.a+globalT*p.spd)*clusterR;
        const coreR=10+p.rad*22;
        const cxp=cx+Math.cos(p.a+globalT*p.spd*2)*coreR;
        const cyp=cy+Math.sin(p.a+globalT*p.spd*2)*coreR;
        tx=fx+(cxp-fx)*e; ty=fy+(cyp-fy)*e;
        ta=0.7; techVis=Math.max(0,1-prog*1.8);
      } else if(phase===3){
        const pp=posPlat[p.group], e=easeOut(prog);
        const coreR=10+p.rad*22;
        const cxp=cx+Math.cos(p.a+globalT*p.spd*2)*coreR;
        const cyp=cy+Math.sin(p.a+globalT*p.spd*2)*coreR;
        const clusterR=16+p.rad*26;
        const nx=pp.x+Math.cos(p.a+globalT*p.spd)*clusterR;
        const ny=pp.y+Math.sin(p.a+globalT*p.spd)*clusterR;
        tx=cxp+(nx-cxp)*e; ty=cyp+(ny-cyp)*e;
        ta=0.7; platVis=easeOut((prog-0.55)/0.45);
      } else if(phase===4){
        const pp=posPlat[p.group], clusterR=16+p.rad*26;
        tx=pp.x+Math.cos(p.a+globalT*p.spd)*clusterR;
        ty=pp.y+Math.sin(p.a+globalT*p.spd)*clusterR;
        ta=0.72+0.2*Math.sin(globalT*2+p.seed);
        platVis=1; netAlpha=easeInOut(prog);
      } else if(phase===5){
        const pp=posPlat[p.group], e=easeInOut(prog);
        const clusterR=16+p.rad*26;
        const onNode={x:pp.x+Math.cos(p.a+globalT*p.spd)*clusterR, y:pp.y+Math.sin(p.a+globalT*p.spd)*clusterR};
        const fillR=RBASE*p.rad;
        const fa=p.a+globalT*p.spd*0.6;
        const inside={x:cx+Math.cos(fa)*fillR, y:cy+Math.sin(fa)*fillR};
        tx=onNode.x+(inside.x-onNode.x)*e; ty=onNode.y+(inside.y-onNode.y)*e;
        ta=0.55+0.3*Math.sin(globalT*2+p.seed);
        platVis=Math.max(0,1-prog*1.5); netAlpha=1;
      } else {
        const fillR=RBASE*p.rad;
        const fa=p.a+globalT*p.spd*0.6;
        tx=cx+Math.cos(fa)*fillR; ty=cy+Math.sin(fa)*fillR;
        ta=0.5+0.35*Math.sin(globalT*2.4+p.seed);
        netAlpha=Math.max(0,1-prog*1.6);
      }

      const k=0.18;
      p.x+=(tx-p.x)*k; p.y+=(ty-p.y)*k;
      p.alpha+=(ta-p.alpha)*0.12;
    }

    drawDottedNetwork(posPlat, netAlpha);

    if(phase>=5){
      const fillProg = phase===5? easeInOut(prog) : 1;
      const r=RBASE*1.05;
      const g=ctx.createRadialGradient(cx,cy,0,cx,cy,r);
      g.addColorStop(0, rgba(BLUE, 0.42*fillProg));
      g.addColorStop(0.6, rgba(BLUE_D, 0.28*fillProg));
      g.addColorStop(1, rgba(BLUE_D, 0));
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx,cy,r*0.92,0,Math.PI*2);
      ctx.strokeStyle=rgba(BLUE_L,0.5*fillProg); ctx.lineWidth=1.5; ctx.stroke();
    }

    for(let i=0;i<N;i++){
      const p=P[i];
      if(p.alpha<0.02) continue;
      if(p.size>1.4){
        const gr=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.size*3.5);
        gr.addColorStop(0, rgba(p.col, p.alpha*0.4));
        gr.addColorStop(1, rgba(p.col, 0));
        ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(p.x,p.y,p.size*3.5,0,Math.PI*2); ctx.fill();
      }
      ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
      ctx.fillStyle=rgba(p.col, Math.min(p.alpha,1)); ctx.fill();
    }

    if(techVis>0.02) for(let g=0;g<4;g++) drawNodeMarker(posTech[g].x,posTech[g].y,1,techVis,BLUE);
    if(platVis>0.02) for(let g=0;g<4;g++) drawNodeMarker(posPlat[g].x,posPlat[g].y,1,platVis,BLUE);

    updateLabels(techVis, platVis, posTech, posPlat);

    if(coreTitle){
      let tv=0, sc=0.7;
      if(phase===6){ tv=easeOut(prog*1.4); sc=0.7+0.3*easeOut(prog*1.4); }
      coreTitle.style.left = CX + 'px';
      coreTitle.style.opacity=tv.toFixed(3);
      coreTitle.style.transform='translate(-50%,-50%) scale('+sc.toFixed(3)+')';
    }

    if(prog>=1){ phase=(phase+1)%DUR.length; pt=0; }
    if(!reduce && visible) raf=requestAnimationFrame(frame);
  }

  const io=new IntersectionObserver(es=>{
    es.forEach(e=>{
      visible=e.isIntersecting;
      if(visible && !reduce && !raf){ last=performance.now(); raf=requestAnimationFrame(frame); }
      else if(!visible && raf){ cancelAnimationFrame(raf); raf=null; }
    });
  },{threshold:0.01});
  io.observe(cv);

  if(reduce){ last=performance.now(); frame(); }
  else { last=performance.now(); raf=requestAnimationFrame(frame); }
}
