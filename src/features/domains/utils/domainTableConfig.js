import React from 'react';
import {
  Tag,
  Space,
  Tooltip,
  Button,
  message,
  Dropdown,
  Typography,
  Modal,
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
const { confirm } = Modal;

// Utility function to map status strings to AntD Tag colors
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

/**
 * Generates the column configuration array for the domains Ant Design Table.
 * Includes definitions for rendering data, status indicators, and action menus.
 */
export const getDomainTableColumns = ({ onEdit, onDelete, onVerify }) => {
  // -- Displays a confirmation modal before executing the delete action. --
  const showDeleteConfirm = (record) => {
    confirm({
      title: 'Delete this domain?',
      icon: <ExclamationCircleFilled style={{ color: '#ff4d4f' }} />,
      content: `Are you sure you want to delete ${record.domain}? This action cannot be undone.`,
      okText: 'Yes, Delete',
      okType: 'danger',
      okButtonProps: { danger: true },
      cancelText: 'Cancel',
      onOk() {
        onDelete(record.id);
      },
      onCancel() {},
    });
  };

  // -- Handles clicks on the action dropdown menu items. --
  const handleMenuClick = (key, record) => {
    switch (key) {
      case 'view_pages':
        message.info('View Pages action');
        break;
      case 'edit':
        onEdit(record);
        break;
      case 'verify':
        if (record.status !== 'verified') {
          onVerify(record.id);
        } else {
          message.info('Domain is already verified.');
        }
        break;
      case 'install_script':
        message.info('Install Script action');
        break;
      case 'delete':
        showDeleteConfirm(record);
        break;
      default:
        break;
    }
  };

  // --- The columns array definition ---
  const columns = [
    {
      title: 'Domain URL',
      dataIndex: 'domain',
      key: 'domain',
      width: 350,
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
          { key: 'edit', label: 'Edit', icon: <EditOutlined /> },
          {
            key: 'verify',
            label: 'Verify',
            icon: <CheckSquareOutlined />,
            disabled: record.status === 'verified',
          },
          {
            key: 'install_script',
            label: 'Install script',
            icon: <CodeOutlined />,
            disabled: true,
          },
          { type: 'divider' },
          {
            key: 'delete',
            label: <span style={{ color: '#ff4d4f' }}>Delete</span>,
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

  return columns;
};
