import React from "react";
import { ScrollView } from "react-native";
import {
  Container,
  SearchContainer,
  Input,
  SearchButton,
  Title,
  Banner,
  BannerButton,
} from "./styles";

import { Feather } from "@expo/vector-icons";

import Header from "../../components/Header";

function Home() {
  return (
    <Container>
      <Header title="React Prime" />
      <SearchContainer>
        <Input placeholder="Ex Vingadores" placeholderTextColor="#DDD" />
        <SearchButton>
          <Feather name="search" size={30} color="#FFF" />
        </SearchButton>
      </SearchContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Em Cartaz</Title>

        <BannerButton
          activeOpacity={0.9}
          onPress={() => {
            alert("Cartaz");
          }}
        >
          <Banner
            resizeMethod="resize"
            source={{
              uri: "https://i.ytimg.com/vi/1IxLldidcmA/maxresdefault.jpg",
            }}
          />
        </BannerButton>
      </ScrollView>
    </Container>
  );
}

export default Home;
