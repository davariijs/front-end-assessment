import { useState, useEffect } from 'react';
import { message } from 'antd';
import {
  useGetDomainsQuery,
  useAddDomainMutation,
  useUpdateDomainMutation,
  useDeleteDomainMutation,
} from '../../../services/domainsApi';

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
    console.log('Opening edit drawer for:', domain);
    if (!domain?.id) {
      console.error(
        'Domain object passed to openEditDrawer is missing id:',
        domain
      );
    }
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
        console.log('Attempting to update domain:', editingDomain);
        if (!editingDomain.id) {
          console.error('Error: editingDomain.id is missing!', editingDomain);
          message.error('Cannot update domain: Missing ID.');
          return;
        }
        await updateDomain({ id: editingDomain.id, ...values }).unwrap();
        message.success('Domain updated successfully!');
        closeDrawer();
      } else {
        console.log('Attempting to add new domain with values:', values);
        const submittedDomain = values.domain?.trim().toLowerCase();
        const existingDomains = domains || [];
        const isDuplicate = existingDomains.some(
          (d) => d.domain?.trim().toLowerCase() === submittedDomain
        );

        if (isDuplicate) {
          message.error(
            `Domain "${values.domain}" already exists in the list!`,
            4
          );
          console.warn('Duplicate domain detected:', values.domain);
          return;
        }

        const newDomainPayload = {
          ...values,
          createdDate: Math.floor(Date.now() / 1000),
        };

        console.log('Sending payload for add:', newDomainPayload);
        await addDomain(newDomainPayload).unwrap();
        message.success('Domain added successfully!');
        closeDrawer();
      }
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

  const verifyDomain = async (id) => {
    console.log('Attempting to verify domain with id:', id);
    try {
      const payload = {
        id: id,
        status: 'verified',
        isActive: true,
      };
      await updateDomain(payload).unwrap();
      message.success('Domain verified successfully!');
    } catch (err) {
      console.error('Failed to verify domain:', err);
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
    verifyDomain,
  };
};
