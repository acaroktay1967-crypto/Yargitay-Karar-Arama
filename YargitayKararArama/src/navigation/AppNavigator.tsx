import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import { AnasayfaScreen } from '../screens/AnasayfaScreen';
import { AramaScreen } from '../screens/AramaScreen';
import { FavorilerScreen } from '../screens/FavorilerScreen';
import { AyarlarScreen } from '../screens/AyarlarScreen';
import { KararDetayScreen } from '../screens/KararDetayScreen';
import { RootStackParamList, TabParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Anasayfa':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Arama':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'Favoriler':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'Ayarlar':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2980B9',
        tabBarInactiveTintColor: '#888',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          height: Platform.OS === 'ios' ? 88 : 65,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen 
        name="Anasayfa" 
        component={AnasayfaScreen}
        options={{ tabBarLabel: 'Ana Sayfa' }}
      />
      <Tab.Screen 
        name="Arama" 
        component={AramaScreen}
        options={{ tabBarLabel: 'Ara' }}
      />
      <Tab.Screen 
        name="Favoriler" 
        component={FavorilerScreen}
        options={{ tabBarLabel: 'Favoriler' }}
      />
      <Tab.Screen 
        name="Ayarlar" 
        component={AyarlarScreen}
        options={{ tabBarLabel: 'Ayarlar' }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Ana" component={TabNavigator} />
        <Stack.Screen 
          name="KararDetay" 
          component={KararDetayScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
