import '../../styles/main.css';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBIcon,
    MDBInputGroup,
} from 'mdb-react-ui-kit';
import AsyncSelect from 'react-select/async';
import { ISelectOption, getMoviesByKeyword } from '../../scripts/requests';
import { components, DropdownIndicatorProps } from 'react-select';
import { useState } from 'react';

const CustomNavbar = () => {
    const [movies, setMovies] = useState<ISelectOption[] | null>(null);
    var movieTimeout: NodeJS.Timeout;

    const getMoviesSearchArray = async (keyword: string) => {
        if (keyword.length < 2) {
            return [];
        }

        let movies = [
            { value: 0, label: `Pesquisar por "${keyword}"...` },
            ...(await getMoviesByKeyword(keyword)),
        ];

        return movies;
    };

    const searchClick = (movie: any) => {
        if (movie.value > 0) {
            window.location.href = `http://localhost:3000/MovieFinder/movie/${movie.value}`;
        } else {
            const term = movie.label
                .replace('Pesquisar por "', '')
                .replace('"...', '');
            window.location.href = `http://localhost:3000/MovieFinder?searchTerm=${term}&page=1`;
        }
    };

    const movieOptions = (keyword: string) =>
        new Promise<any[]>((resolve) => {
            clearTimeout(movieTimeout);

            movieTimeout = setTimeout(() => {
                resolve(getMoviesSearchArray(keyword));
            }, 500);
        });

    const DropdownIndicator = (props: DropdownIndicatorProps<any>) => {
        return (
            <components.DropdownIndicator {...props}>
                <MDBIcon fas icon="search" />
            </components.DropdownIndicator>
        );
    };

    return (
        <MDBNavbar className="sticky-top darkBackground dark">
            <MDBContainer fluid>
                <MDBNavbarBrand className="text-info ms-2" href="/MovieFinder">
                    <MDBIcon fas icon="film" className="me-2" />
                    <span>Movie Finder</span>
                    <span className="text-white ms-2">do Gugão</span>
                </MDBNavbarBrand>
                <MDBInputGroup tag="form" className="d-flex w-auto mb-1 mt-1">
                    <AsyncSelect
                        placeholder={'Pesquisar...'}
                        noOptionsMessage={() => 'Nada encontrado'}
                        cacheOptions
                        loadOptions={movieOptions}
                        defaultOptions
                        loadingMessage={() => 'Buscando...'}
                        components={{ DropdownIndicator }}
                        styles={{
                            container: (base) => ({
                                ...base,
                                zIndex: 11,
                                minWidth: '400px',
                                maxWidth: '500px',
                            }),
                            menu: (base) => ({
                                ...base,
                                color: 'white',
                                backgroundColor: 'black',
                                border: '2px solid rgb(57, 192, 237)',
                            }),
                            noOptionsMessage: (base) => ({
                                ...base,
                                color: 'white',
                            }),
                            placeholder: (base) => ({
                                ...base,
                                color: 'white',
                            }),
                            option: (base) => ({
                                ...base,
                                ':hover': {
                                    backgroundColor: 'rgba(57, 192, 237, 0.5)',
                                },
                            }),
                        }}
                        onChange={(movie) => {
                            searchClick(movie);
                        }}
                    />
                </MDBInputGroup>
            </MDBContainer>
        </MDBNavbar>
    );
};

export default CustomNavbar;
