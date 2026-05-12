/*
  Warnings:

  - You are about to drop the column `location` on the `click_locations` table. All the data in the column will be lost.
  - Added the required column `city` to the `click_locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `click_locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regionName` to the `click_locations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "click_locations" DROP COLUMN "location",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "regionName" TEXT NOT NULL;
