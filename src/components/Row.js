import React, { Component } from 'react';

export default class Row extends Component {
    constructor(props) {
        super(props);
        var userInfo = props.userInfo;
        this.state = {
            userInfo: {
                no: props.index,
                thumbnail: userInfo.picture.thumbnail,
                first: userInfo.name.first,
                last: userInfo.name.last,
                username: userInfo.login.username,
                email: userInfo.email
            }
        };

        this.selectContact = this.selectContact.bind(this);
    }

    componentWillReceiveProps(props) {
        var userInfo = props.userInfo;
        this.setState({
            userInfo: {
                no: props.index,
                thumbnail: userInfo.picture.thumbnail,
                first: userInfo.name.first,
                last: userInfo.name.last,
                username: userInfo.login.username,
                email: userInfo.email
            }
        });
    }

    selectContact(index) {
        this.props.selectContact(index);
    }

    render() {
        const { userInfo } = this.state;
        return(
            <div className="row address-row" onClick={e => this.selectContact(userInfo.no)}>
                <div className="col-md-1">{userInfo.no}</div>
                <div className="col-md-3"><img src={userInfo.thumbnail} /></div>
                <div className="col-md-3">{userInfo.first} {userInfo.last}</div>
                <div className="col-md-2">{userInfo.username}</div>
                <div className="col-md-3">{userInfo.email}</div>
            </div>
        );
    }
}