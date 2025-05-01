import React from 'react';
import { Layout, Button, Spin, Typography, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DomainList from './DomainList';
import { useDomainManagement } from './useDomainManagement';

const { Content } = Layout;

const DomainsPage = () => {
  // --- Use the custom hook to encapsulate logic ---
  const {
    domains,
    isLoading,
    isMutating,
    getError,
    isDrawerVisible,
    editingDomain,
    openAddDrawer,
    openEditDrawer,
    closeDrawer,
    saveDomain,
    deleteDomainById,
  } = useDomainManagement();

  const { Title } = Typography;

  return (
    <Content style={{ padding: '20px' }}>
      <div
        style={{
          marginBottom: '20px',
          background: '#fff',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid #f0f0f0',
        }}
      >
        <div>
          <Title level={4} style={{ marginBottom: '4px' }}>
            Domains
          </Title>
          <Typography.Text type="secondary">
            Manage your registered domains
          </Typography.Text>
        </div>
        <Space>
          <Button
            key="1"
            type="primary"
            icon={<PlusOutlined />}
            onClick={openAddDrawer}
            loading={isMutating}
          >
            Add Domain
          </Button>
          {isMutating && <Spin size="small" />}
        </Space>
      </div>

      <div style={{ background: '#fff', padding: 24 }}>
        <DomainList
          data={domains}
          isLoading={isLoading}
          error={getError}
          onEdit={openEditDrawer}
          onDelete={deleteDomainById}
        />
      </div>
    </Content>
  );
};

export default DomainsPage;
