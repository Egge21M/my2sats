import React from "react";

function TipBox() {
  return (
    <div className="bg-zinc-900 my-8 p-4 rounded grid grid-cols-2">
      <div>
        <p className="text-2xl">Enyoing the content?</p>
        <p className="text-sm italic text-zinc-400">
          Support this blog and leave a tip!
        </p>
      </div>
      <div className="flex justify-center items-center">
        <button className="bg-orange-500 rounded py-2 px-4">Send Tip</button>
      </div>
    </div>
  );
}

export default TipBox;
