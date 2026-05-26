import { supabase } from '@/lib/supabase';

export async function deleteImage(url: string) {
    if (!url || !url.includes('blog-images')) return;

    // Trích xuất tên file từ URL (giả định định dạng URL của Supabase)
    const urlParts = url.split('/');
    const fileName = urlParts[urlParts.length - 1];

    if (fileName) {
        await supabase.storage
            .from('blog-images')
            .remove([fileName]);
    }
}
