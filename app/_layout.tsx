import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function Layout() {
  return (
    <Tabs>
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
            name="liked"
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
  )
}
