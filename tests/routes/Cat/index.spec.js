import CounterRoute, {CatListRoute} from '../../../src/routes/Cat'

describe('(Route) Categories', () => {
  let _route;

  beforeEach(() => {
    _route = CounterRoute({})
  });

  it('Should return a route configuration object', () => {
    expect(typeof(_route)).to.equal('object');
  });

  it('Configuration should not contain path `counter`', () => {
    expect(_route.path).to.be.undefined;
  })

});

describe('(Route) Cat', () => {
  let _route;

  beforeEach(() => {
    _route = CatListRoute({})
  });

  it('Should return a route configuration object', () => {
    expect(typeof(_route)).to.equal('object')
  });

  it('Configuration should contain path `/:id`', () => {
    expect(_route.path).to.equal('/:id')
  })

});
