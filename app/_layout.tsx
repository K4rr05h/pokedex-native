import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Kodchasan_400Regular, Kodchasan_700Bold } from '@expo-google-fonts/kodchasan';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../src/theme/theme';
import { ActivityIndicator, View } from 'react-native';
import { PokemonProvider } from '../src/contexts/pokemonContext';

export default function Layout() {
    const [fontsLoaded] = useFonts({
        Kodchasan_400Regular,
        Kodchasan_700Bold,
    });

    if (!fontsLoaded) {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
        </View>
        );
    }

    return (
        <PokemonProvider>
            <ThemeProvider theme={theme}>
                <Tabs
                    screenOptions={{
                    tabBarActiveTintColor: 'crimson',
                    tabBarLabelStyle: {
                        fontFamily: 'Kodchasan_700Bold',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Kodchasan_700Bold',
                    },
                    }}
                >
                    <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                        ),
                    }}
                    />
                    <Tabs.Screen
                    name="favorites"
                    options={{
                        title: 'Favoritos',
                        tabBarIcon: ({ color, size }) => (
                        <Ionicons name="heart" size={size} color={color} />
                        ),
                    }}
                    />
                    <Tabs.Screen
                    name="[id]"
                    options={{
                        headerShown: false,
                        href: null,
                    }}
                    />
                </Tabs>
            </ThemeProvider>
        </PokemonProvider>
    );
}
