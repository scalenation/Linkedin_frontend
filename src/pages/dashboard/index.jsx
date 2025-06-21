import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import Breadcrumb from '../../components/ui/Breadcrumb';
import StatusBar from '../../components/ui/StatusBar';
import Icon from '../../components/AppIcon';
import KPICards from './components/KPICards';
import RecentActivity from './components/RecentActivity';
import UpcomingPosts from './components/UpcomingPosts';
import AIAgentStatus from './components/AIAgentStatus';
import CreditUsageMeter from './components/CreditUsageMeter';
import EngagementChart from './components/EngagementChart';
import PostingFrequencyChart from './components/PostingFrequencyChart';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate loading dashboard data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Simulate real-time notifications
    const notificationTimer = setInterval(() => {
      const randomNotifications = [
        "New post published successfully on LinkedIn",
        "AI agent discovered 3 new trending topics",
        "Weekly engagement report is ready",
        "Credit usage: 75% of monthly limit reached"
      ];
      
      if (Math.random() > 0.8) {
        const randomNotification = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
        setNotifications(prev => [...prev.slice(-2), {
          id: Date.now(),
          message: randomNotification,
          timestamp: new Date(),
          type: 'info'
        }]);
      }
    }, 30000);

    return () => {
      clearTimeout(timer);
      clearInterval(notificationTimer);
    };
  }, []);

  const handleQuickAction = (action) => {
    switch (action) {
      case 'generate': navigate('/content-generation');
        break;
      case 'schedule': navigate('/content-calendar');
        break;
      case 'calendar': navigate('/content-calendar');
        break;
      case 'analytics': navigate('/analytics-dashboard');
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="flex items-center space-x-3">
            <Icon name="Loader" size={24} className="text-primary animate-spin" />
            <span className="text-text-secondary">Loading dashboard...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <StatusBar />
      
      <main className="container-custom py-6">
        <Breadcrumb />
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-semibold text-text-primary mb-2">
              Dashboard
            </h1>
            <p className="text-text-secondary">
              Monitor your LinkedIn automation performance and manage your content strategy
            </p>
          </div>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
            <button
              onClick={() => handleQuickAction('generate')}
              className="btn-primary flex items-center space-x-2"
            >
              <Icon name="PenTool" size={16} />
              <span>Generate Content</span>
            </button>
            <button
              onClick={() => handleQuickAction('schedule')}
              className="btn-secondary flex items-center space-x-2"
            >
              <Icon name="Calendar" size={16} />
              <span>Schedule Post</span>
            </button>
          </div>
        </div>

        {/* Real-time Notifications */}
        {notifications.length > 0 && (
          <div className="mb-6">
            {notifications.slice(-1).map((notification) => (
              <div
                key={notification.id}
                className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 flex items-center space-x-3 animate-fade-in"
              >
                <Icon name="Bell" size={16} className="text-secondary" />
                <span className="text-sm text-text-primary">{notification.message}</span>
                <span className="text-xs text-text-secondary ml-auto">
                  {notification.timestamp.toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* KPI Cards */}
        <KPICards />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Recent Activity & Charts */}
          <div className="lg:col-span-2 space-y-6">
            <RecentActivity />
            
            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PostingFrequencyChart />
              <EngagementChart />
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <UpcomingPosts />
            <AIAgentStatus />
            <CreditUsageMeter />
          </div>
        </div>

        {/* Bottom Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-medium text-text-primary">Trending Topics</h3>
                <p className="text-sm text-text-secondary">Discover what's hot</p>
              </div>
            </div>
            <button
              onClick={() => handleQuickAction('generate')}
              className="w-full text-left text-sm text-primary hover:text-primary/80 transition-colors duration-200"
            >
              View trending topics →
            </button>
          </div>

          <div className="card p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Icon name="BarChart3" size={20} className="text-secondary" />
              </div>
              <div>
                <h3 className="font-heading font-medium text-text-primary">Analytics</h3>
                <p className="text-sm text-text-secondary">Deep performance insights</p>
              </div>
            </div>
            <button
              onClick={() => handleQuickAction('analytics')}
              className="w-full text-left text-sm text-secondary hover:text-secondary/80 transition-colors duration-200"
            >
              View full analytics →
            </button>
          </div>

          <div className="card p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Calendar" size={20} className="text-accent" />
              </div>
              <div>
                <h3 className="font-heading font-medium text-text-primary">Content Calendar</h3>
                <p className="text-sm text-text-secondary">Manage your schedule</p>
              </div>
            </div>
            <button
              onClick={() => handleQuickAction('calendar')}
              className="w-full text-left text-sm text-accent hover:text-accent/80 transition-colors duration-200"
            >
              Open calendar →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;