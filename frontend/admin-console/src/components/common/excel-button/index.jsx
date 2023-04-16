import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { SiMicrosoftexcel } from "react-icons/si";
function ExportExcelButton({ data, columns, filename }) {
  const handleExportExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("My Sheet");

    worksheet.columns = columns;

    data.forEach((row) => {
      worksheet.addRow(row);
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, filename);
    });
  };

  return (
    <button
      className="p-2 bg-[#1fe074] rounded-md mb-2 text-white text-lg gap-x-2 flex items-center"
      onClick={handleExportExcel}
    >
      <SiMicrosoftexcel />
      <span>Export Excel</span>
    </button>
  );
}

export default ExportExcelButton;
