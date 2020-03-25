import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
//import { PageHeader } from 'antd';
import Home from './page/home';
import Bisection from './page/Bisection';
import Falseposition from './page/Falseposition';
import Onepoint from './page/Onepoint';
import Newtonraphson from './page/Newtonraphson';
import Secant from './page/Secant';
import Cramerrule from './page/Cramerrule';
import Gauss_elimination from './page/Gauss_elimination';
import Gauss_jordan from './page/Guass_jordan';
import LU_decomposition from './page/LU_decompositon';
import Jacobi from './page/Jacobi';
import Gauss_seidel from './page/Gauss_seidel';
import Conjugate_gradient from './page/Conjugate_gradient';
import Newtondivided from './page/Newtons_divided';
import Lagrange from './page/Lagrange';
import Spline from'./page/Spline';
import Polyregress from './page/Polynomial_regress';
import Multipleregress from './page/Multiple_regress';
import Trapzoidal from './page/Trapzoidal';
import Simpsons from './page/Simpsons';
import Forward_oh from './page/Forward-oh';
import Forward_ohh from './page/Forward-Ohh';
import Backward_oh from './page/Backward-oh';
import Backward_ohh from './page/Backward-Ohh';
import Central_ohh from './page/Central-ohh';
import Central_ohhhh from './page/Central-ohhhh';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

function App() {

  const [pagestate, setpagestate] = useState(<Home/>)
  const bisectionpage = () => setpagestate(<Bisection />)
  const falsepage = () => setpagestate(<Falseposition />)
  const onepointpage = () => setpagestate(<Onepoint />)
  const newtonpage = () => setpagestate(<Newtonraphson />)
  const secantpage = () => setpagestate(<Secant />)
  const cramerpage = () => setpagestate(<Cramerrule />)
  const gausseliminationpage = () => setpagestate(<Gauss_elimination />)
  const gaussjordanpage = () => setpagestate(<Gauss_jordan/>)
  const LUpage = () => setpagestate(<LU_decomposition/>)
  const Jacobipage = () => setpagestate(<Jacobi/>)
  const Gaussseidelpage = () => setpagestate(<Gauss_seidel/>) 
  const Conjugatetpage = () => setpagestate(<Conjugate_gradient/>)
  const Newtondividepage = () => setpagestate(<Newtondivided/>)
  const Lagragepage =() => setpagestate(<Lagrange/>)
  const Splinepage =()=>setpagestate(<Spline/>)
  const Polyregresspage = () =>setpagestate(<Polyregress/>)
  const Multipleregresspage = () => setpagestate(<Multipleregress/>);
  const Trapzoidalpage =() => setpagestate(<Trapzoidal/>);
  const Simpsonpage = () => setpagestate(<Simpsons/>);
  const Forward_ohpage =() => setpagestate(<Forward_oh/>);
  const Forward_ohhpage =() => setpagestate(<Forward_ohh/>);
  const Backward_ohpage =() => setpagestate(<Backward_oh/>);
  const Backward_ohhpage =() => setpagestate(<Backward_ohh/>);
  const Central_ohhpage =() => setpagestate(<Central_ohh/>);
  const Central_ohhhhpage =() => setpagestate(<Central_ohhhh/>);
  const homepage = () => setpagestate(<Home />)

  return (
    <div className="App">
      <Layout>
        <Content style={{ padding: '0 50px' }}>
          <Layout>
            <Header className="header" >
            
              <h1  
                style={{ color: "white" ,fontSize:"50px"}} onClick={homepage}>
                NUMERICAL METHODS
              </h1>
              <div className="logo" />

              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}
              >

              </Menu>

            </Header>
            <Layout>
              <Sider width={300} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%', borderRight: 0 }}
                >
                  
                  
                  <SubMenu
                    key="sub1"
                    title={
                      <span>
                        ROOT OF EQUATIONS
              </span>
                    }
                  >
                    <Menu.Item key="1" onClick={bisectionpage}> BISECTION </Menu.Item>
                    <Menu.Item key="2" onClick={falsepage}>     FALSE-POSITION </Menu.Item>
                    <Menu.Item key="3" onClick={onepointpage}>  ONE-POINT ITERATION </Menu.Item>
                    <Menu.Item key="4" onClick={newtonpage}>    NEWTON-RAPHSON </Menu.Item>
                    <Menu.Item key="5" onClick={secantpage}>    SECANT </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub2"
                    title={
                      <span>
                        LINEAR EQUATIONS
              </span>
                    }
                  >
                    <Menu.Item key="6" onClick={cramerpage}>              CRAMER RULE</Menu.Item>
                  <Menu.Item key="7"  onClick = {gausseliminationpage}>   GAUSS ELIMINATION </Menu.Item>
                    <Menu.Item key="8"  onClick ={gaussjordanpage}>       GAUSS-JORDAN </Menu.Item>
                    <Menu.Item key="9"  onClick ={LUpage}>                LU DECOMPOSITION </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub3"
                    title={
                      <span>
                        ITERATIVE METHODS
              </span>
                    }
                  >
                    <Menu.Item key="10" onClick={Jacobipage}>       JACOBI ITERATION </Menu.Item>
                    <Menu.Item key="11" onClick={Gaussseidelpage}>  GAUSS-SEIDEL ITERATION </Menu.Item>
                    <Menu.Item key="12" onClick={Conjugatetpage}>CONJUGATE GRADIENT </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub4"
                    title={
                      <span>
                        INTERPOLATION AND EXTRAPOLATION
              </span>
                    }
                  >
                    <Menu.Item key="13" onClick= {Newtondividepage}> NEWTON'S DIVIDED-DIFFERENCES</Menu.Item>
                    <Menu.Item key="14"  onClick = {Lagragepage}>  LAGRANGE POLYNOMIALS </Menu.Item>
                    <Menu.Item key="15"  onClick = {Splinepage}>       SPLINE INTERPOLATION </Menu.Item>
                  </SubMenu>

                  <SubMenu
                    key="sub5"
                    title={
                      <span>
                        LEAST-SQUARES REGRESSION
              </span>
                    }
                  >
                    <Menu.Item key="16" onClick={Polyregresspage}>      POLYNOMIAL REGRESSION</Menu.Item>
                    <Menu.Item key="17"  onClick = {Multipleregresspage}>  MULTIPLE LINEAR REGRESSION </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub6"
                    title={
                      <span>
                        INTEGRATION
              </span>
                    }
                  >
                    <Menu.Item key="18" onClick={Trapzoidalpage}>              COMPOSITE TRAPZOIDAL RULE</Menu.Item>
                    <Menu.Item key="19"  onClick ={Simpsonpage}>       COMPOSITE SIMPSON'S RULE </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub7"
                    title={
                      <span>
                        NUMERICAL DIFFERENTIATION
              </span>
                    }
                  >
                    <Menu.Item key="20" onClick = {Forward_ohpage}>              FORWARD[O(h)]</Menu.Item>
                    <Menu.Item key="21"  onClick = {Backward_ohpage}>   BACKWARD[O(h)]</Menu.Item>
                    <Menu.Item key="22"  onClick ={Central_ohhpage}>        CENTRAL[O(h^2)]</Menu.Item>
                    <Menu.Item key="23"  onClick ={Forward_ohhpage}>        FORWARD[O(h^2)]</Menu.Item>
                    <Menu.Item key="24" onClick = {Backward_ohhpage}>              BACKWARD[O(h^2)]</Menu.Item>
                    <Menu.Item key="25"  onClick = {Central_ohhhhpage}>   CENTRAL[O(h^4)]</Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Layout style={{ padding: '0 24px 24px' }}>

                <Content
                  style={{
                    background: '#fff',
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                  }}
                >
                  {pagestate}
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
        <Icon type="heart" spin/>  <Icon type="heart" theme="filled" spin />  <Icon type="heart" spin/>  <Icon type="heart" theme="filled" spin /> 
        </Footer>
      </Layout>
    </div>

  );
}

export default App;
