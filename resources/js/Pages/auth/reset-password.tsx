import { update } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';

interface ResetPasswordProps {
    token: string;
    email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    return (
        <AuthLayout
            title="Réinitialiser le mot de passe"
            description="Veuillez entrer votre nouveau mot de passe"
        >
            <Head title="Réinitialiser le mot de passe" />

            <Form
                {...update.form()}
                transform={(data) => ({ ...data, token, email })}
                resetOnSuccess={['password', 'password_confirmation']}
            >
                {({ processing, errors }) => (
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-gray-700 font-semibold">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={email}
                                className="mt-1 block w-full bg-gray-100 border-gray-300"
                                readOnly
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password" className="text-gray-700 font-semibold">Nouveau mot de passe</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                autoComplete="new-password"
                                className="mt-1 block w-full border-gray-300 focus:border-[#03800a] focus:ring-[#03800a]"
                                autoFocus
                                placeholder="Entrez votre nouveau mot de passe"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation" className="text-gray-700 font-semibold">
                                Confirmer le mot de passe
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                autoComplete="new-password"
                                className="mt-1 block w-full border-gray-300 focus:border-[#03800a] focus:ring-[#03800a]"
                                placeholder="Confirmez votre nouveau mot de passe"
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="mt-4 w-full bg-gradient-to-r from-[#03800a] to-[#03800a] hover:from-[#03800a]/90 hover:to-[#03800a] text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                            disabled={processing}
                            data-test="reset-password-button"
                        >
                            {processing && <Spinner />}
                            Réinitialiser le mot de passe
                        </Button>
                    </div>
                )}
            </Form>
        </AuthLayout>
    );
}
