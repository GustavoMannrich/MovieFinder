const axios = require("axios");

interface IItem {
    id: number;
    name: string;
}

export interface IItems extends Array<IItem> {}

export const getGeneros = async (): Promise<IItems> => {
    const generos: IItems = [];

    await axios
        .get("http://localhost:3001/generos")
        .then((response: any) => {
            response.data.genres.forEach((g: IItem) => {
                generos.push(g);
            });
        })
        .catch((error: any) => {
            console.log(error);
        });

    const customSort = (a: IItem, b: IItem) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    };

    generos.sort(customSort);

    return generos;
};

interface IMovieDetails {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    genres: Array<number>;
    id: number;
    original_title: string;
    title: string;
    backdrop_path: string;
    vote_average: number;
    budget: number;
    revenue: number;
    runtime: number;
    tagline: string;
}

export interface IMovies {
    movie_details: Array<IMovieDetails>;
    page: number;
    total_pages: number;
    total_results: number;
}

export const getMovies = async (
    genero: string,
    adult: boolean,
    page: number,
    sort: string,
    pessoa: string,
    dataInicial: Date | null,
    dataFinal: Date | null,
    voteCount: number
): Promise<IMovies> => {
    const movies: IMovies = {
        movie_details: [],
        page: 0,
        total_pages: 0,
        total_results: 0,
    };

    await axios
        .get("http://localhost:3001/descobrir", {
            params: {
                genero: genero,
                adult: adult,
                page: page,
                sort: sort,
                pessoa: pessoa,
                dataInicial: dataInicial,
                dataFinal: dataFinal,
                voteCount: voteCount,
            },
        })
        .then((response: any) => {
            if (response.data) {
                response.data.movies.forEach((m: IMovieDetails) => {
                    movies.movie_details.push(m);
                });

                movies.page = response.data.page;
                movies.total_pages = response.data.total_pages;
                movies.total_results = response.data.total_results;
            }
        })
        .catch((error: any) => {
            console.log(error);
        });

    return movies;
};

export const getMoviesByKeyword = async (keyword: string) => {
    var movies: { value: number; label: string }[] = [];

    if (keyword.length < 2) {
        return movies;
    }

    await axios
        .get("http://localhost:3001/moviesByKeyword", {
            params: {
                keyword: keyword,
            },
        })
        .then((response: any) => {
            if (response.data) {
                response.data.forEach(
                    (movie: { id: number; title: string }) => {
                        movies.push({ value: movie.id, label: movie.title });
                    }
                );
            }
        })
        .catch((error: any) => {
            console.log(error);
        });

    return movies;
};

export const getPeopleByKeyword = async (keyword: string) => {
    var people: { value: number; label: string }[] = [];

    if (keyword.length < 2) {
        return people;
    }

    await axios
        .get("http://localhost:3001/peopleByKeyword", {
            params: {
                keyword: keyword,
            },
        })
        .then((response: any) => {
            if (response.data) {
                response.data.forEach(
                    (person: { id: number; name: string }) => {
                        people.push({ value: person.id, label: person.name });
                    }
                );
            }
        })
        .catch((error: any) => {
            console.log(error);
        });

    return people;
};

interface IGenre {
    id: number;
    name: string;
}

interface IProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

interface IProductionCountry {
    iso_3166_1: string;
    name: string;
}

interface ISpokenLanguage {
    iso_639_1: string;
    name: string;
}

export interface IMovie {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection?: any;
    budget: number;
    genres: IGenre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path?: any;
    production_companies: IProductionCompany[];
    production_countries: IProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: ISpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export const getMovieDetails = async (id: number): Promise<IMovie | null> => {
    let movie: IMovie | null = null;

    await axios
        .get("http://localhost:3001/movie", {
            params: {
                id: id,
            },
        })
        .then(({ data }: any) => {
            if (data) {
                if (data.length > 0) {
                    movie = data[0];
                }
            }
        })
        .catch((error: any) => {
            console.log(error);
        });

    return movie;
};

export interface IAuthorDetails {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
}

export interface IReview {
    author: string;
    author_details: IAuthorDetails;
    content: string;
    created_at: Date;
    id: string;
    updated_at: Date;
    url: string;
}

export const getMovieReviews = async (
    movieId: number,
    language: string
): Promise<IReview[] | null> => {
    let reviews: IReview[] | null = null;

    await axios
        .get("http://localhost:3001/reviews", {
            params: {
                movieId: movieId,
                language: language,
            },
        })
        .then(({ data }: any) => {
            if (data) {
                if (data.length > 0) {
                    reviews = data;

                    if (reviews) {
                        // As reviews vem da mais antiga para a mais recente,
                        // dai tem que inverter o array pra ficar as mais
                        // recentes no começo
                        reviews.reverse();
                    }
                }
            }
        })
        .catch((error: any) => {
            console.log(error);
        });

    return reviews;
};

export interface ICastMember {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}

export const getCastMembers = async (
    movieId: number
): Promise<ICastMember[] | null> => {
    let castMembers: ICastMember[] | null = null;

    await axios
        .get("http://localhost:3001/movieCast", {
            params: {
                movieId: movieId,
            },
        })
        .then(({ data }: any) => {
            if (data) {
                if (data.length > 0) {
                    castMembers = data;
                }
            }
        })
        .catch((error: any) => {
            console.log(error);
        });

    return castMembers;
};

interface IWatchProvider {
    display_priority: number;
    logo_path: string;
    provider_id: number;
    provider_name: string;
}

export interface IWatchProviders {
    isAvailable: boolean;
    link: string;
    flatrate: IWatchProvider[];
    rent: IWatchProvider[];
    buy: IWatchProvider[];
}

export const getWatchProviders = async (
    movieId: number
): Promise<IWatchProviders | null> => {
    let watchProviders: IWatchProviders | null = null;

    await axios
        .get("http://localhost:3001/watchProviders", {
            params: {
                movieId: movieId,
            },
        })
        .then(({ data }: any) => {
            if (data) {
                watchProviders = data;
            }
        })
        .catch((error: any) => {
            console.log(error);
        });

    return watchProviders;
};
