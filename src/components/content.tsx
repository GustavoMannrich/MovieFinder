import '../styles/content.css';
import '../styles/main.css';
import Filter from './filter';
import MovieGrid from './movie-grid';
import { useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';

export interface IFilter {
    genero: string;
    adulto: boolean;
    sort: string;
    pessoa: string;
    dataInicial: Date | null;
    dataFinal: Date | null;
    voteCount: number;
}

const Content = () => {
    const [filterState, setfilterState] = useState<IFilter>({
        genero: '',
        adulto: false,
        sort: '4',
        pessoa: '',
        dataInicial: null,
        dataFinal: null,
        voteCount: 100,
    });

    const { data } = useTypedSelector((state) => state.repositories);

    return (
        <div className="content-main">
            <div className="content">
                <Filter
                    filterState={filterState}
                    setFilterState={setfilterState}
                ></Filter>
                {data.total_results > 0 && (
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
