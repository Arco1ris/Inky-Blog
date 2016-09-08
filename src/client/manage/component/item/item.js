import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as InkyItemActions from './../../action';
import { ShowContent } from './../showContent/showContent';
import './item.scss';
import moment from 'moment';


function mapStateToProps(state) {
    const { articleReducer: { titles, oneArticle }, isNew: { addNew } } = state;
    return { titles, oneArticle, addNew };
}

function mapDispatchToProps(dispatch) {
    const {
        updateOne,
        getOneArticle,
        deleteOne,
        articleTitle,
    } = bindActionCreators(InkyItemActions, dispatch);
    return { updateOne, deleteOne, getOneArticle, articleTitle };
}

class Item extends React.Component {
    render() {
        if (Object.keys(this.props.oneArticle).length === 0) {
            return null;
        }
        const oneArticle = this.props.oneArticle;
        const myTime = moment(oneArticle.data.createdTime * 1000);
        const formattedDate = myTime.format('YYYY-MM-DD hh:mm:ss');
        let props = {};
        if (oneArticle.code === 0) {
            props = {
                initialValues: {
                    id: oneArticle.data._id,
                    title: oneArticle.data.title,
                    category: oneArticle.data.category,
                    time: formattedDate,
                    content: oneArticle.data.content },
            };
        }
        return (
            <section className = "view-content" >
                <ShowContent data = {props} />
            </section>
        );
    }
}


Item.propTypes = {
    addNew: React.PropTypes.bool,
    params: React.PropTypes.object,
    id: React.PropTypes.number,
    updateOne: React.PropTypes.func,
    articleTitle: React.PropTypes.func,
    titles: React.PropTypes.object,
    oneArticle: React.PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
