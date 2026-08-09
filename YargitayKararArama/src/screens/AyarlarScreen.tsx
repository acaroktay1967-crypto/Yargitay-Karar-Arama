import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export function AyarlarScreen() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [bildirimler, setBildirimler] = React.useState(true);

  const handleClearCache = () => {
    Alert.alert(
      'Önbelleği Temizle',
      'Tüm önbellek verileri silinecek. Devam etmek istiyor musunuz?',
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Temizle', style: 'destructive', onPress: () => {
          Alert.alert('Başarılı', 'Önbellek temizlendi.');
        }},
      ]
    );
  };

  const ayarGruplari = [
    {
      title: 'Görünüm',
      items: [
        {
          icon: 'moon-outline',
          title: 'Karanlık Mod',
          subtitle: 'Koyu tema kullan',
          type: 'switch',
          value: darkMode,
          onToggle: setDarkMode,
        },
        {
          icon: 'text-outline',
          title: 'Yazı Boyutu',
          subtitle: 'Orta',
          type: 'arrow',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Bildirimler',
      items: [
        {
          icon: 'notifications-outline',
          title: 'Bildirimler',
          subtitle: 'Yeni içtihat bildirimleri al',
          type: 'switch',
          value: bildirimler,
          onToggle: setBildirimler,
        },
      ],
    },
    {
      title: 'Depolama',
      items: [
        {
          icon: 'trash-outline',
          title: 'Önbelleği Temizle',
          subtitle: 'Geçici dosyaları sil',
          type: 'arrow',
          onPress: handleClearCache,
        },
        {
          icon: 'download-outline',
          title: 'Çevrimdışı Kararlar',
          subtitle: '12 karar indirildi',
          type: 'arrow',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Hakkında',
      items: [
        {
          icon: 'information-circle-outline',
          title: 'Uygulama Hakkında',
          subtitle: 'Sürüm 1.0.0',
          type: 'arrow',
          onPress: () => {},
        },
        {
          icon: 'document-text-outline',
          title: 'Kullanım Koşulları',
          type: 'arrow',
          onPress: () => {},
        },
        {
          icon: 'shield-checkmark-outline',
          title: 'Gizlilik Politikası',
          type: 'arrow',
          onPress: () => {},
        },
        {
          icon: 'mail-outline',
          title: 'İletişim',
          subtitle: 'destek@yargitaykarar.com',
          type: 'arrow',
          onPress: () => Linking.openURL('mailto:destek@yargitaykarar.com'),
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ayarlar</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {ayarGruplari.map((grup, grupIndex) => (
          <View key={grupIndex} style={styles.grup}>
            <Text style={styles.grupTitle}>{grup.title}</Text>
            <View style={styles.grupItems}>
              {grup.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.item,
                    itemIndex === grup.items.length - 1 && styles.itemLast,
                  ]}
                  onPress={item.type === 'arrow' ? item.onPress : undefined}
                  activeOpacity={item.type === 'switch' ? 1 : 0.7}
                >
                  <View style={styles.itemIcon}>
                    <Ionicons name={item.icon as any} size={22} color="#2980B9" />
                  </View>
                  <View style={styles.itemContent}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    {item.subtitle && (
                      <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                    )}
                  </View>
                  {item.type === 'switch' && 'value' in item && (
                    <Switch
                      value={item.value as boolean}
                      onValueChange={item.onToggle as (value: boolean) => void}
                      trackColor={{ false: '#ddd', true: '#2980B9' }}
                      thumbColor="#fff"
                    />
                  )}
                  {item.type === 'arrow' && (
                    <Ionicons name="chevron-forward" size={20} color="#ccc" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Yargıtay Karar Arama</Text>
          <Text style={styles.footerVersion}>Sürüm 1.0.0</Text>
          <Text style={styles.footerCopyright}>© 2024 Tüm hakları saklıdır</Text>
        </View>
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
  content: {
    flex: 1,
    padding: 16,
  },
  grup: {
    marginBottom: 24,
  },
  grupTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#888',
    textTransform: 'uppercase',
    marginBottom: 8,
    marginLeft: 4,
  },
  grupItems: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemLast: {
    borderBottomWidth: 0,
  },
  itemIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#E8F4FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingBottom: 100,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
  },
  footerVersion: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 4,
  },
  footerCopyright: {
    fontSize: 12,
    color: '#ccc',
    marginTop: 8,
  },
});
