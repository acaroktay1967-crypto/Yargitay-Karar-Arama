import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SearchFilters } from '../types';
import { daireler } from '../data/ornekKararlar';

interface Props {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: SearchFilters) => void;
  currentFilters: SearchFilters;
}

export function FiltrePaneli({ visible, onClose, onApply, currentFilters }: Props) {
  const [filters, setFilters] = useState<SearchFilters>(currentFilters);
  const [daireModalVisible, setDaireModalVisible] = useState(false);

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({});
  };

  const yillar = Array.from({ length: 30 }, (_, i) => 2024 - i);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Filtreler</Text>
          <TouchableOpacity onPress={handleReset}>
            <Text style={styles.resetText}>Sıfırla</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Daire</Text>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => setDaireModalVisible(true)}
            >
              <Text style={styles.selectText}>
                {filters.daire || 'Tüm Daireler'}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Yıl Aralığı</Text>
            <View style={styles.yilContainer}>
              <View style={styles.yilPicker}>
                <Text style={styles.yilLabel}>Başlangıç</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.yilOptions}>
                    <TouchableOpacity
                      style={[
                        styles.yilOption,
                        !filters.yilBaslangic && styles.yilOptionSelected,
                      ]}
                      onPress={() => setFilters({ ...filters, yilBaslangic: undefined })}
                    >
                      <Text
                        style={[
                          styles.yilOptionText,
                          !filters.yilBaslangic && styles.yilOptionTextSelected,
                        ]}
                      >
                        Hepsi
                      </Text>
                    </TouchableOpacity>
                    {yillar.slice(0, 10).map(yil => (
                      <TouchableOpacity
                        key={yil}
                        style={[
                          styles.yilOption,
                          filters.yilBaslangic === yil && styles.yilOptionSelected,
                        ]}
                        onPress={() => setFilters({ ...filters, yilBaslangic: yil })}
                      >
                        <Text
                          style={[
                            styles.yilOptionText,
                            filters.yilBaslangic === yil && styles.yilOptionTextSelected,
                          ]}
                        >
                          {yil}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>

              <View style={styles.yilPicker}>
                <Text style={styles.yilLabel}>Bitiş</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.yilOptions}>
                    <TouchableOpacity
                      style={[
                        styles.yilOption,
                        !filters.yilBitis && styles.yilOptionSelected,
                      ]}
                      onPress={() => setFilters({ ...filters, yilBitis: undefined })}
                    >
                      <Text
                        style={[
                          styles.yilOptionText,
                          !filters.yilBitis && styles.yilOptionTextSelected,
                        ]}
                      >
                        Hepsi
                      </Text>
                    </TouchableOpacity>
                    {yillar.slice(0, 10).map(yil => (
                      <TouchableOpacity
                        key={yil}
                        style={[
                          styles.yilOption,
                          filters.yilBitis === yil && styles.yilOptionSelected,
                        ]}
                        onPress={() => setFilters({ ...filters, yilBitis: yil })}
                      >
                        <Text
                          style={[
                            styles.yilOptionText,
                            filters.yilBitis === yil && styles.yilOptionTextSelected,
                          ]}
                        >
                          {yil}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.switchRow}>
              <View>
                <Text style={styles.sectionTitle}>Sadece Emsal Kararlar</Text>
                <Text style={styles.switchDescription}>
                  Yalnızca emsal niteliğindeki kararları göster
                </Text>
              </View>
              <Switch
                value={filters.sadece_emsal || false}
                onValueChange={(value) =>
                  setFilters({ ...filters, sadece_emsal: value })
                }
                trackColor={{ false: '#ddd', true: '#27AE60' }}
                thumbColor="#fff"
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Filtreleri Uygula</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={daireModalVisible}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setDaireModalVisible(false)}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setDaireModalVisible(false)}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
              <Text style={styles.title}>Daire Seç</Text>
              <View style={{ width: 50 }} />
            </View>
            <ScrollView style={styles.content}>
              <TouchableOpacity
                style={[
                  styles.daireOption,
                  !filters.daire && styles.daireOptionSelected,
                ]}
                onPress={() => {
                  setFilters({ ...filters, daire: undefined });
                  setDaireModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.daireOptionText,
                    !filters.daire && styles.daireOptionTextSelected,
                  ]}
                >
                  Tüm Daireler
                </Text>
                {!filters.daire && (
                  <Ionicons name="checkmark" size={22} color="#2980B9" />
                )}
              </TouchableOpacity>
              {daireler.map((daire) => (
                <TouchableOpacity
                  key={daire}
                  style={[
                    styles.daireOption,
                    filters.daire === daire && styles.daireOptionSelected,
                  ]}
                  onPress={() => {
                    setFilters({ ...filters, daire });
                    setDaireModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.daireOptionText,
                      filters.daire === daire && styles.daireOptionTextSelected,
                    ]}
                  >
                    {daire}
                  </Text>
                  {filters.daire === daire && (
                    <Ionicons name="checkmark" size={22} color="#2980B9" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Modal>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  resetText: {
    fontSize: 15,
    color: '#2980B9',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 14,
    borderRadius: 10,
  },
  selectText: {
    fontSize: 15,
    color: '#333',
  },
  yilContainer: {
    gap: 16,
  },
  yilPicker: {
    gap: 8,
  },
  yilLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  yilOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  yilOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  yilOptionSelected: {
    backgroundColor: '#2980B9',
  },
  yilOptionText: {
    fontSize: 14,
    color: '#666',
  },
  yilOptionTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchDescription: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  applyButton: {
    backgroundColor: '#2980B9',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  daireOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 8,
  },
  daireOptionSelected: {
    backgroundColor: '#E8F4FD',
  },
  daireOptionText: {
    fontSize: 15,
    color: '#333',
  },
  daireOptionTextSelected: {
    color: '#2980B9',
    fontWeight: '600',
  },
});
