import React from 'react';
import { md } from '../../md';

import './text.scss';

// 对 highlight 的设置主要是渲染 DOM 时带上需要的 className,
// 但是每个 className 对应的 css 应该是怎样需要另外再引入相应的 css
export class Text extends React.Component {
    rawMarkup() {
        const rawMarkup = md.render(this.props.text.toString());
        return { __html: rawMarkup };
    }
    render() {
        return (
            <div className = "text">
                <div dangerouslySetInnerHTML={this.rawMarkup()}></div>
            </div>
        );
    }
}


Text.propTypes = {
    text: React.PropTypes.string,
};
