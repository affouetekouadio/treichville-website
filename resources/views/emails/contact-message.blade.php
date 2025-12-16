<x-mail::message>
# Nouveau message de contact

Vous avez reçu un nouveau message depuis le formulaire de contact du site de la Mairie de Treichville.

## Informations de l'expéditeur

**Nom :** {{ $contact->nom }}
**Email :** {{ $contact->email }}
@if($contact->telephone)
**Téléphone :** {{ $contact->telephone }}
@endif

**Sujet :** {{ $contact->sujet }}

## Message

{{ $contact->message }}

---

**Date de réception :** {{ $contact->created_at->format('d/m/Y à H:i') }}

Cordialement,<br>
Système de messagerie - Mairie de Treichville
</x-mail::message>
