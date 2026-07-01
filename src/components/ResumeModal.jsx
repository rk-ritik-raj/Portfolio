import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, 
  FaUpload, 
  FaFilePdf, 
  FaTrashAlt, 
  FaDownload, 
  FaCheckCircle, 
  FaExclamationTriangle 
} from 'react-icons/fa';

export default function ResumeModal({ isOpen, onClose, resumeData, onUpdateResume }) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    // Limit file size to 2.5MB (localStorage limit is typically 5MB total)
    if (file.size > 2.5 * 1024 * 1024) {
      setError('File size too large. Please upload a file smaller than 2.5 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target.result;
      const newResume = {
        name: file.name,
        size: formatBytes(file.size),
        type: file.type,
        uploadedAt: new Date().toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        fileData: base64Data
      };
      
      onUpdateResume(newResume);
      setSuccess('Resume updated successfully!');
      setError('');
      setTimeout(() => setSuccess(''), 3000);
    };

    reader.onerror = () => {
      setError('Failed to read file.');
    };

    reader.readAsDataURL(file);
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDeleteResume = () => {
    if (window.confirm('Are you sure you want to delete your custom resume? it will revert to the default placeholder.')) {
      onUpdateResume(null);
      setSuccess('Resume deleted successfully.');
      setError('');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleDownload = () => {
    if (resumeData && resumeData.fileData) {
      const link = document.createElement('a');
      link.href = resumeData.fileData;
      link.download = resumeData.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Trigger default fallback download
      const defaultPdfContent = `%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 595.275 841.889] /Contents 5 0 R >>\nendobj\n4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n5 0 obj\n<< /Length 124 >>\nstream\nBT\n/F1 24 Tf\n70 750 Td\n(Ritik Kumar - Full Stack Developer Portfolio Resume) Tj\n/F1 14 Tf\n0 -40 Td\n(Email: ritikkumar.dev@gmail.com | Website: ritik-kumar.dev) Tj\n0 -30 Td\n(This is a mockup resume. Please upload your actual CV using the edit button!) Tj\nET\nendstream\nendobj\nxref\n0 6\n0000000000 65535 f\n0000000009 00000 n\n0000000062 00000 n\n0000000119 00000 n\n0000000262 00000 n\n0000000333 00000 n\ntrailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n0000000508\n%%EOF`;
      const blob = new Blob([defaultPdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Ritik_Kumar_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative z-10 w-full max-w-lg p-6 md:p-8 rounded-2xl glass-card text-textColor flex flex-col gap-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center text-textColor">
                  <FaFilePdf size={16} />
                </div>
                <h3 className="text-xl font-bold font-poppins">Resume Manager</h3>
              </div>
              <button 
                onClick={onClose}
                className="text-textSecondary hover:text-textColor transition-colors duration-200 p-1.5 rounded-lg bg-slate-900/40 hover:bg-slate-900/80"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Error & Success Messages */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 rounded-xl bg-red-950/30 border border-red-800/40 text-red-400 text-xs md:text-sm font-medium"
              >
                <FaExclamationTriangle className="flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {success && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-400 text-xs md:text-sm font-medium"
              >
                <FaCheckCircle className="flex-shrink-0" />
                <span>{success}</span>
              </motion.div>
            )}

            {/* Active Resume Status */}
            <div className="bg-slate-900/40 rounded-2xl p-4 border border-slate-800/50 flex flex-col gap-4">
              <h4 className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
                Active Resume Status
              </h4>

              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${resumeData ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-slate-800/50 text-slate-500 border border-slate-700/50'}`}>
                  <FaFilePdf size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {resumeData ? resumeData.name : 'Ritik_Kumar_Resume.pdf'}
                  </p>
                  <p className="text-xs text-textSecondary mt-0.5 font-mono">
                    {resumeData 
                      ? `${resumeData.size} • Uploaded ${resumeData.uploadedAt}`
                      : 'Mockup Resume (Default Fallback)'
                    }
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={handleDownload}
                    title="Download Active Resume"
                    className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-primary text-textColor hover:text-primary transition-all duration-300 flex items-center justify-center flex-shrink-0 shadow-md"
                  >
                    <FaDownload size={16} />
                  </button>

                  {resumeData && (
                    <button
                      onClick={handleDeleteResume}
                      title="Delete Uploaded Resume"
                      className="w-10 h-10 rounded-xl bg-red-950/20 border border-red-900/30 hover:border-red-500 hover:bg-red-950/40 text-red-400 hover:text-red-300 transition-all duration-300 flex items-center justify-center flex-shrink-0 shadow-md"
                    >
                      <FaTrashAlt size={15} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Upload Zone (Always accessible) */}
            <div className="border-t border-slate-800/80 pt-4 flex flex-col gap-3">
              <h4 className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
                {resumeData ? 'Replace / Update Resume' : 'Upload Resume'}
              </h4>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 ${
                  isDragging 
                    ? 'border-primary bg-primary/5 text-primary scale-[0.98]' 
                    : 'border-slate-800 hover:border-secondary hover:bg-slate-900/20 text-slate-400 hover:text-textColor'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf"
                  className="hidden"
                />
                <div className="w-10 h-10 rounded-full bg-slate-900/80 flex items-center justify-center border border-slate-800 text-slate-400 transition-colors">
                  <FaUpload size={16} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold">
                    Drag & drop your PDF here, or <span className="text-secondary hover:underline">browse</span>
                  </p>
                  <p className="text-xs text-textSecondary mt-1">
                    Only PDF format is supported, Max 2.5 MB
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
