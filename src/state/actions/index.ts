import { ActionType } from '../action-types';
import { IMovies } from '../../scripts/requests';

interface SearchMoviesAction {
    type: ActionType.SEARCH_MOVIES;
}

interface SearchMoviesSuccessAction {
    type: ActionType.SEARCH_MOVIES_SUCCESS;
    payload: IMovies;
}

interface SearchMoviesErrorAction {
    type: ActionType.SEARCH_MOVIES_ERROR;
    payload: string;
}

export type Action =
    | SearchMoviesAction
    | SearchMoviesSuccessAction
    | SearchMoviesErrorAction;
