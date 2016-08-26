import React, {PropTypes} from 'react'


export class Cat extends React.Component {

    static propTypes = {
        cat: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = { hasImage: false };
    }

    handleImageLoaded() {
        this.setState({ hasImage: true });
    }

    render() {
        const {hasImage} = this.state;
        const {cat} = this.props;
        return (<div className="panel panel-default">
            <div className={`panel-body ${hasImage ?  'loaded' : '' }`}>
                <img
                    src={cat.img}
                    onLoad={this.handleImageLoaded.bind(this)}
                />
            </div>
            <div className="panel-footer">{cat.name}</div>
        </div>)
    }

}


export default Cat
