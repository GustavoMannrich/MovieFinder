import 'react-datepicker/dist/react-datepicker.css';
import '../styles/filter.css';
import '../styles/main.css';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBSwitch,
    MDBIcon,
    MDBRow,
    MDBCol,
    MDBTooltip,
    MDBCollapse,
    MDBRange,
} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import {
    IItems,
    getGeneros,
    getMoviesByKeyword,
    getPeopleByKeyword,
} from '../scripts/requests';
import { useActions } from '../hooks/useActions';
import { IFilter } from './content';
import Select, { MultiValue, SingleValue } from 'react-select';
import AsyncSelect from 'react-select/async';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';

registerLocale('pt', pt);

interface IFiltro {
    filterState: IFilter;
    setFilterState: React.Dispatch<React.SetStateAction<IFilter>>;
}

interface ISelectOption {
    value: number;
    label: string;
}

const Filter: React.FC<IFiltro> = ({ filterState, setFilterState }) => {
    const [generos, setGeneros] = useState<IItems>([]);
    const [pessoa, setPessoa] = useState('');
    const [adulto, setAdulto] = useState(false);
    const [genero, setGenero] = useState('');
    const [sort, setSort] = useState('4');
    const [dataInicial, setDataInicial] = useState<Date | null>(null);
    const [dataFinal, setDataFinal] = useState<Date | null>(null);
    const [voteCount, setVoteCount] = useState(100);
    const [isDataInicialOpen, setIsDataInicialOpen] = useState(false);
    const [isDataFinalOpen, setIsDataFinalOpen] = useState(false);
    const [showAdvancedSearch, setAdvancedSearch] = useState(false);
    const { searchMovies } = useActions();

    useEffect(() => {
        const fetchGeneros = async () => {
            setGeneros(await getGeneros());
        };

        fetchGeneros();
    }, []);

    const buscarClick = async () => {
        searchMovies(
            genero,
            adulto,
            1,
            sort,
            pessoa,
            dataInicial,
            dataFinal,
            voteCount
        );

        setFilterState({
            genero: genero,
            adulto: adulto,
            sort: sort,
            pessoa: pessoa,
            dataInicial: dataInicial,
            dataFinal: dataFinal,
            voteCount: voteCount,
        });
    };

    const onGeneroChange = (values: MultiValue<ISelectOption>) => {
        var generosText = '';

        values.forEach((e) => {
            if (generosText !== '') {
                generosText += ',';
            }

            generosText += e.value;
        });

        setGenero(generosText);
    };

    const onPessoaChange = (values: MultiValue<ISelectOption>) => {
        var pessoasText = '';

        values.forEach((e) => {
            if (pessoasText !== '') {
                pessoasText += ',';
            }

            pessoasText += e.value;
        });

        setPessoa(pessoasText);
        console.log(pessoasText);
    };

    const onSortChange = (
        value: SingleValue<{ value: string; label: string }>
    ) => {
        if (value) {
            setSort(value.value);
        }
    };

    const getGeneroOptions = () => {
        var generosOptions: ISelectOption[] = [];

        generos.map((genero) =>
            generosOptions.push({ value: genero.id, label: genero.name })
        );

        return generosOptions;
    };

    const sortOptions = [
        { value: '0', label: 'Avaliação (maiores primeiro)' },
        { value: '1', label: 'Avaliação (menores primeiro)' },
        {
            value: '2',
            label: 'Data de lançamento (mais recentes primeiro)',
        },
        { value: '3', label: 'Data de lançamento (mais antigos primeiro)' },
        { value: '4', label: 'Popularidade atual' },
        { value: '5', label: 'Popularidade histórica' },
        { value: '6', label: 'Receita gerada (maiores primeiro)' },
        { value: '7', label: 'Receita gerada (menores primeiro)' },
    ];

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

    const movieOptions = (keyword: string) =>
        new Promise<any[]>((resolve) => {
            clearTimeout(movieTimeout);

            movieTimeout = setTimeout(() => {
                resolve(getMoviesSearchArray(keyword));
            }, 500);
        });

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

    function padTo2Digits(num: number) {
        return num.toString().padStart(2, '0');
    }

    function dataDDMMAAAA(date: Date) {
        return [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),
            date.getFullYear(),
        ].join('/');
    }

    const formatDate = (placeHolder: string, data: Date | null): string => {
        if (data) {
            return `${placeHolder}: ${dataDDMMAAAA(data)}`;
        }

        return placeHolder;
    };

    return (
        <div>
            <MDBCard className="p-1 m-3 filterCard" background="dark">
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol>
                            <AsyncSelect
                                placeholder={'Pesquisar...'}
                                noOptionsMessage={() => 'Nada encontrado'}
                                cacheOptions
                                loadOptions={movieOptions}
                                defaultOptions
                                loadingMessage={() => 'Buscando...'}
                                styles={{
                                    container: (base) => ({
                                        ...base,
                                        zIndex: 11,
                                    }),
                                }}
                            />
                        </MDBCol>
                        <MDBCol md="auto" center>
                            <MDBBtn color="white" outline>
                                <MDBIcon fas icon="search" color="white" />
                            </MDBBtn>
                        </MDBCol>
                        <MDBCol md="auto" center>
                            <MDBTooltip
                                tag="a"
                                placement="left"
                                wrapperProps={{ href: '#' }}
                                title="Pesquise o nome de algum filme"
                            >
                                <MDBIcon
                                    color="white"
                                    fas
                                    icon="info-circle"
                                    className="m-0"
                                />
                            </MDBTooltip>
                        </MDBCol>
                    </MDBRow>
                    <div className="d-grid gap-2 mb-1 mt-2">
                        <MDBBtn
                            outline
                            onClick={() =>
                                setAdvancedSearch(!showAdvancedSearch)
                            }
                            color="white"
                        >
                            Pesquisa avançada
                        </MDBBtn>
                    </div>
                    <MDBCollapse show={showAdvancedSearch}>
                        <MDBRow>
                            <MDBCol>
                                <Select
                                    onChange={(values) =>
                                        onGeneroChange(values)
                                    }
                                    placeholder={'Selecione um gênero'}
                                    className="mt-1 mb-1"
                                    noOptionsMessage={() => 'Nada encontrado'}
                                    isMulti
                                    options={getGeneroOptions()}
                                    styles={{
                                        container: (base) => ({
                                            ...base,
                                            zIndex: 10,
                                        }),
                                    }}
                                />
                            </MDBCol>
                            <MDBCol md="auto" center>
                                <MDBTooltip
                                    tag="a"
                                    placement="left"
                                    wrapperProps={{ href: '#' }}
                                    title="Serão retornados apenas os filmes que possuem todos os gêneros selecionados"
                                >
                                    <MDBIcon
                                        color="white"
                                        fas
                                        icon="info-circle"
                                        className="m-0"
                                    />
                                </MDBTooltip>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <Select
                                    onChange={(value) => onSortChange(value)}
                                    placeholder={'Ordenação'}
                                    className="mt-1 mb-1"
                                    noOptionsMessage={() => 'Nada encontrado'}
                                    defaultValue={[sortOptions[4]]}
                                    options={sortOptions}
                                    styles={{
                                        container: (base) => ({
                                            ...base,
                                            zIndex: 9,
                                        }),
                                    }}
                                />
                            </MDBCol>
                            <MDBCol md="auto" center>
                                <MDBTooltip
                                    tag="a"
                                    placement="left"
                                    wrapperProps={{ href: '#' }}
                                    title="Ordenação dos filmes"
                                >
                                    <MDBIcon
                                        color="white"
                                        fas
                                        icon="info-circle"
                                        className="m-0"
                                    />
                                </MDBTooltip>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <AsyncSelect
                                    placeholder={'Digite um nome...'}
                                    className="mt-1 mb-1"
                                    noOptionsMessage={() => 'Nada encontrado'}
                                    onChange={(values) =>
                                        onPessoaChange(values)
                                    }
                                    cacheOptions
                                    loadOptions={peopleOptions}
                                    defaultOptions
                                    loadingMessage={() => 'Buscando...'}
                                    isMulti
                                    styles={{
                                        container: (base) => ({
                                            ...base,
                                            zIndex: 8,
                                        }),
                                    }}
                                />
                            </MDBCol>
                            <MDBCol md="auto" center>
                                <MDBTooltip
                                    tag="a"
                                    placement="left"
                                    wrapperProps={{ href: '#' }}
                                    title="Serão retornados apenas os filmes em que todas as pessoas selecionadas participaram"
                                >
                                    <MDBIcon
                                        color="white"
                                        fas
                                        icon="info-circle"
                                        className="m-0"
                                    />
                                </MDBTooltip>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <span id="data">
                                    <MDBBtn
                                        noRipple
                                        type="submit"
                                        color="light"
                                        onClick={handleDataInicialClick}
                                        className="mt-1 me-2"
                                    >
                                        {formatDate(
                                            'Data inicial',
                                            dataInicial
                                        )}
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
                                        color="light"
                                        onClick={handleDataFinalClick}
                                        className="mt-1 me-2"
                                    >
                                        {formatDate('Data final', dataFinal)}
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
                                    label="Avaliações"
                                    labelClass="rangeLabel"
                                    value={voteCount}
                                    onChange={(e) =>
                                        setVoteCount(parseInt(e.target.value))
                                    }
                                />
                            </MDBCol>
                            <MDBCol md="auto" center>
                                <MDBTooltip
                                    tag="a"
                                    placement="left"
                                    wrapperProps={{ href: '#' }}
                                    title="Quantidade mínima de avaliações de usuário"
                                >
                                    <MDBIcon
                                        color="white"
                                        fas
                                        icon="info-circle"
                                        className="m-0"
                                    />
                                </MDBTooltip>
                            </MDBCol>
                        </MDBRow>
                        <div className="text-white mt-3">
                            <MDBSwitch
                                id="adult"
                                className="me-3"
                                label="Mostrar filmes adultos (conteúdo sexual)"
                                onChange={() => setAdulto(!adulto)}
                                checked={adulto}
                            />
                        </div>
                    </MDBCollapse>
                    <div className="centralizar mt-3">
                        <MDBBtn
                            type="submit"
                            color="success"
                            className="me-3"
                            onClick={buscarClick}
                        >
                            Buscar
                        </MDBBtn>
                        <MDBTooltip
                            tag="a"
                            placement="top"
                            wrapperProps={{ href: '#' }}
                            title="Ir para um filme aleatório"
                        >
                            <MDBBtn type="submit" color="light">
                                Estou com sorte
                            </MDBBtn>
                        </MDBTooltip>
                    </div>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
};

export default Filter;
