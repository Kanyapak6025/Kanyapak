import React, { useState } from "react";
import { Layout,  Typography,   InputNumber, Card, Button, } from "antd";
import api from './api'

const { Title } = Typography;
const { Header, Content } = Layout;

const Gauss_seidel = () => {
    const datatable = [];
    const [answer, setAnswer] = useState("");
    const [nm, setnm] = useState(2);
    const [fx, setfx] = useState("");
    const [iteration, setIteration] = useState(0);
    const [data, setData] = useState([]);
    var matrix = Array.from(Array(nm), _ => Array(nm + 1).fill(0))
    var A = Array.from(Array(nm), _ => Array(nm).fill(0))//equation
    var B = Array(nm).fill(0)//f(x)
    var X = Array(nm).fill(0)
    var Y = Array(nm).fill(0)

    const matrixsetcal = () => {
        callfn(A, B);

    };
    const show = () => {
        api.getArrays().then(res => {
            setnm(res.data.data[0].n);
            callfn(res.data.data[0].A, res.data.data[0].B);

        })

    };

    const eps = (a, b, es, numiteration) => {
        var temp
        var bool = new Array(a.length).fill(false);
        var error = Array(nm).fill(0)
        //console.log("epsilon");
        for (var i = 0; i < a.length; i++) {
            bool[i] = (Math.abs((a[i] - b[i]) / a[i]) > es) ? true : false
            error[i] = Math.abs((a[i] - b[i]) / a[i]);
            //console.log("e" + (i + 1) + " " + (Math.abs((a[i] - b[i]) / a[i])).toFixed(6));
        }
        //console.log(datatable)
        for (var i = 0; i < a.length; i++) {
            if (bool[i] == true) return true
        }

        return false
    }

    const callfn = (A, B) => {
        X = new Array(B.length).fill(0);
        Y = new Array(B.length).fill(0);
        var ex = true
        var numiteration = 0
        const es = 0.000001
        while (ex) {
            //X = JSON.parse(JSON.stringify(Y));
            var temp = JSON.parse(JSON.stringify(X));
            Y = JSON.parse(JSON.stringify(B));
            //console.log('iteration ' + iteration);
            for (var i = 0; i < B.length; i++) {
                for (var j = 0; j < B.length; j++) {
                    if (j !== i) {
                        Y[i] -= A[i][j] * X[j];
                    }
                }
                Y[i] /= A[i][i];
                Y[i] = Y[i].toFixed(6);
                X[i] = JSON.parse(JSON.stringify(Y[i]));
                
            }
            ex = eps(Y, temp, es, numiteration)
            numiteration++;
            //console.log("---> " + Y);
        }
        for(var i=0;i<Y.length;i++)
        {
            datatable.push(Y[i], " ")
        }
        setAnswer(datatable)
    }


    return (
        <Layout>
            <Header style={{ color: "white", fontSize: "35px" }}>
                GAUSS-SEIDEL ITERATION
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


export default Gauss_seidel;
