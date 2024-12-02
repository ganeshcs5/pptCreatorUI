import React, { useState } from "react";

function App() {
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      alert("Please enter a topic!");
      return;
    }
    setIsLoading(true);

    // Construct the URL with the prompt parameter
    const url = `http://localhost:3000/download?prompt=${encodeURIComponent(topic)}`;

    try {
      // Making the HTTP request to trigger the download
      const response = await fetch(url);

      if (response.ok) {
        // Create a temporary download link and trigger the download
        const fileBlob = await response.blob(); // Get the file content
        const fileUrl = window.URL.createObjectURL(fileBlob); // Create a URL for the file
        const link = document.createElement("a"); // Create a download link
        link.href = fileUrl;
        link.download = `${topic}.pptx`; // Set file name
        link.click(); // Simulate the click to start the download
        alert(`PPT generated for: ${topic}`);
      } else {
        alert("Error generating PPT. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to make request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>PPT Creator</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={isLoading}>
          {isLoading ? "Generating..." : "Create"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    marginTop: "50px",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  form: {
    display: "inline-block",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    width: "300px",
    marginRight: "10px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    cursor: "pointer",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
};

export default App;
