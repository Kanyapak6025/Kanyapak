import React, { useState } from "react";
import { Layout, Typography, InputNumber, Form, Card, Button } from "antd";
import api from './api'
const { pow, sum, multiply } = require("mathjs")
const { Title } = Typography;
const { Header, Content } = Layout;

const Polynomial = () => {
    const datatable = [];
    const [answer, setAnswer] = useState("");
    const [nm, setnm] = useState(2);
    var x = 0, m = 0
    var matrix = Array.from(Array(nm), _ => Array(2).fill(0))
    var a = Array(nm).fill(0)//equation
    var b = Array(nm).fill(0)//f(x)


    const matrixsetcal = () => {
        callfn();
    };
    const show = () => {
        api.getLeastsquare().then(res => {
            setnm(res.data.data[0].n);
            x = res.data.data[0].x;
            a = res.data.data[0].X;
            b = res.data.data[0].Y;
            m = res.data.data[0].m + 1;
            callfn(res.data.data[0].x, res.data.data[0].X, res.data.data[0].Y, res.data.data[0].m);

        })

    };


    const callfn = () => {

        console.table(a)
        console.table(b)
        console.log(x)
        console.log(m)

        var X = JSON.parse(JSON.stringify(a))
        var Y = JSON.parse(JSON.stringify(b))
        var A = Array.from(Array(m), _ => Array(m).fill(0))
        var B = Array(m).fill(0)
        var f = 0
        var abs = Math.abs;

        const fill = (i, n, v) => {
            var s = [];
            for (; i < n; i++) {
                s.push(v);
            }
            return s;
        }
        const gauss = (a, b) => {
            var i, k, j;

            // Just make a single matrix
            for (i = 0; i < a.length; i++) {
                a[i].push(b[i]);
            }
            var n = a.length;

            for (i = 0; i < n; i++) {
                // Search for maximum in this column
                var maxEl = abs(a[i][i]),
                    maxRow = i;
                for (k = i + 1; k < n; k++) {
                    if (abs(a[k][i]) > maxEl) {
                        maxEl = abs(a[k][i]);
                        maxRow = k;
                    }
                }

                // Swap maximum row with current row (column by column)
                for (k = i; k < n + 1; k++) {
                    var tmp = a[maxRow][k];
                    a[maxRow][k] = a[i][k];
                    a[i][k] = tmp;
                }

                // Make all rows below this one 0 in current column
                for (k = i + 1; k < n; k++) {
                    var c = -a[k][i] / a[i][i];
                    for (j = i; j < n + 1; j++) {
                        if (i === j) {
                            a[k][j] = 0;
                        } else {
                            a[k][j] += c * a[i][j];
                        }
                    }
                }
            }

            // Solve equation Ax=b for an upper triangular matrix A
            b = fill(0, n, 0);
            for (i = n - 1; i > -1; i--) {
                b[i] = a[i][n] / a[i][i];
                for (k = i - 1; k > -1; k--) {
                    a[k][n] -= a[k][i] * b[i];
                }
            }
            return b;
        }
        const power = (value) => {
            var temp = JSON.parse(JSON.stringify(X))
            for (var i = 0; i < X.length; i++) {
                temp[i] = pow(X[i], value)
            }
            return temp
        }
        for (var i = 0; i < m; i++) {
            B[i] = (i === 0) ? sum(Y) : sum(multiply(power(i), Y))
            for (var j = 0; j < m; j++) {
                A[i][j] = (i === 0 && j === 0) ? X.length : sum(power(i + j))
            }
        }
        console.table(A)
        console.table(B)
        B = gauss(A, B)
        console.table(B)
        for (var i = 0; i < m; i++) {
            f += (i === 0) ? B[i] : B[i] * pow(x, i)
        }
        console.log(f.toFixed(6))
        setAnswer(f.toFixed(6))

    }


    return (
        <Layout>
            <Header style={{ color: "white", fontSize: "35px" }}>
                POLYNOMIAL REGRESSION
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

                        />&ensp;</p>
                        <p>
                        <div><center><tr><th></th>{<th><center>X</center></th>}{<th><center>f(x)</center></th>}</tr>{
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
                                    onChange={value => { if (j === 1) { b[i] = value } else { a[i] = value } }}
                                /></td>))}</tr>
                            ))}</center>
                            <p><Form.Item label="x" />
                                <InputNumber onChange={value => { x = value/*setx(value)*/ }} /></p>
                            <p><Form.Item label="m" />
                                <InputNumber step={1} min={1} max={20} onChange={value => { m = value + 1/*setx(value)*/ }} /></p>
                            <br /><center><p><Button type="primary" style={{ width: 250 }} onClick={matrixsetcal} >OK</Button>&ensp;
                            <br /><br /><Button type="primary" style={{ width: 250 }} onClick={show} >DB</Button>
                            </p></center></div>
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


export default Polynomial;
