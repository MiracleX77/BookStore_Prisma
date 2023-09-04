-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "delivery_id" INTEGER,
    "payment_id" INTEGER,
    "total_cost" DOUBLE PRECISION,
    "status" VARCHAR(45) NOT NULL DEFAULT 'active',
    "create_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Delivery" (
    "id" SERIAL NOT NULL,
    "address_id" INTEGER,
    "date_start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_end" TIMESTAMP(3),
    "delivery_type" VARCHAR(45) NOT NULL,
    "traking_number" VARCHAR(45) NOT NULL,
    "status" VARCHAR(45) NOT NULL DEFAULT 'active',

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(45) NOT NULL,
    "total_cost" DOUBLE PRECISION,
    "payment_at" TIMESTAMP(3),
    "img_id" INTEGER,
    "status" VARCHAR(45) NOT NULL DEFAULT 'active',

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_user_id_key" ON "Order"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_delivery_id_key" ON "Order"("delivery_id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_payment_id_key" ON "Order"("payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_img_id_key" ON "Payment"("img_id");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_delivery_id_fkey" FOREIGN KEY ("delivery_id") REFERENCES "Delivery"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_img_id_fkey" FOREIGN KEY ("img_id") REFERENCES "Img"("id") ON DELETE SET NULL ON UPDATE CASCADE;
