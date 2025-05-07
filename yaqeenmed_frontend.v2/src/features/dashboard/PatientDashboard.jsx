import React, { useState, useEffect } from "react";
import { getPostedRequests } from "../../utilities/request-api"; // Import the getPostedRequests function
import sendRequest from "../../utilities/sendRequest"; // Import the sendRequest function
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./PatientDashboard.css";
import { FaMoon, FaSun } from "react-icons/fa";  // Import the required icons



function PatientDashboard({user}  ) {
  const [postedRequests, setPostedRequests] = useState([]);  // Update state to hold posted requests
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPostRequestForm, setShowPostRequestForm] = useState(false);
  const [title, setTitle] = useState("");
  const [detailedComment, setDetailedComment] = useState("");
  const [summaryComment, setSummaryComment] = useState("");
  const [document, setDocument] = useState("");

  const navigate = useNavigate(); // Initialize navigate for redirection

  const fetchPostedRequests = async () => {
    try {
      const data = await getPostedRequests(); // Call the service function to get posted requests
      setPostedRequests(data);  // Update the state with the fetched requests
    } catch (error) {
      console.error("Error fetching posted requests", error);
    }
  };

  useEffect(() => {
    fetchPostedRequests();  // Fetch posted requests when the component mounts



    
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    document.body.classList.toggle('dark-mode', newMode);
  };

  const handlePostRequestClick = () => {
    setShowPostRequestForm(!showPostRequestForm);  // Toggle form visibility on button click
  };

  const handleCloseForm = () => {
    setShowPostRequestForm(false);  // Close form and reset values
    setTitle("");
    setDetailedComment("");
    setSummaryComment("");
    setDocument(null);
  };

  const handleSubmitRequest = async (e) => {
    try {
      e.preventDefault();
      console.log(user)
      const formData = new FormData();
        formData.append("title", title);
        formData.append("detailed_comment", detailedComment);
        formData.append("summary_comment", summaryComment);
        formData.append("document", document);  // FormData append for the file
        formData.append("issue", 1);  // The issue associated with the request
        formData.append("user_id", user?.id);  // Patient's user_id (or user.id based on the backend)


      console.log("Form Data:", formData);  // Log the form data for debugging
        const response = await sendRequest("/patient-requests/", "POST", formData);
        console.log("Response:", response);  // Log the response for debugging
        if (response) {
            alert("Request posted successfully!");
            fetchPostedRequests();  // Re-fetch the posted requests after a new one is posted
            handleCloseForm();
        } else {
            alert("Error posting the request.");
        }
    } catch (error) {
        console.error("There was an error posting the request!", error);
        alert("Error posting the request.");
    }
};

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");  // Remove the token from localStorage
    navigate("/");  // Redirect to the login page
  };

  if (!postedRequests) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <div className={`dashboard-layout ${sidebarOpen ? "sidebar-open" : ""}`}>
      <header className="dashboard-header">
        <button className="hamburger" onClick={toggleSidebar}>
          ☰
        </button>
        <h1 className="app-name">YaqeenMed</h1>
        <div className="header-right">
          <button
            className="dark-mode-toggle"
            onClick={toggleDarkMode}
            style={{ backgroundColor: "#3c4e69" }}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
          <div className="profile-button">
            <img
              src="https://i.pravatar.cc/150?img=3"
              alt="Profile"
              className="profile-pic"
            />
          </div>
        </div>
      </header>

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <ul>
          <li>Dashboard</li>
          <li>Documents</li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>Logout</button> {/* Logout Button */}
      </aside>

      <main className="dashboard-main">
        {/* Post Request Button */}
        <button className="post-request-btn" onClick={handlePostRequestClick}>
          Post Request +
        </button>

        {/* Conditional Form Rendering */}
        {showPostRequestForm && (
          <div className="post-request-form">
            <h2>Post a New Request</h2>
            <form onSubmit={handleSubmitRequest}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="Detailed Comment"
                value={detailedComment}
                onChange={(e) => setDetailedComment(e.target.value)}
                required
              />
              <textarea
                placeholder="Summary Comment"
                value={summaryComment}
                onChange={(e) => setSummaryComment(e.target.value)}
                required
              />
              <input
                placeholder="Document URL"
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                required
              />
              <button type="submit">Submit Request</button>
              <button type="button" onClick={handleCloseForm}>Cancel</button>
            </form>
          </div>
        )}

        {/* Displaying Posted Requests */}
        <ul className="dashboard-list">
          {postedRequests.map((request) => (
            <li className="dashboard-card" key={request.id}>
              <strong>{request.title || "No title"}</strong> - 
              {request.detailed_comment || "No details"}
            </li>
          ))}
        </ul>
      </main>

      <footer className="dashboard-footer">
        &copy; {new Date().getFullYear()} YaqeenMed. All rights reserved.
      </footer>
    </div>
  );
}

export default PatientDashboard;
