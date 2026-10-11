/* Letters live in content.js. Tulip notes are below. */
const TULIPS=[ /* short notes shown when she taps a tulip. Replace with your own words if you like */
"Hi Mika! This tulip is blue because it was thinking of you. 💙",
"You deserve soft days and gentle things. ♡",
"Somebody smiles a little whenever he thinks of you. 🩵",
"Keep walking, Mika. The mailbox is waiting. ✉️",
"You are cute, you know that? ✧",
"Take your time here. No rush. ♡"];
/* ====================================================================== */
const $=s=>document.querySelector(s),R=Math.random,RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const mk=(c,t='div',h='')=>{const e=document.createElement(t);e.className=c;e.innerHTML=h;return e};
const PAL={b:'#87CEEB',u:'#3d78b8',n:'#0B1F3A',g:'#3f8f6a',l:'#DCEEFF',w:'#F5F9FF',r:'#d0204a',d:'#7a0c24',p:'#8a79b0'};
const spr=(rows,s)=>{const c=document.createElement('canvas');c.width=rows[0].length*s;c.height=rows.length*s;const x=c.getContext('2d');
rows.forEach((r,y)=>[...r].forEach((ch,i)=>{if(PAL[ch]){x.fillStyle=PAL[ch];x.fillRect(i*s,y*s,s,s)}}));return c.toDataURL()};
const im=(rows,s,k=1)=>{const i=new Image();i.src=spr(rows,s);i.alt='';i.draggable=false;i.style.width=rows[0].length*s*k+'px';return i};
const A=t=>t.split(',');
const TULIP=A('.b.bbb.b.,.bbbbbbb.,.bbblbbb.,..bbbbb..,...ubu...,....g....,....g....,.gg.g....,..ggg....,....g.gg.,....ggg..,....g....');
const LILY=A('r..r.r..r,.r.r.r.r.,..rrrrr..,.rrdrdrr.,r..rdr..r,....g....,....g....,...gg....,....g.g..,....gg...,....g....,....g....');
const HEART=A('.bb.bb.,blbbbbb,bbbbbbb,.bbbbb.,..bbb..,...b...');
const STAR=A('..b..,..b..,bbwbb,..b..,..b..'),STARW=A('..w..,..w..,wwwww,..w..,..w..');
const MOON=A('..llll..,.llllll.,lllllull,llllllll,lullllll,llllllll,.llllll.,..llll..');
const MAIL=A('.uuuuuuuu.,uuuuuuuuuu,uullllllu,uulnnnnluu,uulnnnnluu,uullllllu,uuuuuuuuuu,....pp....,....pp....,....pp....,....pp....'.replace(/uullllllu/g,'uullllllu'));
const txt=t=>{const d=mk('msg');d.textContent=t;return d};
const rich=(t,pc)=>{const d=mk('rich');t.trim().split(/\n\s*\n/).forEach(p=>{p=p.trim();let e;
if(p.startsWith('# ')){e=mk('rh','h2');e.textContent=p.slice(2)}
else{e=mk(pc+(/^\*\*[^*]+\*\*$/.test(p)?' em':''),'p');p.split('**').forEach((x,i)=>{const n=mk('',i%2?'strong':'span');n.textContent=x;e.append(n)})}
d.append(e)});return d};

function sky(sc,petals){const l=mk('layer');sc.prepend(l);
for(let i=0;i<55;i++){const s=mk('st'),z=R()<.2?4:2;s.style.cssText=`left:${R()*100}%;top:${R()*55}%;width:${z}px;height:${z}px;opacity:${.3+R()*.7};animation-delay:${R()*4}s`;l.append(s)}
const m=im(MOON,6);m.className='moon';l.append(m,mk('ground'),mk('path'));
for(let i=0;i<14;i++){const f=mk('ff');f.style.cssText=`left:${R()*100}%;top:${45+R()*50}%;animation-duration:${6+R()*6}s;animation-delay:${-R()*8}s`;l.append(f)}
for(let i=0;i<(petals?20:8);i++){const h=mk(petals?'pet':'hrt','span',petals?'':'♥');h.style.cssText=`left:${R()*100}%;animation-delay:${-R()*14}s;animation-duration:${(petals?7:12)+R()*8}s;font-size:${12+R()*10}px`;l.append(h)}
return l}
function flowers(sc,rows,pos,click){pos.forEach(([x,y,k],i)=>{const b=mk('tl'+(click?'':' dec'),click?'button':'div');
if(click)b.setAttribute('aria-label','Blue tulip, tap for a note');b.style.cssText=`left:${x}%;bottom:${y}%;animation-delay:${-R()*5}s`;b.append(im(rows,5,k));
if(click)b.onclick=()=>win('NOTE.TXT ♡',txt(TULIPS[i%TULIPS.length]));sc.append(b)})}

const show=id=>{document.querySelectorAll('.scene').forEach(s=>s.classList.toggle('on',s.id==id));const s=$('#'+id);s.scrollTop=0;
setTimeout(()=>{const b=s.querySelector('button');b&&b.focus({preventScroll:true})},950)};
let last;
function win(title,node){const m=$('#modal');m.innerHTML='';last=document.activeElement;const w=mk('win');w.setAttribute('role','dialog');w.setAttribute('aria-modal','true');w.setAttribute('aria-label',title);
const h=mk('wt','div',`<span>${title}</span>`),x=mk('x','button','✕');x.setAttribute('aria-label','Close');x.onclick=close;h.append(x);
const b=mk('wb');b.append(node);w.append(h,b);m.append(w);m.hidden=false;x.focus()}
function close(){$('#modal').hidden=true;last&&last.focus&&last.focus()}
$('#modal').onclick=e=>{if(e.target.id=='modal')close()};
addEventListener('keydown',e=>{if(e.key=='Escape')close()});

/* scenes */
const P1=[[6,6,1.3],[20,24,1],[30,10,1.2],[70,10,1.2],[80,26,1],[92,6,1.3]];
sky($('#s1'));flowers($('#s1'),TULIP,P1,false);
sky($('#s2'));flowers($('#s2'),TULIP,P1,true);
sky($('#s6'),true);flowers($('#s6'),LILY,[[4,5,1.4],[18,18,1],[30,4,1.2],[66,6,1.2],[80,20,1],[92,6,1.4]],false);
const mb=$('#mailbox');const mh=im(HEART,4);mh.className='mh';mb.append(mh,im(MAIL,6));
$('#letter').append(rich(LETTER,'lp'));$('#final').append(rich(FINAL,'msg'));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('v');io.unobserve(e.target)}}),{threshold:.1,root:$('#s5')});
document.querySelectorAll('.lp').forEach(p=>io.observe(p));
[[8,12],[22,70],[40,30],[60,18],[75,55],[90,35],[14,45]].forEach(([x,y])=>{const s=im(STAR,3);s.style.cssText=`left:${x}%;top:${y}%;animation-delay:${R()*3}s`;$('#stars').append(s)});

$('#enter').onclick=()=>show('s2');
mb.onclick=()=>{const d=mk('');d.innerHTML=`<p>📬 1 new message</p><p>From: someone who made this for you</p><p>Subject: something I've been wanting to tell you</p>`;
const b=mk('btn','button','OPEN MESSAGE ♡');b.onclick=()=>{close();show('s4')};d.append(b);win('MAILBOX.EXE',d)};
$('#env').onclick=e=>{const v=e.currentTarget;v.classList.add('open');v.disabled=true;setTimeout(()=>{$('#envmsg').hidden=false;$('#read').focus()},RM?0:1300)};
$('#read').onclick=()=>show('s5');
$('#last').onclick=()=>show('s6');

/* hidden star -> heart */
const sp=$('#sp');let found=0;sp.append(im(STARW,5));
function burst(e){const r=e.getBoundingClientRect();for(let i=0;i<14;i++){const s=mk('sp','span',i%3?'✦':'♥');
s.style.cssText=`left:${r.left+r.width/2}px;top:${r.top+r.height/2}px;--x:${(R()-.5)*170}px;--y:${(R()-.5)*170}px`;document.body.append(s);setTimeout(()=>s.remove(),1000)}}
sp.onclick=()=>{const first=!found;if(first){found=1;burst(sp);sp.firstChild.src=spr(HEART,5);sp.classList.add('heart');sp.setAttribute('aria-label','A secret little heart')}
setTimeout(()=>win('SECRET.TXT ♡',rich(SECRET,'msg')),first&&!RM?800:0)};

/* pointer sparkles */
let lt=0;if(!RM)addEventListener('pointermove',e=>{if(e.pointerType!='mouse'||Date.now()-lt<60)return;lt=Date.now();
const s=mk('tr','span','✦');s.style.cssText=`left:${e.clientX}px;top:${e.clientY}px`;document.body.append(s);setTimeout(()=>s.remove(),700)});

/* music */
const au=$('#au'),pp=$('#pp'),pr=$('#pr'),tm=$('#tm');
const f=t=>isFinite(t)?Math.floor(t/60)+':'+String(Math.floor(t%60)).padStart(2,'0'):'0:00';
au.onerror=()=>{$('#pt').textContent='Music file not found yet ♡';pp.disabled=true;pr.disabled=true};
pp.onclick=()=>au.paused?au.play().catch(()=>{}):au.pause();
au.onplay=()=>{pp.textContent='❚❚';pp.setAttribute('aria-label','Pause')};
au.onpause=()=>{pp.textContent='▶';pp.setAttribute('aria-label','Play')};
au.ontimeupdate=au.onloadedmetadata=()=>{pr.value=au.duration?au.currentTime/au.duration*100:0;tm.textContent=f(au.currentTime)+' / '+f(au.duration)};
pr.oninput=()=>{if(au.duration)au.currentTime=pr.value/100*au.duration};
