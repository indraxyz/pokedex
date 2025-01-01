import { useRouter } from "next/router";
import {
  Button,
  Box,
  Grid2 as Grid,
  Typography,
  Container,
} from "@mui/material";
import { useEffect, useState } from "react";
import { NextPageContext } from "next";
import NProgress from "../src/components/NProgress/Progress";
import { ArrowBackIosRounded } from "@mui/icons-material";
import BasicPokemon from "@/src/components/BasicPokemon";
import BaseStats from "@/src/components/BaseStats";

type Props = { query: { key: string } };
type pokemon_type = {
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

const PokemonDetail = ({ query }: Props) => {
  const router = useRouter();
  // const { key } = query;
  const [pokemon, setPokemon] = useState<pokemon_type>({});
  const [loading, setLoading] = useState({
    isAnimating: false,
    key: 0,
  });

  useEffect(() => {
    async function pokemon_fetch(key: string | string[] | undefined) {
      syncLoading();
      const res = await fetch(`/api/pokemon/${key}`);
      const json_pokemon = await res.json();
      setPokemon(json_pokemon);
      console.log(json_pokemon);
      syncLoading();
    }

    pokemon_fetch(query.key);
  }, [query]);

  const syncLoading = () => {
    setLoading((prev) => ({
      isAnimating: !prev.isAnimating,
      key: prev.isAnimating ? prev.key : prev.key ^ 1,
    }));
  };

  return (
    <Container className="pb-6">
      <NProgress isAnimating={loading.isAnimating} key={loading.key} />

      <Button
        onClick={() => router.push(`/`)}
        startIcon={<ArrowBackIosRounded />}
        className="font-bold text-lg"
      >
        Pokedex
      </Button>

      <Box component={"div"} className="flex justify-center">
        <Box
          component={"img"}
          src={pokemon.image}
          alt={pokemon.name}
          loading="lazy"
          className="w-72 sm:w-96 my-8"
        />
      </Box>

      <Box component={"div"} className="text-center my-4">
        <Typography className="text-3xl font-semibold capitalize tracking-wider underline">
          {pokemon.name}
        </Typography>
      </Box>

      {/* detail, stats */}
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 4, sm: 8 }}
        sx={{ marginTop: 6 }}
      >
        <Grid size={{ xs: 4 }}>
          <BasicPokemon pokemon={pokemon} />
        </Grid>
        <Grid size={{ xs: 4 }}>
          <BaseStats pokemon={pokemon} />
        </Grid>
      </Grid>
    </Container>
  );
};

PokemonDetail.getInitialProps = async (ctx: NextPageContext) => {
  return { query: ctx.query };
};

export default PokemonDetail;
