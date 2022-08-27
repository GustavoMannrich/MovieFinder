import { MDBContainer, MDBNavbar, MDBNavbarBrand } from 'mdb-react-ui-kit';

const CustomNavbar = () => {
    return (
        <MDBNavbar className="sticky-top" dark bgColor="dark">
            <MDBContainer className="justify-content-center">
                <MDBNavbarBrand>Movie Finder do Gugão</MDBNavbarBrand>
            </MDBContainer>
        </MDBNavbar>
    );
};

export default CustomNavbar;
