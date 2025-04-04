import { ArrowLeft, RefreshCcw, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentCancel() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-white rounded-lg shadow-sm p-6">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Payment Cancelled</h1>
          <p className="text-gray-600 mb-4">
            Your payment was cancelled. No charges were made to your account.
          </p>
          <button 
            className="w-full mb-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </button>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-100">
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Store
          </Link>
        </div>
      </div>
    </div>
  );
}