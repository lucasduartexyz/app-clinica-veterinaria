import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../Db/supabaseconfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Login() {
  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [forgotEmail, setForgotEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert('Erro no login', error.message);
    } else {
      Alert.alert('Sucesso', 'Login realizado!');
      navigation.navigate('Main');
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      Alert.alert('Erro', 'Por favor, insira seu e-mail.');
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail);
    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      Alert.alert('Sucesso', 'Se o e-mail estiver cadastrado, enviaremos instruções.');
      setModalVisible(false);
      setForgotEmail('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>PetCare</Text>
      <Text style={styles.welcomeTitle}>Bem-vindo(a)!</Text>
      <Text style={styles.subtitle}>Faça login para acessar a clínica</Text>

      <View style={styles.inputContainer}>
        <Icon name="email-outline" size={20} color="#333" />
        <Text style={styles.inputLabel}>Insira seu email:</Text>
      </View>
      <TextInput
        style={[styles.input, { marginBottom: 20 }]}
        placeholder="Digite seu email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <View style={styles.inputContainer}>
        <Icon name="lock-outline" size={20} color="#333" />
        <Text style={styles.inputLabel}>Insira sua senha:</Text>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.showPasswordButton}
        >
          <Icon
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#333"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.linkContainer}>
        <Text style={styles.registerLink}>Não tem conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.linkText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Recuperar senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu email"
              keyboardType="email-address"
              value={forgotEmail}
              onChangeText={setForgotEmail}
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleForgotPassword}>
              <Text style={styles.loginButtonText}>Enviar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f4f1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#004d40',
    marginBottom: 10,
  },
  welcomeTitle: {
    fontSize: 24,
    color: '#00695c',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
  },
  inputWrapper: {
    width: '100%',
    position: 'relative',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingRight: 40,
  },
  showPasswordButton: {
    position: 'absolute',
    right: 10,
    top: '35%',
  },
  loginButton: {
    backgroundColor: '#26a69a',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkContainer: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  registerLink: {
    fontSize: 14,
    color: '#333',
  },
  linkText: {
    fontSize: 14,
    color: '#2bbbad',
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 10,
    fontSize: 14,
    color: '#00796b',
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#004d40',
  },
  cancelText: {
    color: '#00796b',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});