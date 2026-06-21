"use client";

import dynamic from "next/dynamic";

const PDFDownloadLink = dynamic(
  () =>
    import("@react-pdf/renderer").then(
      (mod) => mod.PDFDownloadLink
    ),
  {
    ssr: false,
  }
);

import { Download } from "lucide-react";
import ResumePDF from "./ResumePDF";

export default function DownloadPDF({
  resumeData,
  resumeName = "resume",
}) {
  return (
    <PDFDownloadLink
      document={<ResumePDF resumeData={resumeData} />}
      fileName={`${resumeName}_resume.pdf`}
    >
      {({ loading }) => (
        <button
          className="flex items-center gap-2 px-5 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl"
        >
          <Download size={16} />

          {loading
            ? "Generating PDF..."
            : "Download PDF"}
        </button>
      )}
    </PDFDownloadLink>
  );
}