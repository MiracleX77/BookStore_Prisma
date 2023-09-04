-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER,
    "product_id" INTEGER,
    "rental_id" INTEGER,
    "cost" DOUBLE PRECISION,
    "create_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(45) NOT NULL DEFAULT 'active',

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rental" (
    "id" SERIAL NOT NULL,
    "date_rent" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_return" TIMESTAMP(3),
    "date_recieve" TIMESTAMP(3),
    "total_cost" DOUBLE PRECISION,
    "status" VARCHAR(45) NOT NULL DEFAULT 'active',

    CONSTRAINT "Rental_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_rental_id_key" ON "Transaction"("rental_id");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_rental_id_fkey" FOREIGN KEY ("rental_id") REFERENCES "Rental"("id") ON DELETE SET NULL ON UPDATE CASCADE;
