import { useRef } from 'react';
import { Printer } from 'lucide-react';

interface PrintPreviewProps {
  children: React.ReactNode;
  title: string;
}

export default function PrintPreview({ children, title }: PrintPreviewProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Print button (hidden on print) */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <h2 className="text-xl font-extrabold text-gray-800">{title}</h2>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold shadow-lg transition-transform hover:scale-105"
        >
          <Printer size={20} />
          Print
        </button>
      </div>

      {/* Paper preview */}
      <div
        ref={printRef}
        className="bg-white shadow-xl rounded-lg overflow-hidden print:shadow-none print:rounded-none"
      >
        {/* Paper content */}
        <div className="p-8 sm:p-12 min-h-[1123px]" style={{ maxWidth: '210mm' }}>
          {/* Title header */}
          <div className="border-b-2 border-gray-200 pb-4 mb-6">
            <h1 className="text-2xl font-extrabold text-gray-800">{title}</h1>
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>English Genius Worksheet</span>
              <span>Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>

          {/* Content */}
          {children}

          {/* Footer */}
          <div className="mt-auto pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
            <p>English Genius - Learning Worksheet</p>
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 15mm;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}
