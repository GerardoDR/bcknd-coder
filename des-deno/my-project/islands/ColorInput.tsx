import { Handlers, PageProps } from "$fresh/server.ts";
import { useState } from "preact/hooks";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const resp = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const data = await resp.json();  
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

  }
};


export default function ColorInput(props) {
  
  console.log(props.data);
  
  // const [updColor, setUpdColor] = useState([]);

  // const colorHandler = async (event: any) => {
  //   let newColors = [...updColor]
  //   newColors.push(event.target[0].value)
  //   await pushColors(newColors);
  //   await setUpdColor(await handler());
  //   // setUpdColor(newColors);
  //   event.target[0].value = '';
  //   event.preventDefault();
  // }

  return (
    <div>
      <form method="post">
        <label>Color: </label>
        <input type="text" name="color" />
        <button type="submit" value="Submit">Add color</button>
      </form>
      <ul>
        {/* {props.colors.map(color => <li style={{ color: color }}>{color}</li>)} */}
      </ul>
    </div>
  );
}