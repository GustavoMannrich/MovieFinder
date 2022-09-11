import "../../../styles/main.css";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { getWatchProviders } from "../../../scripts/requests";
import { IWatchProviders } from "../../../utils/interfaces";
import WatchProvider from "./watch-provider";

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
                                <WatchProvider
                                    title="Streaming"
                                    providers={watchProviders.flatrate}
                                />
                                <WatchProvider
                                    title="Compra"
                                    providers={watchProviders.buy}
                                />
                                <WatchProvider
                                    title="Alguel"
                                    providers={watchProviders.rent}
                                />
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
