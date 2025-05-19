import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPokemonDetails, getPokemonList } from '../services/pokemonService';

type Pokemon = {
    id: number;
    name: string;
    sprites: { front_default: string };
};

type PokemonContextType = {
    likedPokemons: Pokemon[];
    toggleLike: (pokemon: Pokemon) => void;
    isLiked: (id: number) => boolean;
    pokemons: Pokemon[];
    loadMorePokemons: () => void;
    loading: boolean;
};

const PokemonContext = createContext<PokemonContextType>({} as PokemonContextType);

const LIMIT = 40;

export const PokemonProvider = ({ children }: { children: React.ReactNode }) => {
    const [likedPokemons, setLikedPokemons] = useState<Pokemon[]>([]);
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);

  // Carrega favoritos
  useEffect(() => {
    async function loadLikedFromStorage() {
        const keys = await AsyncStorage.getAllKeys();
        const likedKeys = keys.filter((key) => key.startsWith('liked-'));
        const entries = await AsyncStorage.multiGet(likedKeys);

        const likedIds = entries
            .filter(([, value]) => value === 'true')
            .map(([key]) => key.replace('liked-', ''));

        const pokemons = await Promise.all(
            likedIds.map(async (id) => {
            try {
                return await getPokemonDetails(id);
            } catch {
                return null;
            }
            })
        );

        setLikedPokemons(pokemons.filter(Boolean) as Pokemon[]);
    }

    loadLikedFromStorage();
  }, []);

    const toggleLike = async (pokemon: Pokemon) => {
        const isAlreadyLiked = likedPokemons.some((p) => p.id === pokemon.id);
        const updated = isAlreadyLiked
            ? likedPokemons.filter((p) => p.id !== pokemon.id)
            : [...likedPokemons, pokemon];

        setLikedPokemons(updated);
        await AsyncStorage.setItem(`liked-${pokemon.id}`, (!isAlreadyLiked).toString());
    };

    const isLiked = (id: number) => likedPokemons.some((p) => p.id === id);

    const loadMorePokemons = async () => {
        if (loading) return;

        setLoading(true);
        try {
            const data = await getPokemonList(LIMIT, offset);
            const details = await Promise.all(
                data.results.map(async (pokemon) => await getPokemonDetails(pokemon.name))
        );

            setPokemons((prev) => [...prev, ...details]);
            setOffset((prev) => prev + LIMIT);
        } catch (error) {
        console.error('Erro ao carregar pokémons:', error);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        if (pokemons.length === 0) {
            loadMorePokemons();
        }
    }, []);

    return (
        <PokemonContext.Provider
            value={{ likedPokemons, toggleLike, isLiked, pokemons, loadMorePokemons, loading }}
        >
            {children}
        </PokemonContext.Provider>
    );
};

export const usePokemonContext = () => useContext(PokemonContext);
