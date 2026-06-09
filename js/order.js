// ===== ORDER FORM VALIDATION =====
// No regular expressions used — all manual checks

function showError(fieldId, message) {
  var group = document.getElementById(fieldId).closest('.form-group');
  group.classList.add('has-error');
  group.querySelector('.error-msg').textContent = message;
}

function clearError(fieldId) {
  var el = document.getElementById(fieldId);
  if (!el) return;
  var group = el.closest('.form-group');
  group.classList.remove('has-error');
}

function clearAllErrors() {
  var groups = document.querySelectorAll('.form-group.has-error');
  groups.forEach(function (g) { g.classList.remove('has-error'); });
}

// Validation 1: Required — not empty
function isNotEmpty(value) {
  return value.trim().length > 0;
}

// Validation 2: Min length
function isMinLength(value, min) {
  return value.trim().length >= min;
}

// Validation 3: Valid email — manual check, no regex
function isValidEmail(value) {
  var trimmed = value.trim();
  var atIndex = trimmed.indexOf('@');
  if (atIndex < 1) return false;
  var afterAt = trimmed.slice(atIndex + 1);
  var dotIndex = afterAt.lastIndexOf('.');
  if (dotIndex < 1) return false;
  if (dotIndex >= afterAt.length - 1) return false;
  // No spaces allowed
  if (trimmed.indexOf(' ') !== -1) return false;
  return true;
}

// Validation 4: At least one checkbox checked
function isAnyChecked(name) {
  var checkboxes = document.querySelectorAll('input[name="' + name + '"]:checked');
  return checkboxes.length > 0;
}

// Validation 5: Select not default
function isSelectPicked(fieldId) {
  var el = document.getElementById(fieldId);
  return el.value !== '' && el.value !== 'default';
}

// ===== SUBMIT HANDLER =====
var form = document.getElementById('order-form');
var successMsg = document.getElementById('success-msg');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearAllErrors();

    var valid = true;

    // 1. Name - required
    var name = document.getElementById('name').value;
    if (!isNotEmpty(name)) {
      showError('name', 'Name is required.');
      valid = false;
    } else if (!isMinLength(name, 3)) {
      showError('name', 'Name must be at least 3 characters.');
      valid = false;
    }

    // 2. Email - required + valid format
    var email = document.getElementById('email').value;
    if (!isNotEmpty(email)) {
      showError('email', 'Email is required.');
      valid = false;
    } else if (!isValidEmail(email)) {
      showError('email', 'Please enter a valid email address.');
      valid = false;
    }

    // 3. Service - must select
    if (!isSelectPicked('service')) {
      showError('service', 'Please select a service.');
      valid = false;
    }

    // 4. Payment - required radio
    var paymentPicked = document.querySelector('input[name="payment"]:checked');
    if (!paymentPicked) {
      var payGroup = document.getElementById('payment-group');
      payGroup.classList.add('has-error');
      payGroup.querySelector('.error-msg').textContent = 'Please select a payment method.';
      valid = false;
    }

    // 5. At least one add-on
    if (!isAnyChecked('addon')) {
      var addonGroup = document.getElementById('addon-group');
      addonGroup.classList.add('has-error');
      addonGroup.querySelector('.error-msg').textContent = 'Please select at least one add-on.';
      valid = false;
    }

    if (valid) {
      form.reset();
      successMsg.style.display = 'block';
      window.scrollTo({ top: successMsg.offsetTop - 80, behavior: 'smooth' });
    }
  });

  // Clear errors on input
  var inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(function (input) {
    input.addEventListener('input', function () {
      if (this.id) clearError(this.id);
    });
  });
}
