import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting Konekta seeding...");

  const password = await bcrypt.hash("Konekta123!", 10);

  // ==========================================
  // 1. USERS
  // ==========================================

  const userData = [
    {
      email: "hr@techhub.ph",
      firstName: "Maria",
      lastName: "Santos",
      role: "employer" as const,
    },
    {
      email: "careers@innovate.ph",
      firstName: "Carlos",
      lastName: "Reyes",
      role: "employer" as const,
    },
    {
      email: "jobs@cloudnine.ph",
      firstName: "Angela",
      lastName: "Cruz",
      role: "employer" as const,
    },
    {
      email: "juan@gmail.com",
      firstName: "Juan",
      lastName: "Dela Cruz",
      role: "seeker" as const,
    },
    {
      email: "ana@gmail.com",
      firstName: "Ana",
      lastName: "Garcia",
      role: "seeker" as const,
    },
    {
      email: "miguel@gmail.com",
      firstName: "Miguel",
      lastName: "Ramos",
      role: "seeker" as const,
    },
    {
      email: "sophia@gmail.com",
      firstName: "Sophia",
      lastName: "Mendoza",
      role: "seeker" as const,
    },
    {
      email: "mark@gmail.com",
      firstName: "Mark",
      lastName: "Villanueva",
      role: "seeker" as const,
    },
  ];

  const users = new Map();

  for (const user of userData) {
    const result = await prisma.user.upsert({
      where: { email: user.email },
      update: {
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      create: {
        ...user,
        password,
      },
    });

    users.set(user.email, result);
  }

  console.log("✅ Users seeded.");

  // ==========================================
  // 2. COMPANIES
  // ==========================================

  const companyData = [
    {
      employerEmail: "hr@techhub.ph",
      companyName: "TechHub Solutions",
      companyDescription:
        "A technology company providing modern software development and IT solutions.",
      location: "Makati City, Philippines",
      website: "https://example.com/techhub",
    },
    {
      employerEmail: "careers@innovate.ph",
      companyName: "Innovate Digital",
      companyDescription:
        "A digital solutions company specializing in web and mobile applications.",
      location: "Quezon City, Philippines",
      website: "https://example.com/innovate",
    },
    {
      employerEmail: "jobs@cloudnine.ph",
      companyName: "CloudNine Technologies",
      companyDescription:
        "A software and cloud computing company helping businesses modernize their systems.",
      location: "Taguig City, Philippines",
      website: "https://example.com/cloudnine",
    },
  ];

  const companies = new Map();

  for (const company of companyData) {
    const employer = users.get(company.employerEmail);

    const result = await prisma.company.upsert({
      where: { employerId: employer.id },
      update: {
        companyName: company.companyName,
        companyDescription: company.companyDescription,
        location: company.location,
        website: company.website,
      },
      create: {
        employerId: employer.id,
        companyName: company.companyName,
        companyDescription: company.companyDescription,
        location: company.location,
        website: company.website,
      },
    });

    companies.set(company.companyName, result);
  }

  console.log("✅ Companies seeded.");

  // ==========================================
  // 3. JOBS
  // ==========================================

  const jobData = [
    {
      companyName: "TechHub Solutions",
      jobPosition: "Frontend Developer",
      jobDescription:
        "Develop responsive and user-friendly web applications using React and modern frontend technologies.",
      minSalary: 25000,
      maxSalary: 40000,
      employmentType: "fullTime" as const,
      status: "open" as const,
    },
    {
      companyName: "TechHub Solutions",
      jobPosition: "Backend Developer",
      jobDescription:
        "Build RESTful APIs, manage databases, and develop scalable backend services.",
      minSalary: 30000,
      maxSalary: 50000,
      employmentType: "fullTime" as const,
      status: "open" as const,
    },
    {
      companyName: "TechHub Solutions",
      jobPosition: "IT Support Specialist",
      jobDescription:
        "Provide technical assistance and maintain IT infrastructure.",
      minSalary: 18000,
      maxSalary: 28000,
      employmentType: "fullTime" as const,
      status: "open" as const,
    },
    {
      companyName: "Innovate Digital",
      jobPosition: "UI/UX Designer",
      jobDescription:
        "Design intuitive user interfaces and create user-centered experiences.",
      minSalary: 25000,
      maxSalary: 45000,
      employmentType: "fullTime" as const,
      status: "open" as const,
    },
    {
      companyName: "Innovate Digital",
      jobPosition: "Full Stack Developer",
      jobDescription:
        "Develop full-stack applications using modern frontend and backend technologies.",
      minSalary: 35000,
      maxSalary: 60000,
      employmentType: "fullTime" as const,
      status: "open" as const,
    },
    {
      companyName: "Innovate Digital",
      jobPosition: "Web Development Intern",
      jobDescription:
        "Assist the development team in building and maintaining web applications.",
      minSalary: 8000,
      maxSalary: 12000,
      employmentType: "internship" as const,
      status: "open" as const,
    },
    {
      companyName: "CloudNine Technologies",
      jobPosition: "Junior Software Engineer",
      jobDescription:
        "Assist in developing, testing, and maintaining software applications.",
      minSalary: 22000,
      maxSalary: 35000,
      employmentType: "fullTime" as const,
      status: "open" as const,
    },
    {
      companyName: "CloudNine Technologies",
      jobPosition: "Mobile App Developer",
      jobDescription:
        "Develop cross-platform mobile applications using React Native.",
      minSalary: 30000,
      maxSalary: 50000,
      employmentType: "fullTime" as const,
      status: "closed" as const,
    },
    {
      companyName: "CloudNine Technologies",
      jobPosition: "Part-Time QA Tester",
      jobDescription:
        "Test software applications, identify bugs, and document QA results.",
      minSalary: 12000,
      maxSalary: 20000,
      employmentType: "partTime" as const,
      status: "draft" as const,
    },
  ];

  const jobs = new Map();

  for (const job of jobData) {
    const company = companies.get(job.companyName);

    // Find an existing job using its company and position.
    const existingJob = await prisma.job.findFirst({
      where: {
        companyId: company.id,
        jobPosition: job.jobPosition,
      },
    });

    const result = existingJob
      ? await prisma.job.update({
          where: { id: existingJob.id },
          data: {
            jobDescription: job.jobDescription,
            minSalary: job.minSalary,
            maxSalary: job.maxSalary,
            employmentType: job.employmentType,
            status: job.status,
          },
        })
      : await prisma.job.create({
          data: {
            companyId: company.id,
            jobPosition: job.jobPosition,
            jobDescription: job.jobDescription,
            minSalary: job.minSalary,
            maxSalary: job.maxSalary,
            employmentType: job.employmentType,
            status: job.status,
          },
        });

    jobs.set(job.jobPosition, result);
  }

  console.log("✅ Jobs seeded.");

  // ==========================================
  // 4. APPLICATIONS
  // ==========================================

  const applicationData = [
    {
      jobPosition: "Frontend Developer",
      applicantEmail: "juan@gmail.com",
      resume: "https://example.com/resumes/juan.pdf",
      coverLetter: "I am interested in the Frontend Developer position.",
      status: "pending" as const,
    },
    {
      jobPosition: "Backend Developer",
      applicantEmail: "juan@gmail.com",
      resume: "https://example.com/resumes/juan.pdf",
      coverLetter: "I would love to join your backend development team.",
      status: "reviewing" as const,
    },
    {
      jobPosition: "UI/UX Designer",
      applicantEmail: "ana@gmail.com",
      resume: "https://example.com/resumes/ana.pdf",
      coverLetter: "I am passionate about UI/UX design.",
      status: "interview" as const,
    },
    {
      jobPosition: "Full Stack Developer",
      applicantEmail: "miguel@gmail.com",
      resume: "https://example.com/resumes/miguel.pdf",
      coverLetter: "I have experience with frontend and backend technologies.",
      status: "accepted" as const,
    },
    {
      jobPosition: "Web Development Intern",
      applicantEmail: "sophia@gmail.com",
      resume: "https://example.com/resumes/sophia.pdf",
      coverLetter: "I am looking forward to gaining professional experience.",
      status: "pending" as const,
    },
    {
      jobPosition: "Junior Software Engineer",
      applicantEmail: "mark@gmail.com",
      resume: "https://example.com/resumes/mark.pdf",
      coverLetter: "I am excited to apply for this position.",
      status: "rejected" as const,
    },
    {
      jobPosition: "Frontend Developer",
      applicantEmail: "miguel@gmail.com",
      resume: "https://example.com/resumes/miguel.pdf",
      status: "reviewing" as const,
    },
    {
      jobPosition: "IT Support Specialist",
      applicantEmail: "ana@gmail.com",
      resume: "https://example.com/resumes/ana.pdf",
      status: "pending" as const,
    },
    {
      jobPosition: "Backend Developer",
      applicantEmail: "mark@gmail.com",
      resume: "https://example.com/resumes/mark.pdf",
      status: "interview" as const,
    },
    {
      jobPosition: "Full Stack Developer",
      applicantEmail: "sophia@gmail.com",
      resume: "https://example.com/resumes/sophia.pdf",
      status: "pending" as const,
    },
  ];

  for (const application of applicationData) {
    const job = jobs.get(application.jobPosition);
    const seeker = users.get(application.applicantEmail);

    await prisma.application.upsert({
      where: {
        jobId_applicantId: {
          jobId: job.id,
          applicantId: seeker.id,
        },
      },
      update: {
        resume: application.resume,
        coverLetter: application.coverLetter,
        status: application.status,
      },
      create: {
        jobId: job.id,
        applicantId: seeker.id,
        resume: application.resume,
        coverLetter: application.coverLetter,
        status: application.status,
      },
    });
  }

  console.log("✅ Applications seeded.");

  // ==========================================
  // 5. SAVED JOBS
  // ==========================================

  const savedJobData = [
    {
      jobPosition: "Frontend Developer",
      userEmail: "ana@gmail.com",
    },
    {
      jobPosition: "Backend Developer",
      userEmail: "miguel@gmail.com",
    },
    {
      jobPosition: "Full Stack Developer",
      userEmail: "juan@gmail.com",
    },
    {
      jobPosition: "Junior Software Engineer",
      userEmail: "sophia@gmail.com",
    },
    {
      jobPosition: "Web Development Intern",
      userEmail: "mark@gmail.com",
    },
  ];

  for (const saved of savedJobData) {
    const job = jobs.get(saved.jobPosition);
    const user = users.get(saved.userEmail);

    const existingSavedJob = await prisma.savedJob.findFirst({
      where: {
        jobId: job.id,
        userId: user.id,
      },
    });

    if (!existingSavedJob) {
      await prisma.savedJob.create({
        data: {
          jobId: job.id,
          userId: user.id,
        },
      });
    }
  }

  console.log("✅ Saved jobs seeded.");
  console.log("🎉 Konekta seeding completed!");
}

main()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
