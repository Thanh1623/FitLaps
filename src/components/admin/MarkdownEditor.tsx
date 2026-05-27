"use client";

import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useState, useRef } from "react";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

interface Props {
  name: string;
  defaultValue?: string;
  placeholder?: string;
}

export default function MarkdownEditor({ name, defaultValue, placeholder }: Props) {
  const editorInstanceRef = useRef<any>(null);
  const [currentValue, setCurrentValue] = useState(defaultValue || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [width, setWidth] = useState("500");
  const [selectedStyle, setSelectedStyle] = useState("rounded-lg shadow-lg border");

  const stylePresets = [
    { label: "Mặc định (Bo góc + Đổ bóng + Khung)", value: "rounded-lg shadow-lg border" },
    { label: "Bo góc nhẹ", value: "rounded-md" },
    { label: "Bo tròn hoàn toàn", value: "rounded-full" },
    { label: "Ảnh mờ", value: "opacity-50" },
    { label: "Không style", value: "" },
  ];

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

  const handleInsertImage = () => {
    if (!editorInstanceRef.current) {
      console.error("Editor instance not found");
      return;
    }
    const cm = editorInstanceRef.current.codemirror;
    const cursor = cm.getCursor();
    const classAttr = selectedStyle ? `class="${selectedStyle}" ` : "";
    const widthAttr = width ? `width="${width}" ` : "";
    
    const imgTag = `<div align="center"><img src="${imageUrl}" ${widthAttr}${classAttr}/></div>`;
    cm.replaceRange(imgTag, cursor);
    setIsModalOpen(false);
    
    // Update internal state
    const newValue = cm.getValue();
    setCurrentValue(newValue);
  };

  return (
    <div className="prose dark:prose-invert max-w-none relative">
      <SimpleMDE
        value={currentValue}
        getMdeInstance={(instance) => { editorInstanceRef.current = instance; }}
        onChange={(value) => {
          setCurrentValue(value);
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
                editorInstanceRef.current = editor;
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    uploadImage(file, (url) => {
                      setImageUrl(url);
                      setIsModalOpen(true);
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



      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-2xl w-full max-w-sm space-y-4">
            <h3 className="font-bold text-lg">Cấu hình ảnh</h3>
            
            <div className="space-y-2">
                <label className="text-sm font-medium">Chiều rộng (px):</label>
                <input 
                    type="number" 
                    value={width} 
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-slate-800"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Kiểu dáng:</label>
                {stylePresets.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input 
                            type="radio" 
                            name="stylePreset"
                            checked={selectedStyle === opt.value}
                            onChange={() => setSelectedStyle(opt.value)}
                            className="text-emerald-600"
                        />
                        {opt.label}
                    </label>
                ))}
            </div>

            <div className="flex gap-2 pt-4">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 p-2 rounded-lg bg-slate-100 dark:bg-slate-800">Hủy</button>
                <button onClick={handleInsertImage} className="flex-1 p-2 rounded-lg bg-emerald-600 text-white">Chèn ảnh</button>
            </div>
          </div>
        </div>
      )}

      <textarea name={name} className="hidden" defaultValue={defaultValue} />
    </div>
  );
}
