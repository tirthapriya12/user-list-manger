import types from './types';

const recipesUrl = "http://starlord.hackerearth.com/recipe";

export const getRecipes = (callback) => (dispatch) => {
    dispatch(setRecipesLoading());

    fetch(recipesUrl).then((res) => res.json()).then((recipes) => {
        dispatch(setRecipes(recipes));
        callback && callback();
    })
}

const setRecipesLoading = () => {
    return {
        type: types.RECIPES_LOADING
    }
}

const setRecipes = (payload) =>{
    return {
        type: types.GET_RESCIPES,
        payload
    }
}