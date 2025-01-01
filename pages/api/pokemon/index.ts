import type { NextApiRequest, NextApiResponse } from "next";
import { ApiPokemonsT } from "../../../src/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiPokemonsT>
) {
  try {
    // fetch here, all pokemons
    const { offset, limit } = req.query;
    const resPokemons = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    const jsonPokemons = await resPokemons.json();

    res.status(200).json({
      pokemons: jsonPokemons.results,
      offset: Number(offset),
      limit: Number(limit),
      total_count: jsonPokemons.count,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "failed to fetch data" });
  }
}
