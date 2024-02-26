import  { useState } from "react";
import "../App.css";

const FormField = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    street1: "",
    street2: "",
  });

  const [errors, setErrors] = useState({});

  const isValidEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const isValidDate = (dateString) => {
    const birthDate = new Date(dateString);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age >= 18;
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.birthDate) {
      newErrors.birthDate = "Date of birth is required";
    } else if (!isValidDate(formData.birthDate)) {
      newErrors.birthDate = "You must be at least 18 years old";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  console.log(errors);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (isValid) {
      console.log("Form Submitted", formData);
    } else {
      console.log("Form Validation Failed");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
    <div className="form-section row">
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          placeholder="Enter your first name"
          onChange={handleChange}
        />
        {errors.firstName && (
          <div className="error">{errors.firstName}</div>
        )}
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          placeholder="Enter your last name"
          onChange={handleChange}
        />
        {errors.lastName && (
          <div className="error">{errors.lastName}</div>
        )}
      </div>
    </div>
    <div className="form-section row">
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter your email"
          onChange={handleChange}
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
        />
        {errors.birthDate && <div className="error">{errors.birthDate}</div>}
      </div>
    </div>
    <div className="form-section row">
      <div>
        <label>Street 1:</label>
        <input
          type="text"
          name="street1"
          value={formData.street1}
          placeholder="Enter street 1"
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Street 2:</label>
        <input
          type="text"
          name="street2"
          value={formData.street2}
          placeholder="Enter street 2"
          onChange={handleChange}
        />
      </div>
    </div>
    <button type="submit">Submit</button>
  </form>
  


  

  );
};

export default FormField;
