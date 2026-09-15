import React, { useState } from 'react';
import { Copy, UploadCloud } from 'lucide-react';
import { uploadMedia, type MediaAsset } from '../lib/media';

export const MediaPanel: React.FC = () => {
  const [folder, setFolder] = useState('media');
  const [uploading, setUploading] = useState(false);
  const [asset, setAsset] = useState<MediaAsset | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setCopied(false);
    try {
      setAsset(await uploadMedia(file, folder));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload media.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleCopy = async () => {
    if (!asset) return;
    await navigator.clipboard.writeText(asset.secure_url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-white">Media Library</h2>
        <p className="text-xs text-slate-400 mt-0.5">Upload images and videos to Cloudinary.</p>
      </div>

      <div className="p-5 rounded-2xl bg-[#0F1D33] border border-white/10 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-end">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Cloudinary Folder</label>
            <input
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
            />
          </div>
          <label className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer">
            <UploadCloud className="w-4 h-4" />
            {uploading ? 'Uploading...' : 'Upload File'}
            <input type="file" accept="image/*,video/*" onChange={handleFile} disabled={uploading} className="hidden" />
          </label>
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}

        {asset && (
          <div className="rounded-xl bg-slate-950 border border-white/10 overflow-hidden">
            {asset.resource_type === 'video' ? (
              <video src={asset.secure_url} controls className="w-full max-h-80 bg-black" />
            ) : (
              <img src={asset.secure_url} alt={asset.original_filename} className="w-full max-h-80 object-contain bg-black" />
            )}
            <div className="p-4 space-y-3">
              <div className="text-xs text-slate-400">{asset.original_filename}</div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  readOnly
                  value={asset.secure_url}
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-slate-200 text-xs font-mono"
                />
                <button
                  onClick={handleCopy}
                  className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <Copy className="w-3.5 h-3.5" /> {copied ? 'Copied' : 'Copy URL'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
