import { Filter, Plus, Eye, Edit } from "lucide-react";

const PaymentsSection = () => {
  // Hardcoded sample data
  const payments = [
    {
      _id: "1",
      studentId: { firstName: "Aarav", lastName: "Sharma" },
      feeId: { feeType: "Tuition" },
      amount: 12000,
      status: "Paid",
      paymentMethod: "Online",
    },
    {
      _id: "2",
      studentId: { firstName: "Diya", lastName: "Patel" },
      feeId: { feeType: "Library" },
      amount: 3000,
      status: "Pending",
      paymentMethod: "Cash",
    },
    {
      _id: "3",
      studentId: { firstName: "Kabir", lastName: "Verma" },
      feeId: { feeType: "Transport" },
      amount: 1500,
      status: "Overdue",
      paymentMethod: "Cheque",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ...rest of your JSX code (no changes needed)... */}
    </div>
  );
};

export default PaymentsSection;
