<x-mail::message>
<div style="text-align:center; margin-bottom: 16px;">
  <a href="{{ config('app.url') }}" style="display:inline-block;">
    <img
      src="{{ asset('logo.png') }}"
      alt="Mairie de Treichville"
      style="height: 64px; width: auto;"
    >
  </a>
</div>

# Nouveau message de contact

Vous avez reçu un nouveau message depuis le formulaire de contact du site de la Mairie de Treichville.

<x-mail::panel>
<strong>Informations de l'expéditeur</strong><br>
Nom : {{ $contact->nom }}<br>
Email : {{ $contact->email }}<br>
@if($contact->telephone)
Téléphone : {{ $contact->telephone }}<br>
@endif
Sujet : {{ $contact->sujet }}
</x-mail::panel>

<x-mail::panel>
<strong>Message</strong><br>
{{ $contact->message }}
</x-mail::panel>

<x-mail::panel>
<strong>Date de réception :</strong> {{ $contact->created_at->format('d/m/Y à H:i') }}
</x-mail::panel>

<x-mail::button :url="config('app.url')">
Visiter le site de la Mairie
</x-mail::button>

<div style="text-align:center; font-size: 12px; color: #6b7280; margin-top: 8px;">
  {{ config('app.url') }}
</div>

Cordialement,<br>
Système de messagerie - Mairie de Treichville
</x-mail::message>
