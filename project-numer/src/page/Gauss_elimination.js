import React, { useState } from "react";
import Tables from "./table";
import Charts from './graph';
import { Layout, Popover, Typography, Input, Tooltip, InputNumber, Card, Button, Icon, Table } from "antd";
import { Row, Col } from "antd";
import api from './api'

const { Title } = Typography;
const { Header, Content } = Layout;



const Gauss_elimination = () => {
    const datatable = [];
    const [answer, setAnswer] = useState();
    const [nm, setnm] = useState(2);
    const [fx, setfx] = useState("");
    const [iteration, setIteration] = useState(0);
    const [data, setData] = useState([]);
    var matrix = Array.from(Array(nm), _ => Array(nm + 1).fill(0))
    var a = Array.from(Array(nm), _ => Array(nm).fill(0))
    var b = Array(nm).fill(0)
    var abs = Math.abs;

    const matrixsetcal = () => {
        callfn(a,b);
    };
    const show = () => {
        api.getArray().then(res => { 
            setnm(res.data.data[0].n); 
            callfn(res.data.data[0].A, res.data.data[0].B);
        })
    };


    const array_fill = (i, n, v) => {
        var x = [];
        for (; i < n; i++) {
            x.push(v);
        }
        return x
    }

    const callfn = (a,b) => {
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
        b = array_fill(0, n, 0);
        for (i = n - 1; i > -1; i--) {
            b[i] = a[i][n] / a[i][i];
            for (k = i - 1; k > -1; k--) {
                a[k][n] -= a[k][i] * b[i];
            }
            datatable.push(b[i].toFixed(6)," ");
        }
        
        console.log(b);
        
        setAnswer(datatable)
        
        
    }


    return (
        <Layout>
            <Header style={{ color: "white" ,fontSize: "35px"}}>
                GAUSS-ELIMINATION
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

                        />&ensp;</p>

                            
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


export default Gauss_elimination;
