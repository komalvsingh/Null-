import React from "react";

function PowerBi() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-5xl p-4 bg-white shadow-lg rounded-xl">
        <h2 className="text-center text-xl font-semibold mb-4 text-gray-700">
          Power BI Dashboard
        </h2>
        <div className="flex justify-center">
          <iframe
            title="nullpointers_report"
            width="100%"
            height="500"
            src="https://app.powerbi.com/reportEmbed?reportId=a362530e-a48f-4201-a510-4ef8c3156578&autoAuth=true&ctid=cca3f0fe-586f-4426-a8bd-b8146307e738"
            frameBorder="0"
            allowFullScreen
            className="rounded-lg shadow-md"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default PowerBi;
