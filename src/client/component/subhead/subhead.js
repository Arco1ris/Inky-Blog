import React from 'react';
import moment from 'moment';
import './subhead.scss';

export class Subhead extends React.Component {
    render() {
        const myTime = moment(this.props.time * 1000);
        const formattedDate = myTime.format('YYYY-MM-DD hh:mm:ss a');
        return (
            <p className = "subhead">
                <span>{formattedDate}</span>
            </p>
        );
    }
}

Subhead.propTypes = {
    time: React.PropTypes.number,
};
