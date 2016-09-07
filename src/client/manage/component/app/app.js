import React from 'react';
import { Link } from 'react-router';
import './app.scss';
import { Icon } from 'antd';

export class App extends React.Component {
    render() {
        return (
            <div className = "appContainer">
                <div className = "leftPanel">
                    <ul>
                        <li key='list'>
                            <Link to={'/admin/newpost'}>
                                <Icon type="edit" />
                                New Post
                            </Link>
                        </li>
                        <li key='category'>
                            <Link to={'/admin/category'}>
                                <Icon type="folder" />
                                Category
                            </Link>
                        </li>
                        <li key='about'>
                            <Link to={'/admin/about'}>
                                <Icon type="setting" />
                                About
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className = "rightPanel">
                    { this.props.children }
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.object,
};

