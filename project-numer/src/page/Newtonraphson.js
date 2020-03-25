import React, { useState } from 'react';
import { Layout, Typography, Menu, Breadcrumb, Icon, Input, Card, Form, Tooltip, InputNumber, Button } from 'antd';
import Graph from "./graph"
import Table from "./table"
import api from "./api"
const { Header, Content } = Layout;
const { Title } = Typography;
const { parse, derivative } = require("mathjs")

const Newtonraphson = () => {
    const datatable = []
    const [fn, setfn] = useState('x')
    const [xold, setxold] = useState(0)
    const [iteration, setiteration] = useState(0)
    const [answer, setanswer] = useState(0)
    const [data, setData] = useState({fn:'x'});
    const setdb = () => {
        api.getMethod().then(res => { callfn(res.data.data[3].function, res.data.data[3].variable1);setfn(res.data.data[3].function);})
    }
    const setequation = () => {
        callfn(fn, xold)
        
    }
    const contentListNoTitle = {
        chart: <Graph data={data} />,
        table: <Table data={data} />
    };
    const [noTitleKey, setnoTitleKey] = useState("chart");
    const tabListNoTitle = [
        {
            key: "chart",
            tab: "graph"
        },
        {
            key: "table",
            tab: "table"
        }
    ];
    const onTabChange = (key, type) => {
        console.log(key, type);
        setnoTitleKey(key);
    };
    const fineerror = (a, b) => Math.abs((b - a) / b)
    const Fn = (fn, value) => parse(fn).evaluate({ x: value })
    const dfx = (fn, value) => derivative(fn, 'x').evaluate({ x: value })
    const show = (a, b) => console.log('answer : ' + a + '\nepsilon : ' + b)
    const callfn = (fn, xold) => {
        var temp_xold, xnew = 0, e = 1.0, es = 0.000001
        var xnew = xold - (Fn(fn, xold) / dfx(fn, xold))
        var fxnew = Fn(fn, xnew)
        e = fineerror(xold, xnew)
        var i = iteration
        datatable.push({
            iteration: i,
            x: xnew.toFixed(6),
            y: fxnew.toFixed(6),
            e: e.toFixed(6)
        })
        temp_xold = xnew
        while (e > es) {
            xnew = temp_xold - (Fn(fn, temp_xold) / dfx(fn, temp_xold))
            fxnew = Fn(fn, xnew)
            e = fineerror(temp_xold, xnew)
            temp_xold = xnew
            i++
            datatable.push({
                iteration: i,
                x: xnew.toFixed(6),
                y: fxnew.toFixed(6),
                e: e.toFixed(6)
            })
        }
        setData({ fn: fn,
            x:xnew,
            y: fxnew,
            table:datatable

})
        setanswer(xnew.toFixed(6))
        show(xnew.toFixed(6), e.toFixed(6))
    }
    return (
        <Layout>
            <Header style={{ color: "white" ,fontSize: "35px"}}>
                NEWTON-RAPHSON METHOD
          </Header>
            <Content>
                <Card style={{ width: 600 }} bordered={false}>
                    <Form.Item label="Equation" />
                    <Input placeholder="e^-x/4(2-x)-1" maxLength={255} onChange={event => { setfn(event.target.value) }} /><br />
                    <Form.Item label="X" />
                    <p><InputNumber min={0} max={10} step={0.1} defaultValue={0} onChange={value => { setxold(value) }} /></p>
                    <p><Button type="primary" block onClick={setequation}>
                        OK
                    </Button>
                    </p>
                    <br /><br />
                    <Button type="primary" block onClick={setdb}>
                        DB
                    </Button>
                </Card>
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
export default Newtonraphson;