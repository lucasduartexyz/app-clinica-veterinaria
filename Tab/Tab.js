import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from '../pages/Home';
import Agendar from "../pages/Agendar";
import Clinicas from "../pages/Clinicas";
import FooterNavigation from '../pages/Footer'; 

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <FooterNavigation {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Agendar" component={Agendar} />
      <Tab.Screen name="Clinicas" component={Clinicas} />
    </Tab.Navigator>
  );
}
