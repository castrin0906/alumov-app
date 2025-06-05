import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Switch } from 'react-native';
import { db } from '../services/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function InterestFormScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [whatsapp, setWhatsapp] = useState(true);

  const handleEnviar = async () => {
    if (!nome || !email) {
      Alert.alert('Erro', 'Preencha nome e e-mail.');
      return;
    }

    try {
      await addDoc(collection(db, 'interesses'), {
        nome,
        email,
        mensagem,
        whatsapp,
        data: Timestamp.now(),
      });
      Alert.alert('Enviado', 'Interesse registrado com sucesso.');
      setNome('');
      setEmail('');
      setMensagem('');
      setWhatsapp(true);
    } catch (error) {
      Alert.alert('Erro ao enviar', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulário de Interesse</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Mensagem</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={mensagem}
        onChangeText={setMensagem}
        multiline
      />

      <View style={styles.switchContainer}>
        <Text>Contato por WhatsApp</Text>
        <Switch value={whatsapp} onValueChange={setWhatsapp} />
      </View>

      <Button title="Enviar" onPress={handleEnviar} color="#2C3E50" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: '#34495E',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    backgroundColor: '#f9f9f9',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
});
