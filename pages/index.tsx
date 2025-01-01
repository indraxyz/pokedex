import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Pagination,
  Stack,
  Grid2 as Grid,
  // Card,
  // CardContent,
  // CardMedia,
  // CardActionArea,
  Dialog,
  DialogContent,
  IconButton,
  Skeleton,
  useTheme,
  TextField,
} from "@mui/material";
import {
  CloseRounded,
  ArrowDownwardRounded,
  FavoriteBorderRounded,
  Favorite as FavoriteIcon,
  FilterAlt as FilterAltIcon,
  RestartAlt as RestartIcon,
} from "@mui/icons-material";
import heroImage from "../public/hero.png";
import Image from "next/image";
import NProgress from "../src/components/NProgress/Progress";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PokemonsT, PokemonT } from "../src/types";
import PokemonCard from "@/src/components/PokemonCard";
import BasicPokemon from "@/src/components/BasicPokemon";

const Pokemon = () => {
  const [skeleton, setSkeleton] = useState(false);
  const [loading, setLoading] = useState({
    isAnimating: false,
    key: 0,
  });
  const [pokemons, setPokemons] = useState<PokemonsT>([]);
  const [copyPokemons, setCopyPokemons] = useState<PokemonsT>([]);
  const [pokemon, setPokemon] = useState<PokemonT>({});
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [dialogDetail, setDialogDetail] = useState(false);
  const [favs, setFavs] = useState<number[]>([]);
  const [favFilter, setFavFilter] = useState(false);
  const [search, setSearch] = useState("");

  const pokemonsCount = 1025; // last pokemon is pecharunt at 1025
  const limit = 9;
  const image_url =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    syncLoading();
    setSkeleton((pv) => !pv);

    const pokemons_fetch = async (offset: number, limit: number) => {
      const res = await fetch(`/api/pokemon?offset=${offset}&limit=${limit}`);
      const json_pokemons = await res.json();
      // console.log(json_pokemons.pokemons);
      setPokemons(json_pokemons.pokemons);
      setCopyPokemons(json_pokemons.pokemons);

      setSkeleton((pv) => !pv);
      syncLoading();
    };

    pokemons_fetch(0, pokemonsCount);
  }, []);

  const syncLoading = () => {
    setLoading((prev) => ({
      isAnimating: !prev.isAnimating,
      key: prev.isAnimating ? prev.key : prev.key ^ 1,
    }));
  };

  async function pokemon_fetch(key: number) {
    syncLoading();
    const res = await fetch(`/api/pokemon/${key}`);
    const json_pokemon = await res.json();
    setPokemon(json_pokemon);
    setDialogDetail(true);
    syncLoading();
    // console.log(json_pokemon);
  }

  const paginateTo = async (p: number) => {
    syncLoading();
    setSkeleton((pv) => !pv);
    await dummyTimeout(true);

    const of = (p - 1) * limit;
    setOffset(of);
    setPage(p);

    setSkeleton((pv) => !pv);
    syncLoading();
  };

  // dummy timeout
  const dummyTimeout = (p: boolean) => {
    return new Promise<void>((resolve, reject) => {
      // ...
      setTimeout(() => {
        if (p) {
          resolve();
        } else {
          reject(new Error("Error"));
        }
      }, 700);
    });
  };

  const detailPokemon = (id: number) => {
    pokemon_fetch(id);
  };

  const addToFav = (id: number) => {
    const index = favs.findIndex((v) => v == id);

    if (index == -1) {
      favs.push(id);
    } else {
      favs.splice(index, 1);
    }

    setFavs([...favs]);
  };

  const showFav = (f: boolean) => {
    setOffset(0);
    setPage(1);
    setSearch("");
    setFavFilter(f);

    console.log(favs);

    if (f) {
      const dummy: PokemonsT = [];
      favs.map((v) => {
        // console.log(v);
        dummy.push(copyPokemons[v - 1]);
      });
      console.log(dummy);
      setPokemons([...dummy]);
    } else {
      setPokemons([...copyPokemons]);
    }
  };

  // SEARCH
  const searchPokemons = (k: string) => {
    if (k == "Enter" && search.length > 2) {
      const sp = copyPokemons.filter(
        (item) => item.name.toLowerCase().indexOf(search.toLowerCase()) > -1
      );
      // console.log(sp);
      setPokemons([...sp]);

      setOffset(0);
      setPage(1);
      setFavFilter(false);
    }
  };

  //RESET DATA, filter
  const resetPokemons = () => {
    setOffset(0);
    setPage(1);
    setSearch("");
    setFavFilter(false);
    setPokemons([...copyPokemons]);
  };

  return (
    <Container>
      <NProgress isAnimating={loading.isAnimating} key={loading.key} />
      {/* WELCOME */}
      <Box
        component={"div"}
        className="justify-items-center content-center text-center  min-h-screen"
      >
        <Image
          src={heroImage}
          alt=""
          className="w-52 sm:w-72 h-auto"
          priority
        />
        <Typography
          variant="h3"
          className="text-3xl font-bold sm:text-5xl my-4"
        >
          PokeDex App
        </Typography>
        <Button
          variant="contained"
          href="#pokedex"
          className="text-xl font-bold rounded-xl mt-10"
          startIcon={
            <ArrowDownwardRounded className="animate-bounce font-bold text-2xl" />
          }
        >
          PokeDex
        </Button>
      </Box>

      {/* FILTER: search by name, favourite, reset */}
      <div id="pokedex" className="mb-4">
        <div className="flex space-x-2 items-center mb-2">
          <FilterAltIcon />
          <Typography variant="h6">Filter</Typography>
        </div>
        <div className="flex justify-between items-center">
          {/* filter */}
          <div className="flex items-center space-x-6 ">
            <div className="flex items-center space-x-1">
              <IconButton className="" onClick={() => showFav(!favFilter)}>
                {favFilter ? (
                  <FavoriteIcon className="text-red-700" />
                ) : (
                  <FavoriteBorderRounded className="text-red-700" />
                )}
              </IconButton>
              <Typography variant="body1">Favourites</Typography>
            </div>
            <div className="h-[40px]  bg-gray-300 w-[1px]"></div>
            <div>
              <TextField
                id="standard-basic"
                label="Search Pokemons"
                variant="standard"
                placeholder="pokemon's name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => searchPokemons(e.key)}
              />
            </div>
          </div>
          <div>
            {/* reset */}
            <IconButton className="" onClick={() => resetPokemons()}>
              <RestartIcon />
            </IconButton>
          </div>
        </div>
      </div>

      {/* list of pokemons */}
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
        sx={{ paddingTop: 4, justifyContent: "center" }}
      >
        {skeleton ? (
          <>
            {[...Array(9)].map((x, i) => (
              <Grid key={i} size={{ xs: 2, sm: 4, md: 4 }}>
                <Skeleton variant="rounded" className="w-full h-52 sm:h-80 " />
              </Grid>
            ))}
          </>
        ) : pokemons.length == 0 ? (
          <Typography className="font-bold underline justify-center self-center">
            Empty Data
          </Typography>
        ) : (
          Array.from(pokemons.slice(offset, 9 * page)).map((p, i) => {
            return (
              <PokemonCard
                key={i}
                p={p}
                favs={favs}
                addToFav={addToFav}
                detailPokemon={detailPokemon}
                image_url={image_url}
              />
            );
          })
        )}
      </Grid>
      {/* paginaation */}
      <Stack spacing={2} className="my-10 items-center">
        <Pagination
          size={smScreen ? "small" : "medium"}
          count={Math.ceil(pokemons.length / limit)}
          color="primary"
          defaultPage={1}
          onChange={(e, p) => paginateTo(p)}
          page={page}
        />
      </Stack>

      {/*DETAIL POKEMON - DIALOG */}
      <Dialog
        fullWidth
        maxWidth="sm"
        fullScreen={smScreen}
        open={dialogDetail}
        onClose={() => setDialogDetail(false)}
      >
        <IconButton
          aria-label="close"
          onClick={() => setDialogDetail(false)}
          className="bg-gray-100 hover:bg-gray-200"
          sx={{
            position: "absolute",
            right: 10,
            top: 10,
            zIndex: 9999,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseRounded />
        </IconButton>
        <DialogContent>
          {/* sign in form or sosmed acc */}
          <Box component={"div"} className="">
            <Box className="flex justify-center">
              <Box
                component={"img"}
                src={pokemon.image}
                alt={pokemon.name}
                loading="lazy"
                className="w-52 sm:w-60 md:w-80 mb-8 mt-4"
              />
            </Box>

            <Box component={"div"} className="text-center">
              <Typography className="text-3xl font-semibold capitalize tracking-wider underline">
                {pokemon.name}
              </Typography>
            </Box>

            <BasicPokemon pokemon={pokemon} />

            <Button
              fullWidth
              variant="contained"
              className="text-xl font-bold rounded-xl"
              onClick={() => window.open(`/${pokemon.id}`, "_blank")}
            >
              More Details
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Pokemon;
