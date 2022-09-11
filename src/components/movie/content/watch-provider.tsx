import { MDBCol } from "mdb-react-ui-kit";
import { IWatchProvider } from "../../../utils/interfaces";
import Tooltip from "../../common/tooltip";

interface WatchProviderProps {
    title: string;
    providers: IWatchProvider[] | undefined;
}

const WatchProvider = ({ title, providers }: WatchProviderProps) => {
    return (
        <>
            {providers && providers.length > 0 && (
                <MDBCol md="auto">
                    <h6 className="text-info mb-1">{title}</h6>
                    <span>
                        {providers.map((w, index) => (
                            <Tooltip
                                key={index}
                                placement="top"
                                tip={w.provider_name}
                                wrapperProps={{
                                    className: "fake-link",
                                    style: {
                                        display: "inline",
                                    },
                                }}
                                className="spacing"
                            >
                                <img
                                    className="me-2"
                                    src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                                    alt={w.provider_name}
                                    style={{
                                        maxWidth: "50px",
                                        borderRadius: "12px",
                                    }}
                                ></img>
                            </Tooltip>
                        ))}
                    </span>
                </MDBCol>
            )}
        </>
    );
};

export default WatchProvider;
