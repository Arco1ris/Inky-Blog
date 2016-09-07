import React from 'react';
import './smallPanel.scss';
import { Select } from 'antd';
const Option = Select.Option;


export class SmallPanel extends React.Component {
    handleChange(value) {
        this.props.handleChange(value);
    }
    render() {
        console.log(this.props);
        return (
            <div className = "small-panel">
                <p>Save or Delete</p>
                <Select defaultValue="提交方式" style={{ width: 102 }} onChange={this.handleChange.bind(this)}>
                    <Option value="save">save</Option>
                    <Option value="delete">delete</Option>
                </Select>
            </div>
        );
    }
}

SmallPanel.propTypes = {
    handleChange: React.PropTypes.func,
};
