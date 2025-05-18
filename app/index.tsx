import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import { useEffect, useState } from "react"
import {
  getPokemonList,
  getPokemonIdFromUrl,
  PokemonListItem,
  formatPokemonNumber
} from "../src/services/pokemonService"
import { useRouter } from "expo-router"

export default function Page() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([])
  const [offset, setOffset] = useState(0)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      try {
        const data = await getPokemonList(20, offset)

        setPokemons(prev => {
          return offset === 0 ? data.results : [...prev, ...data.results]
        })
      } catch (error) {
        console.error('Erro ao buscar pokémons:', error)
      }
    }

    load()
  }, [offset])

  return (
    <FlatList
      data={pokemons}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => {
        const id = getPokemonIdFromUrl(item.url)
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        const formattedNumber = formatPokemonNumber(id)

        return (
          <TouchableOpacity onPress={() => router.push(`/${id}`)}>
            <View style={styles.card}>
              <Text style={styles.number}>{formattedNumber}</Text>
              <Image source={{ uri: imageUrl }} style={styles.icon} />
              <Text style={styles.name}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )
      }}
      onEndReached={() => setOffset((prev) => prev + 20)}
      onEndReachedThreshold={0.5}
      contentContainerStyle={styles.list}
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
})
