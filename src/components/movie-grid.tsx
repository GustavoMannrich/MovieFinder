import "../styles/main.css";
import "../styles/movie-grid.css";
import { MDBRow, MDBCol, MDBContainer, MDBSpinner } from "mdb-react-ui-kit";
import Movie from "./movie-card";
import { useTypedSelector } from "../hooks/useTypedSelector";
import Alert from "react-bootstrap/Alert";
import { IFilter } from "./content";
import { useEffect } from "react";
import CustomPagination from "./custom-pagination";

interface IFiltro {
    filterState: IFilter;
    setFilterState: React.Dispatch<React.SetStateAction<IFilter>>;
}

const MovieGrid: React.FC<IFiltro> = ({ filterState, setFilterState }) => {
    const { data, error, loading } = useTypedSelector(
        (state) => state.repositories
    );

    useEffect(() => {
        setFilterState({
            genero: filterState.genero,
            adulto: filterState.adulto,
            sort: filterState.sort,
            pessoa: filterState.pessoa,
            dataInicial: filterState.dataInicial,
            dataFinal: filterState.dataFinal,
            voteCount: filterState.voteCount,
        });
    }, [data]);

    return (
        <div>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading && (
                <div className="centralizar">
                    <MDBSpinner role="status" color="dark">
                        <span className="visually-hidden">Loading...</span>
                    </MDBSpinner>
                </div>
            )}
            {!error && !loading && (
                <MDBContainer fluid>
                    {data.movie_details && data.movie_details.length > 0 && (
                        <>
                            <CustomPagination
                                filterState={filterState}
                                setFilterState={setFilterState}
                            />
                            <MDBRow className="col-12  g-3 m-0">
                                {data.movie_details.map((movie) => (
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
                                ))}
                            </MDBRow>
                            <CustomPagination
                                filterState={filterState}
                                setFilterState={setFilterState}
                            />
                        </>
                    )}
                    {(!data.movie_details ||
                        data.movie_details.length === 0) && (
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
