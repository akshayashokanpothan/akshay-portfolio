# Supabase Admin Setup Guide — Connection Jobs

This guide outlines the step-by-step instructions to configure Supabase as the persistent database and authentication backend for the Connection Jobs admin panel.

---

## 1. Create a Supabase Project

1. Visit [https://supabase.com](https://supabase.com) and create or log in to your account.
2. Click **New Project** and name it (e.g., `akshay-portfolio` or `connection-jobs`).
3. Select your preferred database region (e.g. `ap-south-1` for Mumbai / India).
4. Securely save your database password.

---

## 2. Execute Database Migration (`supabase/schema.sql`)

1. In the Supabase Dashboard, open the **SQL Editor** from the left navigation.
2. Click **New query**.
3. Copy the entire contents of [`supabase/schema.sql`](../supabase/schema.sql) and paste it into the query editor.
4. Click **Run**.
5. This creates:
   - `public.jobs` table with all metadata, structured JSONB fields, and check constraints.
   - `public.admin_users` table to track authorized administrators.
   - Automatic `updated_at` trigger.
   - `public.is_admin()` security definer function.
   - Strict Row Level Security (RLS) policies ensuring public visitors can only read published jobs, and only verified admins can insert, update, or delete.

---

## 3. Seed Existing Approved Jobs (`supabase/seed.sql`)

1. In the Supabase **SQL Editor**, open another new query.
2. Copy the contents of [`supabase/seed.sql`](../supabase/seed.sql) and paste it into the editor.
3. Click **Run**.
4. This seeds the four confirmed positions:
   - `product-designer-ux` (Product Designer, UX-first)
   - `product-designer-ui` (Product Designer, UI-first)
   - `product-design-intern` (Product Design Intern, Design Systems)
   - `creative-motion-graphics-designer` (Creative & Motion Graphics Designer)

---

## 4. Provision the Administrator Account

Administrators log in using standard email and password credentials managed securely by Supabase Auth. Public registration is disallowed.

### Step A: Create User in Supabase Auth
1. In the Supabase Dashboard, navigate to **Authentication** &rarr; **Users**.
2. Click **Add User** &rarr; **Create User**.
3. Enter your administrator email (e.g., `akshayashokan248@gmail.com`) and choose a strong password.
4. Toggle **Auto Confirm User?** to **ON** (so email verification is not required).
5. Click **Create User**.
6. Copy the generated **User UID** (a UUID like `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`).

### Step B: Authorize User as Connection Jobs Admin
Run the following SQL statement in the Supabase **SQL Editor** (replace the UUID and email with your values):

```sql
INSERT INTO public.admin_users (id, email)
VALUES ('YOUR_USER_UUID_HERE', 'YOUR_EMAIL_HERE')
ON CONFLICT (id) DO NOTHING;
```

*Note: The `is_admin()` function checks this table to grant full administrative CRUD permissions.*

---

## 5. Configure Local Environment Variables

Create a file named `.env.local` in your project root:

```bash
cp .env.example .env.local
```

Populate the keys from the Supabase Dashboard (**Project Settings** &rarr; **API**):

```env
# Project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Public Anon Key
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...

# Secret Service Role Key (Keep private, never commit!)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
```

---

## 6. Verification & Testing

1. Start the local server:
   ```bash
   npm run dev
   ```
2. Navigate to [http://localhost:3000/careers/admin](http://localhost:3000/careers/admin).
3. Sign in using your administrator email and password.
4. Test:
   - Create a draft job and verify it does NOT appear on the public `/careers` page.
   - Publish the job and verify it appears immediately on `/careers` and its detail route.
   - Edit the closing date and verify dynamic countdown calculations.
   - Delete a test job (with title confirmation prompt) and verify it is permanently removed.
