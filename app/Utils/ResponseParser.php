<?php

namespace App\Utils;

class ResponseParser
{
    public static function toArray($response): array
    {
        if (is_string($response)) {
            $decoded = json_decode($response, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                return $decoded;
            }

            return ['raw' => $response];
        } elseif (is_array($response)) {
            return $response;
        } elseif (is_object($response)) {
            return json_decode(json_encode($response), true);
        }

        return ['raw' => (string) $response];
    }
}
