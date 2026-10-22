param([string]$Output = "public/audio/airplane.wav")
$ErrorActionPreference = 'Stop'
$root = Resolve-Path (Join-Path $PSScriptRoot '..')
$outPath = Join-Path $root $Output
$outDir = Split-Path $outPath -Parent
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$text = Get-Content -Raw -Encoding UTF8 (Join-Path $root 'examples/airplane/narration.txt')
Add-Type -AssemblyName System.Speech
$voice = New-Object System.Speech.Synthesis.SpeechSynthesizer
$zh = $voice.GetInstalledVoices() | Where-Object { $_.VoiceInfo.Culture.Name -like 'zh-*' } | Select-Object -First 1
if ($zh) { $voice.SelectVoice($zh.VoiceInfo.Name) }
$voice.Rate = 1
$voice.Volume = 100
$voice.SetOutputToWaveFile($outPath)
$voice.Speak($text)
$voice.Dispose()
$ambientPath = Join-Path $root 'public/audio/ambient.wav'
& ffmpeg -y -f lavfi -i "sine=frequency=110:sample_rate=48000:duration=120" -af "volume=0.08,afade=t=in:st=0:d=3,afade=t=out:st=119.8:d=0.2" $ambientPath -loglevel error
if ($LASTEXITCODE -ne 0) { throw 'Failed to generate procedural ambient audio.' }
Write-Output "Generated local system voice: $outPath"
Write-Output "Generated procedural ambient bed: $ambientPath"
