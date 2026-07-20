import React, { useState, useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Admin/Sidebar';
import { Save, Image as ImageIcon, MapPin, Target, BookOpen, Users, Plus, Trash2, FileText, Upload, Briefcase } from 'lucide-react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, pengabdian }) {
    const fileInputRef = useRef(null);
    const [bannerPreview, setBannerPreview] = useState(pengabdian?.banner_image || null);

    const { data, setData, post, processing, errors } = useForm({
        judul: pengabdian?.judul || 'Pengabdian Masyarakat (KKN)',
        deskripsi_banner: pengabdian?.deskripsi_banner || '',
        banner_image: null,
        deskripsi_program: pengabdian?.deskripsi_program || '',
        periode_pelaksanaan: pengabdian?.periode_pelaksanaan || '',
        syarat_peserta: pengabdian?.syarat_peserta || '',
        alur_pendaftaran: pengabdian?.alur_pendaftaran || [{ tahap: '', deskripsi: '' }],
        lokasi_mitra: pengabdian?.lokasi_mitra || [{ nama_mitra: '', lokasi: '', jenis_kerjasama: '' }],
        kontak_koordinator: pengabdian?.kontak_koordinator || { nama: '', email: '', telepon: '' },
        file_buku_panduan: null,
        file_template_proposal: null,
        file_template_laporan: null,
        rekap_pengabdian: pengabdian?.rekap_pengabdian || []
    });

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('banner_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const addAlur = () => setData('alur_pendaftaran', [...data.alur_pendaftaran, { tahap: '', deskripsi: '' }]);
    const removeAlur = (index) => {
        const newList = [...data.alur_pendaftaran];
        newList.splice(index, 1);
        setData('alur_pendaftaran', newList.length ? newList : [{ tahap: '', deskripsi: '' }]);
    };
    const updateAlur = (index, field, value) => {
        const newList = [...data.alur_pendaftaran];
        newList[index][field] = value;
        setData('alur_pendaftaran', newList);
    };

    const addLokasi = () => setData('lokasi_mitra', [...data.lokasi_mitra, { nama_mitra: '', lokasi: '', jenis_kerjasama: '' }]);
    const removeLokasi = (index) => {
        const newList = [...data.lokasi_mitra];
        newList.splice(index, 1);
        setData('lokasi_mitra', newList.length ? newList : [{ nama_mitra: '', lokasi: '', jenis_kerjasama: '' }]);
    };
    const updateLokasi = (index, field, value) => {
        const newList = [...data.lokasi_mitra];
        newList[index][field] = value;
        setData('lokasi_mitra', newList);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.lppm.pengabdian.update'), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Kelola Informasi Pengabdian Masyarakat</h2>}
        >
            <Head title="Kelola Informasi Pengabdian Masyarakat" />

            <div className="flex bg-slate-50 min-h-screen">
                <Sidebar />
                <div className="min-w-0 flex-1 transition-all duration-700 ease-out transform opacity-100 translate-y-0">
                    <div className="py-8 px-4 sm:px-6 lg:px-8 space-y-6">
                        
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">Pengabdian Masyarakat (KKN)</h1>
                                <p className="text-slate-500 mt-1">Kelola informasi program KKN, lokasi, mitra, dan panduan pelaksanaannya.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Panel 1: Banner & Header */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-slate-200">
                            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><ImageIcon className="w-5 h-5" /></div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Banner Halaman</h3>
                                    <p className="text-sm text-slate-500">Atur gambar dan deskripsi judul halaman Pengabdian.</p>
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700">Gambar Banner Saat Ini</label>
                                    <div className="relative w-full h-64 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                        {bannerPreview ? (
                                            <img src={bannerPreview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <img src={pengabdian?.banner_image || '/images/default-banner.jpg'} alt="Default Preview" className="w-full h-full object-cover" />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-transparent"></div>
                                        <div className="absolute bottom-6 left-6 z-10 text-white w-full pr-6">
                                            <input 
                                                type="text" 
                                                value={data.judul} 
                                                onChange={e => setData('judul', e.target.value)} 
                                                className="bg-transparent text-3xl font-extrabold mb-2 drop-shadow-md border-0 focus:border-0 focus:ring-0 p-0 hover:bg-white/10 transition-colors w-full sm:w-1/2"
                                                placeholder="Judul Halaman (Misal: Pengabdian Masyarakat)"
                                            />
                                            <div className="w-16 h-1.5 bg-amber-500 rounded-sm mb-4"></div>
                                            {data.deskripsi_banner && (
                                                <p className="text-white/90 max-w-2xl text-sm leading-relaxed drop-shadow">
                                                    {data.deskripsi_banner}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <InputLabel htmlFor="deskripsi_banner" value="Deskripsi Singkat Banner" />
                                        <textarea
                                            id="deskripsi_banner"
                                            rows="2"
                                            className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="Program pengabdian masyarakat oleh dosen dan mahasiswa..."
                                            value={data.deskripsi_banner}
                                            onChange={e => setData('deskripsi_banner', e.target.value)}
                                        ></textarea>
                                        {errors.deskripsi_banner && <p className="text-sm text-red-600 mt-1">{errors.deskripsi_banner}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-slate-700">Ganti Banner (Maks. 2MB, JPG/PNG)</label>
                                        <label className={`flex justify-center w-full h-32 px-4 transition bg-white border-2 border-slate-300 border-dashed rounded-md cursor-pointer hover:border-emerald-500 ${errors.banner_image ? 'border-red-500' : ''}`}>
                                            <span className="flex items-center space-x-2"><Upload className="w-6 h-6 text-slate-600" /><span className="font-medium text-slate-600">Klik untuk mengunggah file gambar</span></span>
                                            <input type="file" ref={fileInputRef} name="banner_image" className="hidden" accept="image/*" onChange={handleBannerChange} />
                                        </label>
                                        {errors.banner_image && <p className="text-sm text-red-600 mt-1">{errors.banner_image}</p>}
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4 border-t border-slate-100">
                                    <PrimaryButton type="submit" disabled={processing}>
                                        Simpan Banner
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>

                        {/* Panel 2: Informasi Program */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-slate-200">
                            <div className="border-b border-slate-200 bg-slate-50/50 p-6 flex items-center gap-3">
                                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Informasi Program</h3>
                                    <p className="text-sm text-slate-500">Deskripsi, periode, dan syarat peserta.</p>
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi Program (Tujuan, Bentuk Kegiatan)</label>
                                    <textarea
                                        value={data.deskripsi_program}
                                        onChange={e => setData('deskripsi_program', e.target.value)}
                                        rows={4}
                                        className="w-full border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                        placeholder="Jelaskan secara garis besar tentang program pengabdian atau KKN..."
                                    ></textarea>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Periode Pelaksanaan</label>
                                        <input
                                            type="text"
                                            value={data.periode_pelaksanaan}
                                            onChange={e => setData('periode_pelaksanaan', e.target.value)}
                                            className="w-full border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                            placeholder="Misal: Setiap Semester Genap / Ganjil"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Syarat Peserta</label>
                                        <textarea
                                            value={data.syarat_peserta}
                                            onChange={e => setData('syarat_peserta', e.target.value)}
                                            rows={2}
                                            className="w-full border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                            placeholder="Minimal semester 5, SKS terpenuhi 100, dll..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Panel 3: Lokasi & Mitra */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-slate-200">
                            <div className="border-b border-slate-200 bg-slate-50/50 p-6 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">Lokasi & Mitra Binaan</h3>
                                    </div>
                                </div>
                                <button type="button" onClick={addLokasi} className="inline-flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold text-xs text-slate-700 uppercase tracking-widest shadow-sm hover:bg-slate-50 gap-2">
                                    <Plus className="w-4 h-4" /> Tambah Lokasi
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                {data.lokasi_mitra.map((item, index) => (
                                    <div key={index} className="flex flex-col md:flex-row gap-4 items-start bg-slate-50 p-4 rounded-lg border border-slate-200">
                                        <div className="flex-1 space-y-3 w-full">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <input
                                                    type="text"
                                                    value={item.nama_mitra}
                                                    onChange={e => updateLokasi(index, 'nama_mitra', e.target.value)}
                                                    className="w-full border-slate-300 focus:border-amber-500 focus:ring-amber-500 rounded-lg shadow-sm"
                                                    placeholder="Nama Mitra / Desa Binaan"
                                                />
                                                <input
                                                    type="text"
                                                    value={item.lokasi}
                                                    onChange={e => updateLokasi(index, 'lokasi', e.target.value)}
                                                    className="w-full border-slate-300 focus:border-amber-500 focus:ring-amber-500 rounded-lg shadow-sm"
                                                    placeholder="Lokasi (Kecamatan, Kabupaten)"
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                value={item.jenis_kerjasama}
                                                onChange={e => updateLokasi(index, 'jenis_kerjasama', e.target.value)}
                                                className="w-full border-slate-300 focus:border-amber-500 focus:ring-amber-500 rounded-lg shadow-sm text-sm"
                                                placeholder="Bentuk Kerjasama (Contoh: MoU Pemberdayaan Ekonomi)"
                                            />
                                        </div>
                                        <button type="button" onClick={() => removeLokasi(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Panel 4: Alur & Dokumen */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            
                            {/* Alur Pendaftaran */}
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-slate-200">
                                <div className="border-b border-slate-200 bg-slate-50/50 p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                                            <Target className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-800">Alur Pendaftaran</h3>
                                    </div>
                                    <button type="button" onClick={addAlur} className="p-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50">
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="p-6 space-y-4">
                                    {data.alur_pendaftaran.map((item, index) => (
                                        <div key={index} className="flex gap-3 items-start p-3 bg-slate-50 rounded-lg border border-slate-200">
                                            <div className="w-6 h-6 rounded bg-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0 mt-1">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <input
                                                    type="text"
                                                    value={item.tahap}
                                                    onChange={e => updateAlur(index, 'tahap', e.target.value)}
                                                    className="w-full border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500 rounded shadow-sm"
                                                    placeholder="Nama Tahapan (Misal: Pendaftaran Online)"
                                                />
                                                <input
                                                    type="text"
                                                    value={item.deskripsi}
                                                    onChange={e => updateAlur(index, 'deskripsi', e.target.value)}
                                                    className="w-full border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500 rounded shadow-sm"
                                                    placeholder="Keterangan singkat..."
                                                />
                                            </div>
                                            <button type="button" onClick={() => removeAlur(index)} className="p-1 text-red-500 mt-1">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Template Dokumen */}
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-slate-200">
                                <div className="border-b border-slate-200 bg-slate-50/50 p-6 flex items-center gap-3">
                                    <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800">Template Unduhan</h3>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700">Buku Panduan (PDF/DOC)</label>
                                        <input
                                            type="file"
                                            onChange={e => setData('file_buku_panduan', e.target.files[0])}
                                            className="mt-2 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
                                            accept=".pdf,.doc,.docx"
                                        />
                                        {pengabdian?.file_buku_panduan && (
                                            <a href={pengabdian.file_buku_panduan} target="_blank" rel="noreferrer" className="text-rose-600 text-sm mt-2 block hover:underline">Lihat Buku Panduan Saat Ini</a>
                                        )}
                                    </div>
                                    <hr className="border-slate-100" />
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700">Template Proposal</label>
                                        <input
                                            type="file"
                                            onChange={e => setData('file_template_proposal', e.target.files[0])}
                                            className="mt-2 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
                                            accept=".pdf,.doc,.docx"
                                        />
                                        {pengabdian?.file_template_proposal && (
                                            <a href={pengabdian.file_template_proposal} target="_blank" rel="noreferrer" className="text-rose-600 text-sm mt-2 block hover:underline">Lihat Template Saat Ini</a>
                                        )}
                                    </div>
                                    <hr className="border-slate-100" />
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700">Laporan Akhir</label>
                                        <input
                                            type="file"
                                            onChange={e => setData('file_template_laporan', e.target.files[0])}
                                            className="mt-2 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
                                            accept=".pdf,.doc,.docx"
                                        />
                                        {pengabdian?.file_template_laporan && (
                                            <a href={pengabdian.file_template_laporan} target="_blank" rel="noreferrer" className="text-rose-600 text-sm mt-2 block hover:underline">Lihat Laporan Saat Ini</a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Actions */}
                        <div className="flex justify-end gap-3 sticky bottom-6 z-10">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-600/30 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <Save className="w-5 h-5" />
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
