import React, { useState } from 'react';
import { forgotPassword } from '../services/ApiService';
import { toast } from 'react-hot-toast'; // Assuming you use this library

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const result = await forgotPassword(email);
      
      if (result?.success) {
        toast.success("Check your email for the reset token.");
        setStatus('success');
      } else {
        throw new Error(result?.message || "Error sending email.");
      }
    } catch (err) {
      setStatus('error');
      toast.error(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Reset your password</h2>
      
      {status === 'success' ? (
        <p className="text-green-600 text-center font-medium">
          Check your inbox! We've sent a link to reset your password.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-gray-600 text-sm">
            Enter your email to receive instructions.
          </p>
          
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="yourname@example.com"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            {status === 'loading' ? 'Sending...' : 'Send reset link'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;