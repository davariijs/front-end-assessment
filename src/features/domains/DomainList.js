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
  Dropdown,
  Typography,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleFilled,
  ExclamationCircleFilled,
  LinkOutlined,
  EllipsisOutlined,
  EyeOutlined,
  CheckSquareOutlined,
  CodeOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

// Helper function to determine tag color based on verification status
const getVerificationStatusColor = (status) => {
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
  const handleMenuClick = (key, record) => {
    switch (key) {
      case 'view_pages':
        console.log('View Pages clicked for:', record.domain);
        message.info('View Pages action triggered (placeholder).');
        break;
      case 'edit':
        onEdit(record);
        break;
      case 'verify':
        console.log('Verify clicked for:', record.domain);
        message.info('Verify action triggered (placeholder).');
        break;
      case 'install_script':
        console.log('Install Script clicked for:', record.domain);
        message.info('Install Script action triggered (placeholder).');
        break;
      default:
        break;
    }
  };

  const columns = [
    {
      title: 'Domain URL',
      dataIndex: 'domain',
      key: 'domain',
      render: (text, record) => (
        <Space align="center">
          <Tooltip title={record.isActive ? 'Active' : 'Not Active'}>
            {record.isActive ? (
              <CheckCircleFilled
                style={{ color: '#52c41a', fontSize: '16px' }}
              />
            ) : (
              <ExclamationCircleFilled
                style={{ color: '#ff4d4f', fontSize: '16px' }}
              />
            )}
          </Tooltip>
          <Text style={{ color: 'rgba(0, 0, 0, 0.88)' }}>{text}</Text>
          <Tooltip title="Go to URL">
            <a
              href={!text?.startsWith('http') ? `https://${text}` : text}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'rgba(0, 0, 0, 0.45)' }}
            >
              <LinkOutlined />
            </a>
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
        <Text style={{ color: isActive ? '#52c41a' : '#ff4d4f' }}>
          {isActive ? 'Active' : 'Not Active'}
        </Text>
      ),
    },
    {
      title: 'Verification Status',
      dataIndex: 'status',
      key: 'status',
      width: 180,
      render: (status) => (
        <Tag color={getVerificationStatusColor(status)}>
          {status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 80,
      align: 'center',
      render: (_, record) => {
        const menuItems = [
          {
            key: 'view_pages',
            label: 'View pages',
            icon: <EyeOutlined />,
            disabled: true,
          },
          {
            key: 'edit',
            label: 'Edit',
            icon: <EditOutlined />,
          },
          {
            key: 'verify',
            label: 'Verify',
            icon: <CheckSquareOutlined />,
          },
          {
            key: 'install_script',
            label: 'Install script',
            icon: <CodeOutlined />,
            disabled: true,
          },
          {
            type: 'divider',
          },
          {
            key: 'delete',
            label: (
              <Popconfirm
                title="Delete this domain?"
                description={`Are you sure you want to delete ${record.domain}?`}
                onConfirm={(e) => {
                  e?.stopPropagation();
                  onDelete(record._id);
                }}
                onCancel={(e) => e?.stopPropagation()}
                okText="Yes, Delete"
                okButtonProps={{ danger: true }}
                cancelText="Cancel"
              >
                <span style={{ color: '#ff4d4f' }}>Delete</span>
              </Popconfirm>
            ),
            icon: <DeleteOutlined style={{ color: '#ff4d4f' }} />,
          },
        ];

        return (
          <Dropdown
            menu={{
              items: menuItems,
              onClick: ({ key }) => handleMenuClick(key, record),
            }}
            trigger={['click']}
          >
            <Button type="text" shape="circle" icon={<EllipsisOutlined />} />
          </Dropdown>
        );
      },
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
        scroll={{ x: 950 }}
      />
    </Spin>
  );
};

export default DomainList;
