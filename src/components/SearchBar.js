import React, { Component } from 'react';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.updateSearch = this.updateSearch.bind(this);
    }

    updateSearch(e) {
        this.props.updateSearch(e.target.value);
    }
    
    render() {
        return (
            <div className="container search-bar">
                <label for="searchInput">Search: </label>
                <input type="text" id="searchInput" className="form-control" placeholder="Search contact..." onChange={ e => this.updateSearch(e)} />
            </div>
        )
    }
}