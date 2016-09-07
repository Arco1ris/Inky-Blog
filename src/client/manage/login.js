import ReactDOM from 'react-dom';
import React from 'react';
import { Input } from './component/input/input';
import { MyButton } from './component/button/button';
import { postUser } from '../api';
import sha1 from 'sha1';

const validate = values => {
    const errors = {};
    const passwordRegEx = /^\S{6,16}$/;
    if (!values.password) {
        errors.password = '请填写登陆密码';
    } else if (!passwordRegEx.test(values.password)) {
        errors.password = '密码格式不正确';
    }
    if (!values.userName) {
        errors.userName = '请填写账号名称';
    }
    return errors;
};

export class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            errors: {
                userError: '',
                pwError: '',
            },
            confirm: '',
        }
        this.userNameChange = this.userNameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const userName = this.state.userName.trim();
        const password = this.state.password.trim();
        const values = { userName, password }
        if (!validate(values).password && !validate(values).userName) {
            postUser(userName, sha1(password)).then((result) => {
                console.log(result);
                if (result.code === 0) {
                    if (result.data.validate === false) {
                        this.setState({ confirm: result.data.msg });
                    } else {
                        console.log('登陆成功');
                        window.location.href = result.data.path;
                    }
                } else {
                    //  发送失败
                }
            });
        } else {
            this.setState({
                errors: {
                    userError: validate(values).userName,
                    password: validate(values).password,
                },
            });
        }
    }
    userNameChange(event) {
        this.setState({ userName: event.target.value });
    }
    passwordChange(event) {
        this.setState({ password: event.target.value });
    }
    render() {
        let options = {
            userName: {
                label: 'User Name',
                placeholder: 'userName',
            },
            password: {
                label: 'Password',
                placeholder: 'Password',
            },
            submitButton: {
                text: 'Submit',
            },
        };
        options = Object.assign(options, this.props.options || {});
        return (

            <form>
                <div className="form-group">
                    <label>{options.userName.label}</label>
                    <Input type="text" onChange={this.userNameChange}
                           className="form-control" placeholder={options.userName.placeholder} />
                    <span>{this.state.errors.userError}</span>
                </div>
                <div className="form-group">
                    <label>{options.password.label}</label>
                    <Input type="password" onChange={this.passwordChange}
                           className="form-control" placeholder={options.password.placeholder} />
                    <span>{this.state.errors.password}</span>
                </div>
                <MyButton type="submit" onClick={this.handleSubmit}
                          className="btn btn-default" text={options.submitButton.text}/>
                <span>{this.state.confirm}</span>
            </form>
        );
    }
}

LoginForm.propTypes = {
    options: React.PropTypes.object,
    handleSubmit: React.PropTypes.func,
    setState: React.PropTypes.func,
};

ReactDOM.render(
    (<LoginForm/>),
    document.getElementById('login'));
