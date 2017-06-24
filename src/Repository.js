import React, { Component } from 'react';
import PropTypes from 'prop-types';
import flow from 'lodash/fp/flow';
import github from './github';
import Proposals from './Proposals';

const getTitle = ({ match: { params: { user, name } } }) => ({ user, name });

const getFullName = flow([
  getTitle,
  ({ user, name }) => `${ user }/${ name }`,
]);

class Repository extends Component {

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        user: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  state = {};

  repo = Object.assign(github.getRepo(getTitle(this.props)), getTitle(this.props));

  componentDidMount() {
    console.log(this.repo);
  }

  render() {
    const { logo } = this.state;
    return (
      <div>
        <header>
          <div />
          <img src={ logo } />
          <h1>{ getFullName(this.props) }</h1>
        </header>
        <Proposals repo={ this.repo } />
      </div>
    );
  }
}

export default Repository;
