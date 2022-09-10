import '../../../styles/main.css';
import { MDBContainer, MDBRow, MDBCol, MDBTooltip } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { IWatchProviders, getWatchProviders } from '../../../scripts/requests';

interface IWatchProvidersProps {
    movieId: number;
}

const WatchProviders = ({ movieId }: IWatchProvidersProps) => {
    const [watchProviders, setWatchProviders] =
        useState<IWatchProviders | null>(null);

    useEffect(() => {
        if (movieId > 0) {
            const fetchWatchProviders = async () => {
                setWatchProviders(await getWatchProviders(movieId));
            };

            fetchWatchProviders();
        }
    }, [movieId]);

    return (
        <>
            {watchProviders && (
                <MDBContainer className="mt-3">
                    <MDBRow>
                        <div className="d-flex align-items-end">
                            <MDBCol sm="auto" className="pe-2">
                                <h2 className="text-info">Provedores</h2>
                            </MDBCol>
                            <MDBCol sm="auto mb-2" className="ps-0">
                                <span className="text-info">by JustWatch</span>
                            </MDBCol>
                        </div>
                    </MDBRow>

                    <MDBRow>
                        {watchProviders.isAvailable && (
                            <>
                                {watchProviders.flatrate.length > 0 && (
                                    <MDBCol md="auto">
                                        <h6 className="text-info mb-1">
                                            Streaming
                                        </h6>
                                        <span>
                                            {watchProviders.flatrate.map(
                                                (w, index) => (
                                                    <MDBTooltip
                                                        key={index}
                                                        tag="div"
                                                        placement="top"
                                                        wrapperProps={{
                                                            className:
                                                                'fake-link',
                                                            style: {
                                                                display:
                                                                    'inline',
                                                            },
                                                        }}
                                                        title={w.provider_name}
                                                        className="spacing"
                                                    >
                                                        <img
                                                            className="me-2"
                                                            src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                                                            alt={
                                                                w.provider_name
                                                            }
                                                            style={{
                                                                maxWidth:
                                                                    '50px',
                                                                borderRadius:
                                                                    '12px',
                                                            }}
                                                        ></img>
                                                    </MDBTooltip>
                                                )
                                            )}
                                        </span>
                                    </MDBCol>
                                )}
                                {watchProviders.buy.length > 0 && (
                                    <MDBCol md="auto">
                                        <h6 className="text-info mb-1">
                                            Compra
                                        </h6>
                                        <span>
                                            {watchProviders.buy.map(
                                                (w, index) => (
                                                    <MDBTooltip
                                                        key={index}
                                                        tag="div"
                                                        placement="top"
                                                        wrapperProps={{
                                                            className:
                                                                'fake-link',
                                                            style: {
                                                                display:
                                                                    'inline',
                                                                marginTop:
                                                                    '50px',
                                                            },
                                                        }}
                                                        title={w.provider_name}
                                                        className="spacing"
                                                    >
                                                        <img
                                                            className="me-2"
                                                            src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                                                            alt={
                                                                w.provider_name
                                                            }
                                                            style={{
                                                                maxWidth:
                                                                    '50px',
                                                                borderRadius:
                                                                    '12px',
                                                            }}
                                                        ></img>
                                                    </MDBTooltip>
                                                )
                                            )}
                                        </span>
                                    </MDBCol>
                                )}
                                {watchProviders.rent.length > 0 && (
                                    <MDBCol md="auto">
                                        <h6 className="text-info mb-1">
                                            Aluguel
                                        </h6>
                                        <span>
                                            {watchProviders.rent.map(
                                                (w, index) => (
                                                    <MDBTooltip
                                                        key={index}
                                                        tag="div"
                                                        placement="top"
                                                        wrapperProps={{
                                                            className:
                                                                'fake-link',
                                                            style: {
                                                                display:
                                                                    'inline',
                                                            },
                                                        }}
                                                        title={w.provider_name}
                                                        className="spacing"
                                                    >
                                                        <img
                                                            className="me-2"
                                                            src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                                                            alt={
                                                                w.provider_name
                                                            }
                                                            style={{
                                                                maxWidth:
                                                                    '50px',
                                                                borderRadius:
                                                                    '12px',
                                                            }}
                                                        ></img>
                                                    </MDBTooltip>
                                                )
                                            )}
                                        </span>
                                    </MDBCol>
                                )}
                            </>
                        )}
                    </MDBRow>
                    {!watchProviders.isAvailable && (
                        <p>
                            Filme ainda não disponível por streaming no Brasil
                        </p>
                    )}
                </MDBContainer>
            )}
        </>
    );
};

export default WatchProviders;
