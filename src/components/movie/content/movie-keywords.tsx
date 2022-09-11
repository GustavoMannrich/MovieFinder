import "../../../styles/main.css";
import { MDBContainer, MDBBtn } from "mdb-react-ui-kit";
import { getMovieKeywords } from "../../../scripts/requests";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IKeyword } from "../../../utils/interfaces";

interface IMovieKeywordsProps {
    movieId: number;
}

const MovieKeywords = ({ movieId }: IMovieKeywordsProps) => {
    const [movieKeywords, setMovieKeywords] = useState<IKeyword[] | null>(null);

    useEffect(() => {
        if (movieId > 0) {
            const fetchMovieKeywords = async () => {
                setMovieKeywords(await getMovieKeywords(movieId));
            };

            fetchMovieKeywords();
        }
    }, [movieId]);

    return (
        <>
            {movieKeywords && (
                <MDBContainer className="mt-4" style={{ height: "auto" }}>
                    <h2 className="text-info">Palavras-chave</h2>
                    {movieKeywords.map((k, index) => (
                        <Link
                            to={`/MovieFinder?keyword=${k.id}`}
                            onClick={window.location.reload}
                        >
                            <MDBBtn
                                rounded
                                className="m-2 ms-0 transparentBG active"
                                color="info"
                                key={index}
                            >
                                {k.name}
                            </MDBBtn>
                        </Link>
                    ))}
                </MDBContainer>
            )}
        </>
    );
};

export default MovieKeywords;
