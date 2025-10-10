export async function reCaptchaToken() {
  return new Promise<string | null>((resolve) => {
    grecaptcha.ready(async () => {
      const siteKey = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY;
      if (!siteKey) {
        resolve(null);
        return;
      }
      const token = await grecaptcha.execute(siteKey, {
        action: "signUp",
      });
      resolve(token);
    });
  });
}

type VerifyCaptchaData =
  | {
      success: true;
      challenge_ts: string;
      hostname: string;
      score: number;
      action: string;
    }
  | {
      success: false;
      "error-codes": string[];
    };

export async function verifyCaptchaToken(token: string) {
  const secretCaptchaKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretCaptchaKey) {
    throw new Error("No secret key found.");
  }

  const url = new URL("https://www.google.com/recaptcha/api/siteverify");
  url.searchParams.append("secret", secretCaptchaKey);
  url.searchParams.append("response", token);

  const result = await fetch(url, {
    method: "POST",
  });

  const data: VerifyCaptchaData = await result.json();
  if (!result.ok) return null;

  return data;
}
