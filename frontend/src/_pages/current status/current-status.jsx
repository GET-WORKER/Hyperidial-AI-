import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AnsweredStatus = () => {
  return (
    <div className="container mt-4">
      <h3 className="mb-4">Answered Status</h3>

      {/* First row */}
      <div className="row mb-3">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h6>Total Calls to be Made Today</h6>
            <p className="fs-4 fw-bold">12,2456</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h6>Calls Made Today</h6>
            <p className="fs-4 fw-bold">6</p>
            <p>From: 782-28</p>
            <p>To: 857-659</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h6>Calls Balance</h6>
            <p className="fs-4 fw-bold">-</p>
          </div>
        </div>
      </div>

      {/* Second row */}
      <div className="row mb-3">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h6>Total Calls Responded by Clients</h6>
            <p className="fs-4 fw-bold">-</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h6>Unexecuted by Clients</h6>
            <p className="fs-4 fw-bold">-</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h6>Unexecuted Calls</h6>
            <p className="fs-4 fw-bold">-</p>
          </div>
        </div>
      </div>

      {/* Observation Section */}
      <div className="card p-3 shadow-sm">
        <h6>Observation:</h6>
        <textarea
          className="form-control"
          rows="4"
          placeholder="Enter observation notes..."
        ></textarea>
      </div>
    </div>
  );
};

export default AnsweredStatus;
