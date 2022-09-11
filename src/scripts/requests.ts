import { getFetch } from "./fetch";
import {
    ICastMembers,
    IKeyword,
    IMovie,
    IMovieDetails,
    IMovies,
    IPerson,
    IReview,
    ISelectItem,
    ISelectItems,
    ISelectOption,
    IVideos,
    IWatchProviders,
} from "../utils/interfaces";

export const getGeneros = async (): Promise<ISelectItems> => {
    const generos: ISelectItems = [];

    await getFetch("http://localhost:3001/generos").then((data: any) => {
        if (data) {
            data.genres.forEach((g: ISelectItem) => {
                generos.push(g);
            });
        }
    });

    const customSort = (a: ISelectItem, b: ISelectItem) => {
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

export const getMovies = async (
    searchTerm: string,
    genero: string | null,
    page: number,
    sort: string | null,
    pessoa: string | null,
    dataInicial: Date | null,
    dataFinal: Date | null,
    voteCount: number | null,
    keyword: string | null
): Promise<IMovies> => {
    const movies: IMovies = {
        movie_details: [],
        page: 0,
        total_pages: 0,
        total_results: 0,
    };

    let url = "";
    let params: any = {};

    if (searchTerm) {
        // Pesquisa por termo
        url = "http://localhost:3001/descobrirByKeyword";
        params = {
            keyword: searchTerm,
            page: page,
        };
    } else {
        // Pesquisa avançada
        url = "http://localhost:3001/descobrir";
        params = {
            genero: genero,
            page: page,
            sort: sort,
            pessoa: pessoa,
            dataInicial: dataInicial,
            dataFinal: dataFinal,
            voteCount: voteCount,
            keyword: keyword,
        };
    }

    await getFetch(url, params).then((data: any) => {
        if (data) {
            data.movies.forEach((m: IMovieDetails) => {
                movies.movie_details.push(m);
            });

            movies.page = data.page;
            movies.total_pages = data.total_pages;
            movies.total_results = data.total_results;
        }
    });

    return movies;
};

export const getMoviesByKeyword = async (keyword: string) => {
    var movies: ISelectOption[] = [];

    if (keyword.length < 2) {
        return movies;
    }

    await getFetch("http://localhost:3001/moviesByKeyword", {
        keyword: keyword,
    }).then((data: any) => {
        if (data) {
            data.forEach((movie: { id: number; title: string }) => {
                movies.push({ value: movie.id, label: movie.title });
            });
        }
    });

    return movies;
};

export const getPeopleByKeyword = async (keyword: string) => {
    var people: { value: number; label: string }[] = [];

    if (keyword.length < 2) {
        return people;
    }

    await getFetch("http://localhost:3001/peopleByKeyword", {
        keyword: keyword,
    }).then((data: any) => {
        if (data) {
            data.forEach((person: { id: number; name: string }) => {
                people.push({ value: person.id, label: person.name });
            });
        }
    });

    return people;
};

export const getMovieDetails = async (
    id: number
): Promise<IMovie | undefined> => {
    let movie: IMovie | undefined = undefined;

    await getFetch("http://localhost:3001/movie", {
        id: id,
    }).then((data: any) => {
        if (data) {
            if (data.length > 0) {
                movie = data[0];
            }
        }
    });

    return movie;
};

export const getMovieReviews = async (
    movieId: number,
    language: string
): Promise<IReview[] | null> => {
    let reviews: IReview[] | null = null;

    await getFetch("http://localhost:3001/reviews", {
        movieId: movieId,
        language: language,
    }).then((data: any) => {
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
    });

    return reviews;
};

export const getCastMembers = async (
    movieId: number
): Promise<ICastMembers | null> => {
    let castMembers: ICastMembers = { cast: null, directors: "" };

    await getFetch("http://localhost:3001/movieCast", {
        movieId: movieId,
    }).then((data: any) => {
        if (data) {
            if (data.castMembers?.length > 0) {
                castMembers.cast = data.castMembers;
            }

            castMembers.directors = data.directors;
        }
    });

    return castMembers;
};

export const getWatchProviders = async (
    movieId: number
): Promise<IWatchProviders | null> => {
    let watchProviders: IWatchProviders | null = null;

    await getFetch("http://localhost:3001/watchProviders", {
        movieId: movieId,
    }).then((data: any) => {
        if (data) {
            watchProviders = data;
        }
    });

    return watchProviders;
};

export const getMoviesTrending = async (): Promise<IMovies> => {
    const movies: IMovies = {
        movie_details: [],
        page: 0,
        total_pages: 0,
        total_results: 0,
    };

    await getFetch("http://localhost:3001/trending").then((data: any) => {
        if (data) {
            data.movies.forEach((m: IMovieDetails) => {
                movies.movie_details.push(m);
            });

            movies.page = data.page;
            movies.total_pages = data.total_pages;
            movies.total_results = data.total_results;
        }
    });

    return movies;
};

export const getSimilarMovies = async (
    movieId: number
): Promise<IMovie[] | null> => {
    let movies: IMovie[] | null = null;

    await getFetch("http://localhost:3001/similarMovies", {
        movieId: movieId,
    }).then((data: any) => {
        if (data && data.length > 0) {
            movies = data;
        }
    });

    return movies;
};

export const getMovieKeywords = async (
    movieId: number
): Promise<IKeyword[] | null> => {
    let keywords: IKeyword[] | null = null;

    await getFetch("http://localhost:3001/movieKeywords", {
        movieId: movieId,
    }).then((data: any) => {
        if (data && data.length > 0) {
            keywords = data;
        }
    });

    return keywords;
};

export const getPeopleByID = async (
    peopleIds: string
): Promise<ISelectOption[]> => {
    let people: ISelectOption[] = [];

    await getFetch("http://localhost:3001/people", {
        peopleIds: peopleIds,
    }).then((data: any) => {
        if (data && data.length > 0) {
            data.forEach((p: IPerson) => {
                people.push({ value: p.id, label: p.name });
            });
        }
    });

    return people;
};

export const getVideos = async (
    movieId: number,
    language: string
): Promise<IVideos | null> => {
    let videos: IVideos | null = null;

    await getFetch("http://localhost:3001/videos", {
        movieId: movieId,
        language: language,
    }).then((data: any) => {
        if (data) {
            if (
                data.trailers?.length > 0 ||
                data.clips?.length > 0 ||
                data.behindTheScenes?.length > 0 ||
                data.featurettes?.length > 0 ||
                data.teasers?.length > 0 ||
                data.others?.length > 0
            ) {
                videos = data;
            }
        }
    });

    return videos;
};
