import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Admin/Sidebar';
import { MessageSquare, Search, Trash2, Mail } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Index({ auth, konsultasi }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Hapus Pesan?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#059669',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.konsultasi.destroy', id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Berhasil!',
                            text: 'Pesan berhasil dihapus.',
                            timer: 2000,
                            showConfirmButton: false
                        });
                    }
                });
            }
        });
    };

    const handleWaReply = (phone) => {
        const adminPhone = phone.replace(/^0/, '62');
        window.open(`https://wa.me/${adminPhone}`, '_blank');
    };

    const filteredData = konsultasi.data.filter(item => 
        item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.no_hp.includes(searchTerm) ||
        item.pesan.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-emerald-50 leading-tight">Konsultasi PMB</h2>}
        >
            <Head title="Konsultasi PMB - Admin Pascasarjana" />

            <div className="flex h-[calc(100vh-4rem)]">
                <Sidebar />
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
                    <div className="max-w-7xl mx-auto space-y-6">
                        
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-800">Daftar Konsultasi Pendaftaran</h1>
                                    <p className="text-sm text-slate-500">Pesan dan pertanyaan dari calon pendaftar via WhatsApp</p>
                                </div>
                            </div>
                            
                            <div className="relative w-full sm:w-64">
                                <input 
                                    type="text" 
                                    placeholder="Cari nama, no hp, pesan..." 
                                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full whitespace-nowrap text-left text-sm">
                                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                                        <tr>
                                            <th className="px-6 py-4">Tanggal</th>
                                            <th className="px-6 py-4">Nama Pendaftar</th>
                                            <th className="px-6 py-4">Pesan</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredData.length > 0 ? (
                                            filteredData.map((item) => (
                                                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                                                    <td className="px-6 py-4 text-slate-500">
                                                        {new Date(item.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="font-bold text-slate-800">{item.nama}</div>
                                                        <div className="text-emerald-600 flex items-center gap-1 mt-1 font-medium">
                                                            <i className="fa-brands fa-whatsapp text-xs"></i> {item.no_hp}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="max-w-md whitespace-normal text-slate-600 text-sm line-clamp-2" title={item.pesan}>
                                                            {item.pesan}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button 
                                                                onClick={() => handleWaReply(item.no_hp)}
                                                                className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
                                                                title="Balas via WhatsApp"
                                                            >
                                                                <Mail className="w-4 h-4" />
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDelete(item.id)}
                                                                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                                                title="Hapus"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-12 text-center">
                                                    <div className="flex flex-col items-center justify-center text-slate-400">
                                                        <MessageSquare className="w-12 h-12 mb-3 text-slate-300" />
                                                        <p className="font-medium text-slate-500">Belum ada data konsultasi pendaftaran.</p>
                                                        <p className="text-xs mt-1">Data akan muncul setelah ada yang mengirim pertanyaan dari website.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
