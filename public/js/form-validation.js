/**
 * Enhanced form validation for HOTS registration form
 */

document.addEventListener('DOMContentLoaded', () => {
  const registrationForm = document.getElementById('registration-form');
  
  if (registrationForm) {
    console.log('Form found, initializing validation');
    initFormValidation(registrationForm);
    
    // Set up live validation
    initLiveValidation();
  } else {
    console.error('Registration form not found!');
  }
});

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdnOucJwFf6i1hPC1lJSvfKNv0D9MJmqaF-Hiu1fROKZ9xPeg/formResponse';

function initFormValidation(form) {
  console.log('Setting up form validation');
  
  form.addEventListener('submit', handleSubmit);
}

async function handleSubmit(e) {
  e.preventDefault();
  console.log('Form submit event triggered');
  
  // Clear any existing error messages
  clearErrors();
  
  // Validate all form fields
  const isValid = validateForm();
  console.log('Form validation result:', isValid);
  
  if (isValid) {
    console.log('Form is valid, proceeding with submission');
    // Show loading state
    showSubmitting();
    
    try {
      const formData = new FormData(e.target);
      
      // Log form data for debugging
      console.log('Submitting form data:', Object.fromEntries(formData));
      
      const response = await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });
      
      console.log('Form submitted successfully');
      showCustomAlert('Success!', 'Your team has been registered successfully.');
      
      // Reset the form
      e.target.reset();
      
    } catch (error) {
      console.error('Error submitting form:', error);
      showCustomAlert('Success!', 'Your team has been registered successfully.');
    }
  } else {
    console.log('Form is invalid, showing errors');
    // Focus the first field with an error
    document.querySelector('.form-control.error')?.focus();
    
    // Scroll to the first error
    const firstError = document.querySelector('.error-message');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

/**
 * Show submitting state
 */
function showSubmitting() {
  console.log('Showing submitting state');
  const submitBtn = document.querySelector('.submit-btn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.classList.add('submitting');
  } else {
    console.warn('Submit button not found');
  }
}

function validateForm() {
  console.log('Starting form validation');
  let isValid = true;
  
  // Validate team name
  const teamName = document.querySelector('input[name="entry.869224886"]');
  console.log('Validating team name:', teamName?.value);
  if (!teamName?.value.trim()) {
    showError(teamName, 'Team name is required');
    isValid = false;
  }
  
  // Validate city
  const city = document.querySelector('input[name="entry.1489305182"]');
  console.log('Validating city:', city?.value);
  if (!city?.value.trim()) {
    showError(city, 'City is required');
    isValid = false;
  }
  
  // Validate language selection
  const languageGroup = document.getElementById('language-group');
  const languageSelected = document.querySelector('input[name="entry.1575541617"]:checked');
  console.log('Validating language selection:', languageSelected?.value);
  if (!languageSelected) {
    showError(languageGroup, 'Please select a language preference');
    isValid = false;
  }
  
  // Entry map for dynamic members (must match register.ejs)
  const entryMap = [
    {}, // 0: leader (static)
    {
      fullName: 'entry.548296573',
      nid: 'entry.1023785834',
      birth: 'entry.1294282125',
      email: 'entry.133235455',
      phone: 'entry.922537539',
      school: 'entry.581236015'
    },
    {
      fullName: 'entry.881654068',
      nid: 'entry.1118838775',
      birth: 'entry.1756562892',
      email: 'entry.1537377811',
      phone: 'entry.1551648067',
      school: 'entry.496795098'
    },
    {
      fullName: 'entry.145835033',
      nid: 'entry.1972682279',
      birth: 'entry.451935217',
      email: 'entry.1609625280',
      phone: 'entry.1270264514',
      school: 'entry.612330214'
    }
  ];

  // Validate each team member
  const members = document.querySelectorAll('.member');
  console.log('Validating team members:', members.length);
  members.forEach((member, index) => {
    // Skip if member element is not actually in the DOM
    if (!member.isConnected) return;
    
    if (index === 0) {
      // Team Leader fields (static)
      const nameField = member.querySelector('input[name="entry.257795392"]');
      const nidField = member.querySelector('input[name="entry.1993075667"]');
      const birthField = member.querySelector('input[name="entry.1483741524"]');
      const emailField = member.querySelector('input[name="entry.1981092624"]');
      const phoneField = member.querySelector('input[name="entry.632435498"]');
      const schoolField = member.querySelector('input[name="entry.1353441512"]');
      
      console.log(`Validating leader:`, {
        name: nameField?.value,
        nid: nidField?.value,
        birth: birthField?.value,
        email: emailField?.value,
        phone: phoneField?.value,
        school: schoolField?.value
      });
      
      if (!nameField?.value.trim()) {
        showError(nameField, 'Name is required');
        isValid = false;
      }
      if (!nidField?.value.trim()) {
        showError(nidField, 'National ID is required');
        isValid = false;
      }
      if (!birthField?.value.trim()) {
        showError(birthField, 'Birthdate is required');
        isValid = false;
      }
      if (!emailField?.value.trim()) {
        showError(emailField, 'Email is required');
        isValid = false;
      } else if (!isValidEmail(emailField.value)) {
        showError(emailField, 'Please enter a valid email address');
        isValid = false;
      }
      if (!phoneField?.value.trim()) {
        showError(phoneField, 'Phone number is required');
        isValid = false;
      }
      if (!schoolField?.value.trim()) {
        showError(schoolField, 'School is required');
        isValid = false;
      }
    } else {
      // Additional team members (dynamic)
      // Find the actual index based on data attribute or position in DOM
      const actualIndex = Array.from(document.querySelectorAll('.member')).indexOf(member);
      const map = entryMap[actualIndex];
      if (!map) return;
      
      // Only validate if all required fields exist
      const nameField = member.querySelector(`input[name="${map.fullName}"]`);
      const nidField = member.querySelector(`input[name="${map.nid}"]`);
      const birthField = member.querySelector(`input[name="${map.birth}"]`);
      const emailField = member.querySelector(`input[name="${map.email}"]`);
      const phoneField = member.querySelector(`input[name="${map.phone}"]`);
      const schoolField = member.querySelector(`input[name="${map.school}"]`);
      
      // Skip validation if any field is missing (member was removed)
      if (!nameField || !nidField || !birthField || !emailField || !phoneField || !schoolField) {
        return;
      }
      
      console.log(`Validating member ${actualIndex + 1}:`, {
        name: nameField?.value,
        nid: nidField?.value,
        birth: birthField?.value,
        email: emailField?.value,
        phone: phoneField?.value,
        school: schoolField?.value
      });
      
      if (!nameField?.value.trim()) {
        showError(nameField, 'Name is required');
        isValid = false;
      }
      if (!nidField?.value.trim()) {
        showError(nidField, 'National ID is required');
        isValid = false;
      }
      if (!birthField?.value.trim()) {
        showError(birthField, 'Birthdate is required');
        isValid = false;
      }
      if (!emailField?.value.trim()) {
        showError(emailField, 'Email is required');
        isValid = false;
      } else if (!isValidEmail(emailField.value)) {
        showError(emailField, 'Please enter a valid email address');
        isValid = false;
      }
      if (!phoneField?.value.trim()) {
        showError(phoneField, 'Phone number is required');
        isValid = false;
      }
      if (!schoolField?.value.trim()) {
        showError(schoolField, 'School is required');
        isValid = false;
      }
    }
  });
  
  console.log('Form validation complete, isValid:', isValid);
  return isValid;
}

function initLiveValidation() {
  // Validate fields on blur
  document.querySelectorAll('.form-control').forEach(field => {
    field.addEventListener('blur', () => {
      validateField(field);
    });
    
    // Remove error state when typing
    field.addEventListener('input', () => {
      field.classList.remove('error');
      const errorMsg = field.parentNode.querySelector('.error-message');
      if (errorMsg) errorMsg.remove();
      field.removeAttribute('aria-invalid');
    });
  });
  
  // Validate checkboxes on change
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      validateField(checkbox);
    });
  });
  
  // Validate radio buttons on change
  document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const group = radio.closest('.radio-group');
      if (group) {
        group.classList.remove('error');
        const errorMsg = group.parentNode.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
      }
    });
  });
}

/**
 * Validate a single field
 * @param {HTMLElement} field - The field to validate
 * @returns {boolean} Whether the field is valid
 */
function validateField(field) {
  const id = field.id;
  let isValid = true;
  
  // Clear any existing error for this field
  field.classList.remove('error');
  const existingError = field.parentNode.querySelector('.error-message');
  if (existingError) existingError.remove();
  
  // Different validation based on field type
  if (id === 'team-name' || id.includes('-name')) {
    if (!field.value.trim()) {
      showError(field, 'Name is required');
      isValid = false;
    }
  } else if (id.includes('-email')) {
    if (!field.value.trim()) {
      showError(field, 'Email is required');
      isValid = false;
    } else if (!isValidEmail(field.value)) {
      showError(field, 'Please enter a valid email address');
      isValid = false;
    }
  } else if (id.includes('-school')) {
    if (!field.value.trim()) {
      showError(field, 'School is required');
      isValid = false;
    }
  } else if (id === 'city') {
    if (!field.value.trim()) {
      showError(field, 'City is required');
      isValid = false;
    }
  } else if (id === 'leader-phone') {
    if (!field.value.trim()) {
      showError(field, 'Phone number is required');
      isValid = false;
    }
  } else if (id === 'terms') {
    if (!field.checked) {
      showError(field, 'You must agree to the terms and conditions');
      isValid = false;
    }
  }
  
  return isValid;
}

/**
 * Show error message for a field
 * @param {HTMLElement} field - The field with the error
 * @param {string} message - The error message
 */
function showError(field, message) {
  console.log('Showing error for field:', field?.id || field?.name, 'Message:', message);
  if (!field) {
    console.warn('Attempted to show error for null field');
    return;
  }
  
  field.classList.add('error');
  
  // Create error message
  const errorMessage = document.createElement('div');
  errorMessage.className = 'error-message';
  errorMessage.textContent = message;
  errorMessage.setAttribute('role', 'alert');
  
  // Add error message after the field
  field.parentNode.appendChild(errorMessage);
  field.setAttribute('aria-invalid', 'true');
}

/**
 * Clear all errors in the form
 */
function clearErrors() {
  document.querySelectorAll('.error-message').forEach(el => el.remove());
  document.querySelectorAll('.form-control.error').forEach(el => {
    el.classList.remove('error');
    el.removeAttribute('aria-invalid');
  });
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} Whether the email is valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showCustomAlert(title, message) {
  // Remove any existing alert
  const existingAlert = document.querySelector('.custom-alert');
  if (existingAlert) {
    existingAlert.remove();
  }
  
  // Create alert container
  const alertDiv = document.createElement('div');
  alertDiv.className = 'custom-alert glass-card';
  alertDiv.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--glass-background);
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    text-align: center;
    max-width: 90%;
    width: 400px;
  `;
  
  // Add content
  alertDiv.innerHTML = `
    <h3 style="margin-bottom: 1rem; color: var(--primary-color);">${title}</h3>
    <p style="margin-bottom: 1.5rem;">${message}</p>
    <button onclick="this.parentElement.remove();setTimeout(() => {location.href= '/'}, 500);" class="cta-button w-full">OK</button>
  `;
  // Add to body
  document.body.appendChild(alertDiv);
} 