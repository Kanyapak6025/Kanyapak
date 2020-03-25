import React, { useState } from "react";
import { Layout, Typography, InputNumber, Form, Card, Button, } from "antd";
import api from './api'

const { Title } = Typography;
const { Header, Content } = Layout;

const Newtons_divided = () => {
    const [answer, setAnswer] = useState();
    const [nm, setnm] = useState(2);
    var x = 0
    var matrix = Array.from(Array(nm), _ => Array(2).fill(0))
    var X = Array(nm).fill(0)//equation
    var Y = Array(nm).fill(0)//f(x)
    var c = Array(nm).fill(0)

    const matrixsetcal = () => {
        callfn();
    };
    const show = () => {
        api.getIterpolation().then(res => {
            setnm(res.data.data[0].n);
            x = res.data.data[0].x;
            X = res.data.data[0].X;
            Y = res.data.data[0].Y;
            callfn(res.data.data[0].x, res.data.data[0].X, res.data.data[0].Y);

        })

    };

    const callfn = () => {
        console.table(X)
        console.table(Y)
        var A = JSON.parse(JSON.stringify(X))
        var B = JSON.parse(JSON.stringify(Y))
        var f = 0, xs = [1];
        c[0] = Y[0]
        for (var i = 0; i < X.length - 1; i++) {
            var temp = Array(X.length - 1 - i).fill(0)
            for (var j = 0; j < X.length - 1 - i; j++) {
                if (j === 0) {
                    c[i + 1] = (B[j + 1] - B[j]) / (A[j + 1 + i] - A[j])
                }
                temp[j] = (B[j + 1] - B[j]) / (A[j + 1 + i] - A[j])
            }
            console.table(temp)
            B = JSON.parse(JSON.stringify(temp));
        }
        console.table(c)
        console.table(A)
        for (var i = 0; i < X.length; i++) {
            if (i < X.length - 1) xs.push(xs[i] * (x - A[i]));
            f += c[i] * xs[i]
        }
        console.table(xs)
        console.log(f.toFixed(6));
        setAnswer(f.toFixed(6));
    }


    return (
        <Layout>
            <Header style={{ color: "white", fontSize: "35px" }}>
                NEWTON'S DIVIDED-DIFFERENCES
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
                        ANSWER :  {answer}
                    </Title>

                </Card>
            </Content>
        </Layout >
    );
};


export default Newtons_divided;
