import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface PageBannerProps {
  title: string;
  description?: string;
  backgroundImage?: string;
  icon?: LucideIcon;
  badge?: {
    icon?: LucideIcon;
    text: string;
  };
  gradient?: {
    from: string;
    to: string;
  };
  variant?: "large" | "compact";
  align?: "center" | "left";
}

export default function PageBanner({
  title,
  description,
  backgroundImage = "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200",
  icon: Icon,
  badge,
  gradient = {
    from: "#03800a",
    to: "#0d9488",
  },
  variant = "large",
  align = "center",
}: PageBannerProps) {
  const paddingClass = variant === "compact" ? "py-16" : "py-20 lg:py-28";
  const maxWidthClass = variant === "compact" ? "max-w-5xl" : "max-w-7xl";
  const textAlignClass = align === "center" ? "text-center" : "text-left";
  const itemsAlignClass = align === "center" ? "mx-auto" : "";

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
        className="absolute inset-0 opacity-40"
        style={{
          background: `linear-gradient(to bottom right, ${gradient.from}CC, ${gradient.to}CC)`,
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
        <div className={`${textAlignClass} ${align === "center" ? "max-w-4xl mx-auto" : ""}`}>
          {/* Badge - Version compacte avec texte simple */}
          {badge && variant === "compact" ? (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="uppercase tracking-[0.3em] text-sm text-white/70 mb-4"
            >
              {badge.text}
            </motion.p>
          ) : badge ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6 ${itemsAlignClass}`}
            >
              {badge.icon && <badge.icon className="w-4 h-4 text-white" />}
              <span className="text-sm text-white font-medium">{badge.text}</span>
            </motion.div>
          ) : null}

          {/* Icon */}
          {Icon && variant === "large" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 mb-6 ${itemsAlignClass}`}
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: Icon || badge ? 0.2 : 0 }}
            className={`${variant === "compact" ? "text-4xl lg:text-5xl" : "text-4xl md:text-5xl lg:text-6xl"} font-bold text-white ${variant === "compact" ? "mb-4" : "mb-6"} leading-tight`}
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: Icon || badge ? 0.3 : 0.1 }}
              className={`${variant === "compact" ? "flex items-center gap-3 text-white/80" : "text-lg md:text-xl text-white/90 leading-relaxed"} ${align === "center" ? "max-w-3xl mx-auto" : ""}`}
            >
              {Icon && variant === "compact" && <Icon className="w-5 h-5" />}
              <span>{description}</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
