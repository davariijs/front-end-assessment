import { Layout, Typography } from 'antd';
import './App.css';
import DomainsPage from './features/domains/DomainsPage';

const { Header, Footer } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <DomainsPage />
    </Layout>
  );
}

export default App;
