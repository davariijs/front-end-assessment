import { useState, useEffect, useMemo } from 'react';
import { message } from 'antd';
import {
  useGetDomainsQuery,
  useAddDomainMutation,
  useUpdateDomainMutation,
  useDeleteDomainMutation,
} from '../../../services/domainsApi';
import { useDebounce } from './useDebounce';

/**
 * Custom hook encapsulating state and logic for the domain management feature.
 * Handles data fetching, mutations (add, update, delete, verify),
 * UI state (drawer visibility, editing target), search/sort state,
 * data processing (filtering, sorting), and user feedback.
 */
export const useDomainManagement = () => {
  // --- State for Drawer ---
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [editingDomain, setEditingDomain] = useState(null);

  // --- State for Search and Filter/Sort ---
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('id_desc');

  // --- Add Debounced Search Term ---
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  // --- RTK Query Hooks ---
  const {
    data: rawDomains,
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
        if (!editingDomain.id) {
          message.error('Cannot update domain: Missing ID.');
          return;
        }
        await updateDomain({ id: editingDomain.id, ...values }).unwrap();
        message.success('Domain updated successfully!');
        closeDrawer();
      } else {
        const submittedDomain = values.domain?.trim().toLowerCase();
        const existingDomains = rawDomains || [];
        const isDuplicate = existingDomains.some(
          (d) => d.domain?.trim().toLowerCase() === submittedDomain
        );

        if (isDuplicate) {
          message.error(
            `Domain "${values.domain}" already exists in the list!`,
            4
          );
          return;
        }

        const newDomainPayload = {
          ...values,
          createdDate: Math.floor(Date.now() / 1000),
        };

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

  // --- Filtering and Sorting Logic ---
  const filteredAndSortedDomains = useMemo(() => {
    let processedDomains = rawDomains ? [...rawDomains] : [];

    if (debouncedSearchTerm) {
      const lowerSearchTerm = debouncedSearchTerm.toLowerCase();
      processedDomains = processedDomains.filter((domain) =>
        domain.domain?.toLowerCase().includes(lowerSearchTerm)
      );
    }

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      processedDomains = processedDomains.filter((domain) =>
        domain.domain?.toLowerCase().includes(lowerSearchTerm)
      );
    }

    processedDomains.sort((a, b) => {
      switch (sortOrder) {
        case 'name_asc':
          return (a.domain?.toLowerCase() || '').localeCompare(
            b.domain?.toLowerCase() || ''
          );
        case 'name_desc':
          return (b.domain?.toLowerCase() || '').localeCompare(
            a.domain?.toLowerCase() || ''
          );

        case 'id_asc': {
          return (Number(a.id) || 0) - (Number(b.id) || 0);
        }
        case 'id_desc': {
          return (Number(b.id) || 0) - (Number(a.id) || 0);
        }

        default:
          return 0;
      }
    });

    return processedDomains;
  }, [rawDomains, debouncedSearchTerm, sortOrder, searchTerm]);

  return {
    domains: filteredAndSortedDomains,
    isLoading: isGetLoading || isGetFetching,
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
  };
};
