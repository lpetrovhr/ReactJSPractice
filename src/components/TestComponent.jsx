var React = require('react');
var axios = require('axios');

var TestComponent = React.createClass({
  getInitialState: function(){
    return{
      todos: [],
      newTodo: ''
    };
  },

  componentDidMount: function(){
    this.getRequest();
  },

    getRequest: function(){
        return axios.get('http://localhost:3000/todos/')
            .then(function(response){
                console.log(response);
                this.setState({
                    todos: response.data.todos
                })
            }.bind(this))
            .catch(function(response){
                console.log(response);
            })
    },

  updateNewTodo: function(e){
    this.setState({newTodo: e.target.value});
  },

  getAllTodos: function(){
    var items = this.state.todos;

    return(<div>
      {items.map(function(item){
          return <div><input type="checkbox"/>{item.name}</div>
          })}
    </div>);
  },

  addNewItem: function(e){
        e.preventDefault();
        return axios.post('http://localhost:3000/todos/', {name: this.state.newTodo})
      .then(function(){
          this.getRequest()
      }.bind(this))
  },

  render: function() {
    return (
        <div>
          <form onSubmit={this.addNewItem}>
          <input type="text" value={this.state.newTodo} onChange={this.updateNewTodo}/>
          <button type="submit"> Add Todo</button>
          </form>
          <div>Todo: {this.state.newTodo}</div>
          <div>{this.getAllTodos()}</div>
        </div>

    );
  }
});

module.exports = TestComponent;
