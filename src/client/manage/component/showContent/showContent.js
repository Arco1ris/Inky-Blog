import React from 'react';
import { Link } from 'react-router';
import { md } from '../../../md';

import './showContent.scss';

export class ShowContent extends React.Component {
    rawMarkup() {
        const data = this.props.data.initialValues;
        const rawMarkup = md.render(data.content.toString());
        return { __html: rawMarkup };
    }
    render() {
        const data = this.props.data.initialValues;
        const newPostUrl = `/admin/newpost/${data.id}`;
        return (
            <div className="show-content">
                <h3>
                    <Link to={ newPostUrl }>
                        {data.title}
                    </Link>
                </h3>
                <p>{data.time}</p>
                <div className = "the-content" dangerouslySetInnerHTML={this.rawMarkup()}></div>
            </div>
        );
    }
}

ShowContent.propTypes = {
    data: React.PropTypes.object,
    title: React.PropTypes.string,
    time: React.PropTypes.string,
};
