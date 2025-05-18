import { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, Button, Alert } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import PokemonDetails from '../src/components/pokemonDetails';

export default function PokemonDetailsPage() {
    const { id } = useLocalSearchParams()
    const pokemonId = String(id)

    const [liked, setLiked] = useState(false)
    const [loading, setLoading] = useState(true)

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

    async function toggleLike() {
        try {
        const newStatus = !liked
        setLiked(newStatus)
        await AsyncStorage.setItem(`liked-${pokemonId}`, newStatus.toString())
        Alert.alert(newStatus ? 'Curtido!' : 'Descurtido!')
        } catch (err) {
        console.error('Erro ao salvar like:', err)
        }
    }

    if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />

    return (
        <View style={{ flex: 1, marginTop: 100 }}>
            <PokemonDetails nameOrId={pokemonId} />
            <View style={{ padding: 20 }}>
                <Button
                title={liked ? 'Descurtir ❤️' : 'Curtir 🤍'}
                onPress={toggleLike}
                color={liked ? 'crimson' : 'gray'}
                />
            </View>
        </View>
    )
}
