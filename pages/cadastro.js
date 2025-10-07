import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../Db/supabaseconfig';

export default function Cadastro() {
  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = async () => {
    console.log('Tentando cadastrar...');
    const { data, error } = await supabase.auth.signUp({ email, password });
    console.log('Resposta:', data, error);

    if (error) {
      Alert.alert('Erro no cadastro', error.message);
    } else {
      Alert.alert('Sucesso', 'Cadastro realizado! Verifique seu email.');
      setTimeout(() => {
        navigation.navigate('Login');
      }, 500);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>🐾 PetCare</Text>
      <Text style={styles.subtitle}>Crie sua conta</Text>

      <View style={styles.labelContainer}>
        <MaterialCommunityIcons name="email-outline" size={20} color="#333"/>
        <Text style={styles.labelText}>Email</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        placeholderTextColor="#ccc"
        underlineColorAndroid="transparent"
        autoComplete="off"
        autoCorrect={false}
        textContentType="none"
        importantForAutofill="no"
      />

      <View style={styles.labelContainer}>
        <MaterialCommunityIcons name="lock-outline" size={20} color="#333" />
        <Text style={styles.labelText}>Senha</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Digite sua senha"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          placeholderTextColor="#ccc"
          underlineColorAndroid="transparent"
          autoComplete="off"
          autoCorrect={false}
          textContentType="none"
          importantForAutofill="no"
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.iconPassword}
        >
          <MaterialCommunityIcons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="#555"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#87a8a4' },
  appTitle: { fontSize: 32, fontWeight: 'bold', marginBottom: 10, color: '#fff' },
  subtitle: { fontSize: 16, marginBottom: 20, color: '#fff' },
  labelContainer: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginTop: 10 },
  labelText: { marginLeft: 5, fontSize: 16, color: '#fff' },
  input: { 
    width: '100%', 
    padding: 12, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    backgroundColor: '#fff', 
    marginTop: 5 
  },
  inputContainer: {
    width: '100%',
    marginTop: 5,
    position: 'relative',
  },
  inputPassword: {
    width: '100%',
    padding: 12,
    paddingRight: 40,  
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  iconPassword: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  button: { backgroundColor: '#26a69a', padding: 15, borderRadius: 8, width: '100%', alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  link: { marginTop: 15, color: '#fff', textDecorationLine: 'underline' },
});
