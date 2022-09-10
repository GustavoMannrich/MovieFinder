import '../../../styles/main.css';
import { MDBContainer, MDBIcon, MDBCollapse } from 'mdb-react-ui-kit';
import { ICastMembers } from '../../../scripts/requests';
import { useState } from 'react';
import CastRow from './cast-row';

interface ICastMembersProps {
    castMembers: ICastMembers | null;
}

const CastMembers = ({ castMembers }: ICastMembersProps) => {
    const [showMore, setShowMore] = useState(false);

    const toggleShow = () => setShowMore(!showMore);

    return (
        <>
            {castMembers?.cast && castMembers.cast.length > 0 && (
                <MDBContainer className="mt-3">
                    <h2 className="text-info">Atores</h2>

                    <CastRow cast={castMembers.cast.slice(0, 6)}></CastRow>

                    {castMembers.cast.length > 6 && (
                        <>
                            <MDBCollapse show={showMore}>
                                <CastRow
                                    cast={castMembers.cast.slice(6, 12)}
                                ></CastRow>
                            </MDBCollapse>

                            <span className="fake-link" onClick={toggleShow}>
                                {showMore && (
                                    <span>
                                        Mostrar menos
                                        <MDBIcon
                                            fas
                                            icon="chevron-up"
                                            className="ms-2"
                                        />
                                    </span>
                                )}
                                {!showMore && (
                                    <span>
                                        Mostrar mais
                                        <MDBIcon
                                            fas
                                            icon="chevron-down"
                                            className="ms-2"
                                        />
                                    </span>
                                )}
                            </span>
                        </>
                    )}
                </MDBContainer>
            )}
        </>
    );
};

export default CastMembers;
