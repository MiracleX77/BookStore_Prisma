-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "price" DOUBLE PRECISION,
    "description" VARCHAR(500),
    "create_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMPTZ(3) NOT NULL,
    "status" VARCHAR(45) NOT NULL DEFAULT 'active',
    "img_id" INTEGER,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CostRent" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER,
    "cost" DOUBLE PRECISION,
    "connt_day" INTEGER,
    "create_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMPTZ(3) NOT NULL,
    "status" VARCHAR(45) NOT NULL DEFAULT 'active',

    CONSTRAINT "CostRent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER,
    "size" VARCHAR(45) NOT NULL,
    "status" VARCHAR(45) NOT NULL DEFAULT 'active',

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Img" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Img_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImgDetail" (
    "id" SERIAL NOT NULL,
    "img_id" INTEGER,
    "img_url" VARCHAR(500) NOT NULL,
    "img_size" VARCHAR(45) NOT NULL,

    CONSTRAINT "ImgDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_img_id_key" ON "Product"("img_id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_img_id_fkey" FOREIGN KEY ("img_id") REFERENCES "Img"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostRent" ADD CONSTRAINT "CostRent_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImgDetail" ADD CONSTRAINT "ImgDetail_img_id_fkey" FOREIGN KEY ("img_id") REFERENCES "Img"("id") ON DELETE SET NULL ON UPDATE CASCADE;
