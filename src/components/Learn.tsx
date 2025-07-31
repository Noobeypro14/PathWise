import React, { useState } from 'react';
import { careerTips, internshipPlatforms } from '../data/careers';
import { careers } from '../data/careers';
import { BookOpen, Briefcase, TrendingUp, ExternalLink, Bell, Calendar, Award, Users, Code, Zap, Search, Filter, Star, Clock, DollarSign, MapPin, ChevronRight, Play, FileText, Video, Globe, GraduationCap, Target, CheckCircle, ArrowRight, Lightbulb, Rocket } from 'lucide-react';

const Learn: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'job-roles' | 'internships' | 'tips'>('job-roles');
  const [showTipNotification, setShowTipNotification] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCareer, setSelectedCareer] = useState<any>(null);

  const handleShowTip = () => {
    setShowTipNotification(true);
    setTimeout(() => setShowTipNotification(false), 5000);
  };

  const tabs = [
    { id: 'job-roles' as const, label: 'Job Roles & Learning Paths', icon: Code },
    { id: 'internships' as const, label: 'Tech Opportunities', icon: Briefcase },
    { id: 'tips' as const, label: 'Career Tips', icon: TrendingUp }
  ];

  const categories = ['All', 'Technology', 'Design', 'Management', 'Data Science', 'Engineering'];

  const filteredCareers = careers.filter(career => {
    const matchesCategory = selectedCategory === 'All' || career.category === selectedCategory;
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         career.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         career.requiredSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Enhanced learning roadmaps for beginners
  const learningRoadmaps = {
    'Full Stack Developer': {
      duration: '6-12 months',
      difficulty: 'Beginner to Intermediate',
      prerequisites: 'Basic computer skills, logical thinking',
      phases: [
        {
          phase: 'Foundation (Months 1-2)',
          description: 'Learn the basics of web development',
          topics: [
            'HTML - Structure of web pages',
            'CSS - Styling and layout',
            'JavaScript - Programming fundamentals',
            'Git & GitHub - Version control'
          ],
          resources: [
            { name: 'freeCodeCamp HTML/CSS', type: 'Free Course', duration: '40 hours' },
            { name: 'JavaScript.info', type: 'Free Tutorial', duration: '60 hours' },
            { name: 'Git Tutorial by Atlassian', type: 'Free Guide', duration: '10 hours' }
          ]
        },
        {
          phase: 'Frontend Development (Months 3-4)',
          description: 'Build interactive user interfaces',
          topics: [
            'React.js - Component-based UI',
            'State Management - Redux/Context',
            'CSS Frameworks - Tailwind/Bootstrap',
            'Responsive Design - Mobile-first approach'
          ],
          resources: [
            { name: 'React Official Tutorial', type: 'Free Course', duration: '30 hours' },
            { name: 'Tailwind CSS Docs', type: 'Free Documentation', duration: '20 hours' },
            { name: 'Frontend Mentor Projects', type: 'Practice Platform', duration: 'Ongoing' }
          ]
        },
        {
          phase: 'Backend Development (Months 5-6)',
          description: 'Server-side programming and databases',
          topics: [
            'Node.js - Server-side JavaScript',
            'Express.js - Web framework',
            'Databases - MongoDB/PostgreSQL',
            'APIs - RESTful services'
          ],
          resources: [
            { name: 'Node.js Official Docs', type: 'Free Documentation', duration: '40 hours' },
            { name: 'MongoDB University', type: 'Free Course', duration: '30 hours' },
            { name: 'Postman API Testing', type: 'Free Tool', duration: '15 hours' }
          ]
        },
        {
          phase: 'Full Stack Integration (Months 7-8)',
          description: 'Connect frontend and backend',
          topics: [
            'API Integration - Fetch data',
            'Authentication - User login systems',
            'Deployment - Hosting applications',
            'Testing - Unit and integration tests'
          ],
          resources: [
            { name: 'Netlify Deployment', type: 'Free Platform', duration: '10 hours' },
            { name: 'Jest Testing Framework', type: 'Free Tool', duration: '20 hours' },
            { name: 'Auth0 Documentation', type: 'Free Service', duration: '15 hours' }
          ]
        }
      ],
      projects: [
        'Personal Portfolio Website',
        'Todo List Application',
        'Weather App with API',
        'E-commerce Store',
        'Social Media Dashboard'
      ],
      jobTitles: ['Junior Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'Web Developer'],
      averageTimeToJob: '8-12 months with consistent practice'
    },
    'Data Scientist': {
      duration: '8-15 months',
      difficulty: 'Intermediate to Advanced',
      prerequisites: 'Strong math background, analytical thinking',
      phases: [
        {
          phase: 'Programming Foundations (Months 1-3)',
          description: 'Learn Python and data manipulation',
          topics: [
            'Python Programming - Syntax and fundamentals',
            'Pandas - Data manipulation library',
            'NumPy - Numerical computing',
            'Jupyter Notebooks - Interactive development'
          ],
          resources: [
            { name: 'Python for Everybody (Coursera)', type: 'Free Course', duration: '60 hours' },
            { name: 'Pandas Documentation', type: 'Free Tutorial', duration: '40 hours' },
            { name: 'Kaggle Learn Python', type: 'Free Course', duration: '25 hours' }
          ]
        },
        {
          phase: 'Statistics & Math (Months 4-5)',
          description: 'Build statistical foundation',
          topics: [
            'Descriptive Statistics - Mean, median, mode',
            'Probability Theory - Distributions and inference',
            'Linear Algebra - Vectors and matrices',
            'Calculus Basics - Derivatives and optimization'
          ],
          resources: [
            { name: 'Khan Academy Statistics', type: 'Free Course', duration: '50 hours' },
            { name: 'StatQuest YouTube', type: 'Free Videos', duration: '30 hours' },
            { name: '3Blue1Brown Linear Algebra', type: 'Free Videos', duration: '20 hours' }
          ]
        },
        {
          phase: 'Machine Learning (Months 6-8)',
          description: 'Learn ML algorithms and techniques',
          topics: [
            'Supervised Learning - Regression and classification',
            'Unsupervised Learning - Clustering and dimensionality',
            'Scikit-learn - ML library for Python',
            'Model Evaluation - Cross-validation and metrics'
          ],
          resources: [
            { name: 'Andrew Ng ML Course', type: 'Free Course', duration: '60 hours' },
            { name: 'Scikit-learn Documentation', type: 'Free Tutorial', duration: '40 hours' },
            { name: 'Kaggle Competitions', type: 'Practice Platform', duration: 'Ongoing' }
          ]
        },
        {
          phase: 'Advanced Topics (Months 9-12)',
          description: 'Deep learning and specialization',
          topics: [
            'Deep Learning - Neural networks',
            'TensorFlow/PyTorch - Deep learning frameworks',
            'Data Visualization - Matplotlib, Seaborn',
            'Big Data Tools - Spark, Hadoop basics'
          ],
          resources: [
            { name: 'Deep Learning Specialization', type: 'Paid Course', duration: '80 hours' },
            { name: 'TensorFlow Tutorials', type: 'Free Documentation', duration: '50 hours' },
            { name: 'Plotly Documentation', type: 'Free Tutorial', duration: '25 hours' }
          ]
        }
      ],
      projects: [
        'Exploratory Data Analysis Project',
        'Predictive Model for House Prices',
        'Customer Segmentation Analysis',
        'Sentiment Analysis of Social Media',
        'Recommendation System'
      ],
      jobTitles: ['Junior Data Scientist', 'Data Analyst', 'ML Engineer', 'Research Scientist'],
      averageTimeToJob: '12-18 months with portfolio projects'
    },
    'UX/UI Designer': {
      duration: '4-8 months',
      difficulty: 'Beginner to Intermediate',
      prerequisites: 'Creative thinking, attention to detail',
      phases: [
        {
          phase: 'Design Fundamentals (Months 1-2)',
          description: 'Learn core design principles',
          topics: [
            'Design Principles - Balance, contrast, hierarchy',
            'Color Theory - Psychology and application',
            'Typography - Font selection and pairing',
            'Layout Design - Grid systems and spacing'
          ],
          resources: [
            { name: 'Google UX Design Certificate', type: 'Paid Course', duration: '40 hours' },
            { name: 'Adobe Color Wheel', type: 'Free Tool', duration: '10 hours' },
            { name: 'Typography Handbook', type: 'Free Guide', duration: '15 hours' }
          ]
        },
        {
          phase: 'UX Research & Strategy (Months 3-4)',
          description: 'Understand user needs and behavior',
          topics: [
            'User Research - Interviews and surveys',
            'Personas - User archetypes',
            'User Journey Mapping - Experience flows',
            'Information Architecture - Content organization'
          ],
          resources: [
            { name: 'UX Research Methods', type: 'Free Course', duration: '30 hours' },
            { name: 'Miro Templates', type: 'Free Tool', duration: '20 hours' },
            { name: 'Nielsen Norman Group', type: 'Free Articles', duration: 'Ongoing' }
          ]
        },
        {
          phase: 'Design Tools & Prototyping (Months 5-6)',
          description: 'Master design software and prototyping',
          topics: [
            'Figma - Design and prototyping tool',
            'Wireframing - Low-fidelity layouts',
            'Prototyping - Interactive mockups',
            'Design Systems - Consistent components'
          ],
          resources: [
            { name: 'Figma Academy', type: 'Free Course', duration: '25 hours' },
            { name: 'UI Design Patterns', type: 'Free Resource', duration: '20 hours' },
            { name: 'Material Design Guidelines', type: 'Free Documentation', duration: '15 hours' }
          ]
        },
        {
          phase: 'Portfolio & Specialization (Months 7-8)',
          description: 'Build portfolio and choose focus area',
          topics: [
            'Portfolio Development - Case studies',
            'Mobile Design - iOS and Android patterns',
            'Web Design - Responsive layouts',
            'Usability Testing - Validation methods'
          ],
          resources: [
            { name: 'Dribbble Inspiration', type: 'Free Platform', duration: 'Ongoing' },
            { name: 'Behance Portfolio Examples', type: 'Free Platform', duration: '10 hours' },
            { name: 'UserTesting Platform', type: 'Free Trial', duration: '15 hours' }
          ]
        }
      ],
      projects: [
        'Mobile App Redesign',
        'E-commerce Website Design',
        'Dashboard Interface Design',
        'Brand Identity Package',
        'User Research Case Study'
      ],
      jobTitles: ['Junior UX Designer', 'UI Designer', 'Product Designer', 'Visual Designer'],
      averageTimeToJob: '6-10 months with strong portfolio'
    }
  };

  const renderJobRoleDetail = (career: any) => {
    const roadmap = learningRoadmaps[career.title as keyof typeof learningRoadmaps];
    
    return (
      <div className="space-y-8">
        {/* Back Button */}
        <button
          onClick={() => setSelectedCareer(null)}
          className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          <span>Back to Job Roles</span>
        </button>

        {/* Career Overview */}
        <div className="card-tech p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{career.title}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">{career.description}</p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-green-600">{career.averageSalary}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-600">{career.jobOutlook}</span>
                </div>
                {career.remoteWork && (
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium">
                    Remote Friendly
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Required Skills</h4>
              <div className="space-y-2">
                {career.requiredSkills.map((skill: string, idx: number) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {career.techStack && (
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {career.techStack.map((tech: string, idx: number) => (
                    <span key={idx} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-md text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Learning Resources</h4>
              <div className="space-y-2">
                {career.learningPlatforms.slice(0, 3).map((platform: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">{platform.name}</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">{platform.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Learning Roadmap */}
        {roadmap && (
          <div className="card-tech p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Rocket className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Complete Learning Roadmap</h3>
            </div>

            {/* Roadmap Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl">
              <div className="text-center">
                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                <div className="font-semibold text-gray-900 dark:text-white">Duration</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{roadmap.duration}</div>
              </div>
              <div className="text-center">
                <Target className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <div className="font-semibold text-gray-900 dark:text-white">Difficulty</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{roadmap.difficulty}</div>
              </div>
              <div className="text-center">
                <GraduationCap className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <div className="font-semibold text-gray-900 dark:text-white">Prerequisites</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{roadmap.prerequisites}</div>
              </div>
              <div className="text-center">
                <Briefcase className="w-6 h-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
                <div className="font-semibold text-gray-900 dark:text-white">Time to Job</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{roadmap.averageTimeToJob}</div>
              </div>
            </div>

            {/* Learning Phases */}
            <div className="space-y-8">
              {roadmap.phases.map((phase, index) => (
                <div key={index} className="border-l-4 border-purple-500 pl-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">{phase.phase}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{phase.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ml-11">
                    {/* Topics */}
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">What You'll Learn</h5>
                      <div className="space-y-2">
                        {phase.topics.map((topic, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Resources */}
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Recommended Resources</h5>
                      <div className="space-y-3">
                        {phase.resources.map((resource, idx) => (
                          <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-gray-900 dark:text-white text-sm">{resource.name}</span>
                              <span className="text-xs text-blue-600 dark:text-blue-400">{resource.type}</span>
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">{resource.duration}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Projects Section */}
            <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <Code className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span>Portfolio Projects to Build</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {roadmap.projects.map((project, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{project}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Titles */}
            <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Potential Job Titles</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {roadmap.jobTitles.map((title, idx) => (
                  <span key={idx} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                    {title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-tech py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-600 to-blue-600 rounded-full mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Learning Hub</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Comprehensive career guidance and learning resources</p>
        </div>

        {/* Notification */}
        {showTipNotification && (
          <div className="fixed top-20 right-4 bg-white dark:bg-gray-800 border-l-4 border-orange-500 rounded-lg shadow-xl p-4 max-w-sm z-50 animate-slide-in">
            <div className="flex items-start space-x-3">
              <Bell className="w-5 h-5 text-orange-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Weekly Tech Tip</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{careerTips[0].content}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-1 shadow-lg border border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-orange-600 to-blue-600 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Job Roles & Learning Paths */}
        {activeTab === 'job-roles' && (
          <div className="space-y-8">
            {selectedCareer ? (
              renderJobRoleDetail(selectedCareer)
            ) : (
              <>
                {/* Search and Filter */}
                <div className="card-tech p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search job roles, skills, or technologies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Filter className="w-5 h-5 text-gray-400" />
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Beginner's Guide */}
                <div className="card-tech p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                    <Rocket className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    <span>Complete Beginner's Guide to Tech Careers</span>
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        title: 'Choose Your Path',
                        description: 'Explore different tech roles and find what interests you most',
                        icon: '🎯',
                        color: 'from-blue-500 to-cyan-500'
                      },
                      {
                        title: 'Learn the Basics',
                        description: 'Start with fundamentals and build a strong foundation',
                        icon: '📚',
                        color: 'from-purple-500 to-pink-500'
                      },
                      {
                        title: 'Build Projects',
                        description: 'Apply your knowledge by creating real-world projects',
                        icon: '🛠️',
                        color: 'from-green-500 to-emerald-500'
                      },
                      {
                        title: 'Get Hired',
                        description: 'Prepare for interviews and land your first tech job',
                        icon: '🚀',
                        color: 'from-orange-500 to-red-500'
                      }
                    ].map((step, index) => (
                      <div key={index} className="p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-200">
                        <div className="text-3xl mb-3">{step.icon}</div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Job Roles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCareers.map((career) => (
                    <div
                      key={career.id}
                      className="card-tech p-6 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                      onClick={() => setSelectedCareer(career)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          career.category === 'Technology' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                          career.category === 'Design' ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
                          career.category === 'Management' ? 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200' :
                          'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                        }`}>
                          {career.category}
                        </span>
                        {career.entryLevel && (
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
                            Beginner Friendly
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{career.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2">{career.description}</p>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">{career.averageSalary}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm text-blue-600 dark:text-blue-400">High Demand</span>
                        </div>

                        {career.remoteWork && (
                          <div className="flex items-center space-x-2">
                            <Globe className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            <span className="text-sm text-purple-600 dark:text-purple-400">Remote Work Available</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {career.requiredSkills.slice(0, 2).map((skill, idx) => (
                            <span key={idx} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                          {career.requiredSkills.length > 2 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">+{career.requiredSkills.length - 2} more</span>
                          )}
                        </div>
                        
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>

                      {learningRoadmaps[career.title as keyof typeof learningRoadmaps] && (
                        <div className="mt-4 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                          <span className="text-blue-800 dark:text-blue-200 font-medium text-sm flex items-center justify-center space-x-1">
                            <Rocket className="w-4 h-4" />
                            <span>Complete Learning Path Available</span>
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Tech Opportunities */}
        {activeTab === 'internships' && (
          <div className="space-y-8">
            {/* Quick Tips for Students */}
            <div className="card-tech p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                <span>Tech Career Starter Pack</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: 'Build Your GitHub',
                    description: 'Showcase projects and contribute to open source repositories',
                    icon: '🚀',
                    color: 'from-blue-500 to-cyan-500'
                  },
                  {
                    title: 'Learn Cloud Basics',
                    description: 'Get familiar with AWS, Azure, or Google Cloud fundamentals',
                    icon: '☁️',
                    color: 'from-purple-500 to-pink-500'
                  },
                  {
                    title: 'Practice Coding',
                    description: 'Solve problems on LeetCode, HackerRank, and CodeSignal',
                    icon: '💻',
                    color: 'from-green-500 to-emerald-500'
                  },
                  {
                    title: 'Join Tech Communities',
                    description: 'Connect with developers on Discord, Slack, and Reddit',
                    icon: '🤝',
                    color: 'from-orange-500 to-red-500'
                  }
                ].map((tip, index) => (
                  <div key={index} className="p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-200">
                    <div className="text-3xl mb-3">{tip.icon}</div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{tip.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{tip.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Job Platforms */}
            <div className="card-tech p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <span>Top Tech Job Platforms</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {internshipPlatforms.map((platform, index) => (
                  <div key={index} className="border-2 border-gray-200 dark:border-gray-600 rounded-xl p-6 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-200 group bg-white dark:bg-gray-800">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{platform.name}</h3>
                      <ExternalLink className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors" />
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{platform.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        platform.category === 'Tech' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                        platform.category === 'Professional' ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
                        platform.category === 'Startups' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                        platform.category === 'Remote' ? 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200' :
                        platform.category === 'Local' ? 'bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200' :
                        'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}>
                        {platform.category}
                      </span>
                      
                      <button 
                        onClick={() => window.open(platform.url, '_blank')}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm hover:underline"
                      >
                        Visit Site
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Career Timeline */}
            <div className="card-tech p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
                <span>Tech Career Roadmap</span>
              </h2>
              
              <div className="space-y-6">
                {[
                  { phase: 'Year 1-2 (Learning)', task: 'Master programming fundamentals and build personal projects', color: 'blue' },
                  { phase: 'Year 2-3 (Building)', task: 'Create portfolio, contribute to open source, and network', color: 'purple' },
                  { phase: 'Year 3-4 (Applying)', task: 'Apply for internships, practice technical interviews', color: 'green' },
                  { phase: 'Final Year (Preparing)', task: 'Prepare for full-time roles and consider specializations', color: 'orange' },
                  { phase: 'Post-Graduation', task: 'Continue learning, seek mentorship, and advance your career', color: 'red' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-4 h-4 rounded-full mt-2 ${
                      item.color === 'blue' ? 'bg-blue-500' :
                      item.color === 'purple' ? 'bg-purple-500' :
                      item.color === 'green' ? 'bg-green-500' :
                      item.color === 'orange' ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{item.phase}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{item.task}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Career Tips */}
        {activeTab === 'tips' && (
          <div className="space-y-8">
            {/* Weekly Tips Digest */}
            <div className="card-tech p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <span>Weekly Tech Career Tips</span>
                </h2>
                <button
                  onClick={handleShowTip}
                  className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
                >
                  <Bell className="w-4 h-4" />
                  <span>Show Weekly Tip</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {careerTips.map((tip, index) => (
                  <div key={tip.id} className="border-2 border-gray-200 dark:border-gray-600 rounded-xl p-6 hover:border-orange-300 dark:hover:border-orange-600 hover:shadow-lg transition-all duration-200 bg-white dark:bg-gray-800">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          tip.category === 'Tech Skills' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                          tip.category === 'Interview Prep' ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
                          tip.category === 'Learning' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                          tip.category === 'Branding' ? 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200' :
                          'bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200'
                        }`}>
                          {tip.category}
                        </span>
                        {tip.techFocused && (
                          <Code className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{tip.date}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{tip.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{tip.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Career Development Resources */}
            <div className="card-tech p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <span>Tech Career Development</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Technical Skills',
                    resources: [
                      'Cloud Certifications (AWS, Azure)',
                      'Programming Languages',
                      'DevOps & CI/CD',
                      'System Design Patterns'
                    ],
                    color: 'blue'
                  },
                  {
                    title: 'Professional Growth',
                    resources: [
                      'Tech Conferences & Meetups',
                      'Open Source Contributions',
                      'Technical Writing',
                      'Code Reviews & Mentoring'
                    ],
                    color: 'green'
                  },
                  {
                    title: 'Career Advancement',
                    resources: [
                      'Technical Leadership',
                      'Product Management',
                      'Startup Ecosystem',
                      'Freelancing & Consulting'
                    ],
                    color: 'purple'
                  }
                ].map((category, index) => (
                  <div key={index} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <h3 className={`text-lg font-bold mb-4 ${
                      category.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                      category.color === 'green' ? 'text-green-600 dark:text-green-400' :
                      'text-purple-600 dark:text-purple-400'
                    }`}>
                      {category.title}
                    </h3>
                    <ul className="space-y-2">
                      {category.resources.map((resource, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            category.color === 'blue' ? 'bg-blue-400' :
                            category.color === 'green' ? 'bg-green-400' :
                            'bg-purple-400'
                          }`}></div>
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{resource}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Learn;