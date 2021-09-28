import React from "react";
import { View } from "react-native";
import { Container, BannerItem, Title, RateContainer, Rate } from "./styles";
import { Ionicons } from "@expo/vector-icons";

function SliderItem() {
  return (
    <Container activeOpacity={0.8}>
      <BannerItem
        source={{
          uri: "https://i.ytimg.com/vi/1IxLldidcmA/maxresdefault.jpg",
        }}
      />
      <Title numberOfLines={1}>Vingadores</Title>
      <RateContainer>
        <Ionicons name="md-star" size={12} color="#e7a74e" />
        <Rate>9/10</Rate>
      </RateContainer>
    </Container>
  );
}

export default SliderItem;
