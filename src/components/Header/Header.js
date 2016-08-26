import React from 'react'
import DocumentTitle from 'react-document-title';
export const Header = (props) => {

    const {category} = props,
        name = category.name || 'Cat';
    return (
        <DocumentTitle title={name}>
            <div className="main-header">
                {category.img ? <img src={category.img} height="30px"/> : <span className="glyphicon glyphicon-align-justify"></span>}
                <span className="title"> {name}</span>
                <span className="sub-title">{category.title}</span>
            </div>
        </DocumentTitle>
    )
};

Header.propTypes = {
    category: React.PropTypes.object.isRequired,
};

export default Header;
