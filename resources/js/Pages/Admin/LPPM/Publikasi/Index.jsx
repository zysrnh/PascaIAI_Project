import React, { useState, useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Admin/Sidebar';
import { Save, Image as ImageIcon, Book, Link as LinkIcon, GraduationCap, Plus, Trash2, Upload } from 'lucide-react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, publikasi }) {
    const fileInputRef = useRef(null);
    const [bannerPreview, setBannerPreview] = useState(publikasi?.banner_image || null);

    const { data, setData, post, processing, errors } = useForm({
        judul: publikasi?.judul || 'Publikasi (Jurnal & Buku)',
        deskripsi_banner: publikasi?.deskripsi_banner || '',
        banner_image: null,
        deskripsi_jurnal: publikasi?.deskripsi_jurnal || '',
        jurnals: publikasi?.jurnals || [{ nama_jurnal: '', issn: '', link_ojs: '', sinta: '' }],
        deskripsi_buku: publikasi?.deskripsi_buku || '',
        bukus: publikasi?.bukus || [{ judul: '', penulis: '', tahun: '', penerbit: '', isbn: '', link: '' }],
        deskripsi_artikel: publikasi?.deskripsi_artikel || '',
        links_scholar: publikasi?.links_scholar || [{ nama_dosen: '', link_scholar: '', link_scopus: '' }]
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

    // Helper functions for dynamic arrays
    const addJurnal = () => setData('jurnals', [...data.jurnals, { nama_jurnal: '', issn: '', link_ojs: '', sinta: '' }]);
    const removeJurnal = (index) => {
        const newList = [...data.jurnals];
        newList.splice(index, 1);
        setData('jurnals', newList.length ? newList : [{ nama_jurnal: '', issn: '', link_ojs: '', sinta: '' }]);
    };
    const updateJurnal = (index, field, value) => {
        const newList = [...data.jurnals];
        newList[index][field] = value;
        setData('jurnals', newList);
    };

    const addBuku = () => setData('bukus', [...data.bukus, { judul: '', penulis: '', tahun: '', penerbit: '', isbn: '', link: '' }]);
    const removeBuku = (index) => {
        const newList = [...data.bukus];
        newList.splice(index, 1);
        setData('bukus', newList.length ? newList : [{ judul: '', penulis: '', tahun: '', penerbit: '', isbn: '', link: '' }]);
    };
    const updateBuku = (index, field, value) => {
        const newList = [...data.bukus];
        newList[index][field] = value;
        setData('bukus', newList);
    };

    const addScholar = () => setData('links_scholar', [...data.links_scholar, { nama_dosen: '', link_scholar: '', link_scopus: '' }]);
    const removeScholar = (index) => {
        const newList = [...data.links_scholar];
        newList.splice(index, 1);
        setData('links_scholar', newList.length ? newList : [{ nama_dosen: '', link_scholar: '', link_scopus: '' }]);
    };
    const updateScholar = (index, field, value) => {
        const newList = [...data.links_scholar];
        newList[index][field] = value;
        setData('links_scholar', newList);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.lppm.publikasi.update'), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Kelola Publikasi</h2>}
        >
            <Head title="Kelola Publikasi" />

            <div className="flex bg-slate-50 min-h-screen">
                <Sidebar />
                <div className="min-w-0 flex-1 transition-all duration-700 ease-out transform opacity-100 translate-y-0">
                    <div className="py-8 px-4 sm:px-6 lg:px-8 space-y-6">
                        
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">Publikasi (Jurnal & Buku)</h1>
                                <p className="text-slate-500 mt-1">Kelola etalase karya ilmiah institusi, buku dosen, dan profil riset.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Panel 1: Banner & Header */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-slate-200">
                            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><ImageIcon className="w-5 h-5" /></div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Banner Halaman</h3>
                                    <p className="text-sm text-slate-500">Atur gambar dan deskripsi halaman Publikasi.</p>
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700">Gambar Banner Saat Ini</label>
                                    <div className="relative w-full h-64 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                        {bannerPreview ? (
                                            <img src={bannerPreview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <img src={publikasi?.banner_image || '/images/default-banner.jpg'} alt="Default Preview" className="w-full h-full object-cover" />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-transparent"></div>
                                        <div className="absolute bottom-6 left-6 z-10 text-white w-full pr-6">
                                            <input 
                                                type="text" 
                                                value={data.judul} 
                                                onChange={e => setData('judul', e.target.value)} 
                                                className="bg-transparent text-3xl font-extrabold mb-2 drop-shadow-md border-b border-dashed border-white/50 focus:border-white focus:ring-0 p-0 hover:bg-white/10 transition-colors w-full sm:w-1/2"
                                                placeholder="Judul Halaman"
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
                                            placeholder="Showcase karya ilmiah dosen dan institusi..."
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

                        {/* Panel 2: Jurnal Institusi */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-slate-200">
                            <div className="border-b border-slate-200 bg-slate-50/50 p-6 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                                        <Book className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">Jurnal Institusi</h3>
                                    </div>
                                </div>
                                <button type="button" onClick={addJurnal} className="inline-flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold text-xs text-slate-700 uppercase tracking-widest shadow-sm hover:bg-slate-50 gap-2">
                                    <Plus className="w-4 h-4" /> Tambah Jurnal
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi Singkat (Opsional)</label>
                                    <textarea
                                        value={data.deskripsi_jurnal}
                                        onChange={e => setData('deskripsi_jurnal', e.target.value)}
                                        rows={2}
                                        className="w-full border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                        placeholder="Daftar jurnal ilmiah terbitan Pascasarjana IAI Persis Bandung..."
                                    ></textarea>
                                </div>
                                <div className="space-y-4">
                                    {data.jurnals.map((item, index) => (
                                        <div key={index} className="flex flex-col md:flex-row gap-4 items-start bg-slate-50 p-4 rounded-lg border border-slate-200">
                                            <div className="flex-1 space-y-3 w-full">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <input
                                                        type="text"
                                                        value={item.nama_jurnal}
                                                        onChange={e => updateJurnal(index, 'nama_jurnal', e.target.value)}
                                                        className="w-full border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                                        placeholder="Nama Jurnal (Misal: Al-Ahkam)"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={item.issn}
                                                        onChange={e => updateJurnal(index, 'issn', e.target.value)}
                                                        className="w-full border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                                        placeholder="ISSN (P-ISSN / E-ISSN)"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <input
                                                        type="url"
                                                        value={item.link_ojs}
                                                        onChange={e => updateJurnal(index, 'link_ojs', e.target.value)}
                                                        className="w-full border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                                        placeholder="Link URL OJS (https://...)"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={item.sinta}
                                                        onChange={e => updateJurnal(index, 'sinta', e.target.value)}
                                                        className="w-full border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                                        placeholder="Status Akreditasi (Misal: Sinta 3)"
                                                    />
                                                </div>
                                            </div>
                                            <button type="button" onClick={() => removeJurnal(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Panel 3: Buku Karya Dosen */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-slate-200">
                            <div className="border-b border-slate-200 bg-slate-50/50 p-6 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                                        <Book className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">Buku Karya Dosen</h3>
                                    </div>
                                </div>
                                <button type="button" onClick={addBuku} className="inline-flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold text-xs text-slate-700 uppercase tracking-widest shadow-sm hover:bg-slate-50 gap-2">
                                    <Plus className="w-4 h-4" /> Tambah Buku
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi Singkat (Opsional)</label>
                                    <textarea
                                        value={data.deskripsi_buku}
                                        onChange={e => setData('deskripsi_buku', e.target.value)}
                                        rows={2}
                                        className="w-full border-slate-300 focus:border-amber-500 focus:ring-amber-500 rounded-lg shadow-sm"
                                        placeholder="Kumpulan buku yang diterbitkan oleh civitas akademika..."
                                    ></textarea>
                                </div>
                                <div className="space-y-4">
                                    {data.bukus.map((item, index) => (
                                        <div key={index} className="flex flex-col gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200 relative">
                                            <button type="button" onClick={() => removeBuku(index)} className="absolute top-4 right-4 p-1 text-red-500 hover:bg-red-50 rounded transition-colors">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-10">
                                                <input
                                                    type="text"
                                                    value={item.judul}
                                                    onChange={e => updateBuku(index, 'judul', e.target.value)}
                                                    className="w-full border-slate-300 focus:border-amber-500 focus:ring-amber-500 rounded-lg shadow-sm"
                                                    placeholder="Judul Buku"
                                                />
                                                <input
                                                    type="text"
                                                    value={item.penulis}
                                                    onChange={e => updateBuku(index, 'penulis', e.target.value)}
                                                    className="w-full border-slate-300 focus:border-amber-500 focus:ring-amber-500 rounded-lg shadow-sm"
                                                    placeholder="Penulis (Dosen)"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                <input
                                                    type="text"
                                                    value={item.tahun}
                                                    onChange={e => updateBuku(index, 'tahun', e.target.value)}
                                                    className="w-full border-slate-300 focus:border-amber-500 focus:ring-amber-500 rounded-lg shadow-sm"
                                                    placeholder="Tahun Terbit"
                                                />
                                                <input
                                                    type="text"
                                                    value={item.penerbit}
                                                    onChange={e => updateBuku(index, 'penerbit', e.target.value)}
                                                    className="w-full border-slate-300 focus:border-amber-500 focus:ring-amber-500 rounded-lg shadow-sm"
                                                    placeholder="Penerbit"
                                                />
                                                <input
                                                    type="text"
                                                    value={item.isbn}
                                                    onChange={e => updateBuku(index, 'isbn', e.target.value)}
                                                    className="w-full border-slate-300 focus:border-amber-500 focus:ring-amber-500 rounded-lg shadow-sm"
                                                    placeholder="ISBN"
                                                />
                                            </div>
                                            <input
                                                type="url"
                                                value={item.link}
                                                onChange={e => updateBuku(index, 'link', e.target.value)}
                                                className="w-full border-slate-300 focus:border-amber-500 focus:ring-amber-500 rounded-lg shadow-sm text-sm"
                                                placeholder="Link Pembelian / PDF Terbuka (https://...)"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Panel 4: Artikel Dosen (Link Profil) */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-slate-200">
                            <div className="border-b border-slate-200 bg-slate-50/50 p-6 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                                        <GraduationCap className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800">Profil Riset Dosen</h3>
                                </div>
                                <button type="button" onClick={addScholar} className="p-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50">
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi Singkat (Opsional)</label>
                                    <textarea
                                        value={data.deskripsi_artikel}
                                        onChange={e => setData('deskripsi_artikel', e.target.value)}
                                        rows={2}
                                        className="w-full border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
                                        placeholder="Kunjungi profil akademik dosen-dosen kami di Google Scholar dan Scopus..."
                                    ></textarea>
                                </div>
                                <div className="space-y-4">
                                    {data.links_scholar.map((item, index) => (
                                        <div key={index} className="flex gap-3 items-start p-3 bg-slate-50 rounded-lg border border-slate-200">
                                            <div className="flex-1 space-y-2">
                                                <input
                                                    type="text"
                                                    value={item.nama_dosen}
                                                    onChange={e => updateScholar(index, 'nama_dosen', e.target.value)}
                                                    className="w-full border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500 rounded shadow-sm"
                                                    placeholder="Nama Lengkap Dosen"
                                                />
                                                <div className="flex gap-2">
                                                    <input
                                                        type="url"
                                                        value={item.link_scholar}
                                                        onChange={e => updateScholar(index, 'link_scholar', e.target.value)}
                                                        className="w-1/2 border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500 rounded shadow-sm"
                                                        placeholder="URL Profil Google Scholar"
                                                    />
                                                    <input
                                                        type="url"
                                                        value={item.link_scopus}
                                                        onChange={e => updateScholar(index, 'link_scopus', e.target.value)}
                                                        className="w-1/2 border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500 rounded shadow-sm"
                                                        placeholder="URL Profil Scopus / Sinta (Opsional)"
                                                    />
                                                </div>
                                            </div>
                                            <button type="button" onClick={() => removeScholar(index)} className="p-1 text-red-500 mt-1">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
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
