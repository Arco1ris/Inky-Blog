import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as InkyEditActions from './../../action';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import { BaseForm } from '../baseForm/baseForm';
import { message } from 'antd';

function mapStateToProps(state) {
    const { articleReducer: { category, result }, isNew: { addNew } } = state;
    return { category, result, addNew };
}

function mapDispatchToProps(dispatch) {
    const {
        deleteOne,
        beFalse,
        articleCategory,
        postOne,
        updateOne,
        toTrash,
    } = bindActionCreators(InkyEditActions, dispatch);
    return { deleteOne, beFalse, articleCategory, postOne, updateOne, toTrash };
}

const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = '必填';
    } else if (values.title.length > 15) {
        errors.title = '必须少于15个字符';
    }
    if (!values.content) {
        errors.content = '必填';
    } else if (values.content.length < 30) {
        errors.content = '必须大于30个字符';
    }
    if (!values.category) {
        errors.category = '必选';
    }
    return errors;
};

class EditForm extends React.Component {
    componentWillMount() {
        this.props.articleCategory();
    }
    onBack() {
        this.props.beFalse();
    }
    handleSubmit(form) {
        const { action } = this.props;
        const time = Date.now() / 1000 | 0;
        const baseArticle = {
            title: form.title,
            category: form.category,
            content: form.content,
        };
        let doAction = null;
        if (action === 'postOne') {
            doAction = this.props.postOne;
        } else {
            doAction = this.props.updateOne;
        }
        if (!form.id) {
            const createdTime = { createdTime: time };
            const newArticle = Object.assign({}, createdTime, baseArticle);
            doAction(newArticle);
        } else {
            const oldId = { articleId: form.id };
            const updateOldArticle = Object.assign({}, oldId, baseArticle);
            doAction(updateOldArticle);
        }
        this.props.beFalse();
    }
    componentWillUpdate(nextProps) {
        if (this.props.result === '' && nextProps.result) {
            message.success('操作成功');
        }
    }
    render() {
        const { fields: { id, title, category, time, content }, handleSubmit } = this.props;
        const myTime = moment(time.value * 1000);
        const formattedDate = myTime.format('YYYY-MM-DD hh:mm:ss');
        // 这里需要修改文章类型对应的 ID
        const allCategory = this.props.category;
        if (!allCategory) {
            return null;
        }
        const select = [];
        if (allCategory.code === 0) {
            for (let i = 0; i < allCategory.data.length; i++) {
                select.push(<option key={allCategory.data[i]._id}
                                    value={allCategory.data[i]._id}>
                    {allCategory.data[i].myCategory}
                </option>);
            }
        }
        console.log(id);
        return (
            <BaseForm id={id} title={title} category={category}
                      time={formattedDate} content={content} categories={allCategory}
                      submit={handleSubmit(this.handleSubmit.bind(this))}
                      toTrash={this.props.toTrash}
                      beFalse={this.props.beFalse}
            />
        );
    }
}

EditForm.propTypes = {
    addNew: React.PropTypes.bool,
    fields: React.PropTypes.object,
    id: React.PropTypes.string,
    title: React.PropTypes.string,
    time: React.PropTypes.string,
    action: React.PropTypes.string,
    handleSubmit: React.PropTypes.func,
    beFalse: React.PropTypes.func,
    deleteOne: React.PropTypes.func,
    updateList: React.PropTypes.func,
    toTrash: React.PropTypes.func,
    category: React.PropTypes.object,
    articleCategory: React.PropTypes.func,
    postOne: React.PropTypes.func,
    updateOne: React.PropTypes.func,
    result: React.PropTypes.string,
};
const fields = ['id', 'title', 'category', 'time', 'content'];
const form = reduxForm({ form: 'EditForm', fields, validate });

export default connect(mapStateToProps, mapDispatchToProps)(form(EditForm));

