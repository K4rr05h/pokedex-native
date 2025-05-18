import { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { getPokemonDetails } from '../services/pokemonService';

type Props = {
    nameOrId: string
}

export default function PokemonDetails({ nameOrId }: Props) {
    const [pokemon, setPokemon] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getPokemonDetails(nameOrId)
                setPokemon(data)
            } catch (error) {
                console.error('Erro ao buscar Pokémon:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [nameOrId])

    if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />

    if (!pokemon) return <Text>Erro ao carregar dados.</Text>

    return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>

        <Image
            source={{ uri: pokemon.sprites.other['official-artwork'].front_default }}
            style={styles.image}
        />

        <View style={styles.infos}>
            <View style={styles.section}>
                <Text style={styles.label}>Tipo:</Text>
                <Text>{pokemon.types.map((t: any) => t.type.name).join(', ')}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Altura:</Text>
                <Text>{pokemon.height / 10} m</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Peso:</Text>
                <Text>{pokemon.weight / 10} kg</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Habilidades:</Text>
                {pokemon.abilities.map((a: any, index: number) => (
                    <Text key={index}>
                    {a.ability.name} {a.is_hidden ? '(oculta)' : ''}
                </Text>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Status:</Text>
                {pokemon.stats.map((s: any, index: number) => (
                    <Text key={index}>{s.stat.name}: {s.base_stat}</Text>
                ))}
            </View>
        </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textTransform: 'capitalize',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    infos: {
        borderWidth: 5,
        borderColor: "#999999",
        borderRadius: 10,
        width: "100%",
        padding: 10,
        backgroundColor: "red",
    },
    section: {
        marginTop: 10,
        width: '100%',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
})
