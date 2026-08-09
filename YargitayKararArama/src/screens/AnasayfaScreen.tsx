import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { KararKarti } from '../components/KararKarti';
import { AramaCubugu } from '../components/AramaCubugu';
import { aramaServisi } from '../services/aramaServisi';
import { YargitayKarar, RootStackParamList } from '../types';
import { useFavoriler } from '../hooks/useFavoriler';

const { width } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function AnasayfaScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [aramaSorgusu, setAramaSorgusu] = useState('');
  const [sonKararlar, setSonKararlar] = useState<YargitayKarar[]>([]);
  const [emsalKararlar, setEmsalKararlar] = useState<YargitayKarar[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { favoriMi, toggleFavori } = useFavoriler();

  const verileriYukle = useCallback(async () => {
    const [son, emsal] = await Promise.all([
      aramaServisi.sonKararlar(5),
      aramaServisi.emsalKararlar(5),
    ]);
    setSonKararlar(son);
    setEmsalKararlar(emsal);
  }, []);

  useEffect(() => {
    verileriYukle();
  }, [verileriYukle]);

  const onRefresh = async () => {
    setRefreshing(true);
    await verileriYukle();
    setRefreshing(false);
  };

  const handleArama = () => {
    if (aramaSorgusu.trim()) {
      navigation.navigate('Arama', { sorgu: aramaSorgusu } as any);
    }
  };

  const handleKararPress = (karar: YargitayKarar) => {
    navigation.navigate('KararDetay', { karar });
  };

  const istatistikler = [
    { icon: 'documents-outline', label: 'Toplam Karar', value: '1.2M+' },
    { icon: 'business-outline', label: 'Daire', value: '31' },
    { icon: 'calendar-outline', label: 'Yıl Aralığı', value: '1994-2024' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <LinearGradient
          colors={['#1a1a2e', '#16213e']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              <Ionicons name="scale-outline" size={36} color="#fff" />
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Yargıtay</Text>
                <Text style={styles.subtitle}>Karar Arama Sistemi</Text>
              </View>
            </View>
          </View>

          <AramaCubugu
            value={aramaSorgusu}
            onChangeText={setAramaSorgusu}
            onSubmit={handleArama}
            placeholder="Karar, konu veya anahtar kelime ara..."
          />

          <View style={styles.hizliErisim}>
            <TouchableOpacity style={styles.hizliButton}>
              <Ionicons name="flame-outline" size={18} color="#fff" />
              <Text style={styles.hizliButtonText}>Popüler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hizliButton}>
              <Ionicons name="time-outline" size={18} color="#fff" />
              <Text style={styles.hizliButtonText}>Son Eklenen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hizliButton}>
              <Ionicons name="star-outline" size={18} color="#fff" />
              <Text style={styles.hizliButtonText}>Emsal</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.istatistikler}>
          {istatistikler.map((item, index) => (
            <View key={index} style={styles.istatistikItem}>
              <View style={styles.istatistikIcon}>
                <Ionicons name={item.icon as any} size={24} color="#2980B9" />
              </View>
              <Text style={styles.istatistikValue}>{item.value}</Text>
              <Text style={styles.istatistikLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Emsal Kararlar</Text>
            <TouchableOpacity>
              <Text style={styles.tumunuGor}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>
          {emsalKararlar.map((karar) => (
            <KararKarti
              key={karar.id}
              karar={karar}
              onPress={() => handleKararPress(karar)}
              isFavori={favoriMi(karar.id)}
              onFavoriToggle={() => toggleFavori(karar)}
            />
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Son Eklenen Kararlar</Text>
            <TouchableOpacity>
              <Text style={styles.tumunuGor}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>
          {sonKararlar.map((karar) => (
            <KararKarti
              key={karar.id}
              karar={karar}
              onPress={() => handleKararPress(karar)}
              isFavori={favoriMi(karar.id)}
              onFavoriToggle={() => toggleFavori(karar)}
            />
          ))}
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
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  hizliErisim: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
    marginTop: 8,
  },
  hizliButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  hizliButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
  istatistikler: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    marginHorizontal: 16,
    marginTop: -10,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  istatistikItem: {
    alignItems: 'center',
  },
  istatistikIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F4FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  istatistikValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  istatistikLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  tumunuGor: {
    fontSize: 14,
    color: '#2980B9',
    fontWeight: '600',
  },
  bottomPadding: {
    height: 100,
  },
});
