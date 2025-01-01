import { Box, Typography, Chip, Paper } from "@mui/material";
import { AbilitiesT, TypesT, PokemonT } from "../types";

type Props = {
  pokemon: PokemonT;
};

const BasicPokemon = (props: Props) => {
  const { pokemon } = props;
  return (
    <Paper
      square={false}
      elevation={3}
      className="px-8 py-4 my-8 rounded-2xl min-h-[450]"
    >
      <div className="space-y-2">
        <Typography className="text-2xl text-center sm:text-left mb-6">
          Basic Information
        </Typography>
        <Box>
          <Typography variant="h5">{pokemon.id}</Typography>
          <Typography variant="body2" className="tracking-wider">
            ID
          </Typography>
        </Box>
        <Box className="mt-2">
          <Typography variant="h5" className="capitalize">
            {pokemon.name}
          </Typography>
          <Typography variant="body2" className="tracking-wider">
            Name
          </Typography>
        </Box>
        <Box className="mt-2">
          <Typography variant="h5">{Number(pokemon.height) / 10} m</Typography>
          <Typography variant="body2" className="tracking-wider">
            Height
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5">{Number(pokemon.weight) / 10} kg</Typography>
          <Typography variant="body2" className="tracking-wider">
            Weight
          </Typography>
        </Box>
        <Box>
          <div className="capitalize space-x-2 my-2 pt-1">
            {pokemon.abilities?.map((a: AbilitiesT, i: number) => {
              return (
                <Chip key={i} label={a.ability?.name} variant="outlined" />
              );
            })}
          </div>

          <Typography variant="body2" className="tracking-wider">
            Abilities
          </Typography>
        </Box>
        <Box>
          <div className="capitalize space-x-2  my-2 pt-1">
            {pokemon.types?.map((t: TypesT, i: number) => {
              return (
                <Chip
                  key={i}
                  label={t.type?.name}
                  variant="outlined"
                  clickable
                />
              );
            })}
          </div>
          <Typography variant="body2" className="tracking-wider">
            Types
          </Typography>
        </Box>
      </div>
    </Paper>
  );
};

export default BasicPokemon;
