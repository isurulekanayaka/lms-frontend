import { Plus, Edit, Trash2 } from "lucide-react";

const sampleTimetables = [
  {
    _id: "1",
    day: "Monday",
    timeSlot: "9:00 AM - 10:00 AM",
    subject: "Mathematics",
    teacherId: { firstName: "John", lastName: "Doe" },
    room: "101",
    courseId: { courseName: "B.Sc. Computer Science" }
  },
  {
    _id: "2",
    day: "Tuesday",
    timeSlot: "10:00 AM - 11:00 AM",
    subject: "Physics",
    teacherId: { firstName: "Jane", lastName: "Smith" },
    room: "102",
    courseId: { courseName: "B.Sc. Physics" }
  },
  {
    _id: "3",
    day: "Wednesday",
    timeSlot: "11:00 AM - 12:00 PM",
    subject: "Chemistry",
    teacherId: { firstName: "Alice", lastName: "Johnson" },
    room: "103",
    courseId: { courseName: "B.Sc. Chemistry" }
  }
];

const TimetableSection = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-bold text-slate-800">Timetable Management</h2>
      <button className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Add Schedule
      </button>
    </div>

    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Slot</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sampleTimetables.map((entry) => (
            <tr key={entry._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.day}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.timeSlot}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.subject}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {entry.teacherId?.firstName} {entry.teacherId?.lastName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.room}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {entry.courseId?.courseName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default TimetableSection;
