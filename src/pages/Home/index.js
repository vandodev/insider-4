import React, { useState, useEffect } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
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
import { getListMovies, getRandomMovie } from "../../utils/movie";

function Home() {
  const [nowMovies, setNowMovies] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [topMovies, setTopMovies] = useState();
  const [bannerMovie, setBannerMovie] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    const ac = new AbortController();
    async function getMovies() {
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

      if (isActive) {
        const nowList = getListMovies(10, nowData.data.results);
        const popularList = getListMovies(5, popularData.data.results);
        const topRatedList = getListMovies(5, topRatedData.data.results);

        setBannerMovie(
          nowData.data.results[getRandomMovie(nowData.data.results)]
        );

        setNowMovies(nowList);
        setPopularMovies(popularList);
        setTopMovies(topRatedList);

        setLoading(false);
      }
    }

    getMovies();

    // abortar caso o componente nao esteja ativo (na tela)
    return () => {
      isActive = false;
      ac.abort();
    };
  }, []);

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#FFF" />
      </Container>
    );
  }
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
              uri: `https://image.tmdb.org/t/p/original/${bannerMovie?.poster_path}`,
            }}
          />
        </BannerButton>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={({ item }) => <SliderItem data={item} />}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Populares</Title>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={({ item }) => <SliderItem data={item} />}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Mais votados</Title>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={({ item }) => <SliderItem data={item} />}
          keyExtractor={(item) => String(item.id)}
        />
      </ScrollView>
    </Container>
  );
}

export default Home;
