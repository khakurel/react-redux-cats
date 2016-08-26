import {CatDataSource} from '../../../data/cats'
import _ from 'lodash';
// ------------------------------------
// Constants
// ------------------------------------
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_LIST = 'GET_LIST';

// ------------------------------------
// Actions Creator
// ------------------------------------

export const getCategories = ()=> {
    return (dispatch, getState) => {
        let items = getState().categories.items;
        if (items.length === 0) {
            items = CatDataSource;
        }
        dispatch(receive(items));
    }
};


export const getList = (key)=> {
    return (dispatch, getState) => {
        const state = getState(),
            categories = _.get(state, 'categories.items', CatDataSource),
            category = _.find(categories, item => item.key === key) || {category: {items: []}};

        dispatch(receiveItem(category));
    }
};

// ------------------------------------
// Action Handlers
// ------------------------------------
export const receive = (items = []) => {
    return {
        type: GET_CATEGORIES,
        items
    }
};

export const receiveItem = (category) => {
    return {
        type: GET_LIST,
        category
    }
};


// ------------------------------------
// Reducer
// ------------------------------------
function CategoriesReducer(state = {
    items: []
}, action) {
    switch (action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                items: action.items,
            };

        default:
            return state
    }
}

function List(state = {
    items: [],
    category: {}
}, action) {
    switch (action.type) {
        case GET_LIST:
            return {
                ...state,
                category: action.category,
                items: _.get(action, 'category.items', []),
            };

        default:
            return state
    }
}


export default CategoriesReducer;
export const ListReducer = List;