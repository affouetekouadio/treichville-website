import { Link } from "@inertiajs/react";
import { ArrowLeft, Home, Mail } from "lucide-react";
import FrontendLayout from "@/layouts/frontend-layout";
import type { FrontendPage } from "@/types";

const NotFound: FrontendPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#fff7ef] to-white">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="rounded-3xl border border-orange-100 bg-white shadow-xl p-8 md:p-12">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-[#f8812f]">
              <span className="h-2 w-2 rounded-full bg-[#f8812f]" />
              Page introuvable
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Erreur 404</h1>
              <p className="mt-3 text-lg text-gray-600 max-w-2xl">
                La page que vous cherchez n’existe pas ou a été déplacée. Vérifiez l’adresse ou
                revenez vers les sections principales.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl bg-[#03800a] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
              >
                <Home className="h-4 w-4" />
                Retour à l’accueil
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                <Mail className="h-4 w-4" />
                Nous contacter
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#f8812f] hover:text-orange-600"
              >
                <ArrowLeft className="h-4 w-4" />
                Revenir en arrière
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

NotFound.layout = (page) => <FrontendLayout>{page}</FrontendLayout>;

export default NotFound;
