import { useEffect, useRef, useState } from 'react';

type Props = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
};

const CKEDITOR_SRC = 'https://cdn.ckeditor.com/ckeditor5/41.4.2/classic/ckeditor.js';

// Adaptateur d'upload personnalisé pour CKEditor
class CustomUploadAdapter {
  loader: any;
  onSuccess?: (url: string) => void;
  onError?: (error: string) => void;

  constructor(loader: any) {
    this.loader = loader;
  }

  async upload() {
    try {
      const file = await this.loader.file;

      // Validation de la taille (max 4MB)
      if (file.size > 4 * 1024 * 1024) {
        throw new Error('L\'image est trop volumineuse (max 4 Mo)');
      }

      // Validation du type
      if (!file.type.startsWith('image/')) {
        throw new Error('Le fichier doit être une image');
      }

      const formData = new FormData();
      formData.append('image', file);

      const csrfToken = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content;

      const response = await fetch('/admin/api/upload-editor-image', {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': csrfToken || '',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'upload');
      }

      const data = await response.json();

      return {
        default: data.url,
      };
    } catch (error) {
      console.error('Erreur upload CKEditor:', error);
      throw error;
    }
  }

  abort() {
    // Pas d'implémentation nécessaire pour l'instant
  }
}

function CustomUploadAdapterPlugin(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return new CustomUploadAdapter(loader);
  };
}

/**
 * Charge CKEditor 5 depuis le CDN et instancie un éditeur Classic avec support d'upload d'images.
 * Fallback en textarea si le script ne se charge pas.
 */
export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<any>(null);
  const lastValueRef = useRef<string>(value);
  const [failed, setFailed] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const onChangeRef = useRef(onChange);

  // Conserve la dernière version du callback sans recréer l'éditeur.
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    let mounted = true;

    async function initEditor() {
      // Vérifier que le composant est toujours monté et qu'il n'y a pas déjà une instance
      if (!mounted || !editorRef.current || instanceRef.current || isInitialized) {
        return;
      }

      // Vérifier que ClassicEditor est disponible
      if (!(window as any).ClassicEditor) {
        return;
      }

      try {
        setIsInitialized(true);

        const editor = await (window as any).ClassicEditor.create(editorRef.current, {
          placeholder,
          extraPlugins: [CustomUploadAdapterPlugin],
          toolbar: {
            items: [
              'heading',
              '|',
              'bold',
              'italic',
              'link',
              'bulletedList',
              'numberedList',
              '|',
              'outdent',
              'indent',
              '|',
              'imageUpload',
              'blockQuote',
              'insertTable',
              'mediaEmbed',
              'undo',
              'redo',
            ],
          },
          image: {
            toolbar: [
              'imageTextAlternative',
              'imageStyle:inline',
              'imageStyle:block',
              'imageStyle:side',
            ],
          },
          table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
          },
        });

        if (!mounted) {
          // Si le composant a été démonté pendant la création, détruire l'éditeur
          editor.destroy().catch(() => {});
          return;
        }

        instanceRef.current = editor;
        editor.setData(value || '');

        editor.model.document.on('change:data', () => {
          const data = editor.getData();
          lastValueRef.current = data;
          onChangeRef.current(data);
        });
      } catch (err) {
        console.error('Erreur initialisation CKEditor:', err);
        if (mounted) {
          setFailed(true);
          setIsInitialized(false);
        }
      }
    }

    // Charge le script CKEditor si nécessaire
    if (!(window as any).ClassicEditor) {
      const existingScript = document.querySelector(`script[src="${CKEDITOR_SRC}"]`);

      if (!existingScript) {
        const script = document.createElement('script');
        script.src = CKEDITOR_SRC;
        script.async = true;
        script.onload = () => {
          if (mounted) {
            initEditor();
          }
        };
        script.onerror = () => {
          if (mounted) {
            setFailed(true);
          }
        };
        document.body.appendChild(script);
      } else {
        // Script déjà présent, attendre qu'il soit chargé
        existingScript.addEventListener('load', () => {
          if (mounted) {
            initEditor();
          }
        });
      }
    } else {
      // ClassicEditor déjà disponible
      initEditor();
    }

    return () => {
      mounted = false;
      if (instanceRef.current) {
        instanceRef.current.destroy().catch(() => {});
        instanceRef.current = null;
      }
      setIsInitialized(false);
    };
  }, []); // Dépendances vides pour n'initialiser qu'une fois

  useEffect(() => {
    // Met à jour le contenu uniquement si la valeur externe change (évite de perdre le focus).
    if (instanceRef.current && value !== lastValueRef.current) {
      instanceRef.current.setData(value || '');
      lastValueRef.current = value;
    }
  }, [value]);

  if (failed) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        rows={8}
      />
    );
  }

  return (
    <div className="ckeditor-container">
      <div
        ref={editorRef}
        className="prose prose-sm max-w-none"
      />
    </div>
  );
}
