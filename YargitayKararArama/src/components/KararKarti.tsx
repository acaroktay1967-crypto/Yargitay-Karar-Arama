import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { YargitayKarar } from '../types';

interface Props {
  karar: YargitayKarar;
  onPress: () => void;
  isFavori?: boolean;
  onFavoriToggle?: () => void;
}

const { width } = Dimensions.get('window');

export function KararKarti({ karar, onPress, isFavori, onFavoriToggle }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.daireContainer}>
          <Ionicons name="business-outline" size={14} color="#666" />
          <Text style={styles.daire}>{karar.daire}</Text>
        </View>
        {karar.emsal && (
          <View style={styles.emsalBadge}>
            <Text style={styles.emsalText}>Emsal</Text>
          </View>
        )}
      </View>

      <Text style={styles.baslik} numberOfLines={2}>
        {karar.konuBasligi}
      </Text>

      <Text style={styles.ozet} numberOfLines={3}>
        {karar.ozet}
      </Text>

      <View style={styles.footer}>
        <View style={styles.bilgiContainer}>
          <View style={styles.bilgiItem}>
            <Ionicons name="document-text-outline" size={12} color="#888" />
            <Text style={styles.bilgiText}>E: {karar.esasNo}</Text>
          </View>
          <View style={styles.bilgiItem}>
            <Ionicons name="checkmark-circle-outline" size={12} color="#888" />
            <Text style={styles.bilgiText}>K: {karar.kararNo}</Text>
          </View>
          <View style={styles.bilgiItem}>
            <Ionicons name="calendar-outline" size={12} color="#888" />
            <Text style={styles.bilgiText}>{karar.kararTarihi}</Text>
          </View>
        </View>

        {onFavoriToggle && (
          <TouchableOpacity onPress={onFavoriToggle} style={styles.favoriButton}>
            <Ionicons
              name={isFavori ? 'heart' : 'heart-outline'}
              size={22}
              color={isFavori ? '#E74C3C' : '#888'}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.anahtarKelimeler}>
        {karar.anahtar_kelimeler.slice(0, 3).map((kelime, index) => (
          <View key={index} style={styles.kelimeBadge}>
            <Text style={styles.kelimeText}>{kelime}</Text>
          </View>
        ))}
        {karar.anahtar_kelimeler.length > 3 && (
          <Text style={styles.dahaFazla}>+{karar.anahtar_kelimeler.length - 3}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  daireContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  daire: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  emsalBadge: {
    backgroundColor: '#27AE60',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  emsalText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  baslik: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 8,
    lineHeight: 24,
  },
  ozet: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  bilgiContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  bilgiItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bilgiText: {
    fontSize: 11,
    color: '#888',
  },
  favoriButton: {
    padding: 4,
  },
  anahtarKelimeler: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    alignItems: 'center',
  },
  kelimeBadge: {
    backgroundColor: '#E8F4FD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  kelimeText: {
    fontSize: 11,
    color: '#2980B9',
    fontWeight: '500',
  },
  dahaFazla: {
    fontSize: 11,
    color: '#888',
    fontStyle: 'italic',
  },
});
