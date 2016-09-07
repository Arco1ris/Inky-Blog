import React from 'react';
import { FormControl } from 'react-bootstrap/lib';


export class Input extends React.Component {
    render() {
        return (
            <FormControl
                type={this.props.type}
                value={this.props.value}
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                onKeyPress={this.props.onKeyPress}
                readOnly = {this.props.readOnly}
            />
        );
    }
}

Input.propTypes = {
    type: React.PropTypes.string,
    value: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onKeyPress: React.PropTypes.func,
    readOnly: React.PropTypes.string,
    onChange: React.PropTypes.func,
};
