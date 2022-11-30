import React from "react";
import domtoimage from "dom-to-image-more";
import JSZip from "jszip";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { useTranslation } from "react-i18next";
import { MdOutlineDownload } from "react-icons/md";
function Download(props) {
  const { bookingId } = props;
  const { t } = useTranslation();

  const downloadImage = () => {
    var node = document.getElementById(`ticket-${bookingId}`);
    node.crossOrigin = "anonymous";
    console.log({ node });
    // html2canvas(node).then((canvas) => {
    //   canvas.toBlob(function (blob) {
    //     window.saveAs(blob, `${bookingId}.jpg`);
    //   });
    // });
    domtoimage.toBlob(node).then(function (blob) {
      window.saveAs(blob, "my-node.png");
    });
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
