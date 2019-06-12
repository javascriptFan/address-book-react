import React from 'react';
import Row from './components/Row';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      searchString: '',
      loading: false,
      error: false
    }

    this.onSearch = this.onSearch.bind(this);
    this.nextUsers = this.nextUsers.bind(this);
  }

  componentWillMount() {
    this.nextUsers();
  }

  onSearch(searchString) {

  }

  nextUsers() {
    this.setState({
      loading: true
    });

    var { users } = this.state;

    if(users.length < 1000) {
      fetch('https://randomuser.me/api/?results=50')
      .then(resp => resp.json())
      .then(json => {
        if(json.error) {
          console.log('Fetch error - ', json.error);
          this.setState({
            loading: false,
            error: true
          });

          return;
        }
        var additionalUsers = json.results;
        var newUsers = users.concat(additionalUsers);
        this.setState({
          users: newUsers,
          loading: false
        });
      });
    }
  }

  render() {
    const { users, loading, error } = this.state;
    return (
      <div className="App">
        <div className="container app-header">Address Book</div>
        <div className="container address-body">
          { users.map((user, index) => (
            <Row userInfo={user} index={index} />
          ))}
        </div>
      </div>
    );
  }

}

export default App;
