-- AlterTable
ALTER TABLE "url" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "url" ADD CONSTRAINT "url_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
