import React, { useState } from "react";
import axios from "axios";

const ConsultationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    problem: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("address", formData.address);
      data.append("problem", formData.problem);
      if (formData.image) data.append("image", formData.image);

      await axios.post(
        "http://localhost:5000/api/user/submit-consultation",
        data,
        { withCredentials: true }
      );
      alert("Consultation submitted! Admin will be notified.");
      onClose();
    } catch (err) {
      alert("Submission failed");
    }
    setLoading(false);
  };

  return (
    <div className="h-[60vh] w-[50vw] fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-gray-300 rounded-md px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full mt-4 flex flex-col gap-3 animate-fadeIn"
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Your Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="px-3 py-2 border rounded"
        />
        <textarea
          name="problem"
          placeholder="Describe your problem"
          value={formData.problem}
          onChange={handleChange}
          required
          className="px-3 py-2 border rounded h-24 resize-none"
        ></textarea>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="text-sm"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConsultationForm;