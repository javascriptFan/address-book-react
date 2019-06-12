import React from 'react';
import Row from './components/Row';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      searchString: ''
    }

    this.onSearch = this.onSearch.bind(this);
    this.nextUsers = this.nextUsers.bind(this);
  }

  onSearch(searchString) {

  }

  render() {
    return (
      <div className="App">
        <div className="container app-header">Address Book</div>
        <div className="container address-body">
          <Row />
        </div>
      </div>
    );
  }

}

export default App;
