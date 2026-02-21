# 使用 Vercel 部署

项目已通过 `pnpm build` 验证，可直接部署到 Vercel。

## 方式一：Vercel 官网 + Git（推荐）

1. 把项目推送到 **GitHub**（若尚未初始化）：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   # 在 GitHub 新建仓库后：
   git remote add origin https://github.com/你的用户名/仓库名.git
   git push -u origin main
   ```

2. 打开 [vercel.com](https://vercel.com) → 用 GitHub 登录。

3. 点击 **Add New Project** → 选择刚推送的仓库 → **Import**。

4. 保持默认即可（Framework: Next.js，Build Command: `pnpm build` 或 `next build`，若用 pnpm 可在 Settings 里把 Install Command 设为 `pnpm install`）。

5. 点击 **Deploy**，等待完成后会得到线上地址。

---

## 方式二：Vercel CLI

1. 在终端登录（会打开浏览器）：
   ```bash
   npx vercel login
   ```

2. 在项目目录部署：
   ```bash
   cd /Users/roy/Downloads/airbnb-page-clone
   npx vercel
   ```
   首次会询问项目名、关联团队等，按提示选择即可。

3. 正式上线到生产环境：
   ```bash
   npx vercel --prod
   ```

---

## 说明

- **构建命令**：`pnpm build` 或 `next build`
- **输出**：Next.js 默认，无需改
- **环境变量**：若以后需要（如 Admin 密码），在 Vercel 项目 **Settings → Environment Variables** 里添加
- **管理后台**：部署后访问 `https://你的域名/admin`，输入密码 `admin` 进入
