import React, { Component } from 'react';

export default class ModalContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: props.userInfo,
        }
    }

    render() {
        const { userInfo } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <img src={userInfo.picture.thumbnail} className="modal-thumbnail" />
                </div>
                <div className="row modal-row">
                    <label>Name: </label>
                    <span>{userInfo.name.first + ' ' + userInfo.name.last}</span>
                </div>
                <div className="row modal-row">
                    <label>Username: </label>
                    <span>{userInfo.login.username}</span>
                </div>
                <div className="row modal-row">
                    <label>Email: </label>
                    <span>{userInfo.email}</span>
                </div>
                <div className="row modal-row">
                    <label>Address: </label>
                    <span>{userInfo.location.street + ', ' + userInfo.location.city + ', ' + userInfo.location.state + ', ' + userInfo.location.postcode}</span>
                </div>
                <div className="row modal-row">
                    <label>Phone: </label>
                    <span>{userInfo.phone}</span>
                </div>
                <div className="row modal-row">
                    <label>Cell: </label>
                    <span>{userInfo.cell}</span>
                </div>
            </div>
        );
    }
}