import React from "react";

const BirtReportViewer = ({ reportName, parameters }) => {
  const REPORT_SERVER_URL = import.meta.env.VITE_REPORT_SERVER_URL;
  const birtUrl = `${REPORT_SERVER_URL}/birt-viewer/frameset?__report=report/${reportName}.rptdesign&__parameterpage=${parameters}`;

  return (
    <div className="">
          <iframe src={birtUrl} />
    </div>
  );
};

export default BirtReportViewer;
