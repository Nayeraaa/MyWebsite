// Contact Form Handler
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form values
      const name = contactForm.querySelector('input[placeholder="Your Name"]')?.value || '';
      const email = contactForm.querySelector('input[placeholder="Your Email"]')?.value || '';
      const message = contactForm.querySelector('textarea[placeholder="Your Message"]')?.value || '';
      
      // Basic validation
      if (!name.trim() || !email.trim() || !message.trim()) {
        alert('Please fill in all fields');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Get submit button
      const submitBtn = contactForm.querySelector('.btn-send');
      const originalText = submitBtn.textContent;
      
      try {
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Option 1: Send via FormSubmit.co (free service, no backend needed)
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);
        
        const response = await fetch('https://formsubmit.co/ajax/alnayer.eee@gmail.com', {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          submitBtn.textContent = '✓ Message Sent!';
          contactForm.reset();
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, 3000);
        } else {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        submitBtn.textContent = '✗ Error Sending';
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 2000);
        
        // Fallback: Open email client
        window.location.href = `mailto:alnayer.eee@gmail.com?subject=Contact from ${name}&body=${encodeURIComponent(message)}%0A%0AFrom: ${email}`;
      }
    });
  }
});
