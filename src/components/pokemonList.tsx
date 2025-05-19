import { FlatList, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import PokemonCard from './pokemonCard';
import { theme } from '../theme/theme';

type Pokemon = {
  id: number;
  name: string;
  sprites: { front_default: string };
};

type Props = {
  pokemons: Pokemon[];
  onEndReached?: () => void;
  loading?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
};

export default function PokemonList({
  pokemons = [],
  onEndReached,
  loading = false,
  onRefresh,
  refreshing = false,
}: Props) {
  const validPokemons = pokemons.filter((p) => p && p.id && p.name && p.sprites?.front_default);

  const uniquePokemons = Array.from(
    new Map(validPokemons.map((p) => [p.id, p])).values()
  );

  return (
    <FlatList
      data={uniquePokemons}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <PokemonCard pokemon={item} />}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.3}
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListFooterComponent={
        loading ? <ActivityIndicator size="large" style={styles.loader} /> : <View style={styles.footerSpace} />
      }
    />
  );
}

const styles = StyleSheet.create({
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: theme.colors.textLight,
  },
  loader: {
    marginVertical: 20,
  },
  footerSpace: {
    height: 40,
  },
});
