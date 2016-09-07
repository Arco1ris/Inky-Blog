import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router';
import './app.scss';

export class App extends React.Component {
    render() {
        return (
            <div className = "container">
                <Row>
                    <Col span={16} offset={4}>
                        <h1 className = "title">ArcoIris</h1>
                        <Row type="flex" justify="center">
                            <Col span={4}>
                                <Link to="/essays">ARTICLES</Link>
                            </Col>
                            <Col span={4}>
                                <Link to="/archives">ARCHIVES</Link>
                            </Col>
                            <Col span={4}>
                                <Link to="/about">ABOUT</Link>
                            </Col>
                        </Row>
                        <div className="page-divider"></div>
                        {this.props.children}
                    </Col>
                </Row>
            </div>
        );
    }
}


App.propTypes = {
    children: React.PropTypes.object,
};

