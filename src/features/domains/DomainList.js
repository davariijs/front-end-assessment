import React from 'react';
import {
  Table,
  Tag,
  Space,
  Tooltip,
  Button,
  Spin,
  Alert,
  Popconfirm,
  message,
} from 'antd';
import { CopyOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const getStatusColor = (status) => {
  const lowerStatus = status?.toLowerCase();
  switch (lowerStatus) {
    case 'verified':
      return 'success';
    case 'pending':
      return 'processing';
    case 'rejected':
      return 'error';
    default:
      return 'default';
  }
};

const DomainList = ({ data, isLoading, error, onEdit, onDelete }) => {
  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => message.success('URL copied to clipboard!'))
      .catch((err) => message.error('Failed to copy URL.'));
  };

  const columns = [
    {
      title: 'Domain URL',
      dataIndex: 'domain',
      key: 'domain',
      render: (text) => (
        <Space>
          <a
            href={!text?.startsWith('http') ? `https://${text}` : text}
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
          </a>
          <Tooltip title="Copy URL">
            <Button
              type="text"
              shape="circle"
              icon={<CopyOutlined />}
              size="small"
              onClick={() => handleCopy(text)}
            />
          </Tooltip>
        </Space>
      ),
    },
    {
      title: 'Active Status',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 150,
      render: (isActive) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Active' : 'Not Active'}
        </Tag>
      ),
    },
    {
      title: 'Verification Status',
      dataIndex: 'status',
      key: 'status',
      width: 180,
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Delete this domain?"
              description={`Are you sure you want to delete ${record.domain}?`}
              onConfirm={() => onDelete(record._id)}
              okText="Yes, Delete"
              okButtonProps={{ danger: true }}
              cancelText="Cancel"
            >
              <Button shape="circle" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

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
        rowKey="_id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '50'],
        }}
        scroll={{ x: 800 }}
      />
    </Spin>
  );
};

export default DomainList;
