import type { NextApiRequest, NextApiResponse } from "next";
import { ApiPokemonT } from "../../../src/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiPokemonT>
) {
  try {
    const { key } = req.query;
    const resPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${key}`);
    const jsonPokemon = await resPokemon.json();
    const { id, name, height, weight, species, types, abilities, stats } =
      jsonPokemon;
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    res.status(200).json({
      id,
      name,
      height,
      weight,
      species: species.url,
      types,
      abilities,
      image,
      stats,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "failed to fetch data" });
  }
}
