// QuestionForm.js

import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""], // An array of four empty strings
    correctIndex: 0, // Default to the first answer
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure that the prompt is not empty
    if (!formData.prompt.trim()) {
      alert("Please enter a prompt for the question.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error creating a new question: ${response.status}`);
      }

      const newQuestion = await response.json();
      onAddQuestion(newQuestion);

      // Clear the form after successful submission
      setFormData({
        prompt: "",
        answers: ["", "", "", ""],
        correctIndex: 0,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prompt:
        <input
          type="text"
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
        />
      </label>
      <label>
        Answers:
        <input
          type="text"
          name="answers[0]"
          value={formData.answers[0]}
          onChange={handleChange}
        />
        <input
          type="text"
          name="answers[1]"
          value={formData.answers[1]}
          onChange={handleChange}
        />
        <input
          type="text"
          name="answers[2]"
          value={formData.answers[2]}
          onChange={handleChange}
        />
        <input
          type="text"
          name="answers[3]"
          value={formData.answers[3]}
          onChange={handleChange}
        />
      </label>
      <label>
        Correct Answer Index:
        <select
          name="correctIndex"
          value={formData.correctIndex}
          onChange={handleChange}
        >
          <option value={0}>Answer 1</option>
          <option value={1}>Answer 2</option>
          <option value={2}>Answer 3</option>
          <option value={3}>Answer 4</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default QuestionForm;
