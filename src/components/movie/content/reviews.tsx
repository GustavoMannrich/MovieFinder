import '../../../styles/main.css';
import {
    MDBContainer,
    MDBBtnGroup,
    MDBAccordion,
    MDBAccordionItem,
    MDBIcon,
    MDBRadio,
} from 'mdb-react-ui-kit';
import { IReview, getMovieReviews } from '../../../scripts/requests';
import { useEffect, useState } from 'react';
import ChooseLanguage from './choose-language';

interface IReviewsProps {
    movieId: number;
}

const Reviews = (props: IReviewsProps) => {
    const [reviews, setReviews] = useState<IReview[] | null>(null);

    useEffect(() => {
        fetchReviews('pt-BR');
    }, [props.movieId]);

    const fetchReviews = async (language: string) => {
        if (props.movieId > 0) {
            setReviews(await getMovieReviews(props.movieId, language));
        }
    };

    const reviewsLanguageClick = (language: string) => {
        fetchReviews(language);
    };

    const padTo2Digits = (num: number) => {
        return num.toString().padStart(2, '0');
    };

    const formatDate = (date: Date) => {
        let d = new Date(date);

        return [
            padTo2Digits(d.getDate()),
            padTo2Digits(d.getMonth() + 1),
            d.getFullYear(),
        ].join('/');
    };

    return (
        <>
            <MDBContainer className="mt-4" style={{ height: 'auto' }}>
                <h2 className="text-info">Reviews</h2>

                <ChooseLanguage
                    name="review"
                    onClick={reviewsLanguageClick}
                ></ChooseLanguage>

                <>
                    {reviews && (
                        <MDBAccordion flush style={{ borderRadius: '5px' }}>
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
                                                    {r.author_details.rating}
                                                </div>
                                            )}
                                            <span>
                                                {r.author} (
                                                {formatDate(r.created_at)})
                                            </span>
                                        </>
                                    }
                                    style={{
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    }}
                                >
                                    {r.content}
                                </MDBAccordionItem>
                            ))}
                        </MDBAccordion>
                    )}
                    {!reviews && <p> Nenhuma review encontrada</p>}
                </>
            </MDBContainer>
        </>
    );
};

export default Reviews;
