<?php

namespace App\Imports;

use App\Models\JadwalMataKuliah;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithStartRow;

class JadwalMatkulImport implements ToModel, WithStartRow
{
    protected $periodeId;
    public $count = 0;
    public $importedLog = [];

    public function __construct($periodeId)
    {
        $this->periodeId = $periodeId;
    }

    public function model(array $row)
    {
        // Skip empty rows
        if (!isset($row[0]) || empty($row[0])) {
            return null;
        }

        // Time inputs from Excel can be weird, formatting as string
        $jamMulai = is_numeric($row[6]) ? \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row[6])->format('H:i') : $row[6];
        $jamSelesai = is_numeric($row[7]) ? \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row[7])->format('H:i') : $row[7];

        $this->count++;
        $this->importedLog[] = "Matkul {$row[2]} masuk di hari {$row[5]} jam {$jamMulai}-{$jamSelesai}";

        return new JadwalMataKuliah([
            'jadwal_periode_id' => $this->periodeId,
            'program_studi' => $row[0],
            'semester_ke' => (int) $row[1],
            'mata_kuliah' => $row[2],
            'sks' => (int) $row[3],
            'dosen_pengampu' => $row[4],
            'hari' => $row[5],
            'jam_mulai' => $jamMulai,
            'jam_selesai' => $jamSelesai,
            'ruangan' => $row[8],
        ]);
    }

    public function startRow(): int
    {
        return 2; // Skip headings
    }
}
