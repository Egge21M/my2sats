"use client";
import React, { useEffect, useState } from "react";
import TipModal from "./TipModal";

function TipBox() {
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    if (modalOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.removeProperty("overflow");
    }
  }, [modalOpen]);
  return (
    <>
      <div className="bg-zinc-900 my-8 p-4 rounded grid grid-cols-2">
        <div>
          <p className="text-2xl">Enyoing the content?</p>
          <p className="text-sm italic text-zinc-400">
            Support this blog and leave a tip!
          </p>
        </div>
        <div className="flex justify-center items-center">
          <button
            className="bg-orange-500 rounded py-2 px-4"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Send Tip
          </button>
        </div>
      </div>
      {modalOpen ? <TipModal setModalOpen={setModalOpen} /> : undefined}
    </>
  );
}

export default TipBox;
