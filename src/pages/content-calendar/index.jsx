import React, { useState, useCallback, useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import Breadcrumb from '../../components/ui/Breadcrumb';
import StatusBar from '../../components/ui/StatusBar';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const ContentCalendar = () => {
  const [currentView, setCurrentView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filters, setFilters] = useState({
    contentType: 'all',
    status: 'all'
  });

  // Mock calendar events data
  const calendarEvents = [
    {
      id: 1,
      title: "The Future of AI in Business: 5 Key Trends to Watch",
      start: new Date(2024, 11, 15, 9, 0),
      end: new Date(2024, 11, 15, 9, 30),
      status: 'scheduled',
      contentType: 'article',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop',
      engagement: { likes: 0, comments: 0, shares: 0 },
      content: `Artificial Intelligence is reshaping the business landscape at an unprecedented pace. As we move into 2024, here are five critical trends that every business leader should understand:

1. Autonomous Decision-Making Systems
2. Personalized Customer Experiences at Scale
3. Predictive Analytics for Strategic Planning
4. AI-Powered Cybersecurity Solutions
5. Sustainable AI Practices

Each of these trends represents both an opportunity and a challenge for modern businesses.`,
      optimalTime: true
    },
    {
      id: 2,
      title: "Building Remote Teams: Lessons from 3 Years of Distributed Work",
      start: new Date(2024, 11, 16, 14, 0),
      end: new Date(2024, 11, 16, 14, 30),
      status: 'draft',
      contentType: 'personal',
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop',
      engagement: { likes: 0, comments: 0, shares: 0 },
      content: `Three years ago, our company made the bold decision to go fully remote. Here's what we learned about building and managing distributed teams:The key isn't just about having the right tools – it's about creating a culture of trust, communication, and accountability that transcends physical boundaries.`,
      optimalTime: false
    },
    {
      id: 3,
      title: "Data Privacy in the Age of AI: A Practical Guide",
      start: new Date(2024, 11, 18, 11, 0),
      end: new Date(2024, 11, 18, 11, 30),
      status: 'published',contentType: 'educational',thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=200&fit=crop',
      engagement: { likes: 127, comments: 23, shares: 45 },
      content: `As AI becomes more prevalent in our daily operations, data privacy concerns are reaching new heights. Organizations must balance innovation with responsibility.

Here's a practical framework for maintaining data privacy while leveraging AI capabilities in your business operations.`,
      optimalTime: true
    },
    {
      id: 4,
      title: "Sustainable Business Practices: ROI Beyond Profit",
      start: new Date(2024, 11, 20, 16, 0),
      end: new Date(2024, 11, 20, 16, 30),
      status: 'failed',
      contentType: 'thought-leadership',
      thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=200&fit=crop',
      engagement: { likes: 0, comments: 0, shares: 0 },
      content: `Sustainability isn't just about doing good – it's about doing well. Companies that embrace sustainable practices are seeing returns that go far beyond traditional profit metrics.

Let's explore how sustainable business practices create value across multiple dimensions.`,
      optimalTime: false
    },
    {
      id: 5,
      title: "The Psychology of User Experience Design",
      start: new Date(2024, 11, 22, 10, 0),
      end: new Date(2024, 11, 22, 10, 30),
      status: 'scheduled',contentType: 'educational',thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=200&fit=crop',
      engagement: { likes: 0, comments: 0, shares: 0 },
      content: `Great UX design isn't just about making things look pretty – it's about understanding human psychology and behavior patterns.

Here are the key psychological principles that drive effective user experience design.`,
      optimalTime: true
    }
  ];

  // Mock AI suggested optimal posting times
  const optimalPostingTimes = [
    { date: new Date(2024, 11, 17, 9, 0), score: 95 },
    { date: new Date(2024, 11, 17, 14, 0), score: 88 },
    { date: new Date(2024, 11, 19, 11, 0), score: 92 },
    { date: new Date(2024, 11, 21, 15, 0), score: 90 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-success text-white';
      case 'scheduled': return 'bg-secondary text-white';
      case 'draft': return 'bg-warning text-white';
      case 'failed': return 'bg-error text-white';
      default: return 'bg-text-secondary text-white';
    }
  };

  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'article': return 'FileText';
      case 'personal': return 'User';
      case 'educational': return 'BookOpen';
      case 'thought-leadership': return 'Lightbulb';
      default: return 'FileText';
    }
  };

  const filteredEvents = useMemo(() => {
    return calendarEvents.filter(event => {
      const typeMatch = filters.contentType === 'all' || event.contentType === filters.contentType;
      const statusMatch = filters.status === 'all' || event.status === filters.status;
      return typeMatch && statusMatch;
    });
  }, [filters]);

  const handleSelectEvent = useCallback((event) => {
    setSelectedEvent(event);
  }, []);

  const handleEventDrop = useCallback(({ event, start, end }) => {
    // Handle drag and drop rescheduling
    console.log('Event moved:', event.title, 'to', start);
    // Update event in state/backend
  }, []);

  const eventStyleGetter = useCallback((event) => {
    const baseStyle = {
      borderRadius: '4px',
      border: 'none',
      fontSize: '12px',
      padding: '2px 4px'
    };

    if (event.optimalTime) {
      return {
        style: {
          ...baseStyle,
          border: '2px solid var(--color-success)',
          boxShadow: '0 0 0 1px var(--color-success)'
        }
      };
    }

    return { style: baseStyle };
  }, []);

  const CustomEvent = ({ event }) => (
    <div className="flex items-center space-x-1 text-xs">
      <Icon name={getContentTypeIcon(event.contentType)} size={12} />
      <span className="truncate">{event.title}</span>
      {event.optimalTime && <Icon name="Zap" size={10} className="text-success" />}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <StatusBar />
      
      <main className="pt-4">
        <div className="container-custom">
          <Breadcrumb />
          
          {/* Calendar Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-heading font-semibold text-text-primary mb-2">Content Calendar</h1>
              <p className="text-text-secondary">Organize and schedule your LinkedIn content with AI-powered optimization</p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Icon name="Plus" size={20} />
                <span>Add Content</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Mini Calendar */}
              <div className="card p-4">
                <h3 className="text-lg font-heading font-medium text-text-primary mb-4">Quick Navigation</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setCurrentDate(new Date())}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-background rounded transition-colors duration-200"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => setCurrentDate(moment().add(1, 'week').toDate())}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-background rounded transition-colors duration-200"
                  >
                    Next Week
                  </button>
                  <button
                    onClick={() => setCurrentDate(moment().add(1, 'month').toDate())}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-background rounded transition-colors duration-200"
                  >
                    Next Month
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="card p-4">
                <h3 className="text-lg font-heading font-medium text-text-primary mb-4">Filters</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Content Type</label>
                    <select
                      value={filters.contentType}
                      onChange={(e) => setFilters(prev => ({ ...prev, contentType: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="all">All Types</option>
                      <option value="article">Articles</option>
                      <option value="personal">Personal</option>
                      <option value="educational">Educational</option>
                      <option value="thought-leadership">Thought Leadership</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Status</label>
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="draft">Draft</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="published">Published</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* AI Suggestions */}
              <div className="card p-4">
                <h3 className="text-lg font-heading font-medium text-text-primary mb-4 flex items-center space-x-2">
                  <Icon name="Zap" size={20} className="text-secondary" />
                  <span>AI Suggestions</span>
                </h3>
                <div className="space-y-3">
                  {optimalPostingTimes.slice(0, 3).map((time, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-background rounded">
                      <div>
                        <div className="text-sm font-medium text-text-primary">
                          {moment(time.date).format('MMM DD, h:mm A')}
                        </div>
                        <div className="text-xs text-text-secondary">
                          Optimal engagement score: {time.score}%
                        </div>
                      </div>
                      <button className="text-secondary hover:text-secondary/80 transition-colors duration-200">
                        <Icon name="Plus" size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Calendar */}
            <div className="lg:col-span-2">
              <div className="card p-4">
                {/* Calendar Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentDate(moment(currentDate).subtract(1, currentView).toDate())}
                      className="p-2 text-text-secondary hover:text-primary transition-colors duration-200 focus-ring rounded"
                    >
                      <Icon name="ChevronLeft" size={20} />
                    </button>
                    <h2 className="text-xl font-heading font-medium text-text-primary">
                      {moment(currentDate).format('MMMM YYYY')}
                    </h2>
                    <button
                      onClick={() => setCurrentDate(moment(currentDate).add(1, currentView).toDate())}
                      className="p-2 text-text-secondary hover:text-primary transition-colors duration-200 focus-ring rounded"
                    >
                      <Icon name="ChevronRight" size={20} />
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {['month', 'week', 'day'].map((view) => (
                      <button
                        key={view}
                        onClick={() => setCurrentView(view)}
                        className={`px-3 py-1 text-sm font-medium rounded transition-colors duration-200 ${
                          currentView === view
                            ? 'bg-primary text-white' :'text-text-secondary hover:text-primary hover:bg-background'
                        }`}
                      >
                        {view.charAt(0).toUpperCase() + view.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calendar Component */}
                <div className="h-96 lg:h-[600px]">
                  <Calendar
                    localizer={localizer}
                    events={filteredEvents}
                    startAccessor="start"
                    endAccessor="end"
                    view={currentView}
                    onView={setCurrentView}
                    date={currentDate}
                    onNavigate={setCurrentDate}
                    onSelectEvent={handleSelectEvent}
                    onEventDrop={handleEventDrop}
                    eventPropGetter={eventStyleGetter}
                    components={{
                      event: CustomEvent
                    }}
                    style={{ height: '100%' }}
                    className="custom-calendar"
                  />
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Selected Post Details */}
              {selectedEvent ? (
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-heading font-medium text-text-primary">Post Details</h3>
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="text-text-secondary hover:text-primary transition-colors duration-200"
                    >
                      <Icon name="X" size={20} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="relative h-32 rounded-lg overflow-hidden">
                      <Image
                        src={selectedEvent.thumbnail}
                        alt="Post thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedEvent.status)}`}>
                        {selectedEvent.status}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">{selectedEvent.title}</h4>
                      <p className="text-sm text-text-secondary line-clamp-3">{selectedEvent.content}</p>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Icon name={getContentTypeIcon(selectedEvent.contentType)} size={16} className="text-secondary" />
                        <span className="text-text-secondary capitalize">{selectedEvent.contentType}</span>
                      </div>
                      <div className="text-text-secondary">
                        {moment(selectedEvent.start).format('MMM DD, h:mm A')}
                      </div>
                    </div>
                    
                    {selectedEvent.status === 'published' && (
                      <div className="pt-4 border-t border-border">
                        <h5 className="text-sm font-medium text-text-primary mb-2">Engagement</h5>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div>
                            <div className="text-lg font-semibold text-text-primary">{selectedEvent.engagement.likes}</div>
                            <div className="text-xs text-text-secondary">Likes</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-text-primary">{selectedEvent.engagement.comments}</div>
                            <div className="text-xs text-text-secondary">Comments</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-text-primary">{selectedEvent.engagement.shares}</div>
                            <div className="text-xs text-text-secondary">Shares</div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 btn-secondary text-sm py-2">
                        <Icon name="Edit" size={16} className="mr-1" />
                        Edit
                      </button>
                      <button className="flex-1 btn-accent text-sm py-2">
                        <Icon name="Copy" size={16} className="mr-1" />
                        Duplicate
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card p-4">
                  <div className="text-center py-8">
                    <Icon name="Calendar" size={48} className="text-text-secondary mx-auto mb-4" />
                    <h3 className="text-lg font-heading font-medium text-text-primary mb-2">Select a Post</h3>
                    <p className="text-text-secondary text-sm">Click on any calendar event to view details and manage your content</p>
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              <div className="card p-4">
                <h3 className="text-lg font-heading font-medium text-text-primary mb-4">This Month</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Scheduled</span>
                    <span className="text-sm font-medium text-text-primary">
                      {calendarEvents.filter(e => e.status === 'scheduled').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Published</span>
                    <span className="text-sm font-medium text-text-primary">
                      {calendarEvents.filter(e => e.status === 'published').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Drafts</span>
                    <span className="text-sm font-medium text-text-primary">
                      {calendarEvents.filter(e => e.status === 'draft').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Failed</span>
                    <span className="text-sm font-medium text-text-primary">
                      {calendarEvents.filter(e => e.status === 'failed').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContentCalendar;