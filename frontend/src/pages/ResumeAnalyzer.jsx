import { useState, useRef } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle, Download, Zap } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

// Set up PDF worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function ResumeAnalyzer() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");
  const [extractedText, setExtractedText] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  // Extract text from PDF
  const extractTextFromPDF = async (pdfFile) => {
    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      let fullText = "";
      
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item) => item.str)
          .join(" ");
        fullText += pageText + "\n";
      }
      
      return fullText;
    } catch (err) {
      console.error("Error extracting PDF text:", err);
      throw new Error("Failed to extract text from PDF");
    }
  };

  const handleFileSelect = (selectedFile) => {
    setError("");
    
    if (!selectedFile) return;

    if (!selectedFile.name.toLowerCase().endsWith('.pdf')) {
      setError("❌ Please upload a PDF file only");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setError("❌ File size must be less than 5MB");
      return;
    }

    setFile(selectedFile);
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
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  };

  // Main analysis function
  const handleAnalyze = async () => {
    if (!file) {
      setError("❌ Please select a file first");
      return;
    }

    setIsAnalyzing(true);
    setError("");

    try {
      console.log("📄 Extracting text from PDF...");
      const text = await extractTextFromPDF(file);
      setExtractedText(text);
      console.log("✅ Text extracted successfully");

      console.log("🔄 Sending to backend for AI analysis...");
      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        throw new Error("Backend analysis failed");
      }

      const data = await response.json();
      const analysisData = data.analysis;

      console.log("✅ Analysis received:", analysisData);

      // Build improvements array based on analysis
      const improvements = analysisData.improvements || generateImprovements(analysisData);

      setAnalysis({
        score: analysisData.atsScore,
        grade: analysisData.atsScore >= 90 ? "A+" : 
               analysisData.atsScore >= 80 ? "A" : 
               analysisData.atsScore >= 70 ? "B" : "C",
        improvements,
        metrics: [
          { label: "ATS Score", value: analysisData.atsScore, icon: "🎯" },
          { label: "Keywords", value: analysisData.keywordScore, icon: "🔑" },
          { label: "Sections", value: analysisData.sectionScore, icon: "📋" },
          { label: "Formatting", value: analysisData.formattingScore, icon: "✨" },
          { label: "Grammar", value: analysisData.grammarScore, icon: "📝" },
          { label: "Content", value: analysisData.contentQualityScore, icon: "💼" }
        ]
      });

      setIsAnalyzing(false);
    } catch (err) {
      console.error("Error:", err);
      setError(`❌ Error analyzing resume: ${err.message}`);
      setIsAnalyzing(false);
    }
  };

  // Fallback improvements generator
  const generateImprovements = (analysisData) => {
    const improvements = [];

    if (analysisData.keywordScore < 60) {
      improvements.push({
        type: "critical",
        title: "🔴 Weak Keywords & Action Verbs",
        description: "Add action verbs like: Led, Managed, Developed, Achieved, Increased",
        impact: "High"
      });
    }

    if (analysisData.contentQualityScore < 70) {
      improvements.push({
        type: "critical",
        title: "🔴 Weak Content Quality",
        description: "Add quantifiable metrics (e.g., 'Increased sales by 30%', 'Managed 50+ projects')",
        impact: "High"
      });
    }

    if (analysisData.sectionScore < 70) {
      improvements.push({
        type: "warning",
        title: "🟡 Missing Key Sections",
        description: "Add sections: Experience, Skills, Education, Projects, Certifications",
        impact: "Medium"
      });
    }

    if (analysisData.formattingScore < 75) {
      improvements.push({
        type: "warning",
        title: "🟡 Formatting Issues",
        description: "Use bullet points, proper spacing, and consistent formatting throughout",
        impact: "Medium"
      });
    }

    if (analysisData.grammarScore >= 85) {
      improvements.push({
        type: "success",
        title: "🟢 Great Grammar",
        description: "Your resume has excellent grammar and spelling",
        impact: "Positive"
      });
    }

    improvements.push({
      type: "info",
      title: "💡 ATS Optimization Tips",
      description: "Use standard fonts, avoid graphics/tables, include job title keywords, save as PDF",
      impact: "Medium"
    });

    return improvements;
  };

  const handleRemoveFile = () => {
    setFile(null);
    setAnalysis(null);
    setExtractedText("");
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDownloadReport = () => {
    const reportContent = `
RESUME ANALYSIS REPORT
========================

File: ${file?.name}
Analysis Date: ${new Date().toLocaleDateString()}

OVERALL SCORE: ${analysis?.score}/100 (Grade: ${analysis?.grade})

METRICS BREAKDOWN:
${analysis?.metrics.map(m => `- ${m.label}: ${m.value}%`).join('\n')}

EXTRACTED TEXT PREVIEW:
${extractedText.substring(0, 500)}...

RECOMMENDATIONS:
${analysis?.improvements.map(imp => `
${imp.title}
Impact: ${imp.impact}
${imp.description}
`).join('\n')}

For full analysis, visit the analyzer page.
    `.trim();

    const element = document.createElement("a");
    const file = new Blob([reportContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `Resume_Analysis_Report_${new Date().getTime()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* NAVBAR */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Resume Analyzer</h1>
                <p className="text-sm text-gray-500">AI-powered resume optimization</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-emerald-600">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* UPLOAD SECTION */}
          {!analysis && (
            <div className="mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  Analyze Your Resume
                </h2>
                <p className="text-lg text-gray-600">
                  Get AI-powered insights to optimize your resume for ATS and recruiters
                </p>
              </div>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition ${
                  isDragging
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-300 hover:border-gray-400 bg-white"
                }`}
              >
                {!file ? (
                  <>
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Upload className="w-8 h-8 text-emerald-600" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      Drop your resume here
                    </h3>
                    <p className="text-gray-600 mb-6">
                      or click to browse from your computer
                    </p>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileSelect(e.target.files?.[0])}
                      className="hidden"
                      id="file-input"
                    />

                    <label
                      htmlFor="file-input"
                      className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-xl cursor-pointer transition transform hover:scale-105"
                    >
                      Choose PDF File
                    </label>

                    <p className="text-sm text-gray-500 mt-6">
                      Supported format: PDF • Max file size: 5MB
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      File Selected ✓
                    </h3>
                    <p className="text-gray-600 mb-4 font-medium">
                      {file.name}
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                      Size: {(file.size / 1024).toFixed(2)} KB
                    </p>

                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
                      >
                        <Zap className="w-5 h-5" />
                        {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
                      </button>
                      <button
                        onClick={handleRemoveFile}
                        disabled={isAnalyzing}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-8 rounded-xl transition disabled:opacity-50"
                      >
                        Remove
                      </button>
                    </div>
                  </>
                )}
              </div>

              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-800 font-medium">{error}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ANALYSIS RESULTS */}
          {analysis && (
            <div className="space-y-8">
              
              <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-emerald-600">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Analysis Complete! 🎉
                    </h2>
                    <p className="text-gray-600">
                      File: <span className="font-semibold">{file?.name}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="relative w-24 h-24 flex items-center justify-center mb-3">
                        <svg className="transform -rotate-90 w-24 h-24">
                          <circle
                            cx="48"
                            cy="48"
                            r="45"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="6"
                          />
                          <circle
                            cx="48"
                            cy="48"
                            r="45"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="6"
                            strokeDasharray={`${analysis.score * 2.827} 282.7`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute text-center">
                          <p className="text-3xl font-bold text-gray-900">{analysis.score}</p>
                          <p className="text-sm text-gray-600">/ 100</p>
                        </div>
                      </div>
                      <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 font-bold rounded-full text-lg">
                        Grade {analysis.grade}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleDownloadReport}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition transform hover:scale-105"
                  >
                    <Download className="w-5 h-5" />
                    Download Report
                  </button>
                </div>
              </div>

              {/* Metrics Grid - 6 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                {analysis.metrics.map((metric, index) => (
                  <div key={index} className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition">
                    <p className="text-3xl mb-2">{metric.icon}</p>
                    <p className="text-sm text-gray-600 mb-2 font-medium">{metric.label}</p>
                    <div className="mb-3">
                      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                          style={{ width: `${metric.value}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}%</p>
                  </div>
                ))}
              </div>

              {/* Improvements */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Recommendations</h3>
                <div className="space-y-4">
                  {analysis.improvements.map((improvement, index) => (
                    <div
                      key={index}
                      className={`rounded-xl p-6 border-l-4 ${
                        improvement.type === "critical"
                          ? "bg-red-50 border-red-600"
                          : improvement.type === "warning"
                          ? "bg-yellow-50 border-yellow-600"
                          : improvement.type === "info"
                          ? "bg-blue-50 border-blue-600"
                          : "bg-green-50 border-green-600"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-2xl flex-shrink-0 mt-1">
                          {improvement.type === "critical"
                            ? "🔴"
                            : improvement.type === "warning"
                            ? "🟡"
                            : improvement.type === "info"
                            ? "🔵"
                            : "🟢"}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-gray-900">
                              {improvement.title}
                            </h4>
                            <span
                              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                improvement.type === "critical"
                                  ? "bg-red-200 text-red-800"
                                  : improvement.type === "warning"
                                  ? "bg-yellow-200 text-yellow-800"
                                  : improvement.type === "info"
                                  ? "bg-blue-200 text-blue-800"
                                  : "bg-green-200 text-green-800"
                              }`}
                            >
                              {improvement.impact}
                            </span>
                          </div>
                          <p className="text-gray-700">
                            {improvement.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extracted Text Preview */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Extracted Text Preview</h3>
                <div className="bg-gray-50 p-4 rounded-lg max-h-40 overflow-y-auto">
                  <p className="text-gray-700 text-sm whitespace-pre-wrap">
                    {extractedText.substring(0, 500)}
                    {extractedText.length > 500 ? "..." : ""}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleRemoveFile}
                  className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition transform hover:scale-105"
                >
                  Analyze Another Resume
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-xl transition"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}