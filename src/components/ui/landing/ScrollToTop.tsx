"use client";

import Button from "../Button";

export default function ScrollToTop() {
  return (
    <Button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style="primary"
    >
      <p>Head to Sign Up</p>
    </Button>
  );
}
