import React, { useState } from "react";
import Tables from "./table";
import Charts from './graph';
import { Layout, Popover, Typography, Input, Tooltip, InputNumber, Card, Button, Icon, Table } from "antd";
import { Row, Col } from "antd";
import api from './api'

const { Title } = Typography;
const { Header, Content } = Layout;

const Gauss_jordan = () => {
    const datatable = [];
    const [answer, setAnswer] = useState();
    const [nm, setnm] = useState(2);
    const [fx, setfx] = useState("");
    const [iteration, setIteration] = useState(0);
    const [data, setData] = useState([]);
    var matrix = Array.from(Array(nm), _ => Array(nm + 1).fill(0))
    var A = Array.from(Array(nm), _ => Array(nm).fill(0))
    var B = Array(nm).fill(0)
    var X = Array(nm).fill(0)

    const matrixsetcal = () => {
        callfn(A, B);
    };
    const show = () => {
        api.getArray().then(res => {
            setnm(res.data.data[0].n);
            callfn(res.data.data[0].A, res.data.data[0].B);
        })

    };


    const callfn = (A, B) => {
        var count = 0;
        var i, k, j;
        for (k = 0; k < A.length - 1; k++) {
            for (i = k; i < A.length - 1; i++) {
                var temp = A[i + 1][k];
                for (j = k; j < A.length; j++) {
                    A[i + 1][j] = (A[i + 1][j] - (A[k][j] / A[k][k]) * temp).toFixed(6);
                    count++;
                }
                B[i + 1] = (B[i + 1] - (B[k] / A[k][k]) * temp).toFixed(6);
            }
        }
        for (k = A.length - 1; k >= 0; k--) {
            for (i = k; i > 0; i--) {
                temp = A[i - 1][k];
                for (j = k; j >= i; j--) {
                    A[i - 1][j] = (A[i - 1][j] - (A[k][j] / A[k][k]) * temp).toFixed(6);
                    count++;
                }
                B[i - 1] = (B[i - 1] - (B[k] / A[k][k]) * temp).toFixed(6);
            }
        }
        console.table(A)
        console.table(B)
        for (i = 0; i < A.length; i++) {
            X[i] = Math.ceil(B[i] / A[i][i])
            datatable.push(X[i].toFixed(6)," ");
        }
        console.table(X);
        setAnswer(datatable )
    }


    return (
        <Layout>
            <Header style={{ color: "white", fontSize: "35px" }}>
                GAUSS-JORDAN
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


export default Gauss_jordan;
