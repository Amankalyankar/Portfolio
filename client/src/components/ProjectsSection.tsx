import { useState, useEffect, useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import Laterlist_photo from "@/assets/LaterList.png";
import TravelGenie_photo from "@/assets/TravelGenie.png";

const ProjectsSection = () => {
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "TravelGenie",
      description:
        "A travel assistant that crafts personalized, day-by-day itineraries in seconds. It uses AI to build the perfect trip based on your destination and interests.",
      image: TravelGenie_photo,
      tags: ["Flask", "React", ],
      delay: 1.2,
      liveUrl: "https://travelgenie123.netlify.app/",
      githubUrl: "https://github.com/Amankalyankar/TravelGenie",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = parseInt(
              entry.target.getAttribute("data-project-id") || "0"
            );
            if (!visibleProjects.includes(projectId)) {
              setTimeout(() => {
                setVisibleProjects((prev) => [...prev, projectId]);
              }, (projects.find((p) => p.id === projectId)?.delay ?? 0) * 1000);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const projectElements = document.querySelectorAll("[data-project-id]");
    projectElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 gradient-text">
            Featured Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of projects that showcase my passion for creating
            innovative digital solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              data-project-id={project.id}
              className={`project-card glass rounded-xl overflow-hidden transition-all duration-700 ${
                visibleProjects.includes(project.id)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-primary rounded-full text-primary-foreground hover:scale-110 transition-transform"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-secondary rounded-full text-secondary-foreground hover:scale-110 transition-transform"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-primary/20 text-primary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
