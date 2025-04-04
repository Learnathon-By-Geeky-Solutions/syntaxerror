"use client";
import axios from 'axios';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function PaymentSuccess() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get('session_id');

    if (sessionId) {
      localStorage.removeItem("shopping-cart");
      axios
        .patch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order/mark-paid`, { session_id: sessionId })
        .then((response) => {
          console.log('Order marked as paid:', response.data);
        })
        .catch((err) => {
          console.error('Error marking order as paid:', err);
          setError('There was an issue processing your order. Please try again later.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setError('Session ID is missing.');
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-white rounded-lg shadow-sm p-6">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Payment Successful</h1>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. We&apos;ll email you the order confirmation shortly.
          </p>
          {error && (
            <div className="bg-red-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-green-700">Order has been marked as Paid</p>
          </div>
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
