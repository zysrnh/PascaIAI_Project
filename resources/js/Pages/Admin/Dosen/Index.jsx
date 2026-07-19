import React, { useState } from 'react';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Admin/Sidebar';
import { Users, Plus, Pencil, Trash2, X, Save, ImageIcon, Search, GraduationCap } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Index({ dosens, programStudis, pengaturan }) {
    const { auth } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const form = useForm({
        nama: '',
        nidn: '',
        nip: '',
        program_studi_id: programStudis.length > 0 ? programStudis[0].id : '',
        jabatan_fungsional: 'Tenaga Pengajar',
        pendidikan_terakhir: 'S2',
        bidang_keahlian: '',
        sinta_url: '',
        scopus_url: '',
        gscholar_url: '',
        status_aktif: true,
        foto: null,
    });

    const pengaturanForm = useForm({
        banner_image: null,
    });

    const filteredDosens = dosens.filter(dosen => 
        dosen.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (dosen.nidn && dosen.nidn.includes(searchQuery))
    );

    const openModal = (dosen = null) => {
        if (dosen) {
            setIsEditing(true);
            setEditId(dosen.id);
            form.setData({
                nama: dosen.nama || '',
                nidn: dosen.nidn || '',
                nip: dosen.nip || '',
                program_studi_id: dosen.program_studi_id || (programStudis.length > 0 ? programStudis[0].id : ''),
                jabatan_fungsional: dosen.jabatan_fungsional || 'Tenaga Pengajar',
                pendidikan_terakhir: dosen.pendidikan_terakhir || 'S2',
                bidang_keahlian: dosen.bidang_keahlian || '',
                sinta_url: dosen.sinta_url || '',
                scopus_url: dosen.scopus_url || '',
                gscholar_url: dosen.gscholar_url || '',
                status_aktif: dosen.status_aktif,
                foto: null,
            });
        } else {
            setIsEditing(false);
            setEditId(null);
            form.reset();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        form.reset();
        form.clearErrors();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            form.post(route('admin.dosen.update', editId), {
                onSuccess: () => closeModal(),
            });
        } else {
            form.post(route('admin.dosen.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Data dosen akan dihapus permanen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.dosen.destroy', id), {
                    preserveScroll: true,
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-white">Kelola Data Dosen</h2>}
        >
            <Head title="Kelola Data Dosen" />

            <div className="flex min-h-screen bg-slate-50">
                <Sidebar />
                <div className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* Header Actions */}
                        <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-800">Kelola Data Dosen</h1>
                                    <p className="text-sm text-slate-500">Kelola data seluruh dosen pengajar</p>
                                </div>
                            </div>
                            <button
                                onClick={() => openModal()}
                                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold shadow-sm"
                            >
                                <Plus className="w-5 h-5" />
                                Tambah Dosen
                            </button>
                        </div>

                        {/* Pengaturan Banner */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                    <ImageIcon className="w-5 h-5" />
                                </div>
                                <h2 className="text-lg font-bold text-slate-800">Banner Halaman Publik</h2>
                            </div>
                            
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                pengaturanForm.post(route('admin.dosen.pengaturan'), {
                                    preserveScroll: true,
                                    onSuccess: () => {
                                        pengaturanForm.reset();
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Berhasil',
                                            text: 'Banner halaman berhasil diperbarui!',
                                            toast: true,
                                            position: 'top-end',
                                            showConfirmButton: false,
                                            timer: 3000
                                        });
                                    }
                                });
                            }} className="flex items-end gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Upload Banner Baru (Opsional, max 2MB)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => pengaturanForm.setData('banner_image', e.target.files[0])}
                                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 border border-slate-200 rounded-lg"
                                    />
                                    {pengaturanForm.errors.banner_image && (
                                        <p className="mt-1 text-sm text-red-600">{pengaturanForm.errors.banner_image}</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={pengaturanForm.processing}
                                    className="flex items-center gap-2 px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors font-medium h-[42px]"
                                >
                                    <Save className="w-4 h-4" />
                                    Simpan Banner
                                </button>
                            </form>
                            
                            {pengaturan?.banner_image && (
                                <div className="mt-4 border border-slate-200 rounded-lg overflow-hidden relative group">
                                    <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm z-10">Banner Saat Ini</div>
                                    <img 
                                        src={pengaturan.banner_image} 
                                        alt="Banner Preview" 
                                        className="w-full h-48 object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Table Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                                <h2 className="text-lg font-bold text-slate-800">Data Dosen</h2>
                                <div className="relative">
                                    <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        placeholder="Cari dosen..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-64"
                                    />
                                </div>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-slate-600">
                                    <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                                        <tr>
                                            <th className="px-6 py-4">Nama Dosen</th>
                                            <th className="px-6 py-4">NIDN</th>
                                            <th className="px-6 py-4">Program Studi</th>
                                            <th className="px-6 py-4">Jabatan</th>
                                            <th className="px-6 py-4 text-center">Status</th>
                                            <th className="px-6 py-4 text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredDosens.length > 0 ? filteredDosens.map((dosen) => (
                                            <tr key={dosen.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-slate-800 text-base">{dosen.nama}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-slate-700">{dosen.nidn || '-'}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {dosen.program_studi ? (
                                                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md text-xs font-semibold">
                                                            {dosen.program_studi.nama}
                                                        </span>
                                                    ) : (
                                                        '-'
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-slate-600">{dosen.jabatan_fungsional}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${dosen.status_aktif ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                                        {dosen.status_aktif ? 'Aktif' : 'Non-Aktif'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => openModal(dosen)}
                                                            className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Pencil className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(dosen.id)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Hapus"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                                                    Tidak ada data dosen yang ditemukan.
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

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h3 className="text-xl font-bold text-slate-800">
                                {isEditing ? 'Edit Data Dosen' : 'Tambah Dosen Baru'}
                            </h3>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto flex-1">
                            <form id="dosenForm" onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap & Gelar *</label>
                                        <input
                                            type="text"
                                            value={form.data.nama}
                                            onChange={e => form.setData('nama', e.target.value)}
                                            className="w-full border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                            required
                                        />
                                        {form.errors.nama && <p className="mt-1 text-sm text-red-600">{form.errors.nama}</p>}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">NIDN</label>
                                        <input
                                            type="text"
                                            value={form.data.nidn}
                                            onChange={e => form.setData('nidn', e.target.value)}
                                            className="w-full border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">NIP</label>
                                        <input
                                            type="text"
                                            value={form.data.nip}
                                            onChange={e => form.setData('nip', e.target.value)}
                                            className="w-full border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Program Studi</label>
                                        <select
                                            value={form.data.program_studi_id}
                                            onChange={e => form.setData('program_studi_id', e.target.value)}
                                            className="w-full border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        >
                                            <option value="">-- Pilih Program Studi --</option>
                                            {programStudis.map(prodi => (
                                                <option key={prodi.id} value={prodi.id}>{prodi.nama}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Jabatan Fungsional</label>
                                        <select
                                            value={form.data.jabatan_fungsional}
                                            onChange={e => form.setData('jabatan_fungsional', e.target.value)}
                                            className="w-full border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        >
                                            <option value="Guru Besar">Guru Besar</option>
                                            <option value="Lektor Kepala">Lektor Kepala</option>
                                            <option value="Lektor">Lektor</option>
                                            <option value="Asisten Ahli">Asisten Ahli</option>
                                            <option value="Tenaga Pengajar">Tenaga Pengajar</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Pendidikan Terakhir</label>
                                        <select
                                            value={form.data.pendidikan_terakhir}
                                            onChange={e => form.setData('pendidikan_terakhir', e.target.value)}
                                            className="w-full border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        >
                                            <option value="S2">S2 (Magister)</option>
                                            <option value="S3">S3 (Doktor)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Bidang Keahlian</label>
                                        <input
                                            type="text"
                                            value={form.data.bidang_keahlian}
                                            onChange={e => form.setData('bidang_keahlian', e.target.value)}
                                            className="w-full border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <div className="border-t border-slate-200 my-4"></div>
                                        <h4 className="text-sm font-bold text-slate-700 mb-4">Tautan Akademik</h4>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">URL SINTA</label>
                                        <input
                                            type="url"
                                            value={form.data.sinta_url}
                                            onChange={e => form.setData('sinta_url', e.target.value)}
                                            className="w-full border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                            placeholder="https://sinta.kemdikbud.go.id/..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">URL Scopus</label>
                                        <input
                                            type="url"
                                            value={form.data.scopus_url}
                                            onChange={e => form.setData('scopus_url', e.target.value)}
                                            className="w-full border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                            placeholder="https://scopus.com/..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">URL Google Scholar</label>
                                        <input
                                            type="url"
                                            value={form.data.gscholar_url}
                                            onChange={e => form.setData('gscholar_url', e.target.value)}
                                            className="w-full border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                            placeholder="https://scholar.google.com/..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Status Dosen</label>
                                        <div className="flex items-center gap-4 mt-2">
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    checked={form.data.status_aktif === true}
                                                    onChange={() => form.setData('status_aktif', true)}
                                                    className="text-emerald-600 focus:ring-emerald-500"
                                                />
                                                <span className="text-sm">Aktif</span>
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    checked={form.data.status_aktif === false}
                                                    onChange={() => form.setData('status_aktif', false)}
                                                    className="text-red-600 focus:ring-red-500"
                                                />
                                                <span className="text-sm">Non-Aktif</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Foto Dosen
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => form.setData('foto', e.target.files[0])}
                                            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 border border-slate-200 rounded-lg"
                                        />
                                        {form.errors.foto && <p className="mt-1 text-sm text-red-600">{form.errors.foto}</p>}
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                form="dosenForm"
                                disabled={form.processing}
                                className="px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                Simpan Data
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
