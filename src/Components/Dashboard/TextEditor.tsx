"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import JoditEditor with SSR disabled
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const TextEditor = () => {
    const editor = useRef(null);
    const [content, setContent] = useState("");

    const [config, setConfig] = useState({
        height: 700,
        readOnly: false,
        placeholder: "Write Reports here",
    });

    const handleTextEditor = (content: string) => {
        setContent(content);
    };

    return (
        <div className="mt-10">
            <JoditEditor value={content} config={config} ref={editor} onChange={handleTextEditor} />
        </div>
    );
};

export default TextEditor;
