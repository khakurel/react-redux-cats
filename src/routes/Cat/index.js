import { injectReducer } from '../../store/reducers'

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Counter = require('./containers/CategoriesContainer').default;
      const reducer = require('./modules/categories').default;

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'categories', reducer });

      /*  Return getComponent   */
      cb(null, Counter);

    /* Webpack named bundle   */
    }, 'cats')
  }
})

export const CatListRoute = (store) => ({
  path: '/:id',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Counter = require('./containers/ListContainer').default;
      const reducer = require('./modules/categories').ListReducer;

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'list', reducer });

      /*  Return getComponent   */
      cb(null, Counter);

      /* Webpack named bundle   */
    }, 'cats')
  }
});
