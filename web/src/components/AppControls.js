import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reset } from '../actions';


class AppControls extends Component {
    render() {
        return (
            <div id="controls">
                <a href="#" onClick={this.props.reset.bind(this)}>
                    <i className="fa fa-refresh"></i>
                </a>

                <Link to="/settings">Settings</Link>
            </div>
        );
    }
}

export default connect(null, { reset })(AppControls);