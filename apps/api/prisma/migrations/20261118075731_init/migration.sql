-- CreateEnum
CREATE TYPE "ProjectCategory" AS ENUM ('WEB', 'MOBILE', 'FULL_STACK', 'PERSONAL');

-- CreateEnum
CREATE TYPE "SkillLevel" AS ENUM ('EXPERT', 'ADVANCED', 'PROFICIENT');

-- CreateEnum
CREATE TYPE "SocialPlatform" AS ENUM ('GITHUB', 'LINKEDIN');

-- CreateTable
CREATE TABLE "profile" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL,
    "greeting" TEXT NOT NULL DEFAULT 'Hello, I''m',
    "headline" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "aboutParagraphs" TEXT[],
    "email" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "openToWork" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "portraitId" INTEGER,
    "aboutImageId" INTEGER,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_links" (
    "id" SERIAL NOT NULL,
    "platform" "SocialPlatform" NOT NULL,
    "url" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "social_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "blurDataUrl" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "category" "ProjectCategory" NOT NULL,
    "year" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "tech" TEXT[],
    "liveUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imageId" INTEGER,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experiences" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill_areas" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "skill_areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" "SkillLevel" NOT NULL,
    "years" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,
    "highlights" TEXT[],
    "demo" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "areaId" INTEGER NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "social_links_platform_key" ON "social_links"("platform");

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");

-- CreateIndex
CREATE INDEX "projects_imageId_idx" ON "projects"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "skill_areas_slug_key" ON "skill_areas"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "skills_slug_key" ON "skills"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "skills_name_key" ON "skills"("name");

-- CreateIndex
CREATE INDEX "skills_areaId_idx" ON "skills"("areaId");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_portraitId_fkey" FOREIGN KEY ("portraitId") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_aboutImageId_fkey" FOREIGN KEY ("aboutImageId") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "skill_areas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Keep "profile" to a single row: the only allowed id is 1.
ALTER TABLE "profile" ADD CONSTRAINT "profile_single_row" CHECK ("id" = 1);

-- Row-level security (RLS).
-- Supabase exposes every table in the public schema through its auto-generated
-- REST API using a public "anon" key. Enabling RLS with no policies blocks that
-- API completely. The NestJS API connects as the database owner, which bypasses
-- RLS, so it keeps full access.
ALTER TABLE "profile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "social_links" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "images" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "projects" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "experiences" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "skill_areas" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "skills" ENABLE ROW LEVEL SECURITY;
