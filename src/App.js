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
    // Your existing submit logic
    alert("Form submitted successfully!");
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // Reset custom validation message
    if (id === "email") {
      e.target.setCustomValidity("");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Custom validation for '@' symbol in email
    if (!formData.email.includes("@")) {
      const emailInput = document.getElementById("email");
      const enteredEmail = emailInput.value;
      emailInput.setCustomValidity(`Please include an '@' in the email address. ' ${enteredEmail} ' is missing an '@'.`);
      emailInput.reportValidity(); // Trigger validation message
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      const phoneInput = document.getElementById("phone");
      phoneInput.setCustomValidity("Invalid phone number. Please enter a 10-digit phone number.");
      phoneInput.reportValidity(); 
      return;
    }
  

    // Your existing form submission logic
    handleSubmit();

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

  return (
    <div>
      <h1>User Details Modal</h1>
      <button onClick={handleOpenModal}>Open Form</button>

      {isModalOpen && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
                onChange={handleChange}
                onBlur={(e) => e.target.reportValidity()}
                required
              />
              <br />

              <label htmlFor="email" aria-required="true">
                Email Address:
              </label>
              <br />
              <input
                type="text"
                id="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={(e) => e.target.reportValidity()}
                required
              />
              <br />

              <label htmlFor="phone" aria-required="true">
                Phone Number:
              </label>
              <br />
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={(e) => e.target.reportValidity()}
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
                onChange={handleChange}
                onBlur={(e) => e.target.reportValidity()}
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
