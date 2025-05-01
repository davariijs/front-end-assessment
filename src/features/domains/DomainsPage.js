import React from 'react';
import { Layout, Button, Spin, Typography, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DomainList from './components/DomainList';
import { useDomainManagement } from './hooks/useDomainManagement';
import AddEditDomainDrawer from './components/AddEditDomainDrawer';

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
    verifyDomain,
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
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <div>
          <Title level={3} style={{ marginBottom: '4px', marginRight: '10px' }}>
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
            size="large"
            style={{ display: 'flex', alignItems: 'center' }}
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
          onVerify={verifyDomain}
        />
      </div>

      <AddEditDomainDrawer
        visible={isDrawerVisible}
        onClose={closeDrawer}
        onSave={saveDomain}
        initialData={editingDomain}
        isLoading={isMutating}
      />
    </Content>
  );
};

export default DomainsPage;
