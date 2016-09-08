import React from 'react';
import { Icon } from 'antd';
import './sidePanel.scss';

export class SidePanel extends React.Component {
    handleChange(value) {
        this.props.changeCategory(value);
    }
    closeMenu(event) {
        event.preventDefault();
    }
    render() {
        const categories = this.props.categories;
        let select = [];
        if (categories.code === 0) {
            for (let i = 0; i < categories.data.length; i++) {
                select.push(<option key={categories.data[i]._id}
                                    value={categories.data[i]._id}>
                    {categories.data[i].myCategory}
                </option>);
            }
        }
        const category = this.props.category;
        return (
            <div className = 'side-panel'>
                <div className="menu-header">
                    <h4>Post Settings</h4>
                    <button className = "normal-button" onClick = {this.props.toggleSetting}>
                        <Icon type="cross" />
                    </button>
                </div>
                <div className = "form-select">
                    <label htmlFor="">Category</label>
                    <select className = "panel-select" {...category} value={category.value || ''}>
                        {select}
                    </select>
                    {category.touched && category.error &&
                    <p className = 'err'>{category.error}</p>}
                </div>
            </div>
        );
    }
}

SidePanel.propTypes = {
    categories: React.PropTypes.object,
    category: React.PropTypes.object,
    toggleSetting: React.PropTypes.func,
    changeCategory: React.PropTypes.func,

};
