<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class JadwalTemplateExport implements FromArray, WithHeadings, WithStyles, ShouldAutoSize
{
    public function array(): array
    {
        return [
            [
                'Pendidikan Agama Islam (M.Pd.)',
                1,
                'Studi Al-Qur\'an dan Al-Hadits',
                2,
                'Dr. Fulan',
                'Senin',
                '08:00',
                '10:00',
                'Ruang 1'
            ]
        ];
    }

    public function headings(): array
    {
        return [
            'Program Studi',
            'Semester (Angka)',
            'Mata Kuliah',
            'SKS',
            'Dosen Pengampu',
            'Hari',
            'Jam Mulai (HH:MM)',
            'Jam Selesai (HH:MM)',
            'Ruangan'
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            // Style the first row as bold text.
            1    => ['font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']], 'fill' => ['fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID, 'startColor' => ['rgb' => '059669']]],
        ];
    }
}
