import React, { useState, useEffect } from "react";
import IssueService from "../services/IssueService";
import { Link } from "react-router-dom";

const IssueList = () => {
  const [issues, setIssues] = useState([]);
  const [currentIssue, setCurrentIssue] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveIssues();
  }, []);

  const retrieveIssues = async () => {
    try {
      const response = await IssueService.getAll()

      setIssues(response.data.data)
      console.log(response.data.data)
    } catch (error) {
      console.log(error)
    }
  };

  const setActiveIssue = (issue, index) => {
    setCurrentIssue(issue);
    setCurrentIndex(index);
  };

  return (
    <div className="issue-list">
      <div className="column">
        <h4>Issues List</h4>

        <ul className="list">
          {issues &&
            issues.map((issue, index) => (
              <li
                className={
                  "list-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveIssue(issue, index)}
                key={index}
              >
                {issue.title}
              </li>
            ))}
        </ul>
      </div>
      <div className="details">
        {currentIssue ? (
          <div>
            <h4>Issue Details</h4>
            <div className="info">
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentIssue.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentIssue.description}
            </div>
            <div>
              <label>
                <strong>State:</strong>
              </label>{" "}
              {currentIssue.state}
            </div>

            <Link
              to={"/issues/" + currentIssue._id}
              className="btn"
            >
              Edit
            </Link>
          </div>
        ) : (
            <div>
              <br />
              <p>Please click on a Issue...</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default IssueList;
