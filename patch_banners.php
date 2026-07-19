<?php
$adminFiles = [
    'resources/js/Pages/Admin/Profil/Akreditasi/Index.jsx',
    'resources/js/Pages/Admin/Profil/DokumenInstitusi/Index.jsx',
    'resources/js/Pages/Admin/Profil/StrukturOrganisasi/Index.jsx',
    'resources/js/Pages/Admin/Dosen/Index.jsx',
    'resources/js/Pages/Admin/Fakultas/Index.jsx',
    'resources/js/Pages/Admin/ProgramStudi/Index.jsx',
    'resources/js/Pages/Admin/Fakultas/ProspekKarir/Index.jsx'
];

$publicFiles = [
    'resources/js/Pages/Public/Akreditasi.jsx',
    'resources/js/Pages/Public/DokumenInstitusi.jsx',
    'resources/js/Pages/Public/StrukturOrganisasi.jsx',
    'resources/js/Pages/Public/Dosen/Index.jsx',
    'resources/js/Pages/Public/Fakultas/Index.jsx',
    'resources/js/Pages/Public/ProgramStudi/Index.jsx',
    'resources/js/Pages/Public/ProspekKarir.jsx'
];

foreach ($adminFiles as $file) {
    if (!file_exists($file)) { echo "File not found: $file\n"; continue; }
    $content = file_get_contents($file);
    
    // update form init
    $content = preg_replace("/useForm\(\{\s*banner_image:\s*null\s*\}\)/", "useForm({ banner_image: null, deskripsi: pengaturan?.deskripsi || '' })", $content);
    $content = preg_replace("/useForm\(\{\n\s*banner_image:\s*null,\n\s*\}\)/", "useForm({\n        banner_image: null,\n        deskripsi: pengaturan?.deskripsi || ''\n    })", $content);
    
    if (strpos($content, "const { data: bannerData, setData: setBannerData") !== false) {
        $content = preg_replace("/useForm\(\{\s*banner_image:\s*null\s*,\s*\}\)/", "useForm({ banner_image: null, deskripsi: pengaturan?.deskripsi || '' })", $content);
        $content = preg_replace("/useForm\(\{\s*banner_image:\s*null\s*\}\)/", "useForm({ banner_image: null, deskripsi: pengaturan?.deskripsi || '' })", $content);
    }
    
    if (strpos($content, "pengaturanForm = useForm") !== false) {
        $content = preg_replace("/useForm\(\{\n\s*banner_image:\s*null,\n\s*\}\)/", "useForm({\n        banner_image: null,\n        deskripsi: pengaturan?.deskripsi || ''\n    })", $content);
    }

    $amberRegex = '/<div className="w-16 h-1\.5 bg-amber-500 rounded-sm(?:-full)?"><\/div>\n\s*<\/div>/';
    $amberReplacement = "<div className=\"w-16 h-1.5 bg-amber-500 rounded-sm mb-4\"></div>\n                                                {(typeof formBanner !== 'undefined' ? formBanner.data.deskripsi : (typeof bannerData !== 'undefined' ? bannerData.deskripsi : (typeof pengaturanForm !== 'undefined' ? pengaturanForm.data.deskripsi : ''))) && (\n                                                    <p className=\"text-white/90 max-w-2xl text-sm leading-relaxed drop-shadow\">\n                                                        {typeof formBanner !== 'undefined' ? formBanner.data.deskripsi : (typeof bannerData !== 'undefined' ? bannerData.deskripsi : (typeof pengaturanForm !== 'undefined' ? pengaturanForm.data.deskripsi : ''))}\n                                                    </p>\n                                                )}\n                                            </div>";
    
    $content = preg_replace($amberRegex, $amberReplacement, $content);
    
    $uploadRegex = '/<label className="block text-sm font-medium text-slate-700">Ganti Banner \(Maks\. 2MB, JPG\/PNG\)<\/label>/';
    
    $textareaHTML = <<<HTML
<div className="space-y-4">
                                        <div className="space-y-2">
                                            <InputLabel htmlFor="deskripsi" value="Deskripsi Halaman (Opsional)" />
                                            <textarea
                                                id="deskripsi"
                                                rows="3"
                                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                placeholder="Tuliskan deskripsi singkat..."
                                                value={typeof formBanner !== 'undefined' ? formBanner.data.deskripsi : (typeof bannerData !== 'undefined' ? bannerData.deskripsi : (typeof pengaturanForm !== 'undefined' ? pengaturanForm.data.deskripsi : ''))}
                                                onChange={e => {
                                                    if(typeof formBanner !== 'undefined') formBanner.setData('deskripsi', e.target.value);
                                                    if(typeof setBannerData !== 'undefined') setBannerData('deskripsi', e.target.value);
                                                    if(typeof pengaturanForm !== 'undefined') pengaturanForm.setData('deskripsi', e.target.value);
                                                }}
                                            ></textarea>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-slate-700">Ganti Banner (Maks. 2MB, JPG/PNG)</label>
HTML;
    $content = str_replace('<label className="block text-sm font-medium text-slate-700">Ganti Banner (Maks. 2MB, JPG/PNG)</label>', $textareaHTML, $content);
    
    // Also add closing div for space-y-4 before submit button
    $content = str_replace('<div className="flex justify-end pt-4 border-t border-slate-100">', "</div>\n                                    <div className=\"flex justify-end pt-4 border-t border-slate-100\">", $content);

    file_put_contents($file, $content);
}

foreach ($publicFiles as $file) {
    if (!file_exists($file)) { echo "File not found: $file\n"; continue; }
    $content = file_get_contents($file);
    
    $amberRegex = '/<div className="w-20 h-1\.5 bg-amber-500 rounded-sm(?:-full)?"><\/div>/';
    $amberReplacement = "<div className=\"w-20 h-1.5 bg-amber-500 rounded-sm mb-4\"></div>\n                    {pengaturan?.deskripsi && (\n                        <p className=\"text-white/90 max-w-2xl text-lg md:text-xl leading-relaxed drop-shadow\">\n                            {pengaturan.deskripsi}\n                        </p>\n                    )}";
    
    $content = preg_replace($amberRegex, $amberReplacement, $content);
    file_put_contents($file, $content);
}

echo "Done patching.\n";
