<?php

namespace App\Support\Listing;

use DateTimeInterface;
use Illuminate\Support\Collection;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ListingExporter
{
    /**
     * @param iterable<int, mixed> $rows
     * @param array<string, string> $columns
     */
    public static function stream(string $format, string $filename, iterable $rows, array $columns): StreamedResponse
    {
        return match ($format) {
            'csv' => self::streamCsv($filename, $rows, $columns),
            'xls' => self::streamXls($filename, $rows, $columns),
            default => throw new \InvalidArgumentException('Unsupported export format.'),
        };
    }

    /**
     * @param iterable<int, mixed> $rows
     * @param array<string, string> $columns
     */
    private static function streamCsv(string $filename, iterable $rows, array $columns): StreamedResponse
    {
        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="'.$filename.'.csv"',
        ];

        return response()->streamDownload(function () use ($rows, $columns) {
            $handle = fopen('php://output', 'wb');
            if ($handle === false) {
                return;
            }

            fwrite($handle, "\xEF\xBB\xBF");
            fputcsv($handle, array_values($columns), ';');

            foreach ($rows as $row) {
                fputcsv($handle, self::mapRow($row, $columns), ';');
            }

            fclose($handle);
        }, $filename.'.csv', $headers);
    }

    /**
     * @param iterable<int, mixed> $rows
     * @param array<string, string> $columns
     */
    private static function streamXls(string $filename, iterable $rows, array $columns): StreamedResponse
    {
        $headers = [
            'Content-Type' => 'application/vnd.ms-excel; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="'.$filename.'.xls"',
        ];

        return response()->streamDownload(function () use ($rows, $columns) {
            echo "\xEF\xBB\xBF";
            echo "<table border=\"1\"><thead><tr>";
            foreach ($columns as $label) {
                echo '<th>'.htmlspecialchars($label, ENT_QUOTES, 'UTF-8').'</th>';
            }
            echo "</tr></thead><tbody>";

            foreach ($rows as $row) {
                echo '<tr>';
                foreach (self::mapRow($row, $columns) as $value) {
                    echo '<td>'.htmlspecialchars($value, ENT_QUOTES, 'UTF-8').'</td>';
                }
                echo '</tr>';
            }

            echo '</tbody></table>';
        }, $filename.'.xls', $headers);
    }

    /**
     * @param array<string, string> $columns
     * @return array<int, string>
     */
    private static function mapRow(mixed $row, array $columns): array
    {
        $values = [];
        foreach (array_keys($columns) as $key) {
            $values[] = self::normalizeValue(data_get($row, $key));
        }

        return $values;
    }

    private static function normalizeValue(mixed $value): string
    {
        if ($value instanceof DateTimeInterface) {
            return $value->format('Y-m-d H:i:s');
        }

        if (is_bool($value)) {
            return $value ? 'Oui' : 'Non';
        }

        if ($value === null) {
            return '';
        }

        if (is_array($value)) {
            return json_encode($value, JSON_UNESCAPED_UNICODE) ?: '';
        }

        if ($value instanceof Collection) {
            return $value->toJson(JSON_UNESCAPED_UNICODE) ?: '';
        }

        return (string) $value;
    }
}
