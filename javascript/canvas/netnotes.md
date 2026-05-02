const projectDates = projects.map(project => project.schedule);

const schedule = projects.find(p => p.id === 8)schedule;

const projectSchedules = projects.map(project => ({
  id: project.id,
  name: project.name,
  schedule: project.schedule
}));

Example: projects finishing after 2028
const lateProjects = projects
  .filter(p => p.schedule >= "2028-01")
  .map(p => p.schedule);

  