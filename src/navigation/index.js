import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InterestFormScreen from '../screens/InterestFormScreen';
import HistoryScreen from '../screens/HistoryScreen';
import { AuthContext } from '../services/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName="Início">
      <Drawer.Screen
        name="Início"
        component={DashboardScreen}
        options={{ drawerIcon: () => <MaterialIcons name="home" size={20} /> }}
      />
      <Drawer.Screen
        name="Formulário"
        component={InterestFormScreen}
        options={{ drawerIcon: () => <MaterialIcons name="edit" size={20} /> }}
      />
      <Drawer.Screen
        name="Meus Pedidos"
        component={HistoryScreen}
        options={{ drawerIcon: () => <MaterialIcons name="history" size={20} /> }}
      />
      <Drawer.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{ drawerIcon: () => <MaterialIcons name="person" size={20} /> }}
      />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Home" component={DrawerRoutes} />
          <Stack.Screen name="Detalhes" component={DetailsScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
