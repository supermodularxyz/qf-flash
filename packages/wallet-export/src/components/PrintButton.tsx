export const PrintButton = () => (
  <div className="mb-8 flex justify-end print:hidden">
    <button
      onClick={() => window.print()}
      className="inline-flex cursor-pointer justify-center border bg-gray-100 px-3 py-2 "
    >
      Print
    </button>
  </div>
);
