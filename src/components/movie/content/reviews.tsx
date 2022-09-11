import "../../../styles/main.css";
import {
    MDBContainer,
    MDBAccordion,
    MDBAccordionItem,
    MDBIcon,
    MDBSpinner,
} from "mdb-react-ui-kit";
import { getMovieReviews } from "../../../scripts/requests";
import { useEffect, useState } from "react";
import ChooseLanguage from "./choose-language";
import { IReview } from "../../../utils/interfaces";
import { formatDate } from "../../../utils/helpers";

interface IReviewsProps {
    movieId: number;
}

const Reviews = (props: IReviewsProps) => {
    const [reviews, setReviews] = useState<IReview[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchReviews("pt-BR");
    }, [props.movieId]);

    const fetchReviews = async (language: string) => {
        if (props.movieId > 0) {
            setReviews(await getMovieReviews(props.movieId, language));
            setIsLoading(false);
        }
    };

    const reviewsLanguageClick = (language: string) => {
        setIsLoading(true);
        fetchReviews(language);
    };

    return (
        <>
            <MDBContainer className="mt-4" style={{ height: "auto" }}>
                <h2 className="text-info">Reviews</h2>

                <ChooseLanguage
                    name="review"
                    onClick={reviewsLanguageClick}
                ></ChooseLanguage>

                {!isLoading && (
                    <>
                        {reviews && (
                            <MDBAccordion flush style={{ borderRadius: "5px" }}>
                                {reviews.map((r, index) => (
                                    <MDBAccordionItem
                                        key={index}
                                        collapseId={index + 1}
                                        className="text-white"
                                        headerTitle={
                                            <>
                                                {r.author_details.rating && (
                                                    <div className="text-warning me-2">
                                                        <MDBIcon
                                                            icon="star"
                                                            className="me-2"
                                                        />
                                                        {
                                                            r.author_details
                                                                .rating
                                                        }
                                                    </div>
                                                )}
                                                <span>
                                                    {r.author} (
                                                    {formatDate(r.created_at)})
                                                </span>
                                            </>
                                        }
                                        style={{
                                            backgroundColor:
                                                "rgba(0, 0, 0, 0.5)",
                                        }}
                                    >
                                        {r.content}
                                    </MDBAccordionItem>
                                ))}
                            </MDBAccordion>
                        )}
                        {!reviews && <p> Nenhuma review encontrada</p>}
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

export default Reviews;
