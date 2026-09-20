import React, { useEffect, useState } from 'react';
import { Copy, UploadCloud } from 'lucide-react';
import { listMedia, uploadMedia, type MediaAsset } from '../lib/media';

export const MediaPanel: React.FC<{ targetId?: string }> = ({ targetId }) => {
  const [folder, setFolder] = useState('media');
  const [uploading, setUploading] = useState(false);
  const [asset, setAsset] = useState<MediaAsset | null>(null);
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loadingAssets, setLoadingAssets] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    listMedia()
      .then((next) => {
        if (active) setAssets(next);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : 'Failed to load media assets.');
      })
      .finally(() => {
        if (active) setLoadingAssets(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!targetId) return;
    const matched = assets.find((item) => item.id === targetId);
    if (!matched) return;
    setAsset(matched);
    window.requestAnimationFrame(() => {
      document.getElementById(`admin-media-${targetId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }, [assets, targetId]);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setCopied(false);
    try {
      const uploaded = await uploadMedia(file, folder);
      setAsset(uploaded);
      setAssets((current) => [uploaded, ...current]);
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

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-950">Uploaded assets</h3>
            <p className="mt-1 text-xs text-slate-500">Select an asset to preview and copy its secure URL.</p>
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">{assets.length} total</span>
        </div>
        {loadingAssets && <p className="text-xs text-slate-500">Loading media assets...</p>}
        {!loadingAssets && assets.length === 0 && <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-xs text-slate-500">No media has been uploaded yet.</p>}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {assets.map((item) => (
            <button
              key={item.id}
              id={`admin-media-${item.id}`}
              onClick={() => setAsset(item)}
              className={`rounded-xl border p-3 text-left transition-all hover:bg-slate-50 ${
                targetId === item.id ? 'border-blue-400 bg-blue-50 ring-4 ring-blue-100' : asset?.id === item.id ? 'border-blue-200 bg-blue-50/50' : 'border-slate-200 bg-white'
              }`}
            >
              <span className="block truncate text-xs font-bold text-slate-800">{item.original_filename || item.public_id}</span>
              <span className="mt-1 block truncate text-[10px] text-slate-500">{item.folder} · {item.resource_type}</span>
            </button>
          ))}
        </div>
      </section>

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
