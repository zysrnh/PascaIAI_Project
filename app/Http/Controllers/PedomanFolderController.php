<?php

namespace App\Http\Controllers;

use App\Models\PedomanFolder;
use App\Models\PedomanAkademik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PedomanFolderController extends Controller
{
    /**
     * Store a newly created folder.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:pedoman_folders,id',
        ]);

        PedomanFolder::create([
            'nama' => $validated['nama'],
            'parent_id' => $validated['parent_id'] ?? null,
            'urutan' => 0,
        ]);

        return redirect()->back()->with('success', 'Folder berhasil dibuat!');
    }

    /**
     * Update the specified folder (rename).
     */
    public function update(Request $request, string $id)
    {
        $folder = PedomanFolder::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
        ]);

        $folder->nama = $validated['nama'];
        $folder->save();

        return redirect()->back()->with('success', 'Folder berhasil diperbarui!');
    }

    /**
     * Remove the specified folder and all its contents recursively.
     */
    public function destroy(string $id)
    {
        $folder = PedomanFolder::findOrFail($id);
        
        // Delete all files inside this folder and its subfolders recursively
        $this->deleteRecursive($folder);
        
        $folder->delete();

        return redirect()->back()->with('success', 'Folder berhasil dihapus!');
    }

    /**
     * Recursively delete folder contents (files from storage).
     */
    private function deleteRecursive(PedomanFolder $folder)
    {
        // Delete all documents in this folder from storage
        foreach ($folder->documents as $doc) {
            if ($doc->file_path) {
                Storage::disk('public')->delete($doc->file_path);
            }
        }

        // Recurse into child folders
        foreach ($folder->children as $child) {
            $this->deleteRecursive($child);
        }
    }
}
