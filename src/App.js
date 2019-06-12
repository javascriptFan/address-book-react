import React from 'react';
import Row from './components/Row';
import Modal from 'react-responsive-modal';
import ModalContent from './components/ModalContent';
import SearchBar from './components/SearchBar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      filterUsers: [],
      searchString: '',
      loading: false,
      error: false,
      showModal: false,
      selectedContact: 0
    }

    this.onSearch = this.onSearch.bind(this);
    this.nextUsers = this.nextUsers.bind(this);
    this.selectContact = this.selectContact.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.filterByString = this.filterByString.bind(this);
  }

  componentWillMount() {
    this.nextUsers();
  }

  onCloseModal() {
    this.setState({
      showModal: false
    });
  }

  onSearch(searchString) {

  }

  nextUsers() {
    this.setState({
      loading: true
    });

    var { users, searchString } = this.state;

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
          filterUsers: this.filterByString(newUsers, searchString),
          loading: false
        });
      });
    }
  }

  filterByString(users, string) {
    return users.filter(el => {
      if(el.name.first.indexOf(string) > -1 || el.name.last.indexOf(string) > -1) {
        return el;
      }
    });
  }

  selectContact(index) {
    this.setState({
      showModal: true,
      selectedContact: index
    });
  }

  updateSearch(string) {
    const { users } = this.state;
    this.setState({
      searchString: string,
      filterUsers: this.filterByString(users, string)
    });
  }

  render() {
    const { filterUsers, loading, error, showModal, selectedContact, searchString } = this.state;
    console.log(filterUsers);
    return (
      <div className="App">
        <div className="container app-header">Address Book</div>
        <SearchBar updateSearch={this.updateSearch} searchString={searchString} />
        <div className="container address-body">
          { filterUsers.map((user, index) => (
            <Row userInfo={user} index={index + 1} selectContact={this.selectContact}/>
          ))}
        </div>
        { (filterUsers.length > 0)?(
          <Modal open={showModal} onClose={this.onCloseModal} >
            <ModalContent userInfo={filterUsers[selectedContact]} />
          </Modal>
        ): (null)
        }
      </div>
    );
  }

}

export default App;
