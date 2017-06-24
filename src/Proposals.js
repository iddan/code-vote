import React, { Component } from 'react';
import github from './github';
import Proposal from './Proposal';

class Proposals extends Component {

  state = {
    list: null,
    view: 5,
  };

  componentDidMount() {
    this.get();
  }

  get = async () => {
    const { repo } = this.props;
    const { data: list } = await github.search().forIssues({
      q: `label:"votes needed" repo:"${ repo.name }" user:"${ repo.user }"`,
    });
    this.setState({ list });
  }

  loadMore = () => {
    this.setState(state => ({
      ...state,
      view: state.view + 5,
    }));
  }

  render() {
    const { repo } = this.props;
    const { view, list } = this.state;

    if (!list) {
      return <span>Loading...</span>;
    }
    
    return (
      <div>
        {
          list.slice(0, view).map(({ number, title, body }) => (
            <Proposal key={ number }
                      number={ number }
                      title={ title }
                      body={ body }
                      repo={ repo } />
          ))
        }
        { view < list.length && <button onClick={ this.loadMore }>Load More</button> }
      </div>
    );
  }
}

export default Proposals;
