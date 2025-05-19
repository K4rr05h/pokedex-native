# 📱 Pokedex App

Aplicativo mobile desenvolvido com **React Native + Expo** que consome a [PokeAPI](https://pokeapi.co/) para exibir uma lista de Pokémons, seus detalhes, permitir busca, favoritar e visualizar informações completas.

---

## 🚀 Como rodar localmente

Para rodar o projeto, você deve seguir com os comandos abaixo.

### 1. Clone o projeto

```bash
git clone https://github.com/seu-usuario/pokedex-app.git
cd pokedex-app
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Execute o projeto

```bash
npm run start
```

## 📦 Comandos úteis

> Para fazer a build do projeto, você deve usar o comando abaixo

```sh
npx eas build --platform android --profile apk
```

> Para fazer o update das dependência do projeto, você deve usar o comando abaixo

```sh
npx eas update
```

## 🧱 Estrutura de Pastas
![image](https://github.com/user-attachments/assets/10b35bcb-1a22-4a90-b9a6-27d113db4628)


## 🧠 Estratégia de Arquitetura
> Clean Architecture + MVVM: separação entre camadas de dados (api/, services/) e camadas de apresentação (components/, contexts/).

> Expo Router: navegação declarativa baseada em arquivos com rotas aninhadas e layout global.

> Context API: para gerenciamento de favoritos e modo escuro.

> Estilização: tema inspirado nas cores de Bulbasaur, Ivysaur e Venusaur (verdes, cinza, branco e vermelho), com StyleSheet + Theme.

✅ Funcionalidades implementadas
* ✅ Listagem de Pokémons com scroll infinito

* ✅ Busca por nome ou número

* ✅ Tela de Detalhes com:

   - Imagem em alta resolução

   - Tipos, altura, peso, habilidades e stats

* ✅ Favoritar Pokémons

   - Armazenamento local com AsyncStorage

   - Tela de favoritos com exibição

* ✅ Tema global

* ✅ Context API para estado global

* ✅ Consumo da PokeAPI com Axios e React Query

## 📹 Demonstração em vídeo

[Link para vídeo demonstrativo do aplicativo](https://drive.google.com/file/d/1zHEB0XLCcTMWuo8lfWwwyh4rzROLOlzZ/view?usp=drive_link)
