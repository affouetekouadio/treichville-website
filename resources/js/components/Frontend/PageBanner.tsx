import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface PageBannerProps {
  title: string;
  backgroundImage?: string;
  icon?: LucideIcon;
  gradient?: {
    from: string;
    to: string;
  };
  variant?: "large" | "compact";
  align?: "center" | "left";
}

export default function PageBanner({
  title,
  backgroundImage = "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200",
  icon: Icon,
  gradient = {
    from: "#03800a",
    to: "#0f6b7a",
  },
  variant = "compact",
  align = "center",
}: PageBannerProps) {
  const paddingClass =
    variant === "compact"
      ? "py-6 sm:py-8 md:py-10 lg:py-14"
      : "py-8 sm:py-10 md:py-12 lg:py-16";
  const maxWidthClass = variant === "compact" ? "max-w-5xl" : "max-w-6xl";
  const textAlignClass = align === "center" ? "text-center" : "text-left";

  return (
    <section
      className={`relative ${paddingClass} overflow-hidden`}
      style={{
        background: `linear-gradient(to bottom right, ${gradient.from}, ${gradient.to})`,
      }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 opacity-20">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Additional Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom right, ${gradient.from}66, ${gradient.from}8c, ${gradient.to}a6)`,
        }}
      />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className={`${maxWidthClass} mx-auto px-6 relative`}>
        <div className={`${textAlignClass} ${align === "center" ? "max-w-3xl mx-auto" : ""}`}>
          {Icon && variant === "large" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 mb-4 ${
                align === "center" ? "mx-auto" : ""
              }`}
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: Icon ? 0.2 : 0 }}
            className={`${
              variant === "compact" ? "text-3xl sm:text-4xl" : "text-3xl sm:text-4xl lg:text-5xl"
            } font-bold text-white ${variant === "compact" ? "mb-1" : "mb-2"} leading-tight`}
          >
            {title}
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
