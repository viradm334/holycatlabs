# Holycatlabs

Platform e-commerce penjualan kebutuhan binatang peliharaan, terutama kucing yang dimulai dari obat-obatan, makanan hewan, dll. Dibuat dengan Next.js, Tailwind CSS, Prisma, dan MySQL.

## Fitur Aplikasi

### Autentikasi
1. Login
2. Register

### Admin
1. Dashboard
2. View all users
3. View all orders
4. View order details
5. Create, Edit, and Delete Product

### Customer
1. View Profile
2. Update profile
3. View all products
4. View product details
5. Add items to cart
6. Update cart item quantity
7. Checkout order
8. Filter products by category
9. View orders

## Cara Clone Project

1. **Clone Repository**
```bash
git clone https://github.com/viradm334/holycatlabs.git
cd havenwear
```

2. **Install Packages**
```bash
npm install
```

3. **Buat file .env dengan menyalin env.example**
```bash
cp .env.example .env
```

4. **Isi environment variable dengan kredensial sesuai dengan milik Anda**

5. **Generate Prisma Client**
```bash
npx prisma generate
```

6. **Migrasi database**
```bash
npx prisma migrate deploy
```

7. **Jalankan Aplikasi**
```bash
npm run dev
```

## Catatan

Aplikasi ini menggunakan Cloud Storage Cloudinary, jadi sebelum mulai menggunakan aplikasi pastikan anda sudah memiliki API Key dan Secret dari Cloudinary dan disimpan pada .env milik anda.
