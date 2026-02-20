-- SQLite: recreate Category table to change color from String to CategoryColor (stored as TEXT)
PRAGMA foreign_keys=OFF;

CREATE TABLE "Category_new" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO "Category_new" ("id", "userId", "title", "description", "icon", "color", "createdAt", "updatedAt")
SELECT "id", "userId", "title", "description", "icon",
  CASE
    WHEN "color" = '#22c55e' THEN 'GREEN'
    WHEN "color" = '#3b82f6' THEN 'BLUE'
    WHEN "color" = '#a855f7' THEN 'PURPLE'
    WHEN "color" = '#ec4899' THEN 'PINK'
    WHEN "color" = '#f97316' THEN 'ORANGE'
    WHEN "color" = '#eab308' THEN 'YELLOW'
    ELSE 'GREEN'
  END,
  "createdAt", "updatedAt"
FROM "Category";

DROP TABLE "Category";

ALTER TABLE "Category_new" RENAME TO "Category";

CREATE INDEX "Category_userId_idx" ON "Category"("userId");

PRAGMA foreign_keys=ON;
