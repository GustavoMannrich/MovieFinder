import '../styles/main.css';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtnGroup,
    MDBBtn,
    MDBAccordion,
    MDBAccordionItem,
    MDBIcon,
    MDBRadio,
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardText,
    MDBCollapse,
    MDBTooltip,
    MDBSpinner,
} from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    IMovie,
    getMovieDetails,
    IReview,
    getMovieReviews,
    ICastMember,
    getCastMembers,
    IWatchProviders,
    getWatchProviders,
} from '../scripts/requests';

const MoviePage = () => {
    const [movie, setMovie] = useState<IMovie | null | undefined>(null);
    const [reviews, setReviews] = useState<IReview[] | null>(null);
    const [castMembers, setCastMembers] = useState<ICastMember[] | null>(null);
    const [watchProviders, setWatchProviders] =
        useState<IWatchProviders | null>(null);
    const [showShow, setShowShow] = useState(false);
    const { movieID } = useParams();

    const toggleShow = () => setShowShow(!showShow);

    const isNumber = (str: string): boolean => {
        if (typeof str !== 'string') {
            return false;
        }

        if (str.trim() === '') {
            return false;
        }

        return !Number.isNaN(Number(str));
    };

    const fetchReviews = async (language: string) => {
        if (movieID && isNumber(movieID)) {
            setReviews(await getMovieReviews(parseInt(movieID), language));
        }
    };

    useEffect(() => {
        if (movieID && isNumber(movieID)) {
            const fetchMovieDetails = async () => {
                setMovie(await getMovieDetails(parseInt(movieID)));
            };

            const fetchMovieCast = async () => {
                setCastMembers(await getCastMembers(parseInt(movieID)));
            };

            const fetchWatchProviders = async () => {
                setWatchProviders(await getWatchProviders(parseInt(movieID)));
            };

            fetchMovieDetails();
            fetchReviews('pt-BR');
            fetchMovieCast();
            fetchWatchProviders();
        }
    }, [movieID]);

    useEffect(() => {
        // Garante que vai mostrar a parte de cima da página
        window.scrollTo(0, 0);
    }, []);

    const languageClick = (language: string) => {
        fetchReviews(language);
    };

    const padTo2Digits = (num: number) => {
        return num.toString().padStart(2, '0');
    };

    const formatDate = (date: Date) => {
        let d = new Date(date);

        return [
            padTo2Digits(d.getDate()),
            padTo2Digits(d.getMonth() + 1),
            d.getFullYear(),
        ].join('/');
    };

    const formatDateStr = (date: string) => {
        let datePart: RegExpMatchArray | null = date.match(/\d+/g);
        let year = '';
        let month = '';
        let day = '';

        if (datePart) {
            year = datePart[0];
            month = datePart[1];
            day = datePart[2];
        }

        return day + '/' + month + '/' + year;
    };

    const priceSplitter = (number: number) =>
        number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    let languageNames = new Intl.DisplayNames(['pt-BR'], { type: 'language' });

    const convertMinutes = (totalMinutes: number): string => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        if (hours === 0) {
            return `${minutes}m`;
        }

        return `${hours}h e ${minutes}m`;
    };

    return (
        <>
            <div className="content-main">
                <div className="bg-image">
                    {movie && movie.backdrop_path && (
                        <img
                            className="fullscreenImage"
                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            alt="plano de fundo"
                            style={{
                                filter: 'brightness(0.2)',
                            }}
                        />
                    )}
                </div>
                <div
                    className="content moviepage"
                    style={{
                        /*backgroundColor: 'rgba(0, 0, 0, 0.75)',*/
                        zIndex: 10,
                    }}
                >
                    <div className="text-white">
                        {movie && (
                            <div className="text-white m-4">
                                <MDBContainer>
                                    <MDBRow center>
                                        <MDBCol size="md-2 me-4 centralizar">
                                            {movie.poster_path && (
                                                <img
                                                    src={
                                                        'https://image.tmdb.org/t/p/w500' +
                                                        movie.poster_path
                                                    }
                                                    className="img-fluid rounded shadow-4 m-3"
                                                    alt={`Poster de ${movie.title}`}
                                                    style={{
                                                        maxHeight: '275px',
                                                    }}
                                                />
                                            )}
                                            {!movie.poster_path && (
                                                <img
                                                    src="/PosterNotFound.jpg"
                                                    className="img-fluid rounded shadow-4 m-3"
                                                    alt="Poster não encontrado"
                                                    style={{
                                                        maxHeight: '275px',
                                                    }}
                                                />
                                            )}
                                        </MDBCol>
                                        <MDBCol size="md">
                                            <h1 className="text-info">
                                                <span>{movie.title}</span>
                                            </h1>
                                            {movie.tagline && (
                                                <h4
                                                    style={{
                                                        fontStyle: 'italic',
                                                    }}
                                                >
                                                    "{movie.tagline}"
                                                </h4>
                                            )}
                                            <p>{movie.overview}</p>
                                            <MDBRow>
                                                <MDBCol
                                                    sm="auto"
                                                    className="mb-1"
                                                >
                                                    <span className="text-warning bold">
                                                        <MDBIcon
                                                            far
                                                            icon="star"
                                                            className="me-2"
                                                        />
                                                        {movie.vote_average.toFixed(
                                                            1
                                                        )}
                                                    </span>
                                                </MDBCol>
                                                <MDBCol
                                                    sm="auto"
                                                    className="mb-1"
                                                >
                                                    <span className="text-info bold">
                                                        <MDBIcon
                                                            fas
                                                            icon="calendar-alt"
                                                            className="me-2"
                                                        />
                                                        {formatDateStr(
                                                            movie.release_date
                                                        )}
                                                    </span>
                                                </MDBCol>
                                                <MDBCol
                                                    sm="auto"
                                                    className="mb-1"
                                                >
                                                    <span className="text-info bold">
                                                        <MDBIcon
                                                            far
                                                            icon="clock"
                                                            className="me-2"
                                                        />
                                                        {convertMinutes(
                                                            movie.runtime
                                                        )}
                                                    </span>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol
                                                    sm="auto"
                                                    className="mb-1"
                                                >
                                                    <span className="me-2">
                                                        Título original:
                                                    </span>
                                                    <span className="text-info bold">
                                                        {movie.original_title}
                                                    </span>
                                                </MDBCol>
                                                {movie.original_language && (
                                                    <MDBCol
                                                        sm="auto"
                                                        className="mb-1"
                                                    >
                                                        <span className="me-2">
                                                            Linguagem original:
                                                        </span>
                                                        <span
                                                            className="text-info bold"
                                                            style={{
                                                                textTransform:
                                                                    'capitalize',
                                                            }}
                                                        >
                                                            {languageNames.of(
                                                                movie.original_language
                                                            )}
                                                        </span>
                                                    </MDBCol>
                                                )}
                                                <MDBCol
                                                    sm="auto"
                                                    className="mb-1"
                                                >
                                                    <span className="text-white me-2">
                                                        Orçamento:
                                                    </span>
                                                    <span className="text-info bold">
                                                        <MDBIcon
                                                            fas
                                                            icon="dollar-sign"
                                                            className="me-2"
                                                        />
                                                        {movie.budget > 0 &&
                                                            priceSplitter(
                                                                movie.budget
                                                            )}
                                                        {movie.budget <= 0 &&
                                                            '-'}
                                                    </span>
                                                </MDBCol>
                                                <MDBCol
                                                    sm="auto"
                                                    className="mb-1"
                                                >
                                                    <span className="text-white me-2">
                                                        Receita:
                                                    </span>
                                                    <span className="text-info bold">
                                                        <MDBIcon
                                                            fas
                                                            icon="dollar-sign"
                                                            className="me-2"
                                                        />
                                                        {movie.revenue > 0 &&
                                                            priceSplitter(
                                                                movie.revenue
                                                            )}
                                                        {movie.revenue <= 0 &&
                                                            '-'}
                                                    </span>
                                                </MDBCol>
                                            </MDBRow>
                                            <div className="mt-2">
                                                {movie.genres.map(
                                                    (g, index) => (
                                                        <MDBBtn
                                                            rounded
                                                            className="m-2 ms-0 transparentBG active"
                                                            color="info"
                                                            key={index}
                                                        >
                                                            {g.name}
                                                        </MDBBtn>
                                                    )
                                                )}
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBContainer>
                                {watchProviders && (
                                    <MDBContainer className="mt-3">
                                        <MDBRow>
                                            <div className="d-flex align-items-end">
                                                <MDBCol
                                                    sm="auto"
                                                    className="pe-2"
                                                >
                                                    <h2 className="text-info">
                                                        Provedores
                                                    </h2>
                                                </MDBCol>
                                                <MDBCol
                                                    sm="auto mb-2"
                                                    className="ps-0"
                                                >
                                                    <span className="text-info">
                                                        by JustWatch
                                                    </span>
                                                </MDBCol>
                                            </div>
                                        </MDBRow>

                                        <MDBRow>
                                            {watchProviders.isAvailable && (
                                                <>
                                                    {watchProviders.flatrate
                                                        .length > 0 && (
                                                        <MDBCol md="auto">
                                                            <p className="mb-1">
                                                                Streaming
                                                            </p>
                                                            <p>
                                                                {watchProviders.flatrate.map(
                                                                    (
                                                                        w,
                                                                        index
                                                                    ) => (
                                                                        <MDBTooltip
                                                                            key={
                                                                                index
                                                                            }
                                                                            tag="div"
                                                                            placement="top"
                                                                            wrapperProps={{
                                                                                className:
                                                                                    'fake-link',
                                                                                style: {
                                                                                    display:
                                                                                        'inline',
                                                                                },
                                                                            }}
                                                                            title={
                                                                                w.provider_name
                                                                            }
                                                                        >
                                                                            <img
                                                                                className="me-2"
                                                                                src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                                                                                alt={
                                                                                    w.provider_name
                                                                                }
                                                                                style={{
                                                                                    maxWidth:
                                                                                        '50px',
                                                                                    borderRadius:
                                                                                        '12px',
                                                                                }}
                                                                            ></img>
                                                                        </MDBTooltip>
                                                                    )
                                                                )}
                                                            </p>
                                                        </MDBCol>
                                                    )}
                                                    {watchProviders.buy.length >
                                                        0 && (
                                                        <MDBCol md="auto">
                                                            <p className="mb-1">
                                                                Compra
                                                            </p>
                                                            <p>
                                                                {watchProviders.buy.map(
                                                                    (
                                                                        w,
                                                                        index
                                                                    ) => (
                                                                        <MDBTooltip
                                                                            key={
                                                                                index
                                                                            }
                                                                            tag="div"
                                                                            placement="top"
                                                                            wrapperProps={{
                                                                                className:
                                                                                    'fake-link',
                                                                                style: {
                                                                                    display:
                                                                                        'inline',
                                                                                    marginTop:
                                                                                        '50px',
                                                                                },
                                                                            }}
                                                                            title={
                                                                                w.provider_name
                                                                            }
                                                                        >
                                                                            <img
                                                                                className="me-2"
                                                                                src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                                                                                alt={
                                                                                    w.provider_name
                                                                                }
                                                                                style={{
                                                                                    maxWidth:
                                                                                        '50px',
                                                                                    borderRadius:
                                                                                        '12px',
                                                                                }}
                                                                            ></img>
                                                                        </MDBTooltip>
                                                                    )
                                                                )}
                                                            </p>
                                                        </MDBCol>
                                                    )}
                                                    {watchProviders.rent
                                                        .length > 0 && (
                                                        <MDBCol md="auto">
                                                            <p className="mb-1">
                                                                Aluguel
                                                            </p>
                                                            <p>
                                                                {watchProviders.rent.map(
                                                                    (
                                                                        w,
                                                                        index
                                                                    ) => (
                                                                        <MDBTooltip
                                                                            key={
                                                                                index
                                                                            }
                                                                            tag="div"
                                                                            placement="top"
                                                                            wrapperProps={{
                                                                                className:
                                                                                    'fake-link',
                                                                                style: {
                                                                                    display:
                                                                                        'inline',
                                                                                },
                                                                            }}
                                                                            title={
                                                                                w.provider_name
                                                                            }
                                                                        >
                                                                            <img
                                                                                className="me-2"
                                                                                src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                                                                                alt={
                                                                                    w.provider_name
                                                                                }
                                                                                style={{
                                                                                    maxWidth:
                                                                                        '50px',
                                                                                    borderRadius:
                                                                                        '12px',
                                                                                }}
                                                                            ></img>
                                                                        </MDBTooltip>
                                                                    )
                                                                )}
                                                            </p>
                                                        </MDBCol>
                                                    )}
                                                </>
                                            )}
                                        </MDBRow>
                                        {!watchProviders.isAvailable && (
                                            <p>
                                                Filme ainda não disponível por
                                                streaming no Brasil
                                            </p>
                                        )}
                                    </MDBContainer>
                                )}
                                {castMembers && castMembers.length > 0 && (
                                    <MDBContainer className="mt-3">
                                        <h2 className="text-info">Atores</h2>
                                        <MDBRow className="ms-0 me-0">
                                            {castMembers &&
                                                castMembers.map((c, index) => (
                                                    <MDBCol
                                                        key={index}
                                                        sm="2"
                                                        className="p-1 ps-0"
                                                    >
                                                        {index < 6 && (
                                                            <MDBCard alignment="center">
                                                                {c.profile_path && (
                                                                    <MDBCardImage
                                                                        src={`https://image.tmdb.org/t/p/w500${c.profile_path}`}
                                                                        alt={`foto de ${c.name}`}
                                                                        position="top"
                                                                    />
                                                                )}
                                                                <MDBCardBody className="p-1">
                                                                    <MDBCardText>
                                                                        <small>
                                                                            <span className="text-white m-0">
                                                                                {
                                                                                    c.name
                                                                                }
                                                                            </span>
                                                                            <br />
                                                                            <span className="text-info m-0">
                                                                                {
                                                                                    c.character
                                                                                }
                                                                            </span>
                                                                        </small>
                                                                    </MDBCardText>
                                                                </MDBCardBody>
                                                            </MDBCard>
                                                        )}
                                                    </MDBCol>
                                                ))}
                                        </MDBRow>

                                        {castMembers.length > 6 && (
                                            <>
                                                <MDBCollapse show={showShow}>
                                                    <MDBRow className="ms-0 me-0">
                                                        {castMembers &&
                                                            castMembers.map(
                                                                (c, index) => (
                                                                    <MDBCol
                                                                        key={
                                                                            index
                                                                        }
                                                                        sm="2"
                                                                        className="p-1 ps-0"
                                                                    >
                                                                        {index >=
                                                                            6 && (
                                                                            <MDBCard alignment="center">
                                                                                {c.profile_path && (
                                                                                    <MDBCardImage
                                                                                        src={`https://image.tmdb.org/t/p/w500${c.profile_path}`}
                                                                                        alt={`foto de ${c.name}`}
                                                                                        position="top"
                                                                                    />
                                                                                )}
                                                                                <MDBCardBody className="p-1">
                                                                                    <MDBCardText>
                                                                                        <small>
                                                                                            <span className="text-white m-0">
                                                                                                {
                                                                                                    c.name
                                                                                                }
                                                                                            </span>
                                                                                            <br />
                                                                                            <span className="text-info m-0">
                                                                                                {
                                                                                                    c.character
                                                                                                }
                                                                                            </span>
                                                                                        </small>
                                                                                    </MDBCardText>
                                                                                </MDBCardBody>
                                                                            </MDBCard>
                                                                        )}
                                                                    </MDBCol>
                                                                )
                                                            )}
                                                    </MDBRow>
                                                </MDBCollapse>
                                                <span
                                                    className="fake-link"
                                                    onClick={toggleShow}
                                                >
                                                    {showShow && (
                                                        <span>
                                                            Mostrar menos
                                                            <MDBIcon
                                                                fas
                                                                icon="chevron-up"
                                                                className="ms-2"
                                                            />
                                                        </span>
                                                    )}
                                                    {!showShow && (
                                                        <span>
                                                            Mostrar mais
                                                            <MDBIcon
                                                                fas
                                                                icon="chevron-down"
                                                                className="ms-2"
                                                            />
                                                        </span>
                                                    )}
                                                </span>
                                            </>
                                        )}
                                    </MDBContainer>
                                )}
                                <MDBContainer
                                    className="mt-4"
                                    style={{ height: 'auto' }}
                                >
                                    <h2 className="text-info">Reviews</h2>
                                    <MDBBtnGroup className="mb-3">
                                        <MDBRadio
                                            id="ptButton"
                                            name="language"
                                            className=""
                                            wrapperClass="me-2 transparentBG"
                                            onClick={() =>
                                                languageClick('pt-BR')
                                            }
                                            btn
                                            wrapperTag="span"
                                            label="Português"
                                            defaultChecked
                                        />
                                        <MDBRadio
                                            id="enButton"
                                            name="language"
                                            onClick={() =>
                                                languageClick('en-US')
                                            }
                                            wrapperTag="span"
                                            btn
                                            label="Inglês"
                                        />
                                    </MDBBtnGroup>
                                    <>
                                        {reviews && (
                                            <MDBAccordion flush>
                                                {reviews.map((r, index) => (
                                                    <MDBAccordionItem
                                                        key={index}
                                                        collapseId={index + 1}
                                                        className="text-white"
                                                        headerTitle={
                                                            <>
                                                                {r
                                                                    .author_details
                                                                    .rating && (
                                                                    <div className="text-warning me-2">
                                                                        <MDBIcon
                                                                            icon="star"
                                                                            className="me-2"
                                                                        />
                                                                        {
                                                                            r
                                                                                .author_details
                                                                                .rating
                                                                        }
                                                                    </div>
                                                                )}
                                                                <span>
                                                                    {r.author} (
                                                                    {formatDate(
                                                                        r.created_at
                                                                    )}
                                                                    )
                                                                </span>
                                                            </>
                                                        }
                                                        style={{
                                                            backgroundColor:
                                                                'rgba(0, 0, 0, 0.5)',
                                                        }}
                                                    >
                                                        {r.content}
                                                    </MDBAccordionItem>
                                                ))}
                                            </MDBAccordion>
                                        )}
                                        {!reviews && (
                                            <p> Nenhuma review encontrada</p>
                                        )}
                                    </>
                                </MDBContainer>
                            </div>
                        )}
                    </div>
                    {movie === null && (
                        <div className="centralizar text-white mt-5 pt-5">
                            <MDBSpinner role="status" color="white">
                                <span className="visually-hidden">
                                    Carregando...
                                </span>
                            </MDBSpinner>
                        </div>
                    )}
                    {movie === undefined && (
                        <h3 className="centralizar text-white mt-5 pt-5">
                            404 - Filme não encontrado
                        </h3>
                    )}
                </div>
            </div>
        </>
    );
};

export default MoviePage;
