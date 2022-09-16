import React, { useEffect, useState } from 'react';
import { View, Image , FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import logoImg from '../../assets/logo-nlw-esports.png'
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';

import { styles } from './styles';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  useEffect(() =>{
    fetch('http://192.168.0.11:3333/games')
    .then(respose => respose.json())
    .then(data =>setGames(data))
  }, []);

  return (
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
        data={games}
        keyExtractor={item => item.id}
        renderItem={({item}) =>(
          <GameCard 
            data = {item}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
      />

    </SafeAreaView>
  );
}   