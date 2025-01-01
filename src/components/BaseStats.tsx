import { Box, Typography, LinearProgress, Paper } from "@mui/material";
import { BaseStat, PokemonT } from "../types";

type Props = {
  pokemon: PokemonT;
};

const BaseStats = (props: Props) => {
  const { pokemon } = props;
  return (
    <Paper
      square={false}
      elevation={3}
      className="px-8 py-4 my-8 rounded-2xl min-h-[450]"
    >
      <Typography className="text-2xl mb-6 text-center sm:text-left ">
        Base Stats
      </Typography>
      <div className="space-y-6">
        {pokemon.stats?.map((s: BaseStat, i: number) => {
          const val = s.base_stat;
          return (
            <div key={i}>
              <Typography className="capitalize" variant="h6">
                {s.stat?.name} . {val}
              </Typography>
              <Box sx={{ width: "100%" }}>
                <LinearProgress
                  className="h-3"
                  variant="determinate"
                  value={val != undefined && val > 100 ? 100 : val}
                />
              </Box>
            </div>
          );
        })}
      </div>
    </Paper>
  );
};

export default BaseStats;
