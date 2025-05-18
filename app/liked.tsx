import { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getPokemonDetails } from '../src/services/pokemonService'
import { formatPokemonNumber } from '../src/services/pokemonService'
import { Link } from 'expo-router'

type Pokemon = {
  id: number
  name: string
  sprites: {
    front_default: string
  }
}

export default function LikedPokemons() {
  const [likedPokemons, setLikedPokemons] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadLikedPokemons() {
      try {
        const keys = await AsyncStorage.getAllKeys()
        const likedKeys = keys.filter((key) => key.startsWith('liked-'))

        const entries = await AsyncStorage.multiGet(likedKeys)
        const likedIds = entries
          .filter(([, value]) => value === 'true')
          .map(([key]) => key.replace('liked-', ''))

        const promises = likedIds.map((id) => getPokemonDetails(id))
        const pokemons = await Promise.all(promises)

        setLikedPokemons(pokemons)
      } catch (error) {
        console.error('Erro ao carregar pokémons curtidos:', error)
      } finally {
        setLoading(false)
      }
    }

    loadLikedPokemons()
  }, [])

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />

  if (likedPokemons.length === 0) {
    return <Text style={styles.empty}>Nenhum Pokémon curtido ainda.</Text>
  }

  return (
    <FlatList
      data={likedPokemons}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Link href={`/${item.id}`} asChild>
          <View style={styles.card}>
            <Text style={styles.number}>{formatPokemonNumber(item.id)}</Text>
            <Image
              source={{ uri: item.sprites.front_default }}
              style={styles.icon}
            />
            <Text style={styles.name}>{item.name}</Text>
          </View>
        </Link>
      )}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  icon: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
  number: {
    fontSize: 12,
    color: '#666',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#999',
  },
})
