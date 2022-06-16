import React from "react";

export default function HomeSkeleton() {
  return (
    <div className="w-1/2 h-auto">
      <div className="shadow rounded-md p-4 w-full mx-auto">
        <div className="animate-pulse flex space-x-4 flex-col">
          <div className="bg-slate-700 h-[300px] w-full rounded-lg mb-5 ml-3 flex justify-center items-center">
            <div className="loading-animation">?</div>
          </div>
          <div className="flex-1 space-y-6">
            <div className="h-10 bg-slate-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 flex items-center justify-start">
                  <div className="bg-slate-700 rounded-full h-12 w-12"></div>
                  <div className="h-10 bg-slate-700 rounded w-1/3 ml-4"></div>
                </div>
                <div className="col-span-1 flex items-center justify-start">
                  <div className="bg-slate-700 rounded-full h-12 w-12"></div>
                  <div className="h-10 bg-slate-700 rounded w-1/3 ml-4"></div>
                </div>
                <div className="col-span-1 flex items-center justify-start">
                  <div className="bg-slate-700 rounded-full h-12 w-12"></div>
                  <div className="h-10 bg-slate-700 rounded w-1/3 ml-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-14 bg-slate-700 rounded w-1/6 mx-auto my-4"></div>
    </div>
  );
}
