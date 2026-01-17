$file = 'd:\complete one\gem-discover\package-lock.json'
$content = [System.IO.File]::ReadAllText($file)
$lines = $content.Split([System.Environment]::NewLine)
$output = @()
$inConflict = $false
$skip = $false

foreach ($line in $lines) {
    if ($line.StartsWith('<<<<<<< HEAD')) {
        $inConflict = $true
        $skip = $false
    } elseif ($line.StartsWith('=======')) {
        $skip = $true
    } elseif ($line -match '>>>>>>> [a-f0-9]{40}') {
        $inConflict = $false
        $skip = $false
    } elseif (-not $inConflict) {
        $output += $line
    } elseif ($inConflict -and -not $skip) {
        $output += $line
    }
}

$result = $output -join [System.Environment]::NewLine
[System.IO.File]::WriteAllText($file, $result)
