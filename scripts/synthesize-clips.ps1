param([Parameter(Mandatory=$true)][string]$Project)
$ErrorActionPreference='Stop'
$root=Resolve-Path (Join-Path $PSScriptRoot '..')
$projectPath=Resolve-Path (Join-Path $root $Project)
$story=Get-Content -Raw -Encoding UTF8 (Join-Path $projectPath 'storyboard.json')|ConvertFrom-Json
$clipsDir=Join-Path $projectPath 'audio/clips';New-Item -ItemType Directory -Force $clipsDir|Out-Null
Add-Type -AssemblyName System.Speech
$durations=@{}
$clips=@()
foreach($segment in $story.narrationSegments){
  $hashBytes=[System.Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes("local-system|rate=1|$($segment.text)"))
  $hash=[Convert]::ToHexString($hashBytes).ToLower()
  $cache=Join-Path $projectPath "audio/cache-$hash.wav";$clip=Join-Path $clipsDir "$($segment.id).wav"
  if(!(Test-Path $cache)){$voice=New-Object System.Speech.Synthesis.SpeechSynthesizer;$zh=$voice.GetInstalledVoices()|Where-Object{$_.VoiceInfo.Culture.Name -like 'zh-*'}|Select-Object -First 1;if(!$zh){$voice.Dispose();throw '系统没有安装中文语音，已停止生成，避免错误语言的配音进入视频。'};$voice.SelectVoice($zh.VoiceInfo.Name);$voice.Rate=1;$voice.Volume=100;$voice.SetOutputToWaveFile($cache);$voice.Speak([string]$segment.text);$voice.Dispose()}
  Copy-Item -Force $cache $clip
  $seconds=[double](& ffprobe -v error -show_entries format=duration -of default=nk=1:nw=1 $clip)
  $durations[$segment.id]=$seconds
  $clips += $clip
}
$durations|ConvertTo-Json|Set-Content -Encoding UTF8 (Join-Path $projectPath 'audio/clip-durations.json')
$voiceOut=Join-Path $projectPath 'audio/voice.wav'
$ffmpegArgs=@('-y')
foreach($clip in $clips){$ffmpegArgs+=@('-i',$clip)}
$ffmpegArgs+=@('-filter_complex',"concat=n=$($clips.Count):v=0:a=1[outa]",'-map','[outa]','-ar','48000','-ac','1',$voiceOut,'-loglevel','error')
& ffmpeg @ffmpegArgs
if($LASTEXITCODE -ne 0){throw '无法把分段口播合并为 audio/voice.wav。'}
@{provider='windows-system-speech';quality='system-voice';mock=$false;segments=$clips.Count;output='audio/voice.wav'}|ConvertTo-Json|Set-Content -Encoding UTF8 (Join-Path $projectPath 'audio/voice-metadata.json')
Write-Output "已生成 $($story.narrationSegments.Count) 个缓存片段和 audio/voice.wav。请继续运行 jm align。"
