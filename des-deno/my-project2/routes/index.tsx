import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const resp = await fetch('http://localhost:8000/api/colors')
    const data = await resp.json();
    console.log(data);
    
    return ctx.render(data);
  },
  async POST(req, ctx) {
    const a = req.body.getReader();
    const b = await a.read();
    const c = new TextDecoder().decode(b.value);
    const body = Object.fromEntries(new URLSearchParams(c))

    const newPost = await fetch('http://localhost:8000/api/colors', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    const newPostJson = await newPost.json();
    console.log(newPostJson);

    const JSONcolors = await fetch('http://localhost:8000/api/colors')
    const colorsToRender = await JSONcolors.json();
    return ctx.render(colorsToRender);
  }
};

export default function Home(props) {

  return (
    <div class="p-4 mx-auto max-w-screen-md">
      <ul style={{ backgroundColor: '#000' }}>
        {props.data.map(color => <li style={{ color: color }}>{color}</li>)}
      </ul>
      <form method="POST">
        <label>Color: </label>
        <input type="text" name="color" />
        <button type="submit" value="Submit">Add color</button>
      </form>
    </div>
  );
}