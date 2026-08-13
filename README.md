# JLULLM 社区官网

面向吉林大学同学的 AI 科研社区主页，用于展示社区、成员成长与招募信息。

## 本地开发

```bash
cd website
npm install
npm run dev
```

## GitHub Pages

推送到 `main` 分支后，`.github/workflows/deploy-pages.yml` 会自动构建并部署 `website/dist/client`。首次部署前，请在仓库的 **Settings → Pages → Build and deployment** 中选择 **GitHub Actions**。

## 更新申请入口

当前首页提供“复制申请模板”功能。正式开放申请时，可在 `website/src/App.jsx` 的加入区域替换为社区实际使用的表单、邮箱或 GitHub Discussions 链接。
