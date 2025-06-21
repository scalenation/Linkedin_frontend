import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AudienceHeatmap = ({ dateRange }) => {
  const [viewType, setViewType] = useState('hourly');

  const hourlyData = [
    { hour: '00', mon: 12, tue: 8, wed: 15, thu: 10, fri: 6, sat: 25, sun: 18 },
    { hour: '01', mon: 8, tue: 5, wed: 12, thu: 7, fri: 4, sat: 20, sun: 15 },
    { hour: '02', mon: 5, tue: 3, wed: 8, thu: 4, fri: 2, sat: 15, sun: 12 },
    { hour: '03', mon: 3, tue: 2, wed: 5, thu: 3, fri: 1, sat: 12, sun: 8 },
    { hour: '04', mon: 2, tue: 1, wed: 3, thu: 2, fri: 1, sat: 8, sun: 5 },
    { hour: '05', mon: 4, tue: 3, wed: 6, thu: 4, fri: 2, sat: 10, sun: 7 },
    { hour: '06', mon: 15, tue: 12, wed: 18, thu: 16, fri: 10, sat: 15, sun: 12 },
    { hour: '07', mon: 35, tue: 32, wed: 38, thu: 36, fri: 25, sat: 20, sun: 18 },
    { hour: '08', mon: 65, tue: 62, wed: 68, thu: 66, fri: 45, sat: 25, sun: 22 },
    { hour: '09', mon: 85, tue: 82, wed: 88, thu: 86, fri: 65, sat: 35, sun: 30 },
    { hour: '10', mon: 95, tue: 92, wed: 98, thu: 96, fri: 75, sat: 45, sun: 40 },
    { hour: '11', mon: 88, tue: 85, wed: 92, thu: 90, fri: 70, sat: 50, sun: 45 },
    { hour: '12', mon: 92, tue: 89, wed: 95, thu: 93, fri: 75, sat: 55, sun: 50 },
    { hour: '13', mon: 78, tue: 75, wed: 82, thu: 80, fri: 60, sat: 45, sun: 40 },
    { hour: '14', mon: 72, tue: 69, wed: 75, thu: 73, fri: 55, sat: 40, sun: 35 },
    { hour: '15', mon: 68, tue: 65, wed: 72, thu: 70, fri: 50, sat: 35, sun: 30 },
    { hour: '16', mon: 75, tue: 72, wed: 78, thu: 76, fri: 58, sat: 40, sun: 35 },
    { hour: '17', mon: 82, tue: 79, wed: 85, thu: 83, fri: 65, sat: 45, sun: 40 },
    { hour: '18', mon: 88, tue: 85, wed: 92, thu: 90, fri: 70, sat: 50, sun: 45 },
    { hour: '19', mon: 85, tue: 82, wed: 88, thu: 86, fri: 68, sat: 55, sun: 50 },
    { hour: '20', mon: 78, tue: 75, wed: 82, thu: 80, fri: 62, sat: 60, sun: 55 },
    { hour: '21', mon: 65, tue: 62, wed: 68, thu: 66, fri: 50, sat: 65, sun: 60 },
    { hour: '22', mon: 45, tue: 42, wed: 48, thu: 46, fri: 35, sat: 55, sun: 50 },
    { hour: '23', mon: 25, tue: 22, wed: 28, thu: 26, fri: 20, sat: 40, sun: 35 }
  ];

  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getIntensityColor = (value) => {
    if (value === 0) return 'bg-gray-100';
    if (value <= 20) return 'bg-secondary/20';
    if (value <= 40) return 'bg-secondary/40';
    if (value <= 60) return 'bg-secondary/60';
    if (value <= 80) return 'bg-secondary/80';
    return 'bg-secondary';
  };

  const getIntensityLevel = (value) => {
    if (value === 0) return 'No activity';
    if (value <= 20) return 'Low activity';
    if (value <= 40) return 'Moderate activity';
    if (value <= 60) return 'High activity';
    if (value <= 80) return 'Very high activity';
    return 'Peak activity';
  };

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-1">
            Audience Activity Heatmap
          </h3>
          <p className="text-sm text-text-secondary">
            When your audience is most active on LinkedIn
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewType('hourly')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              viewType === 'hourly' ?'bg-primary text-white' :'bg-background text-text-secondary hover:text-text-primary'
            }`}
          >
            Hourly
          </button>
          <button
            onClick={() => setViewType('daily')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              viewType === 'daily' ?'bg-primary text-white' :'bg-background text-text-secondary hover:text-text-primary'
            }`}
          >
            Daily
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Day labels */}
          <div className="flex mb-2">
            <div className="w-12"></div>
            {dayLabels.map((day) => (
              <div key={day} className="flex-1 text-center text-xs font-medium text-text-secondary py-2">
                {day}
              </div>
            ))}
          </div>
          
          {/* Heatmap grid */}
          <div className="space-y-1">
            {hourlyData.map((row) => (
              <div key={row.hour} className="flex items-center">
                <div className="w-12 text-xs text-text-secondary text-right pr-2">
                  {row.hour}:00
                </div>
                {days.map((day) => (
                  <div
                    key={`${row.hour}-${day}`}
                    className={`flex-1 h-6 mx-0.5 rounded-sm cursor-pointer transition-all duration-200 hover:scale-110 ${getIntensityColor(row[day])}`}
                    title={`${dayLabels[days.indexOf(day)]} ${row.hour}:00 - ${getIntensityLevel(row[day])} (${row[day]}% of peak)`}
                  />
                ))}
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-text-secondary">Less</span>
              <div className="flex space-x-1">
                {[0, 20, 40, 60, 80, 100].map((value) => (
                  <div
                    key={value}
                    className={`w-3 h-3 rounded-sm ${getIntensityColor(value)}`}
                  />
                ))}
              </div>
              <span className="text-xs text-text-secondary">More</span>
            </div>
            
            <div className="flex items-center space-x-4 text-xs text-text-secondary">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={12} />
                <span>Best time: 10:00 AM</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={12} />
                <span>Best day: Wednesday</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudienceHeatmap;