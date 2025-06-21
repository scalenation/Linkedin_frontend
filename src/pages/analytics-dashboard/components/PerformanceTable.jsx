import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceTable = ({ contentType, dateRange }) => {
  const [sortField, setSortField] = useState('engagement_score');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const postsData = [
    {
      id: 1,
      title: "AI in Marketing: 5 Game-Changing Trends for 2024",
      type: "article",
      date: "2024-01-15",
      views: 12400,
      likes: 892,
      comments: 67,
      shares: 45,
      engagement_score: 8.9,
      ctr: 7.2
    },
    {
      id: 2,
      title: "Building Remote Teams That Actually Work",
      type: "post",
      date: "2024-01-14",
      views: 9800,
      likes: 756,
      comments: 52,
      shares: 38,
      engagement_score: 8.6,
      ctr: 7.7
    },
    {
      id: 3,
      title: "The Future of Work: Hybrid vs Remote",
      type: "video",
      date: "2024-01-13",
      views: 15600,
      likes: 1024,
      comments: 89,
      shares: 67,
      engagement_score: 9.2,
      ctr: 6.6
    },
    {
      id: 4,
      title: "LinkedIn Growth Strategies for Small Businesses",
      type: "post",
      date: "2024-01-12",
      views: 8200,
      likes: 634,
      comments: 41,
      shares: 29,
      engagement_score: 8.1,
      ctr: 7.7
    },
    {
      id: 5,
      title: "Data-Driven Decision Making in 2024",
      type: "image",
      date: "2024-01-11",
      views: 6800,
      likes: 445,
      comments: 28,
      shares: 19,
      engagement_score: 7.4,
      ctr: 6.5
    },
    {
      id: 6,
      title: "Customer Success Best Practices",
      type: "article",
      date: "2024-01-10",
      views: 7900,
      likes: 578,
      comments: 35,
      shares: 24,
      engagement_score: 7.8,
      ctr: 7.3
    },
    {
      id: 7,
      title: "Social Media Automation Tools Review",
      type: "post",
      date: "2024-01-09",
      views: 5600,
      likes: 389,
      comments: 22,
      shares: 15,
      engagement_score: 7.1,
      ctr: 6.9
    },
    {
      id: 8,
      title: "Content Marketing Trends to Watch",
      type: "video",
      date: "2024-01-08",
      views: 11200,
      likes: 823,
      comments: 56,
      shares: 42,
      engagement_score: 8.4,
      ctr: 7.4
    }
  ];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...postsData].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'article': return 'FileText';
      case 'video': return 'Video';
      case 'image': return 'Image';
      default: return 'MessageSquare';
    }
  };

  const getEngagementColor = (score) => {
    if (score >= 8.5) return 'text-success';
    if (score >= 7.5) return 'text-warning';
    return 'text-error';
  };

  const handleRepost = (postId) => {
    console.log('Reposting:', postId);
  };

  const handleAnalyze = (postId) => {
    console.log('Analyzing:', postId);
  };

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-1">
            Post Performance Table
          </h3>
          <p className="text-sm text-text-secondary">
            Detailed metrics for individual posts
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">
            {sortedData.length} posts
          </span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2">
                <button
                  onClick={() => handleSort('title')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  <span>Post</span>
                  {sortField === 'title' && (
                    <Icon name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} size={14} />
                  )}
                </button>
              </th>
              <th className="text-left py-3 px-2">
                <button
                  onClick={() => handleSort('views')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  <span>Views</span>
                  {sortField === 'views' && (
                    <Icon name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} size={14} />
                  )}
                </button>
              </th>
              <th className="text-left py-3 px-2">
                <button
                  onClick={() => handleSort('likes')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  <span>Likes</span>
                  {sortField === 'likes' && (
                    <Icon name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} size={14} />
                  )}
                </button>
              </th>
              <th className="text-left py-3 px-2">
                <button
                  onClick={() => handleSort('comments')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  <span>Comments</span>
                  {sortField === 'comments' && (
                    <Icon name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} size={14} />
                  )}
                </button>
              </th>
              <th className="text-left py-3 px-2">
                <button
                  onClick={() => handleSort('shares')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  <span>Shares</span>
                  {sortField === 'shares' && (
                    <Icon name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} size={14} />
                  )}
                </button>
              </th>
              <th className="text-left py-3 px-2">
                <button
                  onClick={() => handleSort('engagement_score')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  <span>Score</span>
                  {sortField === 'engagement_score' && (
                    <Icon name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} size={14} />
                  )}
                </button>
              </th>
              <th className="text-left py-3 px-2">
                <span className="text-sm font-medium text-text-secondary">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((post) => (
              <tr key={post.id} className="border-b border-border hover:bg-background transition-colors duration-200">
                <td className="py-4 px-2">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <Icon name={getContentTypeIcon(post.type)} size={16} className="text-text-secondary mt-1" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-text-primary mb-1 line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="flex items-center space-x-2 text-xs text-text-secondary">
                        <span className="capitalize">{post.type}</span>
                        <span>•</span>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className="text-sm text-text-primary">{post.views.toLocaleString()}</span>
                </td>
                <td className="py-4 px-2">
                  <span className="text-sm text-text-primary">{post.likes.toLocaleString()}</span>
                </td>
                <td className="py-4 px-2">
                  <span className="text-sm text-text-primary">{post.comments}</span>
                </td>
                <td className="py-4 px-2">
                  <span className="text-sm text-text-primary">{post.shares}</span>
                </td>
                <td className="py-4 px-2">
                  <span className={`text-sm font-medium ${getEngagementColor(post.engagement_score)}`}>
                    {post.engagement_score}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleAnalyze(post.id)}
                      className="p-1 text-text-secondary hover:text-secondary transition-colors duration-200 focus-ring rounded"
                      title="Analyze post"
                    >
                      <Icon name="BarChart3" size={14} />
                    </button>
                    <button
                      onClick={() => handleRepost(post.id)}
                      className="p-1 text-text-secondary hover:text-accent transition-colors duration-200 focus-ring rounded"
                      title="Repost content"
                    >
                      <Icon name="Repeat" size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <div className="text-sm text-text-secondary">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} posts
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus-ring rounded"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-sm rounded transition-colors duration-200 ${
                    currentPage === page
                      ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-background'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus-ring rounded"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceTable;