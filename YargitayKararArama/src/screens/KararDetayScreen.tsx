import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';

import { YargitayKarar } from '../types';
import { useFavoriler } from '../hooks/useFavoriler';

export function KararDetayScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { karar } = route.params as { karar: YargitayKarar };
  const { favoriMi, toggleFavori } = useFavoriler();
  const [activeTab, setActiveTab] = useState<'ozet' | 'tamMetin'>('ozet');

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${karar.daire}\nEsas No: ${karar.esasNo}\nKarar No: ${karar.kararNo}\n\n${karar.konuBasligi}\n\n${karar.ozet}`,
        title: karar.konuBasligi,
      });
    } catch (error) {
      console.error('Paylaşım hatası:', error);
    }
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(karar.tamMetin);
    Alert.alert('Kopyalandı', 'Karar metni panoya kopyalandı.');
  };

  const isFavori = favoriMi(karar.id);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>Karar Detayı</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleCopy} style={styles.headerButton}>
            <Ionicons name="copy-outline" size={22} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={styles.headerButton}>
            <Ionicons name="share-outline" size={22} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavori(karar)} style={styles.headerButton}>
            <Ionicons
              name={isFavori ? 'heart' : 'heart-outline'}
              size={22}
              color={isFavori ? '#E74C3C' : '#666'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.daireContainer}>
          <Ionicons name="business-outline" size={18} color="#2980B9" />
          <Text style={styles.daire}>{karar.daire}</Text>
          {karar.emsal && (
            <View style={styles.emsalBadge}>
              <Text style={styles.emsalText}>Emsal Karar</Text>
            </View>
          )}
        </View>

        <Text style={styles.baslik}>{karar.konuBasligi}</Text>

        <View style={styles.bilgiGrid}>
          <View style={styles.bilgiItem}>
            <Text style={styles.bilgiLabel}>Esas No</Text>
            <Text style={styles.bilgiValue}>{karar.esasNo}</Text>
          </View>
          <View style={styles.bilgiItem}>
            <Text style={styles.bilgiLabel}>Karar No</Text>
            <Text style={styles.bilgiValue}>{karar.kararNo}</Text>
          </View>
          <View style={styles.bilgiItem}>
            <Text style={styles.bilgiLabel}>Karar Tarihi</Text>
            <Text style={styles.bilgiValue}>{karar.kararTarihi}</Text>
          </View>
        </View>

        <View style={styles.anahtarKelimeler}>
          <Text style={styles.sectionTitle}>Anahtar Kelimeler</Text>
          <View style={styles.kelimelerContainer}>
            {karar.anahtar_kelimeler.map((kelime, index) => (
              <View key={index} style={styles.kelimeBadge}>
                <Text style={styles.kelimeText}>{kelime}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.mevzuat}>
          <Text style={styles.sectionTitle}>İlgili Mevzuat</Text>
          <View style={styles.mevzuatContainer}>
            {karar.ilgiliMevzuat.map((madde, index) => (
              <View key={index} style={styles.mevzuatBadge}>
                <Ionicons name="document-text-outline" size={14} color="#27AE60" />
                <Text style={styles.mevzuatText}>{madde}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'ozet' && styles.tabActive]}
            onPress={() => setActiveTab('ozet')}
          >
            <Text style={[styles.tabText, activeTab === 'ozet' && styles.tabTextActive]}>
              Özet
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'tamMetin' && styles.tabActive]}
            onPress={() => setActiveTab('tamMetin')}
          >
            <Text style={[styles.tabText, activeTab === 'tamMetin' && styles.tabTextActive]}>
              Tam Metin
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.metinContainer}>
          {activeTab === 'ozet' ? (
            <Text style={styles.metin}>{karar.ozet}</Text>
          ) : (
            <Text style={styles.metin}>{karar.tamMetin}</Text>
          )}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginHorizontal: 16,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 6,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  daireContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  daire: {
    fontSize: 15,
    color: '#2980B9',
    fontWeight: '600',
  },
  emsalBadge: {
    backgroundColor: '#27AE60',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 'auto',
  },
  emsalText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  baslik: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a2e',
    marginBottom: 16,
    lineHeight: 30,
  },
  bilgiGrid: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  bilgiItem: {
    flex: 1,
    alignItems: 'center',
  },
  bilgiLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  bilgiValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  anahtarKelimeler: {
    marginBottom: 16,
  },
  kelimelerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  kelimeBadge: {
    backgroundColor: '#E8F4FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  kelimeText: {
    fontSize: 13,
    color: '#2980B9',
    fontWeight: '500',
  },
  mevzuat: {
    marginBottom: 16,
  },
  mevzuatContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  mevzuatBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E8F8F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  mevzuatText: {
    fontSize: 13,
    color: '#27AE60',
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: '#2980B9',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  tabTextActive: {
    color: '#fff',
  },
  metinContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  metin: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
  },
  bottomPadding: {
    height: 40,
  },
});
