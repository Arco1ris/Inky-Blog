import React from 'react';
import './about.scss';
import { Icon } from 'antd';


export class About extends React.Component {
    render() {
        return (
            <div>
                <Icon type="github" />
                update soon...
            </div>
        );
    }
}

About.propTypes = {
    title: React.PropTypes.string,
};
