/* themes.js v15 - 20 ثيم احترافي + حجم ونمط الخط - PRO */
const themes = {
  light:{'--bg':'#f8fafc','--bg-soft':'#f1f5f9','--card':'#ffffff','--card-border':'#e2e8f0','--text':'#0f172a','--text-soft':'#64748b','--primary':'#0f172a','--hero':'#0f172a','--accent':'#3b82f6'},
  dark:{'--bg':'#0f172a','--bg-soft':'#1e293b','--card':'#1e293b','--card-border':'#334155','--text':'#f1f5f9','--text-soft':'#94a3b8','--primary':'#38bdf8','--hero':'#38bdf8','--accent':'#38bdf8'},
  black:{'--bg':'#000000','--bg-soft':'#171717','--card':'#171717','--card-border':'#262626','--text':'#fafafa','--text-soft':'#a1a1aa','--primary':'#fafafa','--hero':'#fafafa','--accent':'#fafafa'},
  dracula:{'--bg':'#282a36','--bg-soft':'#44475a','--card':'#44475a','--card-border':'#6272a4','--text':'#f8f8f2','--text-soft':'#bd93f9','--primary':'#ff79c6','--hero':'#ff79c6','--accent':'#50fa7b'},
  nord:{'--bg':'#2e3440','--bg-soft':'#3b4252','--card':'#3b4252','--card-border':'#4c566a','--text':'#eceff4','--text-soft':'#88c0d0','--primary':'#88c0d0','--hero':'#88c0d0','--accent':'#81a1c1'},
  material:{'--bg':'#121212','--bg-soft':'#1e1e1e','--card':'#1e1e1e','--card-border':'#2c2c2c','--text':'#e0e0e0','--text-soft':'#9e9e9e','--primary':'#bb86fc','--hero':'#bb86fc','--accent':'#03dac6'},
  oneDark:{'--bg':'#282c34','--bg-soft':'#21252b','--card':'#21252b','--card-border':'#2c313a','--text':'#abb2bf','--text-soft':'#5c6370','--primary':'#61afef','--hero':'#61afef','--accent':'#98c379'},
  solarized:{'--bg':'#fdf6e3','--bg-soft':'#eee8d5','--card':'#eee8d5','--card-border':'#93a1a1','--text':'#586e75','--text-soft':'#93a1a1','--primary':'#268bd2','--hero':'#268bd2','--accent':'#859900'},
  gruvbox:{'--bg':'#282828','--bg-soft':'#3c3836','--card':'#3c3836','--card-border':'#504945','--text':'#ebdbb2','--text-soft':'#a89984','--primary':'#fabd2f','--hero':'#fabd2f','--accent':'#fe8019'},
  catppuccin:{'--bg':'#1e1e2e','--bg-soft':'#313244','--card':'#313244','--card-border':'#45475a','--text':'#cdd6f4','--text-soft':'#a6adc8','--primary':'#cba6f7','--hero':'#cba6f7','--accent':'#f38ba8'},
  tokyo:{'--bg':'#1a1b26','--bg-soft':'#24283b','--card':'#24283b','--card-border':'#414868','--text':'#c0caf5','--text-soft':'#565f89','--primary':'#7aa2f7','--hero':'#7aa2f7','--accent':'#bb9af7'},
  rose:{'--bg':'#191724','--bg-soft':'#1f1d2e','--card':'#1f1d2e','--card-border':'#26233a','--text':'#e0def4','--text-soft':'#908caa','--primary':'#eb6f92','--hero':'#eb6f92','--accent':'#f6c177'},
  everforest:{'--bg':'#2d353b','--bg-soft':'#343f44','--card':'#343f44','--card-border':'#3d484d','--text':'#d3c6aa','--text-soft':'#9aa79d','--primary':'#a7c080','--hero':'#a7c080','--accent':'#e69875'},
  kanagawa:{'--bg':'#1f1f28','--bg-soft':'#2a2a37','--card':'#2a2a37','--card-border':'#363646','--text':'#dcd7ba','--text-soft':'#938aa9','--primary':'#7e9cd8','--hero':'#7e9cd8','--accent':'#957fb8'},
  cyberpunk:{'--bg':'#0a0a0f','--bg-soft':'#181825','--card':'#181825','--card-border':'#313244','--text':'#cdd6f4','--text-soft':'#f5c2e7','--primary':'#f38ba8','--hero':'#f38ba8','--accent':'#89dceb'},
  ocean:{'--bg':'#0e1a2b','--bg-soft':'#13233f','--card':'#13233f','--card-border':'#1c3a5f','--text':'#e6f0ff','--text-soft':'#7aa5d6','--primary':'#3b82f6','--hero':'#3b82f6','--accent':'#06b6d4'},
  forest:{'--bg':'#111b16','--bg-soft':'#1a2a20','--card':'#1a2a20','--card-border':'#2a4a33','--text':'#dcfce7','--text-soft':'#86efac','--primary':'#22c55e','--hero':'#22c55e','--accent':'#16a34a'},
  sunset:{'--bg':'#1f1215','--bg-soft':'#2d1a1e','--card':'#2d1a1e','--card-border':'#4a2a2e','--text':'#ffe4e6','--text-soft':'#fda4af','--primary':'#f43f5e','--hero':'#f43f5e','--accent':'#fb7185'},
  midnight:{'--bg':'#020617','--bg-soft':'#0f172a','--card':'#0f172a','--card-border':'#1e293b','--text':'#f8fafc','--text-soft':'#64748b','--primary':'#6366f1','--hero':'#6366f1','--accent':'#8b5cf6'},
  clay:{'--bg':'#f5f0eb','--bg-soft':'#e8ddd3','--card':'#ffffff','--card-border':'#d6c7b8','--text':'#3d2c1f','--text-soft':'#8d7d6f','--primary':'#a16207','--hero':'#a16207','--accent':'#d97706'}
};
const fonts = {
  tajawal: "'Tajawal', sans-serif",
  cairo: "'Cairo', sans-serif",
  amiri: "'Amiri', serif",
  ibm: "'IBM Plex Sans Arabic', sans-serif",
  rubik: "'Rubik', sans-serif"
};
let currentTheme = localStorage.getItem('omar_theme') || 'light';
let currentFontSize = parseInt(localStorage.getItem('omar_font_size') || '14');
let currentFontFamily = localStorage.getItem('omar_font_family') || 'tajawal';
const channel = new BroadcastChannel('omar_theme_channel_v15');
function applyTheme(name){
  if(!themes[name]) name='light';
  currentTheme=name;
  const t=themes[name];
  Object.entries(t).forEach(([k,v])=>document.documentElement.style.setProperty(k,v));
  localStorage.setItem('omar_theme',name);
  try{channel.postMessage({type:'theme',value:name});}catch(e){}
  const dot=document.getElementById('curDot');
  if(dot && t['--primary']) dot.style.background=t['--primary'];
  const sel=document.getElementById('themeSelect');
  if(sel) sel.value=name;
}
function applyFontSize(size){
  currentFontSize=parseInt(size);
  document.documentElement.style.fontSize=currentFontSize+'px';
  localStorage.setItem('omar_font_size',currentFontSize);
  const v=document.getElementById('fontVal');
  if(v) v.textContent=currentFontSize+'px';
  const s=document.getElementById('fontSlider');
  if(s) s.value=currentFontSize;
  try{channel.postMessage({type:'fontSize',value:currentFontSize});}catch(e){}
}
function applyFontFamily(name){
  if(!fonts[name]) name='tajawal';
  currentFontFamily=name;
  document.documentElement.style.setProperty('--font-main',fonts[name]);
  document.body.style.fontFamily=fonts[name];
  localStorage.setItem('omar_font_family',name);
  try{channel.postMessage({type:'fontFamily',value:name});}catch(e){}
  const sel=document.getElementById('fontFamilySelect');
  if(sel) sel.value=name;
}
function cycleTheme(dir){
  const keys=Object.keys(themes);
  let idx=keys.indexOf(currentTheme);
  idx=(idx+dir+keys.length)%keys.length;
  applyTheme(keys[idx]);
}
channel.onmessage=(e)=>{
  if(e.data.type==='theme') applyTheme(e.data.value);
  if(e.data.type==='fontSize') applyFontSize(e.data.value);
  if(e.data.type==='fontFamily') applyFontFamily(e.data.value);
};
document.addEventListener('DOMContentLoaded',()=>{
  applyTheme(currentTheme);
  applyFontSize(currentFontSize);
  applyFontFamily(currentFontFamily);
});
function setFontSize(v){applyFontSize(v)}
