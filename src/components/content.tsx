import '../styles/content.css';
import '../styles/main.css';
import Filter from './filter';
import MovieGrid from './movie-grid';
import { useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useEffect } from 'react';
import { useActions } from '../hooks/useActions';
import { IFilter } from '../scripts/requests';

const Content = () => {
    const { searchMovies } = useActions();
    const [filterState, setfilterState] = useState<IFilter>({
        genero: '',
        adulto: false,
        page: 1,
        sort: '4',
        pessoa: '',
        dataInicial: null,
        dataFinal: null,
        voteCount: 100,
        tipoBusca: '',
    });

    const { data } = useTypedSelector((state) => state.repositories);

    useEffect(() => {
        // Se passar null, retorna as tendências da semana
        searchMovies(null);

        setfilterState({
            genero: '',
            adulto: false,
            page: 1,
            sort: '4',
            pessoa: '',
            dataInicial: null,
            dataFinal: null,
            voteCount: 100,
            tipoBusca: 'Tendências da semana',
        });

        console.log(filterState.tipoBusca);
    }, []);

    return (
        <div className="content-main">
            <div className="bg-image">
                <img
                    className="fullscreenImage"
                    src={
                        'https://image.tmdb.org/t/p/original/sfw4m2tOgQRzhF6VXxaXGfd1vX.jpg'
                    }
                    alt="plano de fundo"
                    style={{
                        filter: 'brightness(0.2)',
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
                    <h2
                        className="centralizar text-info"
                        style={{ zIndex: 20, height: '50px', width: '100%' }}
                    >
                        {filterState.tipoBusca}
                    </h2>
                )}
                {filterState.tipoBusca === 'Busca personalizada' &&
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
