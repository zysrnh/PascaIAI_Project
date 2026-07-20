import React, { useState } from 'react';
import { Head, useForm, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    ArrowLeft,
    Plus, 
    Edit, 
    Trash2, 
    AlertCircle,
    BookOpen
} from 'lucide-react';
import Swal from 'sweetalert2';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import Sidebar from '@/Components/Admin/Sidebar';

export default function KurikulumMataKuliah({ auth, kurikulum, programStudis, mataKuliahs }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [activeProdi, setActiveProdi] = useState(programStudis.length > 0 ? programStudis[0].id : null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        program_studi_id: activeProdi || '',
        semester: 1,
        jenis: 'Wajib Program Studi',
        kode_mk: '',
        nama_mk: '',
        sks: 3
    });

    // Filter matakuliah based on active prodi
    const filteredMataKuliahs = mataKuliahs.filter(mk => mk.program_studi_id === activeProdi);

    // Group by semester
    const groupedBySemester = filteredMataKuliahs.reduce((acc, curr) => {
        if (!acc[curr.semester]) acc[curr.semester] = [];
        acc[curr.semester].push(curr);
        return acc;
    }, {});

    const semesters = Object.keys(groupedBySemester).sort((a, b) => Number(a) - Number(b));

    const openModal = (mataKuliah = null) => {
        clearErrors();
        if (mataKuliah) {
            setEditingId(mataKuliah.id);
            setData({
                program_studi_id: mataKuliah.program_studi_id,
                semester: mataKuliah.semester,
                jenis: mataKuliah.jenis,
                kode_mk: mataKuliah.kode_mk,
                nama_mk: mataKuliah.nama_mk,
                sks: mataKuliah.sks
            });
        } else {
            setEditingId(null);
            setData({
                program_studi_id: activeProdi || (programStudis.length > 0 ? programStudis[0].id : ''),
                semester: 1,
                jenis: 'Wajib Program Studi',
                kode_mk: '',
                nama_mk: '',
                sks: 3
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => reset(), 300);
    };

    const submit = (e) => {
        e.preventDefault();
        
        const options = {
            onSuccess: () => {
                closeModal();
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: `Mata kuliah berhasil ${editingId ? 'diperbarui' : 'ditambahkan'}.`,
                    confirmButtonColor: '#10b981',
                });
            },
        };

        if (editingId) {
            put(route('admin.akademik.kurikulum.matakuliah.update', editingId), options);
        } else {
            post(route('admin.akademik.kurikulum.matakuliah.store', kurikulum.id), options);
        }
    };

    const deleteMataKuliah = (id) => {
        Swal.fire({
            title: 'Hapus Mata Kuliah?',
            text: "Data mata kuliah akan terhapus secara permanen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.akademik.kurikulum.matakuliah.destroy', id), {
                    onSuccess: () => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Terhapus!',
                            text: 'Mata kuliah berhasil dihapus.',
                            confirmButtonColor: '#10b981',
                        });
                    }
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <Link href={route('admin.akademik.kurikulum.index')} className="text-emerald-200 hover:text-white transition-colors bg-emerald-900/50 p-2 rounded-full">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-emerald-100">
                        Mata Kuliah: {kurikulum.nama} ({kurikulum.tahun_akademik})
                    </h2>
                </div>
            }
        >
            <Head title={`Kelola MK - ${kurikulum.nama}`} />

            <div className="flex">
                <Sidebar />
                <div className="flex-1 min-h-screen bg-slate-50">
                    <div className="py-8">
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-slate-200">
                        <div className="border-b border-slate-200 bg-slate-50 p-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex-1 w-full md:max-w-md">
                                    <InputLabel value="Filter Program Studi" className="mb-2" />
                                    <select 
                                        className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={activeProdi || ''}
                                        onChange={(e) => setActiveProdi(Number(e.target.value))}
                                    >
                                        {programStudis.map(ps => (
                                            <option key={ps.id} value={ps.id}>{ps.nama} ({ps.jenjang}) - {ps.fakultas.nama}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex-shrink-0 pt-6">
                                    <button 
                                        onClick={() => openModal()} 
                                        className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors text-sm"
                                        disabled={!activeProdi}
                                    >
                                        <Plus className="w-4 h-4" /> Tambah Mata Kuliah
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-white">
                            {semesters.length === 0 ? (
                                <div className="text-center py-12 px-4 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                                    <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
                                        <BookOpen className="w-8 h-8 text-slate-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-1">Belum ada mata kuliah</h3>
                                    <p className="text-slate-500 mb-4 max-w-md mx-auto">Silakan tambahkan data mata kuliah untuk program studi terpilih pada kurikulum ini.</p>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {semesters.map(semester => (
                                        <div key={semester} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                                            <div className="bg-slate-100/70 border-b border-slate-200 px-4 py-3 font-bold text-slate-800 flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold shadow-sm border border-emerald-200">
                                                    {semester}
                                                </div>
                                                Semester {semester}
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left text-sm border-collapse">
                                                    <thead>
                                                        <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs uppercase tracking-wider">
                                                            <th className="px-4 py-3 font-semibold w-1/6">Kode MK</th>
                                                            <th className="px-4 py-3 font-semibold w-2/6">Nama Mata Kuliah</th>
                                                            <th className="px-4 py-3 font-semibold w-1/6 text-center">SKS</th>
                                                            <th className="px-4 py-3 font-semibold w-1/6">Jenis MK</th>
                                                            <th className="px-4 py-3 font-semibold w-1/6 text-right">Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-slate-100 bg-white">
                                                        {groupedBySemester[semester].map(mk => (
                                                            <tr key={mk.id} className="hover:bg-slate-50 transition-colors">
                                                                <td className="px-4 py-3 font-medium text-slate-700">{mk.kode_mk}</td>
                                                                <td className="px-4 py-3 text-slate-800 font-semibold">{mk.nama_mk}</td>
                                                                <td className="px-4 py-3 text-center">
                                                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs">
                                                                        {mk.sks}
                                                                    </span>
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-medium">
                                                                        {mk.jenis}
                                                                    </span>
                                                                </td>
                                                                <td className="px-4 py-3 text-right whitespace-nowrap">
                                                                    <button 
                                                                        onClick={() => openModal(mk)} 
                                                                        className="text-slate-500 hover:text-indigo-600 bg-white hover:bg-indigo-50 border border-transparent hover:border-indigo-100 p-1.5 rounded-md transition-all mr-1"
                                                                        title="Edit"
                                                                    >
                                                                        <Edit className="w-4 h-4" />
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => deleteMataKuliah(mk.id)} 
                                                                        className="text-slate-500 hover:text-red-600 bg-white hover:bg-red-50 border border-transparent hover:border-red-100 p-1.5 rounded-md transition-all"
                                                                        title="Hapus"
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>

            {/* Modal Tambah/Edit MK */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="xl">
                <form onSubmit={submit} className="p-6">
                    <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                        <h2 className="text-xl font-bold text-slate-800">
                            {editingId ? 'Edit Mata Kuliah' : 'Tambah Mata Kuliah'}
                        </h2>
                        <button type="button" onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                            <span className="text-2xl leading-none">&times;</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <InputLabel htmlFor="program_studi_id" value="Program Studi" />
                            <select 
                                id="program_studi_id"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                value={data.program_studi_id}
                                onChange={(e) => setData('program_studi_id', e.target.value)}
                                disabled={editingId ? true : false} // Lock prodi on edit to prevent accidental moves
                            >
                                {programStudis.map(ps => (
                                    <option key={ps.id} value={ps.id}>{ps.nama} ({ps.jenjang})</option>
                                ))}
                            </select>
                            <InputError message={errors.program_studi_id} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="kode_mk" value="Kode Mata Kuliah" />
                            <TextInput
                                id="kode_mk"
                                type="text"
                                className="mt-1 block w-full uppercase"
                                value={data.kode_mk}
                                onChange={(e) => setData('kode_mk', e.target.value)}
                                placeholder="Cth: IAI201"
                                required
                            />
                            <InputError message={errors.kode_mk} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="sks" value="Jumlah SKS" />
                            <TextInput
                                id="sks"
                                type="number"
                                min="1"
                                max="10"
                                className="mt-1 block w-full"
                                value={data.sks}
                                onChange={(e) => setData('sks', e.target.value)}
                                required
                            />
                            <InputError message={errors.sks} className="mt-2" />
                        </div>

                        <div className="md:col-span-2">
                            <InputLabel htmlFor="nama_mk" value="Nama Mata Kuliah" />
                            <TextInput
                                id="nama_mk"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.nama_mk}
                                onChange={(e) => setData('nama_mk', e.target.value)}
                                placeholder="Masukkan nama mata kuliah lengkap"
                                required
                            />
                            <InputError message={errors.nama_mk} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="semester" value="Semester" />
                            <select 
                                id="semester"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                value={data.semester}
                                onChange={(e) => setData('semester', e.target.value)}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                                    <option key={s} value={s}>Semester {s}</option>
                                ))}
                            </select>
                            <InputError message={errors.semester} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="jenis" value="Jenis Mata Kuliah" />
                            <select 
                                id="jenis"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                value={data.jenis}
                                onChange={(e) => setData('jenis', e.target.value)}
                            >
                                <option value="Wajib Program Studi">Wajib Program Studi</option>
                                <option value="Wajib Nasional">Wajib Nasional</option>
                                <option value="Wajib Institusi">Wajib Institusi</option>
                                <option value="Pilihan">Pilihan</option>
                                <option value="Tugas Akhir/Tesis/Disertasi">Tugas Akhir/Tesis/Disertasi</option>
                            </select>
                            <InputError message={errors.jenis} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <SecondaryButton onClick={closeModal}>Batal</SecondaryButton>
                        <PrimaryButton disabled={processing} className="bg-emerald-600 hover:bg-emerald-700">
                            {processing ? 'Menyimpan...' : 'Simpan Data'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
