import '../../../styles/main.css';
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardText,
} from 'mdb-react-ui-kit';
import { ICastMember } from '../../../scripts/requests';
import { Link } from 'react-router-dom';

interface ICastRowProps {
    cast: ICastMember[] | null;
}

const CastRow = ({ cast }: ICastRowProps) => {
    return (
        <MDBRow className="ms-0 me-0">
            {cast &&
                cast.map((c, index) => (
                    <MDBCol key={index} sm="2" className="p-1 ps-0">
                        <Link
                            to={`/MovieFinder?pessoaParam=${c.id}`}
                            onClick={window.location.reload}
                        >
                            <MDBCard alignment="center" className="popup">
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
                                                {c.name}
                                            </span>
                                            <br />
                                            <span className="text-info m-0">
                                                {c.character}
                                            </span>
                                        </small>
                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                        </Link>
                    </MDBCol>
                ))}
        </MDBRow>
    );
};

export default CastRow;
