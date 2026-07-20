<?php

namespace App\Http\Controllers;

use App\Models\Repository as RepositoryModel;
use App\Models\ProgramStudi;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class RepositoryController extends Controller
{
    // Publik
    public function indexPublic(Request $request)
    {
        $query = RepositoryModel::with('prodi')->latest('tahun');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                  ->orWhere('penulis_nama', 'like', "%{$search}%")
                  ->orWhere('penulis_nim', 'like', "%{$search}%")
                  ->orWhere('kata_kunci', 'like', "%{$search}%")
                  ->orWhere('abstrak', 'like', "%{$search}%");
            });
        }

        if ($request->filled('prodi')) {
            $query->where('prodi_id', $request->prodi);
        }

        if ($request->filled('jenis')) {
            $query->where('jenis', $request->jenis);
        }

        if ($request->filled('tahun')) {
            $query->where('tahun', $request->tahun);
        }

        $repositories = $query->paginate(10)->withQueryString();
        $prodis = ProgramStudi::select('id', 'nama', 'jenjang')->get();
        $tahuns = RepositoryModel::select('tahun')->distinct()->orderBy('tahun', 'desc')->pluck('tahun');

        return Inertia::render('Public/LPPM/Repository/Index', [
            'repositories' => $repositories,
            'prodis' => $prodis,
            'tahuns' => $tahuns,
            'filters' => $request->only(['search', 'prodi', 'jenis', 'tahun'])
        ]);
    }

    public function showPublic($id)
    {
        $repository = RepositoryModel::with('prodi')->findOrFail($id);
        
        return Inertia::render('Public/LPPM/Repository/Show', [
            'repository' => $repository
        ]);
    }

    // Admin
    public function index(Request $request)
    {
        $query = RepositoryModel::with('prodi')->latest();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                  ->orWhere('penulis_nama', 'like', "%{$search}%")
                  ->orWhere('penulis_nim', 'like', "%{$search}%");
            });
        }

        $repositories = $query->paginate(10)->withQueryString();
        $prodis = ProgramStudi::select('id', 'nama', 'jenjang')->get();

        return Inertia::render('Admin/LPPM/Repository/Index', [
            'repositories' => $repositories,
            'prodis' => $prodis,
            'filters' => $request->only(['search'])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string',
            'penulis_nama' => 'required|string',
            'penulis_nim' => 'required|string',
            'prodi_id' => 'required|exists:program_studis,id',
            'dosen_pembimbing' => 'required|string',
            'tahun' => 'required|integer',
            'abstrak' => 'required|string',
            'kata_kunci' => 'nullable|string',
            'jenis' => 'required|in:tesis,disertasi,lainnya',
            'file_cover' => 'nullable|file|mimes:pdf|max:10240',
            'file_full_text' => 'nullable|file|mimes:pdf|max:51200', // 50MB
        ]);

        if ($request->hasFile('file_cover')) {
            $validated['file_cover'] = '/storage/' . $request->file('file_cover')->store('repository/cover', 'public');
        }

        if ($request->hasFile('file_full_text')) {
            $validated['file_full_text'] = '/storage/' . $request->file('file_full_text')->store('repository/full_text', 'public');
        }

        RepositoryModel::create($validated);

        return redirect()->back()->with('success', 'Data Repository berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $repository = RepositoryModel::findOrFail($id);

        $validated = $request->validate([
            'judul' => 'required|string',
            'penulis_nama' => 'required|string',
            'penulis_nim' => 'required|string',
            'prodi_id' => 'required|exists:program_studis,id',
            'dosen_pembimbing' => 'required|string',
            'tahun' => 'required|integer',
            'abstrak' => 'required|string',
            'kata_kunci' => 'nullable|string',
            'jenis' => 'required|in:tesis,disertasi,lainnya',
            'file_cover' => 'nullable|file|mimes:pdf|max:10240',
            'file_full_text' => 'nullable|file|mimes:pdf|max:51200',
        ]);

        if ($request->hasFile('file_cover')) {
            if ($repository->file_cover && strpos($repository->file_cover, '/storage/') === 0) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $repository->file_cover));
            }
            $validated['file_cover'] = '/storage/' . $request->file('file_cover')->store('repository/cover', 'public');
        }

        if ($request->hasFile('file_full_text')) {
            if ($repository->file_full_text && strpos($repository->file_full_text, '/storage/') === 0) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $repository->file_full_text));
            }
            $validated['file_full_text'] = '/storage/' . $request->file('file_full_text')->store('repository/full_text', 'public');
        }

        $repository->update($validated);

        return redirect()->back()->with('success', 'Data Repository berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $repository = RepositoryModel::findOrFail($id);

        if ($repository->file_cover && strpos($repository->file_cover, '/storage/') === 0) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $repository->file_cover));
        }
        if ($repository->file_full_text && strpos($repository->file_full_text, '/storage/') === 0) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $repository->file_full_text));
        }

        $repository->delete();

        return redirect()->back()->with('success', 'Data Repository berhasil dihapus.');
    }
}
