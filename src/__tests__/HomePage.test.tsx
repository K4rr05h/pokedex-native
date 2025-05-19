import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomePage from '../../app/index';
import { usePokemonContext } from '../contexts/pokemonContext';
import * as pokemonService from '../services/pokemonService';

jest.mock('../contexts/pokemonContext', () => ({
  __esModule: true,
  usePokemonContext: jest.fn(),
}));

jest.mock('../services/pokemonService', () => ({
  __esModule: true,
  getPokemonDetails: jest.fn(),
}));

// mock SearchBar simulando clique no botão
jest.mock('../components/searchBar', () => ({
  __esModule: true,
  default: ({ onSearch }: { onSearch: (term: string) => void }) => {
    const { Text } = require('react-native');
    return <Text onPress={() => onSearch('pikachu')}>Search</Text>;
  },
}));

// mock PokemonList para contar quantos pokémons foram recebidos
jest.mock('../components/pokemonList', () => ({
  __esModule: true,
  default: ({ pokemons }: { pokemons: any[] }) => {
    const { Text } = require('react-native');
    return <Text testID="mock-pokemonlist">{`Total: ${pokemons.length}`}</Text>;
  },
}));

describe('HomePage', () => {
  it('deve exibir loader quando loading e lista vazia', () => {
    (usePokemonContext as jest.Mock).mockReturnValue({
      pokemons: [],
      loading: true,
      loadMorePokemons: jest.fn(),
    });

    const { getByTestId } = render(<HomePage />);
    expect(getByTestId('ActivityIndicator')).toBeTruthy();
  });

  it('deve exibir mensagem de nenhum pokémon encontrado', async () => {
    (usePokemonContext as jest.Mock).mockReturnValue({
      pokemons: [],
      loading: false,
      loadMorePokemons: jest.fn(),
    });

    (pokemonService.getPokemonDetails as jest.Mock).mockRejectedValue(new Error('not found'));

    const { getByText } = render(<HomePage />);
    fireEvent.press(getByText('Search'));

    await waitFor(() => {
      expect(getByText('Nenhum Pokémon encontrado.')).toBeTruthy();
    });
  });

  it('deve exibir resultado da pesquisa quando encontrar um pokémon', async () => {
    (usePokemonContext as jest.Mock).mockReturnValue({
      pokemons: [],
      loading: false,
      loadMorePokemons: jest.fn(),
    });

    (pokemonService.getPokemonDetails as jest.Mock).mockResolvedValue({
      name: 'pikachu',
      id: 25,
    });

    const { getByText, getByTestId } = render(<HomePage />);
    fireEvent.press(getByText('Search'));

    await waitFor(() => {
      expect(getByTestId('mock-pokemonlist').props.children).toContain('1');
    });
  });
});
