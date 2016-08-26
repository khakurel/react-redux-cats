import { connect } from 'react-redux'
import { getCategories as getList } from '../modules/categories'

import CatList from '../../../components/Cat'

const mapDispatchToProps = {getList};

const mapStateToProps = (state) => ({
  items: state.categories.items
});

export default connect(mapStateToProps, mapDispatchToProps)(CatList)
