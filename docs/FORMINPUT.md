1. src\components\forms\CompanyForm.tsx
@normalize website

1. if (!raw) return ""      -> If the input is undefined, null, or an empty string, return an empty string.

2. let s = String(raw).trim();
    - what ever comes to the function will be converted to a string.
    - remove leading/trailing spaces        google.com " → "google.com".

3. if (s === "") return "";         ->  Allow blank input

4. s = s.replace(/\.+$/, "");
    - Strip trailing dots/spaces    "aenigm3labs.com." → "aenigm3labs.com"

5. if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
    - Add protocol if missing       "aenigm3labs.com" → "https://aenigm3labs.com".

6. const u = new URL(s);
   u.hostname = u.hostname.toLowerCase();
   return u.toString();
    - proper URL object.        "AENIGM3LABS.COM" → "aenigm3labs.com"
