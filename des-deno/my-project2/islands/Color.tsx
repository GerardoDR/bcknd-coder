import { Handlers } from "$fresh/server.ts";
import { useState } from "preact/hooks";

export default function Colors() {
    const [colors, setColors] = useState([]);

    const context = {
        colors,
        setColors,
    }

    return context;
}