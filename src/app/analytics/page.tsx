// app/analytics/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Activity,
  Heart,
  MessageSquare,
  Share2,
  FileText,
} from "lucide-react";
import { initialOverview, dailyAnalytics, hourlyAnalytics } from "./data";

export default function AnalyticsDashboard() {
  // State for live simulated stats
  const [liveStats, setLiveStats] = useState(initialOverview);
  const [liveHourlyData, setLiveHourlyData] = useState(hourlyAnalytics);

  // Real-time data simulation (Updates every 3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Increment total overview stats randomly
      const newLikes = Math.floor(Math.random() * 5);
      const newShares = Math.floor(Math.random() * 2);
      const newComments = Math.floor(Math.random() * 3);
      const newReach = Math.floor(Math.random() * 15) + 5;

      setLiveStats((prev) => ({
        ...prev,
        likes: prev.likes + newLikes,
        shares: prev.shares + newShares,
        comments: prev.comments + newComments,
        reach: prev.reach + newReach,
      }));

      // 2. Update the very last item in the hourly chart to simulate a live graph spike
      setLiveHourlyData((prev) => {
        const newData = [...prev];
        const lastIndex = newData.length - 1;
        newData[lastIndex] = {
          ...newData[lastIndex],
          likes: newData[lastIndex].likes + newLikes,
          reach: newData[lastIndex].reach + newReach,
        };
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-col md:flex p-8 pt-7 space-y-8 w-full max-w-7xl mx-auto">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Platform Analytics</h2>
          <p className="text-muted-foreground">
            Real-time mock metrics for your social media platform.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-700"></span>
          </span>
          <span className="text-sm font-medium text-emerald-700">Live Updates Active</span>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liveStats.posts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+2 since yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <Heart className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liveStats.likes.toLocaleString()}</div>
            <p className="text-xs text-emerald-600 font-medium">Trending up instantly</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liveStats.comments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
            <Share2 className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liveStats.shares.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+4% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <Activity className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liveStats.reach.toLocaleString()}</div>
            <p className="text-xs text-emerald-600 font-medium">+ Real-time traffic</p>
          </CardContent>
        </Card>
      </div>

      {/* Dynamic Charts Section */}
      <Tabs defaultValue="hourly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="hourly">Live Hourly Data</TabsTrigger>
          <TabsTrigger value="daily">30-Day Overview</TabsTrigger>
        </TabsList>
        
        {/* HOURLY TAB CONTENT */}
        <TabsContent value="hourly" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Live Reach Area Chart */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Live Reach (24h)</CardTitle>
                <CardDescription>
                  Real-time visualization of content distribution.
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={liveHourlyData}>
                      <defs>
                        <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis dataKey="time" axisLine={false} tickLine={false} fontSize={12} />
                      <YAxis axisLine={false} tickLine={false} fontSize={12} width={50} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                      />
                      <Area
                        type="monotone"
                        dataKey="reach"
                        stroke="#f97316"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorReach)"
                        isAnimationActive={true}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Live Interactions Bar Chart */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Interactions Setup</CardTitle>
                <CardDescription>Hourly breakdown of engagement.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={liveHourlyData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis dataKey="time" axisLine={false} tickLine={false} fontSize={12} />
                      <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                      <Bar dataKey="likes" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="comments" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* DAILY TAB CONTENT */}
        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>30-Day Performance History</CardTitle>
              <CardDescription>
                Long-term analytics comparing reach vs. total interactions.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[450px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dailyAnalytics}>
                    <defs>
                      <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorDailyReach" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} fontSize={12} />
                    <YAxis axisLine={false} tickLine={false} fontSize={12} width={50} />
                    <Tooltip />
                    <Area type="monotone" dataKey="reach" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorDailyReach)" />
                    <Area type="monotone" dataKey="likes" stroke="#ec4899" fillOpacity={1} fill="url(#colorLikes)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}