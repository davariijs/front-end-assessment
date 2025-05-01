import React from 'react';
import { Table, Spin, Alert } from 'antd';
import { getDomainTableColumns } from '../utils/domainTableConfig';

/**
 * Renders the main table displaying the list of domains.
 * Receives domain data and action handlers as props.
 * Handles displaying loading and error states.
 */
const DomainList = ({ data, isLoading, error, onEdit, onDelete, onVerify }) => {
  // -- Retrieve column definitions, passing action handlers down --
  const columns = getDomainTableColumns({ onEdit, onDelete, onVerify });

  // -- Display error message if data fetching fails --
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
