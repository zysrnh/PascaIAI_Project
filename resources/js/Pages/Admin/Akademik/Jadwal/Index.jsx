import React, { useState } from 'react';
import { Head, useForm, usePage, router, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Admin/Sidebar';
import { Image, Upload, Save, AlertCircle, Plus, Edit, Trash2, X, CalendarDays, Clock, MapPin, BookOpen, User, FileUp, Download } from 'lucide-react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Swal from 'sweetalert2';

export default function Index({ pengaturan, periodes, programStudis }) {
    const { flash } = usePage().props;
    const [isLoaded, setIsLoaded] = useState(false);
    const [activePeriodeId, setActivePeriodeId] = useState(periodes?.length > 0 ? periodes[0].id : null);
    
    // Modal states
    const [isPeriodeModalOpen, setIsPeriodeModalOpen] = useState(false);
    const [editingPeriode, setEditingPeriode] = useState(null);
    const [isMkModalOpen, setIsMkModalOpen] = useState(false);
    const [editingMk, setEditingMk] = useState(null);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);

    const [previewBanner, setPreviewBanner] = useState(null);

    React.useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Forms
    const formBanner = useForm({ banner_image: null });
    const formPeriode = useForm({ tahun_akademik: '', semester_tipe: 'Ganjil', file_pdf: null, is_active: true });
    const formMk = useForm({
        jadwal_periode_id: '',
        program_studi: '',
        semester_ke: 1,
        mata_kuliah: '',
        sks: 2,
        dosen_pengampu: '',
        hari: 'Senin',
        jam_mulai: '08:00',
        jam_selesai: '10:00',
        ruangan: ''
    });
    const formImport = useForm({ file_excel: null });

    const activePeriode = periodes?.find(p => p.id === activePeriodeId);

    // Banner logic
    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            formBanner.setData('banner_image', file);
            setPreviewBanner(URL.createObjectURL(file));
        }
    };
    const submitBanner = (e) => {
        e.preventDefault();
        formBanner.post(route('admin.akademik.jadwal.pengaturan'), {
            preserveScroll: true,
            onSuccess: () => { formBanner.reset('banner_image'); setPreviewBanner(null); },
        });
    };

    // Periode logic
    const openPeriodeModal = (periode = null) => {
        if (periode) {
            setEditingPeriode(periode);
            formPeriode.setData({ tahun_akademik: periode.tahun_akademik, semester_tipe: periode.semester_tipe, file_pdf: null, is_active: periode.is_active });
        } else {
            setEditingPeriode(null);
            formPeriode.setData({ tahun_akademik: '', semester_tipe: 'Ganjil', file_pdf: null, is_active: true });
        }
        setIsPeriodeModalOpen(true);
    };
    const closePeriodeModal = () => { setIsPeriodeModalOpen(false); setEditingPeriode(null); formPeriode.reset(); formPeriode.clearErrors(); };
    const submitPeriode = (e) => {
        e.preventDefault();
        if (editingPeriode) {
            formPeriode.post(route('admin.akademik.jadwal.periode.update', editingPeriode.id), { preserveScroll: true, onSuccess: () => closePeriodeModal() });
        } else {
            formPeriode.post(route('admin.akademik.jadwal.periode.store'), { preserveScroll: true, onSuccess: () => closePeriodeModal() });
        }
    };
    const deletePeriode = (id) => {
        Swal.fire({
            title: 'Hapus Periode?', text: "Semua data mata kuliah dan PDF pada periode ini akan dihapus permanen!", icon: 'warning',
            showCancelButton: true, confirmButtonColor: '#059669', cancelButtonColor: '#ef4444', confirmButtonText: 'Ya, Hapus!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.akademik.jadwal.periode.destroy', id), { preserveScroll: true });
                if (activePeriodeId === id) setActivePeriodeId(periodes.find(p => p.id !== id)?.id || null);
            }
        });
    };

    // Mata Kuliah logic
    const openMkModal = (mk = null) => {
        if (!activePeriodeId) return;
        if (mk) {
            setEditingMk(mk);
            formMk.setData({ ...mk, jam_mulai: mk.jam_mulai.slice(0, 5), jam_selesai: mk.jam_selesai.slice(0, 5) });
        } else {
            setEditingMk(null);
            formMk.setData({
                jadwal_periode_id: activePeriodeId, program_studi: programStudis?.[0]?.nama || '', semester_ke: 1,
                mata_kuliah: '', sks: 2, dosen_pengampu: '', hari: 'Senin', jam_mulai: '08:00', jam_selesai: '10:00', ruangan: ''
            });
        }
        setIsMkModalOpen(true);
    };
    const closeMkModal = () => { setIsMkModalOpen(false); setEditingMk(null); formMk.reset(); formMk.clearErrors(); };
    const submitMk = (e) => {
        e.preventDefault();
        if (editingMk) {
            formMk.put(route('admin.akademik.jadwal.mata-kuliah.update', editingMk.id), { preserveScroll: true, onSuccess: () => closeMkModal() });
        } else {
            formMk.post(route('admin.akademik.jadwal.mata-kuliah.store'), { preserveScroll: true, onSuccess: () => closeMkModal() });
        }
    };
    const deleteMk = (id) => {
        Swal.fire({
            title: 'Hapus Mata Kuliah?', text: "Jadwal ini akan dihapus!", icon: 'warning',
            showCancelButton: true, confirmButtonColor: '#059669', cancelButtonColor: '#ef4444', confirmButtonText: 'Ya, Hapus!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.akademik.jadwal.mata-kuliah.destroy', id), { preserveScroll: true });
            }
        });
    };

    // Import logic
    const openImportModal = () => setIsImportModalOpen(true);
    const closeImportModal = () => { setIsImportModalOpen(false); formImport.reset(); formImport.clearErrors(); };
    const submitImport = (e) => {
        e.preventDefault();
        formImport.post(route('admin.akademik.jadwal.import', activePeriodeId), {
            preserveScroll: true,
            onSuccess: () => closeImportModal()
        });
    };

    const currentBannerUrl = previewBanner 
        ? previewBanner 
        : (pengaturan?.banner_image ? `/storage/${pengaturan.banner_image}` : "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop");

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-white leading-tight">Kelola Jadwal Perkuliahan</h2>}>
            <Head title="Kelola Jadwal Perkuliahan" />

            <div className="flex bg-slate-50 min-h-screen">
                <Sidebar />
                <div className={`min-w-0 flex-1 transition-all duration-700 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="py-8 px-4 sm:px-6 lg:px-8 space-y-6">
                        {flash?.success && (
                            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-md shadow-sm mb-6 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                                <div>
                                    <h3 className="text-emerald-800 font-medium">Berhasil</h3>
                                    <p className="text-emerald-700 text-sm">{flash.success}</p>
                                </div>
                            </div>
                        )}

                        {/* Banner Settings Section */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-slate-200">
                            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Image className="w-5 h-5" /></div>
                                <div><h3 className="text-lg font-bold text-slate-800">Banner Halaman</h3><p className="text-sm text-slate-500">Atur gambar latar belakang untuk halaman Jadwal.</p></div>
                            </div>
                            <div className="p-6">
                                <form onSubmit={submitBanner} className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="relative w-full h-64 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                            <img src={currentBannerUrl} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                                            <div className="absolute bottom-6 left-6 z-10 text-white">
                                                <h1 className="text-3xl font-extrabold mb-2 drop-shadow-md">Jadwal Perkuliahan</h1>
                                                <div className="w-16 h-1.5 bg-amber-500 rounded-sm"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className={`flex justify-center w-full h-32 px-4 transition bg-white border-2 border-slate-300 border-dashed rounded-md cursor-pointer hover:border-emerald-500 ${formBanner.errors.banner_image ? 'border-red-500' : ''}`}>
                                            <span className="flex items-center space-x-2"><Upload className="w-6 h-6 text-slate-600" /><span className="font-medium text-slate-600">Ganti Banner (Maks. 2MB, JPG/PNG)</span></span>
                                            <input type="file" name="banner_image" className="hidden" accept="image/*" onChange={handleBannerChange} />
                                        </label>
                                        {formBanner.errors.banner_image && <p className="text-sm text-red-600 mt-1">{formBanner.errors.banner_image}</p>}
                                    </div>
                                    <div className="flex justify-end pt-4 border-t border-slate-100">
                                        <button type="submit" disabled={formBanner.processing || !formBanner.data.banner_image} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors disabled:opacity-50">
                                            <Save className="w-4 h-4" /> Simpan Banner
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Periode Management */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-slate-200">
                            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><CalendarDays className="w-5 h-5" /></div>
                                    <div><h3 className="text-lg font-bold text-slate-800">Periode Jadwal</h3><p className="text-sm text-slate-500">Pilih periode aktif untuk mengelola jadwal kelas.</p></div>
                                </div>
                                <button onClick={() => openPeriodeModal()} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors text-sm">
                                    <Plus className="w-4 h-4" /> Tambah Periode
                                </button>
                            </div>
                            <div className="p-4 bg-slate-50 border-b border-slate-200">
                                {periodes?.length > 0 ? (
                                    <div className="flex gap-2 overflow-x-auto pb-2">
                                        {periodes.map(p => (
                                            <div key={p.id} className={`flex-shrink-0 flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer transition-colors ${activePeriodeId === p.id ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100'}`} onClick={() => setActivePeriodeId(p.id)}>
                                                <div className="font-semibold">{p.tahun_akademik} - {p.semester_tipe}</div>
                                                <div className="flex gap-1 ml-2">
                                                    <button onClick={(e) => { e.stopPropagation(); openPeriodeModal(p); }} className={`p-1 rounded ${activePeriodeId === p.id ? 'hover:bg-indigo-500' : 'hover:bg-slate-200'} transition-colors`}><Edit className="w-3.5 h-3.5" /></button>
                                                    <button onClick={(e) => { e.stopPropagation(); deletePeriode(p.id); }} className={`p-1 rounded ${activePeriodeId === p.id ? 'hover:bg-red-500 bg-red-600 text-white' : 'hover:bg-red-100 text-red-600'} transition-colors`}><Trash2 className="w-3.5 h-3.5" /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-sm text-slate-500 text-center py-4">Belum ada periode jadwal yang dibuat. Tambahkan periode terlebih dahulu.</div>
                                )}
                            </div>
                            
                            {/* Jadwal Data Table */}
                            {activePeriode && (
                                <div className="p-0">
                                    <div className="p-4 flex justify-between items-center bg-white border-b border-slate-100">
                                        <div className="font-medium text-slate-700 flex items-center gap-2">
                                            <BookOpen className="w-4 h-4 text-emerald-600" />
                                            Data Mata Kuliah: {activePeriode.tahun_akademik} ({activePeriode.semester_tipe})
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button onClick={openImportModal} className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-indigo-700 font-semibold py-2 px-4 rounded-md shadow-sm transition-all text-sm border border-indigo-200 hover:border-indigo-300">
                                                <FileUp className="w-4 h-4" /> Import Excel/CSV
                                            </button>
                                            <button onClick={() => openMkModal()} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition-all text-sm">
                                                <Plus className="w-4 h-4" /> Tambah Matkul
                                            </button>
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse min-w-max">
                                            <thead>
                                                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs uppercase tracking-wider">
                                                    <th className="p-3 font-semibold">Prodi / Smt</th>
                                                    <th className="p-3 font-semibold">Mata Kuliah</th>
                                                    <th className="p-3 font-semibold">SKS</th>
                                                    <th className="p-3 font-semibold">Waktu & Tempat</th>
                                                    <th className="p-3 font-semibold">Dosen</th>
                                                    <th className="p-3 font-semibold text-right">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm divide-y divide-slate-100">
                                                {activePeriode.mata_kuliahs?.length === 0 ? (
                                                    <tr><td colSpan="6" className="p-8 text-center text-slate-500">Belum ada jadwal mata kuliah pada periode ini.</td></tr>
                                                ) : (
                                                    activePeriode.mata_kuliahs.map((mk) => (
                                                        <tr key={mk.id} className="hover:bg-slate-50 transition-colors">
                                                            <td className="p-3">
                                                                <div className="font-medium text-slate-800">{mk.program_studi}</div>
                                                                <div className="text-xs text-slate-500">Semester {mk.semester_ke}</div>
                                                            </td>
                                                            <td className="p-3 font-medium text-slate-800">{mk.mata_kuliah}</td>
                                                            <td className="p-3 text-slate-600">{mk.sks}</td>
                                                            <td className="p-3">
                                                                <div className="flex items-center gap-1 text-slate-700"><Clock className="w-3 h-3 text-emerald-600"/> {mk.hari}, {mk.jam_mulai.slice(0,5)} - {mk.jam_selesai.slice(0,5)}</div>
                                                                <div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5"><MapPin className="w-3 h-3 text-blue-500"/> {mk.ruangan}</div>
                                                            </td>
                                                            <td className="p-3 text-slate-700 flex items-center gap-2"><User className="w-3 h-3 text-slate-400"/> {mk.dosen_pengampu}</td>
                                                            <td className="p-3 text-right">
                                                                <button onClick={() => openMkModal(mk)} className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 p-1.5 rounded-md transition-colors mr-1"><Edit className="w-4 h-4" /></button>
                                                                <button onClick={() => deleteMk(mk.id)} className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-1.5 rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Periode */}
            {isPeriodeModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-slate-800">{editingPeriode ? 'Edit Periode' : 'Tambah Periode'}</h3>
                            <button onClick={closePeriodeModal} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={submitPeriode}>
                            <div className="p-6 space-y-4">
                                <div>
                                    <InputLabel htmlFor="tahun_akademik" value="Tahun Akademik" />
                                    <TextInput id="tahun_akademik" type="text" className="mt-1 block w-full" value={formPeriode.data.tahun_akademik} onChange={e => formPeriode.setData('tahun_akademik', e.target.value)} placeholder="Contoh: 2025/2026" required />
                                    <InputError message={formPeriode.errors.tahun_akademik} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="semester_tipe" value="Semester" />
                                    <select id="semester_tipe" className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" value={formPeriode.data.semester_tipe} onChange={e => formPeriode.setData('semester_tipe', e.target.value)}>
                                        <option value="Ganjil">Ganjil</option>
                                        <option value="Genap">Genap</option>
                                    </select>
                                </div>
                                <div>
                                    <InputLabel htmlFor="file_pdf" value={editingPeriode ? "File PDF Jadwal Global (Opsional, timpa file lama)" : "File PDF Jadwal Global (Opsional)"} />
                                    <input id="file_pdf" type="file" accept="application/pdf" className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" onChange={e => formPeriode.setData('file_pdf', e.target.files[0])} />
                                    <InputError message={formPeriode.errors.file_pdf} className="mt-2" />
                                </div>
                                <div className="flex items-center mt-4">
                                    <input id="is_active" type="checkbox" checked={formPeriode.data.is_active} onChange={e => formPeriode.setData('is_active', e.target.checked)} className="w-4 h-4 text-emerald-600 bg-slate-100 border-slate-300 rounded focus:ring-emerald-500 focus:ring-2" />
                                    <label htmlFor="is_active" className="ml-2 text-sm font-medium text-slate-900">Aktifkan untuk Publik</label>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                                <button type="button" onClick={closePeriodeModal} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50">Batal</button>
                                <button type="submit" disabled={formPeriode.processing} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 shadow-sm disabled:opacity-50">
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Mata Kuliah */}
            {isMkModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-fade-in-up">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-slate-800">{editingMk ? 'Edit Jadwal Matkul' : 'Tambah Jadwal Matkul'}</h3>
                            <button onClick={closeMkModal} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={submitMk}>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="mata_kuliah" value="Nama Mata Kuliah" />
                                    <TextInput id="mata_kuliah" type="text" className="mt-1 block w-full" value={formMk.data.mata_kuliah} onChange={e => formMk.setData('mata_kuliah', e.target.value)} required />
                                    <InputError message={formMk.errors.mata_kuliah} className="mt-1" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="program_studi" value="Program Studi" />
                                    <select id="program_studi" className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" value={formMk.data.program_studi} onChange={e => formMk.setData('program_studi', e.target.value)} required>
                                        <option value="">Pilih Prodi</option>
                                        {programStudis?.map(ps => <option key={ps.id} value={ps.nama}>{ps.nama}</option>)}
                                    </select>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-1/2">
                                        <InputLabel htmlFor="semester_ke" value="Semester (Ke-)" />
                                        <TextInput id="semester_ke" type="number" min="1" max="8" className="mt-1 block w-full" value={formMk.data.semester_ke} onChange={e => formMk.setData('semester_ke', e.target.value)} required />
                                    </div>
                                    <div className="w-1/2">
                                        <InputLabel htmlFor="sks" value="SKS" />
                                        <TextInput id="sks" type="number" min="1" className="mt-1 block w-full" value={formMk.data.sks} onChange={e => formMk.setData('sks', e.target.value)} required />
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="dosen_pengampu" value="Dosen Pengampu (Bisa dipisah koma untuk Tim)" />
                                    <TextInput id="dosen_pengampu" type="text" className="mt-1 block w-full" value={formMk.data.dosen_pengampu} onChange={e => formMk.setData('dosen_pengampu', e.target.value)} required />
                                </div>
                                <div>
                                    <InputLabel htmlFor="hari" value="Hari" />
                                    <select id="hari" className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" value={formMk.data.hari} onChange={e => formMk.setData('hari', e.target.value)} required>
                                        {['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu'].map(h => <option key={h} value={h}>{h}</option>)}
                                    </select>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-1/2">
                                        <InputLabel htmlFor="jam_mulai" value="Jam Mulai" />
                                        <TextInput id="jam_mulai" type="time" className="mt-1 block w-full" value={formMk.data.jam_mulai} onChange={e => formMk.setData('jam_mulai', e.target.value)} required />
                                    </div>
                                    <div className="w-1/2">
                                        <InputLabel htmlFor="jam_selesai" value="Jam Selesai" />
                                        <TextInput id="jam_selesai" type="time" className="mt-1 block w-full" value={formMk.data.jam_selesai} onChange={e => formMk.setData('jam_selesai', e.target.value)} required />
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="ruangan" value="Ruang / Kelas (Isi 'Daring' jika online)" />
                                    <TextInput id="ruangan" type="text" className="mt-1 block w-full" value={formMk.data.ruangan} onChange={e => formMk.setData('ruangan', e.target.value)} required />
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                                <button type="button" onClick={closeMkModal} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50">Batal</button>
                                <button type="submit" disabled={formMk.processing} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 shadow-sm disabled:opacity-50">
                                    Simpan Jadwal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Import CSV */}
            {isImportModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-slate-800">Import Jadwal CSV</h3>
                            <button onClick={closeImportModal} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={submitImport}>
                            <div className="p-6 space-y-4">
                                <div className="bg-blue-50 text-blue-800 p-4 rounded-md text-sm">
                                    <p className="mb-2">Gunakan template CSV yang disediakan agar format data sesuai saat diimpor.</p>
                                    <a href={route('admin.akademik.jadwal.template')} className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-800 underline">
                                        <Download className="w-4 h-4" /> Unduh Template CSV
                                    </a>
                                </div>
                                <div>
                                    <InputLabel htmlFor="file_excel" value="Pilih File Excel/CSV (.xlsx, .xls, .csv)" />
                                    <input id="file_excel" type="file" accept=".xlsx,.xls,.csv" className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" onChange={e => formImport.setData('file_excel', e.target.files[0])} required />
                                    <InputError message={formImport.errors.file_excel} className="mt-2" />
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                                <button type="button" onClick={closeImportModal} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50">Batal</button>
                                <button type="submit" disabled={formImport.processing} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 shadow-sm disabled:opacity-50">
                                    Mulai Import
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </AuthenticatedLayout>
    );
}
