"use client";

import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useState } from "react";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

interface Props {
  name: string;
  defaultValue?: string;
  placeholder?: string;
}

export default function MarkdownEditor({ name, defaultValue, placeholder }: Props) {
  
  const uploadImage = async (file: File, onSuccess: (url: string) => void, onError: (error: string) => void) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      onSuccess(data.url);
    } catch (error) {
      onError('Upload failed');
    }
  };

  return (
    <div className="prose dark:prose-invert max-w-none">
      <SimpleMDE
        value={defaultValue || ""}
        onChange={(value) => {
          const textarea = document.getElementsByName(name)[0] as HTMLTextAreaElement;
          if (textarea) textarea.value = value;
        }}
        options={{
          placeholder: placeholder || "",
          spellChecker: false,
          toolbar: [
            "bold", "italic", "heading", "|", 
            "quote", "unordered-list", "ordered-list", "|", 
            "link", 
            {
              name: "custom-image",
              action: (editor: any) => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    uploadImage(file, (url) => {
                      const cm = editor.codemirror;
                      const cursor = cm.getCursor();
                      cm.replaceRange(`![](${url})`, cursor);
                    }, (err) => alert(err));
                  }
                };
                input.click();
              },
              className: "fa fa-image",
              title: "Upload Image",
            },
            "|", "preview", "side-by-side", "fullscreen"
          ],
        } as any}

      />
      {/* Hidden textarea to hold the value for form submission */}
      <textarea name={name} className="hidden" defaultValue={defaultValue} />
    </div>
  );
}
