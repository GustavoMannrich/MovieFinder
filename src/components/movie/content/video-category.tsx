import "../../../styles/main.css";
import { MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";
import { IVideo } from "../../../utils/interfaces";

interface IVideoCategoryProps {
    category: string;
    videos: IVideo[] | undefined;
}

const VideoCategory = ({ category, videos }: IVideoCategoryProps) => {
    return (
        <>
            {videos && videos.length > 0 && (
                <>
                    <h6 className="text-info">{category}</h6>
                    <MDBAccordion
                        flush
                        style={{
                            minWidth: "100%",
                        }}
                    >
                        {videos.map((video, index) => (
                            <MDBAccordionItem
                                key={index}
                                collapseId={index + 1}
                                headerTitle={video.name}
                                style={{
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                }}
                            >
                                <div className="video-container">
                                    <iframe
                                        title={video.name}
                                        src={`https://www.youtube.com/embed/${video.key}`}
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    ></iframe>
                                </div>
                            </MDBAccordionItem>
                        ))}
                    </MDBAccordion>
                </>
            )}
        </>
    );
};

export default VideoCategory;
