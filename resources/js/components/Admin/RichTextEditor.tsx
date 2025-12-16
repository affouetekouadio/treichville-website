import { useEffect, useRef, useState } from 'react';

type Props = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
};

const CKEDITOR_SRC = 'https://cdn.ckeditor.com/ckeditor5/41.4.2/classic/ckeditor.js';

/**
 * Charge CKEditor 5 depuis le CDN et instancie un éditeur Classic.
 * Fallback en textarea si le script ne se charge pas.
 */
export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<any>(null);
  const lastValueRef = useRef<string>(value);
  const [failed, setFailed] = useState(false);
  const onChangeRef = useRef(onChange);

  // Conserve la dernière version du callback sans recréer l'éditeur.
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    // Charge le script CKEditor si nécessaire.
    if (!(window as any).ClassicEditor && !document.querySelector(`script[src="${CKEDITOR_SRC}"]`)) {
      const script = document.createElement('script');
      script.src = CKEDITOR_SRC;
      script.async = true;
      script.onload = () => initEditor();
      script.onerror = () => setFailed(true);
      document.body.appendChild(script);
    } else if ((window as any).ClassicEditor) {
      initEditor();
    }

    async function initEditor() {
      if (!editorRef.current || instanceRef.current || !(window as any).ClassicEditor) {
        return;
      }
      try {
        const editor = await (window as any).ClassicEditor.create(editorRef.current, {
          placeholder,
        });
        instanceRef.current = editor;
        editor.setData(value || '');
        editor.model.document.on('change:data', () => {
          const data = editor.getData();
          lastValueRef.current = data;
          onChangeRef.current(data);
        });
      } catch (err) {
        console.error(err);
        setFailed(true);
      }
    }

    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy().catch(() => {});
        instanceRef.current = null;
      }
    };
    // onChange exclu pour ne pas ré-instancier l'éditeur à chaque frappe
  }, [placeholder]);

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
        rows={5}
      />
    );
  }

  return (
    <div
      ref={editorRef}
      className="prose prose-sm max-w-none rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-inner"
    />
  );
}
