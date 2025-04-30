import { Layout, Typography } from 'antd';
import './App.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          Domains Management
        </Title>
      </Header>
      <Content style={{ padding: '20px 50px' }}>
        <p>Welcome to the Domain Management App!</p>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Front-End Assessment ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}

export default App;
