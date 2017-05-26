import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default function() {

    return (
        <div id="settings">
            Settings

            <div>
                <Link to="/" replace={true}>Back</Link>
            </div>
        </div>
    )

}