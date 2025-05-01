import { useState, useEffect } from 'react';
import { message } from 'antd';
import {
  useGetDomainsQuery,
  useAddDomainMutation,
  useUpdateDomainMutation,
  useDeleteDomainMutation,
} from '../../services/domainsApi';

export const useDomainManagement = () => {
  // --- State for Drawer ---
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [editingDomain, setEditingDomain] = useState(null);

  // --- RTK Query Hooks ---
  const {
    data: domains,
    error: getError,
    isLoading: isGetLoading,
    isFetching: isGetFetching,
  } = useGetDomainsQuery();
  const [addDomain, { isLoading: isAddLoading, error: addError }] =
    useAddDomainMutation();
  const [updateDomain, { isLoading: isUpdateLoading, error: updateError }] =
    useUpdateDomainMutation();
  const [deleteDomain, { isLoading: isDeleteLoading, error: deleteError }] =
    useDeleteDomainMutation();

  // Combined loading states
  const isLoading = isGetLoading || isGetFetching;
  const isMutating = isAddLoading || isUpdateLoading || isDeleteLoading;

  // --- Error Handling Effect ---
  useEffect(() => {
    const errors = [addError, updateError, deleteError, getError];
    errors.forEach((error) => {
      if (error) {
        const errorMessage =
          error?.data?.message || error?.error || 'An unknown error occurred';
        message.error(errorMessage, 3);
        console.error('API Error:', error);
      }
    });
  }, [addError, updateError, deleteError, getError]);

  // --- Drawer Handlers ---
  const openAddDrawer = () => {
    setEditingDomain(null);
    setIsDrawerVisible(true);
  };

  const openEditDrawer = (domain) => {
    setEditingDomain(domain);
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setEditingDomain(null);
  };

  // --- CRUD Action Handlers ---
  const saveDomain = async (values) => {
    try {
      if (editingDomain) {
        await updateDomain({ id: editingDomain._id, ...values }).unwrap();
        message.success('Domain updated successfully!');
      } else {
        const newDomainPayload = {
          ...values,
          createdDate: Math.floor(Date.now() / 1000),
        };
        await addDomain(newDomainPayload).unwrap();
        message.success('Domain added successfully!');
      }
      closeDrawer();
    } catch (err) {
      console.error('Failed to save domain:', err);
    }
  };

  const deleteDomainById = async (id) => {
    try {
      await deleteDomain(id).unwrap();
      message.success('Domain deleted successfully!');
    } catch (err) {
      console.error('Failed to delete domain:', err);
    }
  };

  return {
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
  };
};
