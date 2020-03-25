import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Menu, Breadcrumb, Icon, Input, Card, Form, Tooltip, InputNumber, Button } from 'antd';
import logo from "./cat.png"
const { Header, Content } = Layout;
const { Title } = Typography;

const home = () => {
    return (
        <Layout>
            <Header style={{ color: "white", fontSize: "35px" }}>
                HOME
          </Header>
            <Content style={{ height:'600px'}}>
            <br/><br/><br/><img src={logo} height="200" width="300"/>
            </Content>
        </Layout >

    );

}



export default home;