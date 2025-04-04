/**
 * Utility functions for date formatting and manipulation
 */

/**
 * Format a date to a readable string
 * @param date The date to format
 * @returns Formatted date string (e.g., "May 10")
 */
export const formatDate = (date: Date | null): string => {
  if (!date) return "No date";
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

/**
 * Format a date as relative time
 * @param date The date to format
 * @returns Relative time string (e.g., "today", "tomorrow", "in 3 days", "May 10")
 */
export const formatRelativeDate = (date: Date | null): string => {
  if (!date) return "No date";
  
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === now.toDateString()) return "today";
  if (date.toDateString() === tomorrow.toDateString()) return "tomorrow";
  
  // Calculate days difference
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays > 0 && diffDays <= 7) return `in ${diffDays} days`;
  if (diffDays < 0 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`;
  
  return formatDate(date);
};

/**
 * Format a date range
 * @param startDate The start date
 * @param endDate The end date
 * @returns Formatted date range string (e.g., "May 10 - May 15")
 */
export const formatDateRange = (startDate: Date | null | undefined, endDate: Date | null | undefined): string => {
  if (!startDate || !endDate) return "";
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

/**
 * Get the deadline status class for styling
 * @param date The deadline date
 * @returns CSS class string based on deadline proximity
 */
export const getDeadlineStatusClass = (date: Date | null): string => {
  if (!date) return "text-gray-400";
  
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return "text-red-400"; // Overdue
  if (diffDays <= 2) return "text-yellow-300"; // Soon
  return "text-green-400"; // Plenty of time
}; 