import React from 'react';
import Row from '../components/Row';
import Modal from 'react-responsive-modal';
import ModalContent from '../components/ModalContent';
import SearchBar from '../components/SearchBar';
import $ from 'jquery';
import ReactLoading from 'react-loading';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            users: [],
            filterUsers: [],
            searchString: '',
            loading: false,
            error: false,
            message: '',
            showModal: false,
            selectedContact: 0
        }
        
        this.nextUsers = this.nextUsers.bind(this);
        this.selectContact = this.selectContact.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.filterByString = this.filterByString.bind(this);
    }
    
    componentWillMount() {
        this.nextUsers();
    }
    
    componentDidMount() {
        var that = this;
        $(document).on('scroll', function() {
        if($(document).height() - $(document).scrollTop() - $(window).height() < 50) {
            that.nextUsers();
        }
        });
    }
    
    onCloseModal() {
        this.setState({
            showModal: false
        });
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
                        error: true,
                        message: json.error
                    });
            
                    return;
                }
                var additionalUsers = json.results;
                var newUsers = users.concat(additionalUsers);
                this.setState({
                    users: newUsers,
                    filterUsers: this.filterByString(newUsers, searchString),
                    loading: false,
                    error: false
                });
            });
        } else {
        this.setState({
            error: true,
            message: 'End of Users Catalog',
            loading: false
        })
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
        const { filterUsers, loading, error, message, showModal, selectedContact, searchString } = this.state;
        return (
            <div className="App">
                <div className="app-header">
                <div className="app-header-title">Address Book<a href="/setting" className="app-header-setting">Setting</a></div>
                <SearchBar updateSearch={this.updateSearch} searchString={searchString} />
                </div>
                <div className="container address-body">
                { filterUsers.map((user, index) => (
                    <Row userInfo={user} index={index + 1} selectContact={this.selectContact}/>
                ))}
                </div>
                { (filterUsers.length > 0)?(
                <Modal open={showModal} onClose={this.onCloseModal} >
                    <ModalContent userInfo={filterUsers[selectedContact-1]} />
                </Modal>
                ): (null)
                }
                { (loading)?(
                    <ReactLoading className="loader" type="spin" color="#238F92" height={'50px'} width={'50px'} />
                ): (null)}
                { (error)?(
                    <div className="container warning">{message}</div>
                ): (null)
                }
            </div>
        );
    }
}