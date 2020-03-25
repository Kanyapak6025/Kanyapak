import React, { useState } from "react";
import { Layout, Typography, InputNumber, Form, Card, Button, } from "antd";
import api from './api'

const { Title } = Typography;
const { Header, Content } = Layout;

const Lagrange = () => {

    const [answer, setAnswer] = useState("");
    const [nm, setnm] = useState(2);
    var x = 0
    var matrix = Array.from(Array(nm), _ => Array(2).fill(0))
    var X = Array(nm).fill(0)//equation
    var Y = Array(nm).fill(0)//f(x)

    const matrixsetcal = () => {
        callfn();
    };
    const show = () => {
        api.getIterpolation().then(res => {
            setnm(res.data.data[1].n);
            x = res.data.data[1].x;
            X = res.data.data[1].X;
            Y = res.data.data[1].Y;
            callfn(res.data.data[1].x, res.data.data[1].X, res.data.data[1].Y);

        })

    };



    const L = (i, j) => (X[j] - x) / (X[j] - X[i])

    const callfn = () => {

        var ans = 0;
        var temp;
        for (var i = 0; i < X.length; i++) {
            temp = 1;
            for (var j = 0; j < X.length; j++) {
                if (i !== j) {
                    temp *= L(i, j)
                }
            }
            //console.log('L '+i+" : "+temp)
            temp *= Y[i]
            ans += temp
        }
        console.log('answer ' + ans)
        ans.toFixed(6)
        setAnswer(ans)
        return ans;
    }


    return (
        <Layout>
            <Header style={{ color: "white", fontSize: "35px" }}>
                LAGRANGE POLYNOMIALS
          </Header>
            <Content>
                <Card style={{ width: '100%', height: '100%' }} bordered={false} >
                    <Title style={{ fontSize: '20px' }}>
                        Input N of point
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
                        <div><center><tr><th></th>{<th><center>X</center></th>}{<th><center>Y</center></th>}</tr>{
                            matrix.map((n1, i) => (
                                <tr><th>{i + 1}&nbsp;&nbsp;&nbsp;&nbsp;</th>{matrix[0].map((n2, j) => (<td><InputNumber
                                    key={i}
                                    step={1}
                                    defaultValue={0}
                                    style={{
                                        margin: '2px',
                                        padding: '2px',
                                        width: '80px',
                                        textAlign: 'center'
                                    }}
                                    onChange={value => { if (j === 1) { Y[i] = value } else { X[i] = value } }}
                                /></td>))}</tr>
                            ))}</center>
                            <p><Form.Item label="x" />
                                <InputNumber onChange={value => { x = value/*setx(value)*/ }} /></p>
                            <br /><center><p><Button type="primary" style={{ width: 250 }} onClick={matrixsetcal} >OK</Button>&ensp;
                            <br /><br /><Button type="primary" style={{ width: 250 }} onClick={show} >DB</Button>
                            </p></center></div>
                    </center>
                    </p>
                </Card>

                <Card bordered={false}
                    style={{ width: "100%" }}
                ><Title style={{ fontSize: '20px' }}>
                        ANSWER : {answer}
                    </Title>
                </Card>
            </Content>
        </Layout >
    );
};


export default Lagrange;
