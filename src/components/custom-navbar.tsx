import '../styles/main.css';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBIcon,
} from 'mdb-react-ui-kit';

const CustomNavbar = () => {
    return (
        <MDBNavbar className="sticky-top darkBackground dark">
            <MDBContainer className="ms-2">
                <MDBNavbarBrand className="text-info" href="/">
                    <MDBIcon fas icon="film" className="me-2" />
                    Movie Finder{' '}
                    <span className="text-white ms-2">do Gugão</span>
                </MDBNavbarBrand>
            </MDBContainer>
        </MDBNavbar>
    );
};

export default CustomNavbar;
