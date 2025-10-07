import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Modal,
  Pressable,
  StatusBar,
} from "react-native";
import Header from "../pages/Header";
import FooterNavigation from "../pages/Footer";

const pets = [
  { id: "1", nome: "Thor", especie: "Cachorro", medico: "Camila Torres" },
  { id: "2", nome: "Luna", especie: "Gato", medico: "Rafael Lima" },
];

const duvidas = [
  {
    id: "1",
    pergunta: "🐶 Meu pet comeu chocolate, o que fazer?",
    resposta: "Leve seu pet ao veterinário imediatamente. Chocolate é tóxico.",
  },
  {
    id: "2",
    pergunta: "🐱 Meu gato está vomitando, como agir?",
    resposta: "Mantenha o gato hidratado e procure um veterinário se persistir.",
  },
  {
    id: "3",
    pergunta: "🐾 Qual a frequência ideal de banho?",
    resposta: "Cães: 15-30 dias. Gatos: somente quando necessário ou indicado.",
  },
  {
    id: "4",
    pergunta: "🦴 Quais alimentos são proibidos para pets?",
    resposta: "Chocolate, cebola, uva, café, álcool e massas fermentadas.",
  },
  {
    id: "5",
    pergunta: "💧 Com que frequência devo dar banho no meu pet?",
    resposta: "Cães: a cada 15-30 dias. Gatos: somente quando realmente necessário.",
  },
  {
    id: "6",
    pergunta: "💉 Meu pet precisa mesmo de vacinas?",
    resposta: "Sim! As vacinas previnem doenças graves e devem ser atualizadas anualmente.",
  },
];

const profissionais = [
  {
    id: "1",
    nome: "👩‍⚕️ Dra. Camila Torres",
    especialidade: "Clínica Geral",
    descricao: "Especialista em cuidados gerais e consultas preventivas.",
  },
  {
    id: "2",
    nome: "👨‍⚕️ Dr. Rafael Lima",
    especialidade: "Cirurgião Veterinário",
    descricao: "Experiência em cirurgias ortopédicas e emergenciais.",
  },
  {
    id: "3",
    nome: "👩‍⚕️ Dra. Fernanda Souza",
    especialidade: "Dermatologista Veterinária",
    descricao: "Tratamento de alergias e doenças de pele.",
  },
  {
    id: "4",
    nome: "👩‍⚕️ Dr. Julio Lima",
    especialidade: "Cardiologista Veterinário",
    descricao: "Atua no diagnóstico e tratamento de doenças cardíacas em animais.",
  },
   {
    id: "5",
    nome: "👨‍⚕️ Dr. João Pedro",
    especialidade: "Odontologia Veterinária",
    descricao: "Responsável pela saúde bucal e tratamentos odontológicos de pets.",
  },
];

const medicoChefe = {
  nome: "👨‍⚕️ Dr. Carlos Almeida",
  especialidade: "Diretor Clínico",
  descricao: "Médico chefe com 20 anos de experiência em medicina veterinária.",
};

export default function Home() {
  const [modalDuvidasVisible, setModalDuvidasVisible] = useState(false);
  const [modalProfissionaisVisible, setModalProfissionaisVisible] = useState(false);

  const [duvidaSelecionada, setDuvidaSelecionada] = useState(null);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(null);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.welcome}>🐾 Bem-vindo(a) de volta!</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Minhas consultas</Text>
            {pets.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.petCard}
                onPress={() => console.log("Clicou em:", item.nome)}
              >
                <Text style={styles.petName}>Nome: {item.nome}</Text>
                <Text style={styles.petInfo}>Espécie: {item.especie}</Text>
                <Text style={styles.petInfo}>Médico: {item.medico}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dúvidas frequentes</Text>
            <TouchableOpacity
              style={styles.emergencyButton}
              onPress={() => setModalDuvidasVisible(true)}
            >
              <Text style={styles.emergencyText}>❓ Ver dúvidas</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nossos Profissionais</Text>
            <View style={styles.professionalCard}>
              <Text style={styles.professionalName}>{medicoChefe.nome}</Text>
              <Text style={styles.professionalInfo}>
                {medicoChefe.especialidade}
              </Text>
              <Text style={styles.professionalDescricao}>
                {medicoChefe.descricao}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.emergencyButton}
              onPress={() => setModalProfissionaisVisible(true)}
            >
              <Text style={styles.emergencyText}>👥 Ver todos os profissionais</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDuvidasVisible}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>❓ Dúvidas Frequentes</Text>
            <ScrollView>
              {duvidas.map((item) => (
                <View key={item.id} style={styles.duvidaItem}>
                  <TouchableOpacity
                    onPress={() =>
                      setDuvidaSelecionada(
                        duvidaSelecionada === item.id ? null : item.id
                      )
                    }
                  >
                    <Text style={styles.duvidaPergunta}>{item.pergunta}</Text>
                  </TouchableOpacity>
                  {duvidaSelecionada === item.id && (
                    <Text style={styles.duvidaResposta}>{item.resposta}</Text>
                  )}
                </View>
              ))}
            </ScrollView>
            <Pressable
              style={styles.fecharButton}
              onPress={() => setModalDuvidasVisible(false)}
            >
              <Text style={styles.fecharText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalProfissionaisVisible}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>👥 Nossos Profissionais</Text>
            <ScrollView>
              {profissionais.map((item) => (
                <View key={item.id} style={styles.duvidaItem}>
                  <TouchableOpacity
                    onPress={() =>
                      setProfissionalSelecionado(
                        profissionalSelecionado === item.id ? null : item.id
                      )
                    }
                  >
                    <Text style={styles.duvidaPergunta}>{item.nome}</Text>
                    <Text style={styles.professionalInfo}>
                      {item.especialidade}
                    </Text>
                  </TouchableOpacity>
                  {profissionalSelecionado === item.id && (
                    <Text style={styles.duvidaResposta}>{item.descricao}</Text>
                  )}
                </View>
              ))}
            </ScrollView>
            <Pressable
              style={styles.fecharButton}
              onPress={() => setModalProfissionaisVisible(false)}
            >
              <Text style={styles.fecharText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87a9a8",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  welcome: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#fff",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  petCard: {
    backgroundColor: "#f4f4f4",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  petName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  petInfo: {
    fontSize: 14,
    color: "#333",
  },
  professionalCard: {
    backgroundColor: "#f4f4f4",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  professionalName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  professionalInfo: {
    fontSize: 14,
    color: "#333",
  },
  professionalDescricao: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },
  emergencyButton: {
    backgroundColor: "#f3f3f3",
    padding: 12,
    marginVertical: 6,
    borderRadius: 6,
  },
  emergencyText: {
    color: "#333",
    textAlign: "center",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    height: "70%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  duvidaItem: {
    marginBottom: 12,
  },
  duvidaPergunta: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    color: "#004d40",
  },
  duvidaResposta: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
  },
  fecharButton: {
    backgroundColor: "#26a69a",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
  fecharText: {
    color: "#fff",
    fontWeight: "bold",
  },
});