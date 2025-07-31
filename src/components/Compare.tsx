import React, { useState } from 'react';
import { careers } from '../data/careers';
import { Career } from '../types';
import { GitCompare, Search, Plus, X, DollarSign, TrendingUp, MapPin, Clock, Users, Star, CheckCircle, Globe, Briefcase, GraduationCap, Code, Zap, Filter, ArrowRight } from 'lucide-react';

const Compare: React.FC = () => {
  const [selectedCareers, setSelectedCareers] = useState<Career[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = ['All', 'Technology', 'Healthcare', 'Business', 'Education', 'Engineering', 'Design'];

  const filteredCareers = careers.filter(career => {
    const matchesCategory = selectedCategory === 'All' || career.category === selectedCategory;
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         career.description.toLowerCase().includes(searchTerm.toLowerCase());
    const notSelected = !selectedCareers.find(selected => selected.id === career.id);
    return matchesCategory && matchesSearch && notSelected;
  });

  const addCareer = (career: Career) => {
    if (selectedCareers.length < 3) {
      setSelectedCareers([...selectedCareers, career]);
      setShowAddModal(false);
    }
  };

  const removeCareer = (careerId: string) => {
    setSelectedCareers(selectedCareers.filter(career => career.id !== careerId));
  };

  const clearAll = () => {
    setSelectedCareers([]);
  };

  const getComparisonData = () => {
    return [
      {
        label: 'Average Salary',
        icon: DollarSign,
        getValue: (career: Career) => career.averageSalary,
        color: 'text-green-600'
      },
      {
        label: 'Job Outlook',
        icon: TrendingUp,
        getValue: (career: Career) => career.jobOutlook,
        color: 'text-blue-600'
      },
      {
        label: 'Remote Work',
        icon: Globe,
        getValue: (career: Career) => career.remoteWork ? 'Available' : 'Limited',
        color: 'text-purple-600'
      },
      {
        label: 'Entry Level',
        icon: GraduationCap,
        getValue: (career: Career) => career.entryLevel ? 'Yes' : 'Experience Required',
        color: 'text-orange-600'
      },
      {
        label: 'Category',
        icon: Briefcase,
        getValue: (career: Career) => career.category,
        color: 'text-indigo-600'
      }
    ];
  };

  return (
    <div className="min-h-screen bg-gradient-tech py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-6">
            <GitCompare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Career Comparison</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Compare up to 3 careers side by side</p>
        </div>

        {/* Selected Careers Section */}
        <div className="card-tech p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Selected Careers ({selectedCareers.length}/3)
            </h2>
            <div className="flex space-x-3">
              {selectedCareers.length > 0 && (
                <button
                  onClick={clearAll}
                  className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setShowAddModal(true)}
                disabled={selectedCareers.length >= 3}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCareers.length >= 3
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>Add Career</span>
              </button>
            </div>
          </div>

          {selectedCareers.length === 0 ? (
            <div className="text-center py-12">
              <GitCompare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No careers selected</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Add careers to start comparing</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-tech"
              >
                Add Your First Career
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedCareers.map((career) => (
                <div key={career.id} className="relative p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <button
                    onClick={() => removeCareer(career.id)}
                    className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 pr-8">{career.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{career.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Salary:</span>
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">{career.averageSalary}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Category:</span>
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
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detailed Comparison Table */}
        {selectedCareers.length > 1 && (
          <div className="card-tech p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Detailed Comparison</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Criteria</th>
                    {selectedCareers.map((career) => (
                      <th key={career.id} className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white min-w-48">
                        {career.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {getComparisonData().map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Icon className={`w-4 h-4 ${item.color}`} />
                            <span className="font-medium text-gray-900 dark:text-white">{item.label}</span>
                          </div>
                        </td>
                        {selectedCareers.map((career) => (
                          <td key={career.id} className="py-4 px-4 text-gray-700 dark:text-gray-300">
                            {item.getValue(career)}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                  
                  {/* Required Skills Row */}
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Code className="w-4 h-4 text-cyan-600" />
                        <span className="font-medium text-gray-900 dark:text-white">Key Skills</span>
                      </div>
                    </td>
                    {selectedCareers.map((career) => (
                      <td key={career.id} className="py-4 px-4">
                        <div className="space-y-1">
                          {career.requiredSkills.slice(0, 3).map((skill, idx) => (
                            <div key={idx} className="flex items-center space-x-1">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">{skill}</span>
                            </div>
                          ))}
                          {career.requiredSkills.length > 3 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              +{career.requiredSkills.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Learning Platforms Row */}
                  <tr>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-4 h-4 text-purple-600" />
                        <span className="font-medium text-gray-900 dark:text-white">Learning Resources</span>
                      </div>
                    </td>
                    {selectedCareers.map((career) => (
                      <td key={career.id} className="py-4 px-4">
                        <div className="space-y-1">
                          {career.learningPlatforms.slice(0, 2).map((platform, idx) => (
                            <div key={idx} className="text-sm">
                              <span className="font-medium text-gray-900 dark:text-white">{platform.name}</span>
                              <span className="text-green-600 dark:text-green-400 ml-2">({platform.price})</span>
                            </div>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Career Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Add Career to Compare</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Search and Filter */}
                <div className="mt-4 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search careers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-96">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCareers.map((career) => (
                    <div
                      key={career.id}
                      className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer transition-colors"
                      onClick={() => addCareer(career)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{career.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          career.category === 'Technology' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                          career.category === 'Healthcare' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                          career.category === 'Business' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                          'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                        }`}>
                          {career.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{career.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-green-600 dark:text-green-400">{career.averageSalary}</span>
                        <div className="flex items-center space-x-1">
                          <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-blue-600 dark:text-blue-400">Add to compare</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredCareers.length === 0 && (
                  <div className="text-center py-8">
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">No careers found matching your search.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;