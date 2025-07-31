import React, { useState } from 'react';
import { ResumeData, ExperienceEntry, EducationEntry, Project } from '../types';
import { FileText, Download, Eye, Plus, Trash2, Save, Sparkles, CheckCircle, AlertCircle, User, Briefcase, GraduationCap, Code, Award, Languages } from 'lucide-react';

const ResumeBuilder: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      portfolio: ''
    },
    summary: '',
    education: [],
    experience: [],
    projects: [],
    skills: {
      technical: [],
      soft: [],
      languages: [],
      frameworks: []
    },
    certifications: [],
    achievements: []
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [atsScore, setAtsScore] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User, color: 'text-blue-600' },
    { id: 'summary', label: 'Professional Summary', icon: FileText, color: 'text-purple-600' },
    { id: 'education', label: 'Education', icon: GraduationCap, color: 'text-green-600' },
    { id: 'experience', label: 'Experience', icon: Briefcase, color: 'text-orange-600' },
    { id: 'projects', label: 'Projects', icon: Code, color: 'text-cyan-600' },
    { id: 'skills', label: 'Skills', icon: Sparkles, color: 'text-pink-600' },
    { id: 'certifications', label: 'Certifications', icon: Award, color: 'text-indigo-600' },
    { id: 'languages', label: 'Languages', icon: Languages, color: 'text-teal-600' }
  ];

  const calculateAtsScore = () => {
    let score = 0;
    const maxScore = 100;

    // Personal info completeness (20 points)
    const personalFields = Object.values(resumeData.personalInfo).filter(field => field.trim() !== '');
    score += (personalFields.length / 7) * 20;

    // Summary (15 points)
    if (resumeData.summary.length > 50) score += 15;

    // Education (10 points)
    if (resumeData.education.length > 0) score += 10;

    // Experience or Projects (25 points)
    if (resumeData.experience.length > 0 || resumeData.projects.length > 0) score += 25;

    // Skills (20 points)
    const totalSkills = resumeData.skills.technical.length + resumeData.skills.soft.length;
    if (totalSkills >= 5) score += 20;

    // Additional sections (10 points)
    if (resumeData.certifications.length > 0 || resumeData.achievements.length > 0) score += 10;

    return Math.min(Math.round(score), maxScore);
  };

  React.useEffect(() => {
    setAtsScore(calculateAtsScore());
  }, [resumeData]);

  const addExperience = () => {
    const newExperience: ExperienceEntry = {
      company: '',
      position: '',
      duration: '',
      description: [''],
      technologies: []
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }));
  };

  const addEducation = () => {
    const newEducation: EducationEntry = {
      institution: '',
      degree: '',
      field: '',
      graduationDate: '',
      relevantCourses: []
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      description: '',
      technologies: [],
      duration: ''
    };
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const addSkill = (category: keyof typeof resumeData.skills) => {
    if (currentSkill.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          [category]: [...prev.skills[category], currentSkill.trim()]
        }
      }));
      setCurrentSkill('');
    }
  };

  const removeSkill = (category: keyof typeof resumeData.skills, index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((_, i) => i !== index)
      }
    }));
  };

  const downloadResume = () => {
    const resumeContent = generateResumeText();
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_Resume.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateResumeText = () => {
    return `
${resumeData.personalInfo.name.toUpperCase()}
${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}
${resumeData.personalInfo.linkedin ? `LinkedIn: ${resumeData.personalInfo.linkedin}` : ''}
${resumeData.personalInfo.github ? `GitHub: ${resumeData.personalInfo.github}` : ''}
${resumeData.personalInfo.portfolio ? `Portfolio: ${resumeData.personalInfo.portfolio}` : ''}

PROFESSIONAL SUMMARY
${resumeData.summary}

EDUCATION
${resumeData.education.map(edu => `
${edu.degree} in ${edu.field}
${edu.institution} | ${edu.graduationDate}
${edu.gpa ? `GPA: ${edu.gpa}` : ''}
${edu.relevantCourses?.length ? `Relevant Courses: ${edu.relevantCourses.join(', ')}` : ''}
`).join('')}

${resumeData.experience.length > 0 ? `PROFESSIONAL EXPERIENCE
${resumeData.experience.map(exp => `
${exp.position} | ${exp.company} | ${exp.duration}
${exp.description.map(desc => `• ${desc}`).join('\n')}
${exp.technologies?.length ? `Technologies: ${exp.technologies.join(', ')}` : ''}
`).join('')}` : ''}

${resumeData.projects.length > 0 ? `PROJECTS
${resumeData.projects.map(project => `
${project.title} | ${project.duration}
${project.description}
Technologies: ${project.technologies.join(', ')}
${project.link ? `Link: ${project.link}` : ''}
`).join('')}` : ''}

TECHNICAL SKILLS
${resumeData.skills.technical.join(' • ')}

SOFT SKILLS
${resumeData.skills.soft.join(' • ')}

${resumeData.skills.frameworks.length > 0 ? `FRAMEWORKS & TOOLS
${resumeData.skills.frameworks.join(' • ')}` : ''}

${resumeData.certifications.length > 0 ? `CERTIFICATIONS
${resumeData.certifications.map(cert => `• ${cert}`).join('\n')}` : ''}

${resumeData.achievements.length > 0 ? `ACHIEVEMENTS
${resumeData.achievements.map(achievement => `• ${achievement}`).join('\n')}` : ''}
    `.trim();
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={resumeData.personalInfo.name}
            onChange={(e) => setResumeData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, name: e.target.value }
            }))}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={resumeData.personalInfo.email}
            onChange={(e) => setResumeData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, email: e.target.value }
            }))}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
            placeholder="john@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={resumeData.personalInfo.phone}
            onChange={(e) => setResumeData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, phone: e.target.value }
            }))}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
            placeholder="+234 xxx xxx xxxx"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location *
          </label>
          <input
            type="text"
            value={resumeData.personalInfo.location}
            onChange={(e) => setResumeData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, location: e.target.value }
            }))}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
            placeholder="Lagos, Nigeria"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            LinkedIn Profile
          </label>
          <input
            type="url"
            value={resumeData.personalInfo.linkedin}
            onChange={(e) => setResumeData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, linkedin: e.target.value }
            }))}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            GitHub Profile
          </label>
          <input
            type="url"
            value={resumeData.personalInfo.github}
            onChange={(e) => setResumeData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, github: e.target.value }
            }))}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
            placeholder="https://github.com/johndoe"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Portfolio Website
        </label>
        <input
          type="url"
          value={resumeData.personalInfo.portfolio}
          onChange={(e) => setResumeData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, portfolio: e.target.value }
          }))}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
          placeholder="https://johndoe.dev"
        />
      </div>
    </div>
  );

  const renderSkillsSection = () => (
    <div className="space-y-8">
      {Object.entries(resumeData.skills).map(([category, skills]) => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
            {category.replace(/([A-Z])/g, ' $1').trim()} Skills
          </h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
              >
                <span>{skill}</span>
                <button
                  onClick={() => removeSkill(category as keyof typeof resumeData.skills, index)}
                  className="text-blue-600 dark:text-blue-400 hover:text-red-600 dark:hover:text-red-400"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <input
              type="text"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSkill(category as keyof typeof resumeData.skills)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder={`Add ${category} skill`}
            />
            <button
              onClick={() => addSkill(category as keyof typeof resumeData.skills)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900 py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">ATS-Optimized Resume Builder</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Create professional resumes that pass applicant tracking systems</p>
        </div>

        {/* ATS Score */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">ATS Compatibility Score</h3>
            <div className="flex items-center space-x-2">
              {atsScore >= 80 ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-orange-500" />
              )}
              <span className={`text-2xl font-bold ${
                atsScore >= 80 ? 'text-green-600' : atsScore >= 60 ? 'text-orange-600' : 'text-red-600'
              }`}>
                {atsScore}%
              </span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${
                atsScore >= 80 ? 'bg-green-500' : atsScore >= 60 ? 'bg-orange-500' : 'bg-red-500'
              }`}
              style={{ width: `${atsScore}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {atsScore >= 80 ? 'Excellent! Your resume is highly ATS-compatible.' :
             atsScore >= 60 ? 'Good! Consider adding more details to improve compatibility.' :
             'Needs improvement. Add more sections and details.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resume Sections</h3>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${activeSection === section.id ? section.color : ''}`} />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
                
                <button
                  onClick={downloadResume}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              {activeSection === 'personal' && renderPersonalInfo()}
              
              {activeSection === 'summary' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Professional Summary</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Write a compelling 2-3 sentence summary highlighting your key strengths and career objectives.
                  </p>
                  <textarea
                    value={resumeData.summary}
                    onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                    placeholder="Motivated Computer Science student with strong programming skills in Python and JavaScript. Passionate about web development and seeking opportunities to apply technical knowledge in a dynamic internship environment. Eager to contribute to innovative projects while gaining hands-on industry experience."
                  />
                </div>
              )}
              
              {activeSection === 'skills' && renderSkillsSection()}
              
              {/* Add other sections as needed */}
              {activeSection === 'education' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Education</h3>
                    <button
                      onClick={addEducation}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Education</span>
                    </button>
                  </div>
                  
                  {resumeData.education.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                      <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No education entries yet. Click "Add Education" to get started.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {resumeData.education.map((edu, index) => (
                        <div key={index} className="p-6 border border-gray-200 dark:border-gray-600 rounded-xl">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="Institution Name"
                              value={edu.institution}
                              onChange={(e) => {
                                const newEducation = [...resumeData.education];
                                newEducation[index].institution = e.target.value;
                                setResumeData(prev => ({ ...prev, education: newEducation }));
                              }}
                              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                            <input
                              type="text"
                              placeholder="Degree"
                              value={edu.degree}
                              onChange={(e) => {
                                const newEducation = [...resumeData.education];
                                newEducation[index].degree = e.target.value;
                                setResumeData(prev => ({ ...prev, education: newEducation }));
                              }}
                              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                            <input
                              type="text"
                              placeholder="Field of Study"
                              value={edu.field}
                              onChange={(e) => {
                                const newEducation = [...resumeData.education];
                                newEducation[index].field = e.target.value;
                                setResumeData(prev => ({ ...prev, education: newEducation }));
                              }}
                              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                            <input
                              type="text"
                              placeholder="Graduation Date"
                              value={edu.graduationDate}
                              onChange={(e) => {
                                const newEducation = [...resumeData.education];
                                newEducation[index].graduationDate = e.target.value;
                                setResumeData(prev => ({ ...prev, education: newEducation }));
                              }}
                              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;