import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as InkyBackActions from './../../action';
import { Input } from './../input/input';
import { Link } from 'react-router';
import './category.scss';


function mapStateToProps(state) {
    const { articleReducer: { category }, isNew: { addNew } } = state;
    return { category, addNew };
}

function mapDispatchToProps(dispatch) {
    const {
        postOne,
        articleCategory,
        articleTitle,
        postNewCategory,
        deleteOneCategory,
        beFalse,
    } = bindActionCreators(InkyBackActions, dispatch);
    return {
        postOne,
        articleCategory,
        articleTitle,
        postNewCategory,
        deleteOneCategory,
        beFalse,
    };
}


class Category extends React.Component {
    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    componentWillMount() {
        this.props.articleCategory();
    }
    onClick(categoryId) {
        this.props.articleTitle(0, categoryId, 1);
        this.props.beFalse();
    }
    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.props.postNewCategory(event.target.value);
            // get all category
            this.props.articleCategory();
        }
    }
    deleteOne(categoryId) {
        const theCategoryId = { categoryId };
        this.props.deleteOneCategory(theCategoryId);
    }
    render() {
        console.log(this.props.category);
        if (Object.keys(this.props.category).length === 0) {
            return null;
        }
        let ListNodes = null;
        const headUrl = '/admin/category/';
        const category = this.props.category;
        if (category.code === 0 && category.data.length > 0) {
            ListNodes = category.data.map((item, key) => {
                let url = headUrl + item._id;
                return (
                    <div className="category-item" key={key} >
                        <Link to={ url } onClick={this.onClick.bind(this, item._id)}>
                            {item.myCategory}
                        </Link>
                        {item.quantity <= 0 ?
                            <button onClick={this.deleteOne.bind(this, item._id)}>DELETE</button>
                    : ''}
                        </div>
                );
            });
        }
        const newPostUrl = '/admin/newpost';
        return (
            <div>
                <header className="view-header">
                    <h2 className = 'view-title'>Category</h2>
                    <section className = 'view-action'>
                        <section className = 'save-setting'>
                            <button className = "btn btn-green" >
                                <Link to={ newPostUrl }>
                                    NEW POST
                                </Link>
                            </button>
                        </section>
                    </section>
                </header>
                <section className = "view-container">
                    <section className = "category-list">
                        <div>{ListNodes}</div>
                        <Input type="text" onKeyPress={this.handleKeyPress} />
                    </section>
                    { this.props.children }
                </section>
            </div>
        );
    }
}

Category.propTypes = {
    postOne: React.PropTypes.func,
    articleCategory: React.PropTypes.func,
    category: React.PropTypes.object,
    deleteOneCategory: React.PropTypes.func,
    articleTitle: React.PropTypes.func,
    beFalse: React.PropTypes.func,
    postNewCategory: React.PropTypes.func,
    addNew: React.PropTypes.bool,
    children: React.PropTypes.object,
};


export default connect(mapStateToProps, mapDispatchToProps)(Category);
