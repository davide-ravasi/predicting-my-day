const formatSummaryDetails = (summary) => {
  if (!summary) return "";

  return summary
    .map((item) => {
      const [name, details] = item.split(": ");
      const detailsList = details.split(",").map((detail) => detail.trim());

      return `
            <div style="margin-bottom: 16px;">
                <h3 style="margin-bottom: 8px; font-weight: bold;">${name}</h3>
                <ul style="margin: 0; padding-left: 20px;">
                    ${detailsList
                      .map(
                        (detail) =>
                          `<li style="margin-bottom: 4px;">${detail}</li>`
                      )
                      .join("")}
                </ul>
            </div>
        `;
    })
    .join("");
};

export const printDocument = (formattedDate, data) => {
  const printWindow = window.open("", "_blank");

  if (printWindow) {
    const printContent = `
            <div>
                <div style="display: flex; gap: 48px; margin: 24px 48px;">
                    <div style="flex: 1; border: 1px solid #ccc; padding: 16px; border-radius: 4px;">
                        <h2 style="margin-bottom: 16px; text-align: center;">Check-In</h2>
                        <p style="text-align: center; font-size: 24px;">${
                          data.CheckIn
                        }</p>
                    </div>
                    <div style="flex: 1; border: 1px solid #ccc; padding: 16px; border-radius: 4px;">
                        <h2 style="margin-bottom: 16px; text-align: center;">Check-Out</h2>
                        <p style="text-align: center; font-size: 24px;">${
                          data.CheckOut
                        }</p>
                    </div>
                </div>
                <div style="margin: 24px 48px;">
                    <div style="border: 1px solid #ccc; padding: 16px; border-radius: 4px;">
                        <h2 style="margin-bottom: 16px; text-align: center;">Details</h2>
                        ${formatSummaryDetails(data.Summary)}
                    </div>
                </div>
            </div>
        `;

    printWindow.document.write(`
            <html>
                <head>
                    <title>Print Document</title>
                    <style>
                        body { 
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 20px;
                        }
                        h1 {
                            text-align: center;
                            margin-bottom: 30px;
                        }
                        ul {
                            list-style-type: disc;
                        }
                        li {
                            margin-bottom: 4px;
                        }
                    </style>
                </head>
                <body>
                    <h1>${formattedDate}</h1>
                    ${printContent}
                </body>
            </html>
        `);
    printWindow.document.close();
    printWindow.print();
  }
};
