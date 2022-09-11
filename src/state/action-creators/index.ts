import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { getMovies, getMoviesTrending } from "../../scripts/requests";
import { IFilter } from "../../utils/interfaces";

export const searchMovies = (filtro: IFilter | null) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SEARCH_MOVIES,
        });

        try {
            if (filtro) {
                let movies = await getMovies(
                    filtro.searchTerm,
                    filtro.genero,
                    filtro.page,
                    filtro.sort,
                    filtro.pessoa,
                    filtro.dataInicial,
                    filtro.dataFinal,
                    filtro.voteCount,
                    filtro.keyword
                );

                dispatch({
                    type: ActionType.SEARCH_MOVIES_SUCCESS,
                    payload: movies,
                });
            } else {
                let movies = await getMoviesTrending();

                dispatch({
                    type: ActionType.SEARCH_MOVIES_SUCCESS,
                    payload: movies,
                });
            }
        } catch (err: any) {
            dispatch({
                type: ActionType.SEARCH_MOVIES_ERROR,
                payload: err.message,
            });
        }
    };
};
