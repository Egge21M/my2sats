"use client";
import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";

type TipModalProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function TipModal({ setModalOpen }: TipModalProps) {
  const [invoice, setInvoice] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  async function invoiceHandler() {
    if (!inputRef?.current?.value) {
      return;
    }
    const lnurlRes = await fetch(
      `https://getalby.com/.well-known/lnurlp/fallingpine71`,
    );
    const { callback } = await lnurlRes.json();
    const cbRes = await fetch(
      `${callback}?amount=${Number(inputRef.current.value) * 1000}`,
    );
    const cbData = await cbRes.json();
    setInvoice(cbData.pr);
  }
  return (
    <div
      className="fixed z-10 inset-0 bg-black/80 flex justify-center items-center"
      onClick={() => {}}
    >
      <div className="bg-zinc-800 p-4 rounded flex flex-col gap-4 items-center max-w-xl">
        <p>Leave a Tip</p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            className="rounded p-2 bg-zinc-900"
            ref={inputRef}
          />
          <p>SATS</p>
        </div>
        {invoice ? (
          <div className="flex flex-col items-center gap-2">
            <div className="bg-white p-2 rounded">
              <QRCode value={invoice} />
            </div>
            <p className="text-xs text-center text-zinc-400">
              This website does not check for payment confirmation. <br /> Once
              paid close this modal
            </p>
          </div>
        ) : undefined}
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-orange-600 border-2 border-orange-600 rounded"
            onClick={invoiceHandler}
          >
            Get Invoice
          </button>
          <button
            className="px-4 py-2 border-2 border-orange-600 rounded"
            onClick={() => {
              setModalOpen(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default TipModal;
