import { YargitayKarar, SearchFilters } from '../types';
import { ornekKararlar } from '../data/ornekKararlar';

export class AramaServisi {
  private kararlar: YargitayKarar[] = ornekKararlar;

  async ara(sorgu: string, filtreler?: SearchFilters): Promise<YargitayKarar[]> {
    let sonuclar = [...this.kararlar];

    if (sorgu.trim()) {
      const sorguKucuk = sorgu.toLowerCase().trim();
      sonuclar = sonuclar.filter(karar => 
        karar.konuBasligi.toLowerCase().includes(sorguKucuk) ||
        karar.ozet.toLowerCase().includes(sorguKucuk) ||
        karar.tamMetin.toLowerCase().includes(sorguKucuk) ||
        karar.anahtar_kelimeler.some(k => k.toLowerCase().includes(sorguKucuk)) ||
        karar.esasNo.toLowerCase().includes(sorguKucuk) ||
        karar.kararNo.toLowerCase().includes(sorguKucuk) ||
        karar.daire.toLowerCase().includes(sorguKucuk)
      );
    }

    if (filtreler) {
      if (filtreler.daire) {
        sonuclar = sonuclar.filter(k => k.daire === filtreler.daire);
      }

      if (filtreler.yilBaslangic) {
        sonuclar = sonuclar.filter(k => {
          const yil = parseInt(k.kararTarihi.split('.')[2]);
          return yil >= filtreler.yilBaslangic!;
        });
      }

      if (filtreler.yilBitis) {
        sonuclar = sonuclar.filter(k => {
          const yil = parseInt(k.kararTarihi.split('.')[2]);
          return yil <= filtreler.yilBitis!;
        });
      }

      if (filtreler.sadece_emsal) {
        sonuclar = sonuclar.filter(k => k.emsal);
      }
    }

    await new Promise(resolve => setTimeout(resolve, 300));

    return sonuclar;
  }

  async sonKararlar(limit: number = 5): Promise<YargitayKarar[]> {
    return this.kararlar.slice(0, limit);
  }

  async emsalKararlar(limit: number = 5): Promise<YargitayKarar[]> {
    return this.kararlar.filter(k => k.emsal).slice(0, limit);
  }

  async kararGetir(id: string): Promise<YargitayKarar | undefined> {
    return this.kararlar.find(k => k.id === id);
  }
}

export const aramaServisi = new AramaServisi();
