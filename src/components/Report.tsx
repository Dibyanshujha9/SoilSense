import React from 'react';
import jsPDF from 'jspdf';

interface DownloadReportButtonProps {
  reportTitle?: string;
  reportData?: Record<string, any>;
  className?: string;
}

/**
 * Button component that downloads a report as PDF when clicked
 */
const DownloadReportButton: React.FC<DownloadReportButtonProps> = ({
  reportTitle = 'Report',
  reportData = {},
  className = '',
}) => {
  const handleDownload = () => {
    // Create new PDF document
    const doc = new jsPDF();
    
    // Add title to the PDF
    doc.setFontSize(18);
    doc.text(reportTitle, 20, 20);
    
    // Add some content from report data
    doc.setFontSize(12);
    let yPosition = 40;
    
    // Add report data content
    Object.entries(reportData).forEach(([key, value]) => {
      doc.text(`${key}: ${value}`, 20, yPosition);
      yPosition += 10;
    });
    
    // If no data was provided, add a placeholder message
    if (Object.keys(reportData).length === 0) {
      doc.text("This is a sample report.", 20, yPosition);
      yPosition += 10;
      doc.text("In a real implementation, you would populate this with actual data.", 20, yPosition);
    }
    
    // Add date at the bottom
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 280);
    
    // Save the PDF
    doc.save(`${reportTitle.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <button
      onClick={handleDownload}
      className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      type="button"
    >
      Download Report
    </button>
  );
};

export default DownloadReportButton;

// Example usage:
// <DownloadReportButton 
//   reportTitle="Monthly Sales Report" 
//   reportData={{ 
//     "Total Sales": "$45,000", 
//     "Number of Transactions": 1250,
//     "Top Performer": "Sarah Johnson"
//   }} 
// />