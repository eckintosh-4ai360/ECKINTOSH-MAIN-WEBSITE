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
        <h2 className="text-base font-bold text-slate-950">Media library</h2>
        <p className="mt-1 text-xs text-slate-500">Upload images and videos to Cloudinary.</p>
      </div>

      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-end">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">Cloudinary folder</label>
            <input
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />
          </div>
          <label className="cursor-pointer flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700">
            <UploadCloud className="w-4 h-4" />
            {uploading ? 'Uploading...' : 'Upload File'}
            <input type="file" accept="image/*,video/*" onChange={handleFile} disabled={uploading} className="hidden" />
          </label>
        </div>

        {error && <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs text-red-600">{error}</p>}

        {asset && (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            {asset.resource_type === 'video' ? (
              <video src={asset.secure_url} controls className="w-full max-h-80 bg-black" />
            ) : (
              <img src={asset.secure_url} alt={asset.original_filename} className="w-full max-h-80 object-contain bg-black" />
            )}
            <div className="space-y-3 p-4">
              <div className="text-xs text-slate-500">{asset.original_filename}</div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  readOnly
                  value={asset.secure_url}
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 font-mono text-xs text-slate-700"
                />
                <button
                  onClick={handleCopy}
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
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
