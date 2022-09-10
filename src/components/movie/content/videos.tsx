import '../../../styles/main.css';
import {
    MDBContainer,
    MDBBtnGroup,
    MDBAccordion,
    MDBAccordionItem,
    MDBRadio,
} from 'mdb-react-ui-kit';
import { IVideos, getVideos } from '../../../scripts/requests';
import { useEffect, useState } from 'react';
import VideoCategory from './video-category';
import ChooseLanguage from './choose-language';

interface IVideosProps {
    movieId: number;
}

const Videos = ({ movieId }: IVideosProps) => {
    const [videos, setVideos] = useState<IVideos | null>(null);

    useEffect(() => {
        fetchVideos('pt-BR');
    }, [movieId]);

    const fetchVideos = async (language: string) => {
        if (movieId > 0) {
            setVideos(await getVideos(movieId, language));
        }
    };

    const videosLanguageClick = (language: string) => {
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
            </MDBContainer>
        </>
    );
};

export default Videos;
