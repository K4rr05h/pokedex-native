import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

type Props = {
  onSearch: (text: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar Pokémon"
        onChangeText={onSearch}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  input: {
    marginLeft: 8,
    fontSize: 16,
    flex: 1,
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
  },
});
