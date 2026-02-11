# Protections ajoutées (2026-02-05)

Ce document résume les protections ajoutées au projet, les termes utilisés et les problèmes qu’elles réduisent.

**1) Rate limiting sur le formulaire de contact**
- Fait : ajout d’un limiteur `contact-form` via `RateLimiter` dans `app/Providers/AppServiceProvider.php`.
- Fait : application du middleware `throttle:contact-form` sur la route `POST /contact` dans `routes/web.php`.
- Terme : **Rate limiting** = limitation du nombre de requêtes par minute depuis une même IP.
- Résout : réduction du spam, des soumissions massives et du bruit automatisé.

**2) Anti‑spam honeypot + délai minimum**
- Fait : ajout d’un champ caché `website` et d’un timestamp `hp_time` dans `resources/js/Pages/Frontend/Contact.tsx`.
- Fait : contrôle côté serveur dans `app/Http/Controllers/Frontend/ContactController.php` (honeypot rempli ou soumission trop rapide).
- Terme : **Honeypot** = champ caché rempli par les bots, pas par les humains.
- Terme : **Délai minimum** = empêche les soumissions instantanées typiques des bots.
- Résout : blocage d’une grande partie du spam automatisé sans impacter les utilisateurs humains.

**3) Nettoyage basique des contenus HTML enregistrés (anti‑XSS)**
- Fait : création d’un sanitizeur léger `app/Support/HtmlSanitizer.php`.
- Fait : nettoyage appliqué aux champs HTML dans `ActualiteController`, `EvenementController`, `PatrimoineController`, `ContentBlockController`, `MessageMaireController`.
- Terme : **XSS (Cross‑Site Scripting)** = injection de scripts via un contenu HTML affiché aux visiteurs.
- Terme : **Sanitization** = suppression des tags/attributs dangereux et des URLs non sûres.
- Résout : réduction des risques d’injection de scripts via les contenus HTML.

**Notes**
- Le meta‑tag CSRF dans `resources/views/app.blade.php` est normal pour Laravel.
- Le nettoyage HTML reste volontairement conservateur et ne remplace pas un WAF/CDN.
