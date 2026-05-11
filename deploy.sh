#!/bin/bash

echo "🚀 小桢空间一键部署脚本"
echo ""
echo "请按照提示操作："
echo ""

read -p "1. 输入你的 GitHub 用户名: " GITHUB_USERNAME
read -p "2. 输入你的 GitHub 邮箱: " GITHUB_EMAIL

echo ""
echo "正在配置..."

git config user.name "$GITHUB_USERNAME"
git config user.email "$GITHUB_EMAIL"

echo ""
echo "📦 正在创建仓库..."

cd /workspace

git init
git add .
git commit -m "小桢空间 - 视频分享平台"

echo ""
echo "🔗 请创建 GitHub 仓库并复制仓库 URL"
echo "打开: https://github.com/new"
echo "仓库名: xiaozhen-space"
echo ""
read -p "粘贴仓库 URL: " REPO_URL

git remote add origin "$REPO_URL"
git branch -M main

echo ""
echo "📤 正在推送到 GitHub..."
git push -u origin main

echo ""
echo "✅ 推送成功！"
echo ""
echo "下一步："
echo "1. 打开 https://netlify.com"
echo "2. 导入仓库 xiaozhen-space"
echo "3. 部署完成！"
