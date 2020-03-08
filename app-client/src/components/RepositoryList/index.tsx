import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { Repository } from '../../store/ducks/repositories/types'
import { AplicationState } from '../../store/index'

import * as RepositoriesActions from '../../store/ducks/repositories/actions'
import RepositoryItem from '../RepositoyItem'

//Mapear variaveis que vem de mapStateToProps
interface StateProps {
    repositories:  Repository[]
}

//Mapear variáveis que vem de mapDispatchToProps
interface DispatchProps {
    loadRequest(): void
}

// Props vinda de componentes Pais
interface OwnProps {

}

type Props = StateProps & DispatchProps & OwnProps

class RepositoryList extends Component<Props> {

    componentDidMount() {
        const { loadRequest } = this.props

        loadRequest()
    }

    render() {
        const { repositories } = this.props
        return (<ul>
            {repositories.map(repository => (
                <RepositoryItem key={repository.id} repository={repository} />
            ))}
        </ul>);
    }
}

const mapStateToProps = (state: AplicationState)=> ({
    repositories: state.repositories.data
})

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(RepositoriesActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryList)