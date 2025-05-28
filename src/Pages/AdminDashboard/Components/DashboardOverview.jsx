import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Calendar, DollarSign } from 'lucide-react';
import api from '../../../../api.js'; // adjust path as needed

const DashboardOverview = () => {
  const [userCount, setUserCount] = useState(0);
  const [CourseCount, setCourseCount] = useState(0);
  const [EventCount, setEventCount] = useState(0);
  const [PaymentCount, setPaymentCount] = useState(0);
  const [announcements, setAnnouncements] = useState([]);
  const [examSchedules, setExamSchedules] = useState([]);

  useEffect(() => {
    // Fetch total user count from API
    const fetchUserCount = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn('No auth token found');
          return;
        }

        const response = await api.get('/user/count', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserCount(response.data.count);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    // Fetch total course count from API
    const fetchCourseCount = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn('No auth token found');
          return;
        }

        const response = await api.get('/courses/count', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCourseCount(response.data.count);
      } catch (error) {
        console.error('Error fetching course count:', error);
      }
    };

    // Fetch total pending event count from API
    const fetchEventCount = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn('No auth token found');
          return;
        }

        const response = await api.get('/announcement/event-count', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEventCount(response.data.count);
      } catch (error) {
        console.error('Error fetching event count:', error);
      }
    };

    // Fetch total facility payment count from API
    const fetchPaymentCount = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn('No auth token found');
          return;
        }

        const response = await api.get('/facility-payments/count', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPaymentCount(response.data.count);
      } catch (error) {
        console.error('Error fetching payment count:', error);
      }
    };

    // Fetch total facility payment count from API
    const fetchAnnouncements = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn('No auth token found');
          return;
        }

        const response = await api.get('/announcement/pending', { // your pending announcements route
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAnnouncements(response.data); // Assuming backend sends array directly
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    const fetchExamSchedules = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn('No auth token found');
          return;
        }

        const response = await api.get('/exam-schedule/pending/exam', { // your pending ExamSchedules route
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setExamSchedules(response.data); // Assuming backend sends array directly
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching ExamSchedules:', error);
      }
    };

    // Call all the fetch functions when component mounts
    fetchUserCount();
    fetchCourseCount();
    fetchEventCount();
    fetchPaymentCount();
    fetchAnnouncements();
    fetchExamSchedules();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-800">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-slate-700">{userCount}</p>
            </div>
            <Users className="h-12 w-12 text-red-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-slate-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Courses</p>
              <p className="text-3xl font-bold text-slate-700">{CourseCount}</p>
            </div>
            <BookOpen className="h-12 w-12 text-slate-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-slate-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Events</p>
              <p className="text-3xl font-bold text-slate-700">{EventCount}</p>
            </div>
            <Calendar className="h-12 w-12 text-slate-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-gray-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Totle Payments</p>
              <p className="text-3xl font-bold text-slate-700">{PaymentCount}</p>
            </div>
            <DollarSign className="h-12 w-12 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Recent Announcements</h3>
          <div className="space-y-3">
            {announcements.slice(0, 5).map((announcement) => (
              <div key={announcement._id} className="border-l-4 border-red-400 pl-4 py-2">
                <p className="font-medium text-slate-700">{announcement.title}</p>
                <p className="text-sm text-gray-600">{announcement.message}</p>
                <p className="text-xs text-gray-500 mt-1">Audience: {announcement.audience}</p>
              </div>
            ))}

          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Upcoming Exams</h3>
          <div className="space-y-3">
            {examSchedules.slice(0, 5).map((exam) => (
              <div key={exam._id} className="border-l-4 border-slate-600 pl-4 py-2">
                <p className="font-medium text-slate-700">{exam.title}</p>
                <p className="text-sm text-gray-600">{exam.subject}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Date: {new Date(exam.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  {' '}| Venue: {exam.venue}
                </p>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
