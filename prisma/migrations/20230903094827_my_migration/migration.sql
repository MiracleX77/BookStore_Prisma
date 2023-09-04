-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "update_at" TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "update_at" TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "update_at" TIMESTAMPTZ(3);
