-- AlterTable
ALTER TABLE "message_history" ALTER COLUMN "conversation_uuid" SET DATA TYPE TEXT,
ALTER COLUMN "message_type" SET DATA TYPE TEXT,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "notes" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "resources" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "skills" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "parameter_schema" SET DATA TYPE JSONB,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3);
