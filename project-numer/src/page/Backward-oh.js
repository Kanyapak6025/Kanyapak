import React, { useState } from 'react';
import { Layout, Typography,Row,Col , Input, Card, Form, InputNumber, Button } from 'antd';
import Graph from "./graph"
import api from "./api"
const { Header, Content } = Layout;
const { Title } = Typography;
const { create, all } = require("mathjs")
const math = create(all)
math.import(require('mathjs-simple-integral'));



const Backward_oh = () => {
    const datatable = []
    const [fn, setfn] = useState("x^4-13")
    const [x, setx] = useState(2)
    const [h, seth] = useState(8)
    var [n, setn] = useState(1);
    const [answer, setanswer] = useState(0)
    const [error, seterror] = useState(0)
    const [data, setData] = useState({fn:'x'});
    
    const setdb = () => {
        api.getDiff().then(res => {
            n = res.data.data[0].n;
            setx(res.data.data[0].x);
            seth(res.data.data[0].h);
            setfn(res.data.data[0].fx);
            callfn(res.data.data[0].fx, res.data.data[0].x, res.data.data[0].h);

        })
    }
    const setequation = () => {
        callfn(fn, x, h)
    }

    const contentListNoTitle = {
        chart: <Graph data={data} />
    };


    const [noTitleKey, setnoTitleKey] = useState("chart");
    const tabListNoTitle = [
        {
            key: "chart",
            tab: "graph"
        }
    ];
    const onTabChange = (key, type) => {
        console.log(key, type);
        setnoTitleKey(key);
    };
    const callfn = (fn, x, h) => {
        var real = math.parse(fn).evaluate({ x: x })
        console.log(real)
        var ans = 0
        if (n == 1) {
            ans += (((math.parse(fn).evaluate({ x: x }))  -math.parse(fn).evaluate({ x: (x - h) })   ) / h)
        } else if (n == 2) {
            ans += (math.parse(fn).evaluate({ x: x }))
            ans -= 2 * (math.parse(fn).evaluate({ x: (x - h) }))
            ans += (math.parse(fn).evaluate({ x: (x - h * 2) }))
            ans /= math.pow(h, 2)
        } else if (n == 3) {
            ans += (math.parse(fn).evaluate({ x: x }))
            ans -= 3 * (math.parse(fn).evaluate({ x: (x - h) }))
            ans += 3 * (math.parse(fn).evaluate({ x: (x - h * 2) }))
            ans -= (math.parse(fn).evaluate({ x: (x - h * 3) }))
            ans /= math.pow(h, 3)
        } else if (n == 4) {
            ans += (math.parse(fn).evaluate({ x: x }))
            ans -= 4 * (math.parse(fn).evaluate({ x: (x - h) }))
            ans += 6 * (math.parse(fn).evaluate({ x: (x - h * 2) }))
            ans -= 4 * (math.parse(fn).evaluate({ x: (x - h * 3) }))
            ans += (math.parse(fn).evaluate({ x: (x - h * 4) }))
            ans /= math.pow(h, 4)
        }
        console.log(ans)
        setData({ fn: fn })
        setanswer(ans.toFixed(6))
        seterror(math.abs((real - ans) / real).toFixed(6))
    }


    return (
        <Layout>
            <Header style={{ color: "white", fontSize: "35px" }}>
                BACKWARD DIVIDED-DIFFERENCES [O(h)]
          </Header>
            <Content>
                <Row>
                    <Col span={12}>
                        <Card style={{ width: "100%" }} bordered={false}>
                            <Form.Item label="Equation" />
                            <Input placeholder="x^2+bx+c" maxLength={255} onChange={event => { setfn(event.target.value) }} /><br />
                            <Form.Item label="x" />
                            <InputNumber min={0} max={10} step={0.1} defaultValue={0} onChange={value => { setx(value) }} />
                            <Form.Item label="h" />
                            <InputNumber min={0} max={10} step={0.1} defaultValue={0} onChange={value => { seth(value) }} /><br /><br />
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
                    <Col span={12}><br/><br/>
                        <center><Title style={{ fontSize: "35px" }}>ANSWER</Title></center>
                        <p>{"f("+x+") : "+answer}</p>
                        <p>{"ERROR : "+error}</p>
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



export default Backward_oh;