import * as types from '../actionsConst'
import actionsState from './actionsState'

describe('actionsState', ()=>{
  it('should handle toggleMeun action', ()=>{
    const action = {
      type: types.TOGGLE_MEUN
    }

    const state = {
      menuActionState: {
        isMenuOpen: false
      },
      selectedMoviesList: {
        watchLaterList:[]
      }
    }

    expect(actionsState(state, action)).toEqual({
      menuActionState: {
        isMenuOpen: true
      },
      selectedMoviesList: {
        watchLaterList:[]
      }
    })
  })

  it('should handle SELECT_SINGLE_MOVIE action', ()=>{
    const action = {
      type: types.SELECT_SINGLE_MOVIE,
      movieId: 199
    }
    const state = {
      menuActionState: {
        isMenuOpen: false
      },
      selectedMoviesList: {
        watchLaterList:[]
      }
    }

    expect(actionsState(state, action)).toEqual({
      menuActionState: {
        isMenuOpen: false
      },
      selectedMoviesList: {
        watchLaterList:[199]
      }
    })
  })
})
