import React from "react";
import { PowerBIEmbed } from 'powerbi-client-react';
import {models} from 'powerbi-client';
function PowerBi(){
return (
  <>
  {/* <PowerBIEmbed
	embedConfig = {{
		type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
		id: '<Report Id>',
		embedUrl: '<Embed Url>',
		accessToken: '<Access Token>',
		tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
		settings: {
			panes: {
				filters: {
					expanded: false,
					visible: false
				}
			},
			background: models.BackgroundType.Transparent,
		}
	}}

	eventHandlers = {
		new Map([
			['loaded', function () {console.log('Report loaded');}],
			['rendered', function () {console.log('Report rendered');}],
			['error', function (event) {console.log(event.detail);}],
			['visualClicked', () => console.log('visual clicked')],
			['pageChanged', (event) => console.log(event)],
		])
	}

	cssClassName = { "reportClass" }

	getEmbeddedComponent = { (embeddedReport) => {
		window.report = embeddedReport;
	}}
/> */}

<iframe title="nullpointers_report" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=a362530e-a48f-4201-a510-4ef8c3156578&autoAuth=true&ctid=cca3f0fe-586f-4426-a8bd-b8146307e738" frameborder="0" allowFullScreen="true"></iframe>
  </>
);
}
export default PowerBi;