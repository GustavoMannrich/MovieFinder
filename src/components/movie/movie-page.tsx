import '../../styles/main.css';
import { MDBSpinner } from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    IMovie,
    getMovieDetails,
    ICastMembers,
    getCastMembers,
} from '../../scripts/requests';
import WatchProviders from './content/watch-providers';
import CastMembers from './content/cast-members';
import SimilarMovies from './content/similar-movies';
import Videos from './content/videos';
import Reviews from './content/reviews';
import MovieKeywords from './content/movie-keywords';
import MovieDetails from './content/movie-details';

const MoviePage = () => {
    const [movie, setMovie] = useState<IMovie | null | undefined>(null);
    const [castMembers, setCastMembers] = useState<ICastMembers | null>(null);
    const { movieID } = useParams();

    const isNumber = (str: string): boolean => {
        if (typeof str !== 'string') {
            return false;
        }

        if (str.trim() === '') {
            return false;
        }

        return !Number.isNaN(Number(str));
    };

    const getMovieId = (): number => {
        if (!movieID || !isNumber(movieID)) {
            return 0;
        }

        return parseInt(movieID);
    };

    useEffect(() => {
        const mId = getMovieId();

        if (mId > 0) {
            const fetchMovieDetails = async () => {
                setMovie(await getMovieDetails(mId));
            };

            const fetchMovieCast = async () => {
                setCastMembers(await getCastMembers(mId));
            };

            fetchMovieDetails();
            fetchMovieCast();
        }
    }, [movieID]);

    useEffect(() => {
        // Garante que vai mostrar a parte de cima da página
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="content-main">
                <div className="bg-image">
                    {movie && movie.backdrop_path && (
                        <img
                            className="fullscreenImage"
                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            alt="plano de fundo"
                            style={{
                                filter: 'brightness(0.2)',
                            }}
                        />
                    )}
                </div>
                <div
                    className="content moviepage"
                    style={{
                        /*backgroundColor: 'rgba(0, 0, 0, 0.75)',*/
                        zIndex: 10,
                    }}
                >
                    <div className="text-white">
                        {movie && !movie.adult && (
                            <div className="text-white m-4">
                                <MovieDetails
                                    movie={movie}
                                    castMembers={castMembers}
                                ></MovieDetails>
                                <WatchProviders
                                    movieId={getMovieId()}
                                ></WatchProviders>
                                <CastMembers
                                    castMembers={castMembers}
                                ></CastMembers>
                                <SimilarMovies
                                    movieId={getMovieId()}
                                ></SimilarMovies>
                                <Videos movieId={getMovieId()}></Videos>
                                <Reviews movieId={getMovieId()}></Reviews>
                                <MovieKeywords
                                    movieId={getMovieId()}
                                ></MovieKeywords>
                            </div>
                        )}
                    </div>
                    {movie === null && (
                        <div className="centralizar text-white mt-5 pt-5">
                            <MDBSpinner role="status" color="white">
                                <span className="visually-hidden">
                                    Carregando...
                                </span>
                            </MDBSpinner>
                        </div>
                    )}
                    {movie === undefined && (
                        <h3 className="centralizar text-white mt-5 pt-5">
                            404 - Filme não encontrado
                        </h3>
                    )}
                </div>
            </div>
        </>
    );
};

export default MoviePage;
