// Revive Initiative — Contact form via EmailJS
// Setup: create a free account at https://www.emailjs.com/, add an email
// service, and a template whose "To Email" is info@revive-initiative.org.
// Then replace the three placeholders below with your EmailJS IDs.
const EMAILJS_PUBLIC_KEY = 's4eamX62UqFSw0x51';
const EMAILJS_SERVICE_ID = 'service_kld63qe';
const EMAILJS_TEMPLATE_ID = 'template_1khceeh';

document.addEventListener('DOMContentLoaded', () => {
  if (window.emailjs) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  const form = document.getElementById('contact-form');
  const status = document.getElementById('contact-status');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const params = {
      from_name: form.getElementById('name').value,
      reply_to: document.getElementById('email').value,
      message: document.getElementById('message').value,
    };

    console.log('EmailJS params:', params);

    status.classList.remove('hidden', 'text-red-600');
    status.classList.add('text-brand-green');
    status.textContent = 'Sending your message…';

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
      .then(() => {
        status.textContent = 'Thank you — your message has been sent to info@revive-initiative.org.';
        form.reset();
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        status.classList.remove('text-brand-green');
        status.classList.add('text-red-600');
        status.textContent = 'Sorry, something went wrong sending your message. Please email info@revive-initiative.org directly or reach us on WhatsApp.';
      })
      .finally(() => { submitBtn.disabled = false; });
  });
});
