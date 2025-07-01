// src/data/index.js



export const about = {
  name: "SEGERA",
  role: "Digital Marketer and Web Developer",
  tagline: "I specialize in Responsive Web Design",
  profileImg: "/profile.png", // Replace with your img
  summary: `I hold a Bachelor of Science in Information Technology from Cooperative University of Kenya, Karen. I also have skills in UI/UX, Graphic Design, Web development, Digital Marketing (SEO) and interactive web technologies.`,
  work: [
    {
      company: "Google",
      role: "UX Engineer Intern",
      period: "Summer 2024",
      achievements: [
        "Redesigned internal tools, increasing productivity by 25%.",
      ]
    },
    {
      company: "Freelance",
      role: "Frontend Developer",
      period: "2022 - 2025",
      achievements: [
        "Delivered scalable React apps with pixel-perfect UI."
      ]
    }
  ]
};

export const skills = {
  languages: ["JavaScript", "HTML5", "CSS3", "Python"],
  frameworks: ["React", "Tailwind CSS", "Node.js", "Express.js"],
  tools: ["Git & GitHub", "Figma", "Firebase", "VS Code", "WordPress", "RankMath", "SemRush", "Canva", "Relume"],
  softSkills: [
    "Creative Problem Solving",
    "Communication",
    "Teamwork",
    "Leadership"
  ]
};

export const certifications = [
  "Certification 1",
  "Certification 2",
  "Certification 3",
  "Certification 4",
  "Certification 5",
  "Certification 6"
];

export const projects = Array(9).fill().map((_, i) => ({
  title: "Portfolio website",
  image: "https://via.placeholder.com/300x200?text=Project+Image",
  link: "#"
}));

export const services = [
  {
    title: "Web Design",
    description: "Modern, responsive web design services for all platforms."
  },
  {
    title: "Web Development",
    description: "Full stack web development with React and Node.js."
  },
  {
    title: "SEO",
    description: "Increase your visibility and reach with best SEO practices."
  },
  {
    title: "Graphic Design",
    description: "Professional graphic design for web and print media."
  }
];

export const social = [
  { icon: "instagram", link: "https://instagram.com/" },
  { icon: "facebook", link: "https://facebook.com/" },
  { icon: "twitter", link: "https://twitter.com/" }
];
