// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators, Dispatch } from 'redux'

// import { Repository } from '../../store/ducks/repositories/types'
// import { AplicationState } from '../../store/index'

// import * as RepositoriesActions from '../../store/ducks/repositories/actions'
// import RepositoryItem from '../RepositoyItem'

// //Mapear variaveis que vem de mapStateToProps
// interface StateProps {
//     repositories:  Repository[]
// }

// //Mapear variáveis que vem de mapDispatchToProps
// interface DispatchProps {
//     loadRequest(): void
// }

// // Props vinda de componentes Pais
// interface OwnProps {

// }

// type Props = StateProps & DispatchProps & OwnProps

// class RepositoryList extends Component<Props> {

//     componentDidMount() {
//         const { loadRequest } = this.props

//         loadRequest()
//     }

//     render() {
//         const { repositories } = this.props
//         return (<ul>
//             {repositories.map(repository => (
//                 <RepositoryItem key={repository.id} repository={repository} />
//             ))}
//         </ul>);
//     }
// }

// const mapStateToProps = (state: AplicationState)=> ({
//     repositories: state.repositories.data
// })

// const mapDispatchToProps = (dispatch: Dispatch) =>
//     bindActionCreators(RepositoriesActions, dispatch)

// export default connect(mapStateToProps, mapDispatchToProps)(RepositoryList)

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles({
	list: {
		width: 250
	},
	fullList: {
		width: "auto"
	}
});

export default function TemporaryDrawer() {
	const classes = useStyles();
	const [state, setState] = React.useState({
		isOpem: false
	});

	const sideList = () => (
		<div className={classes.list} role="presentation" onClick={() => setState({ ...state, isOpem: false })} onKeyDown={() => setState({ ...state, isOpem: false })}>
			<List>
				{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{["All mail", "Trash", "Spam"].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	return (
		<div>
			<Button onClick={() => setState({ ...state, isOpem: true })}>
				<MenuIcon />
			</Button>
			<Drawer open={state.isOpem} onClose={() => setState({ ...state, isOpem: false })}>
				{sideList()}
			</Drawer>
		</div>
	);
}
