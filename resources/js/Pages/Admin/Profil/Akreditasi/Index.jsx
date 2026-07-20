import React, { useState } from 'react';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import Sidebar from '@/Components/Admin/Sidebar';
import { Award, Landmark, History, Plus, FileText, Image as ImageIcon, Save, Trash2, Edit, MessageCircle, Image, Upload } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Index({ auth, institusi, prodis, riwayats, pengaturan }) {
    const [activeTab, setActiveTab] = useState('institusi');

    // Handle Delete
    const handleDelete = (id, title = 'Hapus Data') => {
        Swal.fire({
            title: title,
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#94a3b8',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                // We don't have access to Inertia.delete directly here without router, use window.location or router
                // Need to import router
                window.location.href = `/admin/profil/akreditasi/${id}?_method=DELETE`;
                // Wait, it's better to use router.delete, let's use useForm
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-white">Kelola Akreditasi</h2>}
        >
            <Head title="Kelola Akreditasi" />

            <div className="flex h-[calc(100vh-65px)] overflow-hidden bg-slate-50">
                <Sidebar />
                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="max-w-7xl mx-auto space-y-6">
                        
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">Manajemen Akreditasi</h1>
                                <p className="text-slate-500 text-sm mt-1">Kelola data akreditasi institusi, program studi, dan riwayat.</p>
                            </div>
                            <Link
                                href={route('public.akreditasi')}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg font-medium hover:bg-emerald-100 transition-colors"
                            >
                                <Award className="w-4 h-4" />
                                Lihat Halaman Publik
                            </Link>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-slate-200 bg-white px-2 pt-2 rounded-t-xl overflow-x-auto">
                            <button
                                onClick={() => setActiveTab('institusi')}
                                className={`px-4 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                                    activeTab === 'institusi' 
                                    ? 'border-emerald-500 text-emerald-600' 
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                }`}
                            >
                                <Award className="w-4 h-4" /> Institusi & Pengaturan
                            </button>
                            <button
                                onClick={() => setActiveTab('prodi')}
                                className={`px-4 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                                    activeTab === 'prodi' 
                                    ? 'border-emerald-500 text-emerald-600' 
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                }`}
                            >
                                <Landmark className="w-4 h-4" /> Program Studi
                            </button>
                            <button
                                onClick={() => setActiveTab('riwayat')}
                                className={`px-4 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                                    activeTab === 'riwayat' 
                                    ? 'border-emerald-500 text-emerald-600' 
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                }`}
                            >
                                <History className="w-4 h-4" /> Riwayat
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="bg-white p-6 rounded-b-xl rounded-tr-xl shadow-sm border border-slate-200">
                            {activeTab === 'institusi' && (
                                <InstitusiTab institusi={institusi} pengaturan={pengaturan} />
                            )}
                            
                            {activeTab === 'prodi' && (
                                <ProdiTab prodis={prodis} />
                            )}
                            
                            {activeTab === 'riwayat' && (
                                <RiwayatTab riwayats={riwayats} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// ==========================================
// Tab Institusi & Pengaturan
// ==========================================
function InstitusiTab({ institusi, pengaturan }) {
    const [previewBanner, setPreviewBanner] = useState(null);
    const formInstitusi = useForm({
        peringkat: institusi?.peringkat || '',
        no_sk: institusi?.no_sk || '',
        tanggal_terbit: institusi?.tanggal_terbit || '',
        masa_berlaku: institusi?.masa_berlaku || '',
        lembaga: institusi?.lembaga || '',
        sertifikat_path: null,
        sk_path: null,
    });

    const formPengaturan = useForm({
        whatsapp_lpm: pengaturan?.whatsapp_lpm || '',
        banner_image: null,
        deskripsi: pengaturan?.deskripsi || ''
    });

    const submitInstitusi = (e) => {
        e.preventDefault();
        formInstitusi.post(route('admin.profil.akreditasi.institusi.store'), {
            preserveScroll: true,
            forceFormData: true,
            onError: (errors) => {
                const firstError = Object.values(errors)[0];
                Swal.fire({
                    title: 'Validasi Gagal!',
                    text: firstError || 'Silakan cek kembali inputan Anda (Maks. file 5MB).',
                    icon: 'error',
                    confirmButtonColor: '#ef4444'
                });
            }
        });
    };

    const submitPengaturan = (e) => {
        e.preventDefault();
        formPengaturan.post(route('admin.profil.akreditasi.pengaturan'), {
            preserveScroll: true,
            forceFormData: true,
            onError: (errors) => {
                const firstError = Object.values(errors)[0];
                Swal.fire({
                    title: 'Validasi Gagal!',
                    text: firstError || 'Silakan cek kembali inputan Anda (Maks. file 2MB).',
                    icon: 'error',
                    confirmButtonColor: '#ef4444'
                });
            }
        });
    };

    return (
        <div className="space-y-10">
            {/* Pengaturan Section */}
            <section>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-slate-200 mb-8">
                    <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Image className="w-5 h-5" /></div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Pengaturan Halaman Publik</h3>
                            <p className="text-sm text-slate-500">Atur gambar latar belakang dan konfigurasi lainnya untuk halaman Akreditasi.</p>
                        </div>
                    </div>
                    <div className="p-6">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            formPengaturan.post(route('admin.profil.akreditasi.pengaturan'), {
                                preserveScroll: true,
                                forceFormData: true,
                                onSuccess: () => {
                                    formPengaturan.reset('banner_image');
                                    setPreviewBanner(null);
                                },
                                onError: (errors) => {
                                    const firstError = Object.values(errors)[0];
                                    Swal.fire({
                                        title: 'Validasi Gagal!',
                                        text: firstError || 'Silakan cek kembali inputan Anda (Maks. file 2MB).',
                                        icon: 'error',
                                        confirmButtonColor: '#ef4444'
                                    });
                                }
                            });
                        }} className="space-y-6">
                            
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700">Gambar Banner Saat Ini</label>
                                <div className="relative w-full h-64 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                    <img 
                                        src={previewBanner ? previewBanner : (pengaturan?.banner_image ? `/storage/${pengaturan.banner_image}` : "/images/default-banner.jpg")} 
                                        alt="Preview" 
                                        className="w-full h-full object-cover" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 z-10 text-white">
                                        <h1 className="text-3xl font-extrabold mb-2 drop-shadow-md">Akreditasi</h1>
                                        <div className="w-16 h-1.5 bg-amber-500 rounded-sm mb-4"></div>
                                        {formPengaturan.data.deskripsi && (
                                            <p className="text-white/90 max-w-2xl text-sm leading-relaxed drop-shadow">
                                                {formPengaturan.data.deskripsi}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <InputLabel htmlFor="deskripsi" value="Deskripsi Halaman (Opsional)" />
                                    <textarea
                                        id="deskripsi"
                                        rows="3"
                                        className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="Tuliskan deskripsi singkat..."
                                        value={formPengaturan.data.deskripsi}
                                        onChange={e => formPengaturan.setData('deskripsi', e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700">Ganti Banner (Maks. 2MB, JPG/PNG)</label>
                                    <label className={`flex justify-center w-full h-32 px-4 transition bg-white border-2 border-slate-300 border-dashed rounded-md cursor-pointer hover:border-emerald-500 ${formPengaturan.errors.banner_image ? 'border-red-500' : ''}`}>
                                        <span className="flex items-center space-x-2">
                                            <Upload className="w-6 h-6 text-slate-600" />
                                            <span className="font-medium text-slate-600">Klik untuk mengunggah file gambar</span>
                                        </span>
                                        <input 
                                            type="file" 
                                            name="banner_image" 
                                            className="hidden" 
                                            accept="image/*" 
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    formPengaturan.setData('banner_image', file);
                                                    setPreviewBanner(URL.createObjectURL(file));
                                                }
                                            }} 
                                        />
                                    </label>
                                    {formPengaturan.errors.banner_image && <p className="text-sm text-red-600 mt-1">{formPengaturan.errors.banner_image}</p>}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Nomor WhatsApp LPM</label>
                                <div className="flex max-w-md">
                                    <span className="inline-flex items-center px-3 text-sm text-slate-500 bg-slate-100 border border-r-0 border-slate-300 rounded-l-md font-medium">
                                        +62
                                    </span>
                                    <input 
                                        type="text" 
                                        value={formPengaturan.data.whatsapp_lpm}
                                        onChange={e => formPengaturan.setData('whatsapp_lpm', e.target.value)}
                                        placeholder="81234567890"
                                        className="flex-1 min-w-0 block w-full px-3 py-2.5 rounded-none rounded-r-md border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-1.5">Digunakan untuk tombol "Hubungi LPM".</p>
                                {formPengaturan.errors.whatsapp_lpm && <p className="text-red-500 text-xs mt-1">{formPengaturan.errors.whatsapp_lpm}</p>}
                            </div>

                            <div className="flex justify-end pt-4 border-t border-slate-100">
                                <PrimaryButton type="submit" disabled={formPengaturan.processing}>
                                    Simpan Banner
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <hr className="border-slate-200" />

            {/* Institusi Section */}
            <section>
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-emerald-600" /> Akreditasi Institusi
                </h3>
                <form onSubmit={submitInstitusi} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Peringkat Akreditasi</label>
                        <select 
                            value={formInstitusi.data.peringkat}
                            onChange={e => formInstitusi.setData('peringkat', e.target.value)}
                            className="w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                        >
                            <option value="">-- Pilih Peringkat --</option>
                            <option value="Unggul">Unggul</option>
                            <option value="Baik Sekali">Baik Sekali</option>
                            <option value="Baik">Baik</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                        {formInstitusi.errors.peringkat && <p className="text-red-500 text-xs mt-1">{formInstitusi.errors.peringkat}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Lembaga Penerbit</label>
                        <input 
                            type="text" 
                            value={formInstitusi.data.lembaga}
                            onChange={e => formInstitusi.setData('lembaga', e.target.value)}
                            className="w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                            placeholder="Contoh: BAN-PT"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Nomor SK Akreditasi</label>
                        <input 
                            type="text" 
                            value={formInstitusi.data.no_sk}
                            onChange={e => formInstitusi.setData('no_sk', e.target.value)}
                            className="w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Tanggal Terbit</label>
                        <input 
                            type="date" 
                            value={formInstitusi.data.tanggal_terbit}
                            onChange={e => formInstitusi.setData('tanggal_terbit', e.target.value)}
                            className="w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Masa Berlaku S.d.</label>
                        <input 
                            type="date" 
                            value={formInstitusi.data.masa_berlaku}
                            onChange={e => formInstitusi.setData('masa_berlaku', e.target.value)}
                            className="w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Sertifikat Akreditasi (PDF, Max 5MB)</label>
                        <input 
                            type="file" 
                            accept=".pdf"
                            onChange={e => formInstitusi.setData('sertifikat_path', e.target.files[0])}
                            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700"
                        />
                        {institusi?.sertifikat_path && !formInstitusi.data.sertifikat_path && (
                            <p className="text-xs text-emerald-600 mt-2">✓ File sertifikat sudah terunggah.</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">SK Akreditasi (PDF, Max 5MB)</label>
                        <input 
                            type="file" 
                            accept=".pdf"
                            onChange={e => formInstitusi.setData('sk_path', e.target.files[0])}
                            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700"
                        />
                        {institusi?.sk_path && !formInstitusi.data.sk_path && (
                            <p className="text-xs text-emerald-600 mt-2">✓ File SK sudah terunggah.</p>
                        )}
                    </div>
                    
                    <div className="md:col-span-2 pt-4 flex justify-end">
                        <button type="submit" disabled={formInstitusi.processing} className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 flex items-center gap-2">
                            <Save className="w-5 h-5" /> Simpan Data Institusi
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

// ==========================================
// Tab Prodi
// ==========================================
function ProdiTab({ prodis }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const form = useForm({
        nama: '',
        peringkat: '',
        no_sk: '',
        masa_berlaku: '',
        lembaga: '',
    });

    const resetForm = () => {
        form.reset();
        setIsEditing(false);
        setEditId(null);
    }

    const editProdi = (p) => {
        setIsEditing(true);
        setEditId(p.id);
        form.setData({
            nama: p.nama,
            peringkat: p.peringkat,
            no_sk: p.no_sk || '',
            masa_berlaku: p.masa_berlaku || '',
            lembaga: p.lembaga || '',
        });
    }

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            form.put(route('admin.profil.akreditasi.prodi.update', editId), {
                onSuccess: () => resetForm(),
                onError: (errors) => {
                    const firstError = Object.values(errors)[0];
                    Swal.fire({ title: 'Validasi Gagal!', text: firstError || 'Cek kembali data yang dimasukkan.', icon: 'error', confirmButtonColor: '#ef4444' });
                }
            });
        } else {
            form.post(route('admin.profil.akreditasi.prodi.store'), {
                onSuccess: () => resetForm(),
                onError: (errors) => {
                    const firstError = Object.values(errors)[0];
                    Swal.fire({ title: 'Validasi Gagal!', text: firstError || 'Cek kembali data yang dimasukkan.', icon: 'error', confirmButtonColor: '#ef4444' });
                }
            });
        }
    };

    return (
        <div className="space-y-8">
            {/* Form */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <Plus className="w-4 h-4" /> {isEditing ? 'Edit Data Prodi' : 'Tambah Data Prodi'}
                </h4>
                <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Nama Program Studi</label>
                        <input required type="text" value={form.data.nama} onChange={e => form.setData('nama', e.target.value)} className="w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500" placeholder="Contoh: S2 Pendidikan Agama Islam" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Peringkat</label>
                        <select required value={form.data.peringkat} onChange={e => form.setData('peringkat', e.target.value)} className="w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500">
                            <option value="">Pilih</option>
                            <option value="Unggul">Unggul</option>
                            <option value="Baik Sekali">Baik Sekali</option>
                            <option value="Baik">Baik</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Lembaga</label>
                        <input type="text" value={form.data.lembaga} onChange={e => form.setData('lembaga', e.target.value)} className="w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500" placeholder="Contoh: LAMDIK" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Nomor SK</label>
                        <input type="text" value={form.data.no_sk} onChange={e => form.setData('no_sk', e.target.value)} className="w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Masa Berlaku S.d.</label>
                        <input type="date" value={form.data.masa_berlaku} onChange={e => form.setData('masa_berlaku', e.target.value)} className="w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500" />
                    </div>
                    <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                        {isEditing && (
                            <button type="button" onClick={resetForm} className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300">
                                Batal
                            </button>
                        )}
                        <button type="submit" disabled={form.processing} className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700">
                            {isEditing ? 'Simpan Perubahan' : 'Tambahkan'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-sm text-left text-slate-600">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3">Program Studi</th>
                            <th className="px-6 py-3">Peringkat</th>
                            <th className="px-6 py-3">Lembaga</th>
                            <th className="px-6 py-3">Masa Berlaku</th>
                            <th className="px-6 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prodis.length === 0 ? (
                            <tr><td colSpan="5" className="px-6 py-4 text-center text-slate-500">Belum ada data prodi.</td></tr>
                        ) : prodis.map((p) => (
                            <tr key={p.id} className="bg-white border-b hover:bg-slate-50">
                                <td className="px-6 py-4 font-bold text-slate-800">{p.nama}</td>
                                <td className="px-6 py-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">{p.peringkat}</span></td>
                                <td className="px-6 py-4">{p.lembaga}</td>
                                <td className="px-6 py-4">{p.masa_berlaku}</td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button onClick={() => editProdi(p)} className="p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md" title="Edit">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <Link href={route('admin.profil.akreditasi.destroy', p.id)} method="delete" as="button" className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-md" title="Hapus">
                                            <Trash2 className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ==========================================
// Tab Riwayat
// ==========================================
function RiwayatTab({ riwayats }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const form = useForm({
        nama: '', // Digunakan sebagai Tahun
        peringkat: '',
        lembaga: '',
        keterangan: '',
    });

    const resetForm = () => {
        form.reset();
        setIsEditing(false);
        setEditId(null);
    }

    const editRiwayat = (r) => {
        setIsEditing(true);
        setEditId(r.id);
        form.setData({
            nama: r.nama,
            peringkat: r.peringkat,
            lembaga: r.lembaga || '',
            keterangan: r.keterangan || '',
        });
    }

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            form.put(route('admin.profil.akreditasi.riwayat.update', editId), {
                onSuccess: () => resetForm(),
                onError: (errors) => {
                    const firstError = Object.values(errors)[0];
                    Swal.fire({ title: 'Validasi Gagal!', text: firstError || 'Cek kembali data yang dimasukkan.', icon: 'error', confirmButtonColor: '#ef4444' });
                }
            });
        } else {
            form.post(route('admin.profil.akreditasi.riwayat.store'), {
                onSuccess: () => resetForm(),
                onError: (errors) => {
                    const firstError = Object.values(errors)[0];
                    Swal.fire({ title: 'Validasi Gagal!', text: firstError || 'Cek kembali data yang dimasukkan.', icon: 'error', confirmButtonColor: '#ef4444' });
                }
            });
        }
    };

    return (
        <div className="space-y-8">
            {/* Form */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <Plus className="w-4 h-4" /> {isEditing ? 'Edit Riwayat' : 'Tambah Riwayat Akreditasi'}
                </h4>
                <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Periode / Tahun</label>
                        <input required type="text" value={form.data.nama} onChange={e => form.setData('nama', e.target.value)} className="w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500" placeholder="Contoh: 2015-2020" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Peringkat</label>
                        <input required type="text" value={form.data.peringkat} onChange={e => form.setData('peringkat', e.target.value)} className="w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500" placeholder="Contoh: B" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Lembaga</label>
                        <input type="text" value={form.data.lembaga} onChange={e => form.setData('lembaga', e.target.value)} className="w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500" placeholder="Contoh: BAN-PT" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Keterangan Singkat</label>
                        <input type="text" value={form.data.keterangan} onChange={e => form.setData('keterangan', e.target.value)} className="w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500" placeholder="Contoh: Akreditasi Awal Institusi" />
                    </div>
                    <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                        {isEditing && (
                            <button type="button" onClick={resetForm} className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300">
                                Batal
                            </button>
                        )}
                        <button type="submit" disabled={form.processing} className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700">
                            {isEditing ? 'Simpan Perubahan' : 'Tambahkan'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-sm text-left text-slate-600">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3">Periode</th>
                            <th className="px-6 py-3">Peringkat</th>
                            <th className="px-6 py-3">Keterangan</th>
                            <th className="px-6 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riwayats.length === 0 ? (
                            <tr><td colSpan="4" className="px-6 py-4 text-center text-slate-500">Belum ada riwayat.</td></tr>
                        ) : riwayats.map((r) => (
                            <tr key={r.id} className="bg-white border-b hover:bg-slate-50">
                                <td className="px-6 py-4 font-bold text-slate-800">{r.nama}</td>
                                <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">{r.peringkat}</span></td>
                                <td className="px-6 py-4">{r.keterangan} <span className="text-slate-400">({r.lembaga})</span></td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button onClick={() => editRiwayat(r)} className="p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md" title="Edit">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <Link href={route('admin.profil.akreditasi.destroy', r.id)} method="delete" as="button" className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-md" title="Hapus">
                                            <Trash2 className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
