import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { Users, Plus, Edit, Trash2, FileUp, Image, Upload, Save } from 'lucide-react';
import Sidebar from '@/Components/Admin/Sidebar';
import Swal from 'sweetalert2';

const getInitials = (name) => {
    if (!name) return '??';
    return name.substring(0, 2).toUpperCase();
};

const TreeNode = ({ node }) => {
    return (
        <li>
            <div className="inline-flex flex-col items-center bg-white rounded-lg shadow-sm border border-slate-200 p-3 w-48 relative z-10 hover:border-emerald-300 transition-colors">
                <div className="w-16 h-20 mb-3 rounded-md overflow-hidden border border-slate-100 relative bg-slate-200 flex items-center justify-center">
                    {node.foto ? (
                        <img src={node.foto} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-slate-600 font-bold text-sm">{getInitials(node.nama)}</span>
                    )}
                </div>
                <h3 className="text-xs font-bold text-slate-700 mb-0.5 leading-tight text-center">{node.nama}</h3>
                <p className="text-[10px] text-slate-500 text-center">{node.jabatan}</p>

                <Link href={`${route('admin.profil.struktur-organisasi.create')}?urutan=${encodeURIComponent(node.urutan + 'A')}&parent_id=${node.id}`} className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-white border border-slate-300 rounded-full flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-500 hover:shadow-sm transition-all z-20" title="Tambah Bawahan">
                    <Plus className="w-3 h-3" />
                </Link>
                
                {node.parent_id && (
                    <Link href={`${route('admin.profil.struktur-organisasi.create')}?urutan=${encodeURIComponent(node.urutan)}&parent_id=${node.parent_id}`} className="absolute top-1/2 -right-2.5 -translate-y-1/2 w-5 h-5 bg-white border border-slate-300 rounded-full flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-500 hover:shadow-sm transition-all z-20" title="Tambah Sejajar">
                        <Plus className="w-3 h-3" />
                    </Link>
                )}
            </div>
            
            {node.children && node.children.length > 0 && (
                <ul>
                    {node.children.map(child => (
                        <TreeNode key={child.id} node={child} />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default function Index({ auth, organisasi, jabatanTree, pengaturan }) {
    const { delete: destroy } = useForm();
    const [isLoaded, setIsLoaded] = useState(true);
    const [selectedIds, setSelectedIds] = useState([]);
    const [previewBanner, setPreviewBanner] = useState(null);

    const { data: bannerData, setData: setBannerData, post: postBanner, processing: processingBanner, errors: errorsBanner } = useForm({
        banner_image: null,
        deskripsi: pengaturan?.deskripsi || ''
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Data anggota struktur ini akan dihapus secara permanen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#059669',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('admin.profil.struktur-organisasi.destroy', id));
            }
        });
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(organisasi.map(item => item.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelect = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(itemId => itemId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleBulkDelete = () => {
        Swal.fire({
            title: 'Hapus Massal?',
            text: `Apakah Anda yakin ingin menghapus ${selectedIds.length} anggota terpilih secara permanen?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#059669',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Ya, hapus semua!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route('admin.profil.struktur-organisasi.bulk-destroy'), {
                    ids: selectedIds
                }, {
                    onSuccess: () => setSelectedIds([])
                });
            }
        });
    };

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBannerData('banner_image', file);
            setPreviewBanner(URL.createObjectURL(file));
        }
    };

    const handleSaveBanner = (e) => {
        e.preventDefault();
        postBanner(route('admin.profil.struktur-organisasi.update-banner'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setBannerData('banner_image', null);
            }
        });
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
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold text-slate-800">Kelola Halaman: Struktur Organisasi</h1>
                                <p className="text-sm text-slate-500">Ubah isi konten yang akan tampil di halaman publik Struktur Organisasi.</p>
                            </div>
                            <Link href={route('admin.profil.struktur-organisasi.create')}>
                                <PrimaryButton className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                                    <Plus className="w-4 h-4" />
                                    Tambah Anggota
                                </PrimaryButton>
                            </Link>
                        </div>

                        {/* Panel Pengaturan Banner */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-slate-200 mb-8">
                            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Image className="w-5 h-5" /></div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Banner Halaman Publik</h3>
                                    <p className="text-sm text-slate-500">Atur gambar latar belakang untuk halaman Struktur Organisasi.</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <form onSubmit={handleSaveBanner} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-slate-700">Gambar Banner Saat Ini</label>
                                        <div className="relative w-full h-64 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                            <img 
                                                src={previewBanner ? previewBanner : (pengaturan?.banner_image ? (pengaturan.banner_image.startsWith('/storage/') || pengaturan.banner_image.startsWith('http') ? pengaturan.banner_image : `/storage/${pengaturan.banner_image}`) : "/images/default-banner.jpg")} 
                                                alt="Preview" 
                                                className="w-full h-full object-cover" 
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                                            <div className="absolute bottom-6 left-6 z-10 text-white">
                                                <h1 className="text-3xl font-extrabold mb-2 drop-shadow-md">Struktur Organisasi</h1>
                                                <div className="w-16 h-1.5 bg-amber-500 rounded-sm mb-4"></div>
                                                {bannerData.deskripsi && (
                                                    <p className="text-white/90 max-w-2xl text-sm leading-relaxed drop-shadow">
                                                        {bannerData.deskripsi}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label htmlFor="deskripsi" className="block text-sm font-medium text-slate-700">Deskripsi Halaman (Opsional)</label>
                                            <textarea
                                                id="deskripsi"
                                                rows="3"
                                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                placeholder="Tuliskan deskripsi singkat..."
                                                value={bannerData.deskripsi}
                                                onChange={e => setBannerData('deskripsi', e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-slate-700">Ganti Banner (Maks. 2MB, JPG/PNG)</label>
                                            <label className={`flex justify-center w-full h-32 px-4 transition bg-white border-2 border-slate-300 border-dashed rounded-md cursor-pointer hover:border-emerald-500 ${errorsBanner.banner_image ? 'border-red-500' : ''}`}>
                                                <span className="flex items-center space-x-2"><Upload className="w-6 h-6 text-slate-600" /><span className="font-medium text-slate-600">Klik untuk mengunggah file gambar</span></span>
                                                <input 
                                                    type="file" 
                                                    name="banner_image" 
                                                    className="hidden" 
                                                    accept="image/*" 
                                                    onChange={handleBannerChange}
                                                />
                                            </label>
                                            {errorsBanner.banner_image && <p className="text-sm text-red-600 mt-1">{errorsBanner.banner_image}</p>}
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-4 border-t border-slate-100">
                                        <PrimaryButton type="submit" disabled={processingBanner}>
                                            Simpan Banner
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Visualisasi Organogram */}
                        <div className="bg-white rounded-[5px] shadow-sm border border-slate-200 overflow-x-auto mb-8 p-6">
                            <h3 className="text-lg font-bold text-slate-800 mb-2">Visualisasi Struktur</h3>
                            <p className="text-sm text-slate-500 mb-6">Bagan organisasi berdasarkan urutan level. Anda dapat menambahkan bawahan/sejajar menggunakan tombol (+).</p>
                            
                            {jabatanTree && jabatanTree.length > 0 ? (
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
                                            {jabatanTree.map(rootNode => (
                                                <TreeNode key={rootNode.id} node={rootNode} />
                                            ))}
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
                                {selectedIds.length > 0 && (
                                    <button 
                                        onClick={handleBulkDelete}
                                        className="px-3 py-1.5 text-sm bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:border-red-300 rounded-[5px] flex items-center gap-1.5 transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        Hapus Terpilih ({selectedIds.length})
                                    </button>
                                )}
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="px-6 py-4 w-10">
                                                <input 
                                                    type="checkbox" 
                                                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                                    onChange={handleSelectAll}
                                                    checked={organisasi.length > 0 && selectedIds.length === organisasi.length}
                                                />
                                            </th>
                                            <th className="px-6 py-4">Foto</th>
                                            <th className="px-6 py-4">Nama Lengkap</th>
                                            <th className="px-6 py-4">Jabatan</th>
                                            <th className="px-6 py-4 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {organisasi.length > 0 ? (
                                            organisasi.map((item) => (
                                                <tr key={item.id} className={`border-b border-slate-100 hover:bg-slate-50/50 ${selectedIds.includes(item.id) ? 'bg-emerald-50/30' : ''}`}>
                                                    <td className="px-6 py-4">
                                                        <input 
                                                            type="checkbox" 
                                                            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                                            checked={selectedIds.includes(item.id)}
                                                            onChange={() => handleSelect(item.id)}
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {item.foto ? (
                                                            <img src={item.foto} alt={item.nama} className="w-12 h-16 rounded-md object-cover border border-slate-200" />
                                                        ) : (
                                                            <div className="w-12 h-16 rounded-md bg-slate-100 text-slate-600 font-bold flex items-center justify-center border border-slate-200">
                                                                {getInitials(item.nama)}
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
                                                <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
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
