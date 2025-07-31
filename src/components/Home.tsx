import React from 'react';
import { NavigationPage } from '../types';
import { Compass, Brain, GitCompare, BookOpen, FileText, Users, TrendingUp, Award, ArrowRight, Sparkles, Rocket, Code, Zap } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: NavigationPage) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: Compass,
      title: 'AI Career Discovery',
      description: 'Smart recommendations powered by machine learning algorithms',
      action: () => onNavigate('discover'),
      color: 'from-cyan-500 to-blue-600',
      badge: 'AI Powered'
    },
    {
      icon: Brain,
      title: 'Skills Assessment',
      description: 'Advanced psychometric testing with detailed personality insights',
      action: () => onNavigate('quiz'),
      color: 'from-purple-500 to-pink-600',
      badge: 'Psychometric'
    },
    {
      icon: GitCompare,
      title: 'Career Analytics',
      description: 'Data-driven comparison with salary trends and market insights',
      action: () => onNavigate('compare'),
      color: 'from-green-500 to-emerald-600',
      badge: 'Analytics'
    },
    {
      icon: FileText,
      title: 'ATS Resume Builder',
      description: 'AI-optimized resumes that pass applicant tracking systems',
      action: () => onNavigate('resume'),
      color: 'from-orange-500 to-red-600',
      badge: 'ATS Ready'
    },
    {
      icon: BookOpen,
      title: 'Learning Hub',
      description: 'Curated resources from top tech platforms and bootcamps',
      action: () => onNavigate('learn'),
      color: 'from-indigo-500 to-purple-600',
      badge: 'Curated'
    },
    {
      icon: Code,
      title: 'Tech Stack Guide',
      description: 'Master the latest technologies with personalized roadmaps',
      action: () => onNavigate('learn'),
      color: 'from-teal-500 to-cyan-600',
      badge: 'Tech Focus'
    }
  ];

  const stats = [
    { label: 'Career Paths', value: '500+', icon: TrendingUp, color: 'text-cyan-600' },
    { label: 'Success Stories', value: '10K+', icon: Award, color: 'text-purple-600' },
    { label: 'University Partners', value: '100+', icon: Users, color: 'text-green-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900 transition-colors duration-200">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-r from-green-400/20 to-emerald-600/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Tech Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23e5e7eb%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] dark:bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23374151%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 dark:from-cyan-400/10 dark:to-blue-500/10 px-4 py-2 rounded-full border border-cyan-200 dark:border-cyan-800 mb-8">
              <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Powered by Advanced AI</span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600"> AI Career</span>
              <br />
              Intelligence Platform
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover your perfect tech career path with AI-powered insights, build ATS-optimized resumes, 
              and access curated learning resources from industry experts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => onNavigate('discover')}
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Rocket className="w-5 h-5 group-hover:animate-bounce" />
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => onNavigate('quiz')}
                className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-gray-200 dark:border-gray-700 hover:border-cyan-300 dark:hover:border-cyan-600 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Take Skills Assessment
              </button>
            </div>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {['React', 'TypeScript', 'Python', 'AI/ML', 'Cloud', 'DevOps'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white dark:bg-gray-800 py-16 border-y border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-200">
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-600/10 dark:from-purple-400/10 dark:to-pink-500/10 px-4 py-2 rounded-full border border-purple-200 dark:border-purple-800 mb-6">
              <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Advanced Features</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"> Succeed</span>
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our comprehensive platform provides cutting-edge tools and insights to accelerate your tech career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer border border-gray-200 dark:border-gray-700 relative overflow-hidden"
                  onClick={feature.action}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold">
                        {feature.badge}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600 transition-all duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center text-cyan-600 dark:text-cyan-400 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 max-w-3xl mx-auto border border-white/20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-4">AI Mentor Match - Coming Soon!</h3>
            
            <p className="text-blue-100 mb-8 text-lg leading-relaxed">
              Connect with industry professionals and AI-powered mentors in your chosen field. 
              Get personalized guidance, code reviews, and real-world insights to accelerate your career growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg">
                Join Waitlist
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;