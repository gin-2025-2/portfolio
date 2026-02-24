import { Intro } from "@/components/pages/home/Intro";
import { TechStack } from "@/components/pages/home/TechStack";
import { CareerSummary } from "@/components/pages/home/CareerSummary";
import { ProjectList } from "@/components/pages/home/ProjectList";
import { ContactArea } from "@/components/pages/home/ContactArea";
import { cmsService } from "@/services/cms";

export default async function Home() {
  const introData = await cmsService.getIntroData();
  const skills = await cmsService.getSkills();
  const careers = await cmsService.getCareers();
  const projects = await cmsService.getProjects();

  return (
    <div className="flex flex-col gap-10">
      <Intro data={introData} />
      <TechStack skills={skills} />
      <CareerSummary careers={careers} />
      <ProjectList projects={projects} />
      <ContactArea />
    </div>
  );
}






