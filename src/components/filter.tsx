import { MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { FormSelect } from 'react-bootstrap';

const Filter = () => {
    return (
        <div className="filter">
            <MDBCard
                className="p-1 m-3 text-white"
                background="dark"
                alignment="center"
            >
                <MDBCardBody>
                    <FormSelect>
                        <option>Selecione o Gênero</option>
                        <option value="1">Terror</option>
                        <option value="2">Comédia</option>
                        <option value="3">Suspense</option>
                        <option value="3">Ação</option>
                    </FormSelect>
                    <MDBInput
                        label="Remember me"
                        id="form1"
                        type="text"
                        className="mt-3"
                        contrast
                    />
                    <div className="mt-3">
                        <MDBBtn type="submit" color="success" className="me-2">
                            Buscar
                        </MDBBtn>
                        <MDBBtn type="submit" color="light" className="ms-2">
                            Estou com sorte
                        </MDBBtn>
                    </div>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
};

export default Filter;
