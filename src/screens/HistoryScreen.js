import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

export default function HistoryScreen() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarDados = async () => {
    try {
      const q = query(collection(db, 'interesses'), orderBy('data', 'desc'));
      const snapshot = await getDocs(q);
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDados(lista);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#d3a971" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Pedidos</Text>
      <FlatList
        data={dados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.msg}>{item.mensagem || 'Sem mensagem.'}</Text>
            <Text style={styles.info}>WhatsApp: {item.whatsapp ? 'Sim' : 'Não'}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495E',
  },
  email: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  msg: {
    fontSize: 14,
    color: '#2C3E50',
    marginBottom: 4,
  },
  info: {
    fontSize: 13,
    color: '#999',
  },
});
