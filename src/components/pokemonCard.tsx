import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatPokemonNumber } from '../services/pokemonService';
import { theme } from '../theme/theme';

type Pokemon = {
  id: number;
  name: string;
  sprites: { front_default: string };
};

type Props = {
  pokemon: Pokemon;
};

export default function PokemonCard({ pokemon }: Props) {
  const router = useRouter();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    async function loadLikeStatus() {
      try {
        const stored = await AsyncStorage.getItem(`liked-${pokemon.id}`);
        setLiked(stored === 'true');
      } catch (err) {
        console.error('Erro ao carregar like:', err);
      }
    }

    loadLikeStatus();
  }, [pokemon.id]);

  async function toggleLike() {
    try {
      const newStatus = !liked;
      setLiked(newStatus);
      await AsyncStorage.setItem(`liked-${pokemon.id}`, newStatus.toString());
      Alert.alert(newStatus ? 'Curtido!' : 'Descurtido!');
    } catch (err) {
      console.error('Erro ao salvar like:', err);
    }
  }

  function goToDetails() {
    router.push(`/${pokemon.id}`);
  }

  return (
    <TouchableOpacity style={styles.card} onPress={goToDetails} activeOpacity={0.7}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={{ uri: pokemon.sprites.front_default }} style={styles.icon} />
        <View>
          <Text style={styles.number}>{formatPokemonNumber(pokemon.id)}</Text>
          <Text style={styles.name}>{pokemon.name}</Text>
        </View>
      </View>
      <Text onPress={toggleLike} style={[styles.likeButton]}>
        {liked ? '❤️' : '🤍'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.colors.background,
    backgroundColor: theme.colors.card,
  },
  icon: {
    width: 60,
    height: 60,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    textTransform: 'capitalize',
    flex: 1,
    fontFamily: theme.fonts.regular,
  },
  number: {
    fontSize: 12,
    color: theme.colors.textLight,
    fontFamily: theme.fonts.regular,
  },
  likeButton: {
    fontSize: 24,
    paddingHorizontal: 8,
  },
});
