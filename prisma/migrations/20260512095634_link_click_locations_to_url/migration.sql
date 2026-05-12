/*
  Warnings:

  - Added the required column `location` to the `click_locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urlId` to the `click_locations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "click_locations" ADD COLUMN     "click_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "urlId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "click_locations" ADD CONSTRAINT "click_locations_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "url"("id") ON DELETE CASCADE ON UPDATE CASCADE;
