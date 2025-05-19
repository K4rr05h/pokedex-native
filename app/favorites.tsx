import { usePokemonContext } from '../src/contexts/pokemonContext';
import PokemonList from '../src/components/pokemonList';

export default function Favorites() {
  const { likedPokemons } = usePokemonContext();

  return <PokemonList pokemons={likedPokemons} />;
}