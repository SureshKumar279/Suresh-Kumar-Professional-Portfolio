const menu = document.querySelector('#menu-icon');
const navbar = document.querySelector('#navbar');
const navLinks = document.querySelectorAll('.navbar a');

menu?.addEventListener('click', () => {
  navbar.classList.toggle('active');
  const icon = menu.querySelector('i');
  icon.classList.toggle('bx-menu');
  icon.classList.toggle('bx-x');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('active');
    const icon = menu?.querySelector('i');
    icon?.classList.add('bx-menu');
    icon?.classList.remove('bx-x');
  });
});

const typedElement = document.querySelector('.multiple-text');
if (typedElement && window.Typed) {
  new Typed(typedElement, {
    strings: ['Java Applications', 'Spring Boot APIs', 'Full Stack Websites', 'Software Solutions'],
    typeSpeed: 65,
    backSpeed: 40,
    backDelay: 1300,
    loop: true
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
const submitButton = form?.querySelector('button[type="submit"], input[type="submit"]');

form?.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (status) {
    status.textContent = '';
    status.className = 'form-status';
  }

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.dataset.originalText = submitButton.textContent || submitButton.value || '';
    if ('value' in submitButton) submitButton.value = 'Sending...';
    else submitButton.textContent = 'Sending...';
  }

  try {
    await emailjs.sendForm(
      'service_9fkc12i',
      'template_iqpceen',
      form
    );

    if (status) {
      status.textContent = 'Message sent successfully!';
      status.classList.add('success');
    }
    form.reset();
  } catch (error) {
    console.error('EmailJS error:', error);
    if (status) {
      status.textContent = `EmailJS Error: ${error?.text || error?.message || 'Unable to send message. Please try again.'}`;
      status.classList.add('error');
    }
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      const original = submitButton.dataset.originalText || 'Send Message';
      if ('value' in submitButton) submitButton.value = original;
      else submitButton.textContent = original;
    }
  }
});
