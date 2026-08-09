import { YargitayKarar } from '../types';

export const ornekKararlar: YargitayKarar[] = [
  {
    id: '1',
    daire: '4. Hukuk Dairesi',
    esasNo: '2024/1234',
    kararNo: '2024/5678',
    kararTarihi: '15.03.2024',
    konuBasligi: 'Haksız Fiil - Maddi ve Manevi Tazminat',
    ozet: 'Trafik kazası sonucu oluşan zararın tazmini davasında, kusur oranlarının belirlenmesi ve hesaplanan tazminat miktarının değerlendirilmesi hakkında.',
    tamMetin: `T.C.
YARGITAY
4. HUKUK DAİRESİ

ESAS NO: 2024/1234
KARAR NO: 2024/5678
KARAR TARİHİ: 15.03.2024

DAVA: Maddi ve manevi tazminat
DAVACI: A.B.
DAVALI: C.D.

ÖZET: Trafik kazası nedeniyle açılan maddi ve manevi tazminat davasında; bilirkişi raporu, tanık beyanları ve dosya kapsamındaki deliller birlikte değerlendirildiğinde, davalının %70 oranında kusurlu olduğu anlaşılmıştır.

Mahkemece, davacının maddi zararı için 50.000 TL, manevi zarar için 30.000 TL tazminata hükmedilmiş olup, karar usul ve yasaya uygundur.

SONUÇ: Temyiz isteminin REDDİNE, kararın ONANMASINA karar verildi.`,
    anahtar_kelimeler: ['trafik kazası', 'tazminat', 'kusur', 'maddi zarar', 'manevi zarar'],
    ilgiliMevzuat: ['TBK m.49', 'TBK m.56', 'KTK m.85'],
    emsal: true
  },
  {
    id: '2',
    daire: '9. Hukuk Dairesi',
    esasNo: '2024/2345',
    kararNo: '2024/6789',
    kararTarihi: '22.02.2024',
    konuBasligi: 'İş Akdinin Feshi - Kıdem Tazminatı',
    ozet: 'İşverenin haklı neden olmaksızın iş akdini feshetmesi halinde işçinin kıdem ve ihbar tazminatı haklarının değerlendirilmesi.',
    tamMetin: `T.C.
YARGITAY
9. HUKUK DAİRESİ

ESAS NO: 2024/2345
KARAR NO: 2024/6789
KARAR TARİHİ: 22.02.2024

DAVA: Kıdem ve ihbar tazminatı
DAVACI: E.F.
DAVALI: X Ltd. Şti.

ÖZET: Davacı işçi, 8 yıl süreyle aralıksız çalıştığı işyerinden haksız şekilde çıkarıldığını iddia etmiştir. Dosya kapsamında yapılan incelemede;

1. Davacının SGK kayıtlarına göre kesintisiz 8 yıl 3 ay çalıştığı,
2. İş akdinin işveren tarafından geçerli bir sebep gösterilmeksizin feshedildiği,
3. Davacıya herhangi bir tazminat ödemesi yapılmadığı tespit edilmiştir.

Mahkemece hesaplanan kıdem ve ihbar tazminatı miktarları dosya kapsamına uygundur.

SONUÇ: Temyiz isteminin REDDİNE, kararın ONANMASINA karar verildi.`,
    anahtar_kelimeler: ['kıdem tazminatı', 'ihbar tazminatı', 'haksız fesih', 'iş akdi'],
    ilgiliMevzuat: ['4857 s. İş K. m.17', '4857 s. İş K. m.25', '1475 s. İş K. m.14'],
    emsal: true
  },
  {
    id: '3',
    daire: '2. Hukuk Dairesi',
    esasNo: '2024/3456',
    kararNo: '2024/7890',
    kararTarihi: '10.01.2024',
    konuBasligi: 'Boşanma - Velayet - Nafaka',
    ozet: 'Evlilik birliğinin temelinden sarsılması nedeniyle boşanma davasında velayet ve nafaka düzenlemesinin değerlendirilmesi.',
    tamMetin: `T.C.
YARGITAY
2. HUKUK DAİRESİ

ESAS NO: 2024/3456
KARAR NO: 2024/7890
KARAR TARİHİ: 10.01.2024

DAVA: Boşanma, velayet, nafaka
DAVACI: G.H.
DAVALI: I.J.

ÖZET: Taraflar arasındaki evlilik birliğinin temelinden sarsılması nedeniyle boşanma davasında;

1. Her iki tarafın da kusurlu davranışları olduğu,
2. Ancak davalının kusur oranının daha ağır olduğu,
3. Müşterek çocuğun üstün yararı gereği velayetin davacı anneye verilmesinin uygun olduğu,
4. Çocuk için aylık 3.000 TL iştirak nafakasına hükmedilmesinin yerinde olduğu anlaşılmıştır.

SONUÇ: Temyiz isteminin REDDİNE, kararın ONANMASINA karar verildi.`,
    anahtar_kelimeler: ['boşanma', 'velayet', 'nafaka', 'evlilik birliği', 'çocuğun üstün yararı'],
    ilgiliMevzuat: ['TMK m.166', 'TMK m.182', 'TMK m.330'],
    emsal: false
  },
  {
    id: '4',
    daire: '11. Ceza Dairesi',
    esasNo: '2024/4567',
    kararNo: '2024/8901',
    kararTarihi: '05.04.2024',
    konuBasligi: 'Dolandırıcılık - Nitelikli Haller',
    ozet: 'Bilişim sistemleri kullanılarak işlenen nitelikli dolandırıcılık suçunda cezanın belirlenmesi.',
    tamMetin: `T.C.
YARGITAY
11. CEZA DAİRESİ

ESAS NO: 2024/4567
KARAR NO: 2024/8901
KARAR TARİHİ: 05.04.2024

SUÇ: Nitelikli dolandırıcılık (TCK m.158/1-f)
SANIK: K.L.
MÜŞTEKİ: M.N.

ÖZET: Sanığın, sahte internet sitesi kurarak müştekilerden toplam 150.000 TL para aldığı iddia edilen olayda;

1. Sanığın eyleminin bilişim sistemlerinin araç olarak kullanılması suretiyle dolandırıcılık suçunu oluşturduğu,
2. Mağdur sayısının çokluğu ve zarar miktarı gözetilerek temel cezanın üst sınırdan belirlenmesinin yerinde olduğu,
3. Sanık hakkında verilen 5 yıl hapis cezasının suç ve sanığın kişiliğine uygun olduğu anlaşılmıştır.

SONUÇ: Temyiz isteminin REDDİNE, hükmün ONANMASINA karar verildi.`,
    anahtar_kelimeler: ['dolandırıcılık', 'bilişim', 'nitelikli dolandırıcılık', 'sahte site'],
    ilgiliMevzuat: ['TCK m.157', 'TCK m.158'],
    emsal: true
  },
  {
    id: '5',
    daire: '12. Hukuk Dairesi',
    esasNo: '2024/5678',
    kararNo: '2024/9012',
    kararTarihi: '18.05.2024',
    konuBasligi: 'İcra Takibi - İtirazın İptali',
    ozet: 'Fatura alacağına dayalı icra takibinde borçlunun itirazının iptali davasının değerlendirilmesi.',
    tamMetin: `T.C.
YARGITAY
12. HUKUK DAİRESİ

ESAS NO: 2024/5678
KARAR NO: 2024/9012
KARAR TARİHİ: 18.05.2024

DAVA: İtirazın iptali
DAVACI: O.P. A.Ş.
DAVALI: R.S.

ÖZET: Davacı şirketin düzenlediği faturalara dayalı icra takibine borçlunun itirazı üzerine açılan davada;

1. Faturalardaki mal tesliminin kanıtlandığı,
2. Borçlunun imzaladığı irsaliye belgelerinin dosyada mevcut olduğu,
3. Ödeme iddiasının ispatlanamadığı tespit edilmiştir.

Borçlunun itirazının iptaline ve takibin devamına karar verilmesi yerindedir. Ancak icra inkar tazminatı hesabında hata yapıldığından bu yönden düzeltilerek onama kararı verilmiştir.

SONUÇ: Hükmün DÜZELTİLEREK ONANMASINA karar verildi.`,
    anahtar_kelimeler: ['icra takibi', 'itirazın iptali', 'fatura alacağı', 'icra inkar tazminatı'],
    ilgiliMevzuat: ['İİK m.67', 'İİK m.68', 'TTK m.21'],
    emsal: false
  },
  {
    id: '6',
    daire: '3. Hukuk Dairesi',
    esasNo: '2024/6789',
    kararNo: '2024/0123',
    kararTarihi: '28.06.2024',
    konuBasligi: 'Kira Sözleşmesi - Tahliye',
    ozet: 'Kira bedelinin ödenmemesi nedeniyle kiracının tahliyesi davasının değerlendirilmesi.',
    tamMetin: `T.C.
YARGITAY
3. HUKUK DAİRESİ

ESAS NO: 2024/6789
KARAR NO: 2024/0123
KARAR TARİHİ: 28.06.2024

DAVA: Tahliye
DAVACI: T.U.
DAVALI: V.Y.

ÖZET: Davacı kiraya veren, davalı kiracının üç aylık kira bedelini ödemediğini, yazılı ihtara rağmen ödeme yapmadığını belirterek tahliye talep etmiştir.

Dosya kapsamında;
1. Kira sözleşmesinin geçerli olduğu,
2. İhtarnamenin usulüne uygun tebliğ edildiği,
3. Davalının 30 günlük süre içinde ödeme yapmadığı,
4. Temerrüt şartlarının oluştuğu anlaşılmıştır.

SONUÇ: Temyiz isteminin REDDİNE, tahliye kararının ONANMASINA karar verildi.`,
    anahtar_kelimeler: ['kira', 'tahliye', 'temerrüt', 'kira bedeli', 'ihtar'],
    ilgiliMevzuat: ['TBK m.315', 'TBK m.352', '6570 s. K. m.7'],
    emsal: false
  },
  {
    id: '7',
    daire: '15. Hukuk Dairesi',
    esasNo: '2024/7890',
    kararNo: '2024/1234',
    kararTarihi: '12.07.2024',
    konuBasligi: 'Eser Sözleşmesi - İş Bedeli',
    ozet: 'İnşaat sözleşmesinde eksik ve ayıplı işler nedeniyle bedel indiriminin değerlendirilmesi.',
    tamMetin: `T.C.
YARGITAY
15. HUKUK DAİRESİ

ESAS NO: 2024/7890
KARAR NO: 2024/1234
KARAR TARİHİ: 12.07.2024

DAVA: İş bedeli alacağı
DAVACI: Z.A. İnş. Ltd. Şti.
DAVALI: B.C.

ÖZET: Davacı yüklenici, konut inşaatını tamamladığını belirterek bakiye iş bedelini talep etmiştir. Davalı iş sahibi ise işin eksik ve ayıplı olduğunu savunmuştur.

Bilirkişi raporuna göre;
1. İnşaatın %95 oranında tamamlandığı,
2. 50.000 TL değerinde eksik iş bulunduğu,
3. 30.000 TL değerinde ayıplı işçilik tespit edildiği anlaşılmıştır.

Mahkemece yapılan hesaplama doğru olup, eksik ve ayıplı iş bedeli mahsup edilerek kalan miktara hükmedilmesi yerindedir.

SONUÇ: Temyiz isteminin REDDİNE, kararın ONANMASINA karar verildi.`,
    anahtar_kelimeler: ['eser sözleşmesi', 'inşaat', 'eksik iş', 'ayıplı iş', 'iş bedeli'],
    ilgiliMevzuat: ['TBK m.470', 'TBK m.474', 'TBK m.475'],
    emsal: true
  },
  {
    id: '8',
    daire: '13. Hukuk Dairesi',
    esasNo: '2024/8901',
    kararNo: '2024/2345',
    kararTarihi: '25.08.2024',
    konuBasligi: 'Tüketici Hukuku - Ayıplı Mal',
    ozet: 'Ayıplı araç satışında tüketicinin seçimlik haklarının kullanılması.',
    tamMetin: `T.C.
YARGITAY
13. HUKUK DAİRESİ

ESAS NO: 2024/8901
KARAR NO: 2024/2345
KARAR TARİHİ: 25.08.2024

DAVA: Tüketici - Ayıplı mal
DAVACI: D.E.
DAVALI: F.G. Otomotiv A.Ş.

ÖZET: Davacı, satın aldığı sıfır kilometrede aracın motor arızası yapması nedeniyle araç bedelinin iadesi ile değer kaybının tazminini talep etmiştir.

Yapılan incelemede;
1. Aracın tesliminden 2 ay sonra motor arızası oluştuğu,
2. Arızanın üretim hatasından kaynaklandığı,
3. Ücretsiz onarım hakkının kullandırılmadığı,
4. Tüketicinin sözleşmeden dönme hakkını kullanabileceği anlaşılmıştır.

Araç bedelinin iadesi ile birlikte değer kaybı tazminatına hükmedilmesi yerindedir.

SONUÇ: Temyiz isteminin REDDİNE, kararın ONANMASINA karar verildi.`,
    anahtar_kelimeler: ['tüketici', 'ayıplı mal', 'araç', 'motor arızası', 'seçimlik haklar'],
    ilgiliMevzuat: ['TKHK m.8', 'TKHK m.11', 'TBK m.227'],
    emsal: true
  }
];

export const daireler = [
  'Hukuk Genel Kurulu',
  'Ceza Genel Kurulu',
  '1. Hukuk Dairesi',
  '2. Hukuk Dairesi',
  '3. Hukuk Dairesi',
  '4. Hukuk Dairesi',
  '5. Hukuk Dairesi',
  '6. Hukuk Dairesi',
  '7. Hukuk Dairesi',
  '8. Hukuk Dairesi',
  '9. Hukuk Dairesi',
  '10. Hukuk Dairesi',
  '11. Hukuk Dairesi',
  '12. Hukuk Dairesi',
  '13. Hukuk Dairesi',
  '14. Hukuk Dairesi',
  '15. Hukuk Dairesi',
  '1. Ceza Dairesi',
  '2. Ceza Dairesi',
  '3. Ceza Dairesi',
  '4. Ceza Dairesi',
  '5. Ceza Dairesi',
  '6. Ceza Dairesi',
  '7. Ceza Dairesi',
  '8. Ceza Dairesi',
  '9. Ceza Dairesi',
  '10. Ceza Dairesi',
  '11. Ceza Dairesi',
  '12. Ceza Dairesi',
];
