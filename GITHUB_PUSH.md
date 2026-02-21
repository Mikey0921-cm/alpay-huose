# 推送到 GitHub

项目已完成 **`git init`** 和 **`git add .`**，所有文件已暂存。你只需在**本机终端**执行下面步骤即可推送到 GitHub。

---

## 第一步：提交（在项目目录下执行）

```bash
cd /Users/roy/Downloads/airbnb-page-clone
git commit -m "Initial commit"
```

若出现 `unknown option 'trailer'` 错误，说明全局 Git 配置里有相关设置。可先临时绕过再提交：

```bash
git commit --no-verify -m "Initial commit"
```

或先查看并暂时重命名全局包含的配置（例如 `~/.gitcinclude`），再执行 `git commit -m "Initial commit"`。

---

## 第二步：在 GitHub 上新建仓库

1. 打开 [github.com/new](https://github.com/new)
2. 填写仓库名（如 `airbnb-page-clone`），选 Public，**不要**勾选 “Add a README”
3. 点击 **Create repository**

---

## 第三步：添加远程并推送

把下面命令里的 `你的用户名` 和 `仓库名` 换成你的实际信息：

```bash
cd /Users/roy/Downloads/airbnb-page-clone
git remote add origin https://github.com/你的用户名/仓库名.git
git branch -M main
git push -u origin main
```

例如仓库是 `https://github.com/roy/airbnb-page-clone`，则：

```bash
git remote add origin https://github.com/roy/airbnb-page-clone.git
git branch -M main
git push -u origin main
```

推送时如提示登录，按提示在浏览器中完成 GitHub 认证即可。

---

## 使用 GitHub CLI（可选）

若已安装 [GitHub CLI](https://cli.github.com/)（`gh`），可在项目目录执行：

```bash
gh repo create airbnb-page-clone --private --source=. --push
```

会创建仓库并自动推送当前分支（需先完成上面的 `git commit`）。
