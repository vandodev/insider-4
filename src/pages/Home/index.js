import React from "react";
import { View, Text } from "react-native";
import { Conteiner } from "./styles";

import Header from "../../components/Header";

function Home() {
  return (
    <Conteiner>
      <Header />
      <Text>Home</Text>
    </Conteiner>
  );
}

export default Home;
