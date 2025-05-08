/**
 * Enhanced form validation for HOTS registration form
 */

document.addEventListener('DOMContentLoaded', () => {
  const registrationForm = document.getElementById('registration-form');
  
  if (registrationForm) {
    // Set up form validation
    initFormValidation(registrationForm);
    
    // Set up live validation
    initLiveValidation();
  }
});

/**
 * Initialize form validation
 * @param {HTMLFormElement} form - The form element
 */
function initFormValidation(form) {
  form.addEventListener('submit', (e) => {
    // Prevent default form submission
    e.preventDefault();
    
    // Clear any existing error messages
    clearErrors();
    
    // Validate all form fields
    const isValid = validateForm();
    
    if (isValid) {
      // Show loading state
      showSubmitting();
      
      // Normally would submit via AJAX, but for this example we'll just redirect
      setTimeout(() => {
        window.location.href = '/success';
      }, 1500);
    } else {
      // Focus the first field with an error
      document.querySelector('.form-control.error')?.focus();
      
      // Scroll to the first error
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
}

/**
 * Show submitting state
 */
function showSubmitting() {
  const submitBtn = document.querySelector('.submit-btn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.classList.add('submitting');
  }
}

/**
 * Validate the entire form
 * @returns {boolean} Whether the form is valid
 */
function validateForm() {
  let isValid = true;
  
  // Validate team name
  const teamName = document.getElementById('team-name');
  if (!teamName.value.trim()) {
    showError(teamName, 'Team name is required');
    isValid = false;
  }
  
  // Validate city
  const city = document.getElementById('city');
  if (!city.value.trim()) {
    showError(city, 'City is required');
    isValid = false;
  }
  
  // Validate language selection
  const languageGroup = document.getElementById('language-group');
  const languageSelected = document.querySelector('input[name="language"]:checked');
  if (!languageSelected) {
    showError(languageGroup, 'Please select a language preference');
    isValid = false;
  }
  
  // Validate each team member
  const members = document.querySelectorAll('.member');
  members.forEach((member, index) => {
    const memberNum = index === 0 ? 1 : parseInt(member.querySelector('.remove-member')?.dataset.member) || index + 1;
    
    // Validate name
    const nameField = document.getElementById(`member${memberNum}-name`);
    if (!nameField.value.trim()) {
      showError(nameField, 'Name is required');
      isValid = false;
    }
    
    // Validate email
    const emailField = document.getElementById(`member${memberNum}-email`);
    if (!emailField.value.trim()) {
      showError(emailField, 'Email is required');
      isValid = false;
    } else if (!isValidEmail(emailField.value)) {
      showError(emailField, 'Please enter a valid email address');
      isValid = false;
    }
    
    // Validate school
    const schoolField = document.getElementById(`member${memberNum}-school`);
    if (!schoolField.value.trim()) {
      showError(schoolField, 'School is required');
      isValid = false;
    }
    
    // Validate phone for team leader
    if (index === 0) {
      const phoneField = document.getElementById('leader-phone');
      if (!phoneField.value.trim()) {
        showError(phoneField, 'Phone number is required');
        isValid = false;
      }
    }
  });
  
  // Validate terms checkbox
  const termsCheckbox = document.getElementById('terms');
  if (!termsCheckbox.checked) {
    showError(termsCheckbox, 'You must agree to the terms and conditions');
    isValid = false;
  }
  
  return isValid;
}

/**
 * Initialize live validation
 */
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
  field.classList.add('error');
  
  // Create error message element
  const errorMessage = document.createElement('div');
  errorMessage.className = 'error-message';
  errorMessage.textContent = message;
  errorMessage.setAttribute('role', 'alert');
  
  // Insert error message after the field
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