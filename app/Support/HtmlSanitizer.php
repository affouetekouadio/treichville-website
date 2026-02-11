<?php

namespace App\Support;

class HtmlSanitizer
{
    private const ALLOWED_TAGS = [
        'p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'blockquote',
        'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img',
    ];

    private const GLOBAL_ATTRS = ['class'];

    private const ALLOWED_ATTRS = [
        'a' => ['href', 'title', 'target', 'rel'],
        'img' => ['src', 'alt', 'title', 'width', 'height'],
    ];

    private const ALLOWED_URI_SCHEMES = ['http', 'https', 'mailto', 'tel'];

    public static function clean(?string $html): ?string
    {
        if ($html === null || trim($html) === '') {
            return $html;
        }

        $dom = new \DOMDocument();
        $previous = libxml_use_internal_errors(true);
        $wrapped = '<div>'.$html.'</div>';
        $dom->loadHTML('<?xml encoding="UTF-8">'.$wrapped, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        libxml_clear_errors();
        libxml_use_internal_errors($previous);

        $root = $dom->getElementsByTagName('div')->item(0);
        if (! $root) {
            return strip_tags($html);
        }

        self::sanitizeNode($root);

        return self::innerHtml($root);
    }

    private static function sanitizeNode(\DOMNode $node): void
    {
        if ($node->nodeType === XML_ELEMENT_NODE) {
            $tag = strtolower($node->nodeName);

            if (!in_array($tag, self::ALLOWED_TAGS, true)) {
                if (in_array($tag, ['script', 'style'], true)) {
                    $node->parentNode?->removeChild($node);
                    return;
                }

                self::unwrapNode($node);
                return;
            }

            self::sanitizeAttributes($node, $tag);
        }

        $children = [];
        foreach ($node->childNodes as $child) {
            $children[] = $child;
        }

        foreach ($children as $child) {
            self::sanitizeNode($child);
        }
    }

    private static function sanitizeAttributes(\DOMNode $node, string $tag): void
    {
        if (! $node->hasAttributes()) {
            return;
        }

        $allowed = array_merge(self::GLOBAL_ATTRS, self::ALLOWED_ATTRS[$tag] ?? []);

        $attrs = [];
        foreach ($node->attributes as $attr) {
            $attrs[] = $attr->name;
        }

        foreach ($attrs as $name) {
            $value = $node->attributes->getNamedItem($name)?->value ?? '';
            $lower = strtolower($name);

            if (str_starts_with($lower, 'on') || $lower === 'style' || !in_array($lower, $allowed, true)) {
                $node->removeAttribute($name);
                continue;
            }

            if (in_array($lower, ['href', 'src'], true) && !self::isSafeUrl($value)) {
                $node->removeAttribute($name);
                continue;
            }

            if ($tag === 'a' && $lower === 'target' && strtolower($value) === '_blank') {
                $rel = $node->attributes->getNamedItem('rel')?->value ?? '';
                if (!str_contains($rel, 'noopener')) {
                    $rel = trim($rel.' noopener');
                }
                if (!str_contains($rel, 'noreferrer')) {
                    $rel = trim($rel.' noreferrer');
                }
                $node->setAttribute('rel', trim($rel));
            }
        }
    }

    private static function isSafeUrl(string $value): bool
    {
        $value = trim($value);
        if ($value === '') {
            return false;
        }

        $parsed = parse_url($value);
        if ($parsed === false) {
            return false;
        }

        if (!isset($parsed['scheme'])) {
            return true;
        }

        return in_array(strtolower($parsed['scheme']), self::ALLOWED_URI_SCHEMES, true);
    }

    private static function unwrapNode(\DOMNode $node): void
    {
        $parent = $node->parentNode;
        if (! $parent) {
            return;
        }

        while ($node->firstChild) {
            $parent->insertBefore($node->firstChild, $node);
        }

        $parent->removeChild($node);
    }

    private static function innerHtml(\DOMNode $node): string
    {
        $html = '';
        foreach ($node->childNodes as $child) {
            $html .= $node->ownerDocument->saveHTML($child);
        }
        return $html;
    }
}
