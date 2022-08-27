import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { getMovies } from '../../scripts/requests';

export const searchMovies = (
    genero: string,
    adult: boolean,
    page: number,
    sort: string,
    pessoa: string,
    dataInicial: Date | null,
    dataFinal: Date | null,
    voteCount: number
) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SEARCH_MOVIES,
        });

        try {
            const movies = await getMovies(
                genero,
                adult,
                page,
                sort,
                pessoa,
                dataInicial,
                dataFinal,
                voteCount
            );

            dispatch({
                type: ActionType.SEARCH_MOVIES_SUCCESS,
                payload: movies,
            });
        } catch (err: any) {
            dispatch({
                type: ActionType.SEARCH_MOVIES_ERROR,
                payload: err.message,
            });
        }
    };
};
