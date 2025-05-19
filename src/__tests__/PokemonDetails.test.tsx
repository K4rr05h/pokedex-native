import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import PokemonDetailsPage from '../components/pokemonDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from '../notifications/sendMockNotification';
import { useLocalSearchParams } from 'expo-router';

jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(),
}));

jest.mock('../components/pokemonDetails', () => {
  return ({ nameOrId }: { nameOrId: string }) => {
    const { Text } = require('react-native');
    return <Text testID="pokemon-details">{`ID: ${nameOrId}`}</Text>;
  };
});

jest.mock('../notifications/pushNotificationsRegistry', () => ({
  registerForPushNotificationsAsync: jest.fn(),
}));

jest.mock('../notifications/sendMockNotification', () => ({
  sendMockNotification: jest.fn(),
}));

describe('PokemonDetailsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve exibir loader enquanto loading for true', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ id: '1' });
    jest.spyOn(AsyncStorage, 'getItem').mockImplementation(() => new Promise(() => {})); // nunca resolve

    const { getByTestId } = render(<PokemonDetailsPage />);
    expect(getByTestId('ActivityIndicator')).toBeTruthy();
  });

  it('deve renderizar o componente PokemonDetails após carregar', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ id: '25' });
    jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue('true');

    const { getByTestId, queryByTestId } = render(<PokemonDetailsPage />);
    await waitFor(() => expect(queryByTestId('pokemon-details')).toBeTruthy());
    expect(getByTestId('pokemon-details').props.children).toContain('25');
  });

  it('deve chamar sendMockNotification ao pressionar o botão', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ id: '100' });
    jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue('false');

    const { getByRole } = render(<PokemonDetailsPage />);
    const touchable = getByRole('button');
    fireEvent.press(touchable);

    expect(Notifications.sendMockNotification).toHaveBeenCalled();
  });
});
