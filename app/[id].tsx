import { useEffect, useState } from 'react'
import { View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PokemonDetails from '../src/components/pokemonDetails'
import { theme } from '../src/theme/theme'
import { registerForPushNotificationsAsync } from '../src/notifications/pushNotificationsRegistry';
import { sendMockNotification } from '../src/notifications/sendMockNotification'

export default function PokemonDetailsPage() {
  const { id } = useLocalSearchParams()
  const pokemonId = String(id)

  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  useEffect(() => {
    async function loadLikeStatus() {
      try {
        const stored = await AsyncStorage.getItem(`liked-${pokemonId}`)
        setLiked(stored === 'true')
      } catch (err) {
        console.error('Erro ao carregar like:', err)
      } finally {
        setLoading(false)
      }
    }

    loadLikeStatus()
  }, [pokemonId])

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.card }}>
      <PokemonDetails nameOrId={pokemonId} />
      <TouchableOpacity onPress={sendMockNotification} style={{ backgroundColor: "red", width: 60, height: 60, borderRadius: 10, alignSelf: "center" }} />
    </View>
  )
}
