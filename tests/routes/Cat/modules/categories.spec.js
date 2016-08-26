import {
    GET_CATEGORIES,
    GET_LIST,
    receive,
    receiveItem,
    getCategories,
    getList,
    ListReducer,
    default as CategoriesReducer
} from '../../../../src/routes/Cat/modules/categories'
import {CatDataSource} from '../../../../src/data/cats'

describe('(Redux Module) Categories', () => {

    describe('Constants', ()=> {
        it('Should export a constant GET_CATEGORIES.', () => {
            expect(GET_CATEGORIES).to.equal('GET_CATEGORIES')
        });

        it('Should export a constant GET_LIST.', () => {
            expect(GET_LIST).to.equal('GET_LIST')
        });
    });

    describe('(Reducer) CategoriesReducer', () => {
        it('Should be a function.', () => {
            expect(CategoriesReducer).to.be.a('function')
        });

        it('Should initialize with a state of items (Array) empty.', () => {
            expect(CategoriesReducer(undefined, {})).to.deep.equal({items: []})
        });

        it('Should return the previous state if an action was not matched.', () => {
            let state = CategoriesReducer(undefined, {});
            expect(state).to.deep.equal({items: []});
            state = CategoriesReducer(state, {type: '@@@@@@@'});
            expect(state).to.deep.equal({items: []});
            state = CategoriesReducer(state, receive([{id: 1}]));
            expect(state).to.deep.equal({items: [{id: 1}]});
            state = CategoriesReducer(state, {type: '@@@@@@@'});
            expect(state).to.deep.equal({items: [{id: 1}]});
        })
    });

    describe('(Reducer) ListReducer', () => {
        it('Should be a function.', () => {
            expect(ListReducer).to.be.a('function')
        });

        it('Should initialize with a state of items (Array) empty.', () => {
            expect(ListReducer(undefined, {})).to.deep.equal({items: [], category: {}})
        });

        it('Should return the previous state if an action was not matched.', () => {
            let state = ListReducer(undefined, {});
            expect(state).to.deep.equal({items: [], category: {}});
            state = ListReducer(state, {type: '@@@@@@@'});
            expect(state).to.deep.equal({items: [], category: {}});
            state = ListReducer(state, receiveItem({id: 1, items: [{id: 2}]}));
            expect(state).to.deep.equal({items: [{id: 2}], category: {id: 1, items: [{id: 2}]}});
            state = ListReducer(state, {type: '@@@@@@@'});
            expect(state).to.deep.equal({items: [{id: 2}], category: {id: 1, items: [{id: 2}]}})
        })
    });

    describe('(Action Handler) receive', () => {
        it('Should be exported as a function.', () => {
            expect(receive).to.be.a('function')
        });

        it('Should return an action with type "GET_CATEGORIES".', () => {
            expect(receive()).to.have.property('type', GET_CATEGORIES)
        });

        it('Should assign the first argument to the "items" property.', () => {
            expect(receive([{id: 1}]).items).to.deep.equal([{id: 1}])
        });

        it('Should default the "items" property to empty if not provided.', () => {
            expect(receive().items).to.be.empty
        })
    });

    describe('(Action Handler) receiveItem', () => {
        it('Should be exported as a function.', () => {
            expect(receiveItem).to.be.a('function')
        });

        it('Should return an action with type "GET_CATEGORIES".', () => {
            expect(receiveItem()).to.have.property('type', GET_LIST)
        });

        it('Should assign the first argument to the "category" property.', () => {
            expect(receiveItem({id: 1})).to.have.deep.property('category.id', 1)
        });

        it('Should default the "category" property to be undefined if not provided.', () => {
            expect(receiveItem().category).to.be.undefined
        })
    });

    describe('(Action Creator) getCategories', ()=> {

        let globalState;
        let dispatchSpy;
        let getStateSpy;

        beforeEach(() => {
            globalState = {
                categories: CategoriesReducer(undefined, {})
            };
            dispatchSpy = sinon.spy((action) => {
                globalState = {
                    ...globalState,
                    categories: CategoriesReducer(globalState.categories, action)
                }
            });
            getStateSpy = sinon.spy(() => {
                return globalState
            });
        });


        it('Should be exported as a function.', () => {
            expect(getCategories).to.be.a('function')
        });

        it('Should return a function.', () => {
            expect(getCategories()).to.be.a('function')
        });

        it('Should return full Categories.', () => {
            getCategories()(dispatchSpy, getStateSpy);
            expect(dispatchSpy).to.have.been.calledWith({type: GET_CATEGORIES, items: CatDataSource});
        });

        it('Should return  Categories from state.', () => {
            globalState = {
                categories: CategoriesReducer({items: [{id: 1}, {id: 2}]}, GET_CATEGORIES)
            };
            getCategories()(dispatchSpy, getStateSpy);
            expect(dispatchSpy).to.have.been.calledWith({type: GET_CATEGORIES, items: [{id: 1}, {id: 2}]});
        })

    });

    describe('(Action Creator) getList', ()=> {

        let globalState;
        let dispatchSpy;
        let getStateSpy;

        beforeEach(() => {
            globalState = {
                category: ListReducer(undefined, {})
            };
            dispatchSpy = sinon.spy((action) => {
                globalState = {
                    ...globalState,
                    category: ListReducer(globalState.category, action)
                }
            });
            getStateSpy = sinon.spy(() => {
                return globalState
            });
        });


        it('Should be exported as a function.', () => {
            expect(getList).to.be.a('function')
        });

        it('Should return a function.', () => {
            expect(getList()).to.be.a('function')
        });

        it('Should return  List for CatDataSource.', () => {
            getList('american_bobtail')(dispatchSpy, getStateSpy);
            expect(dispatchSpy).to.have.been.calledWith({type: GET_LIST, category: CatDataSource[1]});
        });

        it('Should return  List from state.', () => {
            globalState = {
                categories: CategoriesReducer({items: [{id: 1, key: 'test', items: [1, 2]}]}, GET_CATEGORIES)
            };
            getList('test')(dispatchSpy, getStateSpy);
            expect(dispatchSpy).to.have.been.calledWith({type: GET_LIST, category: {id: 1, key: 'test', items: [1, 2]}});
        })

    });


});
