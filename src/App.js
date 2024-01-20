import React, { useState } from "react";
import "./App.css"; // Import your CSS file for styling

const XModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    // Data validation
    if (
      !formData.username ||
      !formData.email ||
      !formData.phone ||
      !formData.dob
    ) {
      alert("Please fill out all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Invalid email. Please include '@' in your email address.");
      return;
    }

    // Consistent username validation
    if (/\d/.test(formData.username)) {
      alert("Invalid username. Please check your username.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    const currentDate = new Date();
    const selectedDate = new Date(formData.dob);

    if (selectedDate > currentDate) {
      alert("Invalid date of birth. Please enter a valid date.");
      return;
    }

    // Simulate form submission (adjust as needed)
    alert("Form submitted successfully!");

    // Reset form data
    setFormData({
      username: "",
      email: "",
      phone: "",
      dob: "",
    });

    // Close the modal
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    const form = e.target;

    // Check if email contains '@'
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

    if (form.checkValidity() && isEmailValid) {
      // Your existing form submission logic
      handleSubmit();

      // Reset the form
      form.reset();

      // Close the modal
      setIsModalOpen(false);
    } else {
      // If the form is invalid, trigger validation messages for all fields
      form.reportValidity();
    }
  };

  return (
    <div>
      <h1>User Details Modal</h1>
      <button onClick={handleOpenModal}>Open Form</button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h1>Fill Details</h1>
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="username" required>
                Username:
              </label>
              <br />
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              <br />

              <label htmlFor="email" aria-required="true">
                Email:
              </label>
              <br />
              <input
                type="text"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={() => {
                  const emailInput = document.getElementById("email");
                  const enteredEmail = emailInput.value;
                  if (emailInput && !emailInput.value.includes("@")) {
                    emailInput.setCustomValidity(
                      `Please include  an '@' in the email address.'${enteredEmail}'is missing an '@'`
                    );
                  } else {
                    emailInput.setCustomValidity("");
                  }
                }}
                required
              />
              <br />

              <label htmlFor="phone" required>
                Phone:
              </label>
              <br />
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <br />

              <label htmlFor="dob" required>
                Date of Birth:
              </label>
              <br />
              <input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />
              <br />

              <button type="submit" className="submit-button">
                Submit
              </button>
              <br />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default XModal;
