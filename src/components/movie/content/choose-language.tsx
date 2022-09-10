import '../../../styles/main.css';
import { MDBBtnGroup, MDBRadio } from 'mdb-react-ui-kit';

interface IChooseLanguageProps {
    name: string;
    onClick: (language: string) => void;
}

const ChooseLanguage = ({ name, onClick }: IChooseLanguageProps) => {
    return (
        <MDBBtnGroup className="mb-3">
            <MDBRadio
                id={`pt${name}`}
                name={name}
                className=""
                wrapperClass="me-2 transparentBG"
                onClick={() => onClick('pt-BR')}
                btn
                wrapperTag="span"
                label="Português"
                defaultChecked
            />
            <MDBRadio
                id={`en${name}`}
                name={name}
                onClick={() => onClick('en-US')}
                wrapperTag="span"
                btn
                label="Inglês"
            />
        </MDBBtnGroup>
    );
};

export default ChooseLanguage;
