import React, { useState } from 'react';
import { QuizResult } from '../types';
import { Brain, CheckCircle, ArrowRight, Award, Lightbulb, Target, Users, Zap, Star, TrendingUp } from 'lucide-react';

interface QuizProps {
  onQuizComplete: (result: QuizResult) => void;
}

const Quiz: React.FC<QuizProps> = ({ onQuizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const questions = [
    {
      id: 1,
      question: "When working on a project, I prefer to:",
      options: [
        "Work independently and focus deeply",
        "Collaborate with a team and brainstorm",
        "Lead the project and coordinate others",
        "Support others and help where needed"
      ],
      category: "work_style"
    },
    {
      id: 2,
      question: "I'm most energized when:",
      options: [
        "Solving complex technical problems",
        "Creating something new and innovative",
        "Helping people achieve their goals",
        "Analyzing data and finding patterns"
      ],
      category: "motivation"
    },
    {
      id: 3,
      question: "In a team meeting, I usually:",
      options: [
        "Listen carefully and contribute thoughtfully",
        "Share creative ideas and possibilities",
        "Keep the discussion focused and organized",
        "Ask questions to understand better"
      ],
      category: "communication"
    },
    {
      id: 4,
      question: "When learning something new, I prefer:",
      options: [
        "Reading documentation and tutorials",
        "Hands-on experimentation and practice",
        "Learning from others and mentors",
        "Taking structured courses and classes"
      ],
      category: "learning_style"
    },
    {
      id: 5,
      question: "My ideal work environment is:",
      options: [
        "Quiet and focused with minimal distractions",
        "Dynamic and fast-paced with variety",
        "Collaborative with lots of interaction",
        "Structured with clear processes"
      ],
      category: "environment"
    },
    {
      id: 6,
      question: "When facing a challenge, I:",
      options: [
        "Break it down into smaller, manageable parts",
        "Look for creative and unconventional solutions",
        "Seek advice and input from others",
        "Research best practices and proven methods"
      ],
      category: "problem_solving"
    },
    {
      id: 7,
      question: "I'm most satisfied when:",
      options: [
        "I've mastered a complex skill or technology",
        "I've created something that didn't exist before",
        "I've helped someone succeed or feel better",
        "I've improved a process or system"
      ],
      category: "satisfaction"
    },
    {
      id: 8,
      question: "In my free time, I enjoy:",
      options: [
        "Reading, coding, or learning new technologies",
        "Art, music, writing, or creative projects",
        "Volunteering, mentoring, or social activities",
        "Organizing, planning, or optimizing things"
      ],
      category: "interests"
    },
    {
      id: 9,
      question: "When making decisions, I rely most on:",
      options: [
        "Logic, data, and systematic analysis",
        "Intuition, creativity, and possibilities",
        "Input from others and consensus building",
        "Experience, precedent, and proven methods"
      ],
      category: "decision_making"
    },
    {
      id: 10,
      question: "My greatest strength is:",
      options: [
        "Technical expertise and attention to detail",
        "Innovation and creative thinking",
        "Empathy and interpersonal skills",
        "Organization and systematic approach"
      ],
      category: "strengths"
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers: number[]) => {
    // Calculate personality type based on answers
    const scores = {
      analytical: 0,
      creative: 0,
      social: 0,
      systematic: 0
    };

    finalAnswers.forEach((answer) => {
      switch (answer) {
        case 0:
          scores.analytical++;
          break;
        case 1:
          scores.creative++;
          break;
        case 2:
          scores.social++;
          break;
        case 3:
          scores.systematic++;
          break;
      }
    });

    // Determine dominant personality type
    const maxScore = Math.max(...Object.values(scores));
    let personalityType = '';
    let strengths: string[] = [];
    let recommendations: string[] = [];

    if (scores.analytical === maxScore) {
      personalityType = 'Analytical Thinker';
      strengths = ['Problem Solving', 'Logical Reasoning', 'Technical Skills', 'Attention to Detail'];
      recommendations = [
        'Consider careers in technology, engineering, or data science',
        'Develop programming and analytical skills',
        'Look into research and development roles',
        'Explore careers in cybersecurity or systems analysis'
      ];
    } else if (scores.creative === maxScore) {
      personalityType = 'Creative Innovator';
      strengths = ['Innovation', 'Creative Thinking', 'Adaptability', 'Vision'];
      recommendations = [
        'Explore careers in design, marketing, or product development',
        'Consider roles in creative industries or startups',
        'Develop skills in design thinking and innovation',
        'Look into UX/UI design or creative technology roles'
      ];
    } else if (scores.social === maxScore) {
      personalityType = 'People-Focused Collaborator';
      strengths = ['Communication', 'Empathy', 'Leadership', 'Teamwork'];
      recommendations = [
        'Consider careers in healthcare, education, or human resources',
        'Explore management and leadership roles',
        'Develop skills in counseling or social work',
        'Look into customer service or community outreach roles'
      ];
    } else {
      personalityType = 'Systematic Organizer';
      strengths = ['Organization', 'Planning', 'Process Improvement', 'Reliability'];
      recommendations = [
        'Consider careers in business operations or project management',
        'Explore roles in finance, accounting, or administration',
        'Develop skills in process optimization and quality assurance',
        'Look into supply chain or operations management roles'
      ];
    }

    const result: QuizResult = {
      strengths,
      recommendations,
      score: Math.round((maxScore / questions.length) * 100),
      personalityType,
      techAptitude: scores.analytical * 10,
      softSkills: scores.social > scores.analytical ? ['Communication', 'Teamwork', 'Leadership'] : ['Problem Solving', 'Analysis', 'Technical Skills']
    };

    setQuizResult(result);
    setShowResults(true);
    onQuizComplete(result);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setQuizResult(null);
  };

  if (showResults && quizResult) {
    return (
      <div className="min-h-screen bg-gradient-tech py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Quiz Complete!</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">Your personality and career insights</p>
          </div>

          {/* Results Summary */}
          <div className="card-tech p-8 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                You are a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">{quizResult.personalityType}</span>
              </h2>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Star className="w-6 h-6 text-yellow-500" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{quizResult.score}% Match</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Strengths */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span>Your Strengths</span>
                </h3>
                <div className="space-y-3">
                  {quizResult.strengths.map((strength, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span>Key Skills</span>
                </h3>
                <div className="space-y-3">
                  {quizResult.softSkills?.map((skill, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="card-tech p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-500" />
              <span>Career Recommendations</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quizResult.recommendations.map((recommendation, index) => (
                <div key={index} className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{recommendation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Aptitude */}
          {quizResult.techAptitude && (
            <div className="card-tech p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span>Tech Aptitude Score</span>
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${quizResult.techAptitude}%` }}
                  ></div>
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{quizResult.techAptitude}%</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {quizResult.techAptitude >= 70 ? 'High tech aptitude - consider technology careers!' :
                 quizResult.techAptitude >= 40 ? 'Moderate tech aptitude - tech roles with training could work well.' :
                 'Lower tech aptitude - consider people-focused or creative careers.'}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="text-center">
            <button
              onClick={resetQuiz}
              className="btn-tech-outline mr-4"
            >
              Retake Quiz
            </button>
            <button
              onClick={() => window.location.href = '#discover'}
              className="btn-tech"
            >
              Explore Career Paths
            </button>
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Skills & Personality Assessment</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Discover your strengths and ideal career path</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="card-tech p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {questions[currentQuestion].question}
          </h2>
          
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full p-6 text-left rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 group-hover:border-purple-500 transition-colors"></div>
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-purple-700 dark:group-hover:text-purple-300 font-medium">
                    {option}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              currentQuestion === 0
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'btn-tech-outline'
            }`}
          >
            <span>Previous</span>
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Select an answer to continue
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;