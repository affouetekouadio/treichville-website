import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { FrontendPage } from '@/types';
import { useState, useEffect, FormEvent, useRef } from 'react';
import { MessageSquare, Plus, Edit, Trash2, Eye, X, Upload, ToggleLeft, ToggleRight } from 'lucide-react';
import { useNotification } from '@/contexts/NotificationContext';
import ConfirmDialog from '@/components/ConfirmDialog';
import ImagePreviewModal from '@/components/ImagePreviewModal';
import RichTextEditor from '@/components/Admin/RichTextEditor';

interface MessageMaireItem {
  id: string;
  photo: string | null;
  photo_url: string | null;
  image_fond: string | null;
  image_fond_url: string | null;
  titre_vision: string;
  salutation: string;
  contenu_message: string;
  texte_conclusion: string | null;
  nom_maire: string;
  titre_maire: string;
  citation: string | null;
  actif: boolean;
  created_at: string;
}

const MessagesMaireIndex: FrontendPage = () => {
  const { addNotification } = useNotification();
  const [messages, setMessages] = useState<MessageMaireItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null,
  });
  const [deleting, setDeleting] = useState(false);
  const [imageModal, setImageModal] = useState({
    open: false,
    url: '',
    title: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [imageFondPreview, setImageFondPreview] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const imageFondInputRef = useRef<HTMLInputElement | null>(null);
  const [form, setForm] = useState({
    titre_vision: '',
    salutation: '',
    contenu_message: '',
    texte_conclusion: '',
    nom_maire: '',
    titre_maire: '',
    citation: '',
    actif: false,
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [imageFondFile, setImageFondFile] = useState<File | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/admin/api/messages-maire');
      const data = await response.json();
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur:', error);
      addNotification('error', 'Erreur lors du chargement des messages');
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      titre_vision: '',
      salutation: '',
      contenu_message: '',
      texte_conclusion: '',
      nom_maire: '',
      titre_maire: '',
      citation: '',
      actif: false,
    });
    setPhotoFile(null);
    setImageFondFile(null);
    setPhotoPreview(null);
    setImageFondPreview(null);
    setFormErrors({});
    if (photoInputRef.current) photoInputRef.current.value = '';
    if (imageFondInputRef.current) imageFondInputRef.current.value = '';
    setEditingId(null);
  };

  const handleEdit = (msg: MessageMaireItem) => {
    setForm({
      titre_vision: msg.titre_vision,
      salutation: msg.salutation,
      contenu_message: msg.contenu_message,
      texte_conclusion: msg.texte_conclusion || '',
      nom_maire: msg.nom_maire,
      titre_maire: msg.titre_maire,
      citation: msg.citation || '',
      actif: msg.actif,
    });
    setPhotoFile(null);
    setImageFondFile(null);
    if (photoInputRef.current) photoInputRef.current.value = '';
    if (imageFondInputRef.current) imageFondInputRef.current.value = '';
    setPhotoPreview(msg.photo_url);
    setImageFondPreview(msg.image_fond_url);
    setEditingId(msg.id);
    setOpenForm(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormErrors({});

    try {
      const formData = new FormData();
      formData.append('titre_vision', form.titre_vision);
      formData.append('salutation', form.salutation);
      formData.append('contenu_message', form.contenu_message);
      formData.append('texte_conclusion', form.texte_conclusion || '');
      formData.append('nom_maire', form.nom_maire);
      formData.append('titre_maire', form.titre_maire);
      formData.append('citation', form.citation || '');
      formData.append('actif', form.actif ? '1' : '0');

      if (photoFile) formData.append('photo', photoFile);
      if (imageFondFile) formData.append('image_fond', imageFondFile);

      if (editingId) formData.append('_method', 'PUT');

      const csrf = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
      const url = editingId
        ? `/admin/api/messages-maire/${editingId}`
        : '/admin/api/messages-maire';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': csrf,
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData?.errors) {
          setFormErrors(errorData.errors);
        }
        throw new Error(errorData.message || 'Erreur de sauvegarde');
      }

      const data = await response.json();
      addNotification('success', data.message || (editingId ? 'Message modifié' : 'Message créé'));

      setOpenForm(false);
      resetForm();
      fetchMessages();
    } catch (error) {
      console.error(error);
      addNotification('error', error instanceof Error ? error.message : 'Impossible de sauvegarder le message');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirm({ open: true, id });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.id) return;

    setDeleting(true);
    try {
      const csrf = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
      const response = await fetch(`/admin/api/messages-maire/${deleteConfirm.id}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-TOKEN': csrf,
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur de suppression');
      }

      const data = await response.json();
      addNotification('success', data.message || 'Message supprimé');

      setDeleteConfirm({ open: false, id: null });
      fetchMessages();
    } catch (error) {
      console.error(error);
      addNotification('error', error instanceof Error ? error.message : 'Impossible de supprimer le message');
    } finally {
      setDeleting(false);
    }
  };

  const handleToggleActif = async (id: string) => {
    try {
      const csrf = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
      const response = await fetch(`/admin/api/messages-maire/${id}/toggle-actif`, {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': csrf,
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur');
      }

      const data = await response.json();
      addNotification('success', data.message);
      fetchMessages();
    } catch (error) {
      console.error(error);
      addNotification('error', error instanceof Error ? error.message : 'Erreur lors du changement de statut');
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleImageFondChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFondFile(file);
      setImageFondPreview(URL.createObjectURL(file));
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6 p-4">
        <Head title="Message du Maire" />
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Chargement des messages...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6 p-4">
        <Head title="Message du Maire" />
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <MessageSquare className="h-5 w-5 text-[#03800a]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Message du Maire</h1>
              <p className="text-sm text-gray-500">Gestion du message affiché sur la page "Message du Maire". Un seul message peut être actif.</p>
            </div>
          </div>
          <button
            onClick={() => {
              resetForm();
              setOpenForm(true);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-[#03800a] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Nouveau message
          </button>
        </div>

        {/* Liste des messages */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          {messages.length === 0 ? (
            <div className="p-12 text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-[#03800a]" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Aucun message</h3>
              <p className="mt-2 text-sm text-gray-500">Commencez par créer un message du maire</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-4 p-5 transition-colors hover:bg-gray-50 ${!msg.actif ? 'bg-gray-50/50' : ''}`}
                >
                  {/* Photo */}
                  <div className="flex-shrink-0">
                    {msg.photo_url ? (
                      <button
                        onClick={() =>
                          setImageModal({
                            open: true,
                            url: msg.photo_url!,
                            title: msg.nom_maire,
                          })
                        }
                        className="relative group"
                      >
                        <img
                          src={msg.photo_url}
                          alt={msg.nom_maire}
                          className="h-20 w-20 rounded-lg object-cover ring-2 ring-gray-200 group-hover:ring-[#03800a] transition-all"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Eye className="h-5 w-5 text-white" />
                        </div>
                      </button>
                    ) : (
                      <div className="h-20 w-20 rounded-lg bg-gray-100 flex items-center justify-center">
                        <MessageSquare className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Informations */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-gray-900">{msg.titre_vision}</h3>
                      {msg.actif ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Actif
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                          Inactif
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-700">{msg.nom_maire} &mdash; {msg.titre_maire}</p>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{msg.contenu_message}</p>
                    {msg.citation && (
                      <p className="text-xs text-gray-400 mt-1 italic">"{msg.citation}"</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleToggleActif(msg.id)}
                      className={`rounded p-2 transition-colors ${
                        msg.actif
                          ? 'text-green-600 hover:bg-green-50'
                          : 'text-gray-400 hover:bg-gray-100'
                      }`}
                      title={msg.actif ? 'Désactiver' : 'Activer'}
                    >
                      {msg.actif ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
                    </button>
                    <button
                      onClick={() => handleEdit(msg)}
                      className="rounded p-2 text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Modifier"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(msg.id)}
                      className="rounded p-2 text-red-600 hover:bg-red-50 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal formulaire */}
      {openForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 overflow-y-auto py-6">
          <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl my-4">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  {editingId ? 'Modifier' : 'Nouveau'} message
                </p>
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingId ? 'Modifier le message du maire' : 'Créer un message du maire'}
                </h2>
              </div>
              <button
                onClick={() => {
                  setOpenForm(false);
                  resetForm();
                }}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form className="space-y-4 px-6 py-5" onSubmit={handleSubmit}>
              {/* Informations du maire */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nom du maire *</label>
                  <input
                    required
                    value={form.nom_maire}
                    onChange={(e) => setForm({ ...form, nom_maire: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-green-200"
                    placeholder="Ex: François Albert AMICHIA"
                  />
                  {formErrors.nom_maire?.[0] && (
                    <p className="mt-1 text-xs text-red-600">{formErrors.nom_maire[0]}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Titre / Fonction *</label>
                  <input
                    required
                    value={form.titre_maire}
                    onChange={(e) => setForm({ ...form, titre_maire: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-green-200"
                    placeholder="Ex: Maire de Treichville"
                  />
                  {formErrors.titre_maire?.[0] && (
                    <p className="mt-1 text-xs text-red-600">{formErrors.titre_maire[0]}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Titre de la vision *</label>
                  <input
                    required
                    value={form.titre_vision}
                    onChange={(e) => setForm({ ...form, titre_vision: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-green-200"
                    placeholder="Ex: Vision 2025-2030"
                  />
                  {formErrors.titre_vision?.[0] && (
                    <p className="mt-1 text-xs text-red-600">{formErrors.titre_vision[0]}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Salutation *</label>
                  <input
                    required
                    value={form.salutation}
                    onChange={(e) => setForm({ ...form, salutation: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-green-200"
                    placeholder="Ex: Chères Treichvilloises, chers Treichvillois,"
                  />
                  {formErrors.salutation?.[0] && (
                    <p className="mt-1 text-xs text-red-600">{formErrors.salutation[0]}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-medium text-gray-700">Contenu du message *</label>
                <RichTextEditor
                  value={form.contenu_message}
                  onChange={(val) => setForm({ ...form, contenu_message: val })}
                />
                {formErrors.contenu_message?.[0] && (
                  <p className="mt-1 text-xs text-red-600">{formErrors.contenu_message[0]}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Texte de conclusion (optionnel)</label>
                <textarea
                  rows={3}
                  value={form.texte_conclusion}
                  onChange={(e) => setForm({ ...form, texte_conclusion: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="Ex: Je m'engage à poursuivre..."
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Citation / Signature (optionnel)</label>
                <input
                  value={form.citation}
                  onChange={(e) => setForm({ ...form, citation: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#03800a] focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="Ex: Ensemble, bâtissons une Treichville moderne..."
                />
              </div>

              {/* Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Photo du maire</label>
                  {photoPreview && (
                    <div className="mt-2 mb-3">
                      <img
                        src={photoPreview}
                        alt="Aperçu photo"
                        className="h-32 w-32 rounded-lg object-cover border-2 border-green-200"
                      />
                    </div>
                  )}
                  <label className="mt-2 flex cursor-pointer items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-3 hover:border-[#03800a] hover:bg-green-50 transition-colors">
                    <Upload className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">Choisir une photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      ref={photoInputRef}
                      className="hidden"
                    />
                  </label>
                  <p className="mt-1 text-xs text-gray-500">Format image, max 10 Mo</p>
                  {formErrors.photo?.[0] && (
                    <p className="mt-1 text-xs text-red-600">{formErrors.photo[0]}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Image de fond</label>
                  {imageFondPreview && (
                    <div className="mt-2 mb-3">
                      <img
                        src={imageFondPreview}
                        alt="Aperçu image de fond"
                        className="h-32 w-full rounded-lg object-cover border-2 border-green-200"
                      />
                    </div>
                  )}
                  <label className="mt-2 flex cursor-pointer items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-3 hover:border-[#03800a] hover:bg-green-50 transition-colors">
                    <Upload className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">Choisir une image de fond</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFondChange}
                      ref={imageFondInputRef}
                      className="hidden"
                    />
                  </label>
                  <p className="mt-1 text-xs text-gray-500">Format image, max 10 Mo</p>
                  {formErrors.image_fond?.[0] && (
                    <p className="mt-1 text-xs text-red-600">{formErrors.image_fond[0]}</p>
                  )}
                </div>
              </div>

              {/* Actif */}
              <div className="flex items-center gap-3 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
                <input
                  type="checkbox"
                  id="actif"
                  checked={form.actif}
                  onChange={(e) => setForm({ ...form, actif: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-[#03800a] focus:ring-[#03800a]"
                />
                <div>
                  <label htmlFor="actif" className="text-sm font-medium text-gray-700">
                    Activer ce message
                  </label>
                  <p className="text-xs text-amber-700">Un seul message peut être actif à la fois. Activer celui-ci désactivera les autres.</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setOpenForm(false);
                    resetForm();
                  }}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-[#03800a] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 disabled:opacity-60"
                >
                  {saving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation de suppression */}
      <ConfirmDialog
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, id: null })}
        onConfirm={handleDeleteConfirm}
        title="Supprimer ce message ?"
        message="Cette action est irréversible. Le message du maire sera définitivement supprimé."
        confirmText="Supprimer"
        type="danger"
        loading={deleting}
      />

      {/* Modal aperçu photo */}
      <ImagePreviewModal
        open={imageModal.open}
        onClose={() => setImageModal({ open: false, url: '', title: '' })}
        imageUrl={imageModal.url}
        title={imageModal.title}
      />
    </>
  );
};

MessagesMaireIndex.layout = (page) => <AppLayout>{page}</AppLayout>;

export default MessagesMaireIndex;
