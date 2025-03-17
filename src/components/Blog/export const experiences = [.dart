export const experiences = [
  {
    id: 1,
    role: "Software Engineer",
    company: "Example Corp",
    date: "2024-Present",
    desc: [  // Make sure this is an array
      "Point 1",
      "Point 2",
      "Point 3"
    ],
    // ...other fields...
  },
  // ...other experiences...
];

const Experience = () => {
  return (
    <div>
      {experiences.map((experience) => (
        <ExperienceCard key={experience.id}>
          // ...existing code...
          <Description>
            {/* Check if desc is an array before mapping */}
            {Array.isArray(experience.desc) 
              ? experience.desc.map((point, index) => (
                  <Point key={index}>{point}</Point>
                ))
              : <Point>{experience.desc}</Point>
            }
          </Description>
          // ...existing code...
        </ExperienceCard>
      ))}
    </div>
  );
};
