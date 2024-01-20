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

    // Enhanced email validation
    // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    //   alert("Invalid email. Please check your email address.");
    //   return;
    // }

    // Consistent username validation
    // if (/\d/.test(formData.username)) {
    //   alert("Invalid username. Please check your username.");
    //   return;
    // }

    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    const currentDate = new Date();
    const selectedDate = new Date(formData.dob);

    if (selectedDate > currentDate) {
      alert("Invalid date of birth. Date of birth cannot be in the future");
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div>
      <h1>User Details Modal</h1>
      <button onClick={handleOpenModal}>Open Form</button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h1>Fill Details</h1>
            <form>
              <label htmlFor="username">
                Username:
              </label>
              <br />
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
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
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                required/>
              
              <br />

              <label htmlFor="phone" aria-required="true">
                Phone:
              </label>
              <br />
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <br />
              <label htmlFor="dob" >
                Date of Birth:
              </label>
              <br />
              <input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
              <br />

              <button
                type="submit"
                className="submit-button"
                onClick={handleSubmit}
              >
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
