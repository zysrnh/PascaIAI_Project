import React, { useEffect, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { X, Upload, FileText } from 'lucide-react';

export default function Form({ isOpen, onClose, repository, prodis }) {
    const fileCoverRef = useRef();
    const fileFullRef = useRef();

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        judul: '',
        penulis_nama: '',
        penulis_nim: '',
        prodi_id: '',
        dosen_pembimbing: '',
        tahun: new Date().getFullYear(),
        abstrak: '',
        kata_kunci: '',
        jenis: 'tesis',
        file_cover: null,
        file_full_text: null,
    });

    useEffect(() => {
        if (isOpen) {
            if (repository) {
                setData({
                    judul: repository.judul,
                    penulis_nama: repository.penulis_nama,
                    penulis_nim: repository.penulis_nim,
                    prodi_id: repository.prodi_id,
                    dosen_pembimbing: repository.dosen_pembimbing,
                    tahun: repository.tahun,
                    abstrak: repository.abstrak,
                    kata_kunci: repository.kata_kunci || '',
                    jenis: repository.jenis,
                    file_cover: null,
                    file_full_text: null,
                });
            } else {
                reset();
            }
            clearErrors();
        }
    }, [isOpen, repository]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (repository) {
            post(route('admin.lppm.repository.update', repository.id), {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => onClose(),
            });
        } else {
            post(route('admin.lppm.repository.store'), {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => onClose(),
            });
        }
    };

    return (
        <Modal show={isOpen} onClose={onClose} maxWidth="4xl">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-emerald-600" />
                        {repository ? 'Edit Data Repository' : 'Tambah Data Repository'}
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[75vh]">
                    <form id="repoForm" onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Detail Penulis & Karya */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 col-span-2">
                                <InputLabel htmlFor="judul" value="Judul Karya Ilmiah *" />
                                <textarea
                                    id="judul"
                                    value={data.judul}
                                    onChange={(e) => setData('judul', e.target.value)}
                                    rows="2"
                                    className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                    required
                                />
                                {errors.judul && <p className="text-sm text-red-600 mt-1">{errors.judul}</p>}
                            </div>

                            <div className="space-y-2">
                                <InputLabel htmlFor="penulis_nama" value="Nama Penulis (Mahasiswa) *" />
                                <TextInput
                                    id="penulis_nama"
                                    type="text"
                                    value={data.penulis_nama}
                                    onChange={(e) => setData('penulis_nama', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                {errors.penulis_nama && <p className="text-sm text-red-600 mt-1">{errors.penulis_nama}</p>}
                            </div>

                            <div className="space-y-2">
                                <InputLabel htmlFor="penulis_nim" value="NIM *" />
                                <TextInput
                                    id="penulis_nim"
                                    type="text"
                                    value={data.penulis_nim}
                                    onChange={(e) => setData('penulis_nim', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                {errors.penulis_nim && <p className="text-sm text-red-600 mt-1">{errors.penulis_nim}</p>}
                            </div>

                            <div className="space-y-2">
                                <InputLabel htmlFor="prodi_id" value="Program Studi *" />
                                <select
                                    id="prodi_id"
                                    value={data.prodi_id}
                                    onChange={(e) => setData('prodi_id', e.target.value)}
                                    className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                    required
                                >
                                    <option value="">-- Pilih Program Studi --</option>
                                    {prodis.map(p => (
                                        <option key={p.id} value={p.id}>{p.jenjang} {p.nama}</option>
                                    ))}
                                </select>
                                {errors.prodi_id && <p className="text-sm text-red-600 mt-1">{errors.prodi_id}</p>}
                            </div>

                            <div className="space-y-2">
                                <InputLabel htmlFor="jenis" value="Jenis Karya *" />
                                <select
                                    id="jenis"
                                    value={data.jenis}
                                    onChange={(e) => setData('jenis', e.target.value)}
                                    className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                    required
                                >
                                    <option value="tesis">Tesis</option>
                                    <option value="disertasi">Disertasi</option>
                                    <option value="lainnya">Lainnya</option>
                                </select>
                                {errors.jenis && <p className="text-sm text-red-600 mt-1">{errors.jenis}</p>}
                            </div>

                            <div className="space-y-2">
                                <InputLabel htmlFor="dosen_pembimbing" value="Dosen Pembimbing/Promotor *" />
                                <TextInput
                                    id="dosen_pembimbing"
                                    type="text"
                                    value={data.dosen_pembimbing}
                                    onChange={(e) => setData('dosen_pembimbing', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                {errors.dosen_pembimbing && <p className="text-sm text-red-600 mt-1">{errors.dosen_pembimbing}</p>}
                            </div>

                            <div className="space-y-2">
                                <InputLabel htmlFor="tahun" value="Tahun Lulus/Terbit *" />
                                <TextInput
                                    id="tahun"
                                    type="number"
                                    value={data.tahun}
                                    onChange={(e) => setData('tahun', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                {errors.tahun && <p className="text-sm text-red-600 mt-1">{errors.tahun}</p>}
                            </div>
                            
                            <div className="space-y-2 col-span-2">
                                <InputLabel htmlFor="kata_kunci" value="Kata Kunci (Keywords)" />
                                <TextInput
                                    id="kata_kunci"
                                    type="text"
                                    value={data.kata_kunci}
                                    onChange={(e) => setData('kata_kunci', e.target.value)}
                                    className="mt-1 block w-full"
                                    placeholder="Pisahkan dengan koma (Contoh: hukum islam, pendidikan karakter)"
                                />
                                {errors.kata_kunci && <p className="text-sm text-red-600 mt-1">{errors.kata_kunci}</p>}
                            </div>

                            <div className="space-y-2 col-span-2">
                                <InputLabel htmlFor="abstrak" value="Abstrak *" />
                                <textarea
                                    id="abstrak"
                                    value={data.abstrak}
                                    onChange={(e) => setData('abstrak', e.target.value)}
                                    rows="6"
                                    className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                                    required
                                />
                                {errors.abstrak && <p className="text-sm text-red-600 mt-1">{errors.abstrak}</p>}
                            </div>
                        </div>

                        {/* File Uploads */}
                        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <div>
                                    <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                                        <Upload className="w-4 h-4 text-emerald-600" /> File Sampul / Abstrak Publik (PDF)
                                    </h4>
                                    <p className="text-xs text-slate-500 mt-1">Dapat diunduh secara bebas oleh publik. Maks 10MB.</p>
                                </div>
                                <input
                                    type="file"
                                    ref={fileCoverRef}
                                    onChange={e => setData('file_cover', e.target.files[0])}
                                    accept=".pdf"
                                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                                />
                                {errors.file_cover && <p className="text-sm text-red-600 mt-1">{errors.file_cover}</p>}
                                {repository?.file_cover && !data.file_cover && (
                                    <p className="text-xs text-emerald-600 font-medium">✓ File publik sudah terunggah</p>
                                )}
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                                        <Upload className="w-4 h-4 text-amber-600" /> File Full Text (PDF)
                                    </h4>
                                    <p className="text-xs text-slate-500 mt-1">Sifatnya tertutup / restricted. Maks 50MB.</p>
                                </div>
                                <input
                                    type="file"
                                    ref={fileFullRef}
                                    onChange={e => setData('file_full_text', e.target.files[0])}
                                    accept=".pdf"
                                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                                />
                                {errors.file_full_text && <p className="text-sm text-red-600 mt-1">{errors.file_full_text}</p>}
                                {repository?.file_full_text && !data.file_full_text && (
                                    <p className="text-xs text-amber-600 font-medium">✓ File full text sudah terunggah</p>
                                )}
                            </div>
                        </div>

                    </form>
                </div>
                
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                    <SecondaryButton onClick={onClose} disabled={processing}>
                        Batal
                    </SecondaryButton>
                    <PrimaryButton form="repoForm" disabled={processing} className="bg-emerald-600 hover:bg-emerald-700">
                        {processing ? 'Menyimpan...' : (repository ? 'Simpan Perubahan' : 'Tambah Data')}
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    );
}
