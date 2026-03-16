import React, { useState, useEffect } from 'react';
import { getTeam, createTeamMember, deleteTeamMember } from '../../services/api';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const TeamManager = () => {
    const [team, setTeam] = useState([]);
    const [newMember, setNewMember] = useState({ name: '', role: '', bio: '' });

    useEffect(() => {
        loadTeam();
    }, []);

    const loadTeam = async () => {
        const res = await getTeam();
        setTeam(res.data);
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        await createTeamMember(newMember);
        setNewMember({ name: '', role: '', bio: '' });
        loadTeam();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Remove this team member?')) {
            await deleteTeamMember(id);
            loadTeam();
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Manage Team</h1>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8">
                <h2 className="text-lg font-semibold mb-4">Add Team Member</h2>
                <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="rounded-lg border-slate-300"
                        value={newMember.name}
                        onChange={e => setNewMember({ ...newMember, name: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Role"
                        className="rounded-lg border-slate-300"
                        value={newMember.role}
                        onChange={e => setNewMember({ ...newMember, role: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Bio"
                        className="rounded-lg border-slate-300 md:col-span-2"
                        value={newMember.bio}
                        onChange={e => setNewMember({ ...newMember, bio: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Image URL (e.g., https://example.com/photo.jpg)"
                        className="rounded-lg border-slate-300 md:col-span-2"
                        value={newMember.imageUrl || ''}
                        onChange={e => setNewMember({ ...newMember, imageUrl: e.target.value })}
                    />
                    <button type="submit" className="bg-primary text-white py-2 px-4 rounded-lg md:col-span-2 flex justify-center items-center">
                        <PlusIcon className="w-5 h-5 mr-2" /> Add Member
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map(member => (
                    <div key={member.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4 relative group">
                        <button
                            onClick={() => handleDelete(member.id)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <TrashIcon className="w-5 h-5" />
                        </button>
                        <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-xl font-bold text-slate-500">
                            {member.name[0]}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">{member.name}</h3>
                            <p className="text-primary text-sm">{member.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamManager;
