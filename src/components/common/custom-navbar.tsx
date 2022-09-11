import "../../styles/main.css";
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBIcon,
    MDBInputGroup,
} from "mdb-react-ui-kit";
import { getMoviesByKeyword } from "../../scripts/requests";
import { components, DropdownIndicatorProps, SingleValue } from "react-select";
import { ISelectOption } from "../../utils/interfaces";
import CustomAsyncSelect from "../search/filter/custom-async-select";

const CustomNavbar = () => {
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

    const searchClick = (movie: SingleValue<ISelectOption>) => {
        if (!movie) {
            return;
        }

        if (movie.value > 0) {
            window.location.href = `http://localhost:3000/MovieFinder/movie/${movie.value}`;
        } else {
            const term = movie.label
                .replace('Pesquisar por "', "")
                .replace('"...', "");
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
                    <CustomAsyncSelect
                        placeholder="Pesquisar..."
                        loadOptions={movieOptions}
                        zIndex={20}
                        isMulti={false}
                        components={{ DropdownIndicator }}
                        containerStyle={{
                            minWidth: "400px",
                            maxWidth: "500px",
                        }}
                        inputStyle={{
                            cursor: "text",
                        }}
                        dropdownIndicatorStyle={{
                            cursor: "pointer",
                        }}
                        onChange={(movie) => {
                            searchClick(movie as SingleValue<ISelectOption>);
                        }}
                    />
                </MDBInputGroup>
            </MDBContainer>
        </MDBNavbar>
    );
};

export default CustomNavbar;
