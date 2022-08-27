import '../styles/content.css';
import '../styles/main.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IMovie, getMovieDetails } from '../scripts/requests';

const MoviePage = () => {
    const [movie, setMovie] = useState<IMovie | null>(null);
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

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (movieID && isNumber(movieID)) {
                setMovie(await getMovieDetails(parseInt(movieID)));
            }
        };

        fetchMovieDetails();
    }, [movieID]);

    return (
        <>
            <div className="bg-image">
                {movie && movie.backdrop_path && (
                    <img
                        className="fullscreenImage"
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt="Background"
                    />
                )}
                <div
                    className="mask"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
                >
                    {movie && (
                        <div className="text-white m-5">
                            <h1>{movie.title}</h1>
                            {movie.tagline && (
                                <h4 style={{ fontStyle: 'italic' }}>
                                    "{movie.tagline}"
                                </h4>
                            )}
                            {movie.poster_path && (
                                <img
                                    src={
                                        'https://image.tmdb.org/t/p/w500' +
                                        movie.poster_path
                                    }
                                    className="img-fluid shadow-4 m-3"
                                    alt="Pôster do filme"
                                    style={{ maxHeight: '275px' }}
                                />
                            )}
                            <p>{movie.overview}</p>
                            <p>Duração: {movie.runtime} minutos</p>

                            <>
                                {movie.genres.map((g) => (
                                    <span className="me-3 text-info" key={g.id}>
                                        {g.name}
                                    </span>
                                ))}
                            </>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default MoviePage;
