import React, {PropTypes} from 'react'
import Cat  from './Cat';
import {NotFound}  from './NotFound';
import {Link} from 'react-router'
import Header from '../../components/Header'

export class CatList extends React.Component {

    static propTypes = {
        items: PropTypes.array.isRequired,
        getList:PropTypes.func.isRequired

    };

    static catItem(cat) {
        if (cat.key) {
            return <Link to={`/${cat.key}`}><Cat cat={cat}/></Link>
        } else {
            return <Cat cat={cat}/>
        }
    }

    componentWillMount() {
        this.props.getList(this.props.params.id);
    }

    static renderCat(items) {
        if (items.length === 0) {
            return <NotFound/>
        } else {
            return (<div className="row">
                {items.map(cat =>(<div className="col-md-3" key={cat.id}>{CatList.catItem(cat)}</div>))}
            </div>)
        }
    }

    render() {
        const {
            items,
            category = {title: 'Click on your favorite cat explore its photo', name: 'All Categories'}
        } = this.props;

        if (!category.title) {
            category.title = 'Use your browser history to go back to the list';
        }
        return (<div>
                <Header category={category}/>
                {CatList.renderCat(items)}
            </div>
        )

    }

}



