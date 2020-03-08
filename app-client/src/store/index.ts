import { createStore, Store } from 'redux'
import { RepositoriesState } from './ducks/repositories/types'
import rootReducer from './ducks/rootReducers'

export interface AplicationState {
    repositories: RepositoriesState
}
const store: Store<AplicationState> = createStore(rootReducer)

export default store