import { getFetch } from './util';

interface IItem {
    id: number;
    name: string;
}

export interface IItems extends Array<IItem> {}

export const getGeneros = async (): Promise<IItems> => {
    const generos: IItems = [];

    await getFetch('http://localhost:3001/generos').then((data: any) => {
        if (data) {
            data.genres.forEach((g: IItem) => {
                generos.push(g);
            });
        }
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

export interface IFilter {
    searchTerm: string;
    genero: string;
    page: number;
    sort: string;
    pessoa: string;
    dataInicial: Date | null;
    dataFinal: Date | null;
    voteCount: number;
    keyword: string;
    tipoBusca: string;
}

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

    let url = '';
    let params: any = {};

    if (searchTerm) {
        // Pesquisa por termo
        url = 'http://localhost:3001/descobrirByKeyword';
        params = {
            keyword: searchTerm,
            page: page,
        };
    } else {
        // Pesquisa avançada
        url = 'http://localhost:3001/descobrir';
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

    /*await axios
        .get(url, {
            params: params,
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
        });*/

    console.log(movies);
    return movies;
};

export const getMoviesByKeyword = async (keyword: string) => {
    var movies: ISelectOption[] = [];

    if (keyword.length < 2) {
        return movies;
    }

    await getFetch('http://localhost:3001/moviesByKeyword', {
        keyword: keyword,
    }).then((data: any) => {
        if (data) {
            data.forEach((movie: { id: number; title: string }) => {
                movies.push({ value: movie.id, label: movie.title });
            });
        }
    });

    /*await axios
        .get('http://localhost:3001/moviesByKeyword', {
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
        });*/

    return movies;
};

export const getPeopleByKeyword = async (keyword: string) => {
    var people: { value: number; label: string }[] = [];

    if (keyword.length < 2) {
        return people;
    }

    await getFetch('http://localhost:3001/peopleByKeyword', {
        keyword: keyword,
    }).then((data: any) => {
        if (data) {
            data.forEach((person: { id: number; name: string }) => {
                people.push({ value: person.id, label: person.name });
            });
        }
    });

    /*await axios
        .get('http://localhost:3001/peopleByKeyword', {
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
        });*/

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

export const getMovieDetails = async (
    id: number
): Promise<IMovie | undefined> => {
    let movie: IMovie | undefined = undefined;

    await getFetch('http://localhost:3001/movie', {
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

    await getFetch('http://localhost:3001/reviews', {
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

export interface ICastMembers {
    cast: ICastMember[] | null;
    directors: string;
}

export const getCastMembers = async (
    movieId: number
): Promise<ICastMembers | null> => {
    let castMembers: ICastMembers = { cast: null, directors: '' };

    await getFetch('http://localhost:3001/movieCast', {
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

    await getFetch('http://localhost:3001/watchProviders', {
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

    await getFetch('http://localhost:3001/trending').then((data: any) => {
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

    await getFetch('http://localhost:3001/similarMovies', {
        movieId: movieId,
    }).then((data: any) => {
        if (data && data.length > 0) {
            movies = data;
        }
    });

    return movies;
};

export interface IKeyword {
    id: number;
    name: string;
}

export const getMovieKeywords = async (
    movieId: number
): Promise<IKeyword[] | null> => {
    let keywords: IKeyword[] | null = null;

    await getFetch('http://localhost:3001/movieKeywords', {
        movieId: movieId,
    }).then((data: any) => {
        if (data && data.length > 0) {
            keywords = data;
        }
    });

    return keywords;
};

export interface IPerson {
    id: number;
    name: string;
}

export interface ISelectOption {
    value: number;
    label: string;
}

export const getPeopleByID = async (
    peopleIds: string
): Promise<ISelectOption[]> => {
    let people: ISelectOption[] = [];

    await getFetch('http://localhost:3001/people', {
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

export interface IVideo {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: Date;
    id: string;
}

export interface IVideos {
    trailers: IVideo[];
    clips: IVideo[];
    behindTheScenes: IVideo[];
    featurettes: IVideo[];
    teasers: IVideo[];
    others: IVideo[];
}

export const getVideos = async (
    movieId: number,
    language: string
): Promise<IVideos | null> => {
    let videos: IVideos | null = null;

    await getFetch('http://localhost:3001/videos', {
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
