import React from 'react';
import { Layout, Button, Typography, Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DomainList from './components/DomainList';
import { useDomainManagement } from './hooks/useDomainManagement';
import AddEditDomainDrawer from './components/AddEditDomainDrawer';
import styles from './DomainsPage.module.css';

const { Content } = Layout;
const { Option } = Select;
const { Title } = Typography;

/**
 * Main page component for displaying and managing domains.
 * Orchestrates fetching data, handling user actions via a custom hook,
 * and rendering the list, search/sort controls, and add/edit drawer.
 */
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
    searchTerm,
    setSearchTerm,
    sortOrder,
    setSortOrder,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
  } = useDomainManagement();

  return (
    <Content style={{ padding: '20px' }}>
      <div className={styles.headerContainer}>
        <div className={styles.titleBlock}>
          <Title level={3} style={{ marginBottom: '4px', marginRight: '10px' }}>
            Domains
          </Title>
          <Typography.Text type="secondary">
            Manage your registered domains
          </Typography.Text>
        </div>
        <div className={styles.controlsBlock}>
          <Input.Search
            placeholder="Search domains..."
            allowClear
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onSearch={(value) => setSearchTerm(value)}
            style={{ width: 250 }}
            loading={isLoading}
            size="large"
          />
          <Select
            className={styles.sortSelect}
            value={sortOrder}
            onChange={(value) => setSortOrder(value)}
            style={{ width: 200 }}
            size="large"
          >
            <Option value="name_asc">Order by (A-Z)</Option>
            <Option value="name_desc">Order by (Z-A)</Option>
            <Option value="id_asc">Order by (Created First)</Option>
            <Option value="id_desc">Order by (Created Last)</Option>
          </Select>
        </div>
        <div className={styles.addButtonBlock}>
          <Button
            key="1"
            type="primary"
            icon={<PlusOutlined />}
            onClick={openAddDrawer}
            loading={isMutating}
            size="large"
            style={{
              display: 'flex',
              alignItems: 'center',
              fontWeight: 600,
            }}
          >
            Add Domain
          </Button>
        </div>
      </div>

      <div style={{ background: '#fff', padding: 24 }}>
        <DomainList
          data={domains}
          isLoading={isLoading}
          error={getError}
          onEdit={openEditDrawer}
          onDelete={deleteDomainById}
          onVerify={verifyDomain}
          currentPage={currentPage}
          pageSize={pageSize}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
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
