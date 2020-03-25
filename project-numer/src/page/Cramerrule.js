import React, { useState } from "react";
import Tables from "./table";
import Charts from './graph';
import { Layout, Popover, Typography, Input, Tooltip, InputNumber, Card, Button, Icon, Table } from "antd";
import { Row, Col } from "antd";
import api from './api'

const { Title } = Typography;
const { Header, Content } = Layout;
const { det } = require("mathjs")


const CramerRule = () => {
    const datatable = [];
    const [answer, setAnswer] = useState();
    const [nm, setnm] = useState(2);
    const [fx, setfx] = useState("");
    const [iteration, setIteration] = useState(0);
    const [data, setData] = useState([]);
    var matrix = Array.from(Array(nm), _ => Array(nm + 1).fill(0))
    var a = Array.from(Array(nm), _ => Array(nm).fill(0))
    var b = Array(nm).fill(0)


    const matrixsetcal = () => {
        callfn();
    };
    const show = () => {
        api.getArray().then(res => {
            setnm(res.data.data[0].n);
            callfn(res.data.data[0].A, res.data.data[0].B, res.data.data[0].n);
        })

    };


    const ans = (xm) => console.log('Answer = ' + xm)
    const callfn = (a, b, nm) => {
        console.table(a)
        console.table(b)
        var deta = det(a), col = 0, i = 0
        for (var i = 0; i < nm; i++) {
            var det1 = JSON.parse(JSON.stringify(a))
            for (var j = 0; j < nm; j++) {
                det1[j][col] = b[j]
            }
            col++
            var x1 = det(det1) / deta
            ans(x1)
            datatable.push(x1.toFixed(6) , " ")
        }
        setAnswer(datatable)
    }


    return (
        <Layout>
            <Header style={{ color: "white", fontSize: "35px" }}>
                CRAMER'S RULE
          </Header>
            <Content>
                <Card style={{ width: '100%', height: '100%' ,overflow:'auto'}} bordered={false} >
                    <Title style={{ fontSize: '20px' }}>
                        Input NxM
                            </Title>
                    <p>
                        <InputNumber
                            step={1}
                            min={2}
                            max={20}
                            defaultValue={2}
                            onChange={value => setnm(value)}

                        /></p>
                    <p><center>
                        <div><tr><th>A&nbsp;&nbsp;&nbsp;&nbsp;</th> {matrix.map((x, j) => <th><center>{j + 1}</center></th>)}{<th><center>B</center></th>}</tr>{
                            matrix.map((n1, i) => (
                                <tr><th>{i + 1}&nbsp;&nbsp;&nbsp;&nbsp;</th>{matrix[0].map((n2, j) => (<td><InputNumber
                                    key={i}
                                    step={1}
                                    defaultValue={0}
                                    style={{
                                        margin: '2px',
                                        padding: '2px',
                                        width: '60px',
                                        textAlign: 'center'
                                    }}
                                    onChange={value => { if (j === nm) { b[i] = value } else { a[i][j] = value } }}
                                /></td>))}</tr>
                            ))}
                            <br /><center><p><Button type="primary" style={{ width: 250 }} onClick={matrixsetcal} >OK</Button>&ensp;
                            <br /><br /><Button type="primary" style={{ width: 250 }} onClick={show} >DB</Button>
                            </p></center></div>
                    </center>
                    </p>

                </Card>

                <Card bordered={false}
                    style={{ width: "100%" }}
                ><Title style={{ fontSize: '20px' }}>
                    ANSWER 
                    <p>{answer}</p>
                    </Title>
                </Card>
            </Content>
        </Layout >
    );
};


export default CramerRule;
