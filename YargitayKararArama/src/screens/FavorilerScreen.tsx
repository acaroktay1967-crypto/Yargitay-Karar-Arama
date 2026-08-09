import React, { useEffect } from 'react';
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
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { KararKarti } from '../components/KararKarti';
import { useFavoriler } from '../hooks/useFavoriler';
import { YargitayKarar, RootStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function FavorilerScreen() {
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();
  const { favoriler, loading, favoriMi, toggleFavori, yenile } = useFavoriler();

  useEffect(() => {
    if (isFocused) {
      yenile();
    }
  }, [isFocused]);

  const handleKararPress = (karar: YargitayKarar) => {
    navigation.navigate('KararDetay', { karar });
  };

  const renderEmpty = () => {
    if (loading) return null;

    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIcon}>
          <Ionicons name="heart-outline" size={60} color="#ddd" />
        </View>
        <Text style={styles.emptyTitle}>Henüz Favori Yok</Text>
        <Text style={styles.emptyText}>
          Beğendiğiniz kararları favorilere ekleyerek daha sonra kolayca erişebilirsiniz.
        </Text>
        <TouchableOpacity
          style={styles.aramaButton}
          onPress={() => navigation.navigate('Arama')}
        >
          <Ionicons name="search-outline" size={20} color="#fff" />
          <Text style={styles.aramaButtonText}>Karar Ara</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorilerim</Text>
        {favoriler.length > 0 && (
          <Text style={styles.count}>{favoriler.length} karar</Text>
        )}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2980B9" />
          <Text style={styles.loadingText}>Yükleniyor...</Text>
        </View>
      ) : (
        <FlatList
          data={favoriler}
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
          contentContainerStyle={favoriler.length === 0 ? styles.emptyList : styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a2e',
  },
  count: {
    fontSize: 14,
    color: '#888',
  },
  list: {
    paddingTop: 8,
    paddingBottom: 100,
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
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  aramaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#2980B9',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
  },
  aramaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
