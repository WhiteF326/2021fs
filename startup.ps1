if (gcm deno -ea SilentlyContinue){
  if(gcm denon -ea SilentlyContinue){
    echo ":) ready to boot"
  }else{
    deno install --allow-read --allow-run --allow-write --allow-net -f -q --unstable https://deno.land/x/denon@2.4.0/denon.ts
  }
}else{
  iwr https://deno.land/x/install/install.ps1 -useb | iex
  deno install --allow-read --allow-run --allow-write --allow-net -f -q --unstable https://deno.land/x/denon@2.4.0/denon.ts
}
denon run -A server.js
