"use client";

import { useEffect } from "react";

export default function PalsPage() {
  useEffect(() => {
    // Log navigation to info (for demo, use console.info)
    console.info("Navigated to Course Pals / Recommendations page");
    // TODO: Replace with real logging if needed
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Course Pals / Recommendations</h1>
      <p>Here you will see students who share your courses and can connect with them.</p>
      {/* TODO: Implement course matching UI */}
    </div>
  );
}
