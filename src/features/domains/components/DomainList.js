import React from 'react';
import { Table, Spin, Alert } from 'antd';
import { getDomainTableColumns } from '../utils/domainTableConfig';

const DomainList = ({ data, isLoading, error, onEdit, onDelete, onVerify }) => {
  const columns = getDomainTableColumns({ onEdit, onDelete, onVerify });

  if (error) {
    const errorMessage =
      error?.data?.message || error?.error || 'Failed to load domains.';
    return (
      <Alert message="Error" description={errorMessage} type="error" showIcon />
    );
  }

  return (
    <Spin spinning={isLoading} tip="Loading domains...">
      <Table
        columns={columns}
        dataSource={data || []}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '50'],
        }}
        scroll={{ x: 950 }}
      />
    </Spin>
  );
};

export default DomainList;
