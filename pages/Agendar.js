import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  LayoutAnimation,
  UIManager,
  Platform,
  StatusBar,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "./Header";
import FooterNavigation from "../pages/Footer";

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  monthNamesShort: [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ],
  dayNames: [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
    'Quinta-feira', 'Sexta-feira', 'Sábado'
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function AgendamentoConsulta() {
  const [nomePet, setNomePet] = useState("");
  const [tipoRaca, setTipoRaca] = useState("");
  const [problema, setProblema] = useState("");
  const [selected, setSelected] = useState("");

  const [showTipoOptions, setShowTipoOptions] = useState(false);
  const [showProblemaOptions, setShowProblemaOptions] = useState(false);

  const tipoOptions = [
    "Cachorro",
    "Gato",
    "Coelho",
    "Papagaio / Periquito",
    "Peixe",
    "Outro",
  ];

  const problemaOptions = ["Febre", "Vômito", "Perda de Apetite", "Outro"];

  const handleAgendar = () => {
    if (!nomePet || !tipoRaca || !problema || !selected) {
      Alert.alert("Preencha todos os campos!");
      return;
    }

    Alert.alert("Consulta agendada com sucesso!");
    setNomePet("");
    setTipoRaca("");
    setProblema("");
    setSelected("");
  };

  const toggleTipoOptions = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowTipoOptions(!showTipoOptions);
  };

  const toggleProblemaOptions = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowProblemaOptions(!showProblemaOptions);
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.titulo}>Agendar Consulta</Text>
        <View style={styles.form}>
         
          <Text style={styles.label}>Nome do Pet</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Bob"
            value={nomePet}
            onChangeText={setNomePet}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Raça / Tipo do Pet</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite ou selecione"
            value={tipoRaca}
            onChangeText={setTipoRaca}
            placeholderTextColor="#999"
          />
          <TouchableOpacity onPress={toggleTipoOptions} style={styles.selectButton}>
            <Text style={styles.selectButtonText}>Selecionar opção</Text>
            <Ionicons
              name={showTipoOptions ? "chevron-up" : "chevron-down"}
              size={20}
              color="#555"
            />
          </TouchableOpacity>
          {showTipoOptions && (
            <View style={styles.optionsBox}>
              {tipoOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.option}
                  onPress={() => {
                    setTipoRaca(option);
                    setShowTipoOptions(false);
                  }}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text style={styles.label}>Problema / Sintomas</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Descreva ou selecione"
            multiline
            value={problema}
            onChangeText={setProblema}
            placeholderTextColor="#999"
          />
          <TouchableOpacity onPress={toggleProblemaOptions} style={styles.selectButton}>
            <Text style={styles.selectButtonText}>Selecionar opção</Text>
            <Ionicons
              name={showProblemaOptions ? "chevron-up" : "chevron-down"}
              size={20}
              color="#555"
            />
          </TouchableOpacity>
          {showProblemaOptions && (
            <View style={styles.optionsBox}>
              {problemaOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.option}
                  onPress={() => {
                    setProblema(option);
                    setShowProblemaOptions(false);
                  }}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text style={styles.label}>Data</Text>
          <Calendar
            style={styles.calendario}
            onDayPress={(day) => setSelected(day.dateString)}
            markedDates={{
              [selected]: {
                selected: true,
                selectedColor: "#345c5a",
                disableTouchEvent: true,
                selectedDotColor: "orange",
              },
            }}
            theme={{
              calendarBackground: "#fff",
              textSectionTitleColor: "#333",
              dayTextColor: "#333",
              selectedDayTextColor: "#fff",
              todayTextColor: "#345c5a",
              textDisabledColor: "#ccc",
              arrowColor: "#345c5a",
              monthTextColor: "#345c5a",
              textMonthFontWeight: "bold",
              textDayFontSize: 14,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 14,
            }}
          />

          <TouchableOpacity style={styles.botao} onPress={handleAgendar}>
            <Text style={styles.textoBotao}>Agendar Consulta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scroll: {
    paddingBottom: 30,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    color: "#345c5a",
    alignSelf: "center",
  },
  form: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555",
    fontWeight: "500",
  },
  input: {
    color: "#333",
    backgroundColor: "#fafafa",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  selectButton: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectButtonText: {
    color: "#555",
    fontSize: 14,
    fontWeight: "500",
  },
  optionsBox: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  option: {
    paddingVertical: 10,
  },
  optionText: {
    color: "#555",
    fontSize: 14,
  },
  calendario: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  botao: {
    backgroundColor: "#345c5a",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
