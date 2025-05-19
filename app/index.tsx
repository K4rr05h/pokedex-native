import { View, ActivityIndicator, Text } from 'react-native';
import { usePokemonContext } from '../src/contexts/pokemonContext';
import PokemonList from '../src/components/pokemonList';
import SearchBar from '../src/components/searchBar';
import { useState, useEffect } from 'react';
import { getPokemonDetails } from '../src/services/pokemonService';

export default function HomePage() {
  const { pokemons, loadMorePokemons, loading } = usePokemonContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResult(null);
    } else {
      searchPokemonByName(searchTerm);
    }
  }, [searchTerm]);

  async function searchPokemonByName(name: string) {
    try {
      const result = await getPokemonDetails(name.toLowerCase());
      setSearchResult([result]);
    } catch {
      setSearchResult([]);
    }
  }

  const listToShow = searchResult ?? pokemons;

  return (
    <View style={{ flex: 1 }}>
      <SearchBar onSearch={setSearchTerm} />
      {loading && pokemons.length === 0 ? (
        <ActivityIndicator 
          size="large"
          style={{ marginTop: 50 }}
          testID="ActivityIndicator"
        />
      ) : searchResult?.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 30 }}>Nenhum Pokémon encontrado.</Text>
      ) : (
        <PokemonList pokemons={listToShow} onEndReached={loadMorePokemons} loading={loading} />
      )}
    </View>
  );
}
