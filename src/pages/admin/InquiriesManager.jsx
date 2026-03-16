import React, { useState, useEffect } from 'react';
import { getInquiries, markInquiryRead } from '../../services/api';
import { EnvelopeIcon, EnvelopeOpenIcon } from '@heroicons/react/24/outline';

const InquiriesManager = () => {
    const [inquiries, setInquiries] = useState([]);

    useEffect(() => {
        loadInquiries();
    }, []);

    const loadInquiries = async () => {
        const res = await getInquiries();
        // Sort by newest first
        setInquiries(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    };

    const handleMarkRead = async (id) => {
        await markInquiryRead(id);
        loadInquiries();
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Inquiries Inbox</h1>

            <div className="space-y-4">
                {inquiries.map(inquiry => (
                    <div
                        key={inquiry.id}
                        className={`bg-white p-6 rounded-xl shadow-sm border transition-all ${inquiry.isRead ? 'border-slate-200 opacity-75' : 'border-primary/50 shadow-md'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center">
                                {inquiry.isRead ? (
                                    <EnvelopeOpenIcon className="w-6 h-6 text-slate-400 mr-3" />
                                ) : (
                                    <EnvelopeIcon className="w-6 h-6 text-primary mr-3" />
                                )}
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900">{inquiry.subject}</h3>
                                    <p className="text-sm text-slate-500">From: {inquiry.name} ({inquiry.email})</p>
                                </div>
                            </div>
                            <span className="text-xs text-slate-400">
                                {new Date(inquiry.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-slate-700 bg-slate-50 p-4 rounded-lg mb-4">
                            {inquiry.message}
                        </p>
                        {!inquiry.isRead && (
                            <button
                                onClick={() => handleMarkRead(inquiry.id)}
                                className="text-sm text-primary font-medium hover:underline"
                            >
                                Mark as Read
                            </button>
                        )}
                    </div>
                ))}
                {inquiries.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        No inquiries yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default InquiriesManager;
