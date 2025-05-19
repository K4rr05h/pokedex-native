import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getPokemonDetails } from '../services/pokemonService';
import { theme } from '../theme/theme';
import { sendMockNotification } from '../notifications/sendMockNotification'

type Props = {
  nameOrId: string;
};

type PokemonDetailsType = {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
};

export default function PokemonDetails({ nameOrId }: Props) {
    const [pokemon, setPokemon] = useState<PokemonDetailsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const details = await getPokemonDetails(nameOrId);
        setPokemon(details);
      } catch (err) {
        console.error('Erro ao buscar detalhes:', err);
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [nameOrId]);

  if (loading) return <Text style={styles.loading}>Carregando...</Text>;
  if (!pokemon) return <Text style={styles.loading}>Pokémon não encontrado.</Text>;

  const highResImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.name}>{pokemon.name}</Text>
      <Image source={{ uri: highResImage }} style={styles.image} />

      <Text style={[styles.label, { alignSelf: "center" }]}>Tipos:</Text>
      <View style={styles.tagsContainer}>
        {pokemon.types.map(({ type }) => (
          <Text
            key={type.name}
            style={[
              styles.tag,
              { backgroundColor: theme.colors.types[type.name as keyof typeof theme.colors.types] || theme.colors.background },
            ]}
          >
            {type.name}
          </Text>
        ))}
      </View>

      <Text style={[styles.label, { alignSelf: "center" }]}>Habilidades:</Text>
      <View style={styles.tagsContainer}>
        {pokemon.abilities.map(({ ability }) => (
          <Text
            key={ability.name}
            style={[
              styles.habilityTag,
              { backgroundColor: theme.colors.card },
            ]}
          >
            {ability.name}
          </Text>
        ))}
      </View>
      
      <Text style={styles.label}>Altura:</Text>
      <Text style={styles.value}>{pokemon.height / 10} m</Text>
      
      <Text style={styles.label}>Peso:</Text>
      <Text style={styles.value}>{pokemon.weight / 10} kg</Text>

      <Text style={[styles.label, { marginTop: 12 }]}>Status:</Text>
      <View style={styles.statsGrid}>
        {pokemon.stats.map(({ stat, base_stat }) => (
          <View key={stat.name} style={styles.statItem}>
            <Text style={styles.statName}>{stat.name}</Text>
            <Text style={styles.value}>{base_stat}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    marginTop: 50,
  },
  name: {
    fontSize: 32,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontFamily: 'Kodchasan_700Bold',
  },
  image: {
    width: 250,
    height: 250,
    marginVertical: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    alignSelf: 'flex-start',
    fontFamily: theme.fonts.bold,
  },
    loading: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: theme.colors.textLight,
  },
  value: {
    fontSize: 16,
    marginBottom: 4,
    alignSelf: 'flex-start',
    fontFamily: theme.fonts.regular,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 4,
    alignSelf: 'center',
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    color: theme.colors.card,
    textTransform: 'capitalize',
    fontFamily: theme.fonts.regular,
    overflow: 'hidden',
  },
  habilityTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    color: theme.colors.text,
    textTransform: 'capitalize',
    fontFamily: theme.fonts.regular,
    overflow: 'hidden',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 8,
    columnGap: 16,
    marginTop: 4,
    alignSelf: 'stretch',
  },
  statItem: {
    width: '48%',
  },
  statName: {
    fontSize: 14,
    color: theme.colors.textLight,
    fontFamily: theme.fonts.regular,
    textTransform: 'uppercase',
  },
});
