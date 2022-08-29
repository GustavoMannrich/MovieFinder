import '../styles/movie.css';
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

interface MovieProps {
    name: string;
    imageSRC: string;
    releaseDate: string;
    budget: number;
    revenue: number;
    rating: number;
    tagline: string;
    id: number;
}

const priceSplitter = (number: number) =>
    number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const Movie: React.FC<MovieProps> = ({
    name,
    imageSRC,
    releaseDate,
    budget,
    revenue,
    rating,
    tagline,
    id,
}) => {
    function formatDate(date: string) {
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
    }

    return (
        <Link to={`/movie/${id}`}>
            <MDBCard
                className="text-white movieCard transparentBG-noHover"
                alignment="center"
            >
                <MDBRow className="g-0 m-0">
                    <MDBCol md="6">
                        {imageSRC && (
                            <MDBCardImage
                                src={
                                    'https://image.tmdb.org/t/p/w500' + imageSRC
                                }
                                alt="Poster do filme"
                                className="m-2 cardImage rounded"
                                fluid
                            />
                        )}
                        {!imageSRC && (
                            <MDBCardImage
                                src="/PosterNotFound.jpg"
                                alt="Poster do filme"
                                className="m-2 cardImage rounded"
                                fluid
                            />
                        )}
                    </MDBCol>
                    <MDBCol md="6">
                        <MDBCardBody>
                            <MDBCardTitle>{name}</MDBCardTitle>
                            <div className="text-warning m-2">
                                <MDBIcon icon="star" className="me-2" />
                                {rating.toFixed(1)}
                            </div>
                            {tagline && (
                                <MDBCardText>
                                    <span style={{ fontStyle: 'italic' }}>
                                        "{tagline}"
                                    </span>
                                </MDBCardText>
                            )}
                            <MDBRow>
                                <MDBCol className="text-info">
                                    <small className="text-white me-2">
                                        Data:
                                    </small>
                                    <MDBIcon
                                        fas
                                        icon="calendar-alt"
                                        className="me-2"
                                    />
                                    {formatDate(releaseDate)}
                                </MDBCol>
                            </MDBRow>
                            {/*<MDBRow>
                                <MDBCol className="text-success">
                                    <small>
                                        <span className="text-white me-2">
                                            Orçamento:
                                        </span>
                                    </small>
                                    <MDBIcon
                                        fas
                                        icon="dollar-sign"
                                        className="me-2"
                                    />
                                    {budget > 0 && priceSplitter(budget)}
                                    {budget <= 0 && '-'}
                                </MDBCol>
                                </MDBRow>*/}
                            <MDBRow>
                                <MDBCol className="text-info">
                                    <small className="text-white me-2">
                                        Receita:
                                    </small>
                                    <MDBIcon
                                        fas
                                        icon="dollar-sign"
                                        className="me-2"
                                    />
                                    {revenue > 0 && priceSplitter(revenue)}
                                    {revenue <= 0 && '-'}
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
            </MDBCard>
        </Link>
    );
};

export default Movie;
