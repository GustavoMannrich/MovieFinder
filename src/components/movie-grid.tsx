import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import Movie from './movie';

const movieGrid = () => {
    return (
        <MDBRow className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 m-3">
            <MDBCol>
                <Movie />
            </MDBCol>
            <MDBCol>
                <Movie />
            </MDBCol>
            <MDBCol>
                <Movie />
            </MDBCol>
            <MDBCol>
                <Movie />
            </MDBCol>
            <MDBCol>
                <Movie />
            </MDBCol>
            <MDBCol>
                <Movie />
            </MDBCol>
            <MDBCol>
                <Movie />
            </MDBCol>
            <MDBCol>
                <Movie />
            </MDBCol>
            <MDBCol>
                <Movie />
            </MDBCol>
            <MDBCol>
                <Movie />
            </MDBCol>
        </MDBRow>
    );
};

export default movieGrid;
