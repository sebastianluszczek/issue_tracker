import React, { useState } from "react";
import IssueService from "../services/IssueService";

const AddIssue = () => {
  const initIssueState = {
    id: null,
    title: "",
    description: "",
    state: "open"
  };
  const [issue, setIssue] = useState(initIssueState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setIssue({ ...issue, [name]: value });
  };

  const saveIssue = async () => {
    var data = {
      title: issue.title,
      description: issue.description
    };

    const response = await IssueService.create(data)
    
    try {
      setIssue({
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        published: response.data.published
      });
      setSubmitted(true);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const newIssue = () => {
    setIssue(initIssueState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn" onClick={newIssue}>
            Add
          </button>
        </div>
      ) : (
          <div>
            <h2>Add Issue</h2>
            <div className="input-wrapper">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={issue.title}
                onChange={handleInputChange}
                name="title"
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                className="form-control"
                id="description"
                required
                value={issue.description}
                onChange={handleInputChange}
                name="description"
                rows="10"
              />
            </div>

            <button onClick={saveIssue} className="btn btn-success">
              Submit
          </button>
          </div>
        )}
    </div>
  )
}

export default AddIssue;