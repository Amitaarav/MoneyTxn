/*
  Warnings:

  - A unique constraint covering the columns `[qrCodeUrl]` on the table `Merchant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Merchant" ADD COLUMN     "qrCodeUrl" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_qrCodeUrl_key" ON "Merchant"("qrCodeUrl");
