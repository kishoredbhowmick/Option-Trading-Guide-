// ---------- Page metadata ----------
const pages = [
  {id:'p1',label:'Welcome'},
  {id:'p2',label:'Read the Market'},
  {id:'p3',label:'Options Basics'},
  {id:'p4',label:'Profit & Loss'},
  {id:'p5',label:'First Trade'},
  {id:'p6',label:'20 Must-Knows'},
  {id:'p7',label:'90-Day Roadmap'}
];

// ---------- Dot nav ----------
const dotNav = document.getElementById('dotNav');
pages.forEach((p,i)=>{
  const btn = document.createElement('button');
  btn.dataset.label = (i+1)+' · '+p.label;
  btn.dataset.target = p.id;
  btn.addEventListener('click',()=>{
    document.getElementById(p.id).scrollIntoView({behavior:'smooth'});
  });
  dotNav.appendChild(btn);
});

function updateActiveDot(){
  const dots = dotNav.querySelectorAll('button');
  let closestIdx = 0, closestDist = Infinity;
  pages.forEach((p,i)=>{
    const el = document.getElementById(p.id);
    const dist = Math.abs(el.getBoundingClientRect().top);
    if(dist < closestDist){closestDist = dist; closestIdx = i;}
  });
  dots.forEach((d,i)=> d.classList.toggle('active', i===closestIdx));

  const total = document.body.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  const pct = total>0 ? (scrolled/total)*100 : 0;
  document.getElementById('progressBar').style.width = pct+'%';
}
window.addEventListener('scroll', updateActiveDot);
window.addEventListener('resize', updateActiveDot);
updateActiveDot();

// ---------- Ticker content ----------
const tickerTerms = [
  ['EMA 21','▲'],['VWAP','▲'],['RSI 58','▲'],['CALL','▲'],['PUT','▼'],['STRIKE','—'],
  ['THETA','▼'],['ATM','—'],['ITM','▲'],['OTM','▼'],['STOP LOSS','—'],['RISK 1-2%','—'],
  ['SUPPORT','▲'],['RESISTANCE','▼'],['EMA 50','▲'],['EMA 200','▲']
];
function buildTicker(){
  const track = document.getElementById('tickerTrack');
  let html = '';
  for(let r=0;r<2;r++){
    tickerTerms.forEach(([label,dir])=>{
      const dn = dir==='▼' ? ' dn' : '';
      html += `<span class="${dn.trim()}">${label} <b class="${dn.trim()}">${dir}</b></span>`;
    });
  }
  track.innerHTML = html;
}
buildTicker();

// ---------- 20 terms grid ----------
const terms = [
  ['Trend','The overall direction price has been travelling — up, down, or sideways.','Tells you which side to trade with'],
  ['Candlesticks','A picture of one period\'s open, high, low and close.','Reveals buyer vs seller strength'],
  ['Support','A price level where buyers have repeatedly stepped in.','A sensible place to expect a bounce'],
  ['Resistance','A price level where sellers have repeatedly stepped in.','A sensible place to take profit'],
  ['EMA','A moving average that reacts to recent price changes.','Confirms whether a trend is real'],
  ['VWAP','The volume-weighted average price for the day so far.','Shows the market\'s fair price today'],
  ['RSI','A momentum meter running from 0 to 100.','Flags overbought or oversold moments'],
  ['Volume','The number of contracts actually traded.','Confirms whether a move has conviction'],
  ['Call Option','The right to buy at the strike price.','Used when you expect price to rise'],
  ['Put Option','The right to sell at the strike price.','Used when you expect price to fall'],
  ['Strike Price','The price level locked into the contract.','Defines your breakeven point'],
  ['Premium','The cost of buying the option.','Your maximum possible loss as a buyer'],
  ['Expiry','The date the option contract ends.','Value decays as this date nears'],
  ['ITM','In-the-money — the option already has real value.','Worth exercising right now'],
  ['ATM','At-the-money — strike sits near the current price.','A balance of cost vs probability'],
  ['OTM','Out-of-the-money — the option has no real value yet.','Cheaper, but a lower chance of paying off'],
  ['Time Decay','Value an option loses simply as expiry nears.','Works quietly against every buyer'],
  ['Volatility','How fast and how far price tends to swing.','Higher volatility means pricier premiums'],
  ['Risk Management','The habits that limit how much you can lose.','Keeps one bad trade from ending your account'],
  ['Trading Psychology','Your discipline and emotional control.','Often matters more than the strategy itself']
];
const termGrid = document.getElementById('termGrid');
terms.forEach((t,i)=>{
  const div = document.createElement('div');
  div.className = 'term-card';
  div.innerHTML = `<span class="num">${String(i+1).padStart(2,'0')}</span>
    <span class="term">${t[0]}</span>
    <span class="def">${t[1]}</span>
    <span class="why">${t[2]}</span>`;
  termGrid.appendChild(div);
});

// ---------- Keyboard navigation ----------
window.addEventListener('keydown', e=>{
  if(e.key==='ArrowDown' || e.key==='PageDown'){
    e.preventDefault();
    scrollToRelative(1);
  } else if(e.key==='ArrowUp' || e.key==='PageUp'){
    e.preventDefault();
    scrollToRelative(-1);
  }
});
function scrollToRelative(dir){
  let idx = 0, closest = Infinity;
  pages.forEach((p,i)=>{
    const el = document.getElementById(p.id);
    const dist = Math.abs(el.getBoundingClientRect().top);
    if(dist < closest){closest = dist; idx = i;}
  });
  const next = Math.min(pages.length-1, Math.max(0, idx+dir));
  document.getElementById(pages[next].id).scrollIntoView({behavior:'smooth'});
}
