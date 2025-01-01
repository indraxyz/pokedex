type PokemonsT = { name: string; url: string }[];
type PokemonT = {
  id?: number;
  name?: string;
  height?: number;
  weight?: number;
  species?: string;
  types?: object[];
  abilities?: object[];
  image?: string;
  stats?: object[];
};

type AbilitiesT = {
  ability?: AbilityT | undefined;
};
type AbilityT = {
  name?: string;
};

type TypesT = {
  type?: TypeT;
};
type TypeT = {
  name?: string;
};

type ApiPokemonsT = {
  pokemons?: object[];
  offset?: number;
  limit?: number;
  error?: string;
  total_count?: number;
};
type ApiPokemonT = {
  error?: string;
  id?: number;
  name?: string;
  height?: number;
  weight?: number;
  species?: string;
  types?: object[];
  abilities?: object[];
  image?: string;
  stats?: object[];
};

type BaseStat = {
  base_stat?: number;
  stat?: Stat;
};
type Stat = {
  name?: string;
};

export type {
  PokemonsT,
  PokemonT,
  AbilitiesT,
  AbilityT,
  TypesT,
  ApiPokemonsT,
  ApiPokemonT,
  BaseStat,
};
