import { Layout, Typography } from 'antd';
import './App.css';
import DomainsPage from './features/domains/DomainsPage';

const { Header, Footer } = Layout;
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
      <DomainsPage />
      <Footer style={{ textAlign: 'center' }}>
        Front-End Assessment ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}

export default App;
