import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './index'
import * as types from '../actionsConst/'

// sync actions test
describe('async : movie actions', () => {
  it('initiate the request to fetch data from top rated movie api', () => {
    expect(actions.requestTopRated()).toEqual({
      type: types.REQUEST_TOP_RATED,
      isRequesting: true
    })
  })

  it('handle receiveTopRated action, the fetch request sucess', ()=>{
    const json = {data: 'json data'}
    expect(actions.receiveTopRated(json)).toEqual({
      type: types.RECEIVE_TOP_RATED,
      json: json,
      isRequesting: false,
      requestFailed: false,
    })
  })

  it('handle requestFailed action, some fetch request failed', ()=>{
    const err = { msg: 'something is wrong!' };
    expect(actions.requestFailed(err)).toEqual({
      type: types.REQUEST_FAILED,
      err: err,
      requestFailed: true,
      isRequesting: false,
    })
  })
})

// async actions
const middleware = [thunk]
const mockStore = configureMockStore(middleware)

describe('async: movie actions', ()=>{
  afterEach(()=>{
    nock.cleanAll()
  })

  it('creates RECEIVE_TOP_RATED action when fetching movies has been done', ()=>{
    nock('https://api.themoviedb.org')
      .get('/3/movie/top_rated?api_key=4bef8838c2fd078bd13d7127d8dedcd4&language=en-US?&page=2')
      .reply(200, {
        results: ['movies array'],
        page: 2,
        totalPage: 10,
        totalResults: 100
      })

    const initState = {}
    const store = mockStore(initState)
    return store.dispatch(actions.fetchTopRated(2))
      .then(()=>{
        const actions = store.getActions()
        const expectedActions = [
          {
            "isRequesting": true,
            "type": "REQUEST_TOP_RATED"
          },
          {
            "isRequesting": false,
            "json": {
              "page": 2,
              "results": ["movies array"],
              "totalPage": 10,
              "totalResults": 100
            },
            "requestFailed": false,
            "type": "RECEIVE_TOP_RATED"
          }
        ]
        expect(actions).toEqual(expectedActions)
      })
  })
})
