/*
  Warnings:

  - You are about to drop the column `characterName` on the `Character` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "characterName",
ADD COLUMN     "showRole" TEXT;
