import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
} from 'mdb-react-ui-kit';

const Movie = () => {
    return (
        <MDBCard background="dark" className="text-white">
            <MDBCardImage
                src="https://mdbootstrap.com/img/new/standard/city/041.webp"
                alt="..."
                position="top"
            />
            <MDBCardBody>
                <MDBCardTitle>Card title</MDBCardTitle>
                <MDBCardText>
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                </MDBCardText>
            </MDBCardBody>
        </MDBCard>
    );
};

export default Movie;
