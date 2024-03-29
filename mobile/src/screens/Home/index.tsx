import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Image , FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import logoImg from '../../assets/logo-nlw-esports.png'
import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';

import { styles } from './styles';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  const navigation = useNavigation();

  function handleOpenGame({id, title, bannerUrl}: GameCardProps){
    navigation.navigate('game', {id, title, bannerUrl});
  }

  useEffect(() =>{
    fetch('https://nlw-esports-anderson.koyeb.app/games')
    .then(response => response.json())
    .then(data =>setGames(data))
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
      <Image 
      source={logoImg}
      style={styles.logo}
      />
      <Heading  
        title='Encontre seu duo!'
        subtitle='Selecione o game que deseja jogar...'
      />
      <FlatList 
        data={games.sort((a, b) => (a._count.ads > b._count.ads ? -1 : 1))}
        keyExtractor={item => item.id}
        renderItem={({item}) =>(
          <GameCard 
            data = {item}
            onPress={() => handleOpenGame(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
      />

    </SafeAreaView>
    </Background>
  );
}   