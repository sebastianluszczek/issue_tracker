import React, { useState, useEffect } from "react";
import IssueService from "../services/IssueService";

const Issue = props => {
  const initIssueState = {
    _id: null,
    title: "",
    description: "",
    state: "open"
  };
  const [currentIssue, setCurrentIssue] = useState(initIssueState);
  const [message, setMessage] = useState("");

  const getIssue = async id => {
    try {
      const response = await IssueService.get(id)

      setCurrentIssue(response.data.data);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getIssue(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentIssue({ ...currentIssue, [name]: value });
  };

  const updateState = async state => {
    const data = {
      title: currentIssue.title,
      description: currentIssue.description,
      state: state
    };

    try {
      const response = await IssueService.update(currentIssue._id, data);
      console.log(response.data)
      setCurrentIssue({ ...currentIssue, state: state });
      setMessage("The Issue state was updated successfully!");
    } catch (error) {
      console.log(error)
    }
  };

  const updateIssue = async () => {
    try {
      const response = await IssueService.update(currentIssue._id, currentIssue)
      setMessage("The Issue was updated successfully!");
    } catch (error) {
      console.log(error)
    }
  };

  const deleteIssue = async () => {
    try {
      const response = await IssueService.remove(currentIssue._id)
      props.history.push("/issues");
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      {currentIssue ? (
        <div className="edit-form">

          {message ? <p className="message">{message}</p> : <p></p>}
          
          <h4>Issue</h4>
          <form>
            <div className="input-wrapper">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentIssue.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="description">Description:</label>
              <textarea
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentIssue.description}
                onChange={handleInputChange}
                rows="10"
              />
            </div>
          </form>
          <div className="input-wrapper">
              <label>
                State:
              </label>
              {currentIssue.state}

              <div></div>
              <div className="state-check">
                <p>Change state:</p>
                <button
                  className="btn-small"
                  disabled={true}
                  onClick={() => updateState("open")}
                >Open</button>
                <button
                  className="btn-small"
                  disabled={currentIssue.state === "closed" || currentIssue.state === "pending"}
                  onClick={() => updateState("pending")}
                >Pending</button>
                <button
                  className="btn-small"
                  disabled={currentIssue.state === "closed"}
                  onClick={() => updateState("closed")}
                >Closed</button>
              </div>
            </div>


          <button className="btn" onClick={deleteIssue}>
            Delete
          </button>

          <button
            type="submit"
            className="btn"
            onClick={updateIssue}
          >
            Update
          </button>
        </div>
      ) : (
          <div>
            <br />
            <p>Please click on a Issue...</p>
          </div>
        )}
    </div>
  );
};

export default Issue;