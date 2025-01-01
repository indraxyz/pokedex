import {
  Grid2 as Grid,
  Card,
  IconButton,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import {
  FavoriteBorderRounded,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";

type Props = {
  p: { name: string; url: string };
  favs: number[];
  image_url: string;
  addToFav: (id: number) => void;
  detailPokemon: (id: number) => void;
};

const PokemonCard = (props: Props) => {
  const { p, favs, addToFav, detailPokemon, image_url } = props;
  const idPokemon = Number(p.url.split("/")[6]);
  return (
    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
      <Card elevation={2} className="hover:shadow-xl rounded-xl">
        <IconButton
          className="m-1 absolute z-10"
          onClick={() => addToFav(idPokemon)}
        >
          {favs.includes(idPokemon) ? (
            <FavoriteIcon className="text-red-700" />
          ) : (
            <FavoriteBorderRounded className="text-red-700" />
          )}
        </IconButton>
        <CardActionArea onClick={() => detailPokemon(idPokemon)}>
          <div className="flex justify-center">
            <CardMedia
              component="img"
              image={`${image_url + idPokemon}.png`}
              alt={p.name}
              loading="lazy"
              className="w-40 sm:w-60 pt-2"
            />
          </div>

          <CardContent className="flex justify-between mt-6">
            <Typography
              variant="h6"
              sx={{ color: "text.secondary", fontStyle: "italic" }}
            >
              #{idPokemon}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="text-center capitalize font-medium hover:underline"
            >
              {p.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default PokemonCard;
