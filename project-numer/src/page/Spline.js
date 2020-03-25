import React, { useState } from "react";
import { Layout, Typography, InputNumber, Form, Card, Button, } from "antd";
import api from './api'

const { Title } = Typography;
const { Header, Content } = Layout;

const Spline = () => {
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
            setnm(res.data.data[2].n);
            x = res.data.data[2].x;
            X = res.data.data[2].X;
            Y = res.data.data[2].Y;
            callfn(res.data.data[2].x, res.data.data[2].X, res.data.data[2].Y);

        })

    };


    const math = require("mathjs");
    var abs = Math.abs;

    const callfn = () => {

        //const fn = (x, X, Y) => {
        var n = (X.length - 2) * 2 + 2 + (X.length - 2)
        var N = n - X.length + 2
        var A = Array.from(Array(n), _ => Array(n).fill(0));
        var ans = Array(n).fill(1);
        var B = Array(n).fill(0)
        var temp = 0

        //gauss
        function array_fill(i, n, v) {
            var a = [];
            for (; i < n; i++) {
                a.push(v);
            }
            return a;
        }
        function gauss(A, x) {
            var i, k, j;

            // Just make a single matrix
            for (i = 0; i < A.length; i++) {
                A[i].push(x[i]);
            }
            var n = A.length;

            for (i = 0; i < n; i++) {
                // Search for maximum in this column
                var maxEl = abs(A[i][i]),
                    maxRow = i;
                for (k = i + 1; k < n; k++) {
                    if (abs(A[k][i]) > maxEl) {
                        maxEl = abs(A[k][i]);
                        maxRow = k;
                    }
                }

                // Swap maximum row with current row (column by column)
                for (k = i; k < n + 1; k++) {
                    var tmp = A[maxRow][k];
                    A[maxRow][k] = A[i][k];
                    A[i][k] = tmp;
                }

                // Make all rows below this one 0 in current column
                for (k = i + 1; k < n; k++) {
                    var c = -A[k][i] / A[i][i];
                    for (j = i; j < n + 1; j++) {
                        if (i === j) {
                            A[k][j] = 0;
                        } else {
                            A[k][j] += c * A[i][j];
                        }
                    }
                }
            }

            // Solve equation Ax=b for an upper triangular matrix A
            x = array_fill(0, n, 0);
            for (i = n - 1; i > -1; i--) {
                x[i] = A[i][n] / A[i][i];
                for (k = i - 1; k > -1; k--) {
                    A[k][n] -= A[k][i] * x[i];
                }
            }

            return x;
        }


        //quardatic
        for (var i = 0; i < N; i++) {
            if (i % 2 == 1) {
                temp++
            }
            B[i] = Y[temp]

        }
        var check;
        for (var k = 0; k < X.length; k++) {
            for (var i = 0; i < n; i++) {
                check = 1;
                for (var j = 0; j < n; j++) {
                    if (i < ((k + 1) * 2) && j < ((k) * 3) + 2 && i >= (k) * 2 && j >= (k * 3) - 1) {
                        if (j % 3 == 2) {
                            A[i][j] = (i % 2 == 0) ? X[k] * X[k] : X[k + 1] * X[k + 1]
                        } else if (j % 3 == 0) {
                            A[i][j] = (i % 2 == 0) ? X[k] : X[k + 1]
                        } else {
                            A[i][j] = 1
                        }
                    } else if ((N + k) === i && j < (k * 3) + 5 && j >= (k * 3) - 1) {
                        if (j % 3 == 2) {
                            A[i][j] = (check < 3) ? 2 * X[k + 1] : -2 * X[k + 1]
                        } else if (j % 3 == 0) {
                            A[i][j] = (check < 3) ? 1 : -1
                        } else {
                            A[i][j] = 0
                        }
                        check++
                    }
                }
            }
        }

        console.table(A);
        console.table(B);
        B = gauss(A, B)
        console.table(B);

        const f = "a*(x^2)+(b*x)+c"
        for (var i = 0; i < X.length - 1; i++) {
            if (x <= X[0]) {
                console.log(math.parse(f).evaluate({ x: x, a: 0, b: B[0], c: B[1] }));
                setAnswer(math.parse(f).evaluate({ x: x, a: 0, b: B[0], c: B[1] }));
                break;
            } else if (x >= X[X.length - 1]) {
                console.log(math.parse(f).evaluate({ x: x, a: B[B.length - 3], b: B[B.length - 2], c: B[B.length - 1] }));
                setAnswer(math.parse(f).evaluate({ x: x, a: B[B.length - 3], b: B[B.length - 2], c: B[B.length - 1] }));
                break;
            } else if (x < X[i + 1] && x >= X[i]) {
                console.log(math.parse(f).evaluate({ x: x, a: (i === 0) ? 0 : B[i * 3 - 1], b: B[i * 3], c: B[i * 3 + 1] }));
                setAnswer(math.parse(f).evaluate({ x: x, a: (i === 0) ? 0 : B[i * 3 - 1], b: B[i * 3], c: B[i * 3 + 1] }));
                break;
            }
        }



    }


    return (
        <Layout>
            <Header style={{ color: "white", fontSize: "35px" }}>
                SPLINE INTERPOLATION
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


export default Spline;
