import React from 'react';
import './maskPanel.scss';
import { Link } from 'react-router';

export class MaskPanel extends React.Component {
    showFull() {
        const id = this.props.id;
        this.props.onShowFull(id);
    }
    render() {
        return (
            <div className = "maskPanel" onClick={this.showFull.bind(this)} >
                <Link to={this.props.url}>
                    <p>{this.props.text}</p>
                </Link>
            </div>
        );
    }
}

MaskPanel.propTypes = {
    onShowFull: React.PropTypes.func,
    title: React.PropTypes.string,
    url: React.PropTypes.string,
    id: React.PropTypes.string,
    text: React.PropTypes.string,
};
