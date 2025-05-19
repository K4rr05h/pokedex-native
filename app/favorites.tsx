import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { usePokemonContext } from '../src/contexts/pokemonContext';
import PokemonList from '../src/components/pokemonList';

export default function Favorites() {
  const { likedPokemons, loadingFavorites, reloadFavorites } = usePokemonContext();

  useFocusEffect(
    useCallback(() => {
      reloadFavorites();
    }, [])
  );

  return (
    <PokemonList
      pokemons={likedPokemons}
      refreshing={loadingFavorites}
      onRefresh={reloadFavorites}
    />
  );
}
