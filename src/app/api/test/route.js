export async function GET(){
    let req = await fetch("https://bsky.social");
    
    return new Response(await req.text(), {
        headers: {
          "Content-Type": "text/html"
        }
      });
}
