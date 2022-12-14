import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/filter.css";
import "../../../styles/main.css";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBRow,
    MDBCol,
    MDBCollapse,
    MDBRange,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import {
    getGeneros,
    getPeopleByKeyword,
    getPeopleByID,
} from "../../../scripts/requests";
import { useActions } from "../../../hooks/useActions";
import {
    IFilter,
    ISelectItems,
    ISelectOption,
} from "../../../utils/interfaces";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import pt from "date-fns/locale/pt";
import { useNavigate } from "react-router-dom";
import { sortOptions } from "../../../utils/constants";
import { dataAAAAMMDD, formatDate } from "../../../utils/helpers";
import Tooltip from "../../common/tooltip";
import CustomSelect from "./custom-select";
import CustomAsyncSelect from "./custom-async-select";
import { MultiValue, SingleValue } from "react-select";

registerLocale("pt", pt);

interface IFiltro {
    filterState: IFilter;
    setFilterState: React.Dispatch<React.SetStateAction<IFilter>>;
}

const Filter: React.FC<IFiltro> = ({ filterState, setFilterState }) => {
    const [generos, setGeneros] = useState<ISelectItems>([]);
    const [pessoa, setPessoa] = useState<ISelectOption[]>([]);
    const [genero, setGenero] = useState<ISelectOption[]>([]);
    const [sort, setSort] = useState<ISelectOption>(sortOptions[4]);
    const [dataInicial, setDataInicial] = useState<Date | null>(null);
    const [dataFinal, setDataFinal] = useState<Date | null>(null);
    const [voteCount, setVoteCount] = useState(100);
    const [isDataInicialOpen, setIsDataInicialOpen] = useState(false);
    const [isDataFinalOpen, setIsDataFinalOpen] = useState(false);
    const [showAdvancedSearch, setAdvancedSearch] = useState(false);
    const [urlParams] = useState(new URLSearchParams(window.location.search));
    const { searchMovies } = useActions();

    useEffect(() => {
        if (urlParams.toString()) {
            let param = urlParams.get("pessoaParam");
            if (param) {
                const fetchPeople = async (p: string) => {
                    setPessoa(await getPeopleByID(p));
                };

                fetchPeople(param);
            }

            param = urlParams.get("dtiniParam");
            if (param) {
                setDataInicial(new Date(param));
            }

            param = urlParams.get("dtfimParam");
            if (param) {
                setDataFinal(new Date(param));
            }

            param = urlParams.get("voteCount");
            if (param) {
                setVoteCount(parseInt(param));
            }

            param = urlParams.get("ordemParam");
            if (param) {
                setSort(sortOptions[parseInt(param)]);
            }
        }

        const fetchGeneros = async () => {
            setGeneros(await getGeneros());
        };

        fetchGeneros();
    }, []);

    useEffect(() => {
        if (urlParams.toString()) {
            let param = urlParams.get("generoParam");
            if (param) {
                let arrayGeneros = param.split(",");
                let genres: ISelectOption[] = [];

                generos.forEach((g) => {
                    if (arrayGeneros.includes(g.id.toString())) {
                        genres.push({ value: g.id, label: g.name });
                    }
                });

                setGenero(genres);
            }

            procuraFilmes(false);
        }
    }, [generos]);

    let navigate = useNavigate();

    const procuraFilmes = (newSearch: boolean) => {
        let searchParams: IFilter;

        if (newSearch) {
            searchParams = {
                searchTerm: "",
                genero: getIds(genero),
                page: 1,
                sort: sort.value.toString(),
                pessoa: getIds(pessoa),
                dataInicial: dataInicial,
                dataFinal: dataFinal,
                voteCount: voteCount,
                keyword: "",
                tipoBusca: "Busca personalizada",
            };
        } else {
            let filters: IFilter = {
                searchTerm: "",
                genero: "",
                page: 1,
                sort: "4",
                pessoa: "",
                dataInicial: null,
                dataFinal: null,
                voteCount: 100,
                keyword: "",
                tipoBusca: "Busca personalizada",
            };

            let param = urlParams.get("searchTerm");
            if (param) {
                filters.searchTerm = param;
            }

            param = urlParams.get("page");
            if (param) {
                filters.page = parseInt(param);
            }

            // Se ta procurando por um termo, deve desconsiderar esses outros par??metros
            if (!filters.searchTerm) {
                param = urlParams.get("pessoaParam");
                if (param) {
                    filters.pessoa = param;
                }

                param = urlParams.get("dtiniParam");
                if (param) {
                    filters.dataInicial = new Date(param);
                }

                param = urlParams.get("dtfimParam");
                if (param) {
                    filters.dataFinal = new Date(param);
                }

                param = urlParams.get("voteCount");
                if (param) {
                    filters.voteCount = parseInt(param);
                }

                param = urlParams.get("ordemParam");
                if (param) {
                    filters.sort =
                        sortOptions[parseInt(param)].value.toString();
                }

                param = urlParams.get("generoParam");
                if (param) {
                    filters.genero = param;
                }

                param = urlParams.get("keyword");
                if (param) {
                    filters.keyword = param;
                }
            }

            searchParams = {
                searchTerm: filters.searchTerm,
                genero: filters.genero,
                page: filters.page,
                sort: filters.sort,
                pessoa: filters.pessoa,
                dataInicial: filters.dataInicial,
                dataFinal: filters.dataFinal,
                voteCount: filters.voteCount,
                keyword: filters.keyword,
                tipoBusca: "Busca personalizada",
            };
        }

        searchMovies(searchParams);
        setFilterState(searchParams);
    };

    const buscarClick = async () => {
        let search = `?ordemParam=${sort.value}`;

        if (genero.length > 0) {
            search += `&generoParam=${getIds(genero)}`;
        }

        if (pessoa.length > 0) {
            search += `&pessoaParam=${getIds(pessoa)}`;
        }

        if (dataInicial) {
            search += `&dtiniParam=${dataAAAAMMDD(dataInicial)}`;
        }

        if (dataFinal) {
            search += `&dtfimParam=${dataAAAAMMDD(dataFinal)}`;
        }

        if (voteCount) {
            search += `&voteCount=${voteCount}`;
        }

        search += `&page=${1}`;

        navigate(
            {
                search: search,
            },
            { replace: true }
        );

        procuraFilmes(true);
    };

    const getIds = (values: ISelectOption[]): string => {
        let result = "";

        values.forEach((v) => {
            if (result !== "") {
                result += ",";
            }

            result += v.value;
        });

        return result;
    };

    const onGeneroChange = (values: MultiValue<ISelectOption>) => {
        var newGeneros: ISelectOption[] = [];

        values.forEach((e) => {
            newGeneros.push(e);
        });

        setGenero(newGeneros);
    };

    const onPessoaChange = (values: MultiValue<ISelectOption>) => {
        var newPessoas: ISelectOption[] = [];

        values.forEach((e) => {
            newPessoas.push(e);
        });

        setPessoa(newPessoas);
    };

    const onSortChange = (value: SingleValue<ISelectOption>) => {
        if (value) {
            setSort(value);
        }
    };

    const getGeneroOptions = () => {
        var generosOptions: ISelectOption[] = [];

        generos.map((genero) =>
            generosOptions.push({ value: genero.id, label: genero.name })
        );

        return generosOptions;
    };

    var peopleTimeout: NodeJS.Timeout;

    const peopleOptions = (keyword: string) =>
        new Promise<any[]>((resolve) => {
            clearTimeout(peopleTimeout);

            peopleTimeout = setTimeout(() => {
                resolve(getPeopleByKeyword(keyword));
            }, 500);
        });

    const handleDataInicialChange = (e: Date) => {
        setIsDataInicialOpen(!isDataInicialOpen);
        setDataInicial(e);
    };

    const handleDataFinalChange = (e: Date) => {
        setIsDataFinalOpen(!isDataFinalOpen);
        setDataFinal(e);
    };

    const handleDataInicialClick = (e: any) => {
        e.preventDefault();
        setIsDataInicialOpen(!isDataInicialOpen);
    };

    const handleDataFinalClick = (e: any) => {
        e.preventDefault();
        setIsDataFinalOpen(!isDataFinalOpen);
    };

    const dateStr = (placeHolder: string, data: Date | null): string => {
        if (data) {
            return `${placeHolder}: ${formatDate(data)}`;
        }

        return placeHolder;
    };

    return (
        <div className="centralizar">
            <MDBCard
                className="p-1 m-3 filterCard transparentBG-noHover"
                style={{ maxWidth: "1024px", width: "1024px" }}
            >
                <MDBCardBody>
                    <MDBCollapse show={showAdvancedSearch} className="mb-3">
                        <MDBRow className="ms-0 text-info">Ordena????o</MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <CustomSelect
                                    placeholder="Ordena????o"
                                    options={sortOptions}
                                    value={sortOptions[sort.value]}
                                    zIndex={10}
                                    onChange={(value) =>
                                        onSortChange(
                                            value as SingleValue<ISelectOption>
                                        )
                                    }
                                />
                            </MDBCol>
                            <MDBCol md="auto" center>
                                <Tooltip tip="Ordena????o dos filmes" />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="ms-0 text-info">G??nero</MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <CustomSelect
                                    placeholder="Todos os g??neros"
                                    options={getGeneroOptions()}
                                    value={genero}
                                    zIndex={9}
                                    isMulti
                                    onChange={(values) =>
                                        onGeneroChange(
                                            values as MultiValue<ISelectOption>
                                        )
                                    }
                                />
                            </MDBCol>
                            <MDBCol md="auto" center>
                                <Tooltip tip="Ser??o retornados apenas os filmes que possuem todos os g??neros selecionados" />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="ms-0 text-info">Atores</MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <CustomAsyncSelect
                                    placeholder="Digite um nome..."
                                    loadOptions={peopleOptions}
                                    value={pessoa}
                                    zIndex={8}
                                    isMulti={true}
                                    onChange={(values) =>
                                        onPessoaChange(
                                            values as MultiValue<ISelectOption>
                                        )
                                    }
                                />
                            </MDBCol>
                            <MDBCol md="auto" center>
                                <Tooltip tip="Ser??o retornados apenas os filmes em que todas as pessoas selecionadas participaram" />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="ms-0 text-info">
                            Data de lan??amento
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <span id="data">
                                    <MDBBtn
                                        noRipple
                                        type="submit"
                                        color="info"
                                        onClick={handleDataInicialClick}
                                        className="mt-1 me-2 active"
                                    >
                                        {dateStr("Data inicial", dataInicial)}
                                    </MDBBtn>
                                    <MDBBtn
                                        noRipple
                                        href="#"
                                        color="none"
                                        floating
                                        onClick={() => setDataInicial(null)}
                                    >
                                        <MDBIcon
                                            far
                                            color="white"
                                            icon="trash-alt"
                                        />
                                    </MDBBtn>
                                    {isDataInicialOpen && (
                                        <DatePicker
                                            selected={dataInicial}
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            locale="pt"
                                            dateFormat="dd/MM/yyyy"
                                            startOpen
                                            withPortal
                                            maxDate={new Date()}
                                            onChange={handleDataInicialChange}
                                            onCalendarClose={() => {
                                                setIsDataInicialOpen(false);
                                            }}
                                            customInput={<span />}
                                        />
                                    )}
                                </span>
                                <span id="data">
                                    <MDBBtn
                                        noRipple
                                        type="submit"
                                        color="info"
                                        onClick={handleDataFinalClick}
                                        className="mt-1 me-2 active"
                                    >
                                        {dateStr("Data final", dataFinal)}
                                    </MDBBtn>
                                    <MDBBtn
                                        noRipple
                                        href="#"
                                        color="none"
                                        floating
                                        onClick={() => setDataFinal(null)}
                                    >
                                        <MDBIcon
                                            far
                                            color="white"
                                            icon="trash-alt"
                                        />
                                    </MDBBtn>
                                    {isDataFinalOpen && (
                                        <DatePicker
                                            selected={dataFinal}
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            locale="pt"
                                            dateFormat="dd/MM/yyyy"
                                            startOpen
                                            withPortal
                                            maxDate={new Date()}
                                            onChange={handleDataFinalChange}
                                            onCalendarClose={() => {
                                                setIsDataFinalOpen(false);
                                            }}
                                            customInput={<span />}
                                        />
                                    )}
                                </span>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <MDBRange
                                    color="white"
                                    className="mb-2 text-white"
                                    defaultValue={100}
                                    min="0"
                                    max="1000"
                                    step="50"
                                    label="Avalia????es"
                                    labelClass="rangeLabel text-info ms-0"
                                    value={voteCount}
                                    onChange={(e) =>
                                        setVoteCount(parseInt(e.target.value))
                                    }
                                />
                            </MDBCol>
                            <MDBCol md="auto" center>
                                <Tooltip tip="Quantidade m??nima de avalia????es de usu??rio" />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <div className="centralizar mt-2">
                                <MDBBtn
                                    type="submit"
                                    color="info"
                                    className="active"
                                    onClick={buscarClick}
                                >
                                    Buscar
                                </MDBBtn>
                            </div>
                        </MDBRow>
                    </MDBCollapse>
                    <div className="d-grid gap-2">
                        <MDBBtn
                            outline
                            onClick={() =>
                                setAdvancedSearch(!showAdvancedSearch)
                            }
                            color="white"
                        >
                            <MDBIcon
                                fas
                                icon={
                                    showAdvancedSearch
                                        ? "chevron-up"
                                        : "chevron-down"
                                }
                                className="me-2"
                            />
                            Pesquisa avan??ada
                            <MDBIcon
                                fas
                                icon={
                                    showAdvancedSearch
                                        ? "chevron-up"
                                        : "chevron-down"
                                }
                                className="ms-2"
                            />
                        </MDBBtn>
                    </div>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
};

export default Filter;
