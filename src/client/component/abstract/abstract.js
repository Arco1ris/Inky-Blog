import React from 'react';
import { md } from '../../md';

import './abstract.scss';

export class Abstract extends React.Component {
    rawMarkup() {
        const rawMarkup = md.render(this.props.text.toString());
        return { __html: rawMarkup };
    }
    render() {
        return (
            <div className = "abstract">
                <div dangerouslySetInnerHTML={this.rawMarkup()}></div>
            </div>
        );
    }
}


Abstract.propTypes = {
    text: React.PropTypes.string,
};
