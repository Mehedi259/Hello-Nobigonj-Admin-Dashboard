import {
  AdminArticle,
  AdminCategory,
  AdminAuthor,
  AdminMediaItem,
  AdminCommentItem,
  AdminUser,
  AdminSubscriber,
  AdminActivity,
  AdminNotification
} from '../types/admin'

export const INITIAL_ADMIN_ARTICLES: AdminArticle[] = [
  {
    id: 'art-1',
    title: 'নবীগঞ্জে ভয়াবহ বন্যায় ক্ষতিগ্রস্ত ৫০০ পরিবার: ত্রাণ ও পুনর্বাসনের জরুরি ডাক',
    slug: 'nobigonj-flood-500-families-affected-relief-call',
    category: 'নবীগঞ্জ ও সিলেট',
    status: 'Published',
    views: 18450,
    publishedDate: 'Oct 31, 2026',
    image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
    author: 'মাহমুদুল হাসান',
    excerpt: 'নবীগঞ্জ উপজেলায় সাম্প্রতিক ভারী বর্ষণ ও পাহাড়ি ঢলে প্লাবিত হয়েছে নিম্নাঞ্চল।'
  },
  {
    id: 'art-2',
    title: 'সিলেটের চা বাগানে নতুন পর্যটন কেন্দ্র উদ্বোধন: কর্মসংস্থানের নতুন দিগন্ত',
    slug: 'sylhet-tea-garden-new-tourism-center-opened',
    category: 'নবীগঞ্জ ও সিলেট',
    status: 'Published',
    views: 12340,
    publishedDate: 'Oct 31, 2026',
    image: 'https://images.unsplash.com/photo-1588880331179-bc9b93a0cb5e?auto=format&fit=crop&w=800&q=80',
    author: 'শাকিল আহমেদ',
    excerpt: 'সবুজে ঘেরা সিলেটে পরিবেশবান্ধব ইকো-ট্যুরিজম সেন্টারের উদ্বোধন।'
  },
  {
    id: 'art-3',
    title: 'যুক্তরাজ্য ও ইউরোপ প্রবাসী সিলেটীদের বিনিয়োগে নবীগঞ্জে আধুনিক হাসপাতাল কমপ্লেক্স',
    slug: 'uk-sylheti-expatriate-hospital-complex-nobigonj',
    category: 'প্রবাস',
    status: 'Published',
    views: 10560,
    publishedDate: 'Oct 31, 2026',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    author: 'লন্ডন প্রতিনিধি',
    excerpt: 'সাধারণ মানুষের দোরগোড়ায় আধুনিক ও উন্নত চিকিৎসা সেবা পৌঁছে দিতে ১০০ শয্যার হাসপাতাল।'
  },
  {
    id: 'art-4',
    title: 'কুশিয়ারা নদীর বাঁধ সংস্কারে দ্রুত পদক্ষেপ গ্রহণের নির্দেশ জেলা প্রশাসনের',
    slug: 'kushiyara-river-embankment-repair-nobigonj',
    category: 'নবীগঞ্জ ও সিলেট',
    status: 'Draft',
    views: 0,
    publishedDate: 'Oct 31, 2026',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    author: 'মাহমুদুল হাসান',
    excerpt: 'কুশিয়ারা নদীর ভাঙন থেকে ফসলি জমি ও বসতভিটা রক্ষায় টেকসই বাঁধ নির্মাণের নির্দেশ।'
  },
  {
    id: 'art-5',
    title: 'গ্রামবাংলার উন্নয়নে প্রযুক্তির ভূমিকা',
    slug: 'role-of-technology-in-rural-development',
    category: 'Others',
    status: 'Published',
    views: 5230,
    publishedDate: 'Oct 12, 2026',
    image: '/images/padma-bridge.jpg?v=20261014',
    author: 'Farhana Islam',
    excerpt: 'কৃষি ও গ্রামীণ অর্থনীতিতে ডিজিটাল প্রযুক্তি ও মোবাইল সেবার সুফল।'
  },
  {
    id: 'art-6',
    title: 'দেশের উন্নয়নে তরুণদের ভূমিকা অত্যন্ত গুরুত্বপূর্ণ: প্রধান উপদেষ্টা',
    slug: 'role-of-youth-in-national-development-chief-adviser',
    category: 'National',
    status: 'Published',
    views: 18450,
    publishedDate: 'Oct 14, 2026',
    image: '/images/hero-yunus.jpg?v=20261014',
    author: 'Mehedi Hasan',
    excerpt: 'নতুন বাংলাদেশ বিনির্মাণে তারুণ্যের শক্তিই মূল চালিকাশক্তি হতে যাচ্ছে।'
  },
  {
    id: 'art-7',
    title: 'ঐতিহাসিক ৭ মার্চ উপলক্ষে শপথ নিলো নতুন প্রজন্ম',
    slug: 'new-generation-takes-oath-on-historic-7th-march',
    category: 'National',
    status: 'Published',
    views: 31200,
    publishedDate: 'Oct 14, 2026',
    image: '/images/national-memorial.jpg?v=20261014',
    author: 'Mohammad Rakib',
    excerpt: 'জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমানের ৭ মার্চের ঐতিহাসিক ভাষণের চেতনায় শপথ।'
  }
]

export const INITIAL_CATEGORIES: AdminCategory[] = [
  { id: 'cat-1', name: 'জাতীয়', nameEn: 'National', slug: 'national', articleCount: 482, color: '#15803d' },
  { id: 'cat-2', name: 'রাজনীতি', nameEn: 'Politics', slug: 'politics', articleCount: 261, color: '#dc2626' },
  { id: 'cat-3', name: 'প্রযুক্তি', nameEn: 'Technology', slug: 'technology', articleCount: 198, color: '#2563eb' },
  { id: 'cat-4', name: 'খেলা', nameEn: 'Sports', slug: 'sports', articleCount: 164, color: '#f59e0b' },
  { id: 'cat-5', name: 'অন্যান্য', nameEn: 'Others', slug: 'others', articleCount: 143, color: '#9333ea' },
  { id: 'cat-6', name: 'অর্থনীতি', nameEn: 'Economy', slug: 'economy', articleCount: 185, color: '#d97706' },
  { id: 'cat-7', name: 'আন্তর্জাতিক', nameEn: 'International', slug: 'international', articleCount: 210, color: '#0284c7' },
  { id: 'cat-8', name: 'বিনোদন', nameEn: 'Entertainment', slug: 'entertainment', articleCount: 142, color: '#e11d48' },
]

export const INITIAL_AUTHORS: AdminAuthor[] = [
  { id: 'auth-1', name: 'Mehedi Hasan', role: 'Editor-in-Chief', email: 'mehedi@hellodesh.com', avatar: '/images/admin-avatar.jpg?v=20261014', bio: 'Senior investigative journalist and portal administrator.', articlesCount: 142, joinedDate: 'Jan 2026' },
  { id: 'auth-2', name: 'Mohammad Rakib', role: 'Senior Staff Reporter', email: 'rakib@hellodesh.com', avatar: '/images/reporter-rakib.jpg?v=20261014', bio: 'Covering national politics, heritage and cultural affairs.', articlesCount: 88, joinedDate: 'Feb 2026' },
  { id: 'auth-3', name: 'Shakil Ahmed', role: 'Political Analyst', email: 'shakil@hellodesh.com', avatar: '/images/reporter-rakib.jpg?v=20261014', bio: 'Specialist in South Asian geopolitics and election analysis.', articlesCount: 95, joinedDate: 'Mar 2026' },
  { id: 'auth-4', name: 'Farhana Islam', role: 'Economics Writer', email: 'farhana@hellodesh.com', avatar: '/images/reporter-rakib.jpg?v=20261014', bio: 'Banking, financial markets, and trade correspondent.', articlesCount: 64, joinedDate: 'Apr 2026' },
  { id: 'auth-5', name: 'Tanvir Ahmed', role: 'Sports Editor', email: 'tanvir@hellodesh.com', avatar: '/images/reporter-rakib.jpg?v=20261014', bio: 'Cricket enthusiast and international tournament correspondent.', articlesCount: 52, joinedDate: 'May 2026' },
  { id: 'auth-6', name: 'Arif Mahmud', role: 'Tech & Innovation Lead', email: 'arif@hellodesh.com', avatar: '/images/reporter-rakib.jpg?v=20261014', bio: 'Covering AI startups, software development and cyber security.', articlesCount: 47, joinedDate: 'Jun 2026' },
]

export const INITIAL_MEDIA: AdminMediaItem[] = [
  { id: 'm1', name: 'hero-yunus.jpg', url: '/images/hero-yunus.jpg?v=20261014', size: '26 KB', type: 'image', uploadedDate: 'Oct 14, 2026', dimensions: '682 x 416' },
  { id: 'm2', name: 'students-rally.jpg', url: '/images/students-rally.jpg?v=20261014', size: '14 KB', type: 'image', uploadedDate: 'Oct 14, 2026', dimensions: '400 x 220' },
  { id: 'm3', name: 'padma-bridge.jpg', url: '/images/padma-bridge.jpg?v=20261014', size: '5 KB', type: 'image', uploadedDate: 'Oct 14, 2026', dimensions: '400 x 200' },
  { id: 'm4', name: 'metro-rail.jpg', url: '/images/metro-rail.jpg?v=20261014', size: '3 KB', type: 'image', uploadedDate: 'Oct 14, 2026', dimensions: '160 x 120' },
  { id: 'm5', name: 'national-memorial.jpg', url: '/images/national-memorial.jpg?v=20261014', size: '46 KB', type: 'image', uploadedDate: 'Oct 14, 2026', dimensions: '800 x 420' },
  { id: 'm6', name: 'ai-bangladesh.jpg', url: '/images/ai-bangladesh.jpg?v=20261014', size: '3 KB', type: 'image', uploadedDate: 'Oct 14, 2026', dimensions: '160 x 120' },
  { id: 'm7', name: 'cricket-win.jpg', url: '/images/cricket-win.jpg?v=20261014', size: '3 KB', type: 'image', uploadedDate: 'Oct 14, 2026', dimensions: '160 x 120' },
  { id: 'm8', name: 'dollar-market.jpg', url: '/images/dollar-market.jpg?v=20261014', size: '3 KB', type: 'image', uploadedDate: 'Oct 14, 2026', dimensions: '160 x 120' },
  { id: 'm9', name: 'logo.png', url: '/logo.png', size: '31 KB', type: 'image', uploadedDate: 'Oct 14, 2026', dimensions: '986 x 232' },
]

export const INITIAL_COMMENTS: AdminCommentItem[] = [
  { id: 'comm-1', articleId: 'art-7', articleTitle: 'ঐতিহাসিক ৭ মার্চ উপলক্ষে শপথ নিলো নতুন প্রজন্ম', authorName: 'তানভীর আহমেদ', authorEmail: 'tanvir@gmail.com', content: 'অসাধারণ প্রতিবেদন! ৭ মার্চের চেতনা আমাদের তরুণ সমাজের জন্য পথপ্রদর্শক।', createdAt: 'Oct 14, 2026, 05:10 PM', status: 'Approved' },
  { id: 'comm-2', articleId: 'art-7', articleTitle: 'ঐতিহাসিক ৭ মার্চ উপলক্ষে শপথ নিলো নতুন প্রজন্ম', authorName: 'সাদিয়া তাসনিম', authorEmail: 'sadia@gmail.com', content: 'নতুন প্রজন্মের ঐক্যই আমাদের দেশকে এগিয়ে নেবে। ধন্যবাদ হ্যালো দেশকে এই সুন্দর প্রতিবেদনের জন্য।', createdAt: 'Oct 14, 2026, 05:30 PM', status: 'Approved' },
  { id: 'comm-3', articleId: 'art-2', articleTitle: 'ঢাকায় যানজট নিরসনে নতুন পরিকল্পনা', authorName: 'কামাল হোসেন', authorEmail: 'kamal@hotmail.com', content: 'সিগন্যাল ব্যবস্থা ঠিকমতো কাজ করলে সত্যিই ঢাকার যানজট অর্ধেকে নেমে আসবে।', createdAt: 'Oct 14, 2026, 03:20 PM', status: 'Approved' },
  { id: 'comm-4', articleId: 'art-6', articleTitle: 'দেশের উন্নয়নে তরুণদের ভূমিকা অত্যন্ত গুরুত্বপূর্ণ', authorName: 'মো. রফিকুল ইসলাম', authorEmail: 'rafiq@yahoo.com', content: 'বর্তমান সরকারের এই উদ্যোগকে আমরা সর্বান্তঃকরণে স্বাগত জানাই।', createdAt: 'Oct 14, 2026, 02:45 PM', status: 'Pending' },
  { id: 'comm-5', articleId: 'art-4', articleTitle: 'কৃত্রিম বুদ্ধিমত্তা: বাংলাদেশের জন্য সম্ভাবনা', authorName: 'Spam Bot 99', authorEmail: 'bot@spamlink.xyz', content: 'Earn $500 daily working from home, visit my website now!', createdAt: 'Oct 14, 2026, 01:10 PM', status: 'Spam' },
]

export const PAGE_VIEWS_DATA = [
  { date: 'Oct 8', views: 19200, visitors: 11400 },
  { date: 'Oct 9', views: 24500, visitors: 14200 },
  { date: 'Oct 10', views: 22000, visitors: 13100 },
  { date: 'Oct 11', views: 31000, visitors: 18500 },
  { date: 'Oct 12', views: 26400, visitors: 15800 },
  { date: 'Oct 13', views: 35800, visitors: 21900 },
  { date: 'Oct 14', views: 48320, visitors: 28640 },
]

export const CONTENT_DISTRIBUTION_DATA = [
  { name: 'News', value: 482, percent: 38.6, color: '#15803d' },
  { name: 'Politics', value: 261, percent: 20.9, color: '#dc2626' },
  { name: 'Technology', value: 198, percent: 15.9, color: '#2563eb' },
  { name: 'Sports', value: 164, percent: 13.1, color: '#f59e0b' },
  { name: 'Others', value: 143, percent: 11.5, color: '#9333ea' },
]

export const INITIAL_ACTIVITIES: AdminActivity[] = [
  {
    id: 'act-1',
    type: 'publish',
    title: 'New article published',
    detail: 'বাংলাদেশের নতুন অর্থনৈতিক সম্ভাবনা...',
    timeAgo: '2 hours ago',
    timestamp: Date.now() - 2 * 3600 * 1000
  },
  {
    id: 'act-2',
    type: 'register',
    title: 'User registered',
    detail: 'shuvo123@example.com',
    timeAgo: '3 hours ago',
    timestamp: Date.now() - 3 * 3600 * 1000
  },
  {
    id: 'act-3',
    type: 'comment',
    title: 'Comment added',
    detail: '“খুব ভালো লেখা, ধন্যবাদ!”',
    timeAgo: '4 hours ago',
    timestamp: Date.now() - 4 * 3600 * 1000
  },
  {
    id: 'act-4',
    type: 'subscribe',
    title: 'New subscriber',
    detail: 'rakesh@example.com',
    timeAgo: '5 hours ago',
    timestamp: Date.now() - 5 * 3600 * 1000
  },
  {
    id: 'act-5',
    type: 'update',
    title: 'Article updated',
    detail: 'রাজধানীর যানজট নিরসনে নতুন পরিকল্পনা',
    timeAgo: '6 hours ago',
    timestamp: Date.now() - 6 * 3600 * 1000
  }
]

export const INITIAL_USERS: AdminUser[] = [
  { id: 'u1', name: 'Mehedi Hasan', email: 'mehedi@hellodesh.com', role: 'Super Admin', status: 'Active', joinedDate: 'Jan 15, 2026', articlesCount: 142 },
  { id: 'u2', name: 'Mohammad Rakib', email: 'rakib@hellodesh.com', role: 'Reporter', status: 'Active', joinedDate: 'Feb 10, 2026', articlesCount: 88 },
  { id: 'u3', name: 'Shakil Ahmed', email: 'shakil@hellodesh.com', role: 'Editor', status: 'Active', joinedDate: 'Mar 01, 2026', articlesCount: 95 },
  { id: 'u4', name: 'Farhana Islam', email: 'farhana@hellodesh.com', role: 'Reporter', status: 'Active', joinedDate: 'Apr 20, 2026', articlesCount: 64 },
  { id: 'u5', name: 'Shuvo Roy', email: 'shuvo123@example.com', role: 'User', status: 'Active', joinedDate: 'Oct 14, 2026', articlesCount: 0 },
]

export const INITIAL_NOTIFICATIONS: AdminNotification[] = [
  { id: 'n1', title: 'High Traffic Alert', description: 'Real-time concurrent visitors exceeded 5,000.', time: '10 min ago', read: false, type: 'warning' },
  { id: 'n2', title: 'New Comment Pending', description: 'A comment on March 7th article requires moderation.', time: '45 min ago', read: false, type: 'info' },
  { id: 'n3', title: 'Backup Successful', description: 'Daily database backup was completed successfully.', time: '2 hours ago', read: false, type: 'success' },
]
