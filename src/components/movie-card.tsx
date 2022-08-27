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
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

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
        <MDBCard
            background="dark"
            className="text-white movieCard"
            alignment="center"
            onClick={() => navigate(`/movie/${id}`)}
        >
            <MDBRow className="g-0 m-0">
                <MDBCol md="6">
                    <MDBCardImage
                        src={'https://image.tmdb.org/t/p/w500' + imageSRC}
                        alt="Pôster do filme"
                        className="p-2 cardImage"
                        fluid
                    />
                </MDBCol>
                <MDBCol md="6">
                    <MDBCardBody>
                        <MDBCardTitle>{name}</MDBCardTitle>
                        <div className="text-warning">
                            <MDBIcon icon="star" className="mb-2 me-2" />
                            {rating.toFixed(1)}
                        </div>
                        <MDBCardText>
                            {tagline && (
                                <small style={{ fontStyle: 'italic' }}>
                                    "{tagline}"
                                </small>
                            )}
                        </MDBCardText>

                        <MDBRow>
                            <MDBCol className="text-success">
                                <small>
                                    <span className="text-white me-2">
                                        Data:
                                    </span>
                                </small>
                                <MDBIcon
                                    fas
                                    icon="calendar-alt"
                                    className="me-2"
                                />
                                {formatDate(releaseDate)}
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
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
                        </MDBRow>
                        <MDBRow>
                            <MDBCol className="text-success">
                                <small>
                                    <span className="text-white me-2">
                                        Receita:
                                    </span>
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
    );
};

export default Movie;
