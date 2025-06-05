import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../services/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user?.email}</Text>
      <View style={{ marginTop: 20 }} />
      <Button title="Sair" onPress={logout} color="#E74C3C" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  value: {
    fontSize: 18,
    color: '#34495E',
    fontWeight: '500',
    marginBottom: 10,
  },
});
