import { useState, useEffect } from 'react';
import 'antd/dist/antd.css'; 
import './App.css';
import { Redirect, Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom';
import { Layout, Menu} from 'antd';
import Upload from './components/Upload';
import View from './components/View';
import Home from'./components/Home';

const {Header, Footer, Content} = Layout
const {Item} = Menu;

function App() {
  const [tab, setTab] = useState('1');
  useEffect(() => {
    const dic = {
      '/home': '1',
      '/upload': '2',
      '/view': '3'
    }
    setTab(dic[window.location.pathname]);
  }, []);
  const changeSelectedKeys = (path) => {
    setTab(path);
  }
  return (
    <div className="App">
      <Layout>

        <Router>
        <Header style={{ width: '100%', background: '#f4c430' }}>
          <Menu mode="horizontal" selectedKeys={[tab]} style={{ background: '#f4c430', display: 'flex', justifyContent: 'space-between' }}>
            <Item key="1" style={{ width: '100px', textAlign: 'center' }} onClick={() => setTab('1')}><Link to="/home">Home</Link></Item>
            <Item key="2" style={{ width: '100px', textAlign: 'center' }} onClick={() => setTab('2')}><Link to="/upload">Upload</Link></Item>
            <Item key="3" style={{ width: '100px', textAlign: 'center' }} onClick={() => setTab('3')}><Link to="/view">View</Link></Item>
          </Menu>
        </Header>
        <Content style={{ minHeight: '100vh', padding: '0 50px', marginTop: 64 }}>
          <Switch>
            <Route exact path="/upload" component={Upload}/>
            <Route exact path="/view" component={View}/>
              <Route exact path="/home" render={() => <Home changeSelectedKeys={(path) => changeSelectedKeys(path)}/>}/>
            <Redirect to="/home" />
          </Switch>
        </Content>
        </Router>
        <Footer style={{ paddingTop: '0px', textAlign: 'center', background: '#abafae', maxHeight: '10px' }}>Copyright © {new Date().getFullYear()} Typito </Footer>

      </Layout>
    </div>
  );
}

export default App;
