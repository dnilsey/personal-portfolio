-- Prisma's migration history table also lives in the public schema, so lock it
-- away from Supabase's public REST API like the other tables.
--
-- Guarded with to_regclass because `prisma migrate dev` replays migrations on a
-- temporary shadow database where this table doesn't exist.
DO $$
BEGIN
  IF to_regclass('public."_prisma_migrations"') IS NOT NULL THEN
    ALTER TABLE "_prisma_migrations" ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;
