-- AlterTable
ALTER TABLE "Delivery" ALTER COLUMN "date_start" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "payment_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "payment_at" SET DATA TYPE TIMESTAMPTZ(3);
