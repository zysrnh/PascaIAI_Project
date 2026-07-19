import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';

export default function Index({ profils }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus data ini?')) {
            destroy(route('admin.profil.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-slate-800">Manajemen Profil Kampus</h2>}
        >
            <Head title="Manajemen Profil" />

            <div className="flex bg-slate-50 min-h-screen">
                <Sidebar />

                <div className="min-w-0 flex-1">
                    <div className="py-8 px-4 sm:px-6 lg:px-8">
                        <div className="mb-6 flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">Manajemen Profil</h1>
                                <p className="text-sm text-slate-500">Kelola halaman statis profil Pascasarjana</p>
                            </div>
                            <Link
                                href={route('admin.profil.create')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-[5px] font-medium text-sm transition-colors"
                            >
                                + Tambah Profil Baru
                            </Link>
                        </div>

                        <div className="bg-white rounded-[5px] shadow-sm border border-slate-200 overflow-hidden">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Judul</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Kategori</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {profils.length > 0 ? profils.map((profil) => (
                                        <tr key={profil.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-slate-900">{profil.judul}</div>
                                                <div className="text-sm text-slate-500">{profil.slug}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                    {profil.kategori}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link href={route('admin.profil.edit', profil.id)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</Link>
                                                <button onClick={() => handleDelete(profil.id)} className="text-red-600 hover:text-red-900">Hapus</button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-4 text-center text-sm text-slate-500">Belum ada data profil.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
