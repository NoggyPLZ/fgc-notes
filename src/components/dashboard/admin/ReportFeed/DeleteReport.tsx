"use client";

import { removeReport } from "@/actions/actions";
import Button from "@/components/ui/Button";

export default function DeleteReport({ reportId }: { reportId: string }) {
  const handleClick = async (reportId: string) => {
    const result = await removeReport(reportId);
    if (!result?.success) {
      console.log("Failed to delete report");
    }
  };

  return (
    <div>
      <Button
        style="cancel"
        type="button"
        onClick={() => handleClick(reportId)}
      >
        Delete Report
      </Button>
    </div>
  );
}
