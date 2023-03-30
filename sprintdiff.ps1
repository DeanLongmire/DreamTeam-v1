#right now this script just prints out each person's full git blame history in to their own files 
#make sure to run from DynProg directory by right clicking and doing "run code"
#all of our formats for out sprint1.commits.txt are different so I am not sure how we will be able to diff them in one script yet
Remove-Item "fhill5.txt"
Remove-Item "jbrouss2.txt"
Remove-Item "jlongmi9.txt"
Remove-Item "lbower10.txt"
Remove-Item "Ryan-Carnes-01.txt"
$outputFile = "output.txt"
Get-ChildItem -Path ".\DreamTeam\Back-End" -Filter "*.js" | ForEach-Object {
    $filename = $_.FullName
    $message = "FILENAME::$filename"
    Write-Host $message
    Invoke-Expression "git blame --show-name  $filename >> $outputFile"
}
Get-ChildItem -Path ".\DreamTeam\Back-End\controllers" -Filter "*.js" | ForEach-Object {
    $filename = $_.FullName
    $message = "FILENAME::$filename"
    Write-Host $message
    Invoke-Expression "git blame --show-name  $filename >> $outputFile"
}
Get-ChildItem -Path ".\DreamTeam\Back-End\Leagues" -Filter "*.js" | ForEach-Object {
    $filename = $_.FullName
    $message = "FILENAME::$filename"
    Write-Host $message
    Invoke-Expression "git blame --show-name  $filename >> $outputFile"
}
Get-ChildItem -Path ".\DreamTeam\Back-End\Players" -Filter "*.js" | ForEach-Object {
    $filename = $_.FullName
    $message = "FILENAME::$filename"
    Write-Host $message
    Invoke-Expression "git blame --show-name  $filename >> $outputFile"
}
Get-ChildItem -Path ".\DreamTeam\Back-End\Teams" -Filter "*.js" | ForEach-Object {
    $filename = $_.FullName
    $message = "FILENAME::$filename"
    Write-Host $message
    Invoke-Expression "git blame --show-name  $filename >> $outputFile"
}
Get-ChildItem -Path ".\DreamTeam\Back-End\Users" -Filter "*.js" | ForEach-Object {
    $filename = $_.FullName
    $message = "FILENAME::$filename"
    Write-Host $message
    Invoke-Expression "git blame --show-name  $filename >> $outputFile"
}
Get-ChildItem -Path ".\DreamTeam\Front-End" -Filter "*.js" | ForEach-Object {
    $filename = $_.FullName
    $message = "FILENAME::$filename"
    Write-Host $message
    Invoke-Expression "git blame --show-name  $filename >> $outputFile"
}
Get-ChildItem -Path ".\DreamTeam\Front-End" -Filter "*.html" | ForEach-Object {
    $filename = $_.FullName
    $message = "FILENAME::$filename"
    Write-Host $message
    Invoke-Expression "git blame --show-name  $filename >> $outputFile"
}
Get-ChildItem -Path ".\DreamTeam\Front-End" -Filter "*.css" | ForEach-Object {
    $filename = $_.FullName
    $message = "FILENAME::$filename"
    Write-Host $message
    Invoke-Expression "git blame --show-name  $filename >> $outputFile" 
}

Select-String -Path "output.txt" -Pattern "jlongmi9" | Select-Object -ExpandProperty Line | Out-File -FilePath "jlongmi9.txt" 
Select-String -Path "output.txt" -Pattern "Ryan-Carnes-01" | Select-Object -ExpandProperty Line | Out-File -FilePath "Ryan-Carnes-01.txt" 
Select-String -Path "output.txt" -Pattern "Logan Bowers" | Select-Object -ExpandProperty Line | Out-File -FilePath "lbower10.txt" 
Select-String -Path "output.txt" -Pattern "Juliana" | Select-Object -ExpandProperty Line | Out-File -FilePath "jbrouss2.txt" 
Select-String -Path "output.txt" -Pattern "Finli-Hill" | Select-Object -ExpandProperty Line | Out-File -FilePath "fhill5.txt" 
Remove-Item "output.txt"
