/* ─────────────────────────────────────────────────────────────────────────
   Mint House by Kasa – Dallas Downtown
   FF&E / OS&E Inspection Checklist
   script.js
───────────────────────────────────────────────────────────────────────── */

/* ─── Config ──────────────────────────────────────────────────────────── */
const SHEET_ID   = '1kC-UgNC3ouwhviMMTiCnxVvcs-GALR9w98K8bBhDIi4';
const SHEET_TAB  = 'FFE_OSE_Reports';
const SHEET_NAME = 'Mint House DTD-Kasa FF&E OS&E Master';

// Paste your Google Apps Script Web App URL here after deploying Code.gs
// Example: 'https://script.google.com/macros/s/AKfycb.../exec'
const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

/* ─── Unit roster ─────────────────────────────────────────────────────── */
const UNITS = [
  {num:'4901',type:'1BD K'},{num:'4902',type:'STU-K'},{num:'4903',type:'RM-K'},{num:'4904',type:'2BD KK'},
  {num:'4905',type:'STU-K Suite'},{num:'4906',type:'STU-K Suite'},{num:'4907',type:'2BD KK'},{num:'4908',type:'RM-K'},
  {num:'4909',type:'1BD K'},{num:'4910',type:'1BD K'},{num:'4911',type:'1BD K'},{num:'4912',type:'1BD K'},
  {num:'4913',type:'1BD K'},{num:'4914',type:'1BD K'},{num:'4915',type:'1BD K'},{num:'4916',type:'1BD K'},
  {num:'4917',type:'1BD K'},{num:'4918',type:'1BD K'},{num:'4919',type:'RM-K'},{num:'4920',type:'2BD KK'},
  {num:'4921',type:'STU-K Suite'},{num:'4922',type:'STU-K Suite'},{num:'4923',type:'2BD KK'},{num:'4924',type:'RM-K'},
  {num:'4925',type:'1BD K Dlx'},{num:'4926',type:'STU-K Dlx'},{num:'4927',type:'STU-K Dlx'},{num:'4928',type:'STU-K'},
  {num:'4929',type:'STU-K'},{num:'4930',type:'STU-K ADA'},{num:'4931',type:'STU-K ADA'},{num:'4932',type:'STU-K'},
  {num:'5001',type:'STU-K Dlx'},{num:'5002',type:'STU-K Dlx'},{num:'5003',type:'2BD KK'},{num:'5005',type:'RM-K'},
  {num:'5006',type:'RM-K'},{num:'5008',type:'2BD KK'},{num:'5009',type:'1BD K Dlx'},{num:'5010',type:'1BD K'},
  {num:'5011',type:'1BD K'},{num:'5012',type:'1BD K'},{num:'5013',type:'1BD K'},{num:'5014',type:'1BD K'},
  {num:'5015',type:'1BD K'},{num:'5016',type:'1BD K'},{num:'5017',type:'1BD K'},{num:'5018',type:'1BD K Dlx'},
  {num:'5019',type:'2BD KK'},{num:'5021',type:'RM-K'},{num:'5022',type:'RM-K'},{num:'5024',type:'2BD KK'},
  {num:'5025',type:'1BD K Dlx'},{num:'5026',type:'1BD K'},{num:'5027',type:'STU-K ADA'},{num:'5028',type:'STU-K ADA'},
  {num:'5029',type:'1BD K'},{num:'5030',type:'1BD K'},{num:'5031',type:'1BD K'},{num:'5032',type:'1BD K'},
];

/* ─── Checklist data ──────────────────────────────────────────────────── */
const DATA = {
  ffe: [
    { id:'bed', label:'Bedroom', icon:'ti-bed', items:[
      {id:'b1',  text:'King/Queen bed frame',                     tags:[]},
      {id:'b2',  text:'Mattress & box spring',                    tags:[]},
      {id:'b3',  text:'Headboard',                                tags:[]},
      {id:'b4',  text:'Nightstands (×2)',                         tags:[]},
      {id:'b5',  text:'Dresser / chest of drawers',               tags:[]},
      {id:'b6',  text:'Wardrobe / closet rod & shelf',            tags:[]},
      {id:'b7',  text:'Desk & desk chair',                        tags:[]},
      {id:'b8',  text:'Luggage rack',                             tags:[]},
      {id:'b9',  text:'Lounge chair / accent chair',              tags:[]},
      {id:'b10', text:'Task lamp (nightstand)',                    tags:[]},
      {id:'b11', text:'Floor lamp or overhead fixture',           tags:[]},
      {id:'b12', text:'Mirror (full-length or dresser)',          tags:[]},
      {id:'b13', text:'Window treatments (blackout curtains)',    tags:[]},
      {id:'b14', text:'Area rug',                                 tags:[]},
      {id:'b15', text:'Wall art / décor panels',                  tags:[]},
      {id:'b16', text:'TV & TV mount / stand',                    tags:[]},
      {id:'b17', text:'Safe / in-room lockbox',                   tags:[]},
    ]},
    { id:'bath', label:'Bathroom (per bedroom)', icon:'ti-droplet', items:[
      {id:'ba1', text:'Vanity / sink cabinet',                    tags:[]},
      {id:'ba2', text:'Mirror / medicine cabinet',                tags:[]},
      {id:'ba3', text:'Toilet',                                   tags:[]},
      {id:'ba4', text:'Shower stall or tub/shower combo',         tags:[]},
      {id:'ba5', text:'Shower curtain rod & rings',               tags:[]},
      {id:'ba6', text:'Towel bars / hooks',                       tags:[]},
      {id:'ba7', text:'Toilet paper holder',                      tags:[]},
      {id:'ba8', text:'Exhaust fan / ventilation fixture',        tags:[]},
      {id:'ba9', text:'Bathroom lighting fixture',                tags:[]},
    ]},
    { id:'living', label:'Living / common area', icon:'ti-sofa', items:[
      {id:'l1',  text:'Sofa / sectional',                         tags:[]},
      {id:'l2',  text:'Coffee table',                             tags:[]},
      {id:'l3',  text:'Side table / end table',                   tags:[]},
      {id:'l4',  text:'TV console / entertainment unit',          tags:[]},
      {id:'l5',  text:'TV (living area)',                         tags:[]},
      {id:'l6',  text:'Accent lighting / floor lamp',             tags:[]},
      {id:'l7',  text:'Dining table',                             tags:[]},
      {id:'l8',  text:'Dining chairs',                            tags:[]},
      {id:'l9',  text:'Window treatments',                        tags:[]},
      {id:'l10', text:'Area rug (living)',                        tags:[]},
      {id:'l11', text:'Wall art / décor',                         tags:[]},
    ]},
    { id:'kitchen-ffe', label:'Kitchen / kitchenette (FF&E)', icon:'ti-tool-kitchen-2', kitchenOnly:true, items:[
      {id:'k1',  text:'Refrigerator (full-size)',                 tags:['full']},
      {id:'k2',  text:'Mini-fridge / compact refrigerator',      tags:['kitchenette']},
      {id:'k3',  text:'Range / cooktop (4-burner)',               tags:['full']},
      {id:'k4',  text:'2-burner induction or electric cooktop',   tags:['kitchenette']},
      {id:'k5',  text:'Oven (built-in or range)',                 tags:['full']},
      {id:'k6',  text:'Microwave',                                tags:[]},
      {id:'k7',  text:'Dishwasher',                               tags:['full']},
      {id:'k8',  text:'Range hood / exhaust fan',                 tags:['full']},
      {id:'k9',  text:'Kitchen cabinets & hardware',              tags:[]},
      {id:'k10', text:'Kitchen countertop',                       tags:[]},
      {id:'k11', text:'Sink & faucet (kitchen)',                  tags:[]},
      {id:'k12', text:'Under-counter storage / island',           tags:['full']},
    ]},
  ],

  ose: [
    { id:'bed-ose', label:'Bedroom linens & soft goods', icon:'ti-bed', items:[
      {id:'bo1',  text:'Mattress pad / protector',                tags:[]},
      {id:'bo2',  text:'Fitted sheet (×2 par)',                   tags:[]},
      {id:'bo3',  text:'Flat sheet (×2 par)',                     tags:[]},
      {id:'bo4',  text:'Pillow (×4)',                             tags:[]},
      {id:'bo5',  text:'Pillow protectors (×4)',                  tags:[]},
      {id:'bo6',  text:'Pillowcases (×4 par)',                    tags:[]},
      {id:'bo7',  text:'Duvet / comforter',                       tags:[]},
      {id:'bo8',  text:'Duvet cover (×2 par)',                    tags:[]},
      {id:'bo9',  text:'Throw blanket',                           tags:[]},
      {id:'bo10', text:'Decorative pillows / shams',              tags:[]},
    ]},
    { id:'bath-ose', label:'Bathroom supplies & linens', icon:'ti-droplet', items:[
      {id:'bao1',  text:'Bath towels (×4 par)',                   tags:[]},
      {id:'bao2',  text:'Hand towels (×4 par)',                   tags:[]},
      {id:'bao3',  text:'Washcloths (×4 par)',                    tags:[]},
      {id:'bao4',  text:'Bath mat (×2 par)',                      tags:[]},
      {id:'bao5',  text:'Shower curtain & liner',                 tags:[]},
      {id:'bao6',  text:'Soap dish / tray',                       tags:[]},
      {id:'bao7',  text:'Toilet brush & holder',                  tags:[]},
      {id:'bao8',  text:'Waste bin',                              tags:[]},
      {id:'bao9',  text:'Toilet paper (initial stock)',           tags:[]},
      {id:'bao10', text:'Tissue box',                             tags:[]},
      {id:'bao11', text:'Hair dryer',                             tags:[]},
      {id:'bao12', text:'Guest toiletry set (shampoo, conditioner, body wash, lotion)', tags:[]},
      {id:'bao13', text:'Soap bar or liquid hand soap',           tags:[]},
      {id:'bao14', text:'Cotton balls / Q-tips',                  tags:[]},
      {id:'bao15', text:'Vanity kit (nail file, cotton pads)',    tags:[]},
      {id:'bao16', text:'Shower cap',                             tags:[]},
    ]},
    { id:'kitchen-ose', label:'Kitchen — cookware & appliances', icon:'ti-tool-kitchen-2', kitchenOnly:true, items:[
      {id:'ko1',  text:'Pots set (sauce, stockpot)',              tags:['full']},
      {id:'ko2',  text:'Skillets / fry pans (10" + 12")',        tags:['full']},
      {id:'ko3',  text:'Baking sheet / roasting pan',             tags:['full']},
      {id:'ko4',  text:'Colander / strainer',                     tags:['full']},
      {id:'ko5',  text:'Small saucepan (1–2 qt)',                 tags:['kitchenette']},
      {id:'ko6',  text:'Non-stick skillet (8")',                  tags:['kitchenette']},
      {id:'ko7',  text:'Toaster / toaster oven',                  tags:[]},
      {id:'ko8',  text:'Coffee maker / pod machine',              tags:[]},
      {id:'ko9',  text:'Kettle (electric)',                        tags:[]},
      {id:'ko10', text:'Blender',                                 tags:['full']},
      {id:'ko11', text:'Can opener',                              tags:[]},
      {id:'ko12', text:'Corkscrew / bottle opener',               tags:[]},
      {id:'ko13', text:'Mixing bowls (set)',                      tags:['full']},
      {id:'ko14', text:'Measuring cups & spoons',                 tags:['full']},
      {id:'ko15', text:'Cutting board (×2)',                      tags:[]},
      {id:'ko16', text:'Dish drying rack or mat',                 tags:[]},
    ]},
    { id:'kitchen-tableware', label:'Kitchen — tableware & utensils', icon:'ti-salad', kitchenOnly:true, items:[
      {id:'kt1',  text:'Dinner plates (×4)',                      tags:[]},
      {id:'kt2',  text:'Salad / side plates (×4)',                tags:[]},
      {id:'kt3',  text:'Bowls — soup/cereal (×4)',                tags:[]},
      {id:'kt4',  text:'Mugs (×4)',                               tags:[]},
      {id:'kt5',  text:'Drinking glasses — water (×4)',           tags:[]},
      {id:'kt6',  text:'Wine glasses (×4)',                       tags:['full']},
      {id:'kt7',  text:'Juice glasses / tumblers (×4)',           tags:[]},
      {id:'kt8',  text:'Flatware set — forks, knives, spoons, teaspoons (×4)', tags:[]},
      {id:'kt9',  text:'Serving spoon & spatula',                 tags:['full']},
      {id:'kt10', text:"Chef's knife & paring knife",             tags:['full']},
      {id:'kt11', text:'Steak knives (×4)',                       tags:['full']},
      {id:'kt12', text:'Tongs',                                   tags:['full']},
      {id:'kt13', text:'Ladle',                                   tags:['full']},
      {id:'kt14', text:'Peeler & grater',                         tags:['full']},
      {id:'kt15', text:'Kitchen scissors',                        tags:[]},
      {id:'kt16', text:'Dish soap & sponge (initial)',            tags:[]},
      {id:'kt17', text:'Dish towels (×2 par)',                    tags:[]},
      {id:'kt18', text:'Paper towels (initial stock)',            tags:[]},
      {id:'kt19', text:'Trash bags (initial stock)',              tags:[]},
      {id:'kt20', text:'Storage bags / wrap / foil',              tags:['full']},
      {id:'kt21', text:'Salt & pepper shakers',                   tags:[]},
      {id:'kt22', text:'Coffee & tea supplies (filters, pods, sugar)', tags:[]},
    ]},
    { id:'general', label:'General room supplies', icon:'ti-home', items:[
      {id:'g1',  text:'Welcome packet / info binder',             tags:[]},
      {id:'g2',  text:'Remote controls (TV, A/C)',                tags:[]},
      {id:'g3',  text:'Batteries (spare AA/AAA)',                 tags:[]},
      {id:'g4',  text:'Extension cord / power strip',             tags:[]},
      {id:'g5',  text:'Adapter / USB charging hub',               tags:[]},
      {id:'g6',  text:'Hangers (closet, 10+)',                    tags:[]},
      {id:'g7',  text:'Iron & ironing board',                     tags:[]},
      {id:'g8',  text:'Laundry bags',                             tags:[]},
      {id:'g9',  text:'Trash bins (bedroom, living area)',        tags:[]},
      {id:'g10', text:'Trash bags (bedroom liners)',              tags:[]},
      {id:'g11', text:'Recycle bin',                              tags:[]},
      {id:'g12', text:'Door stopper',                             tags:[]},
      {id:'g13', text:'First aid kit (basic)',                    tags:[]},
      {id:'g14', text:'Fire extinguisher / smoke detector check', tags:[]},
      {id:'g15', text:'CO detector check',                        tags:[]},
      {id:'g16', text:'Flashlight / emergency candle',            tags:[]},
      {id:'g17', text:'Guest Wi-Fi info card',                    tags:[]},
      {id:'g18', text:'Note pad & pen',                           tags:[]},
    ]},
  ]
};

/* ─── App state ───────────────────────────────────────────────────────── */
let activeTab = 'ffe';
let roomType  = 'full';
let checked   = new Set();
let naSet     = new Set();
let quantities  = {};
let itemNotes   = {};
let noteOpen    = new Set();

/* ─── Helpers ─────────────────────────────────────────────────────────── */
function pad(n) { return String(n).padStart(2, '0'); }

function pillClass(t) {
  if (t.startsWith('2BD'))   return 'rt-2bdk';
  if (t.startsWith('1BD'))   return 'rt-1bdk';
  if (t.includes('ADA'))     return 'rt-ada';
  if (t.includes('Dlx'))     return 'rt-dlx';
  if (t.startsWith('STU'))   return 'rt-stu';
  if (t.startsWith('RM'))    return 'rt-rm';
  return '';
}

function kitchenFromType(t) { return t.startsWith('RM') ? 'kitchenette' : 'full'; }

function getVisibleItems(sec) {
  return sec.items.filter(item => {
    if (!item.tags || !item.tags.length) return true;
    if (item.tags.includes('full') && roomType === 'full') return true;
    if (item.tags.includes('kitchenette') && (roomType === 'full' || roomType === 'kitchenette')) return true;
    return false;
  });
}

function getSections() {
  return DATA[activeTab].filter(sec => !sec.kitchenOnly || roomType !== 'no-kitchen');
}

/* ─── Date helpers ────────────────────────────────────────────────────── */
function setToday() {
  const d = new Date();
  document.getElementById('d-mm').value   = pad(d.getMonth() + 1);
  document.getElementById('d-dd').value   = pad(d.getDate());
  document.getElementById('d-yyyy').value = d.getFullYear();
  updateDateDisplay();
}

function onDateInput(curId, nextId, maxLen) {
  const el = document.getElementById(curId);
  if (el.value.length >= maxLen && nextId) document.getElementById(nextId).focus();
  updateDateDisplay();
}

function updateDateDisplay() {
  const mm   = document.getElementById('d-mm').value.trim();
  const dd   = document.getElementById('d-dd').value.trim();
  const yyyy = document.getElementById('d-yyyy').value.trim();
  const disp = document.getElementById('date-display');
  if (mm && dd && yyyy && yyyy.length === 4) {
    const mi = parseInt(mm) - 1;
    disp.textContent = (mi >= 0 && mi < 12) ? `${MONTHS[mi]} ${dd}, ${yyyy}` : '';
  } else {
    disp.textContent = '';
  }
}

function getDateString() {
  const mm   = document.getElementById('d-mm').value.trim().padStart(2, '0');
  const dd   = document.getElementById('d-dd').value.trim().padStart(2, '0');
  const yyyy = document.getElementById('d-yyyy').value.trim();
  return (mm && dd && yyyy) ? `${mm}/${dd}/${yyyy}` : '';
}

/* ─── Unit selector ───────────────────────────────────────────────────── */
function initUnitSelect() {
  const sel = document.getElementById('unit-select');
  UNITS.forEach(u => {
    const o = document.createElement('option');
    o.value       = u.num;
    o.textContent = `${u.num} — ${u.type}`;
    sel.appendChild(o);
  });
}

function onUnitChange() {
  const val   = document.getElementById('unit-select').value;
  const rtSel = document.getElementById('roomtype-select');
  const info  = document.getElementById('room-info');
  document.getElementById('rt-confirm').checked = false;
  document.getElementById('verify-confirmed').classList.remove('show');
  document.getElementById('room-notes').value = '';

  if (!val) {
    rtSel.innerHTML    = '<option>—</option>';
    rtSel.disabled     = true;
    rtSel.style.opacity = '0.6';
    info.innerHTML     = '<span class="room-info-empty">Select a unit above to begin</span>';
    return;
  }

  const unit = UNITS.find(u => u.num === val);
  rtSel.innerHTML     = `<option>${unit.type}</option>`;
  rtSel.disabled      = true;
  rtSel.style.opacity = '1';

  info.innerHTML = `
    <i class="ti ti-door" style="font-size:15px;color:#5F738B" aria-hidden="true"></i>
    <span style="font-size:13px;font-weight:600;color:#112438">Unit ${unit.num}</span>
    <span class="rt-pill ${pillClass(unit.type)}">${unit.type}</span>`;

  document.getElementById('kitchen-type').value = kitchenFromType(unit.type);
  roomType = kitchenFromType(unit.type);
  render();
}

function onConfirmChange() {
  document.getElementById('verify-confirmed')
    .classList.toggle('show', document.getElementById('rt-confirm').checked);
}

function resetRoomSection() {
  document.getElementById('unit-select').value = '';
  const rtSel = document.getElementById('roomtype-select');
  rtSel.innerHTML    = '<option>—</option>';
  rtSel.disabled     = true;
  rtSel.style.opacity = '0.6';
  document.getElementById('rt-confirm').checked = false;
  document.getElementById('verify-confirmed').classList.remove('show');
  document.getElementById('room-notes').value = '';
  document.getElementById('room-info').innerHTML =
    '<span class="room-info-empty">Select a unit above to begin</span>';
}

function onKitchenChange() {
  roomType = document.getElementById('kitchen-type').value;
  render();
}

/* ─── Stats ───────────────────────────────────────────────────────────── */
function updateStats() {
  const all    = getSections().flatMap(s => getVisibleItems(s));
  const active = all.filter(i => !naSet.has(i.id));
  const total  = active.length;
  const done   = active.filter(i => checked.has(i.id)).length;
  document.getElementById('stat-total').textContent   = all.length;
  document.getElementById('stat-checked').textContent = done;
  document.getElementById('stat-pct').textContent     = total ? `${Math.round(done / total * 100)}%` : '—';
  document.getElementById('prog-num').textContent     = `${done} / ${total}`;
  document.getElementById('prog-fill').style.width    = total ? `${done / total * 100}%` : '0%';
}

/* ─── Tab switching ───────────────────────────────────────────────────── */
function switchTab(tab) {
  activeTab = tab;
  document.querySelectorAll('.tab').forEach((t, i) =>
    t.classList.toggle('active', (i === 0 && tab === 'ffe') || (i === 1 && tab === 'ose'))
  );
  render();
}

/* ─── Item interactions ───────────────────────────────────────────────── */
function toggleCheck(id) {
  if (naSet.has(id)) return;
  checked.has(id) ? checked.delete(id) : checked.add(id);
  const row = document.getElementById('row-' + id);
  if (row) row.querySelector('input[type="checkbox"]').checked = checked.has(id);
  updateStats();
  refreshSecBadge(id);
}

function toggleNA(id) {
  naSet.has(id) ? naSet.delete(id) : (naSet.add(id), checked.delete(id));
  rerenderRow(id);
  updateStats();
  refreshSecBadge(id);
}

function setQty(id, val) {
  quantities[id] = val;
  const o = document.getElementById('onhand-' + id);
  if (o) o.innerHTML = (val && !naSet.has(id))
    ? `<span class="on-hand-val">${val}</span>`
    : `<span class="on-hand-empty">—</span>`;
}

function saveNote(id, val) { itemNotes[id] = val; }

function toggleNote(id) {
  const wrap = document.getElementById('noterow-' + id);
  const btn  = document.getElementById('notebtn-' + id);
  if (!wrap || !btn) return;
  const open = noteOpen.has(id);
  if (open) {
    noteOpen.delete(id);
    wrap.style.display = 'none';
    btn.classList.remove('note-active');
  } else {
    noteOpen.add(id);
    wrap.style.display = 'block';
    btn.classList.add('note-active');
    const ta = wrap.querySelector('textarea');
    if (ta) { ta.value = itemNotes[id] || ''; setTimeout(() => ta.focus(), 50); }
  }
}

function resetItem(id) {
  checked.delete(id);
  naSet.delete(id);
  quantities[id] = '';
  itemNotes[id]  = '';
  noteOpen.delete(id);
  rerenderRow(id);
  const nr = document.getElementById('noterow-' + id);
  if (nr) nr.style.display = 'none';
  const nb = document.getElementById('notebtn-' + id);
  if (nb) nb.classList.remove('note-active');
  updateStats();
  refreshSecBadge(id);
}

function rerenderRow(id) {
  const row = document.getElementById('row-' + id);
  if (!row) return;
  const isNA      = naSet.has(id);
  const isChecked = checked.has(id);
  const qty       = quantities[id] || '';
  row.classList.toggle('na-row', isNA);
  const cb = row.querySelector('input[type="checkbox"]');
  cb.checked  = isChecked;
  cb.disabled = isNA;
  const qtyEl = row.querySelector('.qty-input');
  if (qtyEl) { qtyEl.value = qty; qtyEl.disabled = isNA; }
  const naBtn = row.querySelector('.na-btn');
  if (naBtn) naBtn.classList.toggle('active', isNA);
  const o = document.getElementById('onhand-' + id);
  if (o) o.innerHTML = (qty && !isNA)
    ? `<span class="on-hand-val">${qty}</span>`
    : `<span class="on-hand-empty">—</span>`;
}

function refreshSecBadge(itemId) {
  for (const sec of getSections()) {
    const items = getVisibleItems(sec);
    if (items.find(i => i.id === itemId)) {
      const active = items.filter(i => !naSet.has(i.id));
      const done   = active.filter(i => checked.has(i.id)).length;
      const badge  = document.getElementById('sbadge-' + sec.id);
      if (badge) badge.textContent = `${done}/${active.length}`;
      break;
    }
  }
}

/* ─── Section collapse ────────────────────────────────────────────────── */
function toggleSection(secId) {
  const body = document.getElementById('sbody-' + secId);
  const head = document.getElementById('shead-' + secId);
  if (!body) return;
  if (head.classList.contains('collapsed')) {
    body.style.maxHeight = body.scrollHeight + 'px';
    head.classList.remove('collapsed');
  } else {
    body.style.maxHeight = '0';
    head.classList.add('collapsed');
  }
}

/* ─── Render ──────────────────────────────────────────────────────────── */
function render() {
  const secs      = getSections();
  const container = document.getElementById('list-container');
  container.innerHTML = '';

  secs.forEach(sec => {
    const items  = getVisibleItems(sec);
    if (!items.length) return;
    const active = items.filter(i => !naSet.has(i.id));
    const done   = active.filter(i => checked.has(i.id)).length;

    const div = document.createElement('div');
    div.className = 'section';

    const rowsHtml = items.map(item => {
      const isNA       = naSet.has(item.id);
      const isChecked  = checked.has(item.id);
      const qty        = quantities[item.id] || '';
      const noteIsOpen = noteOpen.has(item.id);
      const hasNote    = !!(itemNotes[item.id] && itemNotes[item.id].trim());

      const tagHtml =
        (item.tags && item.tags.includes('full') && !item.tags.includes('kitchenette'))
          ? '<span class="item-tag tag-full">Full</span>'
        : (item.tags && item.tags.includes('kitchenette') && !item.tags.includes('full'))
          ? '<span class="item-tag tag-kit">Kitchenette</span>'
        : '';

      const onHandHtml = (qty && !isNA)
        ? `<span class="on-hand-val">${qty}</span>`
        : `<span class="on-hand-empty">—</span>`;

      return `
        <div class="item-wrap">
          <div class="item${isNA ? ' na-row' : ''}" id="row-${item.id}">
            <div class="item-label">
              <input type="checkbox"
                ${isChecked ? 'checked' : ''}
                ${isNA ? 'disabled' : ''}
                onchange="toggleCheck('${item.id}')">
              <span>${item.text}</span>${tagHtml}
            </div>
            <div class="cell-center">
              <input class="qty-input" type="number" min="0" placeholder="Qty"
                value="${qty}" ${isNA ? 'disabled' : ''}
                oninput="setQty('${item.id}', this.value)"
                aria-label="Quantity for ${item.text}">
            </div>
            <div class="cell-center" id="onhand-${item.id}">${onHandHtml}</div>
            <div class="cell-center">
              <button class="na-btn${isNA ? ' active' : ''}"
                onclick="toggleNA('${item.id}')"
                aria-label="Mark N/A for ${item.text}">N/A</button>
            </div>
            <div class="cell-center">
              <button class="icon-btn${noteIsOpen || hasNote ? ' note-active' : ''}"
                id="notebtn-${item.id}"
                onclick="toggleNote('${item.id}')"
                title="Add note"
                aria-label="Toggle notes for ${item.text}">
                <i class="ti ti-notes" aria-hidden="true"></i>
              </button>
            </div>
            <div class="cell-center">
              <button class="icon-btn"
                onclick="resetItem('${item.id}')"
                title="Reset this item"
                aria-label="Reset ${item.text}">
                <i class="ti ti-rotate" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <div class="item-note-row" id="noterow-${item.id}"
            style="display:${noteIsOpen ? 'block' : 'none'}">
            <textarea class="item-notes-input"
              placeholder="Notes for this item…"
              oninput="saveNote('${item.id}', this.value)">${itemNotes[item.id] || ''}</textarea>
          </div>
        </div>`;
    }).join('');

    div.innerHTML = `
      <div class="section-head" id="shead-${sec.id}" onclick="toggleSection('${sec.id}')">
        <i class="ti ${sec.icon}" aria-hidden="true"></i>
        <h3>${sec.label}</h3>
        <span class="sec-badge" id="sbadge-${sec.id}">${done}/${active.length}</span>
        <i class="ti ti-chevron-down chevron" aria-hidden="true"></i>
      </div>
      <div class="section-body" id="sbody-${sec.id}" style="max-height:9999px">
        <div class="section-items-wrap">
          <div class="col-headers">
            <div class="col-hdr">Item</div>
            <div class="col-hdr">Qty</div>
            <div class="col-hdr">On hand</div>
            <div class="col-hdr">N/A</div>
            <div class="col-hdr" title="Notes"><i class="ti ti-notes" style="font-size:11px" aria-hidden="true"></i></div>
            <div class="col-hdr" title="Reset"><i class="ti ti-rotate" style="font-size:11px" aria-hidden="true"></i></div>
          </div>
          <div class="items">${rowsHtml}</div>
        </div>
      </div>`;

    container.appendChild(div);
  });

  updateStats();
}

/* ─── Submit / modal ──────────────────────────────────────────────────── */
function buildRows() {
  const date  = getDateString();
  const unit  = document.getElementById('unit-select').value;
  const rtSel = document.getElementById('roomtype-select');
  const roomTypeLabel = rtSel.options[rtSel.selectedIndex]
    ? rtSel.options[rtSel.selectedIndex].text : '';
  const kitchenType = document.getElementById('kitchen-type').value;
  const confirmed   = document.getElementById('rt-confirm').checked ? 'Yes' : 'No';
  const roomNotes   = document.getElementById('room-notes').value.trim();

  const rows = [];
  [...DATA.ffe, ...DATA.ose].forEach(sec => {
    const tab = DATA.ffe.includes(sec) ? 'FF&E' : 'OS&E';
    sec.items.forEach(item => {
      const status = naSet.has(item.id) ? 'N/A' : checked.has(item.id) ? 'Yes' : 'No';
      rows.push([
        date, unit, roomTypeLabel, kitchenType, confirmed, roomNotes,
        tab, sec.label, item.text, status,
        quantities[item.id] || '', itemNotes[item.id] || ''
      ]);
    });
  });
  return rows;
}

function openSubmitModal() {
  const rows = buildRows();
  document.getElementById('modal-row-count').textContent  = `${rows.length} item rows`;
  document.getElementById('modal-form-view').style.display = 'block';
  document.getElementById('modal-success-view').classList.remove('show');
  const btn = document.getElementById('modal-confirm-btn');
  btn.disabled   = false;
  btn.innerHTML  = '<i class="ti ti-send" style="font-size:13px" aria-hidden="true"></i> Submit';
  document.getElementById('modal-backdrop').classList.add('show');
}

function closeModal() {
  document.getElementById('modal-backdrop').classList.remove('show');
}

async function doSubmit() {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL === 'YOUR_APPS_SCRIPT_URL_HERE') {
    alert('Setup required:\n\nPaste your Google Apps Script Web App URL into the APPS_SCRIPT_URL constant in script.js.');
    return;
  }

  const btn = document.getElementById('modal-confirm-btn');
  btn.disabled  = true;
  btn.innerHTML = '<i class="ti ti-loader-2" style="font-size:13px" aria-hidden="true"></i> Submitting…';

  const rows      = buildRows();
  const headerRow = [
    'Date','Unit','Room Type','Kitchen Type','RT Confirmed','Unit Notes',
    'Tab','Section','Item','Status','Qty','Item Notes'
  ];

  const payload = JSON.stringify({
    sheetId:   SHEET_ID,
    tabName:   SHEET_TAB,
    headerRow: headerRow,
    rows:      rows
  });

  // Strategy 1 — fetch with no-cors (works from Vercel, response is opaque)
  try {
    await fetch(APPS_SCRIPT_URL, {
      method:  'POST',
      mode:    'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body:    payload
    });
    // no-cors fetch gives an opaque response — if it didn't throw, treat as success
    showSuccess(rows.length);
    return;
  } catch (err) {
    console.warn('no-cors fetch failed, trying form POST fallback…', err);
  }

  // Strategy 2 — hidden form POST fallback (bypasses CORS entirely)
  try {
    submitViaForm(payload);
    // Form posts are fire-and-forget — wait briefly then show success
    await new Promise(r => setTimeout(r, 2000));
    showSuccess(rows.length);
  } catch (err) {
    btn.disabled  = false;
    btn.innerHTML = '<i class="ti ti-send" style="font-size:13px" aria-hidden="true"></i> Submit';
    alert(
      'Submission failed.\n\n' +
      'Please check:\n' +
      '1. APPS_SCRIPT_URL in script.js is your deployed Web App URL\n' +
      '2. Apps Script is deployed with "Who has access: Anyone"\n' +
      '3. "Execute as" is set to your Google account\n\n' +
      'Error: ' + err.message
    );
  }
}

function showSuccess(rowCount) {
  document.getElementById('modal-form-view').style.display = 'none';
  document.getElementById('modal-success-view').classList.add('show');
  document.getElementById('success-detail').textContent =
    `${rowCount} rows sent to "${SHEET_NAME}" › ${SHEET_TAB}`;
  fullReset();
}

function submitViaForm(payload) {
  // Creates a hidden form that POSTs directly — no CORS restrictions
  const form    = document.createElement('form');
  form.method   = 'POST';
  form.action   = APPS_SCRIPT_URL;
  form.target   = '_hidden_iframe';
  form.style.display = 'none';

  const input   = document.createElement('input');
  input.type    = 'hidden';
  input.name    = 'payload';
  input.value   = payload;
  form.appendChild(input);

  // Hidden iframe to absorb the response (avoids page navigation)
  let iframe = document.getElementById('_hidden_iframe');
  if (!iframe) {
    iframe      = document.createElement('iframe');
    iframe.name = '_hidden_iframe';
    iframe.id   = '_hidden_iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  }

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

function fullReset() {
  checked   = new Set();
  naSet     = new Set();
  quantities  = {};
  itemNotes   = {};
  noteOpen    = new Set();
  resetRoomSection();
  document.getElementById('d-mm').value   = '';
  document.getElementById('d-dd').value   = '';
  document.getElementById('d-yyyy').value = '';
  document.getElementById('date-display').textContent = '';
  render();
}

/* ─── Init ────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initUnitSelect();
  setToday();
  render();
});
