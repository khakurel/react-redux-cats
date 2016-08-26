import { connect } from 'react-redux'
import {getList } from '../modules/categories'

import CatList from '../../../components/Cat'

const mapDispatchToProps = {getList};

const mapStateToProps = (state) => ({
  items: state.list.items,
  category: state.list.category
});

export default connect(mapStateToProps, mapDispatchToProps)(CatList)
