import React, { Component } from 'react';

export default class Row extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                no: 0,
                thumbnail: '',
                first: 'asdf',
                last: 'qewrqwer',
                username: 'asdfa',
                email: 'asdf@asdf.com'
            }
        };
    }

    render() {
        const { userInfo } = this.state;
        return(
            <div className="row address-row">
                <div className="col-md-1">{userInfo.no}</div>
                <div className="col-md-3"><img src={userInfo.thumbnail} /></div>
                <div className="col-md-3">{userInfo.first} {userInfo.last}</div>
                <div className="col-md-2">{userInfo.username}</div>
                <div className="col-md-3">{userInfo.email}</div>
            </div>
        );
    }
}