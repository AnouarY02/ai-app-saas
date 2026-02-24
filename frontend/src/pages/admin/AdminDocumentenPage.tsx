import React, { useEffect, useState, useRef } from "react";
import { adminGetDocuments, adminUploadDocument, adminDeleteDocument } from "@/utils/apiClient";

const AdminDocumentenPage: React.FC = () => {
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const loadDocs = async () => {
    try { setDocs(await adminGetDocuments()); }
    catch { setError("Kon documenten niet laden"); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadDocs(); }, []);

  const processFile = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) { setError("Bestand te groot (max 5MB)"); return; }
    const allowed = ["text/plain", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type) && !file.name.match(/\.(txt|pdf|doc|docx)$/i)) {
      setError("Bestandstype niet toegestaan (txt, pdf, doc, docx)"); return;
    }
    setUploading(true); setError(null);
    try {
      const content = await file.text();
      await adminUploadDocument({ name: file.name, content, mimeType: file.type || "text/plain" });
      setSuccess(`"${file.name}" succesvol geupload`);
      setTimeout(() => setSuccess(null), 3000);
      await loadDocs();
    } catch (err: any) { setError(err.response?.data?.message || "Upload mislukt"); }
    finally { setUploading(false); if (fileRef.current) fileRef.current.value = ""; }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) processFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Document "${name}" verwijderen?`)) return;
    try { await adminDeleteDocument(id); setDocs((prev) => prev.filter((d) => d.id !== id)); }
    catch { setError("Verwijderen mislukt"); }
  };

  const formatSize = (bytes: number) => bytes < 1024 ? `${bytes} B` : bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Documenten</h1>
        <p className="text-gray-500 text-sm mt-1">Upload organisatiedocumenten die beschikbaar zijn voor de AI-assistent</p>
      </div>

      {/* Upload area */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center mb-6 transition-colors ${dragOver ? "border-purple-500 bg-purple-50" : "border-gray-300 bg-white hover:border-gray-400"}`}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Sleep een bestand hierheen of</p>
            <p className="text-xs text-gray-400 mt-0.5">TXT, PDF, DOC, DOCX â€” max 5MB</p>
          </div>
          <button type="button" onClick={() => fileRef.current?.click()}
            className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            disabled={uploading}>
            {uploading ? "Uploaden..." : "Bestand kiezen"}
          </button>
          <input ref={fileRef} type="file" accept=".txt,.pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}
      {success && <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">{success}</div>}

      {/* Documents list */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-700">Geuploadde documenten ({docs.length})</h2>
        </div>
        {loading ? (
          <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600" /></div>
        ) : docs.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">Nog geen documenten geupload</div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {docs.map((doc) => (
              <li key={doc.id} className="flex items-center gap-3 px-4 py-3">
                <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                  <p className="text-xs text-gray-400">{formatSize(doc.size)} Â· {new Date(doc.createdAt).toLocaleDateString("nl-NL")}</p>
                </div>
                <button onClick={() => handleDelete(doc.id, doc.name)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Verwijderen">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDocumentenPage;
