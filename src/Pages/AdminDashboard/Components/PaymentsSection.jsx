import React, { useEffect, useState } from "react";
import { Eye, X } from "lucide-react";
import api from '../../../../api.js';

const PaymentsSection = () => {
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/facility-payments/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPayments(response.data.payments);
      } catch (err) {
        console.error("Error fetching payments:", err);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="p-4">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead className="bg-gray-100 text-sm font-medium text-gray-700">
          <tr>
            <th className="py-2 px-4 border-b">Parent</th>
            <th className="py-2 px-4 border-b">Course</th>
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Method</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id} className="text-sm text-gray-700">
              <td className="py-2 px-4 border-b">{payment.parentId?.user}</td>
              <td className="py-2 px-4 border-b">{payment.courseId?.courseName}</td>
              <td className="py-2 px-4 border-b">${payment.amountPaid}</td>
              <td className="py-2 px-4 border-b">{payment.paymentMethod}</td>
              <td className="py-2 px-4 border-b">{new Date(payment.paymentDate).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => setSelectedPayment(payment)}
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Eye size={16} /> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Popup */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-xl">
            <button
              onClick={() => setSelectedPayment(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
            <ul className="text-sm space-y-2">
              <li><strong>Parent:</strong> {selectedPayment.parentId?.user}</li>
              <li><strong>Course:</strong> {selectedPayment.courseId?.courseName}</li>
              <li><strong>Amount Paid:</strong> ${selectedPayment.amountPaid}</li>
              <li><strong>Method:</strong> {selectedPayment.paymentMethod}</li>
              <li><strong>Date:</strong> {new Date(selectedPayment.paymentDate).toLocaleDateString()}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsSection;
