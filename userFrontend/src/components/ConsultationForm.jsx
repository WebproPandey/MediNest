import React, { useState } from "react";

const ConsultationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    problem: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔗 TODO: Connect with backend
    console.log("Consultation Submitted:", formData);
    onClose(); // close the form after submission
  };

  return (
    <div className=" md:h-[60vh] md:w-[50vw] fixed z-[9999] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-gray-300 rounded-md px-4">

    <form
      onSubmit={handleSubmit}
      className="w-full my-4 flex flex-col gap-3 animate-fadeIn"
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
        >
          Submit
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
