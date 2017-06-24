import React, { Component } from 'react';
import get from 'lodash/fp/get';
import github from './github';
import Reaction from './Reaction';

class IssueReactions extends Component {

  issueReactions = github.getIssueReactions(
    this.props.repo.user,
    this.props.repo.name,
    this.props.issueNumber
  );

  state = {
    data: {},
  };

  componentDidMount() {
    this.get();
  }

  react = (content) => {
    const { authenticated } = this.state;
    const reaction = authenticated && this.issueReactions.findMine({
      content,
      user: { id: authenticated.id },
    });
    Promise.resolve(
      reaction
        ? this.issueReactions.delete(reaction.id)
        : this.issueReactions.create({ content })
    )
    .then((data) => this.setState({ data }));
  }

  get = async () => {
    this.setState({ loading: true });
    const authenticated = github.authorized && await github.getAuthenticated();
    const data = await this.issueReactions.list();
    this.setState({ authenticated, data });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <Reaction content="+1"
                  emojy="👍"
                  count={ get(['+1', 'length'], data) }
                  onClick={ this.react } />
        <Reaction content="-1"
                  emojy="👎"
                  count={ get(['-1', 'length'], data) }
                  onClick={ this.react } />
        <Reaction content="smile"
                  emojy="😄"
                  count={ get(['smile', 'length'], data) }
                  onClick={ this.react } />
        <Reaction content="confused"
                  emojy="😕"
                  count={ get(['confused', 'length'], data) }
                  onClick={ this.react } />
        <Reaction content="heart"
                  emojy="❤️"
                  count={ get(['heart', 'length'], data) }
                  onClick={ this.react } />
        <Reaction content="hooray"
                  emojy="🎉"
                  count={ get(['hooray', 'length'], data) }
                  onClick={ this.react } />
      </div>
    );
  }
}

export default IssueReactions;
