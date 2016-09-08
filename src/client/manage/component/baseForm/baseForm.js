import React from 'react';
import { Icon } from 'antd';
import './baseForm.scss';
import { md } from '../../../md';
import { SidePanel } from '../sidePanel/sidePanel';
import { SmallPanel } from '../smallPanel/smallPanel';

export class BaseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scroll: 0,
            save: true,
            chooseSave: false,
        };
    }
    componentDidMount() {
        this.refs.contentOne.addEventListener('scroll', this.handleScroll.bind(this));
    }
    componentWillUnmount() {
        this.refs.contentOne.removeEventListener('scroll', this.handleScroll.bind(this));
    }
    handleScroll(event) {
        const scrollTop = event.srcElement.scrollTop;
        this.setState({
            scroll: scrollTop,
        });
    }
    changeCategory(category) {
        this.setState({
            category,
        });
    }
    toggleSetting(event) {
        event.preventDefault();
        this.refs.findNode.classList.toggle('side-panel-enter');
    }
    chooseSave(event) {
        event.preventDefault();
        this.setState({ chooseSave: !this.state.chooseSave });
    }
    handleChange(value) {
        if (value === 'save') {
            this.setState({ save: true });
        } else if (value === 'delete') {
            this.setState({ save: false });
        }
        this.setState({ chooseSave: !this.state.chooseSave });
    }
    moveToTrash(articleId, categoryId) {
        if (articleId && categoryId) {
            this.props.toTrash(articleId, categoryId);
        }
    }
    rawMarkup() {
        const rawMarkup = md.render(this.props.content.value.toString());
        return { __html: rawMarkup };
    }
    render() {
        if (this.refs.contentTwo) {
            this.refs.contentTwo.scrollTop = this.state.scroll - 10;
        }
        const id = this.props.id;
        const title = this.props.title;
        const time = this.props.time;
        const content = this.props.content;
        const category = this.props.category;
        const categories = this.props.categories;
        const select = [];
        if (categories.code === 0) {
            for (let i = 0; i < categories.data.length; i++) {
                select.push(<option key={categories.data[i]._id}
                                    value={categories.data[i]._id}>
                    {categories.data[i].myCategory}
                </option>);
            }
        }
        return (
            <form className = 'base-form' onSubmit={this.props.submit}>
                <header className="view-header">
                    <h3 className = 'view-title'>
                        <input type="text" />
                        <input type="hidden" {...id} />
                        <input type="text" placeholder="Title" {...title}/>
                        {title.touched && title.error && <p className = 'err'>{title.error}</p>}
                    </h3>
                    <section className = 'view-action'>
                        <input type="hidden" placeholder="Time" {...time} />
                        <button className = 'post-setting'
                                onClick = {this.toggleSetting.bind(this)}>
                            <Icon type="setting"/>
                        </button>
                        <section className='save-setting'>
                            {this.state.save ?
                                <button className="save-button"
                                        type="submit" >save</button>
                                :
                                <button className="delete-button" type="button"
                                        onClick={
                                        this.moveToTrash.bind(this, id.value, category.value)
                                        }>delete</button>
                            }
                            <button className='choose-save'
                                    onClick={this.chooseSave.bind(this)}>
                                <Icon type="down" />
                            </button>
                            {this.state.chooseSave ?
                                <SmallPanel handleChange={this.handleChange.bind(this)}/>
                                : null}
                        </section>
                    </section>
                </header>
                <section className='view-editor'>
                    <section className='entry-markdown'>
                        <textarea ref='contentOne' {...content}/>
                        {content.touched && content.error && <p className='err'>{content.error}</p>}
                    </section>
                    <section className="entry-preview">
                        <section ref='contentTwo'
                                 dangerouslySetInnerHTML={this.rawMarkup()}></section>
                    </section>
                </section>
                <section ref='findNode' className='form-side-panel'>
                    <SidePanel toggleSetting={this.toggleSetting.bind(this)}
                               category={category}
                               categories={categories}
                               changeCategory={this.changeCategory.bind(this)}
                    />
                </section>
            </form>

        );
    }
}


BaseForm.propTypes = {
    id: React.PropTypes.object,
    title: React.PropTypes.object,
    time: React.PropTypes.string,
    content: React.PropTypes.object,
    category: React.PropTypes.object,
    categories: React.PropTypes.object,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    toTrash: React.PropTypes.func,
    submit: React.PropTypes.func,

};
