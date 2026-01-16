import ListingPagination from '@/components/listing/ListingPagination';
import ListingToolbar from '@/components/listing/ListingToolbar';
import { listingExport, listingVisit } from '@/lib/listing';
import AppLayout from '@/layouts/app-layout';
import type { FrontendPage } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { useListingSearch } from '@/hooks/use-listing-search';
import { Eye, Trash2, CheckCircle, XCircle, Mail, Phone, Calendar, X } from 'lucide-react';
import { useNotification } from '@/contexts/NotificationContext';
import ConfirmDialog from '@/components/ConfirmDialog';
import { motion, AnimatePresence } from 'framer-motion';

type ContactItem = {
  id: number;
  nom: string;
  email: string;
  telephone?: string | null;
  sujet: string;
  message: string;
  traite: boolean;
  created_at: string;
};

type ListingFilters = {
  search?: string;
  sort?: string;
  direction?: 'asc' | 'desc';
  per_page?: number;
};

type ListingPaginationMeta = {
  page: number;
  per_page: number;
  total: number;
  last_page: number;
};

type ContactPageProps = {
  contacts?: ContactItem[];
  listing?: {
    filters: ListingFilters;
    pagination: ListingPaginationMeta;
  };
};

const AdminContacts: FrontendPage<ContactPageProps> = ({ contacts = [], listing }) => {
  const { addNotification } = useNotification();
  const { url } = usePage();
  const baseUrl = url.split('?')[0];
  const [search, setSearch] = useState(listing?.filters.search ?? '');
  const sortValue = listing?.filters.sort ?? 'created_at';
  const sortDirection = listing?.filters.direction ?? 'desc';

  const pagination = listing?.pagination ?? {
    page: 1,
    per_page: 15,
    total: contacts.length,
    last_page: 1,
  };

  const baseParams = useMemo(
    () => ({
      search,
      sort: sortValue,
      direction: sortDirection,
      per_page: pagination.per_page,
    }),
    [pagination.per_page, search, sortDirection, sortValue]
  );
  useListingSearch(baseUrl, baseParams);

  // État pour la modale de détails
  const [detailsModal, setDetailsModal] = useState<{
    open: boolean;
    contact: ContactItem | null;
  }>({
    open: false,
    contact: null,
  });

  // État pour la confirmation de suppression
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: number | null }>({
    open: false,
    id: null,
  });
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Ouvrir les détails d'un message
  const handleViewDetails = (contact: ContactItem) => {
    setDetailsModal({ open: true, contact });

    // Marquer automatiquement comme lu si ce n'est pas déjà fait
    if (!contact.traite) {
      handleToggleStatus(contact.id, true, false);
    }
  };

  // Marquer comme lu/non lu
  const handleToggleStatus = async (id: number, status: boolean, showNotification = true) => {
    setUpdating(true);
    try {
      const csrf = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
      const res = await fetch(`/admin/api/contacts/${id}/toggle-status`, {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': csrf,
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ traite: status }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Erreur lors de la mise à jour');
      }

      const json = await res.json();
      if (showNotification) {
        addNotification('success', json.message || 'Statut mis à jour');
      }

      listingVisit(baseUrl, baseParams);
    } catch (error) {
      console.error(error);
      if (showNotification) {
        addNotification('error', error instanceof Error ? error.message : 'Impossible de mettre à jour le statut');
      }
    } finally {
      setUpdating(false);
    }
  };

  // Supprimer un message
  const handleDeleteClick = (id: number) => {
    setDeleteConfirm({ open: true, id });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.id) return;

    setDeleting(true);
    try {
      const csrf = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
      const res = await fetch(`/admin/api/contacts/${deleteConfirm.id}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-TOKEN': csrf,
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Erreur de suppression');
      }

      const json = await res.json();
      addNotification('success', json.message || 'Message supprimé');

      setDeleteConfirm({ open: false, id: null });
      listingVisit(baseUrl, baseParams);
    } catch (error) {
      console.error(error);
      addNotification('error', error instanceof Error ? error.message : 'Impossible de supprimer le message');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <Head title="Contacts" />

      <div>
        <p className="text-sm uppercase tracking-wide text-gray-500">Messagerie</p>
        <h1 className="text-2xl font-bold text-gray-900">Messages de contact</h1>
        <p className="text-sm text-gray-600">
          Consultez les messages envoyés via le formulaire de contact.
        </p>
      </div>

      <ListingToolbar
        search={search}
        perPage={pagination.per_page}
        sort={{ value: sortValue, direction: sortDirection }}
        sortOptions={[
          { value: 'created_at', label: 'Date' },
          { value: 'nom', label: 'Nom' },
          { value: 'email', label: 'Email' },
          { value: 'sujet', label: 'Sujet' },
          { value: 'traite', label: 'Statut' },
        ]}
        onSearchChange={setSearch}
        onSearchSubmit={() => listingVisit(baseUrl, { ...baseParams, page: 1 })}
        onPerPageChange={(value) => listingVisit(baseUrl, { ...baseParams, per_page: value, page: 1 })}
        onExport={(format) => listingExport(baseUrl, baseParams, format)}
        onSortChange={(value, direction) => listingVisit(baseUrl, { ...baseParams, sort: value, direction })}
      />

      <div className="rounded-xl border border-gray-200 bg-white p-0 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Sujet</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length ? (
                contacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className={`border-t align-top transition-colors ${
                      !contact.traite ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                          contact.traite
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {contact.traite ? 'Traité' : 'Nouveau'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">
                      {new Date(contact.created_at).toLocaleString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{contact.nom}</td>
                    <td className="px-4 py-3 text-gray-700">{contact.email}</td>
                    <td className="px-4 py-3 text-gray-700 font-medium">{contact.sujet}</td>
                    <td className="px-4 py-3 text-gray-600">
                      <div className="max-w-xs truncate" title={contact.message}>
                        {contact.message}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetails(contact)}
                          className="rounded p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Voir les détails"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(contact.id, !contact.traite)}
                          disabled={updating}
                          className={`rounded p-1.5 transition-colors ${
                            contact.traite
                              ? 'text-amber-600 hover:bg-amber-50'
                              : 'text-emerald-600 hover:bg-emerald-50'
                          } disabled:opacity-50`}
                          title={contact.traite ? 'Marquer comme non lu' : 'Marquer comme lu'}
                        >
                          {contact.traite ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => handleDeleteClick(contact.id)}
                          className="rounded p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                    Aucun message de contact pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ListingPagination
        page={pagination.page}
        lastPage={pagination.last_page}
        total={pagination.total}
        onPageChange={(page) => listingVisit(baseUrl, { ...baseParams, page })}
      />

      {/* Modale de détails du message */}
      <AnimatePresence>
        {detailsModal.open && detailsModal.contact && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              onClick={() => setDetailsModal({ open: false, contact: null })}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative max-w-2xl w-full bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Détails du message</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Reçu le{' '}
                      {new Date(detailsModal.contact.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => setDetailsModal({ open: false, contact: null })}
                    className="rounded-full p-2 text-gray-500 hover:bg-white/50 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] space-y-6">
                  {/* Informations de contact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Mail className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Nom</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          {detailsModal.contact.nom}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Mail className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</p>
                        <a
                          href={`mailto:${detailsModal.contact.email}`}
                          className="text-sm font-semibold text-blue-600 hover:text-blue-700 mt-1 block truncate"
                        >
                          {detailsModal.contact.email}
                        </a>
                      </div>
                    </div>

                    {detailsModal.contact.telephone && (
                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Phone className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Téléphone
                          </p>
                          <a
                            href={`tel:${detailsModal.contact.telephone}`}
                            className="text-sm font-semibold text-blue-600 hover:text-blue-700 mt-1 block"
                          >
                            {detailsModal.contact.telephone}
                          </a>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <Calendar className="h-5 w-5 text-amber-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Statut</p>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold mt-1 ${
                            detailsModal.contact.traite
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {detailsModal.contact.traite ? 'Traité' : 'Nouveau'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Sujet */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                      <p className="text-base font-semibold text-gray-900">
                        {detailsModal.contact.sujet}
                      </p>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {detailsModal.contact.message}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer actions */}
                <div className="border-t px-6 py-4 bg-gray-50 flex items-center justify-between">
                  <button
                    onClick={() => handleToggleStatus(detailsModal.contact!.id, !detailsModal.contact!.traite)}
                    disabled={updating}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors disabled:opacity-50 ${
                      detailsModal.contact.traite
                        ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                    }`}
                  >
                    {detailsModal.contact.traite ? (
                      <>
                        <XCircle className="h-4 w-4" />
                        Marquer comme non lu
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Marquer comme lu
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setDetailsModal({ open: false, contact: null });
                        handleDeleteClick(detailsModal.contact!.id);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 font-semibold text-sm transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      Supprimer
                    </button>
                    <button
                      onClick={() => setDetailsModal({ open: false, contact: null })}
                      className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold text-sm transition-colors"
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Confirmation de suppression */}
      <ConfirmDialog
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, id: null })}
        onConfirm={handleDeleteConfirm}
        title="Supprimer ce message ?"
        message="Cette action est irréversible. Le message sera définitivement supprimé."
        confirmText="Supprimer"
        type="danger"
        loading={deleting}
      />
    </div>
  );
};

AdminContacts.layout = (page) => <AppLayout>{page}</AppLayout>;

export default AdminContacts;
