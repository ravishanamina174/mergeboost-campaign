// app/analytics/data.tsx

export const initialOverview = {
  posts: 1205,
  likes: 45231,
  shares: 8904,
  comments: 12453,
  reach: 230594,
};

// Generate 30 days of historical data for daily views
export const dailyAnalytics = Array.from({ length: 30 }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    likes: Math.floor(Math.random() * 5000) + 1000,
    comments: Math.floor(Math.random() * 2000) + 500,
    shares: Math.floor(Math.random() * 1000) + 200,
    reach: Math.floor(Math.random() * 15000) + 5000,
  };
});

// Generate 24 hours of data for hourly views
export const hourlyAnalytics = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i.toString().padStart(2, "0")}:00`,
  likes: Math.floor(Math.random() * 500) + 50,
  comments: Math.floor(Math.random() * 200) + 20,
  shares: Math.floor(Math.random() * 100) + 10,
  reach: Math.floor(Math.random() * 2000) + 500,
}));