export interface ISelectItem {
    id: number;
    name: string;
}

export interface ISelectItems extends Array<ISelectItem> {}

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

export interface IMovieDetails {
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

interface IGenre {
    id: number;
    name: string;
}

interface IMovieProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

interface IMovieProductionCountry {
    iso_3166_1: string;
    name: string;
}

interface IMovieSpokenLanguage {
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
    poster_path: string;
    production_companies: IMovieProductionCompany[];
    production_countries: IMovieProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: IMovieSpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface IReviewAuthorDetails {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
}

export interface IReview {
    author: string;
    author_details: IReviewAuthorDetails;
    content: string;
    created_at: Date;
    id: string;
    updated_at: Date;
    url: string;
}

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

export interface IWatchProvider {
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

export interface IKeyword {
    id: number;
    name: string;
}

export interface IPerson {
    id: number;
    name: string;
}

export interface ISelectOption {
    value: number;
    label: string;
}

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
