import '../../../styles/main.css';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardText,
} from 'mdb-react-ui-kit';
import { IMovie, getSimilarMovies } from '../../../scripts/requests';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface ISimilarMoviesProps {
    movieId: number;
}

const SimilarMovies = ({ movieId }: ISimilarMoviesProps) => {
    const [similarMovies, setSimilarMovies] = useState<IMovie[] | null>(null);

    useEffect(() => {
        if (movieId > 0) {
            const fetchSimilarMovies = async () => {
                setSimilarMovies(await getSimilarMovies(movieId));
            };

            fetchSimilarMovies();
        }
    }, [movieId]);

    return (
        <>
            {similarMovies && (
                <MDBContainer className="mt-3">
                    <h2 className="text-info">Filmes recomendados</h2>
                    <MDBRow className="ms-0 me-0">
                        {similarMovies.map((m, index) => (
                            <MDBCol key={index} sm="2" className="p-1 ps-0">
                                <Link
                                    to={`/MovieFinder/movie/${m.id}`}
                                    onClick={window.location.reload}
                                >
                                    <MDBCard
                                        alignment="center"
                                        className="popup"
                                    >
                                        {m.poster_path && (
                                            <MDBCardImage
                                                src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                                                alt={`Poster do filme ${m.title}`}
                                                position="top"
                                            />
                                        )}
                                        <MDBCardBody className="p-1">
                                            <MDBCardText>
                                                <small>
                                                    <span className="text-white m-0">
                                                        {m.title}
                                                    </span>
                                                    <br />
                                                    <span className="text-warning m-0">
                                                        <MDBIcon
                                                            far
                                                            icon="star"
                                                            className="me-2"
                                                        />
                                                        {m.vote_average.toFixed(
                                                            1
                                                        )}
                                                    </span>
                                                </small>
                                            </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCard>
                                </Link>
                            </MDBCol>
                        ))}
                    </MDBRow>
                </MDBContainer>
            )}
        </>
    );
};

export default SimilarMovies;
