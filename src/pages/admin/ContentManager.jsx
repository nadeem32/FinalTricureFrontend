import React, { useState, useEffect } from 'react';
import { getFaqs, createFaq, deleteFaq } from '../../services/api';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const ContentManager = () => {
    const [faqs, setFaqs] = useState([]);
    const [newFaq, setNewFaq] = useState({ question: '', answer: '' });

    useEffect(() => {
        loadFaqs();
    }, []);

    const loadFaqs = async () => {
        const res = await getFaqs();
        setFaqs(res.data);
    };

    const handleAddFaq = async (e) => {
        e.preventDefault();
        await createFaq(newFaq);
        setNewFaq({ question: '', answer: '' });
        loadFaqs();
    };

    const handleDeleteFaq = async (id) => {
        if (window.confirm('Delete this FAQ?')) {
            await deleteFaq(id);
            loadFaqs();
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Content Manager</h1>

            {/* FAQ Section */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-6">
                    <form onSubmit={handleAddFaq} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Question"
                            className="w-full rounded-lg border-slate-300"
                            value={newFaq.question}
                            onChange={e => setNewFaq({ ...newFaq, question: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Answer"
                            className="w-full rounded-lg border-slate-300"
                            value={newFaq.answer}
                            onChange={e => setNewFaq({ ...newFaq, answer: e.target.value })}
                            required
                        />
                        <button type="submit" className="bg-primary text-white py-2 px-4 rounded-lg flex items-center">
                            <PlusIcon className="w-5 h-5 mr-2" /> Add FAQ
                        </button>
                    </form>
                </div>

                <div className="space-y-4">
                    {faqs.map(faq => (
                        <div key={faq.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative group">
                            <button
                                onClick={() => handleDeleteFaq(faq.id)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                            <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                            <p className="text-slate-600">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContentManager;
