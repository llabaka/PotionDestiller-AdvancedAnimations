import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native'
import Rating from './components/Rating';
import Genre from './components/Genre';
import * as CONSTANTS from './constants/constants'
import { moviesData } from './api';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme, View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// Interface Movie
//Especifico que tipo de elementos tendra
interface Movie {
  id: any;
  title: string;
  releaseDate: string;
  overview: string;
  voteAverage: number;
  posterPath: string;
  backdropPath: string;
  genres: string[]; // Cambia esto si tu tipo de género es diferente
}

//Styled components
const Container = styled.View`
    flex: 1;
`

const PosterContainer = styled.View`
    width: ${CONSTANTS.ITEM_SIZE}px;
`

const Poster = styled.View`
    margin-horizontal: ${CONSTANTS.SPACING}px;
    padding: ${CONSTANTS.SPACING * 2}px;
    align-items: center;
    background-color: #FFFFFF;
    border-radius: 10px;
`

const PosterImage = styled.Image`
    width: 100%;
    height: ${CONSTANTS.ITEM_SIZE * 1.2}px;
    resize-mode: cover;
    border-radius: 10px;
    margin: 0 0 10px 0;
`

const PosterTitle = styled.Text`
    font-size: 18px;
`

const PosterDescription = styled.Text`
    font-size: 12px;
`

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const data = moviesData();
    setMovies(data);
    setLoaded(true)
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Container>
      <StatusBar />
      <FlatList
        snapToInterval={CONSTANTS.ITEM_SIZE}
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={item => item.id}
        horizontal
        contentContainerStyle={{
          alignItems:'center'
        }}
        renderItem={({ item }) =>{
          return (
            <PosterContainer>
              <Poster>
                <PosterImage source={{uri: item.posterPath}}/>
                <PosterTitle numberOfLines={1}>{item.title}</PosterTitle>
                <Rating rating={item.voteAverage} />
                <Genre genres={item.genres} />
                <PosterDescription numberOfLines={5}>{item.overview}</PosterDescription>
              </Poster>
            </PosterContainer>
          )
        }}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
