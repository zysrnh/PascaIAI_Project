import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Admin/Sidebar';
import PrimaryButton from '@/Components/PrimaryButton';
import { Plus, Edit, Trash2, Users } from 'lucide-react';

export default function Index({ auth, organisasi }) {
    const { delete: destroy } = useForm();
    const [isLoaded, setIsLoaded] = useState(true);

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus anggota struktur ini?')) {
            destroy(route('admin.profil.struktur-organisasi.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-white">Manajemen Profil: Struktur Organisasi</h2>}
        >
            <Head title="Kelola Struktur Organisasi" />

            <div className="flex bg-slate-50 min-h-screen">
                <Sidebar />

                <div className={`min-w-0 flex-1 transition-all duration-700 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="py-8 px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">Struktur Organisasi</h1>
                                <p className="text-sm text-slate-500">Kelola daftar pimpinan dan pengurus Pascasarjana IAI Persis Bandung.</p>
                            </div>
                            <Link href={route('admin.profil.struktur-organisasi.create')}>
                                <PrimaryButton className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                                    <Plus className="w-4 h-4" />
                                    Tambah Anggota
                                </PrimaryButton>
                            </Link>
                        </div>

                        {/* Visualisasi Organogram */}
                        <div className="bg-white rounded-[5px] shadow-sm border border-slate-200 overflow-x-auto mb-8 p-6">
                            <h3 className="text-lg font-bold text-slate-800 mb-2">Visualisasi Struktur</h3>
                            <p className="text-sm text-slate-500 mb-6">Bagan organisasi berdasarkan urutan (1 teratas, 2-3 lapis kedua, sisanya lapis bawah).</p>
                            
                            {organisasi && organisasi.length > 0 ? (
                                <div className="min-w-[800px] flex flex-col items-center">
                                    <style dangerouslySetInnerHTML={{__html: `
                                        .admin-org ul { padding-top: 20px; position: relative; display: flex; justify-content: center; }
                                        .admin-org li { float: left; text-align: center; list-style-type: none; position: relative; padding: 20px 10px 0 10px; }
                                        .admin-org li::before, .admin-org li::after { content: ''; position: absolute; top: 0; right: 50%; border-top: 2px solid #cbd5e1; width: 50%; height: 20px; }
                                        .admin-org li::after { right: auto; left: 50%; border-left: 2px solid #cbd5e1; }
                                        .admin-org li:only-child::after, .admin-org li:only-child::before { display: none; }
                                        .admin-org li:only-child { padding-top: 0; }
                                        .admin-org li:first-child::before, .admin-org li:last-child::after { border: 0 none; }
                                        .admin-org li:last-child::before { border-right: 2px solid #cbd5e1; border-radius: 0 5px 0 0; }
                                        .admin-org li:first-child::after { border-radius: 5px 0 0 0; }
                                        .admin-org ul ul::before { content: ''; position: absolute; top: 0; left: 50%; border-left: 2px solid #cbd5e1; width: 0; height: 20px; }
                                    `}} />

                                    <div className="admin-org">
                                        <ul>
                                            <li>
                                                <div className="inline-flex flex-col items-center bg-white rounded-lg shadow-sm border-2 border-emerald-500 p-4 w-48 relative z-10 group hover:shadow-md transition-shadow">
                                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-20">
                                                        {organisasi[0].urutan}
                                                    </div>
                                                    <div className="w-16 h-16 mb-2 rounded-full overflow-hidden border-2 border-emerald-100 relative">
                                                        {organisasi[0].foto ? <img src={organisasi[0].foto} className="w-full h-full object-cover" /> : <Users className="w-8 h-8 m-auto text-slate-300 mt-4" />}
                                                    </div>
                                                    <h3 className="text-sm font-bold text-slate-800 mb-0.5 leading-tight">{organisasi[0].nama}</h3>
                                                    <p className="text-[11px] text-slate-500">{organisasi[0].jabatan}</p>
                                                    
                                                    <Link href={`${route('admin.profil.struktur-organisasi.create')}?urutan=${organisasi[0].urutan + 1}`} className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border border-slate-300 rounded-full flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-500 hover:shadow-sm transition-all z-20" title="Tambah Bawahan">
                                                        <Plus className="w-3 h-3" />
                                                    </Link>
                                                </div>
                                                
                                                {organisasi.length > 1 && (
                                                    <ul>
                                                        {organisasi.slice(1, 3).map((item, idx) => (
                                                            <li key={item.id}>
                                                                <div className="inline-flex flex-col items-center bg-white rounded-lg shadow-sm border border-slate-200 p-3 w-44 relative z-10 hover:border-emerald-300 transition-colors">
                                                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-slate-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-20">
                                                                        {item.urutan}
                                                                    </div>
                                                                    <div className="w-12 h-12 mb-2 rounded-full overflow-hidden border border-slate-100 relative">
                                                                        {item.foto ? <img src={item.foto} className="w-full h-full object-cover" /> : <Users className="w-6 h-6 m-auto text-slate-300 mt-3" />}
                                                                    </div>
                                                                    <h3 className="text-xs font-bold text-slate-700 mb-0.5 leading-tight">{item.nama}</h3>
                                                                    <p className="text-[10px] text-slate-500">{item.jabatan}</p>

                                                                    <Link href={`${route('admin.profil.struktur-organisasi.create')}?urutan=${item.urutan + 2}`} className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-white border border-slate-300 rounded-full flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-500 hover:shadow-sm transition-all z-20" title="Tambah Bawahan">
                                                                        <Plus className="w-3 h-3" />
                                                                    </Link>
                                                                    
                                                                    <Link href={`${route('admin.profil.struktur-organisasi.create')}?urutan=${item.urutan}`} className="absolute top-1/2 -right-2.5 -translate-y-1/2 w-5 h-5 bg-white border border-slate-300 rounded-full flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-500 hover:shadow-sm transition-all z-20" title="Tambah Sejajar">
                                                                        <Plus className="w-3 h-3" />
                                                                    </Link>
                                                                </div>
                                                                
                                                                {organisasi.length > 3 && (
                                                                    <ul>
                                                                        {idx === 0 
                                                                            ? organisasi.slice(3, 5).map(subItem => (
                                                                                <li key={subItem.id}>
                                                                                    <div className="inline-flex flex-col items-center bg-white rounded-md shadow-sm border border-slate-100 p-2 w-36 relative z-10">
                                                                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-slate-400 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full z-20">
                                                                                            {subItem.urutan}
                                                                                        </div>
                                                                                        <h3 className="text-[11px] font-bold text-slate-700 mb-0.5 leading-tight">{subItem.nama}</h3>
                                                                                        <p className="text-[9px] text-slate-400">{subItem.jabatan}</p>
                                                                                    </div>
                                                                                </li>
                                                                            ))
                                                                            : organisasi.slice(5).map(subItem => (
                                                                                <li key={subItem.id}>
                                                                                    <div className="inline-flex flex-col items-center bg-white rounded-md shadow-sm border border-slate-100 p-2 w-36 relative z-10">
                                                                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-slate-400 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full z-20">
                                                                                            {subItem.urutan}
                                                                                        </div>
                                                                                        <h3 className="text-[11px] font-bold text-slate-700 mb-0.5 leading-tight">{subItem.nama}</h3>
                                                                                        <p className="text-[9px] text-slate-400">{subItem.jabatan}</p>
                                                                                    </div>
                                                                                </li>
                                                                            ))
                                                                        }
                                                                    </ul>
                                                                )}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-slate-500">Belum ada struktur organisasi.</p>
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-[5px] shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                                <h3 className="font-bold text-slate-700">Daftar Tabel Anggota</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="px-6 py-4">Urutan</th>
                                            <th className="px-6 py-4">Foto</th>
                                            <th className="px-6 py-4">Nama Lengkap</th>
                                            <th className="px-6 py-4">Jabatan</th>
                                            <th className="px-6 py-4 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {organisasi.length > 0 ? (
                                            organisasi.map((item) => (
                                                <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                                                    <td className="px-6 py-4 font-semibold text-slate-900 text-center w-16">
                                                        {item.urutan}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {item.foto ? (
                                                            <img src={item.foto} alt={item.nama} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                                                        ) : (
                                                            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center border border-slate-200">
                                                                <Users className="w-6 h-6" />
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 font-medium text-slate-900">
                                                        {item.nama}
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-600">
                                                        {item.jabatan}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex justify-end gap-2">
                                                            <Link href={route('admin.profil.struktur-organisasi.edit', item.id)}>
                                                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-[5px] transition-colors border border-transparent hover:border-blue-100" title="Edit">
                                                                    <Edit className="w-4 h-4" />
                                                                </button>
                                                            </Link>
                                                            <button 
                                                                onClick={() => handleDelete(item.id)}
                                                                className="p-2 text-red-600 hover:bg-red-50 rounded-[5px] transition-colors border border-transparent hover:border-red-100" 
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
                                                <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                                    Belum ada data anggota struktur organisasi. Silakan tambah data baru.
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
