
// drive-sync.js v28 - Hybrid Local + Auto Sync - Option 2
// المطلوب من المستخدم:
// 1- يعمل Google Apps Script جديد ويلصق كود الـ GAS اللي هنبعته
// 2- ينشره كـ Web App (Anyone with link)
// 3- ياخد الـ URL ويحطه في الإعدادات

window.DRIVE_ENABLED_KEY = 'omar_drive_enabled';
window.DRIVE_URL_KEY = 'omar_drive_url';
window.DRIVE_LAST_SYNC_KEY = 'omar_last_sync';
window.DRIVE_AUTO_KEY = 'omar_drive_auto';

function isDriveEnabled(){
  try{ var v=localStorage.getItem(window.DRIVE_ENABLED_KEY); if(v===null) return true; return v==='1'; }catch(e){ return true; }
}
const DEFAULT_DRIVE_URL = 'https://script.google.com/macros/s/AKfycbygAqDnhb9ES_uRf7plnyOfwJYd5PBo3chl9pfeUBE9ymYKADHDYxy4OwEfpHgcW0-dJg/exec';
function getDriveUrl(){
  try{ var u=localStorage.getItem(window.DRIVE_URL_KEY); return u||DEFAULT_DRIVE_URL; }catch(e){ return DEFAULT_DRIVE_URL; }
}
function setDriveStatus(txt){
  try{ var el=document.getElementById('driveStat'); if(el) el.textContent=txt; }catch(e){}
}

function getAllLocalData(){
  var keys = ['omar_tx_v3','omar_fixed_by_month','omar_fixed_templates','att_fixed_final','att_hols_fixed','att_notes','tasks_v6','tasks_data','omar_tasks','omar_theme','omar_font_size','omar_lang','omar_currency'];
  var data={};
  keys.forEach(k=>{ try{ var v=localStorage.getItem(k); if(v) data[k]=v; }catch(e){} });
  data._timestamp = new Date().toISOString();
  data._version = 'v28';
  return data;
}

async function driveSave(auto){
  var url = getDriveUrl();
  if(!url){ if(!auto) alert('حط رابط الـ Google Apps Script الأول في الإعدادات'); return false; }
  if(!isDriveEnabled() && !auto){ alert('فعل المزامنة الأول'); return false; }
  try{
    setDriveStatus('⏳ جاري الرفع...');
    var payload = getAllLocalData();
    var res = await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {'Content-Type':'text/plain'},
      body: JSON.stringify({action:'save', data: payload})
    });
    // no-cors => لا يمكن قراءة الرد لكنه ينجح
    var now = new Date().toLocaleString('ar-EG');
    try{ localStorage.setItem(window.DRIVE_LAST_SYNC_KEY, now); }catch(e){}
    setDriveStatus('✅ تم الرفع '+now);
    var ls=document.getElementById('lastSync'); if(ls) ls.textContent=now;
    var lb=document.getElementById('lastBackup'); if(lb) lb.textContent=now;
    return true;
  }catch(e){
    setDriveStatus('❌ فشل: '+e.message);
    console.log(e);
    return false;
  }
}

async function driveLoad(){
  var url = getDriveUrl();
  if(!url){ alert('حط رابط الـ Apps Script الأول'); return false; }
  try{
    setDriveStatus('⏳ جاري التحميل...');
    var res = await fetch(url+'?action=load', {method:'GET'});
    var json = await res.json();
    if(json && json.data){
      Object.keys(json.data).forEach(k=>{
        if(k.startsWith('_')) return;
        try{ localStorage.setItem(k, json.data[k]); }catch(e){}
      });
      var now = new Date().toLocaleString('ar-EG');
      try{ localStorage.setItem(window.DRIVE_LAST_SYNC_KEY, now); }catch(e){}
      setDriveStatus('✅ تم التحميل '+now);
      alert('✅ تم التحميل من Drive - سيتم إعادة التحميل');
      location.reload();
    }else{
      setDriveStatus('⚠️ لا يوجد بيانات على Drive');
    }
  }catch(e){
    setDriveStatus('❌ فشل التحميل: '+e.message);
  }
}

// Auto save بعد كل persist ب 1.5 ثانية
var _driveTimer=null;
window.drive_auto_save = function(){
  try{
    if(!isDriveEnabled()) return;
    if(localStorage.getItem(window.DRIVE_AUTO_KEY)==='0') return;
    if(_driveTimer) clearTimeout(_driveTimer);
    _driveTimer = setTimeout(()=>{ driveSave(true); }, 1500);
  }catch(e){}
};

// ربط persist القديم
(function(){
  var origPersist = window.persist;
  if(origPersist){
    window.persist = function(){ try{ origPersist(); }catch(e){} try{ window.drive_auto_save(); }catch(e){} };
  }
  var origPersistFixed = window.persistFixed;
  if(origPersistFixed){
    window.persistFixed = function(){ try{ origPersistFixed(); }catch(e){} try{ window.drive_auto_save(); }catch(e){} };
  }
})();

// تهيئة عند التحميل
document.addEventListener('DOMContentLoaded', function(){
  try{
    var url = getDriveUrl();
    var en = isDriveEnabled();
    var statEl=document.getElementById('driveStat');
    if(statEl){
      if(!url) statEl.textContent='⚠️ لم يتم الإعداد';
      else if(!en) statEl.textContent='⏸️ متوقف';
      else statEl.textContent='✅ جاهز';
    }
    // لو Auto مفعل وآخر مزامنة من أكثر من 5 دقائق - اعمل Pull أول مرة
    if(en && url){
      var last = localStorage.getItem(window.DRIVE_LAST_SYNC_KEY);
      // لا تعمل auto load تلقائي عشان ما تمسحش بيانات جديدة - فقط المستخدم يضغط تحميل
    }
  }catch(e){}
});

window.driveSave = driveSave;
window.driveLoad = driveLoad;

// كود Google Apps Script اللي المستخدم يحطه في script.google.com
window.DRIVE_GAS_CODE = `
function doGet(e){
  var action = e.parameter.action;
  if(action=='load'){
    var props = PropertiesService.getScriptProperties();
    var data = props.getProperty('OMAR_DATA');
    return ContentService.createTextOutput(JSON.stringify({data: data?JSON.parse(data):null})).setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput('ok').setMimeType(ContentService.MimeType.TEXT);
}
function doPost(e){
  try{
    var body = e.postData.contents;
    var obj = JSON.parse(body);
    if(obj.action=='save'){
      var props = PropertiesService.getScriptProperties();
      props.setProperty('OMAR_DATA', JSON.stringify(obj.data));
      // كمان احفظ نسخة في Drive كملف JSON
      var files = DriveApp.getFilesByName('omar-pro-backup.json');
      var content = JSON.stringify(obj.data);
      if(files.hasNext()){
        var f = files.next();
        f.setContent(content);
      }else{
        DriveApp.createFile('omar-pro-backup.json', content, MimeType.PLAIN_TEXT);
      }
    }
  }catch(err){}
  return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
}
`;

// Auto-setup with provided URL
(function(){
  try{
    if(!localStorage.getItem(window.DRIVE_URL_KEY)){
      localStorage.setItem(window.DRIVE_URL_KEY, 'https://script.google.com/macros/s/AKfycbygAqDnhb9ES_uRf7plnyOfwJYd5PBo3chl9pfeUBE9ymYKADHDYxy4OwEfpHgcW0-dJg/exec');
    }
    if(!localStorage.getItem(window.DRIVE_ENABLED_KEY)){
      localStorage.setItem(window.DRIVE_ENABLED_KEY, '1');
    }
    if(!localStorage.getItem(window.DRIVE_AUTO_KEY)){
      localStorage.setItem(window.DRIVE_AUTO_KEY, '1');
    }
  }catch(e){}
})();
