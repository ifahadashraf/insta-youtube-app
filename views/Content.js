var React = require('react');

class TodoList extends React.Component {
  render() {
    var i = 0;
    var createItem = function({node}) {
      return <li key={i++}><img src={node.display_url} width="400px"/></li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
}

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = props;
  }
  onChange(e) {
    this.setState({text: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  }
  render() {
    return (
      <div className="container">
        <h3>TODO List</h3>
        <TodoList items={this.state.edge_owner_to_timeline_media.edges} />
        <form className="form-inline">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Write task"
              onChange={this.onChange}
              value={this.state.text}
            />
            &nbsp;
          </div>
          <button className="btn btn-primary">Add</button>
        </form>
      </div>
    );
  }
}

module.exports = TodoApp;
