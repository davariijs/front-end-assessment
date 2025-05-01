import React, { useEffect } from 'react';
import { Drawer, Form, Input, Button, Space, Spin, Switch, Select } from 'antd';

const { Option } = Select;

const AddEditDomainDrawer = ({
  visible,
  onClose,
  onSave,
  initialData,
  isLoading,
}) => {
  const [form] = Form.useForm();
  const isEditMode = Boolean(initialData);

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

  const handleFinish = (values) => {
    console.log('Form Values Submitted:', values);
    onSave(values);
  };

  const handleFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
          onFinishFailed={handleFinishFailed}
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
              { required: true, message: 'Please enter the domain URL' },
              {
                type: 'url',
                warningOnly: true,
                message:
                  'Please enter a valid URL format (e.g., example.com or https://example.com)',
              },
              {
                validator: (_, value) =>
                  !value || value.indexOf(' ') < 0
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error('Domain URL cannot contain spaces')
                      ),
              },
            ]}
            tooltip="Enter the domain name, like 'example.com' or 'sub.example.co.uk'"
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
