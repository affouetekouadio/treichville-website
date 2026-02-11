<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Mail\ContactMessageMail;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    /**
     * Enregistre un nouveau message de contact et envoie un email
     */
    public function store(Request $request)
    {
        $honeypot = (string) $request->input('website', '');
        $submittedAt = (int) $request->input('hp_time', 0);
        $nowMs = (int) round(microtime(true) * 1000);
        $minElapsedMs = 3000;

        if ($honeypot !== '' || ($submittedAt > 0 && ($nowMs - $submittedAt) < $minElapsedMs)) {
            return back()
                ->withErrors(['spam' => 'Votre message n’a pas pu être envoyé.'])
                ->withInput()
                ->setStatusCode(422);
        }

        // Validation des données
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telephone' => 'nullable|string|max:20',
            'sujet' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
            'website' => 'nullable|string|max:255',
            'hp_time' => 'nullable|integer',
        ], [
            'nom.required' => 'Le nom est requis',
            'email.required' => 'L\'email est requis',
            'email.email' => 'L\'email doit être valide',
            'sujet.required' => 'Le sujet est requis',
            'message.required' => 'Le message est requis',
            'message.max' => 'Le message ne doit pas dépasser 5000 caractères',
        ]);

        if ($validator->fails()) {
            return back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            // Créer le contact dans la base de données
            $contact = Contact::create([
                'nom' => $request->nom,
                'email' => $request->email,
                'telephone' => $request->telephone,
                'sujet' => $request->sujet,
                'message' => $request->message,
            ]);

            // Envoyer l'email à l'administration
            $adminEmail = config('mail.admin_email', 'affouetekouadio@gmail.com');
            Mail::to($adminEmail)->send(new ContactMessageMail($contact));

            return back()->with('success', 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.');
        } catch (\Exception $e) {
            \Log::error('Erreur lors de l\'envoi du message de contact: ' . $e->getMessage());

            return back()
                ->with('error', 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.')
                ->withInput();
        }
    }
}
