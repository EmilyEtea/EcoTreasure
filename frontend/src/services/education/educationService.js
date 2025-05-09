import axios from 'axios';

// Categories of educational content
export const EDUCATIONAL_CATEGORIES = [
  {
    id: 'basics',
    title: 'Recycling Basics',
    description: 'Fundamental concepts and principles of recycling.'
  },
  {
    id: 'creative',
    title: 'Creative Upcycling',
    description: 'Transforming waste into valuable and beautiful items.'
  },
  {
    id: 'environmental',
    title: 'Environmental Impact',
    description: 'How upcycling and recycling benefit our planet.'
  },
  {
    id: 'sustainable',
    title: 'Sustainable Living',
    description: 'Incorporating eco-friendly practices into everyday life.'
  }
];


export const ARTICLES = [
  {
    id: 1,
    title: 'Understanding Recycling Symbols',
    category: 'basics',
    type: 'article',
    summary: 'Learn what the numbers and symbols on plastic containers mean for recycling.',
    imageUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9',
    readTime: '5 min read',
    author: 'Environmental Expert',
    link: 'https://earth911.com/home-garden/recycling-mystery-plastic-container-codes/'
  },
  {
    id: 2,
    title: 'The Lifecycle of Recycled Materials',
    category: 'basics',
    type: 'article',
    summary: 'Follow the journey of recycled materials from collection to new products.',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b',
    readTime: '8 min read',
    author: 'Recycling Specialist',
    link: 'https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/how-do-i-recycle-common-recyclables'
  },
  {
    id: 3,
    title: 'Turning Old Tires into Garden Planters',
    category: 'creative',
    type: 'article',
    summary: 'Step-by-step guide to transform discarded tires into beautiful garden features.',
    imageUrl: 'https://images.unsplash.com/photo-1503743869511-e801806b2b66',
    readTime: '12 min read',
    author: 'DIY Enthusiast',
    link: 'https://www.bobvila.com/articles/diy-tire-planter/'
  },
  {
    id: 4,
    title: 'Upcycled Art: Creating Beauty from Waste',
    category: 'creative',
    type: 'article',
    summary: 'Explore how artists around the world are turning trash into gallery-worthy pieces.',
    imageUrl: 'https://images.unsplash.com/photo-1567016526105-22da7c13161a',
    readTime: '7 min read',
    author: 'Arts Curator',
    link: 'https://www.theartnewspaper.com/2023/10/11/artists-environmental-activists-recyling-artworks'
  },
  {
    id: 5,
    title: 'How Recycling Reduces Greenhouse Gas Emissions',
    category: 'environmental',
    type: 'article',
    summary: 'The science behind recycling positive impact on climate change.',
    imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce',
    readTime: '10 min read',
    author: 'Climate Researcher',
    link: 'https://www.epa.gov/warm/recycling-and-greenhouse-gas-reductions'
  },
  {
    id: 6,
    title: 'The Problem with Plastic Pollution',
    category: 'environmental',
    type: 'article',
    summary: 'Understanding the scale of plastic pollution and how recycling helps combat it.',
    imageUrl: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5',
    readTime: '9 min read',
    author: 'Marine Biologist',
    link: 'https://www.nationalgeographic.com/environment/article/plastic-pollution'
  },
  {
    id: 7,
    title: 'Zero-Waste Home: Practical Tips',
    category: 'sustainable',
    type: 'article',
    summary: 'Simple ways to reduce waste in your household and live more sustainably.',
    imageUrl: 'https://images.unsplash.com/photo-1585664811087-47f65abbad64',
    readTime: '6 min read',
    author: 'Sustainability Coach',
    link: 'https://www.goingzerowaste.com/blog/31-day-zero-waste-challenge/'
  },
  {
    id: 8,
    title: 'Sustainable Shopping Habits',
    category: 'sustainable',
    type: 'article',
    summary: 'How to make environmentally conscious decisions while shopping.',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b',
    readTime: '7 min read',
    author: 'Eco Consumer Advocate',
    link: 'https://www.greenamerica.org/green-living/sustainable-shopping-guide'
  }
];

export const VIDEOS = [
  {
    id: 1,
    title: 'Recycling 101: The Basics',
    category: 'basics',
    type: 'video',
    summary: 'A comprehensive introduction to recycling for beginners.',
    imageUrl: 'https://img.youtube.com/vi/VlRVPum9cp4/maxresdefault.jpg',
    youtubeId: 'VlRVPum9cp4',
    duration: '5:24',
    creator: 'Eco Education Channel'
  },
  {
    id: 2,
    title: 'How Plastic is Recycled',
    category: 'basics',
    type: 'video',
    summary: 'Behind the scenes at a plastic recycling facility.',
    imageUrl: 'https://img.youtube.com/vi/-EvLyt3wI_E/maxresdefault.jpg',
    youtubeId: '-EvLyt3wI_E',
    duration: '8:37',
    creator: 'Science Explained'
  },
  {
    id: 3,
    title: 'DIY Paper Mache Bowl from Newspaper',
    category: 'creative',
    type: 'video',
    summary: 'Create beautiful decorative bowls using old newspapers.',
    imageUrl: 'https://img.youtube.com/vi/JvG7aG4xZoY/maxresdefault.jpg',
    youtubeId: 'JvG7aG4xZoY',
    duration: '12:15',
    creator: 'Crafty Upcycler'
  },
  {
    id: 4,
    title: 'Upcycled Denim Projects',
    category: 'creative',
    type: 'video',
    summary: 'Five creative ways to repurpose old jeans.',
    imageUrl: 'https://img.youtube.com/vi/hBzrRf3IVCw/maxresdefault.jpg',
    youtubeId: 'hBzrRf3IVCw',
    duration: '15:42',
    creator: 'DIY Fashion'
  },
  {
    id: 5,
    title: 'Landfills: The Hidden Environmental Crisis',
    category: 'environmental',
    type: 'video',
    summary: 'The environmental impact of landfills and how recycling helps.',
    imageUrl: 'https://img.youtube.com/vi/qZrjClkdcZc/maxresdefault.jpg',
    youtubeId: 'qZrjClkdcZc',
    duration: '18:22',
    creator: 'Environmental Documentaries'
  },
  {
    id: 6,
    title: 'Ocean Plastic: From Crisis to Opportunity',
    category: 'environmental',
    type: 'video',
    summary: 'Innovations turning ocean plastic into valuable products.',
    imageUrl: 'https://img.youtube.com/vi/HQTUWK7CM-Y/maxresdefault.jpg',
    youtubeId: 'HQTUWK7CM-Y',
    duration: '22:05',
    creator: 'Ocean Conservation Channel'
  },
  {
    id: 7,
    title: 'Minimalism: A Documentary About the Important Things',
    category: 'sustainable',
    type: 'video',
    summary: 'How living with less can lead to a more sustainable and fulfilling life.',
    imageUrl: 'https://img.youtube.com/vi/0Co1Iptd4p4/maxresdefault.jpg',
    youtubeId: '0Co1Iptd4p4',
    duration: '45:10',
    creator: 'Minimalism Movement'
  },
  {
    id: 8,
    title: 'Zero-Waste Grocery Shopping Guide',
    category: 'sustainable',
    type: 'video',
    summary: 'Tips and tricks for plastic-free, zero-waste grocery shopping.',
    imageUrl: 'https://img.youtube.com/vi/8Utn7nUuFrg/maxresdefault.jpg',
    youtubeId: '8Utn7nUuFrg',
    duration: '10:33',
    creator: 'Sustainable Living'
  }
];


export const getAllEducationalContent = () => {

  return Promise.resolve({
    articles: ARTICLES,
    videos: VIDEOS,
    categories: EDUCATIONAL_CATEGORIES
  });
};

export const getContentByCategory = (categoryId) => {
  const articles = ARTICLES.filter(article => article.category === categoryId);
  const videos = VIDEOS.filter(video => video.category === categoryId);
  
  return Promise.resolve({
    articles,
    videos,
    category: EDUCATIONAL_CATEGORIES.find(cat => cat.id === categoryId)
  });
};


export const getContentByType = (type) => {
  const content = type === 'article' ? ARTICLES : VIDEOS;
  
  return Promise.resolve(content);
};