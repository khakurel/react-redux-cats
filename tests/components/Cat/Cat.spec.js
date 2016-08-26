import React from 'react'
import {Cat} from 'components/Cat/Cat'
import {shallow} from 'enzyme'

describe('(Component) Cat', () => {
    let wrapper;
    const cat = {
        "id": 1,
        "img": "https://drpem3xzef3kf.cloudfront.net//photos/pets/28336997/3/?bust=1418923753/?bust=&width=200",
        "name": "Samantha"
    };
    beforeEach(()=> {
        wrapper = shallow(<Cat cat={cat}/>);
    });

    it('Should render as a <div>.', () => {
        expect(wrapper.is('div')).to.equal(true)
    });

    it('Should render img with correct src', () => {
        expect(wrapper.find('img').prop('src')).to.equal(cat.img);
    });

    it('Should render div.footer with correct name', () => {
        expect(wrapper.find('.panel-footer').text()).to.equal(cat.name);
    });

    it('Should render div with class loaded', () => {
        wrapper.setState({hasImage: true});
        expect(wrapper.find('div.panel-body').hasClass('panel-body loaded')).to.equal(true);
    });


    it('Should set state.hasImage true', ()=> {
        wrapper.instance().handleImageLoaded();
        expect(wrapper.state('hasImage')).to.equal(true);
    })

});
