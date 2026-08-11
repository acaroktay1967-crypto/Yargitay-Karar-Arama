/* ═══════════════════════════════════════════
   HUKUK PRO — Web Sürümü (app.js)
   Tarayıcı uyumlu versiyon
═══════════════════════════════════════════ */
'use strict';

/* ── Yardımcılar ── */
const fmt = n => (parseFloat(n)||0).toLocaleString('tr-TR',{minimumFractionDigits:2,maximumFractionDigits:2})+' TL';
const gv  = id => { const e=document.getElementById(id); return e ? e.value : ''; };
const sv  = (id,v) => { const e=document.getElementById(id); if(e) e.innerHTML=v; };
const st  = (id,v) => { const e=document.getElementById(id); if(e) e.textContent=v; };
const tarihFmt = s => {
  if (!s) return '…';
  try { return new Date(s).toLocaleDateString('tr-TR',{day:'2-digit',month:'long',year:'numeric'}); }
  catch { return s; }
};

/* ── Toast bildirim ── */
function toast(msg, tip='bilgi') {
  const el = document.createElement('div');
  const renkler = {bilgi:'#1e3c72',basari:'#1e5c3a',hata:'#7a1a1a'};
  Object.assign(el.style, {
    position:'fixed',bottom:'30px',right:'20px',zIndex:'9999',
    background: renkler[tip]||renkler.bilgi,
    color:'#fff',padding:'10px 18px',borderRadius:'5px',
    fontSize:'12px',fontFamily:'sans-serif',fontWeight:'600',
    boxShadow:'0 4px 16px rgba(0,0,0,.3)',transition:'opacity .3s'
  });
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(()=>{ el.style.opacity='0'; setTimeout(()=>el.remove(),300); }, 2800);
}

/* ── LocalStorage Yardımcıları ── */
const STORAGE_KEY = 'hukuk_pro_belgeler';

function getBelgeler() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch { return []; }
}

function saveBelge(belge) {
  const belgeler = getBelgeler();
  belge.id = Date.now();
  belge.tarih = new Date().toISOString();
  belgeler.unshift(belge);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(belgeler));
  return belge;
}

function deleteBelge(id) {
  const belgeler = getBelgeler().filter(b => b.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(belgeler));
}

/* ══════════════════════════════════════════
   BÖLÜM 0 — KARAR ÖRNEKLERİ HTML ÜRETİCİLERİ
══════════════════════════════════════════ */
function kararSargi(mhk,esas,kno,hakim,davaci,davali,dava,deger,iddia,savunma,gerekce,kanun,hukumHTML,katip,tarih,hakimImza) {
  return `<div style="background:#fff;border:1px solid #d4c5a0;border-radius:4px;box-shadow:0 4px 20px rgba(12,31,63,.12);padding:36px 44px;font-family:'Times New Roman',serif;font-size:12.5px;line-height:1.9;max-width:800px;margin:0 auto">
    <div style="text-align:center;font-weight:bold;font-size:14px;letter-spacing:4px;margin-bottom:3px">T.C.</div>
    <div style="text-align:center;font-weight:bold;font-size:13px;border-bottom:2.5px solid #000;padding-bottom:9px;margin-bottom:16px">${mhk}</div>
    <div style="display:grid;grid-template-columns:130px 1fr;gap:2px 6px;font-size:12px;margin-bottom:12px;line-height:1.7">
      <span style="font-weight:700">ESAS NO</span><span>: ${esas}</span>
      <span style="font-weight:700">KARAR NO</span><span>: ${kno}</span>
      <span style="font-weight:700">HÂKİM</span><span>: ${hakim}</span>
    </div>
    <hr style="border:none;border-top:1px solid #ccc;margin:12px 0">
    <div style="display:grid;grid-template-columns:130px 1fr;gap:2px 6px;font-size:12px;margin-bottom:12px;line-height:1.7">
      <span style="font-weight:700">DAVACI</span><span>: ${davaci}</span>
      <span style="font-weight:700">DAVALI</span><span>: ${davali}</span>
      <span style="font-weight:700">DAVA</span><span>: ${dava}</span>
      <span style="font-weight:700">DEĞER</span><span>: ${deger}</span>
    </div>
    <hr style="border:none;border-top:1px solid #ccc;margin:12px 0">
    <div style="font-weight:bold;font-size:11px;text-decoration:underline;text-transform:uppercase;letter-spacing:.4px;margin:14px 0 7px">TARAFLARIN İDDİA VE SAVUNMALARININ ÖZETİ</div>
    <p style="text-align:justify;margin-bottom:7px;text-indent:20px">${iddia}</p>
    <p style="text-align:justify;margin-bottom:7px;text-indent:20px">${savunma}</p>
    <div style="font-weight:bold;font-size:11px;text-decoration:underline;text-transform:uppercase;letter-spacing:.4px;margin:14px 0 7px">DELİLLERİN DEĞERLENDİRİLMESİ VE GEREKÇE</div>
    <p style="text-align:justify;margin-bottom:7px;text-indent:20px">${gerekce}</p>
    <div style="background:#f0f4ff;border-left:4px solid #1a3a8a;padding:7px 10px;font-size:11px;font-family:sans-serif;margin:8px 0;border-radius:0 3px 3px 0"><strong>Kanuni Dayanak:</strong> ${kanun}</div>
    <div style="border:2.5px solid #000;border-radius:3px;padding:16px 20px;margin:16px 0;background:#fafaf7">
      <div style="text-align:center;font-weight:bold;font-size:14px;letter-spacing:3px;border-bottom:2px solid #000;padding-bottom:9px;margin-bottom:11px">H Ü K Ü M</div>
      <p style="text-align:center;font-size:10px;color:#888;margin-bottom:10px;font-family:sans-serif">Yukarıda açıklanan gerekçe ile;</p>
      ${hukumHTML}
    </div>
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:24px;padding-top:14px;border-top:1px solid #ccc">
      <div style="text-align:center;font-size:11px"><div style="border-top:1px solid #000;width:130px;margin:0 auto 4px"></div><small>KÂTİP<br>${katip}</small></div>
      <div style="text-align:center;font-size:12px;font-weight:700">${tarih}</div>
      <div style="text-align:center;font-size:11px"><div style="border-top:1px solid #000;width:130px;margin:0 auto 4px"></div><small>HÂKİM<br>${hakimImza}</small></div>
    </div>
  </div>`;
}

function hItem(n, cls, html) {
  return `<div style="padding:6px 0;border-bottom:1px dotted #d4c5a0;font-size:12px;line-height:1.7"><strong>${n}.</strong> <span style="color:${cls};font-weight:700">${html}</span></div>`;
}
const KC='#1e5c3a', RC='#7a1a1a', TC='#1a3a8a', YC='#1e5c3a';

/* ── Karar Örnekleri Üreticiler ── */
function buildKabul() {
  let n=1;
  const h = [
    hItem(n++,KC,'Davanın <strong>KABULÜNE</strong>'),
    hItem(n++,TC,'<strong>320.000,00 TL</strong> tazminatın dava tarihi [TARİH]\'den yasal faiziyle davalıdan tahsiline'),
    hItem(n++,TC,'<strong>21.859,20 TL</strong> yargılama harcının davalıdan tahsiline'),
    hItem(n++,TC,'<strong>8.430,00 TL</strong> yargılama giderinin davalıdan alınarak davacıya verilmesine'),
    hItem(n++,TC,'<strong>32.000,00 TL</strong> vekâlet ücretinin davalıdan alınarak davacıya verilmesine'),
    hItem(n++,YC,'Tebliğden itibaren <strong>2 hafta</strong> içinde İstanbul BAM nezdinde <strong>İSTİNAF YOLU AÇIK</strong> olmak üzere'),
    `<div style="font-weight:800;background:#f9f5ea;padding:8px 0;font-size:12px">Karar verildi. <span style="float:right;font-weight:400;color:#888">[TARİH]</span></div>`
  ].join('');
  return kararSargi('[İL] [NO]. ASLİYE HUKUK MAHKEMESİ','20XX/XXXX Esas','20XX/XXX Karar',
    '[HÂKİM ADI] ([SİCİL])','[DAVACI ADI]','[DAVALI ŞİRKET]','Sözleşmeden Doğan Tazminat','320.000,00 TL',
    'Davacı vekili dava dilekçesinde; müvekkili ile davalı şirket arasında [TARİH] tarihinde akdedilen inşaat sözleşmesi uyarınca 350.000 TL ödeme yapıldığını, sözleşme gereği [TARİH] tarihine kadar teslim edilmesi gereken konutun teslim edilmediğini, bu nedenle 320.000 TL tazminat talep etmiştir.',
    'Davalı vekili; teslim gecikmesinin mücbir sebepten kaynaklandığını ileri sürerek davanın reddini talep etmiştir.',
    'Bilirkişi raporu ([TARİH]) incelendiğinde gecikmede davalı kusuru bulunduğu, mücbir sebebin şartlarının oluşmadığı anlaşılmıştır.',
    'TBK m.112, m.117-126, HMK m.26, m.326', h, '[KÂTİP ADI]','[TARİH]','[HÂKİM ADI] — [SİCİL]');
}

function buildRed() {
  let n=1;
  const h = [
    hItem(n++,RC,'Davanın <strong>REDDİNE</strong>'),
    hItem(n++,TC,'<strong>5.812,40 TL</strong> yargılama harcının davacıdan tahsiline'),
    hItem(n++,TC,'<strong>12.750,00 TL</strong> vekâlet ücretinin davacıdan alınarak davalıya verilmesine'),
    hItem(n++,YC,'Tebliğden itibaren <strong>2 hafta</strong> İstinaf yolu açık olmak üzere'),
    `<div style="font-weight:800;background:#f9f5ea;padding:8px 0;font-size:12px">Karar verildi. <span style="float:right;font-weight:400;color:#888">[TARİH]</span></div>`
  ].join('');
  return kararSargi('[İL] [NO]. ASLİYE HUKUK MAHKEMESİ','20XX/XXXX','20XX/XXXX',
    '[HÂKİM ADI] ([SİCİL])','[DAVACI ADI]','[DAVALI ŞİRKET]','Ayıplı Mal Tazminatı','85.000,00 TL',
    'Davacı; satın aldığı buzdolabının 3 ay içinde arızalandığını, garanti kapsamı dışında tutulduğunu ileri sürerek tazminat talep etmiştir.',
    'Davalı; arızanın kullanıcı hatasından kaynaklandığını savunmuştur.',
    'Bilirkişi incelemesi sonucunda arızanın üretim hatasından değil kullanıcı hatasından kaynaklandığı tespit edilmiştir.',
    'TBK m.219, m.227, 6502 K. m.56', h, '[KÂTİP ADI]','[TARİH]','[HÂKİM ADI] — [SİCİL]');
}

function buildKismen() {
  let n=1;
  const h = [
    hItem(n++,KC,'Davanın <strong>KISMİ KABULÜNE</strong>'),
    hItem(n++,RC,'Maddi tazminat talebinin <strong>REDDİNE</strong>'),
    hItem(n++,TC,'<strong>75.000,00 TL</strong> manevi tazminatın karar tarihinden yasal faiziyle tahsiline (Kabul: <strong>%37,5</strong>)'),
    hItem(n++,TC,'Harç ve giderlerin kabul-red oranında paylaştırılmasına'),
    hItem(n++,TC,'Kabul için <strong>11.250,00 TL</strong> vekâlet ücreti davalıdan; red için <strong>17.500,00 TL</strong> vekâlet ücreti davacıdan'),
    hItem(n++,YC,'Tebliğden <strong>2 hafta</strong> İstinaf yolu açık olmak üzere'),
    `<div style="font-weight:800;background:#f9f5ea;padding:8px 0;font-size:12px">Karar verildi. <span style="float:right;font-weight:400;color:#888">[TARİH]</span></div>`
  ].join('');
  return kararSargi('[İL] [NO]. ASLİYE HUKUK MAHKEMESİ','20XX/XXX','20XX/XXX',
    '[HÂKİM ADI] ([SİCİL])','[DAVACI ADI]','[DAVALI ŞİRKET]','Kişilik Hakkı İhlali — Manevi Tazminat','250.000,00 TL (Talep)',
    'Davacı; davalı yayın organının yayımladığı haberin kişilik haklarını ihlal ettiğini, 50.000 TL maddi + 200.000 TL manevi tazminat talep etmiştir.',
    'Davalı; yayının gerçek ve kamu yararına ilişkin olduğunu savunmuştur.',
    'Kişilik hakkı ihlali sabit olmakla birlikte maddi zarar için yeterli delil sunulamamıştır. Manevi tazminat hakkaniyet ilkesi çerçevesinde 75.000 TL olarak takdir edilmiştir.',
    'TMK m.24-25, TBK m.58, HMK m.327', h, 'Kâtip','[TARİH]','[HÂKİM ADI] — [SİCİL]');
}

function buildNafaka() {
  let n=1;
  const h = [
    hItem(n++,KC,'Davanın <strong>KABULÜNE</strong>'),
    hItem(n++,TC,'Müşterek çocuk <strong>[ÇOCUK]</strong> için aylık <strong>8.500,00 TL İŞTİRAK NAFAKASINA</strong>'),
    `<div style="padding:6px 0;border-bottom:1px dotted #d4c5a0;font-size:12px;line-height:1.7"><strong>${n++}.</strong> Her yılın Ocak ayında TÜFE artış oranında artırılmasına</div>`,
    `<div style="padding:6px 0;border-bottom:1px dotted #d4c5a0;font-size:12px;line-height:1.7"><strong>${n++}.</strong> Her ayın 1. günü banka havalesi ile ödenmesine</div>`,
    hItem(n++,TC,'Maktu harç <strong>680,00 TL</strong> davacıdan tahsiline; <strong>5.100,00 TL</strong> vekâlet ücreti davalıdan davacıya'),
    hItem(n++,YC,'Tebliğden <strong>2 hafta</strong> İstinaf yolu açık olmak üzere'),
    `<div style="font-weight:800;background:#f9f5ea;padding:8px 0;font-size:12px">Karar verildi. <span style="float:right;font-weight:400;color:#888">[TARİH]</span></div>`
  ].join('');
  return kararSargi('[İL] [NO]. AİLE MAHKEMESİ','20XX/XXX','20XX/XXX',
    '[HÂKİM ADI] ([SİCİL])','[DAVACI ADI]','[DAVALI ADI]','İştirak Nafakası','—',
    'Davacı vekili; müşterek çocuk Defne için aylık 8.500 TL iştirak nafakası talep etmiştir.',
    'Davalı; talep edilen tutarın fazla olduğunu savunmuştur.',
    'Tarafların ekonomik durumları ve çocuğun ihtiyaçları gözetilerek nafaka miktarı belirlenmiştir.',
    'TMK m.182/2, m.176', h, 'Kâtip','[TARİH]','[HÂKİM ADI] — [SİCİL]');
}

function buildTapuIptal() {
  let n=1;
  const h = [
    hItem(n++,KC,'Davanın <strong>KABULÜNE</strong>'),
    hItem(n++,RC,'<strong>[İL/İLÇE] [XXXX] Ada, [XX] Parsel</strong> taşınmazın davalı adına olan tapu kaydının <strong>İPTALİNE</strong>'),
    hItem(n++,KC,'Taşınmazın davacı <strong>[DAVACI ADI]</strong> adına <strong>TESCİLİNE</strong>'),
    `<div style="padding:6px 0;border-bottom:1px dotted #d4c5a0;font-size:12px;line-height:1.7"><strong>${n++}.</strong> Konya Tapu Sicil Müdürlüğü'ne tescil müzekkeresi yazılmasına</div>`,
    hItem(n++,TC,'<strong>38.720,00 TL</strong> yargılama harcı davalıdan tahsiline'),
    hItem(n++,TC,'<strong>28.500,00 TL</strong> vekâlet ücreti davalıdan alınarak davacıya verilmesine'),
    hItem(n++,YC,'Tebliğden <strong>2 hafta</strong> İstinaf yolu açık olmak üzere'),
    `<div style="font-weight:800;background:#f9f5ea;padding:8px 0;font-size:12px">Karar verildi. <span style="float:right;font-weight:400;color:#888">[TARİH]</span></div>`
  ].join('');
  return kararSargi('[İL] [NO]. ASLİYE HUKUK MAHKEMESİ','20XX/XXXX','20XX/XXX',
    '[HÂKİM ADI] ([SİCİL])','[DAVACI ADI]','[DAVALI ADI]','Tapu İptali ve Tescil','2.200.000,00 TL',
    'Davacı vekili; davalının hile ile vekâletnameyi kullanarak taşınmazı kendi adına tescil ettirdiğini ileri sürmüştür.',
    'Davalı vekili; devrin yasal yollarla gerçekleştiğini, iyiniyetli iktisabın korunması gerektiğini savunmuştur.',
    'Grafoloji bilirkişi raporu imzanın davacıya ait olmadığını ortaya koymuştur; TMK m.1023 uygulama imkânı bulunmamaktadır.',
    'TMK m.705, m.1023, TBK m.36, Tapu K. m.26', h, 'Kâtip','[TARİH]','[HÂKİM ADI] — [SİCİL]');
}

function buildInkar() {
  let n=1;
  const h = [
    hItem(n++,KC,'Davanın <strong>KABULÜNE</strong>'),
    hItem(n++,RC,'İcra takibine yapılan itirazın <strong>İPTALİNE</strong> ve takibin devamına'),
    hItem(n++,TC,'Asıl alacak <strong>120.000,00 TL</strong> üzerinden takip tarihinden yasal faize'),
    hItem(n++,RC,'İİK m.67/2 uyarınca %20 = <strong>24.000,00 TL İNKAR TAZMİNATINA</strong>'),
    hItem(n++,TC,'<strong>8.208,00 TL</strong> yargılama harcı + <strong>18.000,00 TL</strong> vekâlet ücreti davalıdan tahsiline'),
    hItem(n++,YC,'Tebliğden <strong>2 hafta</strong> İstinaf yolu açık olmak üzere'),
    `<div style="font-weight:800;background:#f9f5ea;padding:8px 0;font-size:12px">Karar verildi. <span style="float:right;font-weight:400;color:#888">[TARİH]</span></div>`
  ].join('');
  return kararSargi('[İL] [NO]. ASLİYE HUKUK MAHKEMESİ','20XX/XXXX','20XX/XXXX',
    '[HÂKİM ADI] ([SİCİL])','[DAVACI ADI]','[DAVALI ADI]','İtirazın İptali (İİK m.67)','120.000,00 TL',
    'Davacı; 120.000 TL kira alacağı için başlattığı icra takibine haksız itiraz yapıldığını ileri sürerek itirazın iptali ve inkar tazminatı talep etmiştir.',
    'Davalı; kira alacağının ödendiğini, sözleşmenin sona erdiğini savunmuştur.',
    'Kira sözleşmesi ve banka kayıtları incelenmiş; alacağın gerçek ve muaccel olduğu, itirazın kötüniyetle yapıldığı anlaşılmıştır.',
    'İİK m.67/1, m.67/2, HMK m.326', h, 'Kâtip','[TARİH]','[HÂKİM ADI] — [SİCİL]');
}

/* ── ORNEKLER nesnesi ── */
const ORNEKLER = {
  'Hüküm Türleri': {
    'Davanın Kabulü': buildKabul,
    'Davanın Reddi': buildRed,
    'Kısmen Kabul/Red': buildKismen,
    'Nafaka Kararı': buildNafaka,
  },
  'Taşınmaz Davaları': {
    'Tapu İptali ve Tescil': buildTapuIptal,
  },
  'İcra & Tazminat': {
    'İtirazın İptali + İnkar': buildInkar,
  },
};

/* ── DİLEKÇE ŞABLONLARI ── */
const SABLONLAR = {
  'Medeni Hukuk': {
    'Davaya Cevap': `                                                    [MAHKEME ADI]'NA

DOSYA NO: [Esas No]

DAVALI: [Adı Soyadı]
T.C. Kimlik No: [TC No]
Adres: [Adres]

DAVACI: [Adı Soyadı]

KONU: Davaya cevaplarımızın sunulmasından ibarettir.

AÇIKLAMALAR:

1. [Birinci açıklama]

2. [İkinci açıklama]

3. [Üçüncü açıklama]

HUKUKİ NEDENLER: HMK, TMK ve ilgili mevzuat

DELİLLER: Her türlü yasal delil

SONUÇ VE TALEP: Yukarıda arz ve izah edilen nedenlerle;
- Davanın REDDİNE,
- Yargılama giderleri ve vekâlet ücretinin davacıya yükletilmesine,
karar verilmesini saygıyla arz ve talep ederim.

                                                    [Tarih]
                                                    
                                                    Davalı
                                                    [İmza]`,
    'İstinaf Dilekçesi': `                                    [İL] BÖLGE ADLİYE MAHKEMESİ
                                    İLGİLİ HUKUK DAİRESİ BAŞKANLIĞI'NA
                                    Sunulmak Üzere
                                    [MAHKEME ADI]'NA

DOSYA NO: [Esas No]
KARAR NO: [Karar No]

İSTİNAF BAŞVURUSUNDA
BULUNAN DAVACI: [Adı Soyadı]
VEKİLİ: Av. [Vekil Adı]

DAVALI: [Adı Soyadı]

KONU: [Mahkeme Adı]'nın [Tarih] tarih ve [Karar No] sayılı kararının istinaf incelemesi sonucunda KALDIRILMASI talebidir.

KARARIN TEBLİĞ TARİHİ: [Tebliğ Tarihi]

İSTİNAF SEBEPLERİ:

1. USUL YÖNÜNDEN:
[Usule ilişkin itirazlar]

2. ESAS YÖNÜNDEN:
[Esasa ilişkin itirazlar]

HUKUKİ NEDENLER: HMK m.341-360, TMK ve ilgili mevzuat

SONUÇ VE TALEP: Yukarıda arz ve izah edilen nedenlerle;
- Yerel mahkeme kararının KALDIRILMASINA,
- Davanın KABULÜNE karar verilmesini,
saygıyla arz ve talep ederim.

                                                    [Tarih]
                                                    
                                                    Davacı Vekili
                                                    Av. [İmza]`,
  },
  'Gayri Menkul': {
    'Tapu İptal ve Tescil': `                                    [MAHKEME ADI]'NA

DAVACI: [Adı Soyadı]
T.C. Kimlik No: [TC No]
Adres: [Adres]

VEKİLİ: Av. [Vekil Adı]
Adres: [Vekil Adresi]

DAVALI: [Adı Soyadı]
T.C. Kimlik No: [TC No]  
Adres: [Adres]

DAVA KONUSU TAŞINMAZ:
İli: [İl]
İlçesi: [İlçe]
Mahallesi/Köyü: [Mahalle]
Ada/Parsel: [Ada/Parsel No]
Yüzölçümü: [m²]

DAVA DEĞERİ: [Taşınmaz Değeri] TL

KONU: Tapu kaydının iptali ve davacı adına tescili talebidir.

AÇIKLAMALAR:

1. [Taşınmazın davacıya ait olduğuna dair açıklama]

2. [Davalının haksız tescile ilişkin açıklama]

3. [Delillere ilişkin açıklama]

HUKUKİ NEDENLER: TMK m.705, m.1023, TBK, Tapu Kanunu ve ilgili mevzuat

DELİLLER:
- Tapu kayıtları
- Bilirkişi incelemesi
- Keşif
- Tanık beyanları
- Her türlü yasal delil

SONUÇ VE TALEP: Yukarıda arz ve izah edilen nedenlerle;
1. Dava konusu taşınmazın davalı adına olan tapu kaydının İPTALİNE,
2. Taşınmazın davacı adına TESCİLİNE,
3. Yargılama giderleri ve vekâlet ücretinin davalıya yükletilmesine,
karar verilmesini saygıyla arz ve talep ederim.

                                                    [Tarih]
                                                    
                                                    Davacı Vekili
                                                    Av. [İmza]`,
  },
  'Aile Hukuku': {
    'Nafaka Davası': `                                    [AİLE MAHKEMESİ ADI]'NA

DAVACI: [Adı Soyadı]
T.C. Kimlik No: [TC No]
Adres: [Adres]

VEKİLİ: Av. [Vekil Adı]

DAVALI: [Adı Soyadı]
T.C. Kimlik No: [TC No]
Adres: [Adres]

KONU: İştirak nafakası talebimizin sunulmasından ibarettir.

AÇIKLAMALAR:

1. Taraflar [Tarih] tarihinde evlenmiş olup, bu evlilikten [Çocuk Adı] isimli müşterek çocukları bulunmaktadır.

2. Tarafların evliliği [Tarih] tarihinde boşanma ile sona ermiş, müşterek çocuğun velayeti davacı anneye verilmiştir.

3. Davalı babanın mali durumu gözetildiğinde, müşterek çocuk için aylık [Miktar] TL iştirak nafakasına hükmedilmesi talep edilmektedir.

HUKUKİ NEDENLER: TMK m.182, m.329, m.330 ve ilgili mevzuat

DELİLLER:
- Nüfus kayıtları
- Boşanma ilamı
- Mali durum araştırması
- Tanık beyanları
- Her türlü yasal delil

SONUÇ VE TALEP: Yukarıda arz ve izah edilen nedenlerle;
- Müşterek çocuk için aylık [Miktar] TL iştirak nafakasına hükmedilmesine,
- Yargılama giderleri ve vekâlet ücretinin davalıya yükletilmesine,
karar verilmesini saygıyla arz ve talep ederim.

                                                    [Tarih]
                                                    
                                                    Davacı Vekili
                                                    Av. [İmza]`,
    'Boşanma Dilekçesi': `                                    [AİLE MAHKEMESİ ADI]'NA

DAVACI: [Adı Soyadı]
T.C. Kimlik No: [TC No]
Adres: [Adres]

VEKİLİ: Av. [Vekil Adı]

DAVALI: [Adı Soyadı]
T.C. Kimlik No: [TC No]
Adres: [Adres]

KONU: Boşanma, velayet, nafaka ve tazminat taleplerimizin sunulmasından ibarettir.

AÇIKLAMALAR:

1. Taraflar [Tarih] tarihinde evlenmiş olup, bu evlilikten [Çocuk sayısı] müşterek çocukları bulunmaktadır.

2. [Evlilik birliğinin temelinden sarsıldığına dair açıklamalar]

3. [Boşanma sebepleri]

HUKUKİ NEDENLER: TMK m.161-184 ve ilgili mevzuat

DELİLLER:
- Nüfus kayıtları
- Tanık beyanları
- Her türlü yasal delil

SONUÇ VE TALEP: Yukarıda arz ve izah edilen nedenlerle;
1. Tarafların BOŞANMALARINA,
2. Müşterek çocukların velayetinin davacıya verilmesine,
3. Müşterek çocuklar için aylık [Miktar] TL iştirak nafakasına,
4. Davacı lehine aylık [Miktar] TL yoksulluk nafakasına,
5. Davacı lehine [Miktar] TL maddi, [Miktar] TL manevi tazminata,
6. Yargılama giderleri ve vekâlet ücretinin davalıya yükletilmesine,
karar verilmesini saygıyla arz ve talep ederim.

                                                    [Tarih]
                                                    
                                                    Davacı Vekili
                                                    Av. [İmza]`,
  },
  'İcra Hukuku': {
    'İtirazın İptali': `                                    [MAHKEME ADI]'NA

DAVACI (Alacaklı): [Adı Soyadı]
T.C. Kimlik No: [TC No]
Adres: [Adres]

VEKİLİ: Av. [Vekil Adı]

DAVALI (Borçlu): [Adı Soyadı]
T.C. Kimlik No: [TC No]
Adres: [Adres]

İCRA DOSYASI: [İcra Müdürlüğü] [Dosya No]

DAVA DEĞERİ: [Alacak Tutarı] TL

KONU: İtirazın iptali ve %20 icra inkâr tazminatı talebimizin sunulmasından ibarettir.

AÇIKLAMALAR:

1. Müvekkilin davalıdan [Alacak Tutarı] TL alacağı bulunmaktadır.

2. Alacağın tahsili için [İcra Müdürlüğü]'nün [Dosya No] sayılı dosyası ile icra takibi başlatılmıştır.

3. Davalı borçlu, [Tarih] tarihinde borca itiraz ederek takibi durdurmuştur.

4. Davalının itirazı haksız ve kötüniyetli olup, İİK m.67 uyarınca %20 icra inkâr tazminatına hükmedilmesi gerekmektedir.

HUKUKİ NEDENLER: İİK m.67, HMK ve ilgili mevzuat

DELİLLER:
- İcra dosyası
- Sözleşme/Senet
- Tanık beyanları
- Her türlü yasal delil

SONUÇ VE TALEP: Yukarıda arz ve izah edilen nedenlerle;
1. Davalının itirazının İPTALİNE ve takibin devamına,
2. Davalının %20 oranında İCRA İNKÂR TAZMİNATINA mahkûm edilmesine,
3. Yargılama giderleri ve vekâlet ücretinin davalıya yükletilmesine,
karar verilmesini saygıyla arz ve talep ederim.

                                                    [Tarih]
                                                    
                                                    Davacı Vekili
                                                    Av. [İmza]`,
  },
  'Nüfus Davaları': {
    'Ad Soyad Düzeltme': `                                    [ASLİYE HUKUK MAHKEMESİ ADI]'NA

DAVACI: [Mevcut Adı Soyadı]
T.C. Kimlik No: [TC No]
Adres: [Adres]

DAVALI: [İl] Nüfus Müdürlüğü

KONU: Ad/Soyad düzeltilmesi talebimizin sunulmasından ibarettir.

AÇIKLAMALAR:

1. Nüfus kaydında "[Mevcut Ad/Soyad]" olarak kayıtlı olan ad/soyadımın "[İstenen Ad/Soyad]" olarak düzeltilmesini talep ediyorum.

2. [Düzeltme gerekçesi - örn: yazım hatası, kullanılan isimle uyumsuzluk vb.]

3. Okul, banka ve SGK kayıtlarında ismim "[İstenen Ad/Soyad]" olarak geçmektedir.

HUKUKİ NEDENLER: TMK m.27, 5490 sayılı Nüfus Hizmetleri Kanunu m.36

DELİLLER:
- Nüfus kayıt örneği
- Okul kayıtları
- Banka kayıtları
- SGK kayıtları
- Tanık beyanları
- Her türlü yasal delil

SONUÇ VE TALEP: Yukarıda arz ve izah edilen nedenlerle;
- Nüfus kaydındaki "[Mevcut Ad/Soyad]" kaydının "[İstenen Ad/Soyad]" olarak DÜZELTİLMESİNE,
karar verilmesini saygıyla arz ve talep ederim.

                                                    [Tarih]
                                                    
                                                    Davacı
                                                    [İmza]`,
  },
};

/* ══════════════════════════════════════════
   BÖLÜM 1 — NAVIGASYON
══════════════════════════════════════════ */
function showPage(id, el) {
  try {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.sb-item').forEach(i => i.classList.remove('active'));
    const pg = document.getElementById('page-' + id);
    if (pg) pg.classList.add('active');
    if (el) { el.classList.add('active'); }
    else {
      const found = document.querySelector('[data-page="' + id + '"]');
      if (found) found.classList.add('active');
    }
    const isimler = {anasayfa:'Ana Sayfa',dilekce:'Dilekçe Yazma',hakim:'Hâkim Karar Yazım',
      ornekler:'Karar Örnekleri',hesaplama:'Hesaplama',ustyargi:'Üst Yargı',kayitli:'Kayıtlı Belgeler'};
    st('sb-aktif', isimler[id] || id);
    
    if (id === 'kayitli') updateBelgeListesi();
  } catch(e) { console.error('showPage hatası:', e); }
}

/* ══════════════════════════════════════════
   BÖLÜM 2 — DİLEKÇE YAZMA
══════════════════════════════════════════ */
let aktifSablon = null;

function renderSablonListesi() {
  const container = document.getElementById('sablon-listesi');
  if (!container) return;
  
  let html = '';
  for (const [kategori, sablonlar] of Object.entries(SABLONLAR)) {
    html += `<h3>${kategori}</h3>`;
    for (const [ad, icerik] of Object.entries(sablonlar)) {
      html += `<div class="sitem" data-sablon="${kategori}|${ad}">${ad}</div>`;
    }
  }
  container.innerHTML = html;
  
  container.querySelectorAll('.sitem').forEach(item => {
    item.addEventListener('click', () => {
      const [kat, ad] = item.dataset.sablon.split('|');
      const icerik = SABLONLAR[kat][ad];
      document.getElementById('dilekce-text').value = icerik;
      aktifSablon = ad;
      st('aktif-sablon', ad);
      container.querySelectorAll('.sitem').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      updateStats();
    });
  });
}

function updateStats() {
  const text = document.getElementById('dilekce-text')?.value || '';
  const kelimeler = text.trim() ? text.trim().split(/\s+/).length : 0;
  const karakterler = text.length;
  const cumleler = text.split(/[.!?]+/).filter(s => s.trim()).length;
  const paragraflar = text.split(/\n\n+/).filter(p => p.trim()).length;
  
  st('stat-kelime', kelimeler);
  st('stat-char', karakterler);
  st('stat-cumle', cumleler);
  st('stat-para', paragraflar);
}

/* ══════════════════════════════════════════
   BÖLÜM 3 — HÂKİM KARAR YAZIM
══════════════════════════════════════════ */
const MHK_MIN = {asliye:45000,sulh:30000,aile:35000,is:35000,ticaret:45000,icra:9000};
const DAVA_ADLARI = {
  'sozlesme':'Sözleşmeden Doğan Tazminat','haksiz':'Haksız Fiil Tazminatı',
  'manevi':'Manevi Tazminat','alacak':'Alacak Davası',
  'itiraz-iptal':'İtirazın İptali (İİK m.67)','menfi':'Menfi Tespit',
  'tapu-iptal':'Tapu İptali ve Tescil','zamanasiimi':'Kazandırıcı Zamanaşımı',
  'irtifak':'İrtifak / Geçit Hakkı','tapu-duz':'Tapu Kaydı Düzeltimi',
  'izale':'Ortaklığın Giderilmesi','bosanma':'Boşanma',
  'nafaka':'Nafaka','velayet':'Velayet',
  'ad-soyad':'Ad Soyad Düzeltimi','yas':'Yaş Düzeltimi','nesep':'Nesep / Soybağı',
  'kidem':'Kıdem + İhbar Tazminatı','iade':'İşe İade',
  'marka':'Marka / Patent İhlali','sirket':'Şirket Feshi'
};

function hesaplaHarc(deger) {
  return deger * 0.06831;
}

function hesaplaVekalet(tutar, mhkTur) {
  const min = MHK_MIN[mhkTur] || 45000;
  if (tutar <= 0) return min;
  const oran = tutar <= 100000 ? 0.15 : tutar <= 500000 ? 0.12 : tutar <= 1000000 ? 0.10 : 0.08;
  return Math.max(tutar * oran, min);
}

function updateKararOnizleme() {
  st('kk-mhk', gv('f-mhk') || '[ MAHKEME ADI ]');
  sv('kk-esas', ': ' + (gv('f-esas') || '…'));
  sv('kk-kno', ': ' + (gv('f-kno') || '…'));
  sv('kk-hakim', ': ' + (gv('f-hakim') || '…') + (gv('f-sicil') ? ' (' + gv('f-sicil') + ')' : ''));
  sv('kk-katip', ': ' + (gv('f-katip') || '…'));
  sv('kk-tarih', ': ' + tarihFmt(gv('f-ktar')));
  
  sv('kk-dav', ': ' + (gv('f-dav-ad') || '…'));
  sv('kk-dav-vek', ': ' + (gv('f-dav-vek') || '—'));
  sv('kk-dal', ': ' + (gv('f-dal-ad') || '…'));
  sv('kk-dal-vek', ': ' + (gv('f-dal-vek') || '—'));
  
  const davaTuru = gv('f-dava-turu');
  sv('kk-dava-ad', ': ' + (DAVA_ADLARI[davaTuru] || '…'));
  st('sb-dava-tur', DAVA_ADLARI[davaTuru] || '—');
  
  const deger = parseFloat(gv('f-deger')) || 0;
  const kabul = parseFloat(gv('f-kabul')) || 0;
  sv('kk-deger', ': ' + (deger > 0 ? fmt(deger) : '…'));
  
  const red = Math.max(0, deger - kabul);
  const redEl = document.getElementById('f-red');
  if (redEl) redEl.value = red > 0 ? red : '';
  
  sv('kk-iddia', gv('f-iddia') || '<span class="ph">← Gerekçe sekmesinden doldurun</span>');
  sv('kk-savunma', gv('f-savunma') || '');
  sv('kk-gerekce', gv('f-gerekce') || '<span class="ph">← Gerekçe sekmesinden doldurun</span>');
  sv('kk-kanun', gv('f-kanun') || '…');
  
  st('kk-katip-imza', gv('f-katip') || '…');
  st('kk-tarih-imza', tarihFmt(gv('f-ktar')));
  st('kk-hakim-imza', (gv('f-hakim') || '…') + (gv('f-sicil') ? ' — ' + gv('f-sicil') : ''));
  
  if (deger > 0) {
    const mhkTur = gv('f-mhk-tur');
    const nispi = hesaplaHarc(deger);
    const pesin = nispi / 4;
    const bakiye = nispi * 3 / 4;
    const oran = deger > 0 ? ((kabul / deger) * 100).toFixed(1) : 0;
    const vekDav = hesaplaVekalet(kabul, mhkTur);
    const vekDal = hesaplaVekalet(red, mhkTur);
    const bilirkisi = parseFloat(gv('f-bilirkisi')) || 0;
    const gider = pesin + bilirkisi + 500;
    
    st('h-nispi', fmt(nispi));
    st('h-pesin', fmt(pesin));
    st('h-bakiye', fmt(bakiye));
    st('h-oran', '%' + oran);
    st('h-vek-d', fmt(vekDav));
    st('h-vek-dal', fmt(vekDal));
    st('h-gider', fmt(gider));
    st('sb-hesap', 'Harç: ' + fmt(nispi));
    
    updateHukum(davaTuru, kabul, red, deger, vekDav, vekDal, nispi, gider);
  }
}

function updateHukum(davaTuru, kabul, red, deger, vekDav, vekDal, harc, gider) {
  const hukumEl = document.getElementById('kk-hukum');
  if (!hukumEl) return;
  
  let items = [];
  let n = 1;
  
  if (kabul > 0 && red === 0) {
    items.push(hItem(n++, KC, 'Davanın <strong>KABULÜNE</strong>'));
  } else if (kabul === 0 && red > 0) {
    items.push(hItem(n++, RC, 'Davanın <strong>REDDİNE</strong>'));
  } else if (kabul > 0 && red > 0) {
    items.push(hItem(n++, KC, 'Davanın <strong>KISMİ KABULÜNE</strong>'));
  }
  
  if (kabul > 0) {
    items.push(hItem(n++, TC, `<strong>${fmt(kabul)}</strong> alacağın dava/takip tarihinden itibaren yasal faiziyle birlikte davalıdan tahsiline`));
  }
  
  if (davaTuru === 'itiraz-iptal' && kabul > 0) {
    const inkar = kabul * 0.20;
    items.push(hItem(n++, RC, `İİK m.67/2 uyarınca %20 = <strong>${fmt(inkar)} İNKAR TAZMİNATININ</strong> davalıdan tahsiline`));
  }
  
  items.push(hItem(n++, TC, `<strong>${fmt(harc)}</strong> yargılama harcının kabul-red oranında taraflardan tahsiline`));
  items.push(hItem(n++, TC, `<strong>${fmt(gider)}</strong> yargılama giderinin kabul-red oranında paylaştırılmasına`));
  
  if (vekDav > 0) {
    items.push(hItem(n++, TC, `Davacı lehine <strong>${fmt(vekDav)}</strong> vekâlet ücretinin davalıdan tahsiline`));
  }
  if (vekDal > 0) {
    items.push(hItem(n++, TC, `Davalı lehine <strong>${fmt(vekDal)}</strong> vekâlet ücretinin davacıdan tahsiline`));
  }
  
  items.push(hItem(n++, YC, 'Tebliğden itibaren <strong>2 hafta</strong> içinde <strong>İSTİNAF YOLU AÇIK</strong> olmak üzere'));
  items.push(`<div style="font-weight:800;background:#f9f5ea;padding:8px 0;font-size:12px">Karar verildi. <span style="float:right;font-weight:400;color:#888">${tarihFmt(gv('f-ktar'))}</span></div>`);
  
  hukumEl.innerHTML = items.join('');
}

/* ══════════════════════════════════════════
   BÖLÜM 4 — HESAPLAMA ARAÇLARI
══════════════════════════════════════════ */
function hesaplaHarcUI() {
  const deger = parseFloat(gv('c-deger')) || 0;
  const tur = gv('c-tur');
  const oran = parseFloat(gv('c-oran')) || 100;
  
  let harcOrani = 0.06831;
  if (tur === 'maktu') harcOrani = 0;
  else if (tur === 'tapu') harcOrani = 0.0455;
  else if (tur === 'is') harcOrani = 0.0509;
  
  const nispi = tur === 'maktu' ? 680 : deger * harcOrani;
  const pesin = nispi / 4;
  const bakiye = nispi * 3 / 4;
  const kabulaGore = nispi * (oran / 100);
  
  st('sh-nispi', fmt(nispi));
  st('sh-pesin', fmt(pesin));
  st('sh-bakiye', fmt(bakiye));
  st('sh-kabul', fmt(kabulaGore));
  
  document.getElementById('s-harc').style.display = 'block';
}

function hesaplaVekaletUI() {
  const kabul = parseFloat(gv('v-kabul')) || 0;
  const red = parseFloat(gv('v-red')) || 0;
  const mhkTur = gv('v-mhk');
  
  const vekDav = hesaplaVekalet(kabul, mhkTur);
  const vekDal = hesaplaVekalet(red, mhkTur);
  const net = vekDav - vekDal;
  
  st('sv-dav', fmt(vekDav));
  st('sv-dal', fmt(vekDal));
  st('sv-net', (net >= 0 ? '+' : '') + fmt(net) + (net >= 0 ? ' (Davacı lehine)' : ' (Davalı lehine)'));
  
  document.getElementById('s-vekalet').style.display = 'block';
}

function hesaplaInkar() {
  const takip = parseFloat(gv('i-takip')) || 0;
  const tur = gv('i-tur');
  const tazminat = takip * 0.20;
  
  st('si-tak', fmt(takip));
  st('si-taz', fmt(tazminat));
  st('si-top', fmt(takip + tazminat));
  
  document.getElementById('s-inkar').style.display = 'block';
}

function hesaplaFaiz() {
  const ana = parseFloat(gv('faiz-ana')) || 0;
  const bas = gv('faiz-bas');
  const bit = gv('faiz-bit');
  const tur = gv('faiz-tur');
  
  if (!bas || !bit) {
    toast('Tarih seçiniz', 'hata');
    return;
  }
  
  const basTarih = new Date(bas);
  const bitTarih = new Date(bit);
  const gun = Math.ceil((bitTarih - basTarih) / (1000 * 60 * 60 * 24));
  
  if (gun <= 0) {
    toast('Bitiş tarihi başlangıçtan sonra olmalı', 'hata');
    return;
  }
  
  let yillikOran = 0.24;
  if (tur === 'tcmb' || tur === 'ticari') yillikOran = 0.36;
  
  const faiz = ana * yillikOran * (gun / 365);
  
  st('sf-gun', gun + ' gün');
  st('sf-faiz', fmt(faiz));
  st('sf-top', fmt(ana + faiz));
  
  document.getElementById('s-faiz').style.display = 'block';
}

function hesaplaSure() {
  const teblig = gv('sc-teblig');
  const gun = parseInt(gv('sc-yol')) || 14;
  
  if (!teblig) {
    toast('Tebliğ tarihi seçiniz', 'hata');
    return;
  }
  
  const tebligTarih = new Date(teblig);
  const sonTarih = new Date(tebligTarih);
  sonTarih.setDate(sonTarih.getDate() + gun);
  
  const sonucEl = document.getElementById('sc-sonuc');
  sonucEl.innerHTML = `
    <strong>📅 Son Başvuru Tarihi:</strong> ${sonTarih.toLocaleDateString('tr-TR', {weekday:'long', day:'2-digit', month:'long', year:'numeric'})}<br>
    <small style="color:#666">Tebliğ: ${tebligTarih.toLocaleDateString('tr-TR')} + ${gun} gün</small>
  `;
  sonucEl.style.display = 'block';
}

/* ══════════════════════════════════════════
   BÖLÜM 5 — KARAR ÖRNEKLERİ
══════════════════════════════════════════ */
function renderOrnekListesi() {
  const container = document.getElementById('ornek-liste');
  if (!container) return;
  
  let html = '';
  for (const [kategori, ornekler] of Object.entries(ORNEKLER)) {
    html += `<div class="ol-grp"><h4>${kategori}</h4>`;
    for (const ad of Object.keys(ornekler)) {
      html += `<div class="ol-item" data-ornek="${kategori}|${ad}">${ad}</div>`;
    }
    html += '</div>';
  }
  container.innerHTML = html;
  
  container.querySelectorAll('.ol-item').forEach(item => {
    item.addEventListener('click', () => {
      const [kat, ad] = item.dataset.ornek.split('|');
      const builder = ORNEKLER[kat][ad];
      const icerik = typeof builder === 'function' ? builder() : `<pre style="white-space:pre-wrap;font-family:'Times New Roman',serif;font-size:12px;line-height:1.8;background:#fff;padding:30px;border:1px solid #d4c5a0;border-radius:4px">${builder}</pre>`;
      document.getElementById('ornek-icerik').innerHTML = icerik;
      container.querySelectorAll('.ol-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

/* ══════════════════════════════════════════
   BÖLÜM 6 — KAYITLI BELGELER
══════════════════════════════════════════ */
function updateBelgeListesi() {
  const belgeler = getBelgeler();
  const container = document.getElementById('belge-listesi');
  const sayEl = document.getElementById('belge-say');
  
  if (sayEl) sayEl.textContent = belgeler.length + ' Belge';
  
  if (!container) return;
  
  if (belgeler.length === 0) {
    container.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--muted)"><div style="font-size:40px;margin-bottom:10px">📁</div>Henüz kayıtlı belge yok</div>';
    return;
  }
  
  container.innerHTML = belgeler.map(b => `
    <div class="belge-kart" data-id="${b.id}">
      <h4>${b.tur === 'dilekce' ? '📝' : '⚖️'} ${b.baslik || 'Belge'}</h4>
      <p>${new Date(b.tarih).toLocaleDateString('tr-TR')} • ${b.tur === 'dilekce' ? 'Dilekçe' : 'Karar'}</p>
      <div class="belge-acts">
        <button onclick="acBelge(${b.id})">📂 Aç</button>
        <button onclick="silBelge(${b.id})">🗑 Sil</button>
      </div>
    </div>
  `).join('');
}

function acBelge(id) {
  const belgeler = getBelgeler();
  const belge = belgeler.find(b => b.id === id);
  if (!belge) return;
  
  if (belge.tur === 'dilekce') {
    showPage('dilekce');
    document.getElementById('dilekce-text').value = belge.icerik;
    aktifSablon = belge.baslik;
    st('aktif-sablon', belge.baslik);
    updateStats();
  }
  toast('Belge yüklendi', 'basari');
}

function silBelge(id) {
  if (!confirm('Bu belgeyi silmek istediğinize emin misiniz?')) return;
  deleteBelge(id);
  updateBelgeListesi();
  toast('Belge silindi', 'basari');
}

/* ══════════════════════════════════════════
   BÖLÜM 7 — YAZDIRMA & İNDİRME
══════════════════════════════════════════ */
function yazdir(tip) {
  if (tip === 'dilekce') {
    const text = document.getElementById('dilekce-text')?.value;
    if (!text) { toast('Önce dilekçe yazın', 'hata'); return; }
    const win = window.open('', '_blank');
    win.document.write(`<!DOCTYPE html><html><head><title>Dilekçe - Hukuk Pro</title><style>body{font-family:'Times New Roman',serif;font-size:14px;line-height:1.8;padding:40px;white-space:pre-wrap}@media print{body{padding:0}}</style></head><body>${text}</body></html>`);
    win.document.close();
    win.print();
  } else if (tip === 'karar') {
    const karar = document.getElementById('karar-kagit')?.innerHTML;
    const win = window.open('', '_blank');
    win.document.write(`<!DOCTYPE html><html><head><title>Mahkeme Kararı - Hukuk Pro</title><style>body{font-family:'Times New Roman',serif;padding:20px}@media print{body{padding:0}}</style></head><body>${karar}</body></html>`);
    win.document.close();
    win.print();
  } else if (tip === 'ornek') {
    const ornek = document.getElementById('ornek-icerik')?.innerHTML;
    const win = window.open('', '_blank');
    win.document.write(`<!DOCTYPE html><html><head><title>Karar Örneği - Hukuk Pro</title><style>body{font-family:'Times New Roman',serif;padding:20px}@media print{body{padding:0}}</style></head><body>${ornek}</body></html>`);
    win.document.close();
    win.print();
  }
}

function kopyala() {
  const text = document.getElementById('dilekce-text')?.value;
  if (!text) { toast('Kopyalanacak metin yok', 'hata'); return; }
  navigator.clipboard.writeText(text).then(() => toast('Kopyalandı!', 'basari'));
}

function indirWord() {
  const text = document.getElementById('dilekce-text')?.value;
  if (!text) { toast('İndirilecek metin yok', 'hata'); return; }
  
  const blob = new Blob([text], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = (aktifSablon || 'dilekce') + '.doc';
  a.click();
  URL.revokeObjectURL(url);
  toast('İndirildi!', 'basari');
}

function kaydetDilekce() {
  const text = document.getElementById('dilekce-text')?.value;
  if (!text) { toast('Kaydedilecek metin yok', 'hata'); return; }
  
  saveBelge({
    tur: 'dilekce',
    baslik: aktifSablon || 'Dilekçe',
    icerik: text
  });
  toast('Dilekçe kaydedildi!', 'basari');
  updateBelgeListesi();
}

/* ══════════════════════════════════════════
   BÖLÜM 8 — INITIALIZATION
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Navigasyon
  document.querySelectorAll('.sb-item').forEach(item => {
    item.addEventListener('click', () => showPage(item.dataset.page, item));
  });
  
  // Dashboard kartları
  document.getElementById('dc-dilekce')?.addEventListener('click', () => showPage('dilekce'));
  document.getElementById('dc-hakim')?.addEventListener('click', () => showPage('hakim'));
  document.getElementById('dc-ornekler')?.addEventListener('click', () => showPage('ornekler'));
  document.getElementById('dc-hesaplama')?.addEventListener('click', () => showPage('hesaplama'));
  document.getElementById('dc-ustyargi')?.addEventListener('click', () => showPage('ustyargi'));
  document.getElementById('dc-kayitli')?.addEventListener('click', () => showPage('kayitli'));
  
  // Ana sayfa butonları
  document.getElementById('btn-yeni-dilekce-ana')?.addEventListener('click', () => showPage('dilekce'));
  document.getElementById('btn-yeni-karar-ana')?.addEventListener('click', () => showPage('hakim'));
  
  // Dilekçe modülü
  renderSablonListesi();
  document.getElementById('dilekce-text')?.addEventListener('input', updateStats);
  document.getElementById('btn-dl-temizle')?.addEventListener('click', () => {
    document.getElementById('dilekce-text').value = '';
    aktifSablon = null;
    st('aktif-sablon', 'Seçilmedi');
    updateStats();
  });
  document.getElementById('btn-dl-yazdir')?.addEventListener('click', () => yazdir('dilekce'));
  document.getElementById('btn-dl-yazdir2')?.addEventListener('click', () => yazdir('dilekce'));
  document.getElementById('btn-dl-kopyala')?.addEventListener('click', kopyala);
  document.getElementById('btn-dl-kaydet')?.addEventListener('click', kaydetDilekce);
  document.getElementById('btn-dl-kaydet2')?.addEventListener('click', kaydetDilekce);
  document.getElementById('btn-dl-indir')?.addEventListener('click', indirWord);
  
  // Dilekçe toolbar
  document.querySelectorAll('.dl-toolbar .tb-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const ta = document.getElementById('dilekce-text');
      const ekle = btn.dataset.ekle;
      if (ta && ekle) {
        const start = ta.selectionStart;
        ta.value = ta.value.slice(0, start) + ekle + ta.value.slice(ta.selectionEnd);
        ta.selectionStart = ta.selectionEnd = start + ekle.length;
        ta.focus();
        updateStats();
      }
    });
  });
  
  // Şablon arama
  document.getElementById('sablon-ara')?.addEventListener('input', (e) => {
    const ara = e.target.value.toLowerCase();
    document.querySelectorAll('#sablon-listesi .sitem').forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(ara) ? '' : 'none';
    });
  });
  
  // Hâkim Karar modülü
  document.querySelectorAll('.ftab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.ftab-pane').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('ft' + tab.dataset.ftab)?.classList.add('active');
    });
  });
  
  // Karar form değişiklikleri
  document.querySelectorAll('.hk-form input, .hk-form select, .hk-form textarea').forEach(el => {
    el.addEventListener('input', updateKararOnizleme);
    el.addEventListener('change', updateKararOnizleme);
  });
  
  document.getElementById('btn-hk-sifirla')?.addEventListener('click', () => {
    document.querySelectorAll('.hk-form input, .hk-form textarea').forEach(el => el.value = '');
    document.querySelectorAll('.hk-form select').forEach(el => el.selectedIndex = 0);
    updateKararOnizleme();
  });
  document.getElementById('btn-hk-yazdir')?.addEventListener('click', () => yazdir('karar'));
  
  // Karar örnekleri
  renderOrnekListesi();
  document.getElementById('btn-orn-yazdir')?.addEventListener('click', () => yazdir('ornek'));
  
  // Hesaplama
  document.getElementById('btn-calc-harc')?.addEventListener('click', hesaplaHarcUI);
  document.getElementById('btn-calc-vekalet')?.addEventListener('click', hesaplaVekaletUI);
  document.getElementById('btn-calc-inkar')?.addEventListener('click', hesaplaInkar);
  document.getElementById('btn-calc-faiz')?.addEventListener('click', hesaplaFaiz);
  document.getElementById('btn-calc-sure')?.addEventListener('click', hesaplaSure);
  
  // Kayıtlı belgeler
  document.getElementById('btn-belge-yenile')?.addEventListener('click', updateBelgeListesi);
  document.getElementById('btn-belge-export')?.addEventListener('click', () => {
    const belgeler = getBelgeler();
    if (belgeler.length === 0) { toast('İndirilecek belge yok', 'hata'); return; }
    const blob = new Blob([JSON.stringify(belgeler, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hukuk-pro-belgeler.json';
    a.click();
    URL.revokeObjectURL(url);
    toast('Tüm belgeler indirildi', 'basari');
  });
  
  // Verileri temizle
  document.getElementById('btn-temizle-tum')?.addEventListener('click', () => {
    if (!confirm('Tüm kayıtlı belgeleri silmek istediğinize emin misiniz?')) return;
    localStorage.removeItem(STORAGE_KEY);
    updateBelgeListesi();
    toast('Tüm veriler temizlendi', 'basari');
  });
  
  // Initial updates
  updateBelgeListesi();
  updateStats();
  
  console.log('🏛️ Hukuk Pro Web v1.0.2 yüklendi!');
});

// Global fonksiyonlar (HTML onclick için)
window.acBelge = acBelge;
window.silBelge = silBelge;
