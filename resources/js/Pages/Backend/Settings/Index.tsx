import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { FrontendPage } from '@/types';
import { useState, useEffect, FormEvent, useRef } from 'react';
import { Settings, Save, Image as ImageIcon, X, Upload } from 'lucide-react';
import { useNotification } from '@/contexts/NotificationContext';
import ImagePreviewModal from '@/components/ImagePreviewModal';

interface SettingItem {
  id: number;
  key: string;
  value: string | null;
  type: string;
  group: string;
  description: string | null;
}

interface GroupedSettings {
  [group: string]: {
    [key: string]: SettingItem;
  };
}

interface OpeningHours {
  [day: string]: {
    open: string;
    close: string;
    closed: boolean;
  };
}

const SettingsIndex: FrontendPage = () => {
  const { addNotification } = useNotification();
  const [settings, setSettings] = useState<GroupedSettings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [previewFiles, setPreviewFiles] = useState<Record<string, string>>({});
  const hasNotifiedError = useRef(false);
  const isFetching = useRef(false);
  const [imageModal, setImageModal] = useState({
    open: false,
    url: '',
    title: '',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    try {
      const response = await fetch('/admin/api/settings');
      const data = response.ok ? await response.json() : null;
      if (!response.ok || !data) {
        throw new Error('Erreur lors de la récupération des paramètres');
      }
      setSettings(data);

      // Initialize form data with current values
      const initialFormData: Record<string, any> = {};
      Object.entries(data).forEach(([group, groupSettings]) => {
        Object.entries(groupSettings).forEach(([key, setting]) => {
          initialFormData[key] = setting.value || '';
        });
      });
      setFormData(initialFormData);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des paramètres:', error);
      if (!hasNotifiedError.current) {
        addNotification('error', 'Erreur lors du chargement des paramètres');
        hasNotifiedError.current = true;
      }
      setLoading(false);
    } finally {
      isFetching.current = false;
    }
  };

  const handleFileChange = (key: string, file: File | null) => {
    if (file) {
      setFormData(prev => ({ ...prev, [key]: file }));
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreviewFiles(prev => ({ ...prev, [key]: previewUrl }));
    } else {
      setFormData(prev => ({ ...prev, [key]: '' }));
      setPreviewFiles(prev => {
        const newPreviews = { ...prev };
        delete newPreviews[key];
        return newPreviews;
      });
    }
  };

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleOpeningHoursChange = (day: string, field: string, value: any) => {
    const currentHours = formData.opening_hours
      ? JSON.parse(formData.opening_hours)
      : {};

    const updatedHours = {
      ...currentHours,
      [day]: {
        ...(currentHours[day] || { open: '08:00', close: '17:00', closed: false }),
        [field]: value,
      },
    };

    setFormData(prev => ({ ...prev, opening_hours: JSON.stringify(updatedHours) }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const form = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          form.append(key, value);
        } else if (value !== null && value !== undefined) {
          form.append(key, String(value));
        }
      });

      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

      const response = await fetch('/admin/api/settings/batch', {
        method: 'POST',
        body: form,
        headers: {
          'X-CSRF-TOKEN': csrfToken || '',
        },
      });

      const data = await response.json();

      if (response.ok) {
        addNotification('success', data.message || 'Paramètres mis à jour avec succès');
        await fetchSettings();
      } else {
        throw new Error(data.message || 'Erreur lors de la mise à jour');
      }
    } catch (error: any) {
      console.error('Erreur:', error);
      addNotification('error', error.message || 'Erreur lors de la mise à jour des paramètres');
    } finally {
      setSaving(false);
    }
  };

  const getImageUrl = (key: string) => {
    if (previewFiles[key]) return previewFiles[key];
    const value = formData[key];
    if (!value) return null;
    if (typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'))) {
      return value;
    }
    return `/storage/${value}`;
  };

  const tabs = [
    { id: 'general', label: 'Général', group: 'general' },
    { id: 'appearance', label: 'Apparence', group: 'appearance' },
    { id: 'contact', label: 'Contact', group: 'contact' },
    { id: 'social', label: 'Réseaux Sociaux', group: 'social' },
  ];

  const daysOfWeek = [
    { id: 'monday', label: 'Lundi' },
    { id: 'tuesday', label: 'Mardi' },
    { id: 'wednesday', label: 'Mercredi' },
    { id: 'thursday', label: 'Jeudi' },
    { id: 'friday', label: 'Vendredi' },
    { id: 'saturday', label: 'Samedi' },
    { id: 'sunday', label: 'Dimanche' },
  ];

  const renderField = (setting: SettingItem) => {
    const key = setting.key;
    const value = formData[key] || '';

    // Handle opening hours specially
    if (key === 'opening_hours') {
      const hours: OpeningHours = value ? JSON.parse(value) : {};

      return (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Heures d'ouverture
          </label>
          {daysOfWeek.map((day) => {
            const dayHours = hours[day.id] || { open: '08:00', close: '17:00', closed: false };

            return (
              <div key={day.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-24 font-medium text-sm">{day.label}</div>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!dayHours.closed}
                    onChange={(e) => handleOpeningHoursChange(day.id, 'closed', !e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">Ouvert</span>
                </label>

                {!dayHours.closed && (
                  <>
                    <input
                      type="time"
                      value={dayHours.open}
                      onChange={(e) => handleOpeningHoursChange(day.id, 'open', e.target.value)}
                      className="px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <span className="text-gray-500">à</span>
                    <input
                      type="time"
                      value={dayHours.close}
                      onChange={(e) => handleOpeningHoursChange(day.id, 'close', e.target.value)}
                      className="px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </>
                )}

                {dayHours.closed && (
                  <span className="text-sm text-gray-500 italic">Fermé</span>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    // Handle image fields
    if (setting.type === 'image') {
      const currentImageUrl = getImageUrl(key);

      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {setting.description || key}
          </label>

          {currentImageUrl && (
            <div className="relative inline-block">
              <img
                src={currentImageUrl}
                alt={setting.description || key}
                className="h-24 w-24 object-cover rounded-lg border border-gray-300 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                onClick={() => setImageModal({
                  open: true,
                  url: currentImageUrl,
                  title: setting.description || key,
                })}
              />
              <button
                type="button"
                onClick={() => handleFileChange(key, null)}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                title="Supprimer l'image"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
              <Upload className="h-4 w-4" />
              <span className="text-sm">
                {currentImageUrl ? 'Changer l\'image' : 'Choisir une image'}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(key, e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
          </div>

          {setting.description && (
            <p className="text-xs text-gray-500">{setting.description}</p>
          )}
        </div>
      );
    }

    // Handle text/textarea fields
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {setting.description || key}
        </label>
        {setting.key.includes('description') || setting.key.includes('address') ? (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(key, e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={setting.description || ''}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={setting.description || ''}
          />
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <AppLayout>
        <Head title="Paramètres" />
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Chargement des paramètres...</div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Head title="Paramètres" />
      <div className="p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <Settings className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
              <p className="text-sm text-gray-500">Configuration générale du site</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex gap-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-6">
              {settings[activeTab] && Object.entries(settings[activeTab]).map(([key, setting]) => (
                <div key={key}>
                  {renderField(setting)}
                </div>
              ))}

              {!settings[activeTab] && (
                <div className="text-center py-8 text-gray-500">
                  Aucun paramètre disponible pour cette section
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Enregistrement...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Enregistrer les modifications</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Image Preview Modal */}
      <ImagePreviewModal
        open={imageModal.open}
        onClose={() => setImageModal({ open: false, url: '', title: '' })}
        imageUrl={imageModal.url}
        title={imageModal.title}
      />
    </AppLayout>
  );
};

SettingsIndex.layout = (page) => <AppLayout>{page}</AppLayout>;

export default SettingsIndex;
