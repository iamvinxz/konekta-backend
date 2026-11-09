/*
  Warnings:

  - The values [fullTime,partTime] on the enum `EmploymentType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EmploymentType_new" AS ENUM ('fulltime', 'parttime', 'internship');
ALTER TABLE "Job" ALTER COLUMN "employmentType" TYPE "EmploymentType_new" USING ("employmentType"::text::"EmploymentType_new");
ALTER TYPE "EmploymentType" RENAME TO "EmploymentType_old";
ALTER TYPE "EmploymentType_new" RENAME TO "EmploymentType";
DROP TYPE "public"."EmploymentType_old";
COMMIT;
