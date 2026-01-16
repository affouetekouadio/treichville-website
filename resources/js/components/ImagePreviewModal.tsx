import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, Download } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ImagePreviewModalProps {
  open: boolean;
  onClose: () => void;
  imageUrl: string;
  title?: string;
}

/**
 * Modal pour prévisualiser une image en grand format avec zoom
 *
 * @example
 * ```tsx
 * const [preview, setPreview] = useState({ open: false, url: '' });
 *
 * <ImagePreviewModal
 *   open={preview.open}
 *   onClose={() => setPreview({ open: false, url: '' })}
 *   imageUrl={preview.url}
 *   title="Nom de l'image"
 * />
 * ```
 */
export default function ImagePreviewModal({
  open,
  onClose,
  imageUrl,
  title,
}: ImagePreviewModalProps) {
  const [zoom, setZoom] = useState(1);

  // Gestion du clavier
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-') {
        handleZoomOut();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, zoom]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = title || 'image';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClose = () => {
    setZoom(1);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[90vh] max-w-[90vw] w-full h-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between bg-white/10 backdrop-blur-md px-4 py-3 rounded-t-xl">
                <div className="flex items-center gap-3">
                  {title && (
                    <h3 className="text-white font-semibold text-sm truncate max-w-xs">
                      {title}
                    </h3>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {/* Zoom controls */}
                  <div className="flex items-center gap-1 bg-black/20 rounded-lg px-2 py-1">
                    <button
                      onClick={handleZoomOut}
                      disabled={zoom <= 0.5}
                      className="p-1.5 text-white hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Dézoomer"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </button>
                    <span className="text-white text-xs font-medium min-w-[3rem] text-center">
                      {Math.round(zoom * 100)}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      disabled={zoom >= 3}
                      className="p-1.5 text-white hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Zoomer"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Download button */}
                  <button
                    onClick={handleDownload}
                    className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                    title="Télécharger"
                  >
                    <Download className="h-4 w-4" />
                  </button>

                  {/* Close button */}
                  <button
                    onClick={handleClose}
                    className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                    title="Fermer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Image container */}
              <div className="flex-1 overflow-auto bg-black/20 backdrop-blur-sm rounded-b-xl flex items-center justify-center p-4">
                <motion.img
                  src={imageUrl}
                  alt={title || 'Image preview'}
                  className="max-w-full max-h-full object-contain"
                  style={{
                    transform: `scale(${zoom})`,
                    transition: 'transform 0.2s ease-out',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Keyboard hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                Appuyez sur <kbd className="bg-white/20 px-1.5 py-0.5 rounded">ESC</kbd> pour fermer
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
