import {ProjectSubmissionFormData} from "@/features/projects/schemas/project-submission-schema";

export interface Tag {
    tagId: number
    name: string
}

export interface Teammate {
    id: number
    name: string
    avatar: string
    role: string
}

export interface Tier {
    value: number
    label: string
}


export const AVAILABLE_TEAMMATES: Teammate[] = [
    { id: 1, name: 'John Doe', avatar: 'JD', role: 'Frontend Developer' },
    { id: 2, name: 'Jane Smith', avatar: 'JS', role: 'Backend Developer' },
    { id: 3, name: 'Mike Johnson', avatar: 'MJ', role: 'Full Stack Developer' },
    { id: 4, name: 'Sarah Wilson', avatar: 'SW', role: 'UI/UX Designer' },
    { id: 5, name: 'Alex Chen', avatar: 'AC', role: 'DevOps Engineer' },
    { id: 6, name: 'Emma Davis', avatar: 'ED', role: 'Product Manager' },
    { id: 7, name: 'Ryan Brown', avatar: 'RB', role: 'Data Scientist' }
]

export const TIERS: Tier[] = [
    { value: 1, label: 'Tier 1 - Beginner' },
    { value: 2, label: 'Tier 2 - Intermediate' },
    { value: 3, label: 'Tier 3 - Advanced' }
]

export const INITIAL_VALUES: ProjectSubmissionFormData = {
    title: '',
    shortDescription: '',
    longDescription: '',
    tier: 0,
    voyage: 55,
    mainImageUrl: '',
    githubRepo: '',
    teammates: [],
    tags: []
};



export const projects = [
    {
        id: 1,
        title: "EcoTracker - Sustainability Dashboard",
        description: "A comprehensive web application that helps users track their carbon footprint, set environmental goals, and discover eco-friendly alternatives.",
        image: "/api/placeholder/400/250",
        technologies: ["React", "Node.js", "MongoDB", "Chart.js"],
        githubUrl: "https://github.com/chingu-team/eco-tracker",
        liveUrl: "https://eco-tracker-demo.vercel.app",
        teamMembers: ["Sarah Johnson", "Mike Chen", "Emma Rodriguez"],
        voyage: "Voyage 47",
        tier: "Tier 3",
        createdAt: "2024-01-15"
    },
    {
        id: 2,
        title: "TaskFlow - Project Management Tool",
        description: "An intuitive project management application with real-time collaboration features, task tracking, and team communication tools.",
        image: "/api/placeholder/400/250",
        technologies: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS"],
        githubUrl: "https://github.com/chingu-team/taskflow",
        liveUrl: "https://taskflow-pm.netlify.app",
        teamMembers: ["Alex Thompson", "Priya Patel", "Carlos Martinez", "Lisa Wong"],
        voyage: "Voyage 46",
        tier: "Tier 2",
        createdAt: "2023-12-22"
    },
    {
        id: 3,
        title: "FoodieFind - Restaurant Discovery",
        description: "A location-based restaurant finder with reviews, ratings, and personalized recommendations based on dietary preferences.",
        image: "/api/placeholder/400/250",
        technologies: ["React", "Express", "MySQL", "Google Maps API"],
        githubUrl: "https://github.com/chingu-team/foodie-find",
        liveUrl: "https://foodie-find-app.herokuapp.com",
        teamMembers: ["David Kim", "Rachel Green"],
        voyage: "Voyage 47",
        tier: "Tier 1",
        createdAt: "2024-01-08"
    },
    {
        id: 4,
        title: "MindfulMoments - Meditation App",
        description: "A mindfulness and meditation application featuring guided sessions, progress tracking, and community challenges.",
        image: "/api/placeholder/400/250",
        technologies: ["Vue.js", "Firebase", "PWA", "Web Audio API"],
        githubUrl: "https://github.com/chingu-team/mindful-moments",
        liveUrl: "https://mindful-moments-app.web.app",
        teamMembers: ["Jennifer Liu", "Mohammed Hassan", "Sophie Anderson"],
        voyage: "Voyage 45",
        tier: "Tier 2",
        createdAt: "2023-11-30"
    },
    {
        id: 5,
        title: "CodeSnippet Manager",
        description: "A developer tool for organizing, sharing, and discovering code snippets with syntax highlighting and tagging system.",
        image: "/api/placeholder/400/250",
        technologies: ["React", "Node.js", "PostgreSQL", "Monaco Editor"],
        githubUrl: "https://github.com/chingu-team/code-snippet-manager",
        liveUrl: "https://code-snippets-hub.vercel.app",
        teamMembers: ["Tom Wilson", "Anna Kowalski", "Raj Sharma"],
        voyage: "Voyage 46",
        tier: "Tier 3",
        createdAt: "2023-12-15"
    },
    {
        id: 6,
        title: "WeatherWise - Climate Insights",
        description: "Advanced weather application with climate data visualization, weather alerts, and historical weather patterns analysis.",
        image: "/api/placeholder/400/250",
        technologies: ["Angular", "D3.js", "Python", "OpenWeather API"],
        githubUrl: "https://github.com/chingu-team/weather-wise",
        liveUrl: "https://weather-wise-app.surge.sh",
        teamMembers: ["Elena Popov", "James Mitchell"],
        voyage: "Voyage 47",
        tier: "Tier 1",
        createdAt: "2024-01-20"
    }
]

export const tiers = ["All Tiers", "Tier 1", "Tier 2", "Tier 3"]
export const voyages = ["All Voyages", "Voyage 45", "Voyage 46", "Voyage 47"]
