import React from 'react';
import { Link } from 'react-router';

export class About extends React.Component {
    render() {
        return (
            <ul>
                <li><Link to="/admin/about/1">ABOUT ONE</Link></li>
                <li><Link to="/admin/about/2">ABOUT TWO</Link></li>
            </ul>
        );
    }
}


About.propTypes = {
    title: React.PropTypes.string,
};
