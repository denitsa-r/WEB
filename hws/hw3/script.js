document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const successDiv = document.getElementById("success");
  const formErrorDiv = document.getElementById("form-error");

  const validators = {
    username: (value) => {
      if (!value.trim()) return "Username is required";
      if (value.length < 3 || value.length > 10) {
        return "Username must be between 3 and 10 characters";
      }
      return "";
    },
    name: (value) => {
      if (!value.trim()) return "First name is required";
      if (value.length > 50) {
        return "Name must not exceed 50 characters";
      }
      return "";
    },
    "family-name": (value) => {
      if (!value.trim()) return "Last name is required";
      if (value.length > 50) {
        return "Family name must not exceed 50 characters";
      }
      return "";
    },
    email: (value) => {
      if (!value.trim()) return "Email is required";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address";
      }
      return "";
    },
    password: (value) => {
      if (!value.trim()) return "Password is required";
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,10}$/;
      if (!passwordRegex.test(value)) {
        return "Password must be 6-10 characters and include uppercase, lowercase letters and numbers";
      }
      return "";
    },
    "postal-code": (value) => {
      if (!value) return ""; // Optional field
      const postalRegex = /^(\d{5}-\d{4}|\d{4})$/;
      if (!postalRegex.test(value)) {
        return "Postal code must be in format 11111-1111 or 1111";
      }
      return "";
    },
  };

  const showError = (fieldId, message) => {
    const errorDiv = document.getElementById(`${fieldId}-error`);
    if (errorDiv) {
      errorDiv.textContent = message;
    }
  };

  const clearErrors = () => {
    document.querySelectorAll(".error").forEach((error) => {
      error.textContent = "";
    });
    formErrorDiv.textContent = "";
    successDiv.textContent = "";
  };

  const validateForm = () => {
    let isValid = true;
    clearErrors();

    for (const [fieldId, validator] of Object.entries(validators)) {
      const field = document.getElementById(fieldId);
      if (field) {
        const error = validator(field.value);
        if (error) {
          showError(fieldId, error);
          isValid = false;
        }
      }
    }

    return isValid;
  };

  const checkExistingUser = async (username) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = await response.json();
      return users.some((user) => user.username === username);
    } catch (error) {
      console.error("Error checking existing user:", error);
      return false;
    }
  };

  const registerUser = async (formData) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const username = document.getElementById("username").value;
    const userExists = await checkExistingUser(username);

    if (userExists) {
      showError("username", "Username already exists");
      return;
    }

    const formData = {
      username: username,
      name: document.getElementById("name").value,
      familyName: document.getElementById("family-name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      address: {
        street: document.getElementById("street").value,
        city: document.getElementById("city").value,
        postalCode: document.getElementById("postal-code").value,
      },
    };

    try {
      await registerUser(formData);
      successDiv.textContent =
        "Registration successful! Welcome to our platform.";
      form.reset();
    } catch (error) {
      formErrorDiv.textContent = "Registration failed. Please try again later.";
    }
  });

  // Clear individual errors on input
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => {
      const errorDiv = document.getElementById(`${input.id}-error`);
      if (errorDiv) errorDiv.textContent = "";
      formErrorDiv.textContent = "";
      successDiv.textContent = "";
    });
  });
});
