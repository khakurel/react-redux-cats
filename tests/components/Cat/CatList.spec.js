import React from 'react'
import {CatList} from 'components/Cat/CatList'
import {Cat} from 'components/Cat/Cat'
import Header from 'components/Header'
import {NotFound}  from 'components/Cat/NotFound';
import {Link} from 'react-router'
import {shallow} from 'enzyme'

describe('(Component) CatList', () => {

    let wrapper, spies = {getList: sinon.spy()}, props = {
        items: [],
        params: {},
        getList: spies.getList
    };

    const category = {
        "id": 1,
        "img": "https://drpem3xzef3kf.cloudfront.net//photos/pets/28336997/3/?bust=1418923753/?bust=&width=200",
        "name": "Samantha"
    };
    beforeEach(()=> {
        wrapper = shallow(<CatList {...props} />);
    });

    describe('Render', function () {


        it('Should render as a <div>.', () => {
            expect(wrapper.is('div')).to.equal(true)
        });

        it('Should have <NotFound>', () => {
            expect(wrapper.contains(<NotFound/>)).to.equal(true)
        });


        it('Should have <Header>', () => {
            wrapper.setProps({items: [category], category});
            expect(wrapper.contains(<Header category={category}/>)).to.equal(true)
        });

        it('Should have <Cat>s', () => {
            const category2 = {...category, id: 2};
            wrapper.setProps({items: [category, category2], category});
            expect(wrapper.find('.row').length).to.equal(1);
            expect(wrapper.find('.col-md-3').length).to.equal(2);
            expect(wrapper.contains(<Cat cat={category}/>)).to.equal(true);
            expect(wrapper.contains(<Cat cat={category2}/>)).to.equal(true)
        });

        it('Should have <Link>', () => {
            const _category = {...category, key: 'test'};
            wrapper.setProps({items: [_category]});
            wrapper.update();
            expect(wrapper.find('.row').length).to.equal(1);
            expect(wrapper.find('.col-md-3').length).to.equal(1);
            expect(wrapper.containsMatchingElement(<Link to="/test"><Cat cat={_category}/></Link>)).to.equal(true);
        });
    });

    describe("#componentWillMount", ()=> {
        it('Should called  `getList` from props', function () {
            wrapper.instance().componentWillMount();
            spies.getList.should.have.been.called;
        });
    })


});
