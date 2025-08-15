import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const RespondedClients = () => {
  // Example data
  const respondedClients = [
    {
      name: "Name1",
      clientId: "123456 787",
      summary: "Will pay by tomorrow or by 17th Aug.",
    },
    { name: "Name2", clientId: "123 456 789" },
    { name: "Name3", clientId: "456 987 14" },
    { name: "Name4", clientId: "326 326 678" },
  ];

  const unrespondedClients = [{ phone: "7707653260", clientId: "1345784101" }];

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Responded Clients</h3>

      {/* Responded Clients Table */}
      <div className="card p-3 shadow-sm mb-3">
        <h6 className="fw-bold">Responded Clients</h6>
        <table className="table table-bordered table-sm mt-2">
          <thead className="table-light">
            <tr>
              <th>Name / Client Id</th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            {respondedClients.map((client, index) => (
              <tr key={index}>
                <td>
                  {client.name} ({client.clientId})
                </td>
                <td>{client.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Unresponded Clients */}
      <div className="card p-3 shadow-sm mb-3">
        <h6 className="fw-bold">Unresponded Clients or Suspicious</h6>
        {unrespondedClients.map((client, idx) => (
          <p key={idx}>
            Phone: {client.phone} | Client ID: {client.clientId}
          </p>
        ))}
      </div>

      {/* Summary */}
      <div className="card p-3 shadow-sm">
        <h6 className="fw-bold">Summary</h6>
        <p>Will pay by tomorrow or by 17th Aug.</p>
        <p>
          Total Balance Outstanding: <strong>7</strong>
        </p>
      </div>
    </div>
  );
};

export default RespondedClients;
