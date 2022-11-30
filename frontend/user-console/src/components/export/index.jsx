import React, { useState } from "react";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { saveAs } from "file-saver";
import { useTranslation } from "react-i18next";
import { MdOutlineDownload } from "react-icons/md";
import { upperCase } from "lodash";
import jsPDF from "jspdf";
import "svg2pdf.js";

function Download(props) {
  const { bookingId } = props;
  const { t } = useTranslation();
  const downloadImage = async () => {
    var node = document.getElementById(`ticket-${bookingId}`);
    node.crossOrigin = "anonymous";
    var pdf = new jsPDF("letter");
    const filename = `LotusTicket-${bookingId}`;
    const imagePng = await htmlToImage.toPng(node);
    const imgProps = pdf.getImageProperties(imagePng);
    const pdfWidth = pdf.internal.pageSize.getWidth() - 8;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imagePng, "PNG", 4, 4, pdfWidth, pdfHeight);
    pdf.save(filename + ".pdf");
  };
  return (
    <button
      onClick={downloadImage}
      className="px-4 py-2 bg-[#1f3e82] rounded-md flex items-center gap-x-2 text-white font-medium text-xl"
    >
      <p>{t("ticket.download")}</p>
      <MdOutlineDownload color="white" />
    </button>
  );
}

export default Download;
