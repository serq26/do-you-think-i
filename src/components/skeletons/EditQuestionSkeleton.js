import React from "react";

export default function EditQuestionSkeleton() {
  return (
    <div className="w-full h-auto">
      <div className="shadow rounded-md p-4 w-full mx-auto">
        <div className="animate-pulse flex space-x-4 flex-col">
          <div className="bg-slate-700 h-[200px] w-full rounded-lg mb-5 ml-3"></div>
          <div className="flex-1 space-y-6">
            <div className="h-10 bg-slate-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-10 bg-slate-700 rounded col-span-2"></div>
                <div className="col-span-1 flex items-center justify-start">
                  <div className="bg-slate-700 rounded-full h-12 w-12"></div>
                  <div className="h-10 bg-slate-700 rounded w-10 ml-4"></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-10 bg-slate-700 rounded col-span-2"></div>
                <div className="col-span-1 flex items-center justify-start">
                  <div className="bg-slate-700 rounded-full h-12 w-12"></div>
                  <div className="h-10 bg-slate-700 rounded w-10 ml-4"></div>
                </div>
              </div>
              <div className="h-12 bg-slate-700 rounded w-1/5"></div>
              <div className="h-12 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
