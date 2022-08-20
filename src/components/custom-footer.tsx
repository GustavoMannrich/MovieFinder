import { MDBContainer, MDBFooter } from 'mdb-react-ui-kit';

const CustomFooter = () => {
    return (
        <MDBFooter
            className="text-center text-white fixed-bottom"
            dark
            light
            bgColor="dark"
        >
            <MDBContainer className="text-center p-3">
                Este produto usa a API do TMDB, mas não é endossado ou
                certificado pelo TMDB
            </MDBContainer>
        </MDBFooter>
    );
};

export default CustomFooter;
