import AppLayout from '@/layouts/app-layout';
import type { FrontendPage } from '@/types';
import { Head, Link } from '@inertiajs/react';

const cards = [
  { title: 'Actualités', description: 'Gérez les articles et visuels.', href: '/admin/actualites' },
  { title: 'Événements', description: 'Dates, lieux et affiches.', href: '/admin/evenements' },
  { title: 'Médias', description: 'Images et PDF du site.', href: '/admin/media' },
];

const AdminDashboard: FrontendPage = () => {
  return (
    <div className="flex flex-col gap-6 p-4">
      <Head title="Dashboard" />

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-sm text-gray-500">Section</p>
            <h3 className="text-xl font-semibold text-gray-900">{card.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{card.description}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center text-gray-600">
        Espace de gestion du contenu : utilisez le menu latéral pour accéder aux CRUD.
      </div>
    </div>
  );
};

AdminDashboard.layout = (page) => <AppLayout>{page}</AppLayout>;

export default AdminDashboard;
