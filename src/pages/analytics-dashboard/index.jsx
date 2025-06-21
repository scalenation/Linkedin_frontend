import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import Breadcrumb from '../../components/ui/Breadcrumb';
import StatusBar from '../../components/ui/StatusBar';
import Icon from '../../components/AppIcon';
import KPICards from './components/KPICards';
import EngagementChart from './components/EngagementChart';
import PostPerformanceChart from './components/PostPerformanceChart';
import AudienceHeatmap from './components/AudienceHeatmap';
import PerformanceTable from './components/PerformanceTable';
import AudienceDemographics from './components/AudienceDemographics';
import TopCategories from './components/TopCategories';
import OptimizationRecommendations from './components/OptimizationRecommendations';

const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [contentType, setContentType] = useState('all');
  const [comparisonPeriod, setComparisonPeriod] = useState('previous');
  const [isExporting, setIsExporting] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleExportPDF = async () => {
    setIsExporting(true);
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      // In real implementation, trigger PDF download
      console.log('Exporting PDF report...');
    }, 2000);
  };

  const handleExportCSV = () => {
    // Simulate CSV export
    console.log('Exporting CSV data...');
  };

  const dateRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom range' }
  ];

  const contentTypeOptions = [
    { value: 'all', label: 'All content' },
    { value: 'posts', label: 'Text posts' },
    { value: 'articles', label: 'Articles' },
    { value: 'videos', label: 'Videos' },
    { value: 'images', label: 'Images' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <StatusBar />
      
      <main className="container-custom py-8">
        <Breadcrumb />
        
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-semibold text-text-primary mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-text-secondary">
              Track your LinkedIn performance and optimize your content strategy
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <Icon name="Clock" size={14} className="text-text-secondary" />
              <span className="text-xs text-text-secondary">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
          </div>
          
          {/* Export Actions */}
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <button
              onClick={handleExportCSV}
              className="flex items-center space-x-2 px-4 py-2 bg-surface border border-border text-text-primary rounded-md hover:bg-background transition-colors duration-200 focus-ring"
            >
              <Icon name="Download" size={16} />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <Icon name="Loader" size={16} className="animate-spin" />
              ) : (
                <Icon name="FileText" size={16} />
              )}
              <span>{isExporting ? 'Generating...' : 'Export PDF'}</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Date Range
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {dateRangeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Content Type
              </label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {contentTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Compare to
              </label>
              <select
                value={comparisonPeriod}
                onChange={(e) => setComparisonPeriod(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="previous">Previous period</option>
                <option value="year">Same period last year</option>
                <option value="none">No comparison</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="xl:col-span-3 space-y-8">
            {/* KPI Cards */}
            <KPICards dateRange={dateRange} comparisonPeriod={comparisonPeriod} />
            
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EngagementChart dateRange={dateRange} />
              <PostPerformanceChart contentType={contentType} />
            </div>
            
            {/* Audience Activity Heatmap */}
            <AudienceHeatmap dateRange={dateRange} />
            
            {/* Performance Table */}
            <PerformanceTable contentType={contentType} dateRange={dateRange} />
          </div>
          
          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            <AudienceDemographics />
            <TopCategories />
            <OptimizationRecommendations />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;