// Components
import { login } from '@/routes';
import { email } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <AuthLayout
            title="Mot de passe oublié"
            description="Entrez votre email pour recevoir un lien de réinitialisation"
        >
            <Head title="Mot de passe oublié" />

            {status && (
                <div className="mb-4 text-center text-sm font-medium bg-green-50 text-green-700 p-4 rounded-xl border border-green-200">
                    {status}
                </div>
            )}

            <div className="space-y-6">
                <Form {...email.form()}>
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-gray-700 font-semibold">Adresse email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="votre@email.com"
                                    className="border-gray-300 focus:border-[#03800a] focus:ring-[#03800a]"
                                />

                                <InputError message={errors.email} />
                            </div>

                            <div className="my-6 flex items-center justify-start">
                                <Button
                                    className="w-full bg-gradient-to-r from-[#03800a] to-[#03800a] hover:from-[#03800a]/90 hover:to-[#03800a] text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                    disabled={processing}
                                    data-test="email-password-reset-link-button"
                                >
                                    {processing && (
                                        <LoaderCircle className="h-4 w-4 animate-spin" />
                                    )}
                                    Envoyer le lien de réinitialisation
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                <div className="space-x-1 text-center text-sm text-gray-600">
                    <span>Ou, retourner à la</span>
                    <TextLink href={login()} className="text-[#03800a] hover:text-[#f8812f] font-semibold">connexion</TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
