import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function FooterNavigation({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.footer,{ paddingBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        let icon;

        if (route.name === "Home") {
          icon = require("../assets/home.png");
        } else if (route.name === "Agendar") {
          icon = require("../assets/calendario.png");
        } else if (route.name === "Clinicas") {
          icon = require("../assets/clinica.png");
        }

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity key={route.key} onPress={onPress}>
            <Image
              source={icon}
              style={[
                styles.icon,
                { tintColor: isFocused ? "#fff" : "#dcdcdc" },
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#5b7f7e",
    paddingVertical: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
