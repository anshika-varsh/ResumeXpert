const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GOOGLE_API_KEY;

// ============================================
// ADVANCED RESUME ANALYSIS ENGINE
// ============================================

const POWERFUL_KEYWORDS = {
  action_verbs: [
    "achieved", "managed", "led", "developed", "created", "implemented", 
    "designed", "coordinated", "delivered", "directed", "established",
    "increased", "improved", "enhanced", "optimized", "accelerated",
    "transformed", "streamlined", "spearheaded", "pioneered", "collaborated"
  ],
  technical_skills: [
    "javascript", "react", "nodejs", "python", "java", "sql", "mongodb",
    "aws", "docker", "kubernetes", "git", "api", "rest", "graphql",
    "html", "css", "typescript", "express", "angular", "vue"
  ],
  hard_skills: [
    "project management", "data analysis", "business intelligence",
    "machine learning", "ai", "cloud", "devops", "testing", "qa",
    "system design", "architecture", "database", "frontend", "backend"
  ],
  soft_skills: [
    "leadership", "communication", "teamwork", "problem solving",
    "critical thinking", "time management", "adaptability",
    "collaboration", "mentoring", "strategic thinking"
  ],
  sections: [
    "experience", "skills", "education", "projects", "certifications",
    "summary", "objective", "achievements", "awards", "publications"
  ]
};

// ============================================
// ADVANCED SCORING FUNCTIONS
// ============================================

const analyzeKeywords = (text) => {
  const lowerText = text.toLowerCase();
  let actionVerbCount = 0;
  let technicalCount = 0;
  let hardSkillsCount = 0;
  let softSkillsCount = 0;

  // Count action verbs
  POWERFUL_KEYWORDS.action_verbs.forEach(verb => {
    if (lowerText.includes(verb)) actionVerbCount++;
  });

  // Count technical skills
  POWERFUL_KEYWORDS.technical_skills.forEach(skill => {
    if (lowerText.includes(skill)) technicalCount++;
  });

  // Count hard skills
  POWERFUL_KEYWORDS.hard_skills.forEach(skill => {
    if (lowerText.includes(skill)) hardSkillsCount++;
  });

  // Count soft skills
  POWERFUL_KEYWORDS.soft_skills.forEach(skill => {
    if (lowerText.includes(skill)) softSkillsCount++;
  });

  const totalKeywordsFound = actionVerbCount + technicalCount + hardSkillsCount + softSkillsCount;
  const maxPossible = 80; // Expected keywords

  return {
    actionVerbCount,
    technicalCount,
    hardSkillsCount,
    softSkillsCount,
    totalKeywordsFound,
    keywordScore: Math.min((totalKeywordsFound / maxPossible) * 100, 100)
  };
};

const analyzeSections = (text) => {
  const lowerText = text.toLowerCase();
  const foundSections = [];
  const missingSections = [];

  POWERFUL_KEYWORDS.sections.forEach(section => {
    if (lowerText.includes(section)) {
      foundSections.push(section);
    } else {
      missingSections.push(section);
    }
  });

  const sectionScore = (foundSections.length / POWERFUL_KEYWORDS.sections.length) * 100;

  return {
    foundSections,
    missingSections,
    sectionScore: Math.round(sectionScore),
    sectionCompleteness: foundSections.length
  };
};

const analyzeFormatting = (text) => {
  let score = 85;
  const issues = [];

  // Check text length
  if (text.length < 400) {
    score -= 20;
    issues.push("Resume too short - add more details");
  } else if (text.length > 8000) {
    score -= 15;
    issues.push("Resume too long - keep it concise");
  }

  // Check line breaks and organization
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  if (lines.length < 8) {
    score -= 15;
    issues.push("Poor structure - needs better organization");
  }

  // Check for bullet points
  const bulletPoints = (text.match(/[-•*]/g) || []).length;
  if (bulletPoints < 5) {
    score -= 10;
    issues.push("Use bullet points for better readability");
  }

  // Check for dates (experience verification)
  const datePattern = /\d{4}|\d{1,2}\/\d{1,2}/g;
  const dates = text.match(datePattern) || [];
  if (dates.length < 2) {
    score -= 5;
    issues.push("Add dates to your experience");
  }

  return {
    formattingScore: Math.max(score, 0),
    formatIssues: issues,
    bulletPointCount: bulletPoints,
    dateCount: dates.length
  };
};

const analyzeGrammar = (text) => {
  let score = 90;
  const issues = [];

  // Check for common grammar issues
  const commonErrors = [
    { pattern: /\bi\s/gi, message: "Use 'I' instead of 'i'" },
    { pattern: /\s{2,}/g, message: "Remove extra spaces" },
    { pattern: /\.\.+/g, message: "Remove multiple dots" }
  ];

  commonErrors.forEach(error => {
    const matches = text.match(error.pattern) || [];
    if (matches.length > 0) {
      score -= 5;
      issues.push(error.message);
    }
  });

  return {
    grammarScore: Math.max(score, 0),
    grammarIssues: issues
  };
};

const analyzeContentQuality = (text) => {
  let score = 70;
  const qualityIssues = [];

  // Check for specific and measurable achievements
  const measurementPatterns = [/\d+%/g, /\$\d+/g, /\d+x/g, /increased.*\d+/gi];
  let measurementCount = 0;
  measurementPatterns.forEach(pattern => {
    measurementCount += (text.match(pattern) || []).length;
  });

  if (measurementCount >= 5) {
    score += 20;
  } else if (measurementCount >= 3) {
    score += 10;
  } else {
    qualityIssues.push("Add quantifiable metrics to achievements");
  }

  // Check for results/impact
  const resultKeywords = ["resulted", "improved", "increased", "achieved", "exceeded", "delivered"];
  const resultCount = resultKeywords.filter(word => text.toLowerCase().includes(word)).length;

  if (resultCount < 3) {
    score -= 10;
    qualityIssues.push("Emphasize results and impact of your work");
  }

  return {
    contentQualityScore: Math.min(score, 100),
    qualityIssues,
    quantifiableAchievements: measurementCount,
    resultStatements: resultCount
  };
};

const fallbackAdvancedAnalysis = (text) => {
  const keywords = analyzeKeywords(text);
  const sections = analyzeSections(text);
  const formatting = analyzeFormatting(text);
  const grammar = analyzeGrammar(text);
  const content = analyzeContentQuality(text);

  // Calculate weighted ATS score
  const atsScore = Math.round(
    (keywords.keywordScore * 0.25) +
    (sections.sectionScore * 0.20) +
    (formatting.formattingScore * 0.20) +
    (grammar.grammarScore * 0.15) +
    (content.contentQualityScore * 0.20)
  );

  return {
    atsScore,
    keywordScore: Math.round(keywords.keywordScore),
    sectionScore: sections.sectionScore,
    formattingScore: formatting.formattingScore,
    grammarScore: grammar.grammarScore,
    contentQualityScore: content.contentQualityScore,
    
    // Detailed insights
    keywords,
    sections,
    formatting,
    grammar,
    content,

    // Recommendations
    improvements: generateImprovements(keywords, sections, formatting, grammar, content),
    method: "advanced_local_analysis"
  };
};

const generateImprovements = (keywords, sections, formatting, grammar, content) => {
  const improvements = [];

  // Keyword improvements
  if (keywords.keywordScore < 60) {
    improvements.push({
      type: "critical",
      title: "🔴 Weak Keyword Usage",
      description: `Add more action verbs (found: ${keywords.actionVerbCount}). Use keywords like: ${POWERFUL_KEYWORDS.action_verbs.slice(0, 5).join(', ')}`,
      impact: "High"
    });
  }

  if (keywords.technicalCount < 3 && keywords.hardSkillsCount < 3) {
    improvements.push({
      type: "critical",
      title: "🔴 Limited Technical Skills",
      description: "Highlight your technical expertise and tools you've worked with",
      impact: "High"
    });
  }

  // Section improvements
  if (sections.missingSections.length > 2) {
    improvements.push({
      type: "warning",
      title: "🟡 Missing Sections",
      description: `Add missing sections: ${sections.missingSections.slice(0, 3).join(', ')}`,
      impact: "Medium"
    });
  }

  // Formatting improvements
  if (formatting.formatIssues.length > 0) {
    improvements.push({
      type: "warning",
      title: "🟡 Formatting Issues",
      description: formatting.formatIssues.join(". "),
      impact: "Medium"
    });
  }

  // Grammar improvements
  if (grammar.grammarIssues.length > 0) {
    improvements.push({
      type: "info",
      title: "🔵 Grammar & Spelling",
      description: `Fix: ${grammar.grammarIssues.join(", ")}`,
      impact: "Low"
    });
  }

  // Content quality improvements
  if (content.qualityIssues.length > 0) {
    improvements.push({
      type: "warning",
      title: "🟡 Weak Content Quality",
      description: content.qualityIssues.join(". "),
      impact: "High"
    });
  }

  // Positive feedback
  if (content.quantifiableAchievements >= 5) {
    improvements.push({
      type: "success",
      title: "🟢 Great Quantifiable Metrics",
      description: `Excellent! You've included ${content.quantifiableAchievements} measurable achievements`,
      impact: "Positive"
    });
  }

  if (sections.sectionCompleteness >= 5) {
    improvements.push({
      type: "success",
      title: "🟢 Well-Structured Resume",
      description: `Good structure with ${sections.sectionCompleteness} key sections`,
      impact: "Positive"
    });
  }

  // ATS optimization tips
  improvements.push({
    type: "info",
    title: "💡 ATS Optimization Tips",
    description: "Use standard section headers, avoid graphics/tables, use common fonts (Arial, Calibri), save as PDF",
    impact: "Medium"
  });

  return improvements;
};

// ============================================
// ROUTE HANDLER
// ============================================

router.post("/analyze", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: "No text provided" });
    }

    console.log("📩 Received text:", text.substring(0, 100));

    // Try Google API first
    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Analyze this resume professionally and provide JSON response:
{
  "atsScore": 0-100,
  "keywordScore": 0-100,
  "sectionScore": 0-100,
  "formattingScore": 0-100,
  "grammarScore": 0-100,
  "contentQualityScore": 0-100,
  "summary": "Brief analysis summary",
  "topStrengths": ["strength1", "strength2", "strength3"],
  "areasToImprove": ["area1", "area2", "area3"]
}

Resume:
${text}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const analysisText = response.text();
        
        try {
          const googleAnalysis = JSON.parse(analysisText);
          console.log("✅ Google API analysis completed");
          return res.json({ analysis: googleAnalysis, method: "google_api" });
        } catch {
          console.warn("⚠️ Google API response format issue, using fallback");
        }
      } catch (error) {
        console.warn("⚠️ Google API failed, using advanced fallback:", error.message);
      }
    }

    // Advanced fallback analysis
    const analysis = fallbackAdvancedAnalysis(text);
    console.log("✅ Advanced fallback analysis completed");
    res.json({ analysis });

  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ 
      message: "Error analyzing resume",
      error: error.message 
    });
  }
});

module.exports = router;