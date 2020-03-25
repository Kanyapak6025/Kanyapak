import React, { useState } from 'react';
import { Layout, Typography,Row,Col , Input, Card, Form, InputNumber, Button } from 'antd';
import Graph from "./graph"
import api from "./api"
const { Header, Content } = Layout;
const { Title } = Typography;
const { create, all } = require("mathjs");
const mathjs = create(all);
const mathInt = require('mathjs-simple-integral')
mathjs.import(mathInt)

const Trapzoidal = () => {
    const datatable = []
    const [fn, setfn] = useState("x^4-13")
    const [a, seta] = useState(2)
    const [b, setb] = useState(8)
    var [n, setn] = useState(1);
    const [answer, setanswer] = useState(0)
    const [data, setData] = useState({fn:'x'});
    
    const setdb = () => {
        api.getIntegrate().then(res => {
            n = res.data.data[0].n;
            seta(res.data.data[0].a);
            setb(res.data.data[0].b);
            setfn(res.data.data[0].fx);
            callfn(res.data.data[0].fx, res.data.data[0].a, res.data.data[0].b);
        })
    }
    const setequation = () => {
        callfn(fn, a, b)
    }

    const contentListNoTitle = {
        graph: <Graph data={data} />,
    };


    const [noTitleKey, setnoTitleKey] = useState("graph");
    const tabListNoTitle = [
        {
            key: "graph",
            tab: "graph"
        }
    ];
    const onTabChange = (key, type) => {
        console.log(key, type);
        setnoTitleKey(key);
    };
    const callfn = (fn, a, b) => {
        var A = [], B = []
        var h = (b - a)
        var delta = h / n
        var N = n + 1
        var sum = 0;
        var sum2 = 0;
        var ifn = mathjs.integral(fn, 'x').toString();
        var ans = mathjs.parse(ifn).evaluate({ x: b }) - mathjs.parse(ifn).evaluate({ x: a })
        for (var i = 0; i < N; i++) {
            A.push(a + (i * delta))
            B.push(mathjs.parse(fn).evaluate({ x: A[i] }))
            if (i == 0 || i == N - 1) {
                sum += mathjs.parse(fn).evaluate({ x: A[i] })
            } else {
                sum2 += mathjs.parse(fn).evaluate({ x: A[i] })
            }
        }
        sum = sum + 2 * sum2;
        sum *= delta / 2
        console.table(A);
        console.table(B);
        console.log("REAL", ans.toFixed(6));
        console.log("CAL", sum.toFixed(6));
        setData({ fn: fn })
        setanswer(sum)
    }

    return (
        <Layout>
            <Header style={{ color: "white" }}>
                COMPOSITE-TRAPEZOIDAL RULE
          </Header>
            <Content>

                <Row>
                    <Col span={12}>
                    <Card style={{ width: "100%" }} bordered={false}>
                    <Form.Item label="Equation" />
                    <Input placeholder="x^2+bx+c" maxLength={255} onChange={event => { setfn(event.target.value) }} /><br />
                    <Form.Item label="a" />
                    <InputNumber min={0} max={10} step={0.1} defaultValue={0} onChange={value => { seta(value) }} />
                    <Form.Item label="b" />
                    <InputNumber min={0} max={10} step={0.1} defaultValue={0} onChange={value => { setb(value) }} /><br /><br />
                    <p><Form.Item label="n" />
                        <InputNumber step={1} min={1} max={20} onChange={value => { setn(value) }} /></p>
                    <Button type="primary" block onClick={setequation}>
                        OK
                    </Button>
                    <br /><br />
                    <Button type="primary" block onClick={setdb}>
                        DB
                    </Button>
                </Card>
                    </Col>
                    <Col span={12}><br /><br />
                        <center><Title style={{ fontSize: "35px" }}>
                            ANSWER : {answer}
                            </Title></center>
                    
                    </Col>
                </Row>

                
                <Card bordered={false}
                    style={{ width: "100%" }}
                    tabList={tabListNoTitle}
                    activeTabKey={noTitleKey}
                    onTabChange={key => {
                        onTabChange(key, "noTitleKey");
                    }}
                >
                    {contentListNoTitle[noTitleKey]}
                </Card>
            </Content>
        </Layout>

    );
}



export default Trapzoidal;