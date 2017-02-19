import { connect } from 'react-redux'
import { searchUserCollection }  from '../actions'
import BggUsernameInput from './BggUsernameInput'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    searchCollection: username => {
      dispatch(searchUserCollection(username))
    }
  }
}

const BggUsernameInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BggUsernameInput)

export default BggUsernameInputContainer
