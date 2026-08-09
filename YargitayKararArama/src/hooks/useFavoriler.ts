import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { YargitayKarar } from '../types';

const FAVORILER_KEY = '@yargitay_favoriler';

export function useFavoriler() {
  const [favoriler, setFavoriler] = useState<YargitayKarar[]>([]);
  const [loading, setLoading] = useState(true);

  const yukle = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORILER_KEY);
      if (stored) {
        setFavoriler(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Favoriler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    yukle();
  }, [yukle]);

  const favoriyeEkle = async (karar: YargitayKarar) => {
    try {
      const yeniFavoriler = [...favoriler, karar];
      await AsyncStorage.setItem(FAVORILER_KEY, JSON.stringify(yeniFavoriler));
      setFavoriler(yeniFavoriler);
    } catch (error) {
      console.error('Favoriye eklenirken hata:', error);
    }
  };

  const favoridenCikar = async (kararId: string) => {
    try {
      const yeniFavoriler = favoriler.filter(f => f.id !== kararId);
      await AsyncStorage.setItem(FAVORILER_KEY, JSON.stringify(yeniFavoriler));
      setFavoriler(yeniFavoriler);
    } catch (error) {
      console.error('Favoriden çıkarılırken hata:', error);
    }
  };

  const favoriMi = (kararId: string): boolean => {
    return favoriler.some(f => f.id === kararId);
  };

  const toggleFavori = async (karar: YargitayKarar) => {
    if (favoriMi(karar.id)) {
      await favoridenCikar(karar.id);
    } else {
      await favoriyeEkle(karar);
    }
  };

  return {
    favoriler,
    loading,
    favoriyeEkle,
    favoridenCikar,
    favoriMi,
    toggleFavori,
    yenile: yukle
  };
}
