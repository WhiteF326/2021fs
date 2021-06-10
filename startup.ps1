if (Get-Command deno -ea SilentlyContinue){
  if(Get-Command denon -ea SilentlyContinue){
    Write-Output ":) ready to boot"
  }else{
    deno install --allow-read --allow-run --allow-write --allow-net -f -q --unstable https://deno.land/x/denon@2.4.0/denon.ts
  }
}else{
  Invoke-WebRequest https://deno.land/x/install/install.ps1 -useb | Invoke-Expression
  deno install --allow-read --allow-run --allow-write --allow-net -f -q --unstable https://deno.land/x/denon@2.4.0/denon.ts
}
denon start
