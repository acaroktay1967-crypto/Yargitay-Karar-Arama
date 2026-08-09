export interface YargitayKarar {
  id: string;
  daire: string;
  esasNo: string;
  kararNo: string;
  kararTarihi: string;
  konuBasligi: string;
  ozet: string;
  tamMetin: string;
  anahtar_kelimeler: string[];
  ilgiliMevzuat: string[];
  emsal: boolean;
}

export interface SearchFilters {
  daire?: string;
  yilBaslangic?: number;
  yilBitis?: number;
  anahtar_kelime?: string;
  sadece_emsal?: boolean;
}

export type RootStackParamList = {
  Ana: undefined;
  Arama: undefined;
  KararDetay: { karar: YargitayKarar };
  Favoriler: undefined;
  Hakkinda: undefined;
};

export type TabParamList = {
  Anasayfa: undefined;
  Arama: undefined;
  Favoriler: undefined;
  Ayarlar: undefined;
};
