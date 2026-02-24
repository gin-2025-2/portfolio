import { Intro } from "@/components/pages/home/Intro";
import { TechStack } from "@/components/pages/home/TechStack";
import { CareerSummary } from "@/components/pages/home/CareerSummary";
import { ProjectList } from "@/components/pages/home/ProjectList";
import { ContactArea } from "@/components/pages/home/ContactArea";
import { cmsService } from "@/services/cms";

export default async function Home({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;

  const introData = await cmsService.getIntroData(locale);
  const skills = await cmsService.getSkills(locale);
  const careers = await cmsService.getCareers(locale);
  const projects = await cmsService.getProjects(locale);

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






