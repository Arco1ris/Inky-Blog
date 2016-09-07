import React from 'react';
import Button from '../../../../../node_modules/react-bootstrap/lib/Button';


export class MyButton extends React.Component {
    render() {
        return (
            <Button bsStyle={this.props.myStyle}
                    onClick={this.props.onClick}
                    type={this.props.type}>
                {this.props.text}
            </Button>
        );
    }
}

MyButton.propTypes = {
    onClick: React.PropTypes.func,
    text: React.PropTypes.string,
    type: React.PropTypes.string,
    myStyle: React.PropTypes.string,
};
