import "../../styles/content.css";
import "../../styles/main.css";
import Filter from "./filter/filter";
import MovieGrid from "./movieSearch/movie-grid";
import { useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { IFilter } from "../../utils/interfaces";

const Content = () => {
    const { searchMovies } = useActions();
    const [filterState, setfilterState] = useState<IFilter>({
        searchTerm: "",
        genero: "",
        page: 1,
        sort: "4",
        pessoa: "",
        dataInicial: null,
        dataFinal: null,
        voteCount: 100,
        keyword: "",
        tipoBusca: "",
    });

    const { data } = useTypedSelector((state) => state.repositories);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (!urlParams.toString()) {
            // Se passar null, retorna as tendências da semana
            searchMovies(null);

            setfilterState({
                searchTerm: "",
                genero: "",
                page: 1,
                sort: "4",
                pessoa: "",
                dataInicial: null,
                dataFinal: null,
                voteCount: 100,
                keyword: "",
                tipoBusca: "Tendências da semana",
            });
        }
    }, []);

    return (
        <div className="content-main">
            <div className="bg-image">
                <img
                    className="fullscreenImage"
                    src={
                        "https://image.tmdb.org/t/p/original/sfw4m2tOgQRzhF6VXxaXGfd1vX.jpg"
                    }
                    alt="plano de fundo"
                    style={{
                        filter: "brightness(0.2)",
                        zIndex: -1,
                    }}
                />
            </div>
            <div className="content">
                <Filter
                    filterState={filterState}
                    setFilterState={setfilterState}
                ></Filter>
                {filterState.tipoBusca && (
                    <h1
                        className="centralizar text-info"
                        style={{ zIndex: 20, height: "50px", width: "100%" }}
                    >
                        {filterState.tipoBusca}
                    </h1>
                )}
                {filterState.tipoBusca === "Busca personalizada" &&
                    data.total_results > 0 && (
                        <span className="centralizar text-white">
                            {data.total_results} resultados
                        </span>
                    )}
                <MovieGrid
                    filterState={filterState}
                    setFilterState={setfilterState}
                ></MovieGrid>
            </div>
        </div>
    );
};

export default Content;
