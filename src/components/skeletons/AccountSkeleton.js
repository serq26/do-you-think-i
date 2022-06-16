import React from "react";

export default function AccountSkeleton() {
  return (
    <div className="w-full h-auto">
      <div className="shadow rounded-md p-4 w-full mx-auto">
        <div className="animate-pulse flex space-x-4 flex-col">
          <div className="flex-1 space-y-6">
            <div className="h-10 bg-slate-700 rounded"></div>
            <div className="h-10 bg-slate-700 rounded"></div>
            <div className="h-10 bg-slate-700 rounded"></div>
            <div className="h-10 bg-slate-700 rounded"></div>
            <div className="h-10 bg-slate-700 rounded"></div>
            <div className="h-10 bg-slate-700 rounded"></div>
            <div className="h-10 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
