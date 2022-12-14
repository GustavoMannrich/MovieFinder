import "../../../styles/main.css";
import "../../../styles/movie-grid.css";
import { MDBRow, MDBCol, MDBContainer, MDBSpinner } from "mdb-react-ui-kit";
import Movie from "./movie-card";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import Alert from "react-bootstrap/Alert";
import { IFilter, IMovieDetails } from "../../../utils/interfaces";
import CustomPagination from "./custom-pagination";

interface IFiltro {
    filterState: IFilter;
    setFilterState: React.Dispatch<React.SetStateAction<IFilter>>;
}

const MovieGrid: React.FC<IFiltro> = ({ filterState, setFilterState }) => {
    const { data, error, loading } = useTypedSelector(
        (state) => state.repositories
    );

    return (
        <div>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading && (
                <div className="centralizar">
                    <MDBSpinner role="status" color="white">
                        <span className="visually-hidden">Carregando...</span>
                    </MDBSpinner>
                </div>
            )}
            {!error && !loading && (
                <MDBContainer fluid>
                    {data.movie_details && data.movie_details.length > 0 && (
                        <>
                            {filterState.tipoBusca ===
                                "Busca personalizada" && (
                                <CustomPagination filterState={filterState} />
                            )}
                            <MDBRow className="col-12  g-3 m-0">
                                {data.movie_details.map(
                                    (movie: IMovieDetails) => (
                                        <MDBCol key={movie.id}>
                                            <Movie
                                                name={movie.title}
                                                imageSRC={movie.poster_path}
                                                releaseDate={movie.release_date}
                                                budget={movie.budget}
                                                revenue={movie.revenue}
                                                rating={movie.vote_average}
                                                tagline={movie.tagline}
                                                id={movie.id}
                                            />
                                        </MDBCol>
                                    )
                                )}
                            </MDBRow>
                            {filterState.tipoBusca ===
                                "Busca personalizada" && (
                                <CustomPagination filterState={filterState} />
                            )}
                        </>
                    )}
                    {data.movie_details &&
                        data.movie_details.length === 0 &&
                        filterState.tipoBusca && (
                            <div className="centralizar text-white">
                                <p>Nenhum filme encontrado</p>
                            </div>
                        )}
                </MDBContainer>
            )}
        </div>
    );
};

export default MovieGrid;
