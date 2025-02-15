import React from "react";

function PowerBi() {
  return (
    <div className="fixed inset-0 bg-gray-100">
      <div className="h-screen flex flex-col">
        <h2 className="text-center text-xl font-semibold py-4 bg-white shadow-sm text-gray-700">
          Power BI Dashboard
        </h2>
        <div className="flex-1">
          <iframe
            title="nullpointers_report"
            width="100%"
            height="100%"
            src="https://app.powerbi.com/reportEmbed?reportId=a362530e-a48f-4201-a510-4ef8c3156578&autoAuth=true&ctid=cca3f0fe-586f-4426-a8bd-b8146307e738"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default PowerBi;