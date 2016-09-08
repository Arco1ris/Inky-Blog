import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as InkyBackActions from './../../action';
import EditForm from './../editForm/edit';

function mapStateToProps(state) {
    const { articleReducer: { category, oneArticle }, isNew: { addNew } } = state;
    return { category, oneArticle, addNew };
}

function mapDispatchToProps(dispatch) {
    const {
        beFalse,
    } = bindActionCreators(InkyBackActions, dispatch);
    return {
        beFalse,
    };
}


class NewPost extends React.Component {
    render() {
        const isNew = this.props.addNew;
        const id = this.props.params.id;
        const oneArticle = this.props.oneArticle;
        let props = {};
        let action = 'postOne';
        if (isNew || !id) {
            props = {
                initialValues: { id: '', title: '', category: '', time: '', content: '' },
            };
        } else {
            if (oneArticle.code === 0) {
                props = {
                    initialValues: {
                        id: oneArticle.data._id,
                        title: oneArticle.data.title,
                        category: oneArticle.data.category,
                        time: oneArticle.data.createdTime,
                        content: oneArticle.data.content },
                };
                action = 'updateOne';
            }
        }
        const Article = <EditForm {...props} action = { action } />;
        return (
            <section>
                {Article}
            </section>
        );
    }
}

NewPost.propTypes = {
    id: React.PropTypes.string,
    oneArticle: React.PropTypes.object,
    params: React.PropTypes.object,
    category: React.PropTypes.object,
    beFalse: React.PropTypes.func,
    addNew: React.PropTypes.bool,
    children: React.PropTypes.object,
};


export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
