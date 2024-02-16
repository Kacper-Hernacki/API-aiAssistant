-- CreateTable
CREATE TABLE "message_history" (
    "id" SERIAL NOT NULL,
    "conversation_uuid" UUID NOT NULL,
    "message" TEXT NOT NULL,
    "message_type" VARCHAR(50) NOT NULL,
    "reflection" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "message_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resources" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "source_list" TEXT[],
    "summary" TEXT,
    "tags" TEXT[],
    "categories" TEXT[],
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "usage_instructions" TEXT NOT NULL,
    "search_tags" TEXT[],
    "parameter_schema" JSON NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);
