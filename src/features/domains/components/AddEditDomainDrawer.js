import React, { useEffect } from 'react';
import { Drawer, Form, Input, Button, Space, Spin, Switch, Select } from 'antd';

const { Option } = Select;

/**
 * Drawer component for adding or editing domains using an Ant Design Form.
 * Handles pre-filling data for editing and resetting for adding.
 */

const AddEditDomainDrawer = ({
  visible,
  onClose,
  onSave,
  initialData,
  isLoading,
}) => {
  const [form] = Form.useForm();
  const isEditMode = Boolean(initialData);

  // --- Effect to sync form with initialData when drawer visibility or data changes. --
  useEffect(() => {
    if (visible) {
      if (initialData) {
        form.setFieldsValue({
          domain: initialData.domain,
          isActive: initialData.isActive,
          status: initialData.status || 'pending',
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, initialData, form]);

  // --- Passes validated values to the parent handler on successful submission. --
  const handleFinish = (values) => {
    onSave(values);
  };

  return (
    <Drawer
      title={isEditMode ? 'Edit Domain' : 'Add New Domain'}
      width={420}
      onClose={onClose}
      open={visible}
      styles={{ paddingBottom: 80 }}
      footer={
        <Space
          style={{
            textAlign: 'right',
            width: '100%',
            justifyContent: 'flex-end',
          }}
        >
          <Button onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={() => form.submit()}
            type="primary"
            loading={isLoading}
          >
            {isEditMode ? 'Save Changes' : 'Add Domain'}
          </Button>
        </Space>
      }
      destroyOnClose
    >
      <Spin spinning={isLoading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          requiredMark={false}
          initialValues={{
            isActive: true,
            status: 'pending',
          }}
        >
          <Form.Item
            name="domain"
            label="Domain URL"
            rules={[
              {
                required: true,
                message: 'Please enter the HTTPS URL',
              },
              {
                pattern:
                  /^https?:\/\/(www\.)?(?!-)[a-zA-Z0-9-]{1,63}(?<!-)(\.[a-zA-Z0-9-]{1,63}(?<!-))*\.[a-zA-Z]{2,}(\/.*)?$/,
                message:
                  'Must be a valid HTTP or HTTPS URL (e.g., https://example.com)',
              },
              {
                validator: (_, value) =>
                  !value || value.indexOf(' ') < 0
                    ? Promise.resolve()
                    : Promise.reject(new Error('URL cannot contain spaces')),
              },
            ]}
            tooltip="Enter the full URL, e.g., https://www.example.com or http://example.com/path"
          >
            <Input placeholder="e.g., example.com" />
          </Form.Item>

          <Form.Item
            name="isActive"
            label="Active Status"
            valuePropName="checked"
          >
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Verification Status"
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Select placeholder="Select verification status">
              <Option value="pending">Pending</Option>
              <Option value="verified">Verified</Option>
              <Option value="rejected">Rejected</Option>
            </Select>
          </Form.Item>
        </Form>
      </Spin>
    </Drawer>
  );
};

export default AddEditDomainDrawer;
