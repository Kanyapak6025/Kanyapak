import React, { useState } from "react";
import { Layout,  Typography,   InputNumber, Card, Button, } from "antd";
import api from './api'

const { Title } = Typography;
const { Header, Content } = Layout;

const Conjugate_gradient = () => {
    const datatable = [];
    const [answer, setAnswer] = useState();
    const [nm, setnm] = useState(2);
    var matrix = Array.from(Array(nm), _ => Array(nm + 1).fill(0))
    var A = Array.from(Array(nm), _ => Array(nm).fill(0))//equation
    var B = Array(nm).fill(0)//f(x)
    //var X = Array(nm).fill(0)
    //X = new Array(B.length).fill(0);
    const math = require("mathjs");

    const matrixsetcal = () => {
        callfn(A, B);

    };
    const show = () => {
        api.getArrays().then(res => {
            setnm(res.data.data[0].n);
            callfn(res.data.data[0].A, res.data.data[0].B);

        })

    };

    const cross = (A, B) => {
        var temp = new Array(B.length).fill(0);
        for (var i = 0; i < A.length; i++) {
            for (var j = 0; j < A.length; j++) {
                temp[i] += A[j][i] * B[j];
            }
        }
        return temp;
    }
    const eps = R => math.sqrt(math.sum(math.dotPow(R, 2)))
    const findLamda = (A, R, D) => -(math.dot(D, R) / math.dot(cross(A, D), D));
    const findAlpha = (A, R, D) => math.dot(cross(A, R), D) / math.dot(cross(A, D), D);

    const callfn = (A, B) => {
        var X = new Array(B.length).fill(0);
        var ex = 1;
        var es = 0.000001
        var numiteration = 0;

        while (true) {
            var R = math.subtract(cross(A, X), B);
            if (eps(R) < es) break;
            var D = numiteration <= 0 ? math.multiply(R, -1) : math.add(math.multiply(R, -1), math.multiply(D, findAlpha(A, R, D)));
            X = math.add(X, math.multiply(D, findLamda(A, R, D)));

            numiteration++;
        }
        for (var i = 0; i < A.length; i++) {
            datatable.push(X[i].toFixed(6), " ")
        }
        setAnswer(datatable)


    }

    return (
        <Layout>
            <Header style={{ color: "white", fontSize: "35px" }}>
                GAUSS-GRADIENT ITERATION
          </Header>
            <Content>
                <Card style={{ width: '100%', height: '100%' }} bordered={false} >
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
                                    onChange={value => { if (j === nm) { B[i] = value } else { A[i][j] = value } }}
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


export default Conjugate_gradient;
