import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, Users, Download, Trash2 } from 'lucide-react';

const Admin = () => {
  const [leads, setLeads] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      const storedLeads = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      setLeads(storedLeads.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    // This is a simple, insecure password check for demonstration purposes.
    // In a real application, use a secure authentication method.
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('סיסמה שגויה');
    }
  };

  const handleDeleteLead = (id) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את הליד הזה?')) {
      const updatedLeads = leads.filter(lead => lead.id !== id);
      setLeads(updatedLeads);
      localStorage.setItem('contactSubmissions', JSON.stringify(updatedLeads));
    }
  };

  const downloadCSV = () => {
    const headers = ['ID', 'Timestamp', 'Full Name', 'Phone', 'Email', 'Message'];
    const rows = leads.map(lead => [
      lead.id,
      new Date(lead.timestamp).toLocaleString('he-IL'),
      `"${lead.fullName.replace(/"/g, '""')}"`,
      `"${lead.phone.replace(/"/g, '""')}"`,
      `"${lead.email.replace(/"/g, '""')}"`,
      `"${lead.message.replace(/"/g, '""')}"`
    ]);

    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>אזור אישי - כניסה</title>
        </Helmet>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg"
          >
            <div className="text-center">
              <Shield className="mx-auto h-12 w-12 text-blue-800" />
              <h1 className="text-2xl font-bold text-gray-900 mt-4">כניסה לאזור האישי</h1>
              <p className="text-gray-600">אנא הזן סיסמה כדי להמשיך</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="סיסמה"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                  required
                />
              </div>
              <button type="submit" className="w-full btn-primary">
                כניסה
              </button>
            </form>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>אזור אישי - ניהול לידים</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50 pt-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-800" />
                <h1 className="text-3xl font-bold text-gray-900">ניהול לידים</h1>
              </div>
              <button onClick={downloadCSV} className="btn-secondary inline-flex items-center gap-2">
                <Download size={16} />
                הורד כ-CSV
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-4 font-semibold text-gray-600">שם מלא</th>
                      <th className="p-4 font-semibold text-gray-600">פרטי קשר</th>
                      <th className="p-4 font-semibold text-gray-600">הודעה</th>
                      <th className="p-4 font-semibold text-gray-600">תאריך</th>
                      <th className="p-4 font-semibold text-gray-600">פעולות</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.length > 0 ? (
                      leads.map(lead => (
                        <tr key={lead.id} className="border-b hover:bg-gray-50">
                          <td className="p-4 font-medium text-gray-800">{lead.fullName}</td>
                          <td className="p-4 text-gray-600">
                            <div>{lead.email}</div>
                            <div>{lead.phone}</div>
                          </td>
                          <td className="p-4 text-gray-600 max-w-sm truncate">{lead.message}</td>
                          <td className="p-4 text-gray-500">{new Date(lead.timestamp).toLocaleString('he-IL')}</td>
                          <td className="p-4">
                            <button onClick={() => handleDeleteLead(lead.id)} className="text-red-500 hover:text-red-700">
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center p-8 text-gray-500">
                          אין לידים להצגה.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Admin;