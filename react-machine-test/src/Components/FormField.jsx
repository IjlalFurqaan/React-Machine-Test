import { useState } from "react";
import "../App.css";

const FormField = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    street1: "",
    street2: "",
    sameAsResidential: false,
    permanentStreet1: "",
    permanentStreet2: "",
    additionalFiles: [{ name: "", type: "" }],
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState([]);
  const [submitted, setSubmitted] = useState(false);

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

  const handleAdditionalFileChange = (e, index) => {
    const { name, value } = e.target;
    const updatedAdditionalFiles = [...formData.additionalFiles];
    updatedAdditionalFiles[index] = {
      ...updatedAdditionalFiles[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      additionalFiles: updatedAdditionalFiles,
    });
  };

  const handleAddMoreFiles = () => {
    setFormData({
      ...formData,
      additionalFiles: [...formData.additionalFiles, { name: "", type: "" }],
    });
  };

  const handleDeleteFile = (index) => {
    const updatedAdditionalFiles = [...formData.additionalFiles];
    updatedAdditionalFiles.splice(index, 1);
    setFormData({
      ...formData,
      additionalFiles: updatedAdditionalFiles,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setSubmittedData([...submittedData, formData]);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        birthDate: "",
        street1: "",
        street2: "",
        sameAsResidential: false,
        permanentStreet1: "",
        permanentStreet2: "",
        additionalFiles: [{ name: "", type: "" }],
      });
      setSubmitted(true);
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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-section row names">
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="Enter your first name"
              onChange={handleChange}
            />
            {errors.firstName && <div className="error">{errors.firstName}</div>}
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
            {errors.lastName && <div className="error">{errors.lastName}</div>}
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
        <label>Residential Address:</label>
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
        <div className="form-section row">
          <input
            type="checkbox"
            name="sameAsResidential"
            onChange={handleCheckboxChange}
            checked={formData.sameAsResidential}
          />
          <label style={{ margin: "0" }}>Same as Residential</label>
          {errors.sameAsResidential && (
            <div className="error">{errors.sameAsResidential}</div>
          )}
        </div>
        <label>Permanent Address:</label>
        <div className="form-section row">
          <div>
            <label>Street 1:</label>
            <input
              type="text"
              name="permanentStreet1"
              value={
                formData.sameAsResidential
                  ? formData.street1
                  : formData.permanentStreet1


              }
              placeholder="Enter street 1"
              onChange={handleChange}
              disabled={formData.sameAsResidential}
            />
          </div>
          <div>
            <label>Street 2:</label>
            <input
              type="text"
              name="permanentStreet2"
              value={
                formData.sameAsResidential
                  ? formData.street2
                  : formData.permanentStreet2
              }
              placeholder="Enter street 2"
              onChange={handleChange}
              disabled={formData.sameAsResidential}
            />
          </div>
        </div>
        <div className="form-section row">
          <div className="upload-section">
            <label>Upload Documents:</label>
            <div className="file-inputs">
              {/* Initial set of additional file inputs */}
              {formData.additionalFiles.map((file, index) => (
                <div key={index} className="form-section row">
                  <div>
                    <label>File Name:</label>
                    <input
                      type="text"
                      name={`fileName${index}`}
                      value={file.name || ""}
                      placeholder="Enter file name"
                      onChange={(e) => handleAdditionalFileChange(e, index)}
                    />
                  </div>
                  <div>
                    <label>Type of File:</label>
                    <input
                      type="text"
                      name={`fileType${index}`}
                      value={file.type || ""}
                      placeholder="Enter type of file"
                      onChange={(e) => handleAdditionalFileChange(e, index)}
                    />
                  </div>
                  <div>
                    <label className="upload-btn">
                      <input
                        type="file"
                        name={`fileUpload${index}`}
                        onChange={(e) => handleAdditionalFileChange(e, index)}
                      />
                      <span className="upload-placeholder">
                        <i className="fas fa-cloud-upload-alt"></i> Upload File
                      </span>
                    </label>
                  </div>
                  {/* Show delete button only for dynamically added additional file inputs */}
                  {index > 0 && (
                    <div className="delete-btn">
                      <button type="button" onClick={() => handleDeleteFile(index)}>
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {/* Button to add more file inputs */}
              <div>
                <button type="button" onClick={handleAddMoreFiles}>+</button>
              </div>
            </div>
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
      {/* Display submitted records in a table */}
      {submitted && (
        <table className="submitted-data">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Birth Date</th>
              <th>Street 1</th>
              <th>Street 2</th>
              <th>Permanent Street 1</th>
              <th>Permanent Street 2</th>
              {/* Add more table headers for additional fields if needed */}
            </tr>
          </thead>
          <tbody>
            {submittedData.map((data, index) => (
              <tr key={index}>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.email}</td>
                <td>{data.birthDate}</td>
                <td>{data.street1}</td>
                <td>{data.street2}</td>
                <td>{data.sameAsResidential ? data.street1 : data.permanentStreet1}</td>
                <td>{data.sameAsResidential ? data.street2 : data.permanentStreet2}</td>
                {/* Render more table cells for additional fields if needed */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FormField;
