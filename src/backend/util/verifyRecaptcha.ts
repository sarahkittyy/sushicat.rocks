import fetch from 'node-fetch';

export default async function verifyRecaptcha(response: string) {
  const params: any = new URLSearchParams();
  params.append('secret', process.env.RECAPTCHA_SECRET_KEY);
  params.append('response', response);
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'post',
    body: params,
  });
  const json = await res.json();
  return json;
};
