import React from "react";

export default function QuestionSkeleton() {
  return (
    <div className="w-full h-[400px]">
      <div className="shadow mb-4 w-full h-full mx-auto">
        <div className="animate-pulse h-full">
          <div className="h-full bg-slate-700 rounded-2xl mb-6"></div>
        </div>
      </div>
    </div>
  );
}
