-- SQLite: recreate Category table to store icon as CategoryIcon enum (TEXT)
-- Converte valores antigos (lowercase/hyphen) para o enum (UPPERCASE/underscore)
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
SELECT "id", "userId", "title", "description",
  CASE LOWER(TRIM("icon"))
    WHEN 'briefcase' THEN 'BRIEFCASE'
    WHEN 'car' THEN 'CAR'
    WHEN 'heart-pulse' OR 'heart' THEN 'HEART_PULSE'
    WHEN 'piggy-bank' THEN 'PIGGY_BANK'
    WHEN 'shopping-cart' THEN 'SHOPPING_CART'
    WHEN 'ticket' THEN 'TICKET'
    WHEN 'tool-case' THEN 'TOOL_CASE'
    WHEN 'utensils' THEN 'UTENSILS'
    WHEN 'paw-print' THEN 'PAW_PRINT'
    WHEN 'house' OR 'home' THEN 'HOUSE'
    WHEN 'gift' THEN 'GIFT'
    WHEN 'dumbbell' THEN 'DUMBBELL'
    WHEN 'book-open' THEN 'BOOK_OPEN'
    WHEN 'luggage' THEN 'LUGGAGE'
    WHEN 'mailbox' THEN 'MAILBOX'
    WHEN 'receipt' THEN 'RECEIPT'
    ELSE 'UTENSILS'
  END,
  "color", "createdAt", "updatedAt"
FROM "Category";

DROP TABLE "Category";

ALTER TABLE "Category_new" RENAME TO "Category";

CREATE INDEX "Category_userId_idx" ON "Category"("userId");

PRAGMA foreign_keys=ON;
