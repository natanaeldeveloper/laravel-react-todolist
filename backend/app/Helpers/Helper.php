<?php

namespace App\Helpers;

class Helper
{
    /**
     * @param string $userAgent
     * @return string
     */
    public static function formatUserAgent($userAgent)
    {
        $so = '';
        $browser = '';

        if (preg_match('/linux/i', $userAgent)) {
            $so = 'Linux';
        } else if (preg_match('/windows|win32/i', $userAgent)) {
            $so = 'Windows';
        } else if (preg_match('/macintosh|mac os x/i', $userAgent)) {
            $so = 'Mac';
        }

        if (preg_match('/MSIE/i', $userAgent) && !preg_match('/Opera/i', $userAgent)) {
            $browser = "MSIE";
        } elseif (preg_match('/Firefox/i', $userAgent)) {
            $browser = "Firefox";
        } elseif (preg_match('/Chrome/i', $userAgent)) {
            $browser = "Chrome";
        } elseif (preg_match('/Safari/i', $userAgent)) {
            $browser = "Safari";
        } elseif (preg_match('/Opera/i', $userAgent)) {
            $browser = "Opera";
        } elseif (preg_match('/Netscape/i', $userAgent)) {
            $browser = "Netscape";
        }

        if ($so && $browser) {
            return $so . '/' . $browser;
        }

        return $userAgent;
    }
}
