import React from 'react';
import { render } from '@testing-library/react-native';
import Favorites from '../../app/favorites';
import { usePokemonContext } from '../contexts/pokemonContext';

jest.mock('../contexts/pokemonContext');
jest.mock('../components/pokemonList', () => {
  return ({ pokemons }: { pokemons: any[] }) => {
    const { Text } = require('react-native');
    return <Text testID="mock-pokemonlist">{`Total: ${pokemons.length}`}</Text>;
  };
});

describe('Favorites screen', () => {
  it('deve renderizar a lista de pokémons favoritos corretamente', () => {
    (usePokemonContext as jest.Mock).mockReturnValue({
      likedPokemons: [{ id: 1, name: 'bulbasaur' }, { id: 25, name: 'pikachu' }]
    });

    const { getByTestId } = render(<Favorites />);
    expect(getByTestId('mock-pokemonlist').props.children).toContain('2');
  });

  it('deve renderizar lista vazia se não houver favoritos', () => {
    (usePokemonContext as jest.Mock).mockReturnValue({
      likedPokemons: []
    });

    const { getByTestId } = render(<Favorites />);
    expect(getByTestId('mock-pokemonlist').props.children).toContain('0');
  });
});
