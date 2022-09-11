import "../../../styles/main.css";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBIcon,
} from "mdb-react-ui-kit";
import { IMovie, ICastMembers } from "../../../utils/interfaces";
import { Link } from "react-router-dom";
import {
    convertMinutes,
    formatDateStr,
    priceSplitter,
} from "../../../utils/helpers";
import Tooltip from "../../common/tooltip";

interface IMovieDetailsProps {
    movie: IMovie;
    castMembers: ICastMembers | null;
}

const MovieDetails = ({ movie, castMembers }: IMovieDetailsProps) => {
    let languageNames = new Intl.DisplayNames(["pt-BR"], { type: "language" });

    return (
        <>
            <MDBContainer>
                <MDBRow center>
                    <MDBCol size="md-2 me-4 centralizar">
                        {movie.poster_path && (
                            <img
                                src={
                                    "https://image.tmdb.org/t/p/w500" +
                                    movie.poster_path
                                }
                                className="img-fluid rounded shadow-4 m-3"
                                alt={`Poster de ${movie.title}`}
                                style={{
                                    maxHeight: "275px",
                                }}
                            />
                        )}
                        {!movie.poster_path && (
                            <img
                                src="/PosterNotFound.jpg"
                                className="img-fluid rounded shadow-4 m-3"
                                alt="Poster não encontrado"
                                style={{
                                    maxHeight: "275px",
                                }}
                            />
                        )}
                    </MDBCol>
                    <MDBCol size="md">
                        <h1 className="text-info">
                            <span>{movie.title}</span>
                        </h1>
                        {movie.tagline && (
                            <h4
                                style={{
                                    fontStyle: "italic",
                                }}
                            >
                                "{movie.tagline}"
                            </h4>
                        )}
                        <p>{movie.overview}</p>
                        <MDBRow>
                            <MDBCol sm="auto" className="mb-1">
                                <Tooltip
                                    tip={`${movie.vote_count} avaliações`}
                                    placement="top"
                                    wrapperProps={{ className: "fake-link" }}
                                >
                                    <span className="text-warning bold">
                                        <MDBIcon
                                            far
                                            icon="star"
                                            className="me-2"
                                        />
                                        {movie.vote_average.toFixed(1)}
                                    </span>
                                </Tooltip>
                            </MDBCol>
                            <MDBCol sm="auto" className="mb-1">
                                <span className="text-info bold">
                                    <MDBIcon
                                        fas
                                        icon="calendar-alt"
                                        className="me-2"
                                    />
                                    {formatDateStr(movie.release_date)}
                                </span>
                            </MDBCol>
                            <MDBCol sm="auto" className="mb-1">
                                <span className="text-info bold">
                                    <MDBIcon
                                        far
                                        icon="clock"
                                        className="me-2"
                                    />
                                    {convertMinutes(movie.runtime)}
                                </span>
                            </MDBCol>
                            {castMembers && castMembers.directors && (
                                <MDBCol sm="auto" className="mb-1">
                                    <span className="text-white me-2">
                                        {castMembers.directors.includes(", ")
                                            ? "Diretores:"
                                            : "Diretor:"}
                                    </span>
                                    <span className="text-info bold">
                                        {castMembers.directors}
                                    </span>
                                </MDBCol>
                            )}
                        </MDBRow>
                        <MDBRow>
                            <MDBCol sm="auto" className="mb-1">
                                <span className="me-2">Título original:</span>
                                <span className="text-info bold">
                                    {movie.original_title}
                                </span>
                            </MDBCol>
                            {movie.original_language && (
                                <MDBCol sm="auto" className="mb-1">
                                    <span className="me-2">
                                        Linguagem original:
                                    </span>
                                    <span
                                        className="text-info bold"
                                        style={{
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        {languageNames.of(
                                            movie.original_language
                                        )}
                                    </span>
                                </MDBCol>
                            )}
                            <MDBCol sm="auto" className="mb-1">
                                <span className="text-white me-2">
                                    Orçamento:
                                </span>
                                <span className="text-info bold">
                                    <MDBIcon
                                        fas
                                        icon="dollar-sign"
                                        className="me-2"
                                    />
                                    {movie.budget > 0 &&
                                        priceSplitter(movie.budget)}
                                    {movie.budget <= 0 && "-"}
                                </span>
                            </MDBCol>
                            <MDBCol sm="auto" className="mb-1">
                                <span className="text-white me-2">
                                    Receita:
                                </span>
                                <span className="text-info bold">
                                    <MDBIcon
                                        fas
                                        icon="dollar-sign"
                                        className="me-2"
                                    />
                                    {movie.revenue > 0 &&
                                        priceSplitter(movie.revenue)}
                                    {movie.revenue <= 0 && "-"}
                                </span>
                            </MDBCol>
                        </MDBRow>
                        <div className="mt-2">
                            {movie.genres.map((g, index) => (
                                <Link
                                    to={`/MovieFinder?generoParam=${g.id}`}
                                    onClick={window.location.reload}
                                >
                                    <MDBBtn
                                        rounded
                                        className="m-2 ms-0 transparentBG active"
                                        color="info"
                                        key={index}
                                    >
                                        {g.name}
                                    </MDBBtn>
                                </Link>
                            ))}
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    );
};

export default MovieDetails;
