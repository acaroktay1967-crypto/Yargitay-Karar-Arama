import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AramaCubugu } from '../components/AramaCubugu';
import { KararKarti } from '../components/KararKarti';
import { FiltrePaneli } from '../components/FiltrePaneli';
import { aramaServisi } from '../services/aramaServisi';
import { YargitayKarar, SearchFilters, RootStackParamList } from '../types';
import { useFavoriler } from '../hooks/useFavoriler';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function AramaScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const initialSorgu = (route.params as any)?.sorgu || '';

  const [sorgu, setSorgu] = useState(initialSorgu);
  const [sonuclar, setSonuclar] = useState<YargitayKarar[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [filtreVisible, setFiltreVisible] = useState(false);
  const [filtreler, setFiltreler] = useState<SearchFilters>({});
  const { favoriMi, toggleFavori } = useFavoriler();

  const aramaYap = useCallback(async () => {
    if (!sorgu.trim() && Object.keys(filtreler).length === 0) {
      return;
    }

    setLoading(true);
    setSearched(true);
    try {
      const results = await aramaServisi.ara(sorgu, filtreler);
      setSonuclar(results);
    } catch (error) {
      console.error('Arama hatası:', error);
    } finally {
      setLoading(false);
    }
  }, [sorgu, filtreler]);

  useEffect(() => {
    if (initialSorgu) {
      aramaYap();
    }
  }, []);

  const handleKararPress = (karar: YargitayKarar) => {
    navigation.navigate('KararDetay', { karar });
  };

  const aktifFiltreCount = Object.values(filtreler).filter(v => v !== undefined && v !== false).length;

  const renderEmpty = () => {
    if (loading) return null;

    if (!searched) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="search-outline" size={80} color="#ddd" />
          <Text style={styles.emptyTitle}>Karar Ara</Text>
          <Text style={styles.emptyText}>
            Arama çubuğuna anahtar kelime, esas numarası veya konu girerek arama yapabilirsiniz.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="document-outline" size={80} color="#ddd" />
        <Text style={styles.emptyTitle}>Sonuç Bulunamadı</Text>
        <Text style={styles.emptyText}>
          "{sorgu}" araması için sonuç bulunamadı. Farklı anahtar kelimeler deneyebilir veya filtreleri değiştirebilirsiniz.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <AramaCubugu
          value={sorgu}
          onChangeText={setSorgu}
          onSubmit={aramaYap}
          placeholder="Karar ara..."
        />
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.filterButton, aktifFiltreCount > 0 && styles.filterButtonActive]}
            onPress={() => setFiltreVisible(true)}
          >
            <Ionicons
              name="options-outline"
              size={20}
              color={aktifFiltreCount > 0 ? '#fff' : '#666'}
            />
            <Text style={[styles.filterText, aktifFiltreCount > 0 && styles.filterTextActive]}>
              Filtreler
            </Text>
            {aktifFiltreCount > 0 && (
              <View style={styles.filterBadge}>
                <Text style={styles.filterBadgeText}>{aktifFiltreCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          {searched && (
            <Text style={styles.sonucSayisi}>
              {sonuclar.length} sonuç bulundu
            </Text>
          )}
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2980B9" />
          <Text style={styles.loadingText}>Aranıyor...</Text>
        </View>
      ) : (
        <FlatList
          data={sonuclar}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <KararKarti
              karar={item}
              onPress={() => handleKararPress(item)}
              isFavori={favoriMi(item.id)}
              onFavoriToggle={() => toggleFavori(item)}
            />
          )}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={sonuclar.length === 0 ? styles.emptyList : styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      <FiltrePaneli
        visible={filtreVisible}
        onClose={() => setFiltreVisible(false)}
        onApply={(newFilters) => {
          setFiltreler(newFilters);
          setFiltreVisible(false);
          setTimeout(aramaYap, 100);
        }}
        currentFilters={filtreler}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterButtonActive: {
    backgroundColor: '#2980B9',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
  filterBadge: {
    backgroundColor: '#fff',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2980B9',
  },
  sonucSayisi: {
    fontSize: 13,
    color: '#888',
  },
  list: {
    paddingTop: 8,
    paddingBottom: 20,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
  },
});
