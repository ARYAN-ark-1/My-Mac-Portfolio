import React, { useState, useEffect } from 'react';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  deployedUrl: string;
  githubUrl: string;
}

const initialProjects: Project[] = [
  {
    title: "Scriptify",
    description: "A web application that generates PDFs from handwritten text inputs and incorporates machine learning for font generation.",
    deployedUrl: "https://aryan-ark-1.github.io/Scriptify/",
    githubUrl: "https://github.com/aryan-ark-1/Scriptify",
  },
  {
    title: "Social-Media Simulation with OOPS in C++",
    description: "A simulation that manages data for over 10,000 users using object-oriented programming and file handling in C++.",
    deployedUrl: "",
    githubUrl: "https://github.com/ARYAN-ark-1/Social-Media-Simulation.git",
  },
  {
    title: "Face Recognition",
    description: "A face recognition system built using Python and OpenCV, achieving 98% accuracy across 5,000 images.",
    deployedUrl: "",
    githubUrl: "https://github.com/ARYAN-ark-1/Face-Detection-Using-OpenCV",
  },
];

const Projects: React.FC = () => {
  const [additionalProjects, setAdditionalProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdditionalProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedProjects: Project[] = [
          {
            title: "Additional Project 1",
            description: "A description for additional project 1.",
            deployedUrl: "https://additionalproject1.example.com",
            githubUrl: "https://github.com/username/additionalproject1",
          },
        ];
        setTimeout(() => setAdditionalProjects(fetchedProjects), 1000);
      } catch (err) {
        setError('Failed to fetch additional projects');
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdditionalProjects();
  }, []);

  const renderProjects = (projects: Project[]) =>
    projects.map((project, index) => (
      <div
        key={index}
        className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 
          transition-all duration-300 hover:shadow-lg
          bg-white/80 dark:bg-gray-700/80"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          {project.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {project.description}
        </p>
        <div className="flex gap-3">
          <a
            href={project.deployedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            <span>View Live</span>
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-3 py-1.5 text-sm rounded-md bg-gray-700 text-white hover:bg-gray-800 transition-colors"
          >
            <Github className="w-4 h-4 mr-1" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    ));

  return (
    <div className="mx-auto sm:px-12 sm:p-8 p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        My Projects
      </h1>

      <div className="grid gap-4">{renderProjects(initialProjects)}</div>

    </div>
  );
};

export default Projects;
