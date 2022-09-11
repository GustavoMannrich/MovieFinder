import "../../../styles/main.css";
import {
    MDBContainer,
    MDBBtnGroup,
    MDBAccordion,
    MDBAccordionItem,
    MDBRadio,
    MDBSpinner,
} from "mdb-react-ui-kit";
import { getVideos } from "../../../scripts/requests";
import { useEffect, useState } from "react";
import VideoCategory from "./video-category";
import ChooseLanguage from "./choose-language";
import { IVideos } from "../../../utils/interfaces";

interface IVideosProps {
    movieId: number;
}

const Videos = ({ movieId }: IVideosProps) => {
    const [videos, setVideos] = useState<IVideos | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchVideos("pt-BR");
    }, [movieId]);

    const fetchVideos = async (language: string) => {
        if (movieId > 0) {
            setVideos(await getVideos(movieId, language));
            setIsLoading(false);
        }
    };

    const videosLanguageClick = (language: string) => {
        setIsLoading(true);
        fetchVideos(language);
    };

    return (
        <>
            <MDBContainer className="mt-3">
                <h2 className="text-info">Videos</h2>

                <ChooseLanguage
                    name="videos"
                    onClick={videosLanguageClick}
                ></ChooseLanguage>

                {!isLoading && (
                    <>
                        <VideoCategory
                            category="Trailers"
                            videos={videos?.trailers}
                        ></VideoCategory>
                        <VideoCategory
                            category="Teasers"
                            videos={videos?.teasers}
                        ></VideoCategory>
                        <VideoCategory
                            category="Clips"
                            videos={videos?.clips}
                        ></VideoCategory>
                        <VideoCategory
                            category="Destaques"
                            videos={videos?.featurettes}
                        ></VideoCategory>
                        <VideoCategory
                            category="Bastidores"
                            videos={videos?.behindTheScenes}
                        ></VideoCategory>
                        <VideoCategory
                            category="Outros"
                            videos={videos?.others}
                        ></VideoCategory>

                        {!videos && <p> Nenhum vídeo encontrado</p>}
                    </>
                )}
                {isLoading && (
                    <div className="centralizar text-white mt-2">
                        <MDBSpinner role="status" color="white">
                            <span className="visually-hidden">
                                Carregando...
                            </span>
                        </MDBSpinner>
                    </div>
                )}
            </MDBContainer>
        </>
    );
};

export default Videos;
