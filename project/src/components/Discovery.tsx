import React, { useState } from 'react';
import { UserProfile, Career, NavigationPage } from '../types';
import { careers } from '../data/careers';
import { getTopCareers, downloadCareerPlan } from '../utils/helpers';
import { Compass, User, Heart, BookOpen, Target, TrendingUp, Download, ArrowRight, CheckCircle, Sparkles, Brain, Award, Lightbulb, Rocket } from 'lucide-react';

interface DiscoveryProps {
  onProfileComplete: (profile: UserProfile, careers: Career[]) => void;
}

const Discovery: React.FC<DiscoveryProps> = ({ onProfileComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    graduationYear: '',
    interests: [] as string[],
    skills: [] as string[],
    subjects: [] as string[],
    goals: [] as string[],
    experienceLevel: 'no-experience' as const
  });
  const [showResults, setShowResults] = useState(false);
  const [suggestedCareers, setSuggestedCareers] = useState<Career[]>([]);

  const interestOptions = [
    // Technology & Innovation
    'Software Development & Programming', 'Artificial Intelligence & Machine Learning', 'Cybersecurity & Information Protection',
    'Data Science & Analytics', 'Web Design & Development', 'Mobile App Development', 'Cloud Computing & DevOps',
    'Robotics & Automation', 'Blockchain & Cryptocurrency', 'Virtual Reality & Gaming',
    
    // Healthcare & Life Sciences
    'Medicine & Clinical Practice', 'Nursing & Patient Care', 'Mental Health & Psychology', 'Physical Therapy & Rehabilitation',
    'Medical Research & Laboratory Science', 'Pharmacy & Drug Development', 'Public Health & Epidemiology',
    'Veterinary Medicine & Animal Care', 'Nutrition & Dietetics', 'Medical Technology & Equipment',
    
    // Business & Finance
    'Business Management & Leadership', 'Entrepreneurship & Startups', 'Investment & Financial Planning',
    'Banking & Corporate Finance', 'Accounting & Auditing', 'Insurance & Risk Management',
    'Real Estate & Property Development', 'International Trade & Commerce', 'Supply Chain & Logistics',
    
    // Education & Training
    'Teaching & Classroom Instruction', 'Educational Administration & Policy', 'Curriculum Development & Design',
    'Corporate Training & Development', 'Educational Technology & E-Learning', 'Special Education & Inclusion',
    'Academic Research & Scholarship', 'Library Science & Information Management',
    
    // Creative Arts & Media
    'Graphic Design & Visual Communication', 'Photography & Videography', 'Writing & Content Creation',
    'Music & Audio Production', 'Film & Television Production', 'Theater & Performing Arts',
    'Fashion Design & Styling', 'Interior Design & Architecture', 'Digital Marketing & Social Media',
    'Advertising & Brand Strategy', 'Journalism & News Media', 'Publishing & Editorial Work',
    
    // Engineering & Construction
    'Civil Engineering & Infrastructure', 'Mechanical Engineering & Manufacturing', 'Electrical Engineering & Electronics',
    'Chemical Engineering & Process Design', 'Environmental Engineering & Sustainability', 'Aerospace Engineering & Aviation',
    'Construction Management & Building', 'Urban Planning & Development', 'Mining & Natural Resources',
    
    // Science & Research
    'Biological Sciences & Biotechnology', 'Chemistry & Materials Science', 'Physics & Astronomy',
    'Environmental Science & Conservation', 'Agricultural Science & Farming', 'Geology & Earth Sciences',
    'Marine Biology & Oceanography', 'Forensic Science & Investigation',
    
    // Legal & Government
    'Law & Legal Practice', 'Criminal Justice & Law Enforcement', 'Government & Public Administration',
    'International Relations & Diplomacy', 'Political Science & Policy Analysis', 'Paralegal & Legal Support',
    
    // Social Services & Community
    'Social Work & Community Development', 'Non-Profit Management & Fundraising', 'Human Rights & Advocacy',
    'Counseling & Therapy', 'Child & Family Services', 'Elder Care & Gerontology',
    'Disaster Relief & Emergency Management', 'Religious & Spiritual Leadership',
    
    // Hospitality & Tourism
    'Hotel & Resort Management', 'Event Planning & Coordination', 'Travel & Tourism Services',
    'Restaurant & Food Service Management', 'Culinary Arts & Professional Cooking', 'Recreation & Entertainment',
    
    // Transportation & Logistics
    'Aviation & Airline Operations', 'Maritime & Shipping', 'Railway & Public Transit',
    'Trucking & Freight Transportation', 'Warehouse & Distribution Management', 'Automotive Industry',
    
    // Skilled Trades & Technical
    'Electrical Work & Power Systems', 'Plumbing & Water Systems', 'Carpentry & Woodworking',
    'Welding & Metal Fabrication', 'HVAC & Climate Control', 'Automotive Repair & Maintenance',
    'Electronics Repair & Technology', 'Landscaping & Groundskeeping',
    
    // Sports & Fitness
    'Professional Sports & Athletics', 'Fitness Training & Personal Coaching', 'Sports Medicine & Therapy',
    'Recreation & Outdoor Activities', 'Sports Management & Administration', 'Nutrition & Sports Science',
    
    // Retail & Sales
    'Retail Management & Operations', 'Sales & Customer Relations', 'E-commerce & Online Business',
    'Product Management & Development', 'Market Research & Consumer Analysis', 'Customer Service & Support',
    
    // Human Resources & Administration
    'Human Resources Management', 'Recruitment & Talent Acquisition', 'Training & Development',
    'Organizational Development & Change Management', 'Administrative Support & Office Management',
    'Payroll & Benefits Administration',
    'Veterinary Medicine & Animal Care', 'Nutrition & Dietetics', 'Medical Technology & Equipment',
    
    // Business & Finance
    'Business Management & Leadership', 'Entrepreneurship & Startups', 'Investment & Financial Planning',
    'Banking & Corporate Finance', 'Accounting & Auditing', 'Insurance & Risk Management',
    'Real Estate & Property Development', 'International Trade & Commerce', 'Supply Chain & Logistics',
    
    // Education & Training
    'Teaching & Classroom Instruction', 'Educational Administration & Policy', 'Curriculum Development & Design',
    'Corporate Training & Development', 'Educational Technology & E-Learning', 'Special Education & Inclusion',
    'Academic Research & Scholarship', 'Library Science & Information Management',
    
    // Creative Arts & Media
    'Graphic Design & Visual Communication', 'Photography & Videography', 'Writing & Content Creation',
    'Music & Audio Production', 'Film & Television Production', 'Theater & Performing Arts',
    'Fashion Design & Styling', 'Interior Design & Architecture', 'Digital Marketing & Social Media',
    'Advertising & Brand Strategy', 'Journalism & News Media', 'Publishing & Editorial Work',
    
    // Engineering & Construction
    'Civil Engineering & Infrastructure', 'Mechanical Engineering & Manufacturing', 'Electrical Engineering & Electronics',
    'Chemical Engineering & Process Design', 'Environmental Engineering & Sustainability', 'Aerospace Engineering & Aviation',
    'Construction Management & Building', 'Urban Planning & Development', 'Mining & Natural Resources',
    
    // Science & Research
    'Biological Sciences & Biotechnology', 'Chemistry & Materials Science', 'Physics & Astronomy',
    'Environmental Science & Conservation', 'Agricultural Science & Farming', 'Geology & Earth Sciences',
    'Marine Biology & Oceanography', 'Forensic Science & Investigation',
    
    // Legal & Government
    'Law & Legal Practice', 'Criminal Justice & Law Enforcement', 'Government & Public Administration',
    'International Relations & Diplomacy', 'Political Science & Policy Analysis', 'Paralegal & Legal Support',
    
    // Social Services & Community
    'Social Work & Community Development', 'Non-Profit Management & Fundraising', 'Human Rights & Advocacy',
    'Counseling & Therapy', 'Child & Family Services', 'Elder Care & Gerontology',
    'Disaster Relief & Emergency Management', 'Religious & Spiritual Leadership',
    
    // Hospitality & Tourism
    'Hotel & Resort Management', 'Event Planning & Coordination', 'Travel & Tourism Services',
    'Restaurant & Food Service Management', 'Culinary Arts & Professional Cooking', 'Recreation & Entertainment',
    
    // Transportation & Logistics
    'Aviation & Airline Operations', 'Maritime & Shipping', 'Railway & Public Transit',
    'Trucking & Freight Transportation', 'Warehouse & Distribution Management', 'Automotive Industry',
    
    // Skilled Trades & Technical
    'Electrical Work & Power Systems', 'Plumbing & Water Systems', 'Carpentry & Woodworking',
    'Welding & Metal Fabrication', 'HVAC & Climate Control', 'Automotive Repair & Maintenance',
    'Electronics Repair & Technology', 'Landscaping & Groundskeeping',
    
    // Sports & Fitness
    'Professional Sports & Athletics', 'Fitness Training & Personal Coaching', 'Sports Medicine & Therapy',
    'Recreation & Outdoor Activities', 'Sports Management & Administration', 'Nutrition & Sports Science',
    
    // Retail & Sales
    'Retail Management & Operations', 'Sales & Customer Relations', 'E-commerce & Online Business',
    'Product Management & Development', 'Market Research & Consumer Analysis', 'Customer Service & Support',
    
    // Human Resources & Administration
    'Human Resources Management', 'Recruitment & Talent Acquisition', 'Training & Development',
    'Organizational Development & Change Management', 'Administrative Support & Office Management',
    'Payroll & Benefits Administration'
  ];

  const skillOptions = [
    // Technical & Analytical Skills
    'Computer Programming & Software Development', 'Data Analysis & Statistical Modeling', 'Mathematical Problem Solving',
    'Scientific Research & Methodology', 'Technical Writing & Documentation', 'Quality Assurance & Testing',
    'Database Management & SQL', 'Network Administration & IT Support', 'Cybersecurity & Risk Assessment',
    'Engineering Design & CAD Software', 'Laboratory Techniques & Equipment Operation', 'Financial Analysis & Modeling',
    
    // Communication & Interpersonal Skills
    'Public Speaking & Presentation', 'Written Communication & Copywriting', 'Active Listening & Empathy',
    'Conflict Resolution & Mediation', 'Cross-Cultural Communication', 'Customer Service & Client Relations',
    'Teaching & Knowledge Transfer', 'Counseling & Guidance', 'Interviewing & Information Gathering',
    'Negotiation & Persuasion', 'Team Collaboration & Cooperation', 'Networking & Relationship Building',
    
    // Leadership & Management Skills
    'Strategic Planning & Vision Setting', 'Team Leadership & Motivation', 'Project Management & Coordination',
    'Budget Management & Financial Planning', 'Performance Management & Evaluation', 'Change Management & Innovation',
    'Decision Making Under Pressure', 'Delegation & Task Assignment', 'Organizational Development',
    'Risk Management & Contingency Planning', 'Vendor Management & Procurement', 'Policy Development & Implementation',
    
    // Creative & Design Skills
    'Graphic Design & Visual Communication', 'Creative Writing & Storytelling', 'Photography & Visual Arts',
    'Video Production & Editing', 'Music Composition & Performance', 'Interior Design & Space Planning',
    'Fashion Design & Styling', 'Web Design & User Experience', 'Brand Development & Marketing',
    'Event Design & Coordination', 'Product Design & Innovation', 'Artistic Expression & Creativity',
    
    // Physical & Manual Skills
    'Manual Dexterity & Fine Motor Skills', 'Physical Strength & Endurance', 'Hand-Eye Coordination',
    'Mechanical Aptitude & Repair', 'Construction & Building Techniques', 'Electrical Work & Wiring',
    'Plumbing & Pipe Fitting', 'Welding & Metal Fabrication', 'Carpentry & Woodworking',
    'Automotive Repair & Maintenance', 'Equipment Operation & Machinery', 'Safety Procedures & Protocols',
    
    // Healthcare & Caregiving Skills
    'Patient Care & Medical Assistance', 'Clinical Assessment & Diagnosis', 'Emergency Response & First Aid',
    'Therapeutic Techniques & Rehabilitation', 'Medical Equipment Operation', 'Pharmaceutical Knowledge',
    'Mental Health Counseling & Support', 'Child Care & Development', 'Elder Care & Gerontology',
    'Nutrition & Dietary Planning', 'Health Education & Promotion', 'Medical Record Management',
    
    // Sales & Business Skills
    'Sales Techniques & Customer Acquisition', 'Market Research & Analysis', 'Business Development & Growth',
    'Entrepreneurship & Innovation', 'Contract Negotiation & Legal Understanding', 'Supply Chain Management',
    'Inventory Management & Control', 'Retail Operations & Merchandising', 'E-commerce & Digital Marketing',
    'Customer Relationship Management', 'Product Knowledge & Demonstration', 'Territory Management & Planning',
    
    // Administrative & Organizational Skills
    'Time Management & Prioritization', 'Attention to Detail & Accuracy', 'Multi-tasking & Efficiency',
    'Record Keeping & Documentation', 'Scheduling & Calendar Management', 'Office Administration & Support',
    'Data Entry & Information Processing', 'Filing & Document Organization', 'Reception & Phone Etiquette',
    'Travel Planning & Coordination', 'Meeting Planning & Facilitation', 'Resource Management & Allocation',
    
    // Language & Cultural Skills
    'Foreign Language Proficiency', 'Translation & Interpretation', 'Cultural Sensitivity & Awareness',
    'International Business Understanding', 'Diplomatic Communication', 'Community Outreach & Engagement',
    'Social Media Management & Content Creation', 'Public Relations & Media Communication',
    
    // Problem-Solving & Critical Thinking
    'Analytical Thinking & Logic', 'Creative Problem Solving', 'Research & Investigation',
    'Troubleshooting & Diagnosis', 'Innovation & Improvement', 'Strategic Thinking & Planning',
    'Critical Analysis & Evaluation', 'Pattern Recognition & Trend Analysis', 'Root Cause Analysis',
    'Process Improvement & Optimization', 'Systems Thinking & Integration', 'Adaptability & Flexibility',
    'Teaching & Knowledge Transfer', 'Counseling & Guidance', 'Interviewing & Information Gathering',
    'Negotiation & Persuasion', 'Team Collaboration & Cooperation', 'Networking & Relationship Building',
    
    // Leadership & Management Skills
    'Strategic Planning & Vision Setting', 'Team Leadership & Motivation', 'Project Management & Coordination',
    'Budget Management & Financial Planning', 'Performance Management & Evaluation', 'Change Management & Innovation',
    'Decision Making Under Pressure', 'Delegation & Task Assignment', 'Organizational Development',
    'Risk Management & Contingency Planning', 'Vendor Management & Procurement', 'Policy Development & Implementation',
    
    // Creative & Design Skills
    'Graphic Design & Visual Communication', 'Creative Writing & Storytelling', 'Photography & Visual Arts',
    'Video Production & Editing', 'Music Composition & Performance', 'Interior Design & Space Planning',
    'Fashion Design & Styling', 'Web Design & User Experience', 'Brand Development & Marketing',
    'Event Design & Coordination', 'Product Design & Innovation', 'Artistic Expression & Creativity',
    
    // Physical & Manual Skills
    'Manual Dexterity & Fine Motor Skills', 'Physical Strength & Endurance', 'Hand-Eye Coordination',
    'Mechanical Aptitude & Repair', 'Construction & Building Techniques', 'Electrical Work & Wiring',
    'Plumbing & Pipe Fitting', 'Welding & Metal Fabrication', 'Carpentry & Woodworking',
    'Automotive Repair & Maintenance', 'Equipment Operation & Machinery', 'Safety Procedures & Protocols',
    
    // Healthcare & Caregiving Skills
    'Patient Care & Medical Assistance', 'Clinical Assessment & Diagnosis', 'Emergency Response & First Aid',
    'Therapeutic Techniques & Rehabilitation', 'Medical Equipment Operation', 'Pharmaceutical Knowledge',
    'Mental Health Counseling & Support', 'Child Care & Development', 'Elder Care & Gerontology',
    'Nutrition & Dietary Planning', 'Health Education & Promotion', 'Medical Record Management',
    
    // Sales & Business Skills
    'Sales Techniques & Customer Acquisition', 'Market Research & Analysis', 'Business Development & Growth',
    'Entrepreneurship & Innovation', 'Contract Negotiation & Legal Understanding', 'Supply Chain Management',
    'Inventory Management & Control', 'Retail Operations & Merchandising', 'E-commerce & Digital Marketing',
    'Customer Relationship Management', 'Product Knowledge & Demonstration', 'Territory Management & Planning',
    
    // Administrative & Organizational Skills
    'Time Management & Prioritization', 'Attention to Detail & Accuracy', 'Multi-tasking & Efficiency',
    'Record Keeping & Documentation', 'Scheduling & Calendar Management', 'Office Administration & Support',
    'Data Entry & Information Processing', 'Filing & Document Organization', 'Reception & Phone Etiquette',
    'Travel Planning & Coordination', 'Meeting Planning & Facilitation', 'Resource Management & Allocation',
    
    // Language & Cultural Skills
    'Foreign Language Proficiency', 'Translation & Interpretation', 'Cultural Sensitivity & Awareness',
    'International Business Understanding', 'Diplomatic Communication', 'Community Outreach & Engagement',
    'Social Media Management & Content Creation', 'Public Relations & Media Communication',
    
    // Problem-Solving & Critical Thinking
    'Analytical Thinking & Logic', 'Creative Problem Solving', 'Research & Investigation',
    'Troubleshooting & Diagnosis', 'Innovation & Improvement', 'Strategic Thinking & Planning',
    'Critical Analysis & Evaluation', 'Pattern Recognition & Trend Analysis', 'Root Cause Analysis',
    'Process Improvement & Optimization', 'Systems Thinking & Integration', 'Adaptability & Flexibility'
  ];

  const subjectOptions = [
    // STEM Fields
    'Computer Science & Information Technology', 'Mathematics & Statistics', 'Physics & Astronomy',
    'Chemistry & Chemical Sciences', 'Biology & Life Sciences', 'Engineering & Technology',
    'Environmental Science & Ecology', 'Geology & Earth Sciences', 'Materials Science & Nanotechnology',
    'Biotechnology & Genetics', 'Neuroscience & Brain Studies', 'Marine Biology & Oceanography',
    
    // Health & Medical Sciences
    'Medicine & Health Sciences', 'Nursing & Patient Care', 'Pharmacy & Pharmacology',
    'Public Health & Epidemiology', 'Physical Therapy & Rehabilitation', 'Mental Health & Psychology',
    'Nutrition & Dietetics', 'Veterinary Medicine', 'Medical Technology & Biomedical Engineering',
    'Sports Medicine & Exercise Science', 'Occupational Therapy', 'Dental Sciences',
    
    // Business & Economics
    'Business Administration & Management', 'Economics & Finance', 'Accounting & Auditing',
    'Marketing & Consumer Behavior', 'International Business & Trade', 'Entrepreneurship & Innovation',
    'Supply Chain & Operations Management', 'Human Resources & Organizational Behavior',
    'Real Estate & Property Management', 'Insurance & Risk Management',
    
    // Social Sciences & Humanities
    'Psychology & Human Behavior', 'Sociology & Anthropology', 'Political Science & Government',
    'History & Historical Studies', 'Philosophy & Ethics', 'Literature & Language Arts',
    'Linguistics & Communication Studies', 'Cultural Studies & Diversity', 'International Relations & Diplomacy',
    'Social Work & Community Development', 'Criminal Justice & Criminology', 'Geography & Urban Studies',
    
    // Creative Arts & Design
    'Art & Visual Design', 'Music & Audio Production', 'Theater & Performing Arts',
    'Film & Video Production', 'Photography & Digital Media', 'Fashion Design & Textile Arts',
    'Interior Design & Architecture', 'Graphic Design & Visual Communication', 'Creative Writing & Literature',
    'Dance & Movement Studies', 'Game Design & Interactive Media',
    
    // Education & Training
    'Education & Pedagogy', 'Curriculum Development & Instructional Design', 'Educational Psychology',
    'Special Education & Inclusion', 'Adult Education & Training', 'Educational Technology & E-Learning',
    'Library Science & Information Management', 'Academic Research & Scholarship',
    
    // Legal & Law Enforcement
    'Law & Legal Studies', 'Criminal Justice & Law Enforcement', 'Paralegal Studies',
    'Constitutional Law & Civil Rights', 'International Law & Human Rights', 'Corporate Law & Business Ethics',
    'Environmental Law & Policy', 'Family Law & Social Services',
    
    // Agriculture & Natural Resources
    'Agriculture & Farming', 'Forestry & Natural Resources', 'Animal Science & Livestock Management',
    'Horticulture & Plant Sciences', 'Agricultural Economics & Policy', 'Food Science & Technology',
    'Sustainable Agriculture & Organic Farming', 'Wildlife Management & Conservation',
    
    // Communications & Media
    'Journalism & News Media', 'Public Relations & Communications', 'Broadcasting & Media Production',
    'Digital Marketing & Social Media', 'Advertising & Brand Strategy', 'Technical Writing & Documentation',
    'Mass Communications & Media Studies', 'Publishing & Editorial Work',
    
    // Hospitality & Tourism
    'Hospitality Management & Tourism', 'Culinary Arts & Food Science', 'Event Planning & Management',
    'Recreation & Leisure Studies', 'Travel & Tourism Services', 'Restaurant & Food Service Management',
    
    // Transportation & Logistics
    'Transportation & Logistics Management', 'Aviation & Aerospace Studies', 'Maritime Studies & Shipping',
    'Automotive Technology & Engineering', 'Supply Chain Management', 'Urban Planning & Transportation',
    
    // Skilled Trades & Technical
    'Construction & Building Technology', 'Electrical Technology & Power Systems', 'Mechanical Technology & Manufacturing',
    'Automotive Technology & Repair', 'HVAC & Climate Control Technology', 'Welding & Metal Fabrication',
    'Electronics & Computer Repair', 'Plumbing & Water Systems Technology'
  ];

  const goalOptions = [
    // Financial & Career Growth
    'High Salary & Financial Independence', 'Rapid Career Advancement & Promotion', 'Executive Leadership & C-Suite Roles',
    'Entrepreneurship & Business Ownership', 'Investment & Wealth Building', 'Financial Security & Stability',
    'Performance-Based Compensation & Bonuses', 'Stock Options & Equity Participation',
    
    // Work-Life Balance & Flexibility
    'Work-Life Balance & Personal Time', 'Remote Work & Location Independence', 'Flexible Schedule & Time Management',
    'Part-Time & Freelance Opportunities', 'Seasonal Work & Extended Breaks', 'Family-Friendly Work Environment',
    'Minimal Travel & Local Work', 'Stress-Free & Low-Pressure Environment',
    
    // Social Impact & Purpose
    'Making Social Impact & Positive Change', 'Helping Others & Community Service', 'Environmental Conservation & Sustainability',
    'Healthcare & Improving Lives', 'Education & Knowledge Sharing', 'Human Rights & Social Justice',
    'Disaster Relief & Emergency Response', 'Non-Profit & Charitable Work', 'Global Development & International Aid',
    
    // Innovation & Creativity
    'Innovation & Cutting-Edge Technology', 'Creative Freedom & Artistic Expression', 'Research & Scientific Discovery',
    'Product Development & Design', 'Artistic Recognition & Cultural Impact', 'Patent Development & Intellectual Property',
    'Startup Culture & Disruptive Innovation', 'Creative Problem Solving & Innovation',
    
    // Professional Development & Recognition
    'Continuous Learning & Skill Development', 'Professional Recognition & Awards', 'Industry Leadership & Thought Leadership',
    'Speaking & Conference Opportunities', 'Publishing & Academic Recognition', 'Mentoring & Teaching Others',
    'Professional Certifications & Credentials', 'Networking & Industry Connections',
    
    // Work Environment & Culture
    'Collaborative Team Environment', 'Independent Work & Autonomy', 'Diverse & Inclusive Workplace',
    'International Work & Global Exposure', 'Corporate Culture & Company Values', 'Small Business & Personal Relationships',
    'Government Service & Public Sector', 'Academic Environment & Research Institutions',
    
    // Lifestyle & Personal Fulfillment
    'Adventure & Travel Opportunities', 'Physical Activity & Outdoor Work', 'Intellectual Challenges & Mental Stimulation',
    'Variety & Diverse Daily Challenges', 'Working with Hands & Physical Creation', 'Technology & Digital Innovation',
    'Traditional Crafts & Artisanal Work', 'Sports & Athletic Performance',
    
    // Security & Stability
    'Job Security & Long-Term Employment', 'Government Benefits & Pension Plans', 'Union Protection & Worker Rights',
    'Healthcare Benefits & Medical Coverage', 'Predictable Schedule & Routine', 'Local Community & Hometown Work',
    'Established Industry & Proven Career Path', 'Low Risk & Conservative Approach'
  ];

  const steps = [
    { title: 'Personal Information', icon: User },
    { title: 'Interests & Passions', icon: Heart },
    { title: 'Skills & Abilities', icon: Brain },
    { title: 'Academic Background', icon: BookOpen },
    { title: 'Career Goals', icon: Target }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateProfile();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleMultiSelect = (field: keyof typeof formData, value: string) => {
    const currentValues = formData[field] as string[];
    if (currentValues.includes(value)) {
      setFormData(prev => ({
        ...prev,
        [field]: currentValues.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: [...currentValues, value]
      }));
    }
  };

  const generateProfile = () => {
    const profile: UserProfile = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      university: formData.university,
      graduationYear: formData.graduationYear,
      interests: formData.interests,
      skills: formData.skills,
      subjects: formData.subjects,
      goals: formData.goals,
      experienceLevel: formData.experienceLevel
    };

    const topCareers = getTopCareers(careers, profile, 6);
    setSuggestedCareers(topCareers);
    setShowResults(true);
    onProfileComplete(profile, topCareers);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.name.trim() !== '';
      case 1:
        return formData.interests.length >= 3;
      case 2:
        return formData.skills.length >= 3;
      case 3:
        return formData.subjects.length >= 2;
      case 4:
        return formData.goals.length >= 2;
      default:
        return false;
    }
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-tech py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-6">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Career Discovery Complete!</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">Your personalized career recommendations</p>
          </div>

          {/* Profile Summary */}
          <div className="card-tech p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Your Profile Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Interests</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{formData.interests.length} selected</p>
              </div>
              <div className="text-center">
                <Brain className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Skills</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{formData.skills.length} identified</p>
              </div>
              <div className="text-center">
                <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Subjects</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{formData.subjects.length} areas</p>
              </div>
              <div className="text-center">
                <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Goals</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{formData.goals.length} objectives</p>
              </div>
            </div>
          </div>

          {/* Career Recommendations */}
          <div className="card-tech p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center flex items-center justify-center space-x-2">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              <span>Your Top Career Matches</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedCareers.map((career, index) => (
                <div key={career.id} className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      #{index + 1}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      {career.matchScore}% match
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{career.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{career.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Salary:</span>
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">{career.averageSalary}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Outlook:</span>
                      <span className="text-sm text-blue-600 dark:text-blue-400">{career.jobOutlook}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      career.category === 'Technology' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                      career.category === 'Healthcare' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                      career.category === 'Business' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                      'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}>
                      {career.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const profile: UserProfile = {
                    id: Date.now().toString(),
                    name: formData.name,
                    email: formData.email,
                    university: formData.university,
                    graduationYear: formData.graduationYear,
                    interests: formData.interests,
                    skills: formData.skills,
                    subjects: formData.subjects,
                    goals: formData.goals,
                    experienceLevel: formData.experienceLevel
                  };
                  downloadCareerPlan(profile, suggestedCareers);
                }}
                className="btn-tech flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download Career Plan</span>
              </button>
              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentStep(0);
                  setFormData({
                    name: '',
                    email: '',
                    university: '',
                    graduationYear: '',
                    interests: [],
                    skills: [],
                    subjects: [],
                    goals: [],
                    experienceLevel: 'no-experience'
                  });
                }}
                className="btn-tech-outline"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-tech py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full mb-6">
            <Compass className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Career Discovery</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Let's find your perfect career path</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    index <= currentStep 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                  }`}>
                    {index < currentStep ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-2 ${
                      index < currentStep ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{steps[currentStep].title}</h2>
          </div>
        </div>

        {/* Form Content */}
        <div className="card-tech p-8 mb-8">
          {currentStep === 0 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    University/Institution
                  </label>
                  <input
                    type="text"
                    value={formData.university}
                    onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="University of Lagos"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Graduation Year
                  </label>
                  <input
                    type="text"
                    value={formData.graduationYear}
                    onChange={(e) => setFormData(prev => ({ ...prev, graduationYear: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="2024"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Experience Level
                  </label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => setFormData(prev => ({ ...prev, experienceLevel: e.target.value as any }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="no-experience">No Experience</option>
                    <option value="some-experience">Some Experience</option>
                    <option value="experienced">Experienced</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Select at least 3 areas that genuinely interest you. Think about what you enjoy learning about or doing in your free time.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => handleMultiSelect('interests', interest)}
                    className={`p-3 text-left rounded-lg border-2 transition-all duration-200 ${
                      formData.interests.includes(interest)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="text-sm font-medium">{interest}</span>
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Selected: {formData.interests.length} (minimum 3 required)
              </p>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Select at least 3 skills you currently have or are developing. Include both technical and soft skills.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleMultiSelect('skills', skill)}
                    className={`p-3 text-left rounded-lg border-2 transition-all duration-200 ${
                      formData.skills.includes(skill)
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="text-sm font-medium">{skill}</span>
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Selected: {formData.skills.length} (minimum 3 required)
              </p>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Select at least 2 academic subjects or fields of study that you excel in or enjoy most.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                {subjectOptions.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => handleMultiSelect('subjects', subject)}
                    className={`p-3 text-left rounded-lg border-2 transition-all duration-200 ${
                      formData.subjects.includes(subject)
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-600 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="text-sm font-medium">{subject}</span>
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Selected: {formData.subjects.length} (minimum 2 required)
              </p>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Select at least 2 career goals that are most important to you. Think about what success means to you.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                {goalOptions.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => handleMultiSelect('goals', goal)}
                    className={`p-3 text-left rounded-lg border-2 transition-all duration-200 ${
                      formData.goals.includes(goal)
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-600 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="text-sm font-medium">{goal}</span>
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Selected: {formData.goals.length} (minimum 2 required)
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              currentStep === 0
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'btn-tech-outline'
            }`}
          >
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              isStepValid()
                ? 'btn-tech'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>{currentStep === steps.length - 1 ? 'Generate Recommendations' : 'Next'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Discovery;