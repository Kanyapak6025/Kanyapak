import React, { useState } from "react";
import { Layout, Typography, InputNumber, Card, Button } from "antd";
import api from './api'

const { pow, sum, multiply } = require("mathjs")
const { Title } = Typography;
const { Header, Content } = Layout;

const Multiple_regress = () => {
    const [answer, setAnswer] = useState("");
    var [nm, setnm] = useState(2);
    var [m, setm] = useState(2);
    var matrix = Array.from(Array(nm), _ => Array(m + 1).fill(0))
    var a = Array.from(Array(nm), _ => Array(m).fill(0))//equation
    var b = Array(nm).fill(0)//f(x)
    var c = Array(nm).fill(0)
    var x = Array(m).fill(0)


    const matrixsetcal = () => {
        callfn(a, b, m, nm, x);
    };
    const show = () => {
        api.getLeastsquare().then(res => {
            setnm(res.data.data[1].n)
            a = res.data.data[1].X;
            b = res.data.data[1].Y;
            x = res.data.data[1].x;
            setm(res.data.data[1].m)
            callfn(res.data.data[1].X, res.data.data[1].Y, res.data.data[1].m, res.data.data[1].n, res.data.data[1].x);

        })

    };



    const callfn = (a, b, m, nm, x) => {

        console.table(a)
        console.table(b)
        console.log(x)
        console.log(m)
        var X = JSON.parse(JSON.stringify(a))
        var Y = JSON.parse(JSON.stringify(b))
        var A = Array.from(Array(m + 1), _ => Array(m + 1).fill(0))
        var B = Array(m + 1).fill(0)
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
        const isolate = (value) => {
            var temp = []
            for (var i = 0; i < X.length; i++) {
                temp.push(X[i][value])
            }
            return temp
        }
        for (var i = 0; i < m + 1; i++) {
            B[i] = (i === 0) ? sum(Y) : sum(multiply(isolate(i - 1), Y))
            for (var j = 0; j < m + 1; j++) {
                if (i === 0 && j === 0) {
                    A[i][j] = X.length
                } else if (i === 0 && j > 0) {
                    A[i][j] = sum(isolate(j - 1))
                } else if ((j === 0 && i > 0)) {
                    A[i][j] = sum(isolate(i - 1))
                } else {
                    A[i][j] = sum(multiply(isolate(i - 1), isolate(j - 1)))
                }
            }
        }
        console.table(A)
        console.table(B)
        B = gauss(A, B)
        console.table(B)
        for (var i = 0; i < m; i++) {
            f += (i === 0) ? B[i] : B[i] * x[i]
        }
        console.log(f.toFixed(6))
        setAnswer(f.toFixed(6))

    }


    return (
        <Layout>
            <Header style={{ color: "white", fontSize: "35px" }}>
                MULTIPLE REGRESSION
          </Header>
            <Content>
                <Card style={{ width: '100%', height: '100%', overflow: 'auto' }} bordered={false} >
                    <Title style={{ fontSize: '20px' }}>
                        Input N x M
                            </Title>
                    <p>
                        <InputNumber
                            step={1}
                            min={2}
                            max={20}
                            defaultValue={2}
                            onChange={value => setnm(value)}

                        />&ensp;
                        <InputNumber
                            step={1}
                            min={2}
                            max={20}
                            defaultValue={0}
                            onChange={value => setm(value)}
                        /></p>
                    <p>
                        <div><center><tr><th>X</th> {a[0].map((x, j) => <th><center>{j + 1}</center></th>)}{<th><center>f(x)</center></th>}</tr>{
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
                            ))}</center><br />
                            <p><center><tr><th>X&ensp;</th>{a[0].map((x23, j) => <td><center>{j + 1} :&ensp;<InputNumber
                                step={1}
                                defaultValue={0}
                                style={{
                                    margin: '2px',
                                    padding: '2px',
                                    width: '75px',
                                    textAlign: 'center'
                                }}
                                onChange={value => x[j] = value} />&ensp;</center></td>)}
                            </tr></center></p>

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


export default Multiple_regress;
