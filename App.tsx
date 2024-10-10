import React, { useState, useEffect, useRef } from 'react';
import { Animated, FlatList, View, Image } from 'react-native';
import { StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native'
import Rating from './components/Rating';
import Genre from './components/Genre';
import * as CONSTANTS from './constants/constants'
import { getMovies} from './api';
import {
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

//Styled components
const Container = styled.View`
    flex: 1;
    padding-top: 50px;
    background-color: #000;
`

const PosterContainer = styled.View`
    width: ${CONSTANTS.ITEM_SIZE}px;
    margin-top: ${CONSTANTS.TOP}px;
`

const Poster = styled.View`
    margin-horizontal: ${CONSTANTS.SPACING}px;
    padding: ${CONSTANTS.SPACING * 2}px;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.1);
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
    color: #FFF;
`

const PosterDescription = styled.Text`
    font-size: 12px;
    color: #FFF;
`

const DummyContainer = styled.View`
    width: ${CONSTANTS.SPACER_ITEM_SIZE}px;
`

const ContentContainer = styled.View`
    position: absolute;
    width: ${CONSTANTS.WIDTH}px;
    height: ${CONSTANTS.BACKDROP_HEIGHT}px;
`

const BackdropContainer = styled.View`
    width: ${CONSTANTS.WIDTH}px;
    position: absolute;
    height: ${CONSTANTS.BACKDROP_HEIGHT}px;
    overflow: hidden;
`

const BackdropImage = styled.Image`
    position: absolute;
    width: ${CONSTANTS.WIDTH}px;
    height: ${CONSTANTS.BACKDROP_HEIGHT}px;
`

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [movies, setMovies] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMovies()
      
      setMovies([{key: 'left-spacer'}, ...data, {key: `right-spacer`}])
      setLoaded(true)
    }
    fetchData()
  }, []);


  return (
    <Container>
      <StatusBar />
      <Animated.FlatList

        snapToInterval={CONSTANTS.ITEM_SIZE}
        decelerationRate={0}
        onScroll={Animated.event(
          [{ nativeEvent: {contentOffset: {x: scrollX}}}],
          { useNativeDriver: true}
        )}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={item => item.id}
        horizontal
        contentContainerStyle={{
          alignItems:'center'
        }}

        renderItem={({ item, index }) =>{
          if(!item.originalTitle){
            return <DummyContainer />
          }
          const inputRange = [
            (index - 2) * CONSTANTS.ITEM_SIZE,
            (index - 1) * CONSTANTS.ITEM_SIZE,
            index * CONSTANTS.ITEM_SIZE
          ]
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0]
          })

          return (
            <PosterContainer>
              <Poster as= {Animated.View} style={{transform: [{translateY}]}}>
                <PosterImage source={{uri: item.posterPath}}/>
                <PosterTitle numberOfLines={1}>{item.originalTitle}</PosterTitle>
                <Rating rating={item.voteAverage} />
                <Genre genres={item.genres} />
                <PosterDescription numberOfLines={5}>{item.description}</PosterDescription>
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
