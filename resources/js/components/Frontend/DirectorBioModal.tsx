import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Facebook, Twitter, Linkedin, Instagram, User } from "lucide-react";

type SocialLinks = {
  facebook?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  instagram?: string | null;
};

type DirectorBioModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nom: string;
  fonction?: string | null;
  photoUrl?: string | null;
  biographie?: string | null;
  reseauxSociaux?: SocialLinks | null;
};

const socialConfig = [
  { key: "facebook" as const, icon: Facebook, label: "Facebook", color: "hover:text-blue-600" },
  { key: "twitter" as const, icon: Twitter, label: "Twitter / X", color: "hover:text-sky-500" },
  { key: "linkedin" as const, icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-700" },
  { key: "instagram" as const, icon: Instagram, label: "Instagram", color: "hover:text-pink-600" },
];

export default function DirectorBioModal({
  open,
  onOpenChange,
  nom,
  fonction,
  photoUrl,
  biographie,
  reseauxSociaux,
}: DirectorBioModalProps) {
  const hasSocials = reseauxSociaux && Object.values(reseauxSociaux).some(Boolean);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="sr-only">Profil de {nom}</DialogTitle>
          <DialogDescription className="sr-only">
            Biographie et informations du responsable de la direction
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-200 shadow-lg mb-4">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={nom}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-orange-100 flex items-center justify-center">
                <User className="w-16 h-16 text-orange-400" />
              </div>
            )}
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-1">{nom}</h3>
          <p className="text-sm font-semibold text-orange-600 mb-4">{fonction || "Responsable"}</p>

          {biographie && (
            <div
              className="rich-content text-sm text-gray-600 leading-relaxed text-left w-full mb-4 max-h-60 overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: biographie }}
            />
          )}

          {hasSocials && (
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100 w-full justify-center">
              {socialConfig.map(({ key, icon: Icon, label, color }) => {
                const url = reseauxSociaux?.[key];
                if (!url) return null;
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 transition-colors ${color}`}
                    title={label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
