import React, { useState } from 'react';
import { Layout, Typography, Menu, Breadcrumb, Icon, Input, Card, Form, Tooltip, InputNumber, Button } from 'antd';
import Graph from "./graph"
import Table from "./table"
import api from "./api"
const { Header, Content } = Layout;
const { Title } = Typography;
const { parse } = require("mathjs")
const Bisection = () => {
    const datatable = []
    const [fn, setfn] = useState("x^4-13")
    const [xl, setxl] = useState(2)
    const [xr, setxr] = useState(1.5)
    const [iteration, setiteration] = useState(0)
    const [answer, setanswer] = useState(0)
    const [data, setData] = useState({fn:'x'});
    const setdb = () => {
        api.getMethod().then(res => {
            callfn(res.data.data[0].function,
                res.data.data[0].variable1,
                res.data.data[0].variable2);
            setfn(res.data.data[0].function);
        })
    }
    const setequation = () => {
        callfn(fn, xl, xr)
        
    }
    const findxm = (l, r) => (l + r) / 2
    const fineerror = (a, b) => Math.abs((b - a) / b)
    const Fn = (fn, value) => parse(fn).evaluate({ x: value })
    const show = (a, b) => console.log('answer : ' + a + '\nepsilon : ' + b)
    const contentListNoTitle = {
        graph: <Graph data={data} />,
        table: <Table data={data} />
    };
    

    const [noTitleKey, setnoTitleKey] = useState("graph");
    const tabListNoTitle = [
        {
            key: "graph",
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
    const callfn = (fn, xl, xr) => {
        var xm_old = 0, e = 1.0, es = 0.000001
        var xm = findxm(xl, xr)
        var fxl = Fn(fn, xl)
        var fxr = Fn(fn, xr)
        var fxm = Fn(fn, xm)
        var i = iteration
        datatable.push({
            iteration: i,
            x: xm.toFixed(6),
            y: fxm.toFixed(6),
            e: e.toFixed(6)
        })
        xm_old = xm
        while (e > es) {
            if (fxm * fxl > 0) {
                xl = xm;
            } else {
                xr = xm;
            }
            xm = findxm(xl, xr)
            fxl = Fn(fn, xl)
            fxr = Fn(fn, xr)
            fxm = Fn(fn, xm)
            e = fineerror(xm_old, xm)
            i++
            datatable.push({
                iteration: i,
                x: xm.toFixed(6),
                y: fxm.toFixed(6),
                e: e.toFixed(6)
            })
            xm_old = xm
        }
        setData({ fn: fn,
                    x:xm,
                    y:fxm,
                    table:datatable

        })
        setanswer(xm.toFixed(6))
        show(xm.toFixed(6), e.toFixed(6))
    }



    return (
        <Layout>
            <Header style={{ color: "white" ,fontSize: "35px"}}>
                BISECTION METHOD
          </Header>
            <Content>
                <Card style={{ width: 600 }} bordered={false}>
                    <Form.Item label="Equation" />
                    <Input placeholder="x^2+bx+c" maxLength={255} onChange={event => { setfn(event.target.value) }} /><br />
                    <Form.Item label="XL" />
                    <InputNumber min={0} max={10} step={0.1} defaultValue={0} onChange={value => { setxl(value) }} />
                    <Form.Item label="XR" />
                    <InputNumber min={0} max={10} step={0.1} defaultValue={0} onChange={value => { setxr(value) }} /><br /><br />
                    <Button type="primary" block onClick={setequation}>
                        OK
                    </Button>
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



export default Bisection;