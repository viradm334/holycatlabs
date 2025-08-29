import { XMarkIcon } from "@heroicons/react/24/solid";

export default function Modal({ title = "", children, isOpen, onClose }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-1/2 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
          >
            <XMarkIcon className="size-6"/>
          </button>
          {title && <h2 className="text-lg font-semibold mb-4 text-center">{title}</h2>}
          <div>{children}</div>
        </div>
      </div>
    );
  }