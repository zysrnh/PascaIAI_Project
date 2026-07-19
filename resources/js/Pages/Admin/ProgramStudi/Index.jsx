import React, { useState, useEffect } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Admin/Sidebar';
import { Building2, Plus, Pencil, Trash2, X, Save, ImageIcon, Search, GraduationCap } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Index({ programStudis, fakultas, pengaturan }) {
    const { flash } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const form = useForm({
        nama: '',
        kode: '',
        jenjang: 'S2',
        fakultas_id: fakultas.length > 0 ? fakultas[0].id : '',
        gelar_lulusan: '',
        kaprodi: '',
        sekretaris: '',
        deskripsi: '',
        visi_misi: '',
        cpl: '',
        kurikulum_file: null,
        jumlah_mahasiswa: 0,
        jumlah_dosen: 0,
        jumlah_lulusan: 0,
        status: true,
        email: '',
        telepon: '',
        biaya_kuliah: '',
    });

    const pengaturanForm = useForm({
        banner_image: null,
    });

    const filteredProdi = programStudis.filter(prodi => 
        prodi.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prodi.kaprodi.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openModal = (prodi = null) => {
        if (prodi) {
            setIsEditing(true);
            setEditingId(prodi.id);
            form.setData({
                nama: prodi.nama || '',
                kode: prodi.kode || '',
                jenjang: prodi.jenjang || 'S2',
                fakultas_id: prodi.fakultas_id || (fakultas.length > 0 ? fakultas[0].id : ''),
                gelar_lulusan: prodi.gelar_lulusan || '',
                kaprodi: prodi.kaprodi || '',
                sekretaris: prodi.sekretaris || '',
                deskripsi: prodi.deskripsi || '',
                visi_misi: prodi.visi_misi || '',
                cpl: prodi.cpl || '',
                kurikulum_file: null,
                jumlah_mahasiswa: prodi.jumlah_mahasiswa || 0,
                jumlah_dosen: prodi.jumlah_dosen || 0,
                jumlah_lulusan: prodi.jumlah_lulusan || 0,
                status: prodi.status,
                email: prodi.email || '',
                telepon: prodi.telepon || '',
                biaya_kuliah: prodi.biaya_kuliah || '',
            });
        } else {
            setIsEditing(false);
            setEditingId(null);
            form.reset();
        }
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setIsEditing(false);
            setEditingId(null);
            form.reset();
            form.clearErrors();
        }, 300);
        document.body.style.overflow = 'unset';
    };

    const submit = (e) => {
        e.preventDefault();
        
        if (isEditing) {
            form.post(route('admin.program_studi.update', editingId), {
                onSuccess: () => closeModal(),
            });
        } else {
            form.post(route('admin.program_studi.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Hapus Program Studi?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                form.delete(route('admin.program_studi.destroy', id));
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Kelola Program Studi" />

            <div className="flex min-h-screen bg-slate-50">
                <Sidebar />
                <div className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* Header Actions */}
                        <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-800">Daftar Program Studi</h1>
                                    <p className="text-sm text-slate-500">Kelola data program studi dan informasi pimpinan prodi</p>
                                </div>
                            </div>
                            <button
                                onClick={() => openModal()}
                                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold shadow-sm"
                            >
                                <Plus className="w-5 h-5" />
                                Tambah Prodi
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
                                pengaturanForm.post(route('admin.program_studi.pengaturan'), {
                                    preserveScroll: true
                                });
                            }} className="flex items-end gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Upload Gambar Banner Baru</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => pengaturanForm.setData('banner_image', e.target.files[0])}
                                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-slate-200 rounded-lg"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={pengaturanForm.processing}
                                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors disabled:opacity-50 h-[46px]"
                                >
                                    Simpan Banner
                                </button>
                            </form>
                            
                            {pengaturan?.banner_image && (
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-slate-700 mb-2">Banner Saat Ini:</p>
                                    <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-200">
                                        <img src={`/storage/${pengaturan.banner_image}`} alt="Banner" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* List Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                <h2 className="text-lg font-bold text-slate-800">Data Program Studi</h2>
                                
                                <div className="relative w-64">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-4 w-4 text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Cari prodi atau nama kaprodi..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-slate-500 bg-slate-50/50 uppercase">
                                        <tr>
                                            <th className="px-6 py-4 font-bold tracking-wider">Nama Program Studi</th>
                                            <th className="px-6 py-4 font-bold tracking-wider">Kaprodi</th>
                                            <th className="px-6 py-4 font-bold tracking-wider">Fakultas Induk</th>
                                            <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                                            <th className="px-6 py-4 font-bold tracking-wider text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredProdi.length > 0 ? filteredProdi.map((prodi) => (
                                            <tr key={prodi.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                                            <GraduationCap className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-800">{prodi.nama}</p>
                                                            <p className="text-xs text-slate-500">Jenjang: {prodi.jenjang} • Gelar: {prodi.gelar_lulusan}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-slate-700 font-medium">{prodi.kaprodi}</div>
                                                    {prodi.sekretaris && <div className="text-xs text-slate-500">Sek: {prodi.sekretaris}</div>}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full text-xs font-medium inline-block">
                                                        {prodi.fakultas?.nama || '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                        prodi.status 
                                                        ? 'bg-emerald-100 text-emerald-700' 
                                                        : 'bg-slate-100 text-slate-600'
                                                    }`}>
                                                        {prodi.status ? 'Aktif' : 'Nonaktif'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => openModal(prodi)}
                                                            className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Pencil className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(prodi.id)}
                                                            className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                                            title="Hapus"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-12 text-center">
                                                    <div className="flex flex-col items-center justify-center text-slate-400">
                                                        <GraduationCap className="w-12 h-12 mb-3 text-slate-300" />
                                                        <p className="text-base font-medium text-slate-600 mb-1">Belum ada data program studi</p>
                                                        <p className="text-sm">Silakan tambah data prodi baru untuk mulai mengelola.</p>
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

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-slate-900/50 backdrop-blur-sm p-4 md:p-0 transition-opacity">
                    <div className="relative w-full max-w-4xl max-h-full animate-modal">
                        <div className="relative bg-white rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
                                <h3 className="text-xl font-bold text-slate-800">
                                    {isEditing ? 'Edit Data Program Studi' : 'Tambah Program Studi Baru'}
                                </h3>
                                <button
                                    onClick={closeModal}
                                    className="text-slate-400 bg-transparent hover:bg-slate-100 hover:text-slate-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 overflow-y-auto space-y-6">
                                <form id="prodiForm" onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2 text-sm font-semibold text-emerald-700 bg-emerald-50 py-2 px-4 rounded-lg">Data Dasar</div>
                                    
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-bold text-slate-700">Nama Program Studi *</label>
                                        <input
                                            type="text"
                                            value={form.data.nama}
                                            onChange={e => form.setData('nama', e.target.value)}
                                            className="w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                            required
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Jenjang *</label>
                                        <select
                                            value={form.data.jenjang}
                                            onChange={e => form.setData('jenjang', e.target.value)}
                                            className="w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                            required
                                        >
                                            <option value="S2">S2 (Magister)</option>
                                            <option value="S3">S3 (Doktor)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Fakultas Induk *</label>
                                        <select
                                            value={form.data.fakultas_id}
                                            onChange={e => form.setData('fakultas_id', e.target.value)}
                                            className="w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                            required
                                        >
                                            {fakultas.map(f => (
                                                <option key={f.id} value={f.id}>{f.nama}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Gelar Lulusan *</label>
                                        <input
                                            type="text"
                                            value={form.data.gelar_lulusan}
                                            onChange={e => form.setData('gelar_lulusan', e.target.value)}
                                            className="w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                            placeholder="Cth: M.Pd., M.H."
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Kode Prodi</label>
                                        <input
                                            type="text"
                                            value={form.data.kode}
                                            onChange={e => form.setData('kode', e.target.value)}
                                            className="w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                            placeholder="Opsional"
                                        />
                                    </div>

                                    <div className="md:col-span-2 text-sm font-semibold text-emerald-700 bg-emerald-50 py-2 px-4 rounded-lg mt-4">Kepemimpinan</div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Ketua Prodi (Kaprodi) *</label>
                                        <input
                                            type="text"
                                            value={form.data.kaprodi}
                                            onChange={e => form.setData('kaprodi', e.target.value)}
                                            className="w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Sekretaris Prodi</label>
                                        <input
                                            type="text"
                                            value={form.data.sekretaris}
                                            onChange={e => form.setData('sekretaris', e.target.value)}
                                            className="w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        />
                                    </div>

                                    <div className="md:col-span-2 text-sm font-semibold text-emerald-700 bg-emerald-50 py-2 px-4 rounded-lg mt-4">Profil Akademik</div>

                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Deskripsi / Profil Singkat</label>
                                        <textarea
                                            value={form.data.deskripsi}
                                            onChange={e => form.setData('deskripsi', e.target.value)}
                                            rows="3"
                                            className="w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        ></textarea>
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Visi & Misi Prodi</label>
                                        <textarea
                                            value={form.data.visi_misi}
                                            onChange={e => form.setData('visi_misi', e.target.value)}
                                            rows="3"
                                            className="w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        ></textarea>
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Capaian Pembelajaran Lulusan (CPL)</label>
                                        <textarea
                                            value={form.data.cpl}
                                            onChange={e => form.setData('cpl', e.target.value)}
                                            rows="3"
                                            className="w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        ></textarea>
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-bold text-slate-700">File Kurikulum (PDF, opsional)</label>
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            onChange={e => form.setData('kurikulum_file', e.target.files[0])}
                                            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700"
                                        />
                                    </div>

                                    <div className="md:col-span-2 text-sm font-semibold text-emerald-700 bg-emerald-50 py-2 px-4 rounded-lg mt-4">Statistik & Operasional</div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Jumlah Mahasiswa Aktif</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={form.data.jumlah_mahasiswa}
                                            onChange={e => form.setData('jumlah_mahasiswa', e.target.value)}
                                            className="w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Jumlah Dosen Tetap</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={form.data.jumlah_dosen}
                                            onChange={e => form.setData('jumlah_dosen', e.target.value)}
                                            className="w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Jumlah Lulusan / Alumni</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={form.data.jumlah_lulusan}
                                            onChange={e => form.setData('jumlah_lulusan', e.target.value)}
                                            className="w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Status Aktif</label>
                                        <select
                                            value={form.data.status ? '1' : '0'}
                                            onChange={e => form.setData('status', e.target.value === '1')}
                                            className="w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        >
                                            <option value="1">Aktif</option>
                                            <option value="0">Nonaktif</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Biaya Kuliah (opsional)</label>
                                        <input
                                            type="text"
                                            value={form.data.biaya_kuliah}
                                            onChange={e => form.setData('biaya_kuliah', e.target.value)}
                                            className="w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                            placeholder="Cth: Rp 5.000.000 / semester"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Email Prodi (opsional)</label>
                                        <input
                                            type="email"
                                            value={form.data.email}
                                            onChange={e => form.setData('email', e.target.value)}
                                            className="w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        />
                                    </div>
                                </form>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex items-center justify-end p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl shrink-0 gap-3">
                                <button
                                    onClick={closeModal}
                                    type="button"
                                    className="px-5 py-2.5 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 font-semibold transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    form="prodiForm"
                                    type="submit"
                                    disabled={form.processing}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold transition-colors disabled:opacity-50"
                                >
                                    <Save className="w-5 h-5" />
                                    {isEditing ? 'Simpan Perubahan' : 'Simpan Prodi'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
