import {
    MDBRow,
    MDBPagination,
    MDBPaginationItem,
    MDBPaginationLink,
} from 'mdb-react-ui-kit';
import { useActions } from '../hooks/useActions';
import { IFilter } from './content';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface IFiltro {
    filterState: IFilter;
    setFilterState: React.Dispatch<React.SetStateAction<IFilter>>;
}

const CustomPagination: React.FC<IFiltro> = ({
    filterState,
    setFilterState,
}) => {
    const { searchMovies } = useActions();

    const { data } = useTypedSelector((state) => state.repositories);

    const isActive = (thisPage: number): boolean => {
        return thisPage === data.page;
    };

    const setPage = (newPage: number) => {
        searchMovies(
            filterState.genero,
            filterState.adulto,
            newPage,
            filterState.sort,
            filterState.pessoa,
            filterState.dataInicial,
            filterState.dataFinal,
            filterState.voteCount
        );
    };

    const getPageNumber = (index: number): number => {
        // para não deixar passar da última página
        if (data.total_pages >= 5 && data.page + 2 > data.total_pages) {
            return data.total_pages + (index - 5);
        }

        // A soma pode ir de -2 até +2
        let soma = -3 + index;

        // para não deixar passar da primeira página
        if (data.page + soma <= index) {
            return index;
        }

        return data.page + soma;
    };

    const createPageNumbers = () => {
        let numberOfPages = 5;

        if (data.total_pages < 5) {
            numberOfPages = data.total_pages;
        }

        const pageNumbers = Array.from(
            { length: numberOfPages },
            (_, index) => {
                const pageClick = () => {
                    let pg = getPageNumber(index + 1);

                    if (!isActive(pg)) {
                        setPage(pg);
                    }
                };

                return (
                    <MDBPaginationItem
                        active={isActive(getPageNumber(index + 1))}
                        onClick={pageClick}
                        key={index}
                    >
                        <MDBPaginationLink className="text-white pageNumber">
                            {getPageNumber(index + 1)}
                        </MDBPaginationLink>
                    </MDBPaginationItem>
                );
            }
        );

        return pageNumbers;
    };

    return (
        <div>
            {data.movie_details.length > 0 && (
                <MDBRow className="mt-3 mr-0">
                    <MDBPagination className="mb-0" center>
                        {data.page > 1 && (
                            <MDBPaginationItem
                                onClick={() =>
                                    setPage(
                                        data.page > 1
                                            ? data.page - 1
                                            : data.page
                                    )
                                }
                            >
                                <MDBPaginationLink className="text-white pageNumber">
                                    Anterior
                                </MDBPaginationLink>
                            </MDBPaginationItem>
                        )}

                        {createPageNumbers()}

                        {data.page < data.total_pages && (
                            <MDBPaginationItem
                                onClick={() =>
                                    setPage(
                                        data.page < data.total_pages
                                            ? data.page + 1
                                            : data.page
                                    )
                                }
                            >
                                <MDBPaginationLink className="text-white pageNumber">
                                    Próximo
                                </MDBPaginationLink>
                            </MDBPaginationItem>
                        )}
                    </MDBPagination>
                </MDBRow>
            )}
        </div>
    );
};

export default CustomPagination;
