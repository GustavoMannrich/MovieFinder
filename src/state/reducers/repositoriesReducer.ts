import { IMovies } from '../../scripts/requests';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface RepositoriesState {
    loading: boolean;
    error: string | null;
    data: IMovies;
}

const initialState = {
    loading: false,
    error: null,
    data: { movie_details: [], page: 0, total_pages: 0, total_results: 0 },
};

const reducer = (
    state: RepositoriesState = initialState,
    action: Action
): RepositoriesState => {
    switch (action.type) {
        case ActionType.SEARCH_MOVIES:
            return {
                loading: true,
                error: null,
                data: {
                    movie_details: [],
                    page: 0,
                    total_pages: 0,
                    total_results: 0,
                },
            };
        case ActionType.SEARCH_MOVIES_SUCCESS:
            return { loading: false, error: null, data: action.payload };
        case ActionType.SEARCH_MOVIES_ERROR:
            return {
                loading: false,
                error: action.payload,
                data: {
                    movie_details: [],
                    page: 0,
                    total_pages: 0,
                    total_results: 0,
                },
            };

        default:
            return state;
    }
};

export default reducer;
