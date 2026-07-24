<?php

namespace App\Http\Controllers;

use App\Models\PedomanAkademik;
use App\Models\PedomanFolder;
use App\Models\PengaturanHalaman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PedomanAkademikController extends Controller
{
    /**
     * Display the Admin page for Pedoman Akademik (Google Drive style).
     */
    public function indexAdmin(Request $request)
    {
        $folderId = $request->query('folder_id');
        $currentFolder = null;
        $breadcrumb = [];

        if ($folderId) {
            $currentFolder = PedomanFolder::findOrFail($folderId);
            // Build breadcrumb
            $breadcrumb = $currentFolder->breadcrumb->map(fn($f) => [
                'id' => $f->id,
                'nama' => $f->nama,
            ])->toArray();
        }

        // Get folders in current level
        $folders = PedomanFolder::where('parent_id', $folderId)
            ->orderBy('urutan')
            ->orderBy('nama')
            ->get();

        // Get documents in current level
        $documents = PedomanAkademik::where('folder_id', $folderId)
            ->orderBy('id', 'desc')
            ->get();

        $pengaturan = PengaturanHalaman::where('halaman', 'pedoman_akademik')->first();

        return Inertia::render('Admin/Akademik/Pedoman/Index', [
            'folders' => $folders,
            'documents' => $documents,
            'currentFolder' => $currentFolder,
            'breadcrumb' => $breadcrumb,
            'pengaturan' => $pengaturan,
            'currentFolderId' => $folderId ? (int)$folderId : null,
        ]);
    }

    /**
     * Display the Public page for Pedoman Akademik.
     */
    public function indexPublic(Request $request)
    {
        $folderId = $request->query('folder_id');
        $currentFolder = null;
        $breadcrumb = [];

        if ($folderId) {
            $currentFolder = PedomanFolder::findOrFail($folderId);
            $breadcrumb = $currentFolder->breadcrumb->map(fn($f) => [
                'id' => $f->id,
                'nama' => $f->nama,
            ])->toArray();
        }

        $folders = PedomanFolder::where('parent_id', $folderId)
            ->orderBy('urutan')
            ->orderBy('nama')
            ->get();

        $documents = PedomanAkademik::where('folder_id', $folderId)
            ->orderBy('id', 'desc')
            ->get();

        $pengaturan = PengaturanHalaman::where('halaman', 'pedoman_akademik')->first();

        // Format banner image path if exists
        if ($pengaturan && $pengaturan->banner_image) {
            $pengaturan->banner_image = Storage::url($pengaturan->banner_image);
        }

        return Inertia::render('Public/PedomanAkademik', [
            'folders' => $folders,
            'documents' => $documents,
            'currentFolder' => $currentFolder,
            'breadcrumb' => $breadcrumb,
            'pengaturan' => $pengaturan,
            'currentFolderId' => $folderId ? (int)$folderId : null,
        ]);
    }

    /**
     * Store a newly created document in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'file_pdf' => 'required|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx|max:20480', // max 20MB
            'folder_id' => 'nullable|exists:pedoman_folders,id',
        ]);

        if ($request->hasFile('file_pdf')) {
            $file = $request->file('file_pdf');
            $path = $file->store('pedoman', 'public');
            $extension = strtolower($file->getClientOriginalExtension());
            
            PedomanAkademik::create([
                'judul' => $validated['judul'],
                'deskripsi' => $validated['deskripsi'],
                'file_path' => $path,
                'folder_id' => $validated['folder_id'] ?? null,
                'tipe_file' => $extension,
            ]);
        }

        return redirect()->back()->with('success', 'Dokumen berhasil ditambahkan!');
    }

    /**
     * Update the specified document in storage.
     */
    public function update(Request $request, string $id)
    {
        $pedoman = PedomanAkademik::findOrFail($id);

        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'file_pdf' => 'nullable|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx|max:20480',
        ]);

        $pedoman->judul = $validated['judul'];
        $pedoman->deskripsi = $validated['deskripsi'];

        if ($request->hasFile('file_pdf')) {
            if ($pedoman->file_path) {
                Storage::disk('public')->delete($pedoman->file_path);
            }
            $file = $request->file('file_pdf');
            $pedoman->file_path = $file->store('pedoman', 'public');
            $pedoman->tipe_file = strtolower($file->getClientOriginalExtension());
        }

        $pedoman->save();

        return redirect()->back()->with('success', 'Dokumen berhasil diperbarui!');
    }

    /**
     * Remove the specified document from storage.
     */
    public function destroy(string $id)
    {
        $pedoman = PedomanAkademik::findOrFail($id);
        
        if ($pedoman->file_path) {
            Storage::disk('public')->delete($pedoman->file_path);
        }
        
        $pedoman->delete();

        return redirect()->back()->with('success', 'Dokumen berhasil dihapus!');
    }

    /**
     * Update the banner and description settings.
     */
    public function updatePengaturan(Request $request)
    {
        $request->validate([
            'banner_image' => 'nullable|image|max:2048',
            'deskripsi' => 'nullable|string'
        ]);

        $pengaturan = PengaturanHalaman::firstOrCreate(
            ['halaman' => 'pedoman_akademik']
        );

        if ($request->hasFile('banner_image')) {
            if ($pengaturan->banner_image) {
                Storage::disk('public')->delete($pengaturan->banner_image);
            }
            
            $path = $request->file('banner_image')->store('pengaturan', 'public');
            $pengaturan->banner_image = $path;
        }

        $pengaturan->deskripsi = $request->deskripsi;
        $pengaturan->save();

        return redirect()->back()->with('success', 'Pengaturan banner berhasil diperbarui!');
    }
}
