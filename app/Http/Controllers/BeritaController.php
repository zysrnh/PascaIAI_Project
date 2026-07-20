<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\PengaturanHalaman;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class BeritaController extends Controller
{
    // ADMIN ROUTES
    public function index()
    {
        $beritas = Berita::orderBy('created_at', 'desc')->get();
        $pengaturan = PengaturanHalaman::firstOrCreate(
            ['halaman' => 'berita'],
            ['banner_image' => null]
        );
        
        $beritas->transform(function ($item) {
            if ($item->gambar) {
                $item->gambar_url = Storage::url($item->gambar);
            }
            return $item;
        });

        return Inertia::render('Admin/Berita/Index', [
            'beritas' => $beritas,
            'pengaturan' => $pengaturan
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'konten' => 'required|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_published' => 'boolean'
        ]);

        $data = $request->except(['gambar']);
        $data['slug'] = Str::slug($request->judul);
        
        // Ensure unique slug
        $count = Berita::where('slug', 'LIKE', $data['slug'] . '%')->count();
        if ($count > 0) {
            $data['slug'] = $data['slug'] . '-' . time();
        }

        if ($request->hasFile('gambar')) {
            $data['gambar'] = $request->file('gambar')->store('berita', 'public');
        }

        Berita::create($data);

        return redirect()->back()->with('success', 'Berita berhasil ditambahkan!');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'konten' => 'required|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_published' => 'boolean'
        ]);

        $berita = Berita::findOrFail($id);
        $data = $request->except(['gambar']);
        
        if ($request->judul !== $berita->judul) {
            $data['slug'] = Str::slug($request->judul);
            $count = Berita::where('slug', 'LIKE', $data['slug'] . '%')->where('id', '!=', $id)->count();
            if ($count > 0) {
                $data['slug'] = $data['slug'] . '-' . time();
            }
        }

        if ($request->hasFile('gambar')) {
            if ($berita->gambar) {
                Storage::disk('public')->delete($berita->gambar);
            }
            $data['gambar'] = $request->file('gambar')->store('berita', 'public');
        }

        $berita->update($data);

        return redirect()->back()->with('success', 'Berita berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $berita = Berita::findOrFail($id);
        if ($berita->gambar) {
            Storage::disk('public')->delete($berita->gambar);
        }
        $berita->delete();

        return redirect()->back()->with('success', 'Berita berhasil dihapus!');
    }
    
    public function updatePengaturan(Request $request)
    {
        $request->validate([
            'banner_image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'deskripsi' => 'nullable|string'
        ]);

        $pengaturan = PengaturanHalaman::firstOrCreate(
            ['halaman' => 'berita'],
            ['banner_image' => null]
        );

        if ($pengaturan->banner_image) {
            Storage::disk('public')->delete($pengaturan->banner_image);
        }

        $path = $request->file('banner_image')->store('banners', 'public');
        $pengaturan->update([
            'banner_image' => $path,
            'deskripsi' => $request->deskripsi
        ]);

        return redirect()->back()->with('success', 'Banner Berita berhasil diperbarui!');
    }

    // PUBLIC ROUTES
    public function publicIndex()
    {
        $beritas = Berita::where('is_published', true)->orderBy('created_at', 'desc')->paginate(9);
        $pengaturan = PengaturanHalaman::firstOrCreate(
            ['halaman' => 'berita'],
            ['banner_image' => null]
        );

        if ($pengaturan && !$pengaturan->banner_image) {
            $pengaturan->banner_image = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop";
        } elseif ($pengaturan && $pengaturan->banner_image) {
            $pengaturan->banner_image = Storage::url($pengaturan->banner_image);
        }
        
        // Transform the items in the paginator
        $beritas->getCollection()->transform(function ($item) {
            if ($item->gambar) {
                $item->gambar_url = Storage::url($item->gambar);
            }
            return $item;
        });

        return Inertia::render('Public/Berita/Index', [
            'beritas' => $beritas,
            'pengaturan' => $pengaturan
        ]);
    }
    
    public function showPublic($slug)
    {
        $berita = Berita::where('slug', $slug)->where('is_published', true)->firstOrFail();
        
        // Increment views
        $berita->increment('views');
        
        if ($berita->gambar) {
            $berita->gambar_url = Storage::url($berita->gambar);
        }
        
        // Get 3 recent news for sidebar
        $recentBeritas = Berita::where('id', '!=', $berita->id)
                               ->where('is_published', true)
                               ->orderBy('created_at', 'desc')
                               ->take(3)
                               ->get();
                               
        $recentBeritas->transform(function ($item) {
            if ($item->gambar) {
                $item->gambar_url = Storage::url($item->gambar);
            }
            return $item;
        });

        return Inertia::render('Public/Berita/Show', [
            'berita' => $berita,
            'recentBeritas' => $recentBeritas
        ]);
    }
}
