import React from 'react'
import {Header} from 'components/Header/Header'
import {shallow} from 'enzyme'

describe('(Component) Header', () => {
    let wrapper;
    beforeEach(() => {
        const category = {title: 'Some title'};
        wrapper = shallow(<Header category={category}/>)
    });
    describe('When default', () => {


        it('Renders a sub  title', () => {
            const subTitle = wrapper.find('span.sub-title');
            expect(subTitle).to.exist;
            expect(subTitle.text()).to.match(/Some title/)
        });

        it('Should have  title', () => {
            const title = wrapper.find('span.title');
            expect(title).to.exist;
            expect(title.text()).to.match(/Cat/)
        });

        it('Should have  icon', () => {
            const icon = wrapper.find('span.glyphicon');
            expect(icon).to.exist;
        })

    });

    describe('When custom', () => {

        it('Renders a sub  title', () => {
            wrapper.setProps({category:{title: 'hello'}});
            const subTitle = wrapper.find('span.sub-title');
            expect(subTitle).to.exist;
            expect(subTitle.text()).to.match(/hello/)
        });

        it('Should have  title', () => {
            wrapper.setProps({category:{name: 'Hello Name'}});
            const title = wrapper.find('span.title');
            expect(title).to.exist;
            expect(title.text()).to.match(/Hello Name/)
        });

        it('Should have  img', () => {
            wrapper.setProps({category:{img: '/img.png'}});
            const icon = wrapper.find('span.glyphicon');
            expect(icon).not.to.exist;
            const img = wrapper.find('img');
            expect(img.prop('src')).to.equal('/img.png');
        })

    });
});
