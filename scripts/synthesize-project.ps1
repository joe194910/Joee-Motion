param([Parameter(Mandatory=$true)][string]$Project)
$ErrorActionPreference='Stop'
$root=Resolve-Path (Join-Path $PSScriptRoot '..')
$projectPath=Resolve-Path (Join-Path $root $Project)
$text=Get-Content -Raw -Encoding UTF8 (Join-Path $projectPath 'narration.txt')
Add-Type -AssemblyName System.Speech
$voice=New-Object System.Speech.Synthesis.SpeechSynthesizer
$zh=$voice.GetInstalledVoices()|Where-Object{$_.VoiceInfo.Culture.Name -like 'zh-*'}|Select-Object -First 1
if(!$zh){$voice.Dispose();throw '系统没有安装中文语音，已停止生成。'}
$voice.SelectVoice($zh.VoiceInfo.Name)
$voice.Rate=1;$voice.Volume=100
$out=Join-Path $projectPath 'audio/voice.wav'
$voice.SetOutputToWaveFile($out);$voice.Speak($text);$voice.Dispose()
Write-Output "Generated: $out"
