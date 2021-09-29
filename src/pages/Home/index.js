import React, { useState, useEffect } from "react";
import { ScrollView, FlatList } from "react-native";
import {
  Container,
  SearchContainer,
  Input,
  SearchButton,
  Title,
  Banner,
  BannerButton,
  SliderMovie,
} from "./styles";

import { Feather } from "@expo/vector-icons";

import Header from "../../components/Header";
import SliderItem from "../../components/SliderItem";
import api, { key as API_KEY } from "../../services/api";

function Home() {
  const [nowMovies, setNowMovies] = useState();

  useEffect(() => {
    let isActive = true;
    async function getMovies() {
      // const response = await api.get("/movie/now_playing", {
      //   params: {
      //     api_key: API_KEY,
      //     language: "pt-BR",
      //     page: 1,
      //   },
      // });

      const [nowData, popularData, topRatedData] = await Promise.all([
        api.get("/movie/now_playing", {
          params: {
            api_key: API_KEY,
            language: "pt-BR",
            page: 1,
          },
        }),
        api.get("/movie/popular", {
          params: {
            api_key: API_KEY,
            language: "pt-BR",
            page: 1,
          },
        }),
        api.get("/movie/top_rated", {
          params: {
            api_key: API_KEY,
            language: "pt-BR",
            page: 1,
          },
        }),
      ]);
      console.log(popularData.data.results);
    }
    getMovies();
  }, []);

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

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3, 4]}
          renderItem={({ item }) => <SliderItem />}
        />

        <Title>Populares</Title>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3, 4]}
          renderItem={({ item }) => <SliderItem />}
        />

        <Title>Mais votados</Title>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3, 4]}
          renderItem={({ item }) => <SliderItem />}
        />
      </ScrollView>
    </Container>
  );
}

export default Home;
